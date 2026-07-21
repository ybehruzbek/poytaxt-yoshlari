"""Kanallar bazasi admin-paneli: CRUD, filtr, Excel import/eksport (TZ 2).

Huquqlar (TZ 2.3): ro'yxat/eksport — istalgan admin; qo'shish, tahrirlash,
o'chirish, import — faqat Bosh admin (superadmin).
"""
from aiogram import F
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext

from zakovat_bot.buttons.panel import (
    TYPE_LABELS,
    channel_detail_keyboard,
    channels_list_keyboard,
    channels_menu_keyboard,
    confirm_delete_keyboard,
    ott_type_keyboard,
)
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import AdminRole, Channel, OttType
from zakovat_bot.permissions import get_admin, has_role, is_admin, log_action
from zakovat_bot.services.broadcasting import check_bot_is_admin
from zakovat_bot.services.excel import export_channels, import_channels, normalize_link
from zakovat_bot.state import ChannelState

PER_PAGE = 8


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


def _channel_card(channel):
    link = f"@{channel.username}" if channel.username else "—"
    return (
        f"📡 <b>{channel.ott_name}</b>\n\n"
        f"🔗 Link: {link}\n"
        f"🆔 Chat ID: <code>{channel.chat_id or '—'}</code>\n"
        f"🏷 Turi: {channel.get_ott_type_display()}\n"
        f"🔖 Teg: {channel.tag or '—'}\n"
        f"⚙️ Holati: {'🟢 faol' if channel.is_active else '🔴 nofaol'}\n"
        f"🤖 Bot admin: {'✅ ha' if channel.bot_is_admin else '❌ yo`q'}\n"
        f"📅 Qo'shilgan: {channel.created_datetime.strftime('%Y-%m-%d %H:%M')}"
    )


# ================= Menyu va ro'yxat =================

@dp.callback_query(F.data == "ch_menu")
async def channels_menu(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    admin = get_admin(callback.from_user.id)
    total = Channel.all_objects.count()
    active = Channel.objects.filter(is_active=True).count()
    await callback.message.edit_text(
        f"📡 <b>Kanallar bazasi</b>\n\nJami: {total} ta | Faol: {active} ta",
        reply_markup=channels_menu_keyboard(admin.role),
    )


@dp.callback_query(F.data.startswith("ch_list:"))
async def channels_list(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    _, page_s, type_f, status_f = callback.data.split(":")
    page = max(1, int(page_s))

    qs = Channel.all_objects.all()
    if type_f != "all":
        qs = qs.filter(ott_type=type_f)
    if status_f == "on":
        qs = qs.filter(is_active=True)
    elif status_f == "off":
        qs = qs.filter(is_active=False)
    qs = qs.order_by("ott_name")

    total = qs.count()
    if total == 0:
        await callback.message.edit_text(
            "Tanlangan filtr bo'yicha kanal topilmadi.",
            reply_markup=channels_list_keyboard([], 1, 1, type_f, status_f),
        )
        return

    total_pages = (total + PER_PAGE - 1) // PER_PAGE
    page = min(page, total_pages)
    channels = qs[(page - 1) * PER_PAGE: page * PER_PAGE]

    await callback.message.edit_text(
        f"📋 <b>Kanallar</b> (sahifa {page}/{total_pages}, jami {total} ta)",
        reply_markup=channels_list_keyboard(channels, page, total_pages, type_f, status_f),
    )


@dp.callback_query(F.data.startswith("ch_det:"))
async def channel_detail(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    channel = Channel.all_objects.filter(id=int(callback.data.split(":")[1])).first()
    if not channel:
        await callback.message.edit_text("Kanal topilmadi (o'chirilgan bo'lishi mumkin).")
        return
    admin = get_admin(callback.from_user.id)
    await callback.message.edit_text(
        _channel_card(channel), reply_markup=channel_detail_keyboard(channel, admin.role)
    )


# ================= Qo'shish (superadmin) =================

@dp.callback_query(F.data == "ch_add")
async def channel_add_start(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ChannelState.add_link)
    await callback.message.edit_text(
        "🔗 Kanal linkini yuboring: <code>@username</code>, "
        "<code>t.me/username</code> yoki <code>-100...</code> ID"
    )


@dp.message(StateFilter(ChannelState.add_link))
async def channel_add_link(message: Message, state: FSMContext):
    username, chat_id = normalize_link(message.text)
    if username is None and chat_id is None:
        await message.answer("❗️ Link noto'g'ri. Qaytadan yuboring (@username yoki -100... ID).")
        return

    exists = Channel.all_objects.filter(username__iexact=username).exists() if username \
        else Channel.all_objects.filter(chat_id=chat_id).exists()
    if exists:
        await message.answer("❗️ Bu kanal bazada allaqachon bor. Boshqa link yuboring.")
        return

    # Bot adminligini avtomatik tekshiramiz (TZ 2.1)
    target = f"@{username}" if username else chat_id
    ok, resolved_chat_id, reason = await check_bot_is_admin(bot, target)

    await state.update_data(
        username=username,
        chat_id=resolved_chat_id or chat_id,
        bot_is_admin=ok,
    )
    status_line = "✅ Bot kanalda admin, post yubora oladi." if ok else f"⚠️ {reason}."
    await message.answer(f"{status_line}\n\n📝 Endi OTT rasmiy nomini kiriting:")
    await state.set_state(ChannelState.add_name)


@dp.message(StateFilter(ChannelState.add_name))
async def channel_add_name(message: Message, state: FSMContext):
    name = (message.text or "").strip()
    if not name:
        await message.answer("❗️ OTT nomini matn ko'rinishida kiriting.")
        return
    await state.update_data(ott_name=name)
    await message.answer("🏷 OTT turini tanlang:", reply_markup=ott_type_keyboard("ch_addtype"))


@dp.callback_query(F.data.startswith("ch_addtype:"))
async def channel_add_type(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    ott_type = callback.data.split(":")[1]
    data = await state.get_data()
    await state.clear()

    channel = Channel.objects.create(
        username=data.get("username"),
        chat_id=data.get("chat_id"),
        ott_name=data.get("ott_name"),
        ott_type=ott_type,
        bot_is_admin=data.get("bot_is_admin", False),
    )
    log_action(callback.from_user.id, "kanal_qoshildi", f"#{channel.id} {channel.ott_name}")
    admin = get_admin(callback.from_user.id)
    await callback.message.edit_text(
        f"✅ Kanal qo'shildi!\n\n{_channel_card(channel)}",
        reply_markup=channel_detail_keyboard(channel, admin.role),
    )


# ================= Tahrirlash (superadmin) =================

@dp.callback_query(F.data.startswith("ch_edit:"))
async def channel_edit_start(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    _, channel_id, field = callback.data.split(":")

    if field == "type":
        await callback.message.edit_text(
            "🏷 Yangi turini tanlang:", reply_markup=ott_type_keyboard(f"ch_settype:{channel_id}")
        )
        return

    prompts = {
        "name": "📝 Yangi OTT nomini kiriting:",
        "link": "🔗 Yangi link yuboring (@username yoki -100... ID):",
        "tag": "🔖 Yangi tegni kiriting (o'chirish uchun «-» yuboring):",
    }
    await state.set_state(ChannelState.edit_value)
    await state.update_data(edit_channel_id=int(channel_id), edit_field=field)
    await callback.message.edit_text(prompts[field])


@dp.callback_query(F.data.startswith("ch_settype:"))
async def channel_set_type(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    _, channel_id, ott_type = callback.data.split(":")
    channel = Channel.all_objects.get(id=int(channel_id))
    channel.ott_type = ott_type
    channel.save(update_fields=["ott_type"])
    log_action(callback.from_user.id, "kanal_tahrirlandi", f"#{channel.id} turi={ott_type}")
    admin = get_admin(callback.from_user.id)
    await callback.message.edit_text(
        _channel_card(channel), reply_markup=channel_detail_keyboard(channel, admin.role)
    )


@dp.message(StateFilter(ChannelState.edit_value))
async def channel_edit_value(message: Message, state: FSMContext):
    data = await state.get_data()
    channel = Channel.all_objects.filter(id=data.get("edit_channel_id")).first()
    if not channel:
        await state.clear()
        await message.answer("Kanal topilmadi.")
        return
    field = data.get("edit_field")
    value = (message.text or "").strip()

    if field == "name":
        if not value:
            await message.answer("❗️ Nom bo'sh bo'lishi mumkin emas.")
            return
        channel.ott_name = value
        channel.save(update_fields=["ott_name"])
    elif field == "tag":
        channel.tag = None if value == "-" else (value or None)
        channel.save(update_fields=["tag"])
    elif field == "link":
        username, chat_id = normalize_link(value)
        if username is None and chat_id is None:
            await message.answer("❗️ Link noto'g'ri. Qaytadan yuboring.")
            return
        target = f"@{username}" if username else chat_id
        ok, resolved_chat_id, _reason = await check_bot_is_admin(bot, target)
        channel.username = username
        channel.chat_id = resolved_chat_id or chat_id
        channel.bot_is_admin = ok
        channel.save(update_fields=["username", "chat_id", "bot_is_admin"])

    await state.clear()
    log_action(message.from_user.id, "kanal_tahrirlandi", f"#{channel.id} {field}")
    admin = get_admin(message.from_user.id)
    await message.answer(
        _channel_card(channel), reply_markup=channel_detail_keyboard(channel, admin.role)
    )


# ================= Holat / o'chirish / tekshirish =================

@dp.callback_query(F.data.startswith("ch_tgl:"))
async def channel_toggle(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    channel = Channel.all_objects.get(id=int(callback.data.split(":")[1]))
    channel.is_active = not channel.is_active
    channel.save(update_fields=["is_active"])
    log_action(
        callback.from_user.id, "kanal_holati",
        f"#{channel.id} {'faol' if channel.is_active else 'nofaol'}",
    )
    admin = get_admin(callback.from_user.id)
    await callback.message.edit_text(
        _channel_card(channel), reply_markup=channel_detail_keyboard(channel, admin.role)
    )


@dp.callback_query(F.data.startswith("ch_delok:"))
async def channel_delete_confirmed(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    channel = Channel.all_objects.filter(id=int(callback.data.split(":")[1])).first()
    if channel:
        log_action(callback.from_user.id, "kanal_ochirildi", f"#{channel.id} {channel.ott_name}")
        channel.delete()
    await callback.message.edit_text("🗑 Kanal o'chirildi.")
    admin = get_admin(callback.from_user.id)
    total = Channel.all_objects.count()
    active = Channel.objects.filter(is_active=True).count()
    await callback.message.answer(
        f"📡 <b>Kanallar bazasi</b>\n\nJami: {total} ta | Faol: {active} ta",
        reply_markup=channels_menu_keyboard(admin.role),
    )


@dp.callback_query(F.data.startswith("ch_del:"))
async def channel_delete_ask(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    channel_id = int(callback.data.split(":")[1])
    await callback.message.edit_text(
        "Kanal butunlay o'chirilsinmi? (Tarix ham o'chadi — vaqtincha "
        "o'chirish uchun «Nofaol qilish»dan foydalaning.)",
        reply_markup=confirm_delete_keyboard(channel_id),
    )


@dp.callback_query(F.data.startswith("ch_chk:"))
async def channel_check(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer("Tekshirilmoqda…")
    channel = Channel.all_objects.get(id=int(callback.data.split(":")[1]))
    if channel.target is None:
        return
    ok, resolved_chat_id, reason = await check_bot_is_admin(bot, channel.target)
    channel.bot_is_admin = ok
    if resolved_chat_id and not channel.chat_id:
        channel.chat_id = resolved_chat_id
    channel.save(update_fields=["bot_is_admin", "chat_id"])
    admin = get_admin(callback.from_user.id)
    note = "✅ Bot admin, post yubora oladi." if ok else f"⚠️ {reason}."
    await callback.message.edit_text(
        f"{_channel_card(channel)}\n\n{note}",
        reply_markup=channel_detail_keyboard(channel, admin.role),
    )


# ================= Excel import/eksport (TZ 2.2) =================

@dp.callback_query(F.data == "ch_imp")
async def excel_import_start(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ChannelState.import_excel)
    await callback.message.edit_text(
        "📥 Excel faylni yuboring.\n\n"
        "Format: A — OTT nomi, B — link (@username / t.me/... / -100... ID), "
        "C — turi (Davlat/Xorijiy/Nodavlat), D — teg (ixtiyoriy)."
    )


@dp.message(StateFilter(ChannelState.import_excel), F.document)
async def excel_import_file(message: Message, state: FSMContext):
    await state.clear()
    file = await bot.get_file(message.document.file_id)
    downloaded = await bot.download_file(file.file_path)
    try:
        result = import_channels(downloaded.read())
    except Exception as e:
        await message.answer(f"❗️ Faylni o'qib bo'lmadi: {e}")
        return

    log_action(
        message.from_user.id, "excel_import",
        f"+{result['added']} / yangilandi {result['updated']} / dublikat {result['duplicates']}",
    )
    text = (
        "📥 <b>Import yakunlandi</b>\n\n"
        f"➕ Qo'shildi: {result['added']}\n"
        f"♻️ Yangilandi: {result['updated']}\n"
        f"🔁 Dublikat (o'tkazib yuborildi): {result['duplicates']}\n"
        f"❗️ Xatolik: {len(result['errors'])}"
    )
    if result["errors"]:
        text += "\n\n<b>Xato qatorlar:</b>\n"
        text += "\n".join(f"• {row}-qator: {reason}" for row, reason in result["errors"][:20])
        if len(result["errors"]) > 20:
            text += f"\n… va yana {len(result['errors']) - 20} ta"
    admin = get_admin(message.from_user.id)
    await message.answer(text, reply_markup=channels_menu_keyboard(admin.role))


@dp.callback_query(F.data == "ch_exp")
async def excel_export(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer("Tayyorlanmoqda…")
    data = export_channels()
    log_action(callback.from_user.id, "excel_eksport", f"{Channel.all_objects.count()} kanal")
    await callback.message.answer_document(
        document=BufferedInputFile(data, filename="kanallar_bazasi.xlsx"),
        caption="📤 Kanallar bazasi eksporti",
    )
