"""Online chatga ro'yxatdan o'tish oqimi (TZ F-02 – F-05, F-07).

Kirish nuqtasi — user_handler'dagi /start routing: deep link `chat_...`
yoki faol tadbir mavjud bo'lganda oddiy /start shu yerga yo'naltiriladi.
"""
from aiogram import F
from aiogram.types import CallbackQuery, Message, ReplyKeyboardRemove
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    chat_confirm_keyboard,
    chat_status_keyboard,
)
from zakovat_bot.buttons.reply import ask_phone_keyboard
from zakovat_bot.dispatcher import dp
from zakovat_bot.models import ChatParticipant, ParticipantStatus
from zakovat_bot.services.chat_event import (
    active_event,
    event_when_text,
    normalize_phone,
    validate_full_name,
)
from zakovat_bot.state import ChatRegState


def _get_participant(event, tg_id):
    return ChatParticipant.objects.filter(event=event, telegram_id=tg_id).first()


async def begin(message: Message, state: FSMContext, source=None):
    """Kirish (F-02): yangi kelganga taklif, ro'yxatdan o'tganga holat (F-07)."""
    event = active_event()
    if event is None:
        await message.answer(
            "Hozircha faol online chat tadbiri yo'q. Tez orada e'lon qilinadi!"
        )
        return
    tg_id = message.from_user.id
    participant = _get_participant(event, tg_id)

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

    # Start bosilishi bilan ro'yxat darhol boshlanadi — qo'shimcha tugma yo'q
    name = message.from_user.first_name or "do'st"
    await state.set_state(ChatRegState.full_name)
    await message.answer(
        f"Assalomu alaykum, {name}! 👋\n\n"
        "Siz O'zbekiston Yoshlar ittifoqi Toshkent shahar hududiy Kengashining "
        "<b>online chat</b> tadbiriga ro'yxatdan o'tish botidasiz.\n\n"
        f"📅 <b>{event_when_text(event)}</b>\n\n"
        "Ma'lumotlaringiz (ism-familiya, telefon) faqat mazkur tadbir doirasida "
        "ishlatiladi. Ro'yxatdan o'tish 1 daqiqadan kam vaqt oladi.\n\n"
        "✍️ <b>Ism va familiyangizni kiriting</b>\n\nNamuna: <i>Aliyev Sardor</i>",
        reply_markup=ReplyKeyboardRemove(),
    )


async def _show_status(message, participant, event):
    """F-07: takroriy murojaat ekrani."""
    await message.answer(
        "ℹ️ Siz allaqachon ro'yxatdan o'tgansiz.\n\n"
        f"👤 {participant.full_name}\n"
        f"📱 {participant.phone}\n"
        f"🎫 Ro'yxat raqami: <b>#{participant.id}</b>\n\n"
        f"📅 Online chat: <b>{event_when_text(event)}</b>",
        reply_markup=chat_status_keyboard(),
    )


@dp.callback_query(F.data == "chatreg_start")
async def chatreg_start(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    if active_event() is None:
        await callback.message.answer("Hozircha faol tadbir yo'q.")
        return
    await state.set_state(ChatRegState.full_name)
    await callback.message.answer(
        "✍️ <b>Ism va familiyangizni kiriting</b>\n\nNamuna: <i>Aliyev Sardor</i>",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.message(StateFilter(ChatRegState.full_name))
async def chatreg_full_name(message: Message, state: FSMContext):
    error = validate_full_name(message.text)
    if error:
        await message.answer(
            "⚠️ Iltimos, ism va familiyangizni to'g'ri kiriting "
            f"({error}).\n\nNamuna: <i>Aliyev Sardor</i>"
        )
        return
    await state.update_data(chat_full_name=" ".join((message.text or "").split()))
    await state.set_state(ChatRegState.phone)
    await message.answer(
        "📱 <b>Telefon raqamingizni yuboring</b>\n\n"
        "Quyidagi tugma orqali yuborishingiz yoki qo'lda kiritishingiz mumkin.\n\n"
        "Format: +998 XX XXX XX XX",
        reply_markup=ask_phone_keyboard(),
    )


@dp.message(StateFilter(ChatRegState.phone))
async def chatreg_phone(message: Message, state: FSMContext):
    event = active_event()
    if event is None:
        await state.clear()
        await message.answer("Tadbir topilmadi.", reply_markup=ReplyKeyboardRemove())
        return

    if message.contact:
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

    # Dublikat nazorati (TZ 3.4): bitta raqam — bitta ishtirokchi
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

    data = await state.get_data()
    full_name = data.get("chat_full_name")
    await state.update_data(chat_phone=phone)

    await message.answer(
        "✅ <b>Ma'lumotlaringiz qabul qilindi</b>\n\n"
        f"👤 Ism-familiya: <b>{full_name}</b>\n"
        f"📱 Telefon: <b>{phone}</b>\n\n"
        "━━━━━━━━━━━━━━━━━━\n\n"
        "🗓 <b>Online chat vaqti:</b>\n"
        f"<b>{event_when_text(event)}</b>\n(Toshkent vaqti)\n\n"
        "Chat boshlanishidan <b>1 kun</b>, <b>10 soat</b> va <b>1 soat</b> oldin "
        "sizga eslatma yuboriladi.\n\n"
        "Ro'yxatdan o'tishni yakunlash uchun quyidagi tugmani bosing:",
        reply_markup=chat_confirm_keyboard(),
    )
    # Tugma bosilishini kutamiz — holatni tozalamaymiz, ma'lumot state'da


@dp.callback_query(F.data == "chatreg_confirm")
async def chatreg_confirm(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    event = active_event()
    data = await state.get_data()
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
        "🎉 <b>Tabriklaymiz! Siz ro'yxatdan o'tdingiz.</b>\n\n"
        f"Ro'yxat raqamingiz: <b>#{participant.id}</b>\n\n"
        f"{event_when_text(event)} da online chatda ko'rishamiz! "
        "Eslatmalarni o'tkazib yubormaslik uchun botni bloklab qo'ymang. 🤝",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.callback_query(F.data == "chatreg_cancel")
async def chatreg_cancel(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    await state.clear()
    event = active_event()
    if event:
        participant = _get_participant(event, callback.from_user.id)
        if participant:
            participant.status = ParticipantStatus.CANCELLED
            participant.save(update_fields=["status"])
    await callback.message.edit_text(
        "❌ Ishtirokingiz bekor qilindi.\n\n"
        "Fikringiz o'zgarsa, /start buyrug'i bilan qaytadan ro'yxatdan o'tishingiz mumkin."
    )
