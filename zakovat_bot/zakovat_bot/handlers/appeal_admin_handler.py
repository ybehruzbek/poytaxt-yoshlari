"""Murojaatlar admin bo'limi: ro'yxat, javob berish, holat, eksport, havola."""
from aiogram import F
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    appeal_detail_keyboard,
    appeals_list_keyboard,
    appeals_menu_keyboard,
    back_to,
)
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import AdminRole, Appeal, AppealStatus
from zakovat_bot.permissions import get_admin, has_role, is_admin, log_action
from zakovat_bot.services.appeals import (
    appeal_card,
    appeal_stats,
    build_appeal_link,
    export_appeals_excel,
)
from zakovat_bot.state import AppealAdminState

PER_PAGE = 8


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


def _menu_text():
    s = appeal_stats()
    return (
        "📬 <b>Murojaatlar</b>\n\n"
        f"Jami: {s['total']} ta\n"
        f"🆕 Yangi: {s['new']}\n"
        f"🔄 Ko'rib chiqilmoqda: {s['in_review']}\n"
        f"✅ Javob berilgan: {s['answered']}"
    )


@dp.callback_query(F.data == "apadm_menu")
async def appeals_menu(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    admin = get_admin(callback.from_user.id)
    await callback.message.edit_text(
        _menu_text(), reply_markup=appeals_menu_keyboard(admin.role)
    )


@dp.callback_query(F.data.startswith("apadm_list:"))
async def appeals_list(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    _, page_s, status_f = callback.data.split(":")
    page = max(1, int(page_s))

    qs = Appeal.objects.all()
    if status_f != "all":
        qs = qs.filter(status=status_f)
    qs = qs.order_by("-id")

    total = qs.count()
    if total == 0:
        await callback.message.edit_text(
            "Bu bo'limda murojaat yo'q.",
            reply_markup=appeals_list_keyboard([], 1, 1, status_f),
        )
        return

    total_pages = (total + PER_PAGE - 1) // PER_PAGE
    page = min(page, total_pages)
    items = qs[(page - 1) * PER_PAGE: page * PER_PAGE]

    await callback.message.edit_text(
        f"📋 <b>Murojaatlar</b> (jami {total} ta, sahifa {page}/{total_pages})",
        reply_markup=appeals_list_keyboard(items, page, total_pages, status_f),
    )


@dp.callback_query(F.data.startswith("apadm_det:"))
async def appeal_detail(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    appeal = Appeal.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not appeal:
        await callback.message.edit_text("Murojaat topilmadi.", reply_markup=back_to("apadm_menu"))
        return
    await callback.message.edit_text(
        appeal_card(appeal), reply_markup=appeal_detail_keyboard(appeal)
    )


@dp.callback_query(F.data.startswith("apadm_status:"))
async def appeal_set_status(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    _, appeal_id, status = callback.data.split(":")
    if status not in AppealStatus.values:
        return
    appeal = Appeal.objects.filter(id=int(appeal_id)).first()
    if not appeal:
        return
    appeal.status = status
    if status == AppealStatus.ANSWERED and appeal.answered_at is None:
        appeal.answered_at = timezone.now()
        appeal.answered_by = callback.from_user.id
    appeal.save()
    log_action(callback.from_user.id, "murojaat_holati", f"#{appeal.id} → {status}")
    await callback.message.edit_text(
        appeal_card(appeal), reply_markup=appeal_detail_keyboard(appeal)
    )


@dp.callback_query(F.data.startswith("apadm_reply:"))
async def appeal_reply_start(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    appeal_id = int(callback.data.split(":")[1])
    await state.set_state(AppealAdminState.reply)
    await state.update_data(reply_appeal_id=appeal_id)
    await callback.message.edit_text(
        f"✍️ <b>#{appeal_id} murojaatga javob</b>\n\n"
        "Javob matnini yozing — u foydalanuvchiga bot orqali yuboriladi.",
        reply_markup=back_to(f"apadm_det:{appeal_id}", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(AppealAdminState.reply))
async def appeal_reply_send(message: Message, state: FSMContext):
    data = await state.get_data()
    await state.clear()
    appeal = Appeal.objects.filter(id=data.get("reply_appeal_id")).first()
    if not appeal:
        await message.answer("Murojaat topilmadi.", reply_markup=back_to("apadm_menu"))
        return

    text = (message.text or "").strip()
    if not text:
        await message.answer(
            "❗️ Javob matni bo'sh bo'lmasin.",
            reply_markup=back_to(f"apadm_det:{appeal.id}", text="❌ Bekor qilish"),
        )
        return

    try:
        await bot.send_message(
            chat_id=appeal.telegram_id,
            text=(
                f"📬 <b>#{appeal.id} murojaatingizga javob</b>\n\n"
                f"{text}\n\n"
                "—\nO'zbekiston Yoshlar ittifoqi Toshkent shahar hududiy Kengashi"
            ),
        )
        delivered = True
    except Exception as e:
        delivered = False
        error = str(e)

    appeal.response = text
    appeal.status = AppealStatus.ANSWERED
    appeal.answered_at = timezone.now()
    appeal.answered_by = message.from_user.id
    appeal.save()
    log_action(message.from_user.id, "murojaatga_javob", f"#{appeal.id}")

    note = ("✅ Javob foydalanuvchiga yuborildi." if delivered else
            f"⚠️ Javob saqlandi, lekin foydalanuvchiga yetmadi ({error[:100]}). "
            "Ehtimol u botni bloklagan.")
    await message.answer(note, reply_markup=back_to(f"apadm_det:{appeal.id}", text="📄 Murojaatni ko'rish"))


@dp.callback_query(F.data == "apadm_export")
async def appeals_export(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer("Tayyorlanmoqda…")
    data = export_appeals_excel()
    log_action(callback.from_user.id, "murojaat_eksport", f"{Appeal.objects.count()} yozuv")
    await callback.message.answer_document(
        document=BufferedInputFile(data, filename="murojaatlar.xlsx"),
        caption="📥 Murojaatlar ro'yxati",
    )


@dp.callback_query(F.data == "apadm_link")
async def appeals_link(callback: CallbackQuery):
    """Murojaat qoldirish uchun deep-link (kanal e'loni yoki saytga qo'yish uchun)."""
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    link = await build_appeal_link(bot)
    await callback.message.edit_text(
        "🔗 <b>Murojaat havolasi</b>\n\n"
        f"<code>{link}</code>\n\n"
        "Shu havolani kanal e'loniga, saytga yoki e'lon tugmasiga qo'ying — "
        "bosgan odam to'g'ridan-to'g'ri murojaat yo'llash oqimiga tushadi.\n\n"
        "Tugma matni uchun namuna: «📝 Murojaat yo'llash».",
        reply_markup=back_to("apadm_menu"),
    )
