"""Tadbirga ro'yxat: validatsiya, obuna tekshiruvi, eslatmalar va hisobotlar.

Eslatma vaqtlari har tadbirda o'zi belgilanadi (`ChatEvent.reminder_hours`,
masalan [24, 10, 1] yoki [5]) + ixtiyoriy «boshlandi» xabari.
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

DEFAULT_REMINDER_HOURS = [24, 10, 1]

RETRY_BACKOFF = [timedelta(minutes=1), timedelta(minutes=5), timedelta(minutes=15)]
MAX_ATTEMPTS = 3


def event_reminders(event):
    """Tadbir eslatmalari: [(tur, boshlanishdan oldin, kechikish oynasi), ...].

    Oyna — bot shu muddatdan ko'p to'xtab qolgan bo'lsa, eskirgan eslatma
    yuborilmaydi (odamga «tadbirga 1 soat qoldi» deb kechikib bormasin).
    """
    out = []
    hours = event.reminder_hours or DEFAULT_REMINDER_HOURS
    for h in sorted({int(x) for x in hours if int(x) > 0}, reverse=True):
        grace = timedelta(hours=min(3.0, max(0.75, h / 4)))
        out.append((f"h{h}", timedelta(hours=h), grace))
    if event.send_start_message:
        out.append(("start", timedelta(0), timedelta(hours=2)))
    return out


def reminder_label(rtype):
    if rtype == "start":
        return "Tadbir boshlandi"
    hours = int(rtype[1:])
    if hours % 24 == 0:
        return f"{hours // 24} kun oldin"
    return f"{hours} soat oldin"


# Validatsiya (TZ 3.3, 3.4) — umumiy modulda; bu yerdan ham import qilinadi
from zakovat_bot.services.validators import (  # noqa: E402,F401
    PHONE_RE,
    normalize_phone,
    validate_full_name,
)


# ==================== Tadbir ====================

def active_event():
    return ChatEvent.objects.filter(is_active=True).order_by("start_at").first()


def event_by_slug(slug):
    """Deep link parametri bo'yicha faol tadbir."""
    if not slug:
        return None
    return ChatEvent.objects.filter(is_active=True, slug=slug).first()


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


def event_info_text(event, with_link=False):
    """Tadbir ma'lumotlari bloki: nomi, sana, vaqt, manzil/havola, izoh."""
    local = timezone.localtime(event.start_at)
    lines = [
        f"📌 Tadbir: <b>{event.title}</b>",
        f"📅 Sana: {event_when_text(event)}",
        f"🕑 Vaqt: {local:%H:%M}",
    ]
    if event.location:
        lines.append(f"📍 Manzil: {event.location}")
    if with_link and (event.chat_link or "").strip():
        lines.append(f"🔗 Havola: {event.chat_link}")
    if event.arrival_note:
        lines.append(f"\n⏰ {event.arrival_note}")
    return "\n".join(lines)


# ==================== Majburiy obuna (TZ 3) ====================

SUBSCRIBED_STATUSES = {"member", "administrator", "creator"}


async def check_subscription(bot, event, tg_id):
    """Foydalanuvchi tadbir kanaliga a'zomi?

    Qaytaradi: (ok, xato_sababi). Kanal belgilanmagan bo'lsa — har doim ok.
    Bot kanalda admin bo'lmasa tekshirib bo'lmaydi — bunda ro'yxatga to'sqinlik
    qilmaymiz (ok=True), lekin log'ga yozamiz.
    """
    channel = (event.subscription_channel or "").strip()
    if not channel:
        return True, ""
    try:
        member = await bot.get_chat_member(chat_id=channel, user_id=tg_id)
    except Exception as e:
        logger.warning("Obunani tekshirib bo'lmadi (%s): %s", channel, e)
        return True, "tekshirib bo'lmadi"
    return getattr(member, "status", None) in SUBSCRIBED_STATUSES, ""


# ==================== Eslatma matnlari (F-06) ====================

def build_reminder_text(rtype, participant, event):
    """Eslatma matni. None qaytsa — bu eslatma yuborilmaydi."""
    when = timezone.localtime(event.start_at)
    name = first_name(participant)

    if rtype == "start":
        if not (event.chat_link or "").strip():
            return None  # havola kiritilmagan — yuborishdan ma'no yo'q
        return (
            f"🟢 <b>{event.title} boshlandi!</b>\n\n"
            f"Quyidagi havola orqali qo'shiling:\n{event.chat_link}"
        )

    hours = int(rtype[1:])
    if hours >= 24:
        days = hours // 24
        head = f"⏰ <b>Eslatma: {days} kun qoldi</b>"
        intro = (f"Hurmatli {name}, {'ertaga' if days == 1 else f'{days} kundan keyin'} — "
                 f"<b>{event_when_text(event)}</b> da tadbir bo'lib o'tadi.")
    elif hours == 1:
        head = "🔔 <b>Tadbirga 1 soat qoldi!</b>"
        intro = f"Hurmatli {name}, tadbir <b>soat {when:%H:%M}</b> da boshlanadi."
    else:
        head = f"⏰ <b>Eslatma: bugun soat {when:%H:%M}</b>"
        intro = (f"Hurmatli {name}, bugun <b>soat {when:%H:%M}</b> da tadbir "
                 "boshlanadi.")

    parts = [head, "", intro, "", event_info_text(event, with_link=bool(hours <= 1))]
    return "\n".join(parts)


# ==================== Eslatma yuboruvchi ====================

async def process_due_reminders(bot):
    """Scheduler har aylanishda chaqiradi. Vaqti kelgan eslatmalarni yuboradi.

    Kafolatlar: har ishtirokchiga har tur faqat bir marta (UNIQUE); eslatma
    vaqtidan keyin ro'yxatdan o'tganlarga yuborilmaydi (T-10); 403 → is_blocked
    (T-09); xatoda 3 martagacha qayta urinish (1/5/15 daqiqa).
    """
    for event in ChatEvent.objects.filter(is_active=True):
        await _process_event_reminders(bot, event)


async def _process_event_reminders(bot, event):
    now = timezone.now()

    for rtype, offset, grace in event_reminders(event):
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
    for rtype, offset, _grace in event_reminders(event):
        logs = ReminderLog.objects.filter(
            participant__event=event, reminder_type=rtype
        )
        stats["reminders"].append({
            "type": rtype,
            "label": reminder_label(rtype),
            "due": event.start_at - offset,
            "sent": logs.filter(status="sent").count(),
            "failed": logs.filter(status="failed").count(),
            "blocked": logs.filter(status="blocked").count(),
        })
    return stats


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
