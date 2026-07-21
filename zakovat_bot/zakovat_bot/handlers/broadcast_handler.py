"""Yaxshilangan tarqatish (TZ 4) va statistika (TZ 5).

Oqim: post forward qilinadi → qamrov tanlanadi (hammasi/tur/teg) →
preview + tasdiqlash → hozir yuborish yoki rejalashtirish.
"""
import asyncio
from datetime import datetime

from aiogram import F
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from django.utils import timezone

from zakovat_bot.buttons.inline import admin_main_keyboard
from zakovat_bot.buttons.panel import (
    back_to,
    broadcast_confirm_keyboard,
    broadcast_delete_confirm_keyboard,
    broadcast_report_keyboard,
    broadcast_target_keyboard,
    history_keyboard,
    scheduled_detail_keyboard,
    scheduled_list_keyboard,
    stats_menu_keyboard,
)
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import (
    AdminRole,
    Broadcast,
    BroadcastStatus,
    Channel,
)
from zakovat_bot.permissions import get_admin, has_role, is_admin, log_action
from zakovat_bot.services.broadcasting import (
    build_report,
    channels_for_filter,
    clamp_lines,
    delete_broadcast_messages,
    describe_filter,
    run_broadcast,
)
from zakovat_bot.services.excel import export_broadcast_report
from zakovat_bot.state import BroadcastState

# Albom (bir nechta xabar) yig'ish uchun debounce
_pending_posts = {}
_pending_tasks = {}


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


# ================= Yangi tarqatish =================

@dp.callback_query(F.data == "bc_new")
async def broadcast_new(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    active = Channel.objects.filter(is_active=True).count()
    if active == 0:
        await callback.message.edit_text(
            "❗️ Bazada faol kanal yo'q. Avval «Kanallar bazasi» bo'limidan kanal qo'shing.",
            reply_markup=back_to("admin_main_menu"),
        )
        return
    await state.set_state(BroadcastState.waiting_post)
    await callback.message.edit_text(
        "📨 Tarqatiladigan postni botga <b>forward</b> qiling "
        "(albom bo'lsa hammasini birga yuboring):",
        reply_markup=back_to("admin_main_menu"),
    )


@dp.message(StateFilter(BroadcastState.waiting_post))
async def broadcast_collect_post(message: Message, state: FSMContext):
    user_id = message.from_user.id
    if user_id not in _pending_posts:
        _pending_posts[user_id] = {"chat_id": message.chat.id, "message_ids": []}
    _pending_posts[user_id]["message_ids"].append(message.message_id)

    if user_id in _pending_tasks:
        _pending_tasks[user_id].cancel()
    _pending_tasks[user_id] = asyncio.create_task(_finalize_post(user_id, state))


async def _finalize_post(user_id, state):
    await asyncio.sleep(1.2)
    post = _pending_posts.pop(user_id, None)
    _pending_tasks.pop(user_id, None)
    if not post:
        return

    await state.update_data(
        source_chat_id=post["chat_id"], message_ids=post["message_ids"]
    )
    tags = list(
        Channel.objects.filter(is_active=True, tag__isnull=False)
        .values_list("tag", flat=True).distinct()
    )
    active = Channel.objects.filter(is_active=True)
    counts = {"all": active.count()}
    for t in ("davlat", "xorijiy", "nodavlat"):
        counts[t] = active.filter(ott_type=t).count()
    await bot.send_message(
        user_id,
        "🎯 Qamrovni tanlang — post qaysi kanallarga yuborilsin?",
        reply_markup=broadcast_target_keyboard(tags, counts),
    )


@dp.callback_query(F.data.startswith("bc_tgt:"))
async def broadcast_target(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    target_filter = callback.data.split(":", 1)[1]  # all | type:x | tag:y

    data = await state.get_data()
    if not data.get("message_ids"):
        await callback.message.edit_text("❗️ Post topilmadi. Qaytadan boshlang.")
        return

    count = channels_for_filter(target_filter).count()
    if count == 0:
        await callback.answer("Bu qamrovda faol kanal yo'q.", show_alert=True)
        return
    await state.update_data(target_filter=target_filter)

    # Preview (TZ 4.1): postni qaytarib ko'rsatamiz + xulosa
    try:
        await bot.forward_messages(
            chat_id=callback.from_user.id,
            from_chat_id=data["source_chat_id"],
            message_ids=data["message_ids"],
        )
    except Exception:
        pass
    await callback.message.answer(
        "👆 <b>Oldindan ko'rish</b>\n\n"
        f"🎯 Qamrov: {describe_filter(target_filter)}\n"
        f"📡 Kanallar soni: <b>{count} ta</b>\n\n"
        "Tasdiqlaysizmi?",
        reply_markup=broadcast_confirm_keyboard(),
    )


@dp.callback_query(F.data == "bc_cancel")
async def broadcast_cancel(callback: CallbackQuery, state: FSMContext):
    await callback.answer()
    await state.clear()
    admin = get_admin(callback.from_user.id)
    await callback.message.edit_text(
        "❌ Tarqatish bekor qilindi.",
    )
    await callback.message.answer(
        "🤵🏼 Admin paneli", reply_markup=admin_main_keyboard(admin.role if admin else None)
    )


@dp.callback_query(F.data == "bc_go")
async def broadcast_go(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    data = await state.get_data()
    await state.clear()
    if not data.get("message_ids"):
        await callback.message.edit_text("❗️ Post topilmadi. Qaytadan boshlang.")
        return

    broadcast = Broadcast.objects.create(
        source_chat_id=data["source_chat_id"],
        message_ids=data["message_ids"],
        admin_id=callback.from_user.id,
        target_filter=data.get("target_filter", "all"),
        status=BroadcastStatus.IN_PROGRESS,
    )
    log_action(callback.from_user.id, "tarqatish_boshlandi", f"#{broadcast.id}")
    await callback.message.edit_text(
        f"🚀 Tarqatish #{broadcast.id} boshlandi. Yakunlangach hisobot yuboriladi."
    )
    asyncio.create_task(_run_and_report(broadcast.id, callback.from_user.id))


async def _run_and_report(broadcast_id, admin_tg_id):
    try:
        report = await run_broadcast(bot, broadcast_id)
    except Exception as e:
        report = f"❗️ Tarqatish #{broadcast_id} xato bilan to'xtadi: {e}"
    admin = get_admin(admin_tg_id)
    try:
        await bot.send_message(
            chat_id=admin_tg_id, text=report,
            reply_markup=admin_main_keyboard(admin.role if admin else None),
        )
    except Exception:
        pass


# ================= Rejalashtirish (TZ 4.2) =================

@dp.callback_query(F.data == "bc_sched")
async def broadcast_schedule_ask(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(BroadcastState.waiting_schedule)
    await callback.message.edit_text(
        "⏰ Yuborish sanasi va vaqtini kiriting.\n\n"
        "Format: <code>KK.OO.YYYY SS:DD</code> (masalan, <code>22.07.2026 09:00</code>)",
        reply_markup=back_to("admin_main_menu", text="❌ Bekor qilish"),
    )


def _parse_schedule(text):
    for fmt in ("%d.%m.%Y %H:%M", "%Y-%m-%d %H:%M"):
        try:
            naive = datetime.strptime(text.strip(), fmt)
            return timezone.make_aware(naive)
        except ValueError:
            continue
    return None


@dp.message(StateFilter(BroadcastState.waiting_schedule))
async def broadcast_schedule_set(message: Message, state: FSMContext):
    when = _parse_schedule(message.text or "")
    if when is None:
        await message.answer(
            "❗️ Format noto'g'ri. Masalan: <code>22.07.2026 09:00</code>",
            reply_markup=back_to("admin_main_menu", text="❌ Bekor qilish"),
        )
        return
    if when <= timezone.now():
        await message.answer(
            "❗️ Vaqt kelajakda bo'lishi kerak.",
            reply_markup=back_to("admin_main_menu", text="❌ Bekor qilish"),
        )
        return

    data = await state.get_data()
    await state.clear()
    if not data.get("message_ids"):
        await message.answer("❗️ Post topilmadi. Qaytadan boshlang.")
        return

    broadcast = Broadcast.objects.create(
        source_chat_id=data["source_chat_id"],
        message_ids=data["message_ids"],
        admin_id=message.from_user.id,
        target_filter=data.get("target_filter", "all"),
        status=BroadcastStatus.SCHEDULED,
        scheduled_at=when,
    )
    log_action(
        message.from_user.id, "tarqatish_rejalashtirildi",
        f"#{broadcast.id} {when:%d.%m.%Y %H:%M}",
    )
    admin = get_admin(message.from_user.id)
    await message.answer(
        f"✅ Tarqatish #{broadcast.id} rejalashtirildi: "
        f"<b>{timezone.localtime(when):%d.%m.%Y %H:%M}</b>\n"
        "Bot belgilangan vaqtda avtomatik yuboradi.",
        reply_markup=admin_main_keyboard(admin.role if admin else None),
    )


@dp.callback_query(F.data == "bc_plans")
async def scheduled_list(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    plans = list(
        Broadcast.objects.filter(status=BroadcastStatus.SCHEDULED).order_by("scheduled_at")
    )
    if not plans:
        await callback.message.edit_text(
            "⏰ Rejalashtirilgan tarqatish yo'q.",
            reply_markup=scheduled_list_keyboard([]),
        )
        return
    await callback.message.edit_text(
        f"⏰ <b>Rejalashtirilgan tarqatishlar</b> ({len(plans)} ta):",
        reply_markup=scheduled_list_keyboard(plans),
    )


@dp.callback_query(F.data.startswith("bc_plan:"))
async def scheduled_detail(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    broadcast = Broadcast.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not broadcast or broadcast.status != BroadcastStatus.SCHEDULED:
        await callback.message.edit_text(
            "Bu reja topilmadi yoki allaqachon bajarilgan.",
            reply_markup=back_to("bc_plans"),
        )
        return
    count = channels_for_filter(broadcast.target_filter).count()
    when = timezone.localtime(broadcast.scheduled_at)
    await callback.message.edit_text(
        f"⏰ <b>Reja #{broadcast.id}</b>\n\n"
        f"📅 Vaqt: {when:%d.%m.%Y %H:%M}\n"
        f"🎯 Qamrov: {describe_filter(broadcast.target_filter)} ({count} ta kanal)\n"
        f"👤 Kim: <code>{broadcast.admin_id}</code>",
        reply_markup=scheduled_detail_keyboard(broadcast.id),
    )


@dp.callback_query(F.data.startswith("bc_plan_cancel:"))
async def scheduled_cancel(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    broadcast = Broadcast.objects.filter(id=int(callback.data.split(":")[1])).first()
    if broadcast and broadcast.status == BroadcastStatus.SCHEDULED:
        broadcast.status = BroadcastStatus.CANCELLED
        broadcast.save(update_fields=["status"])
        log_action(callback.from_user.id, "reja_bekor_qilindi", f"#{broadcast.id}")
        await callback.message.edit_text(
            f"🚫 Reja #{broadcast.id} bekor qilindi.", reply_markup=back_to("bc_plans")
        )
    else:
        await callback.message.edit_text(
            "Bu reja topilmadi yoki allaqachon bajarilgan.",
            reply_markup=back_to("bc_plans"),
        )


# ================= Statistika (TZ 5) =================

HISTORY_PER_PAGE = 8


@dp.callback_query(F.data == "st_menu")
async def stats_menu(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    total = Broadcast.objects.filter(status=BroadcastStatus.DONE).count()
    problem = Channel.objects.filter(is_active=True, bot_is_admin=False).count()
    await callback.message.edit_text(
        "📈 <b>Statistika</b>\n\n"
        f"🗂 Yakunlangan tarqatishlar: {total} ta\n"
        f"⚠️ Muammoli kanallar: {problem} ta",
        reply_markup=stats_menu_keyboard(),
    )


@dp.callback_query(F.data.startswith("st_history:"))
async def stats_history(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    page = max(1, int(callback.data.split(":")[1]))
    qs = Broadcast.objects.filter(
        status__in=[BroadcastStatus.DONE, BroadcastStatus.IN_PROGRESS]
    ).order_by("-created_datetime")
    total = qs.count()
    if total == 0:
        await callback.message.edit_text(
            "Hozircha tarqatishlar bo'lmagan.", reply_markup=stats_menu_keyboard()
        )
        return
    total_pages = (total + HISTORY_PER_PAGE - 1) // HISTORY_PER_PAGE
    page = min(page, total_pages)
    items = qs[(page - 1) * HISTORY_PER_PAGE: page * HISTORY_PER_PAGE]
    await callback.message.edit_text(
        f"🗂 <b>Tarqatishlar tarixi</b> (sahifa {page}/{total_pages})",
        reply_markup=history_keyboard(items, page, total_pages),
    )


@dp.callback_query(F.data.startswith("st_bc:"))
async def stats_broadcast_detail(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    broadcast = Broadcast.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not broadcast:
        await callback.message.edit_text("Tarqatish topilmadi.")
        return
    # O'chirish tugmasi: hali o'chirilmagan, yetkazilgan xabarlar bo'lsa
    can_delete = (
        has_role(callback.from_user.id, AdminRole.OPERATOR)
        and broadcast.results.filter(delivered=True, deleted_from_channel=False).exists()
    )
    await callback.message.edit_text(
        build_report(broadcast),
        reply_markup=broadcast_report_keyboard(broadcast.id, can_delete=can_delete),
    )


@dp.callback_query(F.data.startswith("st_bc_del:"))
async def stats_broadcast_delete_ask(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    broadcast = Broadcast.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not broadcast:
        return
    count = broadcast.results.filter(delivered=True, deleted_from_channel=False).count()
    await callback.message.edit_text(
        f"🗑 Tarqatish #{broadcast.id} posti <b>{count} ta kanaldan</b> o'chirilsinmi?\n\n"
        "⚠️ Bu amalni ortga qaytarib bo'lmaydi — post barcha kanallardan yo'qoladi.",
        reply_markup=broadcast_delete_confirm_keyboard(broadcast.id),
    )


@dp.callback_query(F.data.startswith("st_bc_delok:"))
async def stats_broadcast_delete_run(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    broadcast_id = int(callback.data.split(":")[1])
    log_action(callback.from_user.id, "tarqatish_ochirildi", f"#{broadcast_id}")
    await callback.message.edit_text(
        f"🗑 Tarqatish #{broadcast_id} kanallardan o'chirilmoqda… "
        "Yakunlangach hisobot keladi."
    )
    asyncio.create_task(_delete_and_report(broadcast_id, callback.from_user.id))


async def _delete_and_report(broadcast_id, admin_tg_id):
    try:
        report = await delete_broadcast_messages(bot, broadcast_id)
    except Exception as e:
        report = f"❗️ O'chirishda xato: {e}"
    try:
        await bot.send_message(
            chat_id=admin_tg_id, text=report,
            reply_markup=broadcast_report_keyboard(broadcast_id),
        )
    except Exception:
        pass


@dp.callback_query(F.data.startswith("st_bc_xls:"))
async def stats_broadcast_export(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer("Tayyorlanmoqda…")
    broadcast = Broadcast.objects.filter(id=int(callback.data.split(":")[1])).first()
    if not broadcast:
        return
    data = export_broadcast_report(broadcast)
    await callback.message.answer_document(
        document=BufferedInputFile(data, filename=f"tarqatish_{broadcast.id}_hisobot.xlsx"),
        caption=f"📊 Tarqatish #{broadcast.id} hisoboti",
    )


@dp.callback_query(F.data == "st_problems")
async def stats_problems(callback: CallbackQuery):
    """Bot admin bo'lmagan yoki oxirgi tarqatishda xato bergan kanallar (TZ 5)."""
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    problems = list(Channel.objects.filter(is_active=True, bot_is_admin=False))

    last_done = (
        Broadcast.objects.filter(status=BroadcastStatus.DONE)
        .order_by("-created_datetime").first()
    )
    failed_last = []
    if last_done:
        failed_last = [
            (r.channel, r.error_reason)
            for r in last_done.results.filter(delivered=False).select_related("channel")
        ]

    lines = ["⚠️ <b>Muammoli kanallar</b>\n"]
    if problems:
        lines.append(f"<b>Bot admin bo'lmaganlar ({len(problems)} ta):</b>")
        for ch in problems:
            lines.append(f"• {ch.ott_name} ({('@' + ch.username) if ch.username else ch.chat_id})")
    if failed_last:
        lines.append(f"\n<b>Oxirgi tarqatishda (#{last_done.id}) xato berganlar ({len(failed_last)} ta):</b>")
        for ch, reason in failed_last:
            lines.append(f"• {ch.ott_name} — {reason}")
    if not problems and not failed_last:
        lines.append("Hammasi joyida — muammoli kanal yo'q ✅")
    else:
        lines.append("\nTo'liq ro'yxat: Kanallar bazasi → Excel eksport")

    # 4096 belgi chegarasidan oshmasligi uchun qisqartiriladi
    await callback.message.edit_text(clamp_lines(lines), reply_markup=stats_menu_keyboard())
