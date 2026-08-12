"""Tadbirga ro'yxatdan o'tish oqimi (online chat va oflayn seminar uchun).

Kirish nuqtasi — user_handler'dagi /start routing: `?start=<tadbir_slug>`
deep linki yoki faol tadbir mavjud bo'lganda oddiy /start.
"""
from aiogram import F
from aiogram.types import CallbackQuery, Message, ReplyKeyboardRemove
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    chat_confirm_keyboard,
    chat_status_keyboard,
    subscribe_keyboard,
)
from zakovat_bot.buttons.reply import ask_phone_keyboard
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import ChatEvent, ChatParticipant, ParticipantStatus
from zakovat_bot.services.chat_event import (
    active_event,
    check_subscription,
    event_info_text,
    event_when_text,
    normalize_phone,
    validate_full_name,
)
from zakovat_bot.state import ChatRegState


def _get_participant(event, tg_id):
    return ChatParticipant.objects.filter(event=event, telegram_id=tg_id).first()


def _current_event(state_data=None):
    """Oqimdagi tadbir — state'da saqlangani yoki faol tadbir."""
    if state_data and state_data.get("chat_event_id"):
        event = ChatEvent.objects.filter(id=state_data["chat_event_id"]).first()
        if event:
            return event
    return active_event()


async def begin(message: Message, state: FSMContext, source=None, event=None):
    """Kirish: obuna tekshiruvi → ro'yxat (yoki ro'yxatdan o'tganga holat)."""
    event = event or active_event()
    if event is None:
        await message.answer(
            "Hozircha faol tadbir yo'q. Tez orada yangilari e'lon qilinadi!"
        )
        return

    tg_id = message.from_user.id
    participant = _get_participant(event, tg_id)

    # Allaqachon ro'yxatdan o'tgan bo'lsa — holati ko'rsatiladi (yangi yozuv yo'q)
    if participant and participant.status == ParticipantStatus.REGISTERED:
        await _show_status(message, participant, event)
        return

    if participant is None:
        participant = ChatParticipant.objects.create(
            event=event,
            telegram_id=tg_id,
            username=message.from_user.username or None,
            source=source,
        )
    elif source and not participant.source:
        participant.source = source
        participant.save(update_fields=["source"])

    await state.update_data(chat_event_id=event.id)

    # Majburiy obuna tekshiruvi — ro'yxatdan o'tishdan AVVAL (TZ 3)
    subscribed, _ = await check_subscription(bot, event, tg_id)
    if not subscribed:
        await _ask_subscription(message, event)
        return

    await _ask_full_name(message, state, event, greet=message.from_user.first_name)


async def _ask_subscription(message, event):
    channel = (event.subscription_channel or "").lstrip("@")
    await message.answer(
        "Assalomu alaykum! 👋\n\n"
        f"«{event.title}» tadbiriga ro'yxatdan o'tish uchun avval "
        "quyidagi kanalga a'zo bo'ling.",
        reply_markup=subscribe_keyboard(channel),
    )


async def _ask_full_name(message, state, event, greet=None):
    await state.set_state(ChatRegState.full_name)
    await state.update_data(chat_event_id=event.id)
    hello = f"Assalomu alaykum, {greet}! 👋\n\n" if greet else ""
    await message.answer(
        f"{hello}Ajoyib! ✅ <b>{event.title}</b> tadbiriga ro'yxatdan o'tishni "
        "boshlaymiz.\n\n"
        "Iltimos, familiya, ism va sharifingizni to'liq kiriting:\n"
        "<i>Masalan: Karimov Aziz Baxtiyorovich</i>",
        reply_markup=ReplyKeyboardRemove(),
    )


async def _show_status(message, participant, event):
    """Takroriy murojaat: holat + tadbir ma'lumotlari."""
    await message.answer(
        "ℹ️ Siz allaqachon ro'yxatdan o'tgansiz ✅\n\n"
        f"👤 {participant.full_name}\n"
        f"📞 {participant.phone}\n"
        f"🎫 Ro'yxat raqami: <b>#{participant.id}</b>\n\n"
        f"{event_info_text(event)}",
        reply_markup=chat_status_keyboard(),
    )


@dp.callback_query(F.data == "chatsub_check")
async def chatsub_check(callback: CallbackQuery, state: FSMContext):
    """«A'zo bo'ldim» — obunani qayta tekshiradi (TZ 3.4)."""
    data = await state.get_data()
    event = _current_event(data)
    if event is None:
        await callback.answer("Faol tadbir topilmadi.", show_alert=True)
        return

    subscribed, _ = await check_subscription(bot, event, callback.from_user.id)
    if not subscribed:
        # Chatni to'ldirmaslik uchun yangi xabar emas, ogohlantirish (TZ 3.4)
        await callback.answer(
            "Siz hali kanalga a'zo bo'lmadingiz. Iltimos, avval kanalga a'zo bo'ling.",
            show_alert=True,
        )
        return

    await callback.answer("Rahmat! ✅")
    await callback.message.edit_reply_markup()
    await _ask_full_name(callback.message, state, event,
                         greet=callback.from_user.first_name)


@dp.callback_query(F.data == "chatreg_start")
async def chatreg_start(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    event = _current_event(data)
    if event is None:
        await callback.message.answer("Hozircha faol tadbir yo'q.")
        return
    subscribed, _ = await check_subscription(bot, event, callback.from_user.id)
    if not subscribed:
        await _ask_subscription(callback.message, event)
        return
    await _ask_full_name(callback.message, state, event)


@dp.message(StateFilter(ChatRegState.full_name))
async def chatreg_full_name(message: Message, state: FSMContext):
    error = validate_full_name(message.text)
    if error:
        await message.answer(
            f"⚠️ Iltimos, F.I.Sh.ni to'g'ri kiriting ({error}).\n\n"
            "<i>Masalan: Karimov Aziz Baxtiyorovich</i>"
        )
        return
    await state.update_data(chat_full_name=" ".join((message.text or "").split()))
    await state.set_state(ChatRegState.phone)
    await message.answer(
        "Rahmat! Endi telefon raqamingizni yuboring.\n\n"
        "Quyidagi tugmani bosing yoki raqamni qo'lda kiriting:\n"
        "<i>Masalan: +998901234567</i>",
        reply_markup=ask_phone_keyboard(),
    )


@dp.message(StateFilter(ChatRegState.phone))
async def chatreg_phone(message: Message, state: FSMContext):
    data = await state.get_data()
    event = _current_event(data)
    if event is None:
        await state.clear()
        await message.answer("Tadbir topilmadi.", reply_markup=ReplyKeyboardRemove())
        return

    if message.contact:
        # Faqat foydalanuvchining o'z kontakti qabul qilinadi
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
            "⚠️ Telefon raqam noto'g'ri kiritildi. Iltimos, quyidagi formatda "
            "yuboring: <b>+998901234567</b>",
            reply_markup=ask_phone_keyboard(),
        )
        return

    # Dublikat nazorati: bitta raqam — bitta ishtirokchi
    tg_id = message.from_user.id
    clash = ChatParticipant.objects.filter(
        event=event, phone=phone, status=ParticipantStatus.REGISTERED
    ).exclude(telegram_id=tg_id).first()
    if clash:
        await message.answer(
            "⚠️ Bu telefon raqam bilan allaqachon ro'yxatdan o'tilgan. "
            "Boshqa raqam kiriting yoki tashkilotchilarga murojaat qiling.",
            reply_markup=ask_phone_keyboard(),
        )
        return

    full_name = data.get("chat_full_name")
    await state.update_data(chat_phone=phone)
    await state.set_state(None)

    await message.answer(
        "📋 <b>Ma'lumotlaringiz qabul qilindi!</b>\n\n"
        f"👤 F.I.Sh.: <b>{full_name}</b>\n"
        f"📞 Telefon: <b>{phone}</b>\n\n"
        f"{event_info_text(event)}\n\n"
        "Ro'yxatdan o'tishni yakunlash uchun quyidagi tugmani bosing:",
        reply_markup=chat_confirm_keyboard(),
    )


@dp.callback_query(F.data == "chatreg_confirm")
async def chatreg_confirm(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    event = _current_event(data)
    full_name = data.get("chat_full_name")
    phone = data.get("chat_phone")
    await state.clear()

    if event is None or not full_name or not phone:
        await callback.message.answer(
            "❗️ Jarayon eskirgan. /start buyrug'i bilan qaytadan boshlang."
        )
        return

    tg_id = callback.from_user.id
    participant = _get_participant(event, tg_id)
    if participant is None:
        participant = ChatParticipant.objects.create(
            event=event, telegram_id=tg_id,
            username=callback.from_user.username or None,
        )
    participant.full_name = full_name
    participant.phone = phone
    participant.username = callback.from_user.username or participant.username
    participant.status = ParticipantStatus.REGISTERED
    if participant.registered_at is None:
        participant.registered_at = timezone.now()
    participant.save()

    await callback.message.edit_reply_markup()
    await callback.message.answer(
        f"🎉 <b>Tabriklaymiz! Siz «{event.title}» tadbiriga muvaffaqiyatli "
        "ro'yxatdan o'tdingiz.</b>\n\n"
        f"🎫 Ro'yxat raqamingiz: <b>#{participant.id}</b>\n\n"
        f"{event_info_text(event)}\n\n"
        "Sizni tadbirda kutib qolamiz! 🤝",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.callback_query(F.data == "chatreg_cancel")
async def chatreg_cancel(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    data = await state.get_data()
    event = _current_event(data)
    await state.clear()
    if event:
        participant = _get_participant(event, callback.from_user.id)
        if participant:
            participant.status = ParticipantStatus.CANCELLED
            participant.save(update_fields=["status"])
    await callback.message.edit_text(
        "❌ Ishtirokingiz bekor qilindi.\n\n"
        "Fikringiz o'zgarsa, /start buyrug'i bilan qaytadan ro'yxatdan o'tishingiz mumkin."
    )
