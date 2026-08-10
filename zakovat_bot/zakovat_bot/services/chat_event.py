"""Online chat: validatsiya, eslatmalar va hisobotlar (TZ online chat bot).

Eslatmalar jadvali (F-06): 1 kun / 10 soat / 1 soat oldin + boshlanish xabari.
Idempotentlik — ReminderLog'dagi UNIQUE(participant, reminder_type) orqali.
"""
import asyncio
import logging
from datetime import timedelta
from io import BytesIO

from aiogram.exceptions import TelegramForbiddenError, TelegramRetryAfter
from django.utils import timezone
from openpyxl import Workbook

from zakovat_bot.models import (
    ChatEvent,
    ChatParticipant,
    ParticipantStatus,
    ReminderLog,
)

logger = logging.getLogger(__name__)

SEND_PAUSE = 0.05  # ~20 xabar/soniya — TZ 25-30 chegarasidan past

# (tur, boshlanishdan necha oldin, kechikish oynasi)
# Oyna: bot shu muddatdan ko'p to'xtab qolgan bo'lsa, eskirgan eslatma yuborilmaydi
REMINDERS = [
    ("1day", timedelta(hours=24), timedelta(hours=3)),
    ("10hours", timedelta(hours=10), timedelta(hours=2)),
    ("1hour", timedelta(hours=1), timedelta(minutes=45)),
    ("start", timedelta(0), timedelta(hours=2)),
]

RETRY_BACKOFF = [timedelta(minutes=1), timedelta(minutes=5), timedelta(minutes=15)]
MAX_ATTEMPTS = 3


# Validatsiya (TZ 3.3, 3.4) — umumiy modulda; bu yerdan ham import qilinadi
from zakovat_bot.services.validators import (  # noqa: E402,F401
    PHONE_RE,
    normalize_phone,
    validate_full_name,
)


# ==================== Tadbir ====================

def active_event():
    return ChatEvent.objects.filter(is_active=True).order_by("start_at").first()


def event_when_text(event):
    local = timezone.localtime(event.start_at)
    weekdays = ["dushanba", "seshanba", "chorshanba", "payshanba",
                "juma", "shanba", "yakshanba"]
    months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul",
              "avgust", "sentabr", "oktabr", "noyabr", "dekabr"]
    return (f"{local.day}-{months[local.month - 1]}, {weekdays[local.weekday()]} — "
            f"soat {local:%H:%M}")


def first_name(participant):
    return (participant.full_name or "do'st").split()[0]


# ==================== Eslatma matnlari (F-06) ====================

def build_reminder_text(rtype, participant, event):
    when = timezone.localtime(event.start_at)
    if rtype == "1day":
        return (
            "⏰ <b>Eslatma: 1 kun qoldi</b>\n\n"
            f"Hurmatli {first_name(participant)}, ertaga — "
            f"<b>{event_when_text(event)}</b> da online chat bo'lib o'tadi.\n\n"
            "Savollaringizni oldindan tayyorlab qo'ying! 📝"
        )
    if rtype == "10hours":
        return (
            f"⏰ <b>Eslatma: bugun soat {when:%H:%M}</b>\n\n"
            f"Hurmatli {first_name(participant)}, bugun "
            f"<b>soat {when:%H:%M}</b> da online chat boshlanadi.\n\n"
            "Vaqtida qatnashishni unutmang! 🕗"
        )
    if rtype == "1hour":
        return (
            "🔔 <b>Chatga 1 soat qoldi!</b>\n\n"
            f"Hurmatli {first_name(participant)}, online chat "
            f"<b>soat {when:%H:%M}</b> da boshlanadi.\n\n"
            "Tayyor bo'ling — bir necha daqiqadan so'ng kirish havolasi yuboriladi. 🚀"
        )
    if rtype == "start":
        if not (event.chat_link or "").strip():
            return None  # havola kiritilmagan — yuborilmaydi
        return (
            "🟢 <b>Online chat boshlandi!</b>\n\n"
            f"Quyidagi havola orqali qo'shiling:\n{event.chat_link}"
        )
    return None


# ==================== Eslatma yuboruvchi ====================

async def process_due_reminders(bot):
    """Scheduler har aylanishda chaqiradi. Vaqti kelgan eslatmalarni yuboradi.

    Kafolatlar: har ishtirokchiga har tur faqat bir marta (UNIQUE); eslatma
    vaqtidan keyin ro'yxatdan o'tganlarga yuborilmaydi (T-10); 403 → is_blocked
    (T-09); xatoda 3 martagacha qayta urinish (1/5/15 daqiqa).
    """
    event = active_event()
    if event is None:
        return
    now = timezone.now()

    for rtype, offset, grace in REMINDERS:
        due = event.start_at - offset
        if now < due or now > due + grace:
            continue

        participants = ChatParticipant.objects.filter(
            event=event,
            status=ParticipantStatus.REGISTERED,
            is_blocked=False,
            registered_at__lte=due,  # kechikkanlarga o'tib ketgan eslatma yo'q
        )
        for p in participants:
            log, created = ReminderLog.objects.get_or_create(
                participant=p, reminder_type=rtype
            )
            if not created:
                if log.status in ("sent", "blocked") or log.attempts >= MAX_ATTEMPTS:
                    continue
                if log.attempts > 0:
                    backoff = RETRY_BACKOFF[min(log.attempts, len(RETRY_BACKOFF)) - 1]
                    if log.modified_datetime + backoff > now:
                        continue

            text = build_reminder_text(rtype, p, event)
            if text is None:
                continue

            try:
                await bot.send_message(chat_id=p.telegram_id, text=text)
                log.status = "sent"
                log.sent_at = timezone.now()
                log.save(update_fields=["status", "sent_at"])
            except TelegramForbiddenError:
                p.is_blocked = True
                p.save(update_fields=["is_blocked"])
                log.status = "blocked"
                log.save(update_fields=["status"])
            except TelegramRetryAfter as e:
                await asyncio.sleep(e.retry_after + 1)
                log.status = "failed"
                log.attempts += 1
                log.error_message = f"flood-limit {e.retry_after}s"
                log.save(update_fields=["status", "attempts", "error_message"])
            except Exception as e:
                log.status = "failed"
                log.attempts += 1
                log.error_message = str(e)[:500]
                log.save(update_fields=["status", "attempts", "error_message"])
            await asyncio.sleep(SEND_PAUSE)


# ==================== Statistika va eksport (F-08) ====================

def event_stats(event):
    qs = ChatParticipant.objects.filter(event=event)
    today = timezone.localtime(timezone.now()).date()
    registered = qs.filter(status=ParticipantStatus.REGISTERED)
    stats = {
        "registered": registered.count(),
        "today": registered.filter(registered_at__date=today).count(),
        "blocked": qs.filter(is_blocked=True).count(),
        "cancelled": qs.filter(status=ParticipantStatus.CANCELLED).count(),
        "reminders": [],
    }
    for rtype, _offset, _grace in REMINDERS:
        logs = ReminderLog.objects.filter(
            participant__event=event, reminder_type=rtype
        )
        stats["reminders"].append({
            "type": rtype,
            "sent": logs.filter(status="sent").count(),
            "failed": logs.filter(status="failed").count(),
            "blocked": logs.filter(status="blocked").count(),
        })
    return stats


REMINDER_LABELS = {
    "1day": "1 kun oldin",
    "10hours": "10 soat oldin",
    "1hour": "1 soat oldin",
    "start": "Chat boshlandi",
}


def export_participants_excel(event):
    """Ishtirokchilar ro'yxati .xlsx (F-08)."""
    wb = Workbook()
    ws = wb.active
    ws.title = "Ishtirokchilar"
    ws.append(["№", "Ism-familiya", "Telefon", "Telegram ID", "Username",
               "Holati", "Manba", "Ro'yxatdan o'tgan vaqt"])
    rows = ChatParticipant.objects.filter(event=event).order_by("id")
    for p in rows:
        ws.append([
            p.id,
            p.full_name or "",
            p.phone or "",
            p.telegram_id,
            f"@{p.username}" if p.username else "",
            p.get_status_display(),
            p.source or "",
            timezone.localtime(p.registered_at).strftime("%Y-%m-%d %H:%M")
            if p.registered_at else "",
        ])
    buf = BytesIO()
    wb.save(buf)
    return buf.getvalue()
