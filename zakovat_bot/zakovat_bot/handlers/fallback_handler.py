"""/help va jarayondan tashqari xabarlarga javob (TZ 5.3, 5.4).

MUHIM: bu modul handlers/__init__.py da ENG OXIRIDA import qilinadi —
catch-all handler boshqa handlerlardan keyin ro'yxatdan o'tishi shart.
"""
from aiogram import F
from aiogram.filters import Command
from aiogram.types import Message

from zakovat_bot.buttons.inline import admin_main_keyboard
from zakovat_bot.buttons.panel import user_menu_keyboard
from zakovat_bot.dispatcher import dp
from zakovat_bot.permissions import get_admin
from zakovat_bot.services.chat_event import active_event, event_info_text

SUPPORT_CONTACT = "@poytaxtyoshlari_yi"


@dp.message(Command("help"))
async def cmd_help(message: Message):
    admin = get_admin(message.from_user.id)
    if admin:
        await message.answer(
            "🛠 <b>Admin yo'riqnomasi</b>\n\n"
            "/admin — boshqaruv paneli\n"
            "/stat — ro'yxat statistikasi\n"
            "/export — ishtirokchilar ro'yxati (.xlsx)\n"
            "/send — ishtirokchilarga xabar yuborish\n"
            "/start — bosh menyu",
            reply_markup=admin_main_keyboard(admin.role),
        )
        return

    event = active_event()
    lines = [
        "ℹ️ <b>Yordam</b>\n",
        "Bu bot orqali tadbirlarga ro'yxatdan o'tishingiz va murojaat "
        "yo'llashingiz mumkin.\n",
        "/start — ro'yxatdan o'tish yoki bosh menyu",
    ]
    if event is not None:
        lines += ["", "<b>Joriy tadbir:</b>", event_info_text(event)]
    lines += ["", f"Savollar bo'lsa: {SUPPORT_CONTACT}"]
    await message.answer(
        "\n".join(lines), reply_markup=user_menu_keyboard(chat_active=event is not None)
    )


@dp.message(F.text)
async def unknown_text(message: Message):
    """Hech bir oqimga tushmagan matnlarga tushunarli javob."""
    if get_admin(message.from_user.id):
        return  # adminlarga ortiqcha javob bermaymiz
    event = active_event()
    hint = ("Ro'yxatdan o'tish uchun /start buyrug'ini bosing."
            if event is not None else
            "Boshlash uchun /start buyrug'ini bosing.")
    await message.answer(
        f"🤖 Kechirasiz, buyruqni tushunmadim.\n\n{hint}\n"
        "Yordam uchun: /help",
        reply_markup=user_menu_keyboard(chat_active=event is not None),
    )
