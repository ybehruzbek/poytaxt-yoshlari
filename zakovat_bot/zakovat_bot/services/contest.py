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
        # Sifat saqlansin uchun rasm fayl ko'rinishida ham qabul qilinadi (TZ 5.1)
        if mime.startswith("image/"):
            kind = "document"
        elif mime.startswith("video/"):
            kind = "video"
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
        if info.get("duration") and info["duration"] > contest.max_video_seconds:
            limit = contest.max_video_seconds
            return (f"Video juda uzun ({info['duration']} soniya). "
                    f"Ruxsat etilgan davomiylik: {limit} soniyagacha.")
        if info.get("file_size"):
            mb = info["file_size"] / (1024 * 1024)
            if mb > contest.max_video_mb:
                return (f"Video hajmi katta ({mb:.1f} MB). "
                        f"Ruxsat etilgan hajm: {contest.max_video_mb} MB gacha.")
    return None


def media_limit(contest, nomination):
    return contest.max_photos if nomination == Nomination.FOTO else 1


# ==================== OTM qidiruvi ====================

def search_universities(query, limit=6):
    """OTM nomini kanallar bazasidagi rasmiy nomlardan qidiradi.

    Baza allaqachon 77 ta OTTning rasmiy nomini saqlaydi — ishtirokchi
    nomni qo'lda yozganda shu ro'yxatdan tanlash taklif qilinadi.
    """
    q = (query or "").strip()
    if len(q) < 2:
        return []
    names = (
        Channel.all_objects.filter(ott_name__icontains=q)
        .values_list("ott_name", flat=True)
        .distinct()
    )
    seen, out = set(), []
    for name in names:
        key = name.strip().lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(name.strip())
        if len(out) >= limit:
            break
    return out


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
            p.full_name,
            p.university,
            p.faculty or "",
            p.study_year or "",
            p.phone,
            p.telegram_id,
            f"@{p.username}" if p.username else "",
            e.title or "",
            e.description or "",
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
