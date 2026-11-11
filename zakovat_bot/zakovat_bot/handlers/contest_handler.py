"""«Talabalik davrim — 2026» tanlovi: ishtirokchi oqimi (TZ 3-5, 11).

Kirish: `?start=<tanlov_slug>` deep linki yoki oddiy /start.
Ketma-ketlik (TZ 4): F.I.Sh. → OTM → fakultet → bosqich → telefon →
nominatsiya → ish nomi → izoh → rozilik → media → tasdiqlash.
"""
import asyncio
import logging

from aiogram import F
from aiogram.types import CallbackQuery, Message, ReplyKeyboardRemove
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    consent_keyboard,
    contest_main_keyboard,
    entry_confirm_keyboard,
    media_done_keyboard,
    my_entry_keyboard,
    nomination_keyboard,
    study_year_keyboard,
    university_suggest_keyboard,
)
from zakovat_bot.buttons.reply import ask_phone_keyboard
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import (
    Contest,
    ContestParticipant,
    Entry,
    EntryMedia,
    EntryStatus,
    Nomination,
    TelegramAdminsID,
)
from zakovat_bot.services.contest import (
    active_contest,
    can_submit_nomination,
    contest_stats,
    deadline_passed_text,
    deadline_text,
    extract_media,
    get_participant,
    media_limit,
    participant_entries,
    search_universities,
    time_left_text,
    validate_media,
)
from zakovat_bot.services.validators import normalize_phone, validate_full_name
from zakovat_bot.state import ContestState

logger = logging.getLogger(__name__)

# Albom bo'lib kelgan rasmlarga bitta javob berish uchun debounce
_media_reply_tasks = {}


def _current_contest(data=None):
    if data and data.get("td_contest_id"):
        contest = Contest.objects.filter(id=data["td_contest_id"]).first()
        if contest:
            return contest
    return active_contest()


def _fio_error_text(error):
    return (
        f"⚠️ Iltimos, F.I.Sh.ni to'g'ri kiriting ({error}).\n\n"
        "<i>Masalan: Karimov Aziz Baxtiyorovich</i>"
    )


# ==================== Kirish va bosh menyu (TZ 3) ====================

async def begin(message: Message, state: FSMContext, contest=None, source=None):
    """Tanlov sahifasi — deep link yoki /start orqali."""
    contest = contest or active_contest()
    if contest is None:
        await message.answer("Hozircha faol tanlov yo'q.")
        return

    await state.clear()
    await state.update_data(td_contest_id=contest.id, td_source=source)
    await _show_menu(message, contest, message.from_user.id)


async def _show_menu(message, contest, tg_id, prefix=""):
    entries = participant_entries(contest, tg_id)
    has_entry = any(e.status != EntryStatus.DRAFT for e in entries)

    if contest.is_accepting:
        status_line = (
            f"🗓 Arizalar qabuli: <b>{deadline_text(contest)}</b> gacha\n"
            f"⏳ Qolgan vaqt: <b>{time_left_text(contest)}</b>"
        )
    else:
        status_line = "🔒 Arizalar qabuli yakunlangan."

    await message.answer(
        f"{prefix}🎉 <b>{contest.title}</b>\n"
        "17-noyabr — Xalqaro talabalar kuni!\n\n"
        f"{status_line}",
        reply_markup=contest_main_keyboard(has_entry=has_entry),
        parse_mode="HTML",
    )


@dp.callback_query(F.data == "td_menu")
async def td_menu(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    await state.clear()
    if contest is None:
        await callback.message.answer("Hozircha faol tanlov yo'q.")
        return
    await state.update_data(td_contest_id=contest.id)
    await _show_menu(callback.message, contest, callback.from_user.id)


@dp.callback_query(F.data == "td_rules")
async def td_rules(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        return
    text = contest.rules_text or "Tanlov shartlari tez orada e'lon qilinadi."
    await callback.message.answer(
        f"📋 <b>Tanlov shartlari</b>\n\n{text}",
        reply_markup=contest_main_keyboard(
            has_entry=bool(participant_entries(contest, callback.from_user.id))
        ),
    )


@dp.callback_query(F.data == "td_contact")
async def td_contact(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        return
    text = contest.contact_text or "Tashkilotchilar bilan bog'lanish: @poytaxtyoshlari_yi"
    await callback.message.answer(f"☎️ <b>Bog'lanish</b>\n\n{text}")


@dp.callback_query(F.data == "td_results")
async def td_results(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        return
    s = contest_stats(contest)
    if contest.voting_end_at and timezone.now() >= contest.voting_end_at:
        await callback.message.answer(
            "🏆 Natijalar e'lon qilindi — kanalimizni kuzating."
        )
        return
    await callback.message.answer(
        "🏆 <b>Tanlov natijalari</b>\n\n"
        "Natijalar ovoz berish yakunlangach e'lon qilinadi.\n\n"
        f"📥 Qabul qilingan arizalar: {s['total']}\n"
        f"📸 Foto: {s['photo']} | 🎬 Video: {s['video']}"
    )


# ==================== Ariza boshlash (TZ 4) ====================

@dp.callback_query(F.data == "td_join")
async def td_join(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        return

    if not contest.is_accepting:
        await callback.message.answer(deadline_passed_text(contest))
        return

    await state.update_data(td_contest_id=contest.id)
    participant = get_participant(contest, callback.from_user.id)

    # Anketa allaqachon to'ldirilgan bo'lsa — to'g'ridan-to'g'ri nominatsiyaga
    if participant and participant.full_name and participant.phone:
        await callback.message.answer(
            f"👤 {participant.full_name}\n🎓 {participant.university}\n"
            f"📞 {participant.phone}\n\n"
            "Nominatsiyani tanlang:",
            reply_markup=nomination_keyboard(),
        )
        return

    await state.set_state(ContestState.full_name)
    await callback.message.answer(
        "Ajoyib! ✅ Ro'yxatdan o'tishni boshlaymiz.\n\n"
        "Iltimos, familiya, ism va sharifingizni to'liq kiriting:\n"
        "<i>Masalan: Karimov Aziz Baxtiyorovich</i>",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.message(StateFilter(ContestState.full_name))
async def td_full_name(message: Message, state: FSMContext):
    error = validate_full_name(message.text)
    if error:
        await message.answer(_fio_error_text(error))
        return
    await state.update_data(td_full_name=" ".join((message.text or "").split()))
    await state.set_state(ContestState.university)
    await message.answer(
        "🎓 Oliy ta'lim tashkiloti nomini yozing.\n\n"
        "<i>Bir necha harf yozsangiz, ro'yxatdan tanlash taklif qilinadi.</i>"
    )


@dp.message(StateFilter(ContestState.university))
async def td_university(message: Message, state: FSMContext):
    typed = (message.text or "").strip()
    if len(typed) < 3:
        await message.answer("⚠️ OTM nomini to'liqroq yozing (kamida 3 harf).")
        return

    matches = search_universities(typed)
    if matches:
        await state.update_data(td_uni_options=matches, td_uni_typed=typed)
        await message.answer(
            "Quyidagilardan birini tanlang:",
            reply_markup=university_suggest_keyboard(matches, typed),
        )
        return

    await _save_university(message, state, typed)


@dp.callback_query(F.data.startswith("td_uni:"))
async def td_university_pick(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    choice = callback.data.split(":", 1)[1]
    options = data.get("td_uni_options") or []

    if choice == "own":
        name = data.get("td_uni_typed", "")
    else:
        try:
            name = options[int(choice)]
        except (ValueError, IndexError):
            name = data.get("td_uni_typed", "")
    if not name:
        await callback.message.answer("⚠️ OTM nomini qaytadan yozing.")
        return
    await callback.message.edit_reply_markup()
    await _save_university(callback.message, state, name)


async def _save_university(message, state, name):
    await state.update_data(td_university=name)
    await state.set_state(ContestState.faculty)
    await message.answer(
        f"🎓 OTM: <b>{name}</b>\n\n"
        "Fakultet yoki ta'lim yo'nalishingizni yozing:"
    )


@dp.message(StateFilter(ContestState.faculty))
async def td_faculty(message: Message, state: FSMContext):
    value = (message.text or "").strip()
    if len(value) < 2:
        await message.answer("⚠️ Fakultet yoki yo'nalish nomini yozing.")
        return
    await state.update_data(td_faculty=value)
    await state.set_state(None)
    await message.answer("📚 O'qish bosqichini tanlang:", reply_markup=study_year_keyboard())


@dp.callback_query(F.data.startswith("td_year:"))
async def td_year(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    await state.update_data(td_year=callback.data.split(":", 1)[1])
    await state.set_state(ContestState.phone)
    await callback.message.edit_reply_markup()
    await callback.message.answer(
        "📞 Aloqa telefon raqamingizni yuboring.\n\n"
        "Tugmani bosing yoki qo'lda kiriting:\n<i>Masalan: +998901234567</i>",
        reply_markup=ask_phone_keyboard(),
    )


@dp.message(StateFilter(ContestState.phone))
async def td_phone(message: Message, state: FSMContext):
    if message.contact:
        # Faqat o'z kontakti qabul qilinadi
        if message.contact.user_id and message.contact.user_id != message.from_user.id:
            await message.answer(
                "⚠️ Iltimos, o'zingizning telefon raqamingizni yuboring.",
                reply_markup=ask_phone_keyboard(),
            )
            return
        raw = message.contact.phone_number
        phone = normalize_phone(raw) or normalize_phone(f"+{raw.lstrip('+')}")
    else:
        phone = normalize_phone(message.text)

    if phone is None:
        await message.answer(
            "⚠️ Telefon raqam noto'g'ri. Quyidagi formatda yuboring: "
            "<b>+998901234567</b>",
            reply_markup=ask_phone_keyboard(),
        )
        return

    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        await state.clear()
        return

    participant, _ = ContestParticipant.objects.update_or_create(
        contest=contest,
        telegram_id=message.from_user.id,
        defaults={
            "username": message.from_user.username or None,
            "full_name": data.get("td_full_name"),
            "university": data.get("td_university"),
            "faculty": data.get("td_faculty"),
            "study_year": data.get("td_year"),
            "phone": phone,
        },
    )
    await state.update_data(td_participant_id=participant.id)
    await state.set_state(None)
    await message.answer(
        "✅ Ma'lumotlaringiz saqlandi.\n\nEndi nominatsiyani tanlang:",
        reply_markup=nomination_keyboard(),
    )


# ==================== Nominatsiya va ish ma'lumotlari ====================

@dp.callback_query(F.data.startswith("td_nom:"))
async def td_nomination(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        return
    if not contest.is_accepting:
        await callback.message.answer(deadline_passed_text(contest))
        return

    nomination = callback.data.split(":", 1)[1]
    if nomination not in Nomination.values:
        return

    participant = get_participant(contest, callback.from_user.id)
    if participant is None:
        await callback.message.answer(
            "❗️ Avval ro'yxatdan o'ting. /start buyrug'ini bosing."
        )
        return

    allowed, reason = can_submit_nomination(contest, participant, nomination)
    if not allowed:
        await callback.message.answer(f"⚠️ {reason}")
        return

    entry, _ = Entry.objects.get_or_create(
        participant=participant,
        nomination=nomination,
        defaults={"contest": contest},
    )
    # Rad etilgan yoki tuzatish so'ralgan ariza qayta to'ldiriladi
    if entry.status in (EntryStatus.REJECTED, EntryStatus.REVISION):
        entry.status = EntryStatus.DRAFT
        entry.save(update_fields=["status"])

    await state.update_data(td_entry_id=entry.id, td_nomination=nomination)
    await state.set_state(ContestState.title)
    await callback.message.edit_reply_markup()
    label = "📸 Foto" if nomination == Nomination.FOTO else "🎬 Video"
    await callback.message.answer(
        f"{label} nominatsiyasi tanlandi.\n\n"
        "📝 Material nomini yozing:"
    )


@dp.message(StateFilter(ContestState.title))
async def td_title(message: Message, state: FSMContext):
    value = (message.text or "").strip()
    if len(value) < 3:
        await message.answer("⚠️ Material nomini yozing (kamida 3 belgi).")
        return
    if len(value) > 150:
        await message.answer("⚠️ Nom juda uzun — 150 belgigacha qisqartiring.")
        return
    await state.update_data(td_title=value)
    await state.set_state(ContestState.description)
    await message.answer("✍️ Materialga qisqa izoh yozing (1-3 jumla):")


@dp.message(StateFilter(ContestState.description))
async def td_description(message: Message, state: FSMContext):
    value = (message.text or "").strip()
    if len(value) < 10:
        await message.answer("⚠️ Izoh juda qisqa — kamida 10 belgi yozing.")
        return
    if len(value) > 800:
        await message.answer("⚠️ Izoh juda uzun — 800 belgigacha qisqartiring.")
        return
    await state.update_data(td_description=value)
    await state.set_state(None)
    await message.answer(
        "📜 <b>Rozilik</b>\n\n"
        "Arizani yuborish orqali siz quyidagilarni tasdiqlaysiz:\n"
        "• tanlov nizomi shartlariga rozilik;\n"
        "• material mualliflik huquqi sizga tegishli;\n"
        "• tasvirdagi shaxslar e'lon qilinishiga rozi;\n"
        "• material tanlov kanalida ommaviy e'lon qilinishiga rozilik.",
        reply_markup=consent_keyboard(),
    )


@dp.callback_query(F.data == "td_consent")
async def td_consent(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    participant = get_participant(contest, callback.from_user.id) if contest else None
    if participant is None:
        return
    participant.consent_at = timezone.now()
    participant.save(update_fields=["consent_at"])

    nomination = data.get("td_nomination")
    limit = media_limit(contest, nomination)
    await state.set_state(ContestState.media)
    await callback.message.edit_reply_markup()

    if nomination == Nomination.FOTO:
        hint = (f"📸 Endi suratlaringizni yuboring — "
                f"{contest.min_photos} tadan {limit} tagacha.\n\n"
                "Bir nechta rasmni birga (albom qilib) yuborsangiz ham bo'ladi. "
                "Sifat saqlanishi uchun fayl ko'rinishida ham yuborishingiz mumkin.")
    else:
        hint = (f"🎬 Endi videongizni yuboring — 1 ta video.\n\n"
                f"Davomiyligi {contest.max_video_seconds} soniyagacha, "
                f"hajmi {contest.max_video_mb} MB gacha.")
    await callback.message.answer(hint)


# ==================== Media qabul qilish (TZ 5) ====================

@dp.message(StateFilter(ContestState.media), F.photo | F.video | F.document)
async def td_media(message: Message, state: FSMContext):
    data = await state.get_data()
    contest = _current_contest(data)
    entry = Entry.objects.filter(id=data.get("td_entry_id")).first()
    if contest is None or entry is None:
        await state.clear()
        await message.answer("❗️ Jarayon eskirgan. /start bilan qaytadan boshlang.")
        return

    if not contest.is_accepting:
        await state.clear()
        await message.answer(deadline_passed_text(contest))
        return

    limit = media_limit(contest, entry.nomination)
    current = entry.media.count()
    if current >= limit:
        await message.answer(
            f"⚠️ Siz allaqachon {limit} ta fayl yubordingiz — bundan ortig'i "
            "qabul qilinmaydi.\n\nDavom etish yoki mediani almashtirish uchun "
            "quyidagi tugmalardan foydalaning.",
            reply_markup=media_done_keyboard(current, limit, entry.nomination),
        )
        return

    info = extract_media(message)
    error = validate_media(contest, entry.nomination, info)
    if error:
        await message.answer(f"⚠️ {error}")
        return

    EntryMedia.objects.get_or_create(
        entry=entry,
        file_unique_id=info["file_unique_id"],
        defaults={
            "file_id": info["file_id"],
            "media_type": info["media_type"],
            "position": current,
            "file_size": info.get("file_size"),
            "duration": info.get("duration"),
            "mime_type": info.get("mime_type"),
        },
    )

    # Albom bo'lib kelgan rasmlarga bitta umumiy javob (debounce)
    user_id = message.from_user.id
    task = _media_reply_tasks.get(user_id)
    if task:
        task.cancel()
    _media_reply_tasks[user_id] = asyncio.create_task(
        _media_reply(user_id, entry.id, limit)
    )


async def _media_reply(user_id, entry_id, limit):
    await asyncio.sleep(1.0)
    _media_reply_tasks.pop(user_id, None)
    entry = Entry.objects.filter(id=entry_id).first()
    if entry is None:
        return
    count = entry.media.count()
    try:
        await bot.send_message(
            chat_id=user_id,
            text=f"✅ Qabul qilindi: <b>{count}/{limit}</b>",
            reply_markup=media_done_keyboard(count, limit, entry.nomination),
        )
    except Exception:
        logger.warning("Media javobini yuborib bo'lmadi: %s", user_id)


@dp.callback_query(F.data == "td_media_reset")
async def td_media_reset(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    entry = Entry.objects.filter(id=data.get("td_entry_id")).first()
    contest = _current_contest(data)
    if entry is None or contest is None:
        return
    entry.media.all().delete()
    await state.set_state(ContestState.media)
    limit = media_limit(contest, entry.nomination)
    kind = "suratlaringizni" if entry.nomination == Nomination.FOTO else "videongizni"
    await callback.message.answer(
        f"🔄 Oldingi media o'chirildi. Yangi {kind} yuboring (0/{limit})."
    )


@dp.callback_query(F.data == "td_media_done")
async def td_media_done(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    entry = Entry.objects.filter(id=data.get("td_entry_id")).first()
    if contest is None or entry is None:
        return

    count = entry.media.count()
    if entry.nomination == Nomination.FOTO and count < contest.min_photos:
        await callback.message.answer(
            f"⚠️ Kamida {contest.min_photos} ta surat yuborishingiz kerak."
        )
        return
    if entry.nomination == Nomination.VIDEO and count < 1:
        await callback.message.answer("⚠️ Videongizni yuboring.")
        return

    await state.set_state(None)
    await _show_preview(callback.message, state, contest, entry, data)


async def _show_preview(message, state, contest, entry, data):
    """Yakuniy ko'rinish (TZ 5.3)."""
    participant = entry.participant
    title = data.get("td_title") or entry.title or "—"
    description = data.get("td_description") or entry.description or "—"
    count = entry.media.count()
    media_text = (f"{count} ta foto" if entry.nomination == Nomination.FOTO
                  else "1 ta video")

    await message.answer(
        f"📋 <b>Arizangizni tekshiring</b>\n\n"
        f"🆔 Ariza: <b>{entry.code}</b>\n"
        f"👤 F.I.Sh.: {participant.full_name}\n"
        f"🎓 OTM: {participant.university}\n"
        f"📚 Fakultet: {participant.faculty or '—'} ({participant.study_year or '—'})\n"
        f"📞 Telefon: {participant.phone}\n"
        f"🏷 Yo'nalish: {entry.get_nomination_display()}\n"
        f"📝 Material nomi: {title}\n"
        f"✍️ Izoh: {description}\n"
        f"📎 Media: {media_text}",
        reply_markup=entry_confirm_keyboard(entry),
    )


@dp.callback_query(F.data == "td_edit")
async def td_edit(callback: CallbackQuery, state: FSMContext):
    """Ma'lumotlarni qayta kiritish — media saqlanib qoladi."""
    await callback.answer()
    await state.set_state(ContestState.title)
    await callback.message.answer("📝 Material nomini qaytadan yozing:")


# ==================== Arizani topshirish (TZ 5.3, 7) ====================

@dp.callback_query(F.data.startswith("td_submit:"))
async def td_submit(callback: CallbackQuery, state: FSMContext):
    data = await state.get_data()
    # Ariza tugmadan olinadi — takroriy bosish FSM holatidan qat'i nazar aniqlanadi
    entry = Entry.objects.filter(id=int(callback.data.split(":")[1])).first()
    if entry is None or entry.participant.telegram_id != callback.from_user.id:
        await callback.answer()
        await callback.message.answer("❗️ Jarayon eskirgan. /start bilan boshlang.")
        return
    contest = entry.contest

    # Takroriy bosishda ikki nusxa yaratilmasin (TZ 5.3)
    if entry.status not in (EntryStatus.DRAFT, EntryStatus.REVISION, EntryStatus.REJECTED):
        await callback.answer("Ariza allaqachon topshirilgan.", show_alert=True)
        return

    # Muddat server vaqtida qayta tekshiriladi (TZ 7)
    if not contest.is_accepting:
        await callback.answer()
        await state.clear()
        await callback.message.answer(deadline_passed_text(contest))
        return

    await callback.answer()
    entry.title = data.get("td_title") or entry.title
    entry.description = data.get("td_description") or entry.description
    entry.status = EntryStatus.MODERATION
    entry.submitted_at = timezone.now()
    entry.reject_reason = None
    entry.save()

    await state.clear()
    await state.update_data(td_contest_id=contest.id)
    await callback.message.edit_reply_markup()
    await callback.message.answer(
        f"✅ <b>Arizangiz qabul qilindi!</b>\n\n"
        f"🆔 Ariza raqami: <b>{entry.code}</b>\n"
        f"🏷 Yo'nalish: {entry.get_nomination_display()}\n\n"
        "Material moderatordan o'tgach, qabul muddati yakunlanishi bilan "
        "tanlov kanaliga joylanadi. Natija haqida shu bot orqali xabar beramiz.",
        reply_markup=ReplyKeyboardRemove(),
    )
    await _notify_moderators(entry)


async def _notify_moderators(entry):
    """Yangi ariza haqida moderator va adminlarga xabar."""
    p = entry.participant
    text = (
        f"🔔 <b>Yangi ariza {entry.code}</b>\n\n"
        f"🏷 {entry.get_nomination_display()}\n"
        f"👤 {p.full_name}\n"
        f"🎓 {p.university}\n"
        f"📝 {entry.title}\n"
        f"📎 {entry.media.count()} ta fayl"
    )
    for admin in TelegramAdminsID.objects.all():
        try:
            await bot.send_message(chat_id=admin.tg_id, text=text)
        except Exception:
            logger.warning("Moderatorga xabar yetmadi: %s", admin.tg_id)


# ==================== «Mening arizam» (TZ 11) ====================

@dp.callback_query(F.data == "td_my")
async def td_my(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    contest = _current_contest(data)
    if contest is None:
        return
    entries = [e for e in participant_entries(contest, callback.from_user.id)
               if e.status != EntryStatus.DRAFT]
    if not entries:
        await callback.message.answer("Sizda topshirilgan ariza yo'q.")
        return

    for entry in entries:
        lines = [
            f"🆔 <b>{entry.code}</b>",
            f"🏷 {entry.get_nomination_display()}",
            f"📝 {entry.title or '—'}",
            f"📌 Holati: <b>{entry.get_status_display()}</b>",
        ]
        if entry.status == EntryStatus.REJECTED and entry.reject_reason:
            lines.append(f"\n❌ Sabab: {entry.reject_reason}")
        if entry.status == EntryStatus.REVISION and entry.reject_reason:
            lines.append(f"\n🔄 Tuzatish: {entry.reject_reason}")
        if entry.votes_count:
            lines.append(f"❤️ Ovozlar: {entry.votes_count}")

        can_edit = (
            contest.is_accepting
            and entry.status in (EntryStatus.REVISION, EntryStatus.REJECTED,
                                 EntryStatus.MODERATION)
        )
        await callback.message.answer(
            "\n".join(lines), reply_markup=my_entry_keyboard(entry, can_edit)
        )


@dp.callback_query(F.data.startswith("td_resubmit:"))
async def td_resubmit(callback: CallbackQuery, state: FSMContext):
    """Qabul muddati ichida arizani qayta topshirish (TZ 5.3)."""
    await callback.answer()
    entry = Entry.objects.filter(id=int(callback.data.split(":")[1])).first()
    if entry is None or entry.participant.telegram_id != callback.from_user.id:
        return
    contest = entry.contest
    if not contest.is_accepting:
        await callback.message.answer(deadline_passed_text(contest))
        return

    await state.clear()
    await state.update_data(
        td_contest_id=contest.id,
        td_entry_id=entry.id,
        td_nomination=entry.nomination,
        td_title=entry.title,
        td_description=entry.description,
    )
    await state.set_state(ContestState.title)
    await callback.message.answer(
        f"✏️ <b>{entry.code}</b> arizasini qayta topshirish.\n\n"
        "📝 Material nomini yozing (o'zgartirmasangiz, eskisini qaytadan yozing):"
    )
