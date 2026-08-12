"""Online chat admin bo'limi (TZ F-08): statistika, eksport, ommaviy xabar,
eslatmalar holati, sozlamalar."""
import asyncio
from datetime import datetime, timedelta

from aiogram import F
from aiogram.types import BufferedInputFile, CallbackQuery, Message
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.exceptions import TelegramForbiddenError, TelegramRetryAfter
from django.utils import timezone

from zakovat_bot.buttons.panel import (
    back_to,
    chat_admin_menu_keyboard,
    chat_participants_keyboard,
    chat_settings_keyboard,
    event_card_keyboard,
    events_list_keyboard,
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
    SEND_PAUSE,
    event_stats,
    event_when_text,
    export_participants_excel,
)
from zakovat_bot.state import ChatAdminState


async def _deny(callback):
    await callback.answer("⛔ Bu amal uchun huquqingiz yetarli emas.", show_alert=True)


# ==================== Admin buyruqlari (TZ 7) ====================

@dp.message(Command("stat"))
async def cmd_stat(message: Message):
    """Ro'yxatdan o'tganlar statistikasi. Admin bo'lmaganga javob bermaydi."""
    if not is_admin(message.from_user.id):
        return
    event = _latest_event()
    if event is None:
        await message.answer("Faol tadbir yo'q.")
        return
    s = event_stats(event)
    pending = ChatParticipant.objects.filter(
        event=event, status=ParticipantStatus.PENDING
    ).count()
    lines = [
        f"📊 <b>{event.title}</b>",
        f"{event_when_text(event)}\n",
        f"✅ Tasdiqlangan: <b>{s['registered']}</b>",
        f"⏳ Tugallanmagan: {pending}",
        f"🆕 Bugun ro'yxatdan o'tgan: {s['today']}",
        f"🚫 Botni bloklaganlar: {s['blocked']}",
        f"❌ Bekor qilganlar: {s['cancelled']}",
    ]
    if s["reminders"]:
        lines.append("\n⏰ <b>Eslatmalar:</b>")
        for r in s["reminders"]:
            lines.append(f"• {r['label']}: yuborildi {r['sent']}, xato {r['failed']}")
    await message.answer("\n".join(lines))


@dp.message(Command("export"))
async def cmd_export(message: Message):
    """Ishtirokchilar ro'yxatini .xlsx qilib yuboradi."""
    if not is_admin(message.from_user.id):
        return
    event = _latest_event()
    if event is None:
        await message.answer("Faol tadbir yo'q.")
        return
    data = export_participants_excel(event)
    log_action(message.from_user.id, "chat_eksport", f"tadbir #{event.id} (/export)")
    await message.answer_document(
        document=BufferedInputFile(data, filename="ishtirokchilar.xlsx"),
        caption=f"📥 Ishtirokchilar ro'yxati — {event.title}",
    )


@dp.message(Command("send"))
async def cmd_send(message: Message, state: FSMContext):
    """Barcha tasdiqlangan ishtirokchilarga xabar yuborish."""
    if not has_role(message.from_user.id, AdminRole.OPERATOR):
        return
    await state.set_state(ChatAdminState.broadcast)
    await message.answer(
        "📨 Ishtirokchilarga yuboriladigan xabarni yozing (matn yoki rasm).\n"
        "Bekor qilish uchun /start bosing.",
    )


def _latest_event():
    """Panel boshqaradigan tadbir: faol tadbir (eng yaqini), bo'lmasa oxirgisi."""
    return (
        ChatEvent.objects.filter(is_active=True).order_by("start_at").first()
        or ChatEvent.all_objects.order_by("-id").first()
    )


def _event_card(event):
    """Tadbir kartochkasi: nomi, sana, manzil/havola, holati, ro'yxat soni."""
    holat = "🟢 yoqilgan" if event.is_active else "🔴 o'chirilgan"
    registered = ChatParticipant.objects.filter(
        event=event, status=ParticipantStatus.REGISTERED
    ).count()
    lines = [
        f"📅 <b>{event.title}</b>\n",
        f"🕒 {event_when_text(event)}",
    ]
    if event.location:
        lines.append(f"📍 Manzil: {event.location}")
    if event.chat_link:
        lines.append(f"🔗 Havola: {event.chat_link}")
    if event.subscription_channel:
        lines.append(f"📢 Majburiy obuna: {event.subscription_channel}")
    if event.slug:
        lines.append(f"🔗 Ro'yxat havolasi: <code>?start={event.slug}</code>")
    lines += [
        f"⚙️ Holati: {holat}",
        f"👥 Ro'yxatdan o'tganlar: <b>{registered}</b> ta",
    ]
    return "\n".join(lines)


def _menu_text(event):
    if event is None:
        return "📅 <b>Tadbirlar</b>\n\nTadbir topilmadi."
    return _event_card(event)


@dp.callback_query(F.data == "chadm_menu")
async def chat_admin_menu(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    admin = get_admin(callback.from_user.id)
    # O'chirilgan tadbir ham ko'rinadi (aks holda sozlamalarga kirib bo'lmaydi)
    event = _latest_event()
    if event is None and admin.role == AdminRole.SUPERADMIN:
        # Umuman tadbir yo'q bo'lsa superadmin darhol yaratishi uchun
        event = ChatEvent.objects.create(
            title="Online chat",
            start_at=timezone.now() + timedelta(days=7),
        )
    await callback.message.edit_text(
        _menu_text(event), reply_markup=chat_admin_menu_keyboard(admin.role)
    )


@dp.callback_query(F.data == "chadm_stats")
async def chat_admin_stats(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    event = _latest_event()
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
            f"• {r['label']}: yuborildi {r['sent']} ({pct}%), "
            f"xato {r['failed']}, blok {r['blocked']}"
        )
    await callback.message.edit_text("\n".join(lines), reply_markup=back_to("chadm_menu"))


@dp.callback_query(F.data == "chadm_reminders")
async def chat_admin_reminders(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return await _deny(callback)
    await callback.answer()
    event = _latest_event()
    if event is None:
        await callback.message.edit_text("Faol tadbir yo'q.", reply_markup=back_to("chadm_menu"))
        return
    s = event_stats(event)
    now = timezone.now()
    lines = ["⏰ <b>Eslatmalar holati</b>\n"]
    for r in s["reminders"]:
        due = timezone.localtime(r["due"])
        mark = "✅" if now >= r["due"] else "🕓"
        lines.append(
            f"{mark} <b>{r['label']}</b> — {due:%d.%m %H:%M}\n"
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
    event = _latest_event()
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
    event = _latest_event()
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
    event = _latest_event()
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
    event = _latest_event()
    if event is None:
        await callback.message.edit_text("Tadbir topilmadi.", reply_markup=back_to("chadm_menu"))
        return
    holat = "🟢 yoqilgan" if event.is_active else "🔴 o'chirilgan"
    await callback.message.edit_text(
        "⚙️ <b>Sozlamalar</b>\n\n"
        f"📅 Hozirgi vaqt: {event_when_text(event)}\n"
        f"🔗 Havola: {event.chat_link or 'kiritilmagan'}\n"
        f"⚙️ Holati: {holat}\n\n"
        "<i>O'chirilganda botga kirgan foydalanuvchiga chat taklifi "
        "ko'rsatilmaydi va eslatmalar yuborilmaydi.</i>",
        reply_markup=chat_settings_keyboard(event.is_active),
    )


@dp.callback_query(F.data == "chadm_toggle")
async def chat_admin_toggle(callback: CallbackQuery, state: FSMContext):
    """Tadbirni yoqish/o'chirish — /start da chat taklifi ko'rinishini boshqaradi."""
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    event = _latest_event()
    if event is None:
        await callback.message.edit_text("Tadbir topilmadi.", reply_markup=back_to("chadm_menu"))
        return
    event.is_active = not event.is_active
    event.save(update_fields=["is_active"])
    log_action(
        callback.from_user.id, "chat_tadbir_holati",
        f"#{event.id} {'yoqildi' if event.is_active else 'ochirildi'}",
    )
    holat = "🟢 yoqildi" if event.is_active else "🔴 o'chirildi"
    note = ("Endi botga kirganlarga chat taklifi ko'rsatiladi."
            if event.is_active else
            "Endi botga kirganlarga chat taklifi ko'rsatilmaydi va "
            "eslatmalar yuborilmaydi.")
    await callback.message.edit_text(
        f"⚙️ Tadbir {holat}.\n\n{note}",
        reply_markup=chat_settings_keyboard(event.is_active),
    )


@dp.callback_query(F.data == "chadm_events")
async def chat_admin_events(callback: CallbackQuery, state: FSMContext):
    """Barcha tadbirlar ro'yxati — o'tganlari ham ko'rinadi."""
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.clear()
    events = list(ChatEvent.all_objects.order_by("-start_at"))
    if not events:
        await callback.message.edit_text("Tadbir yo'q.", reply_markup=back_to("chadm_menu"))
        return
    await callback.message.edit_text(
        f"📅 <b>Barcha tadbirlar</b> ({len(events)} ta)\n\n"
        "🟢 — faol (botda ro'yxat ochiq), 🔴 — o'chirilgan",
        reply_markup=events_list_keyboard(events),
    )


@dp.callback_query(F.data.startswith("chadm_ev:"))
async def chat_admin_event_card(callback: CallbackQuery):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    event = ChatEvent.all_objects.filter(id=int(callback.data.split(":")[1])).first()
    if not event:
        await callback.message.edit_text("Tadbir topilmadi.", reply_markup=back_to("chadm_events"))
        return
    await callback.message.edit_text(
        _event_card(event), reply_markup=event_card_keyboard(event)
    )


@dp.callback_query(F.data.startswith("chadm_evtgl:"))
async def chat_admin_event_toggle(callback: CallbackQuery):
    """Ro'yxatdagi aniq tadbirni yoqish/o'chirish."""
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    event = ChatEvent.all_objects.filter(id=int(callback.data.split(":")[1])).first()
    if not event:
        return
    event.is_active = not event.is_active
    event.save(update_fields=["is_active"])
    log_action(
        callback.from_user.id, "chat_tadbir_holati",
        f"#{event.id} {'yoqildi' if event.is_active else 'ochirildi'}",
    )
    await callback.message.edit_text(
        _event_card(event), reply_markup=event_card_keyboard(event)
    )


@dp.callback_query(F.data == "chadm_set_loc")
async def chat_admin_set_loc(callback: CallbackQuery, state: FSMContext):
    if not has_role(callback.from_user.id, AdminRole.SUPERADMIN):
        return await _deny(callback)
    await callback.answer()
    await state.set_state(ChatAdminState.edit_location)
    await callback.message.edit_text(
        "📍 Tadbir manzilini yozing (o'chirish uchun «-» yuboring).\n\n"
        "Manzil tasdiqlash va yakuniy xabarlarda ko'rsatiladi.",
        reply_markup=back_to("chadm_settings", text="❌ Bekor qilish"),
    )


@dp.message(StateFilter(ChatAdminState.edit_location))
async def chat_admin_set_loc_save(message: Message, state: FSMContext):
    await state.clear()
    event = _latest_event()
    value = (message.text or "").strip()
    if event:
        event.location = None if value == "-" else (value or None)
        event.save(update_fields=["location"])
        log_action(message.from_user.id, "chat_manzil_ozgartirildi", value[:100])
    await message.answer("✅ Manzil saqlandi.", reply_markup=back_to("chadm_menu"))


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
    event = _latest_event()
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
    event = _latest_event()
    if event:
        event.chat_link = value
        event.save(update_fields=["chat_link"])
        log_action(message.from_user.id, "chat_havola_ozgartirildi", value[:100])
    await message.answer("✅ Chat havolasi saqlandi.", reply_markup=back_to("chadm_menu"))
