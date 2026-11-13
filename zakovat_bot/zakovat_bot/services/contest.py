"""«Talabalik davrim» tanlovi: qabul nazorati, media va statistika.

Muddat tekshiruvi har doim server vaqtida bajariladi (TZ 7) — faqat
interfeysga tayanilmaydi.
"""
import logging
from io import BytesIO

from django.db.models import Count
from django.utils import timezone
from openpyxl import Workbook

from zakovat_bot.models import (
    Channel,
    Contest,
    ContestParticipant,
    ContestStage,
    Entry,
    EntryStatus,
    Nomination,
)

logger = logging.getLogger(__name__)

# Ishtirokchi kiritgan matn uchun rasm/hujjat hajmi chegarasi (Telegram
# fotosi odatda kichik, lekin fayl ko'rinishidagi rasm katta bo'lishi mumkin)
MAX_PHOTO_MB = 20

# Fayl ko'rinishida yuborilgan rasm uchun ruxsat etilgan kengaytmalar.
# Telegram'ning mime_type'i mijoz tomonidan beriladi, shuning uchun unga
# qo'shimcha ravishda fayl nomi ham tekshiriladi.
ALLOWED_IMAGE_EXT = (".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp")


def safe_html(value, limit=400, max_escaped=None):
    """Matnni ko'rsatish uchun xavfsiz holga keltiradi.

    Ikki cheklov birga ishlaydi:
    1) ishtirokchi yozgan matndan `limit` ta belgi olinadi (kesish
       ekranlashdan OLDIN — moderator ko'radigan oyna barqaror bo'lsin);
    2) ekranlangan natija `max_escaped` dan oshmaydi — `&` → `&amp;`
       kengayishi xabarni Telegram chegarasidan chiqarib yubormasligi uchun.
    Kesilgani matnda ochiq ko'rsatiladi.
    """
    from html import escape as _esc

    raw = str(value if value is not None else "")
    out = _esc(raw[:limit])
    budget = max_escaped if max_escaped is not None else limit * 2

    if len(out) > budget:
        out = out[:budget]
        # HTML-entity o'rtasidan kesilmasligi uchun xavfsiz joyga qaytamiz
        last_amp, last_semi = out.rfind("&"), out.rfind(";")
        if last_amp > last_semi:
            out = out[:last_amp]
        return out + " …(qisqartirildi)"
    if len(raw) > limit:
        return out + " …(qisqartirildi)"
    return out


def safe_cell(value):
    """Excel formula injection himoyasi (CWE-1236).

    Ishtirokchi `=HYPERLINK(...)` kabi matn yozsa, admin faylni ochganda
    formula bo'lib bajarilmasligi uchun old qo'shtirnoq qo'yiladi.
    """
    if value is None:
        return ""
    text = str(value)
    if text[:1] in ("=", "+", "-", "@", "\t", "\r"):
        return "'" + text
    return text

# Moderatsiyadan o'tib, natijaga da'vogar bo'lgan holatlar
LIVE_STATUSES = [
    EntryStatus.MODERATION,
    EntryStatus.REVISION,
    EntryStatus.APPROVED,
    EntryStatus.PUBLISHED,
    EntryStatus.FINISHED,
]


def active_contest():
    """Joriy tanlov (faol va eng yaqin muddatli)."""
    return Contest.objects.filter(is_active=True).order_by("submission_deadline").first()


def contest_by_slug(slug):
    if not slug:
        return None
    return Contest.objects.filter(is_active=True, slug=slug).first()


def deadline_text(contest):
    local = timezone.localtime(contest.submission_deadline)
    months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul",
              "avgust", "sentabr", "oktabr", "noyabr", "dekabr"]
    return f"{local.day}-{months[local.month - 1]}, soat {local:%H:%M}"


def time_left_text(contest):
    """Muddatgacha qolgan vaqt — foydalanuvchini shoshiltiruvchi qisqa matn."""
    delta = contest.submission_deadline - timezone.now()
    if delta.total_seconds() <= 0:
        return "muddat tugagan"
    days, rem = divmod(int(delta.total_seconds()), 86400)
    hours, rem = divmod(rem, 3600)
    minutes = rem // 60
    if days:
        return f"{days} kun {hours} soat"
    if hours:
        return f"{hours} soat {minutes} daqiqa"
    return f"{minutes} daqiqa"


def deadline_passed_text(contest):
    """Qabul yopilganda ko'rsatiladigan xabar (TZ 7)."""
    return (
        f"⏰ «{contest.title}» tanlovi uchun arizalar qabuli "
        f"{deadline_text(contest)} da yakunlandi.\n\n"
        "Natijalar va ovoz berish haqida kanalda xabar beramiz."
    )


# ==================== Ishtirokchi va ariza ====================

def get_participant(contest, tg_id):
    return ContestParticipant.objects.filter(contest=contest, telegram_id=tg_id).first()


def participant_entries(contest, tg_id):
    participant = get_participant(contest, tg_id)
    if participant is None:
        return []
    return list(
        Entry.objects.filter(participant=participant).order_by("id")
    )


def can_submit_nomination(contest, participant, nomination):
    """Shu nominatsiyada yangi ariza ochish mumkinmi.

    Qaytaradi: (mumkin, xabar). Mavjud ariza tahrirlash uchun qaytariladi,
    yangi dublikat yaratilmaydi (TZ 5.3).
    """
    if participant is None:
        return True, ""
    existing = Entry.objects.filter(participant=participant, nomination=nomination).first()
    if existing is None:
        if not contest.allow_both_nominations and participant.entries.exists():
            return False, "Nizomga ko'ra faqat bitta nominatsiyada qatnashish mumkin."
        return True, ""
    if existing.status in (EntryStatus.DRAFT, EntryStatus.REVISION):
        return True, ""
    if existing.status == EntryStatus.REJECTED:
        return True, ""
    return False, (
        f"Siz bu nominatsiyada allaqachon ariza topshirgansiz "
        f"({existing.code} — {existing.get_status_display()})."
    )


# ==================== Media (TZ 5) ====================

def extract_media(message):
    """Xabardan media ma'lumotini ajratadi.

    Qaytaradi: dict(file_id, file_unique_id, media_type, file_size, duration,
    mime_type) yoki None.
    """
    if message.photo:
        photo = message.photo[-1]  # eng sifatlisi
        return {
            "file_id": photo.file_id,
            "file_unique_id": photo.file_unique_id,
            "media_type": "photo",
            "file_size": photo.file_size,
            "duration": None,
            "mime_type": None,
        }
    if message.video:
        v = message.video
        return {
            "file_id": v.file_id,
            "file_unique_id": v.file_unique_id,
            "media_type": "video",
            "file_size": v.file_size,
            "duration": v.duration,
            "mime_type": v.mime_type,
        }
    if message.document:
        d = message.document
        mime = (d.mime_type or "").lower()
        # Sifat saqlansin uchun rasm fayl ko'rinishida ham qabul qilinadi (TZ 5.1).
        # Video hujjat sifatida qabul qilinmaydi: unda Telegram davomiylikni
        # bermaydi va cheklovni tekshirib bo'lmaydi.
        name = (getattr(d, "file_name", "") or "").lower()
        if mime.startswith("image/") and name.endswith(ALLOWED_IMAGE_EXT):
            kind = "document"
        else:
            return None
        return {
            "file_id": d.file_id,
            "file_unique_id": d.file_unique_id,
            "media_type": kind,
            "file_size": d.file_size,
            "duration": None,
            "mime_type": d.mime_type,
        }
    return None


def validate_media(contest, nomination, info):
    """Media nominatsiyaga va cheklovlarga mos keladimi. Qaytaradi: xato|None."""
    if info is None:
        return ("Bu turdagi faylni qabul qila olmayman. "
                "Foto yoki video yuboring.")

    is_photo = info["media_type"] in ("photo", "document")
    if nomination == Nomination.FOTO and not is_photo:
        return "Foto nominatsiyasida faqat rasm yuboriladi."
    if nomination == Nomination.VIDEO and info["media_type"] != "video":
        return "Video nominatsiyasida faqat video yuboriladi."

    if info["media_type"] == "video":
        # Davomiylik faqat haqiqiy video xabarda keladi — bo'lmasa rad etamiz
        if not info.get("duration"):
            return ("Videoni oddiy video sifatida yuboring (fayl ko'rinishida "
                    "emas) — aks holda davomiyligini tekshira olmaymiz.")
        if info["duration"] > contest.max_video_seconds:
            limit = contest.max_video_seconds
            return (f"Video juda uzun ({info['duration']} soniya). "
                    f"Ruxsat etilgan davomiylik: {limit} soniyagacha.")
        max_mb = contest.max_video_mb
    else:
        max_mb = MAX_PHOTO_MB

    size = info.get("file_size")
    if not size:
        return "Fayl hajmini aniqlay olmadim — iltimos, qaytadan yuboring."
    mb = size / (1024 * 1024)
    if mb > max_mb:
        return (f"Fayl hajmi katta ({mb:.1f} MB). "
                f"Ruxsat etilgan hajm: {max_mb} MB gacha.")
    return None


def media_limit(contest, nomination):
    return contest.max_photos if nomination == Nomination.FOTO else 1




# ==================== Statistika va eksport ====================

def contest_stats(contest):
    qs = Entry.objects.filter(contest=contest)
    by_status = dict(
        qs.values_list("status").annotate(n=Count("id")).values_list("status", "n")
    )
    return {
        "participants": ContestParticipant.objects.filter(contest=contest).count(),
        "total": qs.exclude(status=EntryStatus.DRAFT).count(),
        "draft": by_status.get(EntryStatus.DRAFT, 0),
        "moderation": by_status.get(EntryStatus.MODERATION, 0),
        "revision": by_status.get(EntryStatus.REVISION, 0),
        "approved": by_status.get(EntryStatus.APPROVED, 0),
        "rejected": by_status.get(EntryStatus.REJECTED, 0),
        "published": by_status.get(EntryStatus.PUBLISHED, 0),
        "photo": qs.filter(nomination=Nomination.FOTO).exclude(status=EntryStatus.DRAFT).count(),
        "video": qs.filter(nomination=Nomination.VIDEO).exclude(status=EntryStatus.DRAFT).count(),
    }


def export_entries_excel(contest):
    """Arizalar ro'yxati .xlsx (TZ 10.8, 12)."""
    wb = Workbook()
    ws = wb.active
    ws.title = "Arizalar"
    ws.append([
        "№", "Ariza raqami", "Nominatsiya", "F.I.Sh.", "OTM", "Fakultet",
        "Bosqich", "Telefon", "Telegram ID", "Username", "Ish nomi", "Izoh",
        "Media soni", "Holati", "Ovozlar", "Topshirilgan vaqt",
    ])
    rows = (
        Entry.objects.filter(contest=contest)
        .exclude(status=EntryStatus.DRAFT)
        .select_related("participant")
        .order_by("id")
    )
    for i, e in enumerate(rows, 1):
        p = e.participant
        ws.append([
            i,
            e.code,
            e.get_nomination_display(),
            safe_cell(p.full_name),
            safe_cell(p.university),
            safe_cell(p.faculty),
            safe_cell(p.study_year),
            safe_cell(p.phone),
            p.telegram_id,
            safe_cell(f"@{p.username}" if p.username else ""),
            safe_cell(e.title),
            safe_cell(e.description),
            e.media.count(),
            e.get_status_display(),
            e.votes_count,
            timezone.localtime(e.submitted_at).strftime("%Y-%m-%d %H:%M")
            if e.submitted_at else "",
        ])
    buf = BytesIO()
    wb.save(buf)
    return buf.getvalue()


# ==================== Qabulni yopish (TZ 7) ====================

async def close_submissions_if_due(bot):
    """Scheduler chaqiradi: muddati o'tgan tanlovni moderatsiya bosqichiga o'tkazadi."""
    from zakovat_bot.models import TelegramAdminsID

    now = timezone.now()
    due = Contest.objects.filter(
        is_active=True, stage=ContestStage.ACCEPTING, submission_deadline__lte=now
    )
    for contest in due:
        contest.stage = ContestStage.MODERATION
        contest.save(update_fields=["stage"])
        logger.info("Tanlov qabuli yopildi: %s", contest.slug)

        s = contest_stats(contest)
        text = (
            f"⏰ <b>{contest.title}</b>\n\n"
            "Arizalar qabuli yakunlandi.\n\n"
            f"📥 Jami arizalar: {s['total']}\n"
            f"📸 Foto: {s['photo']} | 🎬 Video: {s['video']}\n"
            f"⏳ Moderatsiyada: {s['moderation']}\n"
            f"✅ Tasdiqlangan: {s['approved']}\n"
            f"❌ Rad etilgan: {s['rejected']}\n"
            f"🔄 Tuzatish so'ralgan: {s['revision']}"
        )
        for admin in TelegramAdminsID.objects.all():
            try:
                await bot.send_message(chat_id=admin.tg_id, text=text)
            except Exception:
                logger.warning("Adminga qabul yopilishi xabari yetmadi: %s", admin.tg_id)


# ==================== Moderatsiya (TZ 6) ====================

def pending_queue(contest):
    """Moderatsiya navbati — eng eski ariza birinchi."""
    return (
        Entry.objects.filter(contest=contest, status=EntryStatus.MODERATION)
        .select_related("participant")
        .order_by("submitted_at", "id")
    )


def next_pending(contest, after_id=None):
    """Navbatdagi keyingi ariza (`after_id` dan keyingisi)."""
    qs = pending_queue(contest)
    if after_id:
        qs = qs.filter(id__gt=after_id)
    return qs.first()


def entry_card(entry, for_admin=True):
    """Ariza kartochkasi (TZ 6: moderator ko'radigan ma'lumotlar).

    Ishtirokchi matnlari HTML sifatida talqin qilinmasligi uchun ekranlanadi.
    """
    p = entry.participant
    username = f"@{p.username}" if p.username else "—"
    lines = [
        f"🆔 <b>{entry.code}</b> — {entry.get_nomination_display()}",
        f"📌 Holati: <b>{entry.get_status_display()}</b>",
        "",
        f"👤 {safe_html(p.full_name, 120, 200)}",
        f"🎓 {safe_html(p.university, 200, 300)}",
        f"📚 {safe_html(p.faculty or '—', 150, 200)} ({safe_html(p.study_year or '—', 50, 80)})",
    ]
    if for_admin:
        lines += [
            f"📞 {p.phone}",
            f"🔖 Telegram: {username} (<code>{p.telegram_id}</code>)",
        ]
    lines += [
        "",
        f"📝 <b>{safe_html(entry.title or '—', 250, 350)}</b>",
        f"✍️ {safe_html(entry.description or '—', 700, 900)}",
        f"📎 Media: {entry.media.count()} ta",
    ]
    if entry.submitted_at:
        lines.append(
            f"🕒 Kelgan vaqt: {timezone.localtime(entry.submitted_at):%d.%m.%Y %H:%M}"
        )
    if entry.reject_reason:
        lines.append(f"\n💬 Oxirgi izoh: {safe_html(entry.reject_reason, 300, 400)}")

    history = entry.moderation_logs.order_by("-id")[:3]
    if history:
        lines.append("\n<b>Moderatsiya tarixi:</b>")
        for log in history:
            when = timezone.localtime(log.created_datetime)
            lines.append(f"• {when:%d.%m %H:%M} — {log.get_action_display()}")
    return "\n".join(lines)


def build_media_group(entry):
    """Ariza mediasini `send_media_group` uchun tayyorlaydi.

    Telegram bir guruhda rasm va hujjatni aralashtirishga ruxsat bermaydi,
    shuning uchun turlari bo'yicha ajratilgan ro'yxatlar qaytariladi.
    """
    from aiogram.types import InputMediaDocument, InputMediaPhoto, InputMediaVideo

    photos, documents, videos = [], [], []
    for m in entry.media.all():
        if m.media_type == "photo":
            photos.append(InputMediaPhoto(media=m.file_id))
        elif m.media_type == "video":
            videos.append(InputMediaVideo(media=m.file_id))
        else:
            documents.append(InputMediaDocument(media=m.file_id))
    return [group for group in (photos, videos, documents) if group]


async def send_entry_media(bot, chat_id, entry):
    """Ariza mediasini ko'rsatadi (moderator va nashr uchun).

    Qaytaradi: yuborilgan xabarlar ro'yxati (nashrda message_id kerak bo'ladi).
    """
    sent = []
    for group in build_media_group(entry):
        try:
            if len(group) == 1:
                item = group[0]
                media_type = entry.media.first().media_type
                if media_type == "video":
                    msg = await bot.send_video(chat_id=chat_id, video=item.media)
                elif media_type == "document":
                    msg = await bot.send_document(chat_id=chat_id, document=item.media)
                else:
                    msg = await bot.send_photo(chat_id=chat_id, photo=item.media)
                sent.append(msg)
            else:
                msgs = await bot.send_media_group(chat_id=chat_id, media=group)
                sent.extend(msgs)
        except Exception as e:
            logger.warning("Media yuborilmadi (ariza %s): %s", entry.id, e)
    return sent
