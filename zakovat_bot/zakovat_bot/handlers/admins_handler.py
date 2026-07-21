"""Adminlarni boshqarish (TZ 2.3) — faqat Bosh admin (superadmin)."""
from aiogram import F
from aiogram.types import CallbackQuery, Message
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext

from zakovat_bot.buttons.panel import (
    admin_detail_keyboard,
    admin_role_keyboard,
    admins_menu_keyboard,
    back_to,
)
from zakovat_bot.dispatcher import dp
from zakovat_bot.models import AdminRole, TelegramAdminsID
from zakovat_bot.permissions import has_role, log_action
from zakovat_bot.state import AdminMgmtState


async def _deny(callback):
    await callback.answer("⛔ Bu bo'lim faqat Bosh admin uchun.", show_alert=True)


@dp.callback_query(F.data == "adm_menu")
async def admins_menu(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    admins = list(TelegramAdminsID.objects.order_by("role", "full_name"))
    await callback.message.edit_text(
        f"👮 <b>Adminlar</b> ({len(admins)} ta)\n\n"
        "👑 Bosh admin | 🤵 Operator | 👁 Kuzatuvchi",
        reply_markup=admins_menu_keyboard(admins),
    )


@dp.callback_query(F.data == "adm_add")
async def admin_add_start(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(AdminMgmtState.add_id)
    await callback.message.edit_text(
        "🆔 Yangi adminning Telegram ID raqamini yuboring.\n"
        "(U buni @userinfobot orqali bilib olishi mumkin.)",
        reply_markup=back_to("adm_menu"),
    )


@dp.message(StateFilter(AdminMgmtState.add_id))
async def admin_add_id(message: Message, state: FSMContext):
    text = (message.text or "").strip()
    if not text.isdigit():
        await message.answer(
            "❗️ Faqat raqamlardan iborat ID yuboring.", reply_markup=back_to("adm_menu")
        )
        return
    tg_id = int(text)
    if TelegramAdminsID.objects.filter(tg_id=tg_id).exists():
        await message.answer(
            "❗️ Bu foydalanuvchi allaqachon admin.", reply_markup=back_to("adm_menu")
        )
        await state.clear()
        return
    await state.update_data(new_admin_id=tg_id)
    await state.set_state(AdminMgmtState.add_name)
    await message.answer(
        "📝 Ismini kiriting (ro'yxatda ko'rinishi uchun):",
        reply_markup=back_to("adm_menu"),
    )


@dp.message(StateFilter(AdminMgmtState.add_name))
async def admin_add_name(message: Message, state: FSMContext):
    name = (message.text or "").strip()
    if not name:
        await message.answer("❗️ Ism bo'sh bo'lmasin.")
        return
    await state.update_data(new_admin_name=name)
    await message.answer("🎖 Rolini tanlang:", reply_markup=admin_role_keyboard())


@dp.callback_query(F.data.startswith("adm_role:"))
async def admin_add_role(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    role = callback.data.split(":")[1]
    data = await state.get_data()
    await state.clear()
    if not data.get("new_admin_id"):
        await callback.message.edit_text("❗️ Jarayon eskirgan. Qaytadan boshlang.")
        return

    admin = TelegramAdminsID.objects.create(
        tg_id=data["new_admin_id"], full_name=data["new_admin_name"], role=role
    )
    log_action(callback.from_user.id, "admin_qoshildi", f"{admin.tg_id} ({role})")
    admins = list(TelegramAdminsID.objects.order_by("role", "full_name"))
    await callback.message.edit_text(
        f"✅ {admin.full_name} admin qilib qo'shildi.",
        reply_markup=admins_menu_keyboard(admins),
    )


@dp.callback_query(F.data.startswith("adm_det:"))
async def admin_detail(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    admin = TelegramAdminsID.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not admin:
        await callback.message.edit_text("Admin topilmadi.")
        return
    await callback.message.edit_text(
        f"👤 <b>{admin.full_name or admin.tg_id}</b>\n\n"
        f"🆔 Telegram ID: <code>{admin.tg_id}</code>\n"
        f"🎖 Rol: {admin.get_role_display()}\n"
        f"📅 Qo'shilgan: {admin.created_datetime.strftime('%Y-%m-%d')}",
        reply_markup=admin_detail_keyboard(admin),
    )


@dp.callback_query(F.data.startswith("adm_del:"))
async def admin_delete(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    admin = TelegramAdminsID.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not admin:
        await callback.message.edit_text("Admin topilmadi.")
        return
    if admin.tg_id == callback.from_user.id:
        await callback.answer("O'zingizni o'chira olmaysiz.", show_alert=True)
        return
    log_action(callback.from_user.id, "admin_ochirildi", f"{admin.tg_id}")
    admin.delete()
    admins = list(TelegramAdminsID.objects.order_by("role", "full_name"))
    await callback.message.edit_text(
        "🗑 Adminlikdan olindi.", reply_markup=admins_menu_keyboard(admins)
    )
