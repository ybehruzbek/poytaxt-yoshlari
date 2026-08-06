"""Online chat admin bo'limi (TZ F-08): statistika, eksport, ommaviy xabar,
eslatmalar holati, sozlamalar."""
import asyncio
from datetime import datetime, timedelta

from aiogram import F
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.exceptions import TelegramForbiddenError, TelegramRetryAfter
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    back_to,
    chat_admin_menu_keyboard,
    chat_participants_keyboard,
    chat_settings_keyboard,
)
from zakovat_bot.dispatcher import bot, dp
from zakovat_bot.models import (
    AdminRole,
    ChatEvent,
    ChatParticipant,
    ParticipantStatus,
)
from zakovat_bot.permissions import get_admin, has_role, is_admin, log_action
from zakovat_bot.services.chat_event import (
    REMINDER_LABELS,
    SEND_PAUSE,
    active_event,
    event_stats,
    event_when_text,
    export_participants_excel,
)
from zakovat_bot.state import ChatAdminState


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


def _menu_text(event):
    if event is None:
        return "💬 <b>Online chat</b>\n\nFaol tadbir yo'q."
    link = event.chat_link or "kiritilmagan"
    return (
        "💬 <b>Online chat</b>\n\n"
        f"📅 {event_when_text(event)}\n"
        f"🔗 Havola: {link}\n"
        f"👥 Ro'yxatdan o'tganlar: "
        f"{ChatParticipant.objects.filter(event=event, status=ParticipantStatus.REGISTERED).count()} ta"
    )


@dp.callback_query(F.data == "chadm_menu")
async def chat_admin_menu(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    admin = get_admin(callback.from_user.id)
    event = active_event()
    if event is None and admin.role == AdminRole.SUPERADMIN:
        # Tadbir yo'q bo'lsa superadmin darhol yaratishi uchun
        ChatEvent.objects.create(
            title="Online chat",
            start_at=timezone.now() + timedelta(days=7),
        )
        event = active_event()
    await callback.message.edit_text(
        _menu_text(event), reply_markup=chat_admin_menu_keyboard(admin.role)
    )


@dp.callback_query(F.data == "chadm_stats")
async def chat_admin_stats(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    event = active_event()
    if event is None:
        await callback.message.edit_text("Faol tadbir yo'q.", reply_markup=back_to("chadm_menu"))
        return
    s = event_stats(event)
    lines = [
        "📊 <b>Online chat statistikasi</b>\n",
        f"✅ Jami ro'yxatdan o'tganlar: <b>{s['registered']}</b>",
        f"🆕 Bugun: {s['today']}",
        f"🚫 Botni bloklaganlar: {s['blocked']}",
        f"❌ Bekor qilganlar: {s['cancelled']}",
        "\n⏰ <b>Eslatmalar:</b>",
    ]
    for r in s["reminders"]:
        total = s["registered"] or 1
        pct = round(100 * r["sent"] / total)
        lines.append(
            f"• {REMINDER_LABELS[r['type']]}: yuborildi {r['sent']} ({pct}%), "
            f"xato {r['failed']}, blok {r['blocked']}"
        )
    await callback.message.edit_text("\n".join(lines), reply_markup=back_to("chadm_menu"))


@dp.callback_query(F.data == "chadm_reminders")
async def chat_admin_reminders(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    event = active_event()
    if event is None:
        await callback.message.edit_text("Faol tadbir yo'q.", reply_markup=back_to("chadm_menu"))
        return
    s = event_stats(event)
    now = timezone.now()
    lines = ["⏰ <b>Eslatmalar holati</b>\n"]
    from zakovat_bot.services.chat_event import REMINDERS
    for (rtype, offset, _grace), r in zip(REMINDERS, s["reminders"]):
        due = timezone.localtime(event.start_at - offset)
        mark = "✅" if now >= event.start_at - offset else "🕓"
        lines.append(
            f"{mark} <b>{REMINDER_LABELS[rtype]}</b> — {due:%d.%m %H:%M}\n"
            f"   yuborildi: {r['sent']}, xato: {r['failed']}, blok: {r['blocked']}"
        )
    await callback.message.edit_text("\n".join(lines), reply_markup=back_to("chadm_menu"))


PARTICIPANTS_PER_PAGE = 15


@dp.callback_query(F.data.startswith("chadm_list:"))
async def chat_admin_participants(callback: CallbackQuery):
    """Ro'yxatdan o'tganlar — bot ichida sahifalangan ro'yxat."""
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    event = active_event()
    if event is None:
        await callback.message.edit_text("Faol tadbir yo'q.", reply_markup=back_to("chadm_menu"))
        return

    qs = ChatParticipant.objects.filter(
        event=event, status=ParticipantStatus.REGISTERED
    ).order_by("id")
    total = qs.count()
    if total == 0:
        await callback.message.edit_text(
            "Hozircha hech kim ro'yxatdan o'tmagan.", reply_markup=back_to("chadm_menu")
        )
        return

    page = max(1, int(callback.data.split(":")[1]))
    total_pages = (total + PARTICIPANTS_PER_PAGE - 1) // PARTICIPANTS_PER_PAGE
    page = min(page, total_pages)
    start = (page - 1) * PARTICIPANTS_PER_PAGE

    lines = [f"👥 <b>Ro'yxatdan o'tganlar</b> — jami {total} ta "
             f"(sahifa {page}/{total_pages})\n"]
    for p in qs[start:start + PARTICIPANTS_PER_PAGE]:
        username = f" (@{p.username})" if p.username else ""
        blocked = " 🚫" if p.is_blocked else ""
        lines.append(f"<b>#{p.id}</b> {p.full_name} — {p.phone}{username}{blocked}")

    await callback.message.edit_text(
        "\n".join(lines), reply_markup=chat_participants_keyboard(page, total_pages)
    )


@dp.callback_query(F.data == "chadm_export")
async def chat_admin_export(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer("Tayyorlanmoqda…")
    event = active_event()
    if event is None:
        return
    data = export_participants_excel(event)
    log_action(callback.from_user.id, "chat_eksport",
               f"tadbir #{event.id}, {ChatParticipant.objects.filter(event=event).count()} yozuv")
    await callback.message.answer_document(
        document=BufferedInputFile(data, filename="chat_ishtirokchilar.xlsx"),
        caption=f"📥 Ishtirokchilar ro'yxati — {event_when_text(event)}",
    )


# ==================== Ommaviy xabar ====================

@dp.callback_query(F.data == "chadm_bcast")
async def chat_admin_bcast(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.OPERATOR):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ChatAdminState.broadcast)
    await callback.message.edit_text(
        "📨 Ishtirokchilarga yuboriladigan xabarni yozing (matn yoki rasm):",
        reply_markup=back_to("chadm_menu", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ChatAdminState.broadcast))
async def chat_admin_bcast_send(message: Message, state: FSMContext):
    await state.clear()
    event = active_event()
    if event is None:
        await message.answer("Faol tadbir yo'q.")
        return
    participants = list(
        ChatParticipant.objects.filter(
            event=event, status=ParticipantStatus.REGISTERED, is_blocked=False
        )
    )
    sent = failed = 0
    status_msg = await message.answer(f"📨 Yuborilmoqda… (0/{len(participants)})")
    for i, p in enumerate(participants, 1):
        try:
            # copy_message har qanday kontentni (matn/rasm/havola) qo'llaydi
            await bot.copy_message(
                chat_id=p.telegram_id,
                from_chat_id=message.chat.id,
                message_id=message.message_id,
            )
            sent += 1
        except TelegramForbiddenError:
            p.is_blocked = True
            p.save(update_fields=["is_blocked"])
            failed += 1
        except TelegramRetryAfter as e:
            await asyncio.sleep(e.retry_after + 1)
            failed += 1
        except Exception:
            failed += 1
        if i % 50 == 0:
            try:
                await status_msg.edit_text(f"📨 Yuborilmoqda… ({i}/{len(participants)})")
            except Exception:
                pass
        await asyncio.sleep(SEND_PAUSE)

    log_action(message.from_user.id, "chat_ommaviy_xabar", f"yuborildi {sent}, xato {failed}")
    await status_msg.edit_text(
        f"📨 Yakunlandi.\n✅ Yuborildi: {sent}\n❌ Xato/blok: {failed}",
        reply_markup=back_to("chadm_menu"),
    )


# ==================== Sozlamalar ====================

@dp.callback_query(F.data == "chadm_settings")
async def chat_admin_settings(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    event = active_event()
    if event is None:
        await callback.message.edit_text("Faol tadbir yo'q.", reply_markup=back_to("chadm_menu"))
        return
    await callback.message.edit_text(
        "⚙️ <b>Sozlamalar</b>\n\n"
        f"📅 Hozirgi vaqt: {event_when_text(event)}\n"
        f"🔗 Havola: {event.chat_link or 'kiritilmagan'}",
        reply_markup=chat_settings_keyboard(),
    )


@dp.callback_query(F.data == "chadm_set_dt")
async def chat_admin_set_dt(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ChatAdminState.edit_datetime)
    await callback.message.edit_text(
        "📅 Yangi sana va vaqtni kiriting.\n\n"
        "Format: <code>KK.OO.YYYY SS:DD</code> (masalan, <code>09.08.2026 20:00</code>)",
        reply_markup=back_to("chadm_settings", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ChatAdminState.edit_datetime))
async def chat_admin_set_dt_save(message: Message, state: FSMContext):
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
            "❗️ Format noto'g'ri. Masalan: <code>09.08.2026 20:00</code>",
            reply_markup=back_to("chadm_settings", text="❌ Bekor qilish"),
        )
        return
    await state.clear()
    event = active_event()
    if event:
        event.start_at = when
        event.save(update_fields=["start_at"])
        log_action(message.from_user.id, "chat_vaqt_ozgartirildi", f"{when:%d.%m.%Y %H:%M}")
    await message.answer(
        f"✅ Tadbir vaqti yangilandi: <b>{event_when_text(event)}</b>",
        reply_markup=back_to("chadm_menu"),
    )


@dp.callback_query(F.data == "chadm_set_link")
async def chat_admin_set_link(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ChatAdminState.edit_link)
    await callback.message.edit_text(
        "🔗 Chat havolasini yuboring (masalan, <code>https://t.me/+abc...</code>).\n"
        "Havola «Chat boshlandi» xabarida ishtirokchilarga yuboriladi.",
        reply_markup=back_to("chadm_settings", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ChatAdminState.edit_link))
async def chat_admin_set_link_save(message: Message, state: FSMContext):
    value = (message.text or "").strip()
    if not value.startswith(("https://", "http://", "t.me/")):
        await message.answer(
            "❗️ Havola https:// yoki t.me/ bilan boshlanishi kerak.",
            reply_markup=back_to("chadm_settings", text="❌ Bekor qilish"),
        )
        return
    await state.clear()
    event = active_event()
    if event:
        event.chat_link = value
        event.save(update_fields=["chat_link"])
        log_action(message.from_user.id, "chat_havola_ozgartirildi", value[:100])
    await message.answer("✅ Chat havolasi saqlandi.", reply_markup=back_to("chadm_menu"))
