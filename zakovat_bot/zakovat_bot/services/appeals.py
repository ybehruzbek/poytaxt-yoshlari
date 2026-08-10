"""Murojaatlar xizmati: deep-link generatsiyasi, adminlarga xabar, eksport."""
import logging
from io import BytesIO

from django.utils import timezone
from openpyxl import Workbook

from zakovat_bot.models import Appeal, AppealStatus, TelegramAdminsID

logger = logging.getLogger(__name__)

DEEP_LINK_PREFIX = "murojaat"

_username_cache = {}


async def get_bot_username(bot):
    """Bot @username'i (havola qurish uchun) — bir marta so'raladi va eslab qolinadi."""
    if "value" not in _username_cache:
        me = await bot.get_me()
        _username_cache["value"] = me.username
    return _username_cache["value"]


async def build_appeal_link(bot, source=None):
    """Murojaat havolasi. source — e'lon manbasini ajratish uchun (ixtiyoriy)."""
    username = await get_bot_username(bot)
    param = DEEP_LINK_PREFIX
    if source:
        safe = "".join(c for c in source if c.isalnum() or c == "_")[:20]
        if safe:
            param = f"{DEEP_LINK_PREFIX}_{safe}"
    return f"https://t.me/{username}?start={param}"


def appeal_card(appeal):
    """Murojaat kartochkasi matni (admin uchun)."""
    username = f"@{appeal.username}" if appeal.username else "—"
    lines = [
        f"📬 <b>Murojaat #{appeal.id}</b>",
        f"🏷 Turi: {appeal.get_type_display()}",
        f"📌 Holati: {appeal.get_status_display()}",
        "",
        f"👤 {appeal.full_name}",
        f"📱 {appeal.phone}",
        f"🔖 Telegram: {username} (<code>{appeal.telegram_id}</code>)",
        f"🕒 {timezone.localtime(appeal.created_datetime):%d.%m.%Y %H:%M}",
        "",
        "<b>Matn:</b>",
        appeal.message,
    ]
    if appeal.response:
        lines += ["", "<b>Berilgan javob:</b>", appeal.response]
    return "\n".join(lines)


async def notify_admins_new_appeal(bot, appeal):
    """Yangi murojaat kelganda adminlarga xabar beradi."""
    text = (
        f"🔔 <b>Yangi murojaat #{appeal.id}</b>\n\n"
        f"🏷 {appeal.get_type_display()}\n"
        f"👤 {appeal.full_name} — {appeal.phone}\n\n"
        f"{appeal.message[:500]}"
    )
    for admin in TelegramAdminsID.objects.all():
        try:
            await bot.send_message(chat_id=admin.tg_id, text=text)
        except Exception:
            logger.warning("Admin %s ga murojaat xabari yetmadi", admin.tg_id)


def appeal_stats():
    return {
        "total": Appeal.objects.count(),
        "new": Appeal.objects.filter(status=AppealStatus.NEW).count(),
        "in_review": Appeal.objects.filter(status=AppealStatus.IN_REVIEW).count(),
        "answered": Appeal.objects.filter(status=AppealStatus.ANSWERED).count(),
    }


def export_appeals_excel():
    """Murojaatlarni .xlsx ko'rinishida qaytaradi."""
    wb = Workbook()
    ws = wb.active
    ws.title = "Murojaatlar"
    ws.append(["№", "Turi", "Ism-familiya", "Telefon", "Telegram ID", "Username",
               "Murojaat matni", "Holati", "Javob", "Kelgan vaqti", "Javob vaqti"])
    for a in Appeal.objects.order_by("id"):
        ws.append([
            a.id,
            a.type,
            a.full_name,
            a.phone,
            a.telegram_id,
            f"@{a.username}" if a.username else "",
            a.message,
            a.get_status_display(),
            a.response or "",
            timezone.localtime(a.created_datetime).strftime("%Y-%m-%d %H:%M"),
            timezone.localtime(a.answered_at).strftime("%Y-%m-%d %H:%M") if a.answered_at else "",
        ])
    buf = BytesIO()
    wb.save(buf)
    return buf.getvalue()
