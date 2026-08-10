"""Murojaat yo'llash oqimi (foydalanuvchi tomoni).

Kirish nuqtalari: `?start=murojaat[_manba]` deep link, /start menyusidagi
«📝 Murojaat yo'llash» tugmasi.
"""
from aiogram import F
from aiogram.types import CallbackQuery, Message, ReplyKeyboardRemove
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext

from zakovat_bot.buttons.panel import (
    appeal_reuse_keyboard,
    appeal_type_keyboard,
)
from zakovat_bot.buttons.reply import ask_phone_keyboard
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import Appeal, AppealType, ChatParticipant, ParticipantStatus
from zakovat_bot.services.appeals import notify_admins_new_appeal
from zakovat_bot.services.validators import normalize_phone, validate_full_name
from zakovat_bot.state import AppealState

MAX_MESSAGE_LEN = 3000


def _known_contact(tg_id):
    """Foydalanuvchining oldingi ism/telefoni (murojaat yoki chat ro'yxatidan)."""
    last = Appeal.objects.filter(telegram_id=tg_id).order_by("-id").first()
    if last:
        return last.full_name, last.phone
    participant = ChatParticipant.objects.filter(
        telegram_id=tg_id, status=ParticipantStatus.REGISTERED
    ).order_by("-id").first()
    if participant and participant.full_name and participant.phone:
        return participant.full_name, participant.phone
    return None, None


async def begin(message: Message, state: FSMContext, source=None):
    """Murojaat oqimini boshlaydi (deep link yoki menyu tugmasidan)."""
    await state.clear()
    await state.update_data(appeal_source=source)

    full_name, phone = _known_contact(message.from_user.id)
    intro = (
        "📝 <b>Murojaat yo'llash</b>\n\n"
        "O'zbekiston Yoshlar ittifoqi Toshkent shahar hududiy Kengashiga "
        "taklif, murojaat, shikoyat, tashabbus yoki savolingizni yo'llashingiz mumkin.\n\n"
        "Ma'lumotlaringiz faqat murojaatni ko'rib chiqish uchun ishlatiladi."
    )

    if full_name and phone:
        await state.update_data(appeal_full_name=full_name, appeal_phone=phone)
        await message.answer(
            f"{intro}\n\n"
            f"👤 {full_name}\n📱 {phone}\n\n"
            "Shu ma'lumotlar bilan davom etamizmi?",
            reply_markup=appeal_reuse_keyboard(),
        )
        return

    await state.set_state(AppealState.full_name)
    await message.answer(
        f"{intro}\n\n✍️ <b>Ism va familiyangizni kiriting</b>\n\n"
        "Namuna: <i>Aliyev Sardor</i>",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.callback_query(F.data == "ap_start")
async def appeal_start(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    await begin(callback.message, state)


@dp.callback_query(F.data == "ap_reuse")
async def appeal_reuse(callback: CallbackQuery, state: FSMContext):
    """Saqlangan ism/telefon bilan davom etish."""
    await callback.answer()
    data = await state.get_data()
    if not data.get("appeal_full_name"):
        await begin(callback.message, state)
        return
    await callback.message.edit_reply_markup()
    await callback.message.answer(
        "🏷 Murojaat turini tanlang:", reply_markup=appeal_type_keyboard()
    )


@dp.callback_query(F.data == "ap_fresh")
async def appeal_fresh(callback: CallbackQuery, state: FSMContext):
    """Ma'lumotlarni qaytadan kiritish."""
    await callback.answer()
    data = await state.get_data()
    await state.set_state(AppealState.full_name)
    await state.update_data(appeal_source=data.get("appeal_source"))
    await callback.message.edit_reply_markup()
    await callback.message.answer(
        "✍️ <b>Ism va familiyangizni kiriting</b>\n\nNamuna: <i>Aliyev Sardor</i>",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.message(StateFilter(AppealState.full_name))
async def appeal_full_name(message: Message, state: FSMContext):
    error = validate_full_name(message.text)
    if error:
        await message.answer(
            f"⚠️ Iltimos, ism va familiyangizni to'g'ri kiriting ({error}).\n\n"
            "Namuna: <i>Aliyev Sardor</i>"
        )
        return
    await state.update_data(appeal_full_name=" ".join((message.text or "").split()))
    await state.set_state(AppealState.phone)
    await message.answer(
        "📱 <b>Telefon raqamingizni yuboring</b>\n\n"
        "Tugma orqali yuborishingiz yoki qo'lda kiritishingiz mumkin.\n\n"
        "Format: +998 XX XXX XX XX",
        reply_markup=ask_phone_keyboard(),
    )


@dp.message(StateFilter(AppealState.phone))
async def appeal_phone(message: Message, state: FSMContext):
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

    await state.update_data(appeal_phone=phone)
    await state.set_state(None)
    await message.answer(
        "🏷 Murojaat turini tanlang:",
        reply_markup=appeal_type_keyboard(),
    )


@dp.callback_query(F.data.startswith("ap_type:"))
async def appeal_type(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    value = callback.data.split(":", 1)[1]
    if value not in AppealType.values:
        return
    data = await state.get_data()
    if not data.get("appeal_full_name") or not data.get("appeal_phone"):
        await callback.message.answer(
            "❗️ Jarayon eskirgan. /start buyrug'i bilan qaytadan boshlang."
        )
        await state.clear()
        return

    await state.update_data(appeal_type=value)
    await state.set_state(AppealState.message)
    await callback.message.edit_reply_markup()
    await callback.message.answer(
        f"✍️ <b>{value}</b> matnini yozing.\n\n"
        "Iltimos, muammo yoki taklifingizni aniq va to'liq bayon eting.",
        reply_markup=ReplyKeyboardRemove(),
    )


@dp.message(StateFilter(AppealState.message))
async def appeal_message(message: Message, state: FSMContext):
    text = (message.text or "").strip()
    if len(text) < 10:
        await message.answer(
            "⚠️ Murojaat matni juda qisqa. Iltimos, kamida 10 ta belgi yozing."
        )
        return
    if len(text) > MAX_MESSAGE_LEN:
        await message.answer(
            f"⚠️ Matn juda uzun ({len(text)} belgi). "
            f"Iltimos, {MAX_MESSAGE_LEN} belgidan oshmasin."
        )
        return

    data = await state.get_data()
    await state.clear()

    appeal = Appeal.objects.create(
        telegram_id=message.from_user.id,
        username=message.from_user.username or None,
        full_name=data.get("appeal_full_name"),
        phone=data.get("appeal_phone"),
        type=data.get("appeal_type", AppealType.MUROJAAT),
        message=text,
        source=data.get("appeal_source"),
    )

    await message.answer(
        "✅ <b>Murojaatingiz qabul qilindi!</b>\n\n"
        f"🎫 Murojaat raqami: <b>#{appeal.id}</b>\n"
        f"🏷 Turi: {appeal.type}\n\n"
        "Murojaatingiz ko'rib chiqiladi va javob shu bot orqali yuboriladi. "
        "Javobni o'tkazib yubormaslik uchun botni bloklab qo'ymang. 🤝",
        reply_markup=ReplyKeyboardRemove(),
    )
    await notify_admins_new_appeal(bot, appeal)
