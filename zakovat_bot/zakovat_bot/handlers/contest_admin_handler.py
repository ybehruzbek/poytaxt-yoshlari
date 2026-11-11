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
    moderation_keyboard,
)
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import (
    AdminRole,
    Contest,
    Entry,
    EntryStatus,
    ModerationAction,
    ModerationLog,
)
from zakovat_bot.permissions import get_admin, has_role, is_admin, log_action
from zakovat_bot.services.contest import (
    active_contest,
    contest_stats,
    deadline_text,
    entry_card,
    export_entries_excel,
    next_pending,
    pending_queue,
    send_entry_media,
)
from zakovat_bot.state import ContestAdminState

logger = logging.getLogger(__name__)

PER_PAGE = 8


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


def _current_contest():
    return active_contest() or Contest.all_objects.order_by("-id").first()


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
    """Mediani va kartochkani moderatorga ko'rsatadi."""
    await send_entry_media(bot, chat_id, entry)
    await bot.send_message(
        chat_id=chat_id,
        text=entry_card(entry),
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
    entry = Entry.objects.filter(id=int(callback.data.split(":")[1])).first()
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
    await callback.answer()
    entry_id = int(callback.data.split(":")[1])
    await state.set_state(ContestAdminState.reject_reason)
    await state.update_data(td_mod_entry=entry_id)
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
    await callback.answer()
    await state.set_state(ContestAdminState.revision_reason)
    await state.update_data(td_mod_entry=int(callback.data.split(":")[1]))
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
    if not is_admin(callback.from_user.id):
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
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    entry = Entry.objects.filter(id=int(callback.data.split(":")[1])).first()
    if entry is None:
        return
    await callback.message.edit_text(
        entry_card(entry), reply_markup=entry_admin_keyboard(entry)
    )


@dp.callback_query(F.data.startswith("tdadm_media:"))
async def tdadm_media(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer("Yuborilmoqda…")
    entry = Entry.objects.filter(id=int(callback.data.split(":")[1])).first()
    if entry is None:
        return
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
    if not is_admin(callback.from_user.id):
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
        "📢 Tanlov ishlari e'lon qilinadigan kanalni yuboring: "
        "<code>@username</code> yoki <code>-100...</code> ID.\n\n"
        "Bot o'sha kanalda admin bo'lishi shart.",
        reply_markup=back_to("tdadm_settings", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ContestAdminState.set_channel))
async def tdadm_set_channel_save(message: Message, state: FSMContext):
    value = (message.text or "").strip()
    contest = _current_contest()
    if contest is None or not value:
        await state.clear()
        return
    # Botning kanalda admin ekanini tekshiramiz
    try:
        chat = await bot.get_chat(value)
        member = await bot.get_chat_member(chat.id, bot.id)
        ok = getattr(member, "status", None) in ("administrator", "creator")
    except Exception as e:
        await message.answer(
            f"⚠️ Kanalga ulanib bo'lmadi: {esc(str(e))[:150]}\n\n"
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
