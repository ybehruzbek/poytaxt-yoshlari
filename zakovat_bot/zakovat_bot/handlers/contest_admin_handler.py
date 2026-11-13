"""Tanlov boshqaruvi va moderatsiya paneli (TZ 6, 12).

Moderator arizalarni ko'rib chiqadi; tanlov sozlamalari faqat admin
qo'lida qoladi (TZ 12: «moderator tanlov muddatini o'zgartira olmasin»).
"""
import logging
from datetime import datetime
from html import escape as esc

from aiogram import F
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    back_to,
    contest_admin_menu_keyboard,
    contest_settings_keyboard,
    entries_list_keyboard,
    entry_admin_keyboard,
    confirm_action_keyboard,
    moderation_keyboard,
    post_edit_keyboard,
    publish_confirm_keyboard,
    publish_menu_keyboard,
    vote_start_confirm_keyboard,
)
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import (
    AdminRole,
    Contest,
    ContestParticipant,
    ContestStage,
    Entry,
    EntryStatus,
    ModerationAction,
    ModerationLog,
    Nomination,
    Publication,
    Vote,
)
from zakovat_bot.permissions import get_admin, has_role, is_admin, log_action
from zakovat_bot.services.contest import (
    active_contest,
    safe_html,
    contest_stats,
    deadline_text,
    entry_card,
    export_entries_excel,
    next_pending,
    pending_queue,
    send_entry_media,
)
from zakovat_bot.services.publishing import (
    post_text,
    publish_all,
    published_entries,
    ready_for_publication,
    results,
    start_voting,
    voting_is_open,
    winners,
)
from zakovat_bot.state import ContestAdminState

logger = logging.getLogger(__name__)

PER_PAGE = 8


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


def _current_contest():
    return active_contest() or Contest.all_objects.order_by("-id").first()


def _lookup_entry(callback):
    """Callback'dagi arizani xavfsiz topadi.

    Faqat joriy tanlovning topshirilgan arizalari — qoralama (hali
    yuborilmagan) arizalar va boshqa tanlov yozuvlari ko'rsatilmaydi.
    """
    try:
        entry_id = int(callback.data.split(":")[1])
    except (IndexError, ValueError):
        return None
    contest = _current_contest()
    if contest is None:
        return None
    return (
        Entry.objects.filter(id=entry_id, contest=contest)
        .exclude(status=EntryStatus.DRAFT)
        .select_related("participant")
        .first()
    )


def _menu_text(contest):
    if contest is None:
        return "🏆 <b>Tanlov</b>\n\nFaol tanlov yo'q."
    s = contest_stats(contest)
    holat = "🟢 yoqilgan" if contest.is_active else "🔴 o'chirilgan"
    return (
        f"🏆 <b>{esc(contest.title)}</b>\n\n"
        f"📊 Bosqich: {contest.get_stage_display()}\n"
        f"🗓 Qabul: {deadline_text(contest)} gacha\n"
        f"📢 Kanal: {contest.channel_id or 'belgilanmagan'}\n"
        f"⚙️ Holati: {holat}\n\n"
        f"👥 Ishtirokchilar: {s['participants']}\n"
        f"📥 Arizalar: <b>{s['total']}</b> (📸 {s['photo']} | 🎬 {s['video']})\n"
        f"⏳ Moderatsiyada: {s['moderation']}\n"
        f"✅ Tasdiqlangan: {s['approved']}\n"
        f"❌ Rad etilgan: {s['rejected']}\n"
        f"🔄 Tuzatish so'ralgan: {s['revision']}"
    )


@dp.callback_query(F.data == "tdadm_menu")
async def tdadm_menu(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    contest = _current_contest()
    admin = get_admin(callback.from_user.id)
    pending = pending_queue(contest).count() if contest else 0
    await callback.message.answer(
        _menu_text(contest),
        reply_markup=contest_admin_menu_keyboard(admin.role, pending),
    )


# ==================== Moderatsiya navbati (TZ 6) ====================

async def _show_for_moderation(chat_id, entry):
    """Mediani va kartochkani moderatorga ko'rsatadi.

    Bitta nosoz ariza butun navbatni to'xtatib qo'ymasligi uchun yuborish
    xatosi ushlanadi va qisqartirilgan ko'rinish yuboriladi.
    """
    await send_entry_media(bot, chat_id, entry)
    try:
        await bot.send_message(
            chat_id=chat_id,
            text=f"{entry_card(entry)}\n\n{_post_preview(entry)}",
            reply_markup=moderation_keyboard(entry),
        )
    except Exception:
        logger.exception("Kartochkani yuborib bo'lmadi: %s", entry.code)
        await bot.send_message(
            chat_id=chat_id,
            text=(f"🆔 <b>{entry.code}</b> — {entry.get_nomination_display()}\n"
                  f"📌 {entry.get_status_display()}\n\n"
                  "⚠️ Ariza matni juda uzun yoki nosoz — to'liq ko'rinishni "
                  "ko'rsatib bo'lmadi. Qaror qabul qilishingiz mumkin."),
            reply_markup=moderation_keyboard(entry),
        )


@dp.callback_query(F.data == "tdadm_queue")
async def tdadm_queue(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    contest = _current_contest()
    if contest is None:
        return
    entry = next_pending(contest)
    if entry is None:
        await callback.message.answer(
            "✅ Navbat bo'sh — barcha arizalar ko'rib chiqilgan.",
            reply_markup=back_to("tdadm_menu"),
        )
        return
    total = pending_queue(contest).count()
    await callback.message.answer(f"⏳ Navbatda <b>{total}</b> ta ariza bor.")
    await _show_for_moderation(callback.from_user.id, entry)


@dp.callback_query(F.data.startswith("tdadm_skip:"))
async def tdadm_skip(callback: CallbackQuery):
    """«Keyinroq ko'rish» — ariza navbatda qoladi."""
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    await callback.answer("Ariza navbatda qoldi.")
    contest = _current_contest()
    entry = next_pending(contest, after_id=int(callback.data.split(":")[1]))
    if entry is None:
        await callback.message.answer(
            "✅ Navbat oxiri.", reply_markup=back_to("tdadm_menu")
        )
        return
    await _show_for_moderation(callback.from_user.id, entry)


async def _notify_participant(entry, text):
    try:
        await bot.send_message(chat_id=entry.participant.telegram_id, text=text)
    except Exception:
        logger.warning("Ishtirokchiga xabar yetmadi: %s",
                       entry.participant.telegram_id)


async def _after_decision(callback, entry):
    """Qarordan keyin navbatdagi keyingi arizaga o'tadi."""
    nxt = next_pending(entry.contest)
    if nxt is None:
        await callback.message.answer(
            "✅ Navbat bo'sh — barcha arizalar ko'rib chiqilgan.",
            reply_markup=back_to("tdadm_menu"),
        )
        return
    await _show_for_moderation(callback.from_user.id, nxt)


@dp.callback_query(F.data.startswith("tdadm_ok:"))
async def tdadm_approve(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    entry = _lookup_entry(callback)
    if entry is None:
        await callback.answer()
        return
    if entry.status == EntryStatus.APPROVED:
        await callback.answer("Ariza allaqachon tasdiqlangan.", show_alert=True)
        return
    await callback.answer("✅ Qabul qilindi")

    entry.status = EntryStatus.APPROVED
    entry.reject_reason = None
    entry.save(update_fields=["status", "reject_reason"])
    ModerationLog.objects.create(
        entry=entry, moderator_id=callback.from_user.id,
        action=ModerationAction.APPROVE,
    )
    log_action(callback.from_user.id, "tanlov_ariza_qabul", entry.code)

    await _notify_participant(entry, (
        f"✅ <b>Tabriklaymiz!</b> «{esc(entry.contest.title)}» tanloviga "
        f"{entry.code}-raqamli arizangiz qabul qilindi.\n\n"
        "Materiallar qabul muddati tugagach kanalga joylanadi."
    ))
    await callback.message.edit_reply_markup()
    await _after_decision(callback, entry)


@dp.callback_query(F.data.startswith("tdadm_no:"))
async def tdadm_reject_ask(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    entry = _lookup_entry(callback)
    if entry is None:
        await callback.answer()
        return
    await callback.answer()
    await state.set_state(ContestAdminState.reject_reason)
    await state.update_data(td_mod_entry=entry.id)
    await callback.message.answer(
        "❌ Rad etish sababini yozing — u ishtirokchiga yuboriladi:",
        reply_markup=back_to("tdadm_queue", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ContestAdminState.reject_reason))
async def tdadm_reject_save(message: Message, state: FSMContext):
    data = await state.get_data()
    await state.clear()
    entry = Entry.objects.filter(id=data.get("td_mod_entry")).first()
    reason = (message.text or "").strip()
    if entry is None or not reason:
        await message.answer("❗️ Sabab bo'sh bo'lmasin.",
                             reply_markup=back_to("tdadm_queue"))
        return

    entry.status = EntryStatus.REJECTED
    entry.reject_reason = reason
    entry.save(update_fields=["status", "reject_reason"])
    ModerationLog.objects.create(
        entry=entry, moderator_id=message.from_user.id,
        action=ModerationAction.REJECT, reason=reason,
    )
    log_action(message.from_user.id, "tanlov_ariza_rad", f"{entry.code}: {reason[:80]}")

    tail = ("Agar qabul muddati tugamagan bo'lsa, xatoni tuzatib qayta "
            "yuborishingiz mumkin." if entry.contest.is_accepting else
            "Afsuski, qabul muddati yakunlangan.")
    await _notify_participant(entry, (
        f"❌ {entry.code}-raqamli ariza tasdiqlanmadi.\n\n"
        f"<b>Sabab:</b> {esc(reason)}\n\n{tail}"
    ))
    await message.answer(f"❌ {entry.code} rad etildi va ishtirokchiga xabar berildi.",
                         reply_markup=back_to("tdadm_queue", text="⏳ Navbatga"))


@dp.callback_query(F.data.startswith("tdadm_rev:"))
async def tdadm_revision_ask(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    entry = _lookup_entry(callback)
    if entry is None:
        await callback.answer()
        return
    await callback.answer()
    await state.set_state(ContestAdminState.revision_reason)
    await state.update_data(td_mod_entry=entry.id)
    await callback.message.answer(
        "🔄 Nimani tuzatish kerakligini yozing — ishtirokchiga yuboriladi:",
        reply_markup=back_to("tdadm_queue", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ContestAdminState.revision_reason))
async def tdadm_revision_save(message: Message, state: FSMContext):
    data = await state.get_data()
    await state.clear()
    entry = Entry.objects.filter(id=data.get("td_mod_entry")).first()
    reason = (message.text or "").strip()
    if entry is None or not reason:
        await message.answer("❗️ Izoh bo'sh bo'lmasin.",
                             reply_markup=back_to("tdadm_queue"))
        return

    entry.status = EntryStatus.REVISION
    entry.reject_reason = reason
    entry.save(update_fields=["status", "reject_reason"])
    ModerationLog.objects.create(
        entry=entry, moderator_id=message.from_user.id,
        action=ModerationAction.REVISION, reason=reason,
    )
    log_action(message.from_user.id, "tanlov_ariza_tuzatish", entry.code)

    await _notify_participant(entry, (
        f"🔄 {entry.code}-raqamli ariza bo'yicha tuzatish so'raldi.\n\n"
        f"<b>Izoh:</b> {esc(reason)}\n\n"
        "«Mening arizam» bo'limidan qayta topshirishingiz mumkin."
    ))
    await message.answer(f"🔄 {entry.code} bo'yicha tuzatish so'raldi.",
                         reply_markup=back_to("tdadm_queue", text="⏳ Navbatga"))


# ==================== Ro'yxat va kartochka ====================

@dp.callback_query(F.data.startswith("tdadm_list:"))
async def tdadm_list(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    await callback.answer()
    _, page_s, status_f = callback.data.split(":")
    page = max(1, int(page_s))
    contest = _current_contest()
    if contest is None:
        return

    qs = Entry.objects.filter(contest=contest).exclude(status=EntryStatus.DRAFT)
    if status_f != "all":
        qs = qs.filter(status=status_f)
    qs = qs.select_related("participant").order_by("-id")

    total = qs.count()
    if total == 0:
        await callback.message.edit_text(
            "Bu bo'limda ariza yo'q.",
            reply_markup=entries_list_keyboard([], 1, 1, status_f),
        )
        return
    total_pages = (total + PER_PAGE - 1) // PER_PAGE
    page = min(page, total_pages)
    items = qs[(page - 1) * PER_PAGE: page * PER_PAGE]
    await callback.message.edit_text(
        f"📋 <b>Arizalar</b> (jami {total} ta, sahifa {page}/{total_pages})",
        reply_markup=entries_list_keyboard(items, page, total_pages, status_f),
    )


@dp.callback_query(F.data.startswith("tdadm_entry:"))
async def tdadm_entry(callback: CallbackQuery):
    # Kartochkada telefon va Telegram ID bor — kuzatuvchiga ko'rsatilmaydi (TZ 12)
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    await callback.answer()
    entry = _lookup_entry(callback)
    if entry is None:
        return
    await callback.message.edit_text(
        f"{entry_card(entry)}\n\n{_post_preview(entry)}",
        reply_markup=entry_admin_keyboard(entry),
    )


@dp.callback_query(F.data.startswith("tdadm_media:"))
async def tdadm_media(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    entry = _lookup_entry(callback)
    if entry is None:
        await callback.answer()
        return
    await callback.answer("Yuborilmoqda…")
    await send_entry_media(bot, callback.from_user.id, entry)


# ==================== Statistika, eksport, sozlamalar ====================

@dp.callback_query(F.data == "tdadm_stats")
async def tdadm_stats(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    s = contest_stats(contest)
    await callback.message.answer(
        f"📊 <b>{esc(contest.title)}</b>\n\n"
        f"👥 Ishtirokchilar: {s['participants']}\n"
        f"📥 Jami arizalar: {s['total']}\n"
        f"📸 Foto: {s['photo']}\n"
        f"🎬 Video: {s['video']}\n\n"
        f"⏳ Moderatsiyada: {s['moderation']}\n"
        f"✅ Tasdiqlangan: {s['approved']}\n"
        f"❌ Rad etilgan: {s['rejected']}\n"
        f"🔄 Tuzatish so'ralgan: {s['revision']}\n"
        f"📢 E'lon qilingan: {s['published']}",
        reply_markup=back_to("tdadm_menu"),
    )


@dp.callback_query(F.data == "tdadm_export")
async def tdadm_export(callback: CallbackQuery):
    # Eksportda telefon raqamlari bor (TZ 5.3: faqat vakolatli rollar)
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    await callback.answer("Tayyorlanmoqda…")
    contest = _current_contest()
    if contest is None:
        return
    data = export_entries_excel(contest)
    log_action(callback.from_user.id, "tanlov_eksport", contest.slug)
    await callback.message.answer_document(
        document=BufferedInputFile(data, filename="tanlov_arizalari.xlsx"),
        caption=f"📥 {contest.title} — arizalar ro'yxati",
    )


@dp.callback_query(F.data == "tdadm_settings")
async def tdadm_settings(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    contest = _current_contest()
    if contest is None:
        return
    await callback.message.answer(
        f"⚙️ <b>Sozlamalar</b>\n\n"
        f"🗓 Qabul muddati: {deadline_text(contest)}\n"
        f"📢 Kanal: {contest.channel_id or 'belgilanmagan'}\n"
        f"📸 Foto: {contest.min_photos}-{contest.max_photos} ta\n"
        f"🎬 Video: {contest.max_video_seconds} soniya, "
        f"{contest.max_video_mb} MB gacha\n"
        f"⏱ Ovoz berish: {contest.voting_hours} soat",
        reply_markup=contest_settings_keyboard(contest),
    )


@dp.callback_query(F.data == "tdadm_toggle")
async def tdadm_toggle(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    contest.is_active = not contest.is_active
    contest.save(update_fields=["is_active"])
    log_action(callback.from_user.id, "tanlov_holati",
               f"{contest.slug} {'yoqildi' if contest.is_active else 'ochirildi'}")
    holat = "🟢 yoqildi" if contest.is_active else "🔴 o'chirildi"
    await callback.message.answer(
        f"⚙️ Tanlov {holat}.", reply_markup=contest_settings_keyboard(contest)
    )


@dp.callback_query(F.data == "tdadm_set_ch")
async def tdadm_set_channel(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ContestAdminState.set_channel)
    await callback.message.answer(
        "📢 <b>Tanlov kanalini belgilash</b>\n\n"
        "Uch usuldan biri:\n"
        "1️⃣ <b>Kanaldan istalgan postni shu yerga forward qiling</b> "
        "— yopiq kanallar uchun eng oson yo'l;\n"
        "2️⃣ <code>@username</code> (ochiq kanal);\n"
        "3️⃣ <code>-100...</code> ko'rinishidagi kanal ID.\n\n"
        "⚠️ Avval botni kanalga <b>administrator</b> qilib qo'shing "
        "(post yuborish huquqi bilan) — aks holda belgilab bo'lmaydi.",
        reply_markup=back_to("tdadm_settings", text="❌ Bekor qilish"),
    )


def _forwarded_chat(message):
    """Forward qilingan xabardan manba kanalni ajratadi.

    Bot API 7.0 dan keyin `forward_origin` ishlatiladi; eski `forward_from_chat`
    ham qo'llab-quvvatlanadi.
    """
    origin = getattr(message, "forward_origin", None)
    if origin is not None and getattr(origin, "chat", None) is not None:
        return origin.chat
    return getattr(message, "forward_from_chat", None)


@dp.message(StateFilter(ContestAdminState.set_channel))
async def tdadm_set_channel_save(message: Message, state: FSMContext):
    contest = _current_contest()
    if contest is None:
        await state.clear()
        return

    # Yopiq kanal: foydalanuvchi post forward qiladi
    forwarded = _forwarded_chat(message)
    if forwarded is not None:
        value = forwarded.id
    else:
        value = (message.text or "").strip()
    if not value:
        return
    # Botning kanalda admin ekanini tekshiramiz
    try:
        chat = await bot.get_chat(value)
        member = await bot.get_chat_member(chat.id, bot.id)
        ok = getattr(member, "status", None) in ("administrator", "creator")
    except Exception:
        # Xato matni token yoki ichki ma'lumot o'z ichiga olishi mumkin —
        # faqat server jurnaliga yoziladi
        logger.exception("Tanlov kanalini tekshirib bo'lmadi: %s", value)
        await message.answer(
            "⚠️ Kanalga ulanib bo'lmadi.\n\n"
            "Kanal nomini tekshiring va botni kanalga admin qilib qo'shing.",
            reply_markup=back_to("tdadm_settings", text="❌ Bekor qilish"),
        )
        return
    if not ok:
        await message.answer(
            "⚠️ Bot bu kanalda admin emas. Avval botni kanalga admin qilib "
            "qo'shing, so'ng qaytadan yuboring.",
            reply_markup=back_to("tdadm_settings", text="❌ Bekor qilish"),
        )
        return

    await state.clear()
    contest.channel_id = str(chat.id)
    contest.save(update_fields=["channel_id"])
    log_action(message.from_user.id, "tanlov_kanal", str(chat.id))
    await message.answer(
        f"✅ Tanlov kanali belgilandi: <b>{esc(chat.title or value)}</b>",
        reply_markup=back_to("tdadm_menu"),
    )


@dp.callback_query(F.data == "tdadm_set_dl")
async def tdadm_set_deadline(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ContestAdminState.set_deadline)
    await callback.message.answer(
        "📅 Qabul tugash sanasi va vaqtini kiriting.\n\n"
        "Format: <code>KK.OO.YYYY SS:DD</code> "
        "(masalan, <code>17.11.2026 18:00</code>)",
        reply_markup=back_to("tdadm_settings", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ContestAdminState.set_deadline))
async def tdadm_set_deadline_save(message: Message, state: FSMContext):
    value = (message.text or "").strip()
    when = None
    for fmt in ("%d.%m.%Y %H:%M", "%Y-%m-%d %H:%M"):
        try:
            when = timezone.make_aware(datetime.strptime(value, fmt))
            break
        except ValueError:
            continue
    if when is None:
        await message.answer(
            "❗️ Format noto'g'ri. Masalan: <code>17.11.2026 18:00</code>",
            reply_markup=back_to("tdadm_settings", text="❌ Bekor qilish"),
        )
        return
    await state.clear()
    contest = _current_contest()
    if contest:
        contest.submission_deadline = when
        contest.save(update_fields=["submission_deadline"])
        log_action(message.from_user.id, "tanlov_muddat", f"{when:%d.%m.%Y %H:%M}")
    await message.answer(
        f"✅ Qabul muddati yangilandi: <b>{deadline_text(contest)}</b>",
        reply_markup=back_to("tdadm_menu"),
    )


# ==================== Nashr va ovoz berish (TZ 8-10) ====================

@dp.callback_query(F.data == "tdadm_pub_menu")
async def tdadm_pub_menu(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    contest = _current_contest()
    if contest is None:
        return
    ready = ready_for_publication(contest).count()
    published = published_entries(contest).count()

    lines = [f"📢 <b>Nashr va ovoz berish</b>\n",
             f"📢 Kanal: {contest.channel_id or '❗️ belgilanmagan'}",
             f"✅ Nashrga tayyor: <b>{ready}</b> ta",
             f"📣 E'lon qilingan: <b>{published}</b> ta"]
    if contest.voting_start_at and contest.voting_end_at:
        lines.append(
            f"\n🗳 Ovoz berish: "
            f"{timezone.localtime(contest.voting_start_at):%d.%m %H:%M} — "
            f"{timezone.localtime(contest.voting_end_at):%d.%m %H:%M}"
        )
        lines.append("Holati: " + ("🟢 ochiq" if voting_is_open(contest)
                                   else "🔴 yopiq"))
    await callback.message.answer(
        "\n".join(lines),
        reply_markup=publish_menu_keyboard(ready, published, contest),
    )


@dp.callback_query(F.data == "tdadm_publish")
async def tdadm_publish_ask(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    if not contest.channel_id:
        await callback.message.answer(
            "❗️ Avval tanlov kanalini belgilang (⚙️ Sozlamalar).",
            reply_markup=back_to("tdadm_settings"),
        )
        return
    ready = ready_for_publication(contest).count()
    if not ready:
        await callback.message.answer("Nashrga tayyor ish yo'q.",
                                      reply_markup=back_to("tdadm_pub_menu"))
        return
    await callback.message.answer(
        f"📢 <b>{ready} ta tasdiqlangan ish</b> kanalga ketma-ket e'lon "
        "qilinadi.\n\nModerator tasdiqlamagan ishlar chiqmaydi. "
        "Har bir ish faqat bir marta joylanadi.",
        reply_markup=publish_confirm_keyboard(ready),
    )


# Bir vaqtda bitta nashr jarayoni ishlashi uchun
_publishing_now = set()


@dp.callback_query(F.data == "tdadm_publish_go")
async def tdadm_publish_go(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    contest = _current_contest()
    if contest is None:
        await callback.answer()
        return

    # Tasdiqdan keyin ham barcha shartlar qayta tekshiriladi
    if not contest.channel_id:
        await callback.answer("Avval tanlov kanalini belgilang.", show_alert=True)
        return
    if contest.stage not in (ContestStage.ACCEPTING, ContestStage.MODERATION,
                             ContestStage.PUBLISHING):
        await callback.answer(
            "Bu bosqichda nashr qilib bo'lmaydi.", show_alert=True)
        return
    if not ready_for_publication(contest).exists():
        await callback.answer("Nashrga tayyor ish yo'q.", show_alert=True)
        return
    # Tekshirish va band qilish orasida `await` bo'lmasligi shart —
    # aks holda ikki bosish ham tekshiruvdan o'tib ketadi
    if contest.id in _publishing_now:
        await callback.answer("Nashr allaqachon ketmoqda — kuting.",
                              show_alert=True)
        return
    _publishing_now.add(contest.id)

    try:
        await callback.answer()
        contest.stage = ContestStage.PUBLISHING
        contest.save(update_fields=["stage"])
        log_action(callback.from_user.id, "tanlov_nashr_boshlandi", contest.slug)
        await callback.message.answer("📢 E'lon qilish boshlandi…")
        ok, failed, errors = await publish_all(bot, contest)
    finally:
        _publishing_now.discard(contest.id)
    text = [f"📢 <b>Nashr yakunlandi</b>\n",
            f"✅ E'lon qilindi: {ok}",
            f"❌ Xatolik: {failed}"]
    if errors:
        text.append("\n<b>Xatoliklar:</b>")
        text.extend(f"• {esc(e)}" for e in errors[:10])
        text.append("\n<i>Qayta urinish uchun «E'lon qilish»ni yana bosing — "
                    "joylangan ishlar takrorlanmaydi.</i>")
    log_action(callback.from_user.id, "tanlov_nashr_yakunlandi",
               f"ok={ok} xato={failed}")
    await callback.message.answer("\n".join(text),
                                  reply_markup=back_to("tdadm_pub_menu"))


@dp.callback_query(F.data == "tdadm_vote_start")
async def tdadm_vote_ask(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    remaining = ready_for_publication(contest).count()
    if remaining:
        await callback.message.answer(
            f"❗️ Hali {remaining} ta ish e'lon qilinmagan.\n\n"
            "TZ bo'yicha ovoz berish barcha ishlar joylangandan keyin "
            "boshlanadi — aks holda oldin chiqqan postlar ustunlik oladi.",
            reply_markup=back_to("tdadm_pub_menu"),
        )
        return
    old_votes = Vote.objects.filter(entry__contest=contest).count()
    warn = ""
    if old_votes:
        warn = (f"\n\n⚠️ <b>Diqqat:</b> bazada oldingi bosqichdan "
                f"{old_votes} ta ovoz bor va ular saqlanib qoladi — yangi "
                "ovoz berish ular ustiga qo'shiladi.\nToza boshlash uchun "
                "avval «🧹 Sinov ma'lumotlarini tozalash»ni ishlating.")
    await callback.message.answer(
        f"🗳 Barcha ishtirokchilar uchun bir vaqtda "
        f"<b>{contest.voting_hours} soatlik</b> ovoz berish boshlanadi.\n\n"
        "Muddat tugagach ovoz qabul qilish avtomatik to'xtaydi." + warn,
        reply_markup=vote_start_confirm_keyboard(contest.voting_hours),
    )


@dp.callback_query(F.data == "tdadm_vote_go")
async def tdadm_vote_go(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    contest = _current_contest()
    if contest is None or contest.voting_start_at:
        await callback.answer()
        return
    # Tasdiqdan keyin ham: barcha ishlar chiqqan bo'lishi shart (TZ 9.3)
    if ready_for_publication(contest).exists():
        await callback.answer(
            "Hali e'lon qilinmagan ishlar bor — avval ularni joylang.",
            show_alert=True)
        return
    if not published_entries(contest).exists():
        await callback.answer("E'lon qilingan ish yo'q.", show_alert=True)
        return
    await callback.answer()
    start_voting(contest)
    log_action(callback.from_user.id, "tanlov_ovoz_boshlandi", contest.slug)
    await callback.message.answer(
        f"🗳 Ovoz berish boshlandi!\n\n"
        f"Tugash vaqti: <b>"
        f"{timezone.localtime(contest.voting_end_at):%d.%m.%Y %H:%M}</b>",
        reply_markup=back_to("tdadm_pub_menu"),
    )


@dp.callback_query(F.data == "tdadm_results")
async def tdadm_results(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    lines = [f"🏆 <b>Natijalar — {esc(contest.title)}</b>"]
    if voting_is_open(contest):
        lines.append("<i>Ovoz berish davom etmoqda — natijalar oraliq.</i>")
    for nom, label in ((Nomination.FOTO, "📸 Foto"),
                       (Nomination.VIDEO, "🎬 Video")):
        lines.append(f"\n<b>{label}</b>")
        ranked = results(contest, nom)
        if not ranked:
            lines.append("• ish yo'q")
            continue
        for i, e in enumerate(ranked[:10], 1):
            lines.append(f"{i}. {e.code} — {esc(e.participant.full_name)} "
                         f"({e.votes_count} ovoz)")
        _, tie = winners(contest, nom)
        if tie:
            lines.append("⚠️ Teng ovoz — g'olibni administrator belgilaydi.")
    await callback.message.answer("\n".join(lines),
                                  reply_markup=back_to("tdadm_pub_menu"))


# ============ Kanalga chiqadigan matnni tahrirlash ============
#
# Moderator post matnini to'liq o'zi yozadi: nima yozsa, rasm/video tagida
# aynan o'sha matn chiqadi, ostida esa faqat ovoz tugmasi bo'ladi.


def _post_preview(entry):
    """Kanalda qanday ko'rinishini aynan ko'rsatadi."""
    return ("📢 <b>Kanalga shu ko'rinishda chiqadi:</b>\n\n"
            "➖➖➖➖➖➖➖➖➖➖\n"
            f"{safe_html(post_text(entry), 1200)}\n"
            "➖➖➖➖➖➖➖➖➖➖\n"
            "<i>(ostida ❤️ ovoz tugmasi bo'ladi)</i>")


@dp.callback_query(F.data.startswith("tdadm_card:"))
async def tdadm_card(callback: CallbackQuery, state: FSMContext):
    """Ariza kartochkasi + post ko'rinishi va moderatsiya tugmalari."""
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    entry = _lookup_entry(callback)
    if entry is None:
        return
    await callback.message.answer(
        f"{entry_card(entry)}\n\n{_post_preview(entry)}",
        reply_markup=moderation_keyboard(entry),
    )


@dp.callback_query(F.data.startswith("tdadm_edit:"))
async def tdadm_edit_ask(callback: CallbackQuery, state: FSMContext):
    """Post matnini yozish — bitta erkin maydon."""
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    entry = _lookup_entry(callback)
    if entry is None:
        await callback.answer()
        return
    await callback.answer()
    await state.set_state(ContestAdminState.edit_post)
    await state.update_data(td_edit_entry=entry.id)

    # Hozirgi matn alohida xabar bilan yuboriladi — moderator uni nusxalab,
    # tahrirlab qaytarishi oson bo'lsin
    await callback.message.answer(
        f"✏️ <b>{entry.code} — post matni</b>\n\n"
        "Kanalga chiqadigan matnni to'liq yozib yuboring. "
        "Siz yozgan matn rasm/video tagida <b>aynan shu ko'rinishda</b> "
        "chiqadi, ostida faqat ❤️ ovoz tugmasi bo'ladi.\n\n"
        "Quyidagi xabarni nusxalab, tahrirlab yuborishingiz mumkin:",
        reply_markup=post_edit_keyboard(entry),
    )
    await callback.message.answer(post_text(entry), parse_mode=None)


@dp.callback_query(F.data.startswith("tdadm_edit_reset:"))
async def tdadm_edit_reset(callback: CallbackQuery, state: FSMContext):
    """Standart shablonga qaytarish."""
    if not has_role(callback.from_user.id, AdminRole.MODERATOR):
        return await _deny(callback)
    entry = _lookup_entry(callback)
    if entry is None:
        await callback.answer()
        return
    await callback.answer("Standart matn qaytarildi")
    await state.clear()
    entry.post_text_override = None
    entry.save(update_fields=["post_text_override"])
    log_action(callback.from_user.id, "tanlov_post_matni",
               f"{entry.code}: standart")
    await callback.message.answer(
        _post_preview(entry), reply_markup=moderation_keyboard(entry)
    )


@dp.message(StateFilter(ContestAdminState.edit_post))
async def tdadm_edit_save(message: Message, state: FSMContext):
    data = await state.get_data()
    entry = (
        Entry.objects.filter(id=data.get("td_edit_entry"),
                             contest=_current_contest())
        .exclude(status=EntryStatus.DRAFT)
        .select_related("participant")
        .first()
    )
    text = (message.text or "").strip()
    if entry is None:
        await state.clear()
        await message.answer("Ariza topilmadi.", reply_markup=back_to("tdadm_queue"))
        return
    if not text:
        await message.answer(
            "❗️ Matn bo'sh bo'lmasin. Post matnini yozib yuboring.")
        return
    if len(text) > 1000:
        await message.answer(
            f"❗️ Matn juda uzun ({len(text)} belgi). Telegram rasm tagidagi "
            "izohga 1024 belgigacha ruxsat beradi — qisqartiring.")
        return

    await state.clear()
    entry.post_text_override = text
    entry.save(update_fields=["post_text_override"])
    log_action(message.from_user.id, "tanlov_post_matni",
               f"{entry.code}: {text[:60]}")
    await message.answer(
        f"✅ Post matni saqlandi.\n\n{_post_preview(entry)}",
        reply_markup=moderation_keyboard(entry),
    )


# ============ Bosqichni boshqarish va sinovni tozalash ============

@dp.callback_query(F.data == "tdadm_vote_stop")
async def tdadm_vote_stop_ask(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    await callback.message.answer(
        "⏹ <b>Ovoz berishni to'xtatish</b>\n\n"
        "Ovoz qabul qilish darhol to'xtaydi, berilgan ovozlar saqlanadi.\n"
        "Kerak bo'lsa, keyin yangidan boshlash mumkin.",
        reply_markup=confirm_action_keyboard(
            "tdadm_vote_stop_go", "⏹ Ha, to'xtatilsin", back="tdadm_pub_menu"),
    )


@dp.callback_query(F.data == "tdadm_vote_stop_go")
async def tdadm_vote_stop_go(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    contest = _current_contest()
    if contest is None:
        await callback.answer()
        return
    if contest.stage != ContestStage.VOTING or not contest.voting_start_at:
        await callback.answer("Ovoz berish ketmayapti.", show_alert=True)
        return
    await callback.answer()
    contest.stage = ContestStage.FINISHED
    contest.voting_end_at = timezone.now()
    contest.save(update_fields=["stage", "voting_end_at"])
    log_action(callback.from_user.id, "tanlov_ovoz_toxtatildi", contest.slug)
    await callback.message.answer(
        "⏹ Ovoz berish to'xtatildi. Ovozlar saqlanib qoldi.",
        reply_markup=back_to("tdadm_pub_menu"),
    )


@dp.callback_query(F.data == "tdadm_reopen")
async def tdadm_reopen_ask(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    warn = ""
    if contest.submission_deadline <= timezone.now():
        warn = ("\n\n⚠️ Qabul muddati o'tib ketgan — qayta ochgandan keyin "
                "«📅 Qabul muddatini o'zgartirish» orqali yangi sana qo'ying, "
                "aks holda arizalar baribir qabul qilinmaydi.")
    await callback.message.answer(
        "🔄 <b>Arizalar qabulini qayta ochish</b>\n\n"
        "Tanlov yana «arizalar qabuli» bosqichiga qaytadi va ishtirokchilar "
        "material yubora oladi.\n"
        "Ovoz berish vaqtlari bekor qilinadi (keyin yangidan boshlanadi), "
        "berilgan ovozlar va e'lon qilingan postlar saqlanadi." + warn,
        reply_markup=confirm_action_keyboard(
            "tdadm_reopen_go", "🔄 Ha, qabulni ochish"),
    )


@dp.callback_query(F.data == "tdadm_reopen_go")
async def tdadm_reopen_go(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    contest = _current_contest()
    if contest is None:
        await callback.answer()
        return
    # Tasdiqdan keyin ham holat qayta tekshiriladi
    if contest.stage == ContestStage.ACCEPTING:
        await callback.answer("Tanlov allaqachon qabul bosqichida.",
                              show_alert=True)
        return
    if voting_is_open(contest):
        await callback.answer("Avval ovoz berishni to'xtating.",
                              show_alert=True)
        return
    await callback.answer()
    contest.stage = ContestStage.ACCEPTING
    contest.voting_start_at = None
    contest.voting_end_at = None
    # `is_active` atayin tegilmaydi — tanlovni yoqish/o'chirish alohida amal
    contest.save(update_fields=["stage", "voting_start_at", "voting_end_at"])
    log_action(callback.from_user.id, "tanlov_qabul_qayta_ochildi", contest.slug)
    status = ("✅ Arizalar qabul qilinmoqda."
              if contest.is_accepting else
              "⚠️ Qabul muddati o'tgan — sanani yangilang.")
    await callback.message.answer(
        f"🔄 Tanlov «arizalar qabuli» bosqichiga qaytarildi.\n\n{status}",
        reply_markup=back_to("tdadm_settings"),
    )


@dp.callback_query(F.data == "tdadm_reset")
async def tdadm_reset_ask(callback: CallbackQuery):
    """Sinovdan keyin tanlovni toza holatga qaytarish (faqat bosh admin)."""
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return
    entries = Entry.objects.filter(contest=contest).count()
    votes = Vote.objects.filter(entry__contest=contest).count()
    people = ContestParticipant.objects.filter(contest=contest).count()
    posts = Publication.objects.filter(entry__contest=contest).count()
    await callback.message.answer(
        "🧹 <b>Sinov ma'lumotlarini tozalash</b>\n\n"
        f"O'chiriladi:\n"
        f"• {entries} ta ariza\n"
        f"• {people} ta ishtirokchi anketasi\n"
        f"• {votes} ta ovoz\n"
        f"• {posts} ta nashr yozuvi\n\n"
        "Bot kanalga joylagan sinov postlarini ham o'chirishga harakat "
        "qiladi (48 soat ichidagilarini).\n\n"
        "⚠️ <b>Bu amalni ortga qaytarib bo'lmaydi.</b> Haqiqiy tanlov "
        "boshlangach bu tugmani bosmang!",
        reply_markup=confirm_action_keyboard(
            "tdadm_reset_go", "🧹 Ha, hammasini o'chirish"),
    )


@dp.callback_query(F.data == "tdadm_reset_go")
async def tdadm_reset_go(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    contest = _current_contest()
    if contest is None:
        return

    # Kanaldagi sinov postlarini o'chirishga harakat qilamiz
    deleted_posts, failed_posts = 0, 0
    for pub in Publication.objects.filter(entry__contest=contest):
        for msg_id in {pub.message_id, pub.vote_message_id}:
            if not msg_id:
                continue
            try:
                await bot.delete_message(chat_id=pub.channel_id,
                                         message_id=msg_id)
                deleted_posts += 1
            except Exception:
                failed_posts += 1

    entries = Entry.objects.filter(contest=contest).count()
    people = ContestParticipant.objects.filter(contest=contest).count()
    # Ariza o'chirilganda media, ovoz va nashr yozuvlari ham o'chadi (CASCADE)
    Entry.all_objects.filter(contest=contest).delete()
    ContestParticipant.all_objects.filter(contest=contest).delete()

    contest.stage = ContestStage.ACCEPTING
    contest.voting_start_at = None
    contest.voting_end_at = None
    contest.save(update_fields=["stage", "voting_start_at", "voting_end_at"])
    log_action(callback.from_user.id, "tanlov_sinov_tozalandi",
               f"{entries} ariza, {people} ishtirokchi")

    note = ""
    if failed_posts:
        note = (f"\n\n⚠️ {failed_posts} ta kanal xabarini o'chirib bo'lmadi "
                "(48 soatdan eski yoki huquq yetmaydi) — ularni kanalda "
                "qo'lda o'chiring.")
    await callback.message.answer(
        f"🧹 Tozalandi: {entries} ta ariza, {people} ta anketa.\n"
        f"Kanaldan o'chirildi: {deleted_posts} ta xabar.{note}\n\n"
        "Tanlov «arizalar qabuli» bosqichiga qaytarildi.",
        reply_markup=back_to("tdadm_menu"),
    )
