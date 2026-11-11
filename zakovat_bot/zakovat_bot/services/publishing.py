"""Tanlov ishlarini kanalga nashr qilish va ovoz berish (TZ 8-10)."""
import asyncio
import logging
from datetime import timedelta
from html import escape as esc

from aiogram.exceptions import TelegramRetryAfter
from django.db import IntegrityError, transaction
from django.db.models import F, Q
from django.utils import timezone

from zakovat_bot.buttons.panel import vote_keyboard
from zakovat_bot.models import (
    ContestStage,
    Entry,
    EntryStatus,
    Nomination,
    Publication,
    Vote,
)
from zakovat_bot.services.contest import build_media_group

logger = logging.getLogger(__name__)

PUBLISH_PAUSE = 1.0  # postlar orasidagi pauza — Telegram cheklovlari uchun


def ready_for_publication(contest):
    """Tasdiqlangan, lekin hali e'lon qilinmagan ishlar (TZ 8.1-8.2).

    «Band qilingan, lekin yuborilmagan» (publication bor, `published_at`
    bo'sh) ishlar ham navbatda qoladi: bot qayta ishga tushsa yoki jarayon
    uzilsa, ariza yo'qolib qolmasdan qayta urinishda joylanadi.
    """
    return (
        Entry.objects.filter(contest=contest, status=EntryStatus.APPROVED)
        .filter(Q(publication__isnull=True) |
                Q(publication__published_at__isnull=True))
        .select_related("participant")
        .order_by("nomination", "id")
    )


def published_entries(contest):
    return Entry.objects.filter(
        contest=contest, status__in=[EntryStatus.PUBLISHED, EntryStatus.FINISHED]
    ).select_related("participant")


def post_text(entry):
    p = entry.participant
    nomination = "📸 Foto" if entry.nomination == Nomination.FOTO else "🎬 Video"
    return (
        f"📸 <b>{esc(entry.contest.title.upper())}</b>\n\n"
        f"👤 Ishtirokchi: {esc(p.full_name)}\n"
        f"🎓 OTM: {esc(p.university)}\n"
        f"🏷 Yo'nalish: {nomination}\n"
        f"📝 Ish nomi: {esc(entry.title or '—')}\n"
        f"🆔 Ariza: {entry.code}\n\n"
        "❤️ Ushbu ishni qo'llab-quvvatlash uchun ovoz bering!"
    )


def build_post_url(channel_id, channel_username, message_id):
    if not message_id:
        return None
    if channel_username:
        return f"https://t.me/{channel_username}/{message_id}"
    raw = str(channel_id)
    if raw.startswith("-100"):
        return f"https://t.me/c/{raw[4:]}/{message_id}"
    return None


async def publish_entry(bot, contest, entry, channel_username=None):
    """Bitta ishni kanalga joylaydi. Takroran joylamaydi (TZ 8.6).

    1-3 foto bitta albom bo'lib chiqadi va ularga BITTA ovoz kartochkasi
    bog'lanadi — ovoz alohida rasmga emas, ishga beriladi (TZ 8).
    """
    groups = build_media_group(entry)
    if not groups:
        return False, "media topilmadi"

    channel = contest.channel_id
    # Nashr huquqini avval bazada «band qilamiz»: shu qator yaratilmaguncha
    # hech narsa yuborilmaydi. Shu sababli bir ish ikki marta joylanmaydi
    # (tugma ikki marta bosilsa yoki ikki admin bir vaqtda ishga tushirsa).
    with transaction.atomic():
        # Faqat Entry qatori qulflanadi (JOIN bilan qulflab bo'lmaydi),
        # shu bois nashr tekshiruvi qulf ichida alohida bajariladi
        locked = (
            Entry.objects.select_for_update()
            .filter(id=entry.id, status=EntryStatus.APPROVED)
            .first()
        )
        if locked is None:
            return True, "tasdiqlanmagan yoki o'chirilgan"
        try:
            pub, _ = Publication.objects.get_or_create(
                entry=locked, defaults={"channel_id": str(channel)})
        except IntegrityError:
            return True, "allaqachon e'lon qilingan"
        if pub.published_at is not None:
            return True, "allaqachon e'lon qilingan"

    media = groups[0]
    try:
        if len(media) > 1 and pub.message_id:
            # Albom oldingi urinishda yuborilgan — faqat ovoz kartochkasi qoldi
            first_id = pub.message_id
            card = await bot.send_message(
                chat_id=channel, text=post_text(entry),
                reply_markup=vote_keyboard(entry),
                reply_to_message_id=first_id)
            vote_id = card.message_id
        elif len(media) == 1:
            # Bitta fayl — matn va ovoz tugmasi o'sha xabarning o'zida
            item = media[0]
            kind = entry.media.first().media_type
            if kind == "video":
                msg = await bot.send_video(
                    chat_id=channel, video=item.media, caption=post_text(entry),
                    reply_markup=vote_keyboard(entry))
            elif kind == "document":
                msg = await bot.send_document(
                    chat_id=channel, document=item.media, caption=post_text(entry),
                    reply_markup=vote_keyboard(entry))
            else:
                msg = await bot.send_photo(
                    chat_id=channel, photo=item.media, caption=post_text(entry),
                    reply_markup=vote_keyboard(entry))
            first_id, vote_id = msg.message_id, msg.message_id
        else:
            # Albom — tugma qo'shib bo'lmaydi, shuning uchun ovoz kartochkasi
            # alohida xabar sifatida albomga javob qilib yuboriladi
            msgs = await bot.send_media_group(chat_id=channel, media=media)
            first_id = msgs[0].message_id if msgs else None
            # Albom yuborildi — darhol qayd etamiz, qayta urinishda
            # rasmlar ikkinchi marta joylanmasligi uchun
            pub.message_id = first_id
            pub.save(update_fields=["message_id"])
            card = await bot.send_message(
                chat_id=channel, text=post_text(entry),
                reply_markup=vote_keyboard(entry),
                reply_to_message_id=first_id)
            vote_id = card.message_id
    except TelegramRetryAfter as e:
        # Band qilish saqlanadi: `published_at` bo'sh bo'lgani uchun ish
        # navbatda qoladi va keyingi urinishda davom ettiriladi
        await asyncio.sleep(e.retry_after + 1)
        return False, f"flood-limit ({e.retry_after}s)"
    except Exception as e:
        logger.exception("Nashr xatosi: %s", entry.code)
        return False, str(e)[:200]

    pub.message_id = first_id
    pub.vote_message_id = vote_id
    pub.published_at = timezone.now()
    pub.post_url = build_post_url(channel, channel_username, vote_id)
    pub.save(update_fields=["message_id", "vote_message_id",
                            "published_at", "post_url"])
    entry.status = EntryStatus.PUBLISHED
    entry.save(update_fields=["status"])
    return True, ""


async def publish_all(bot, contest, notify_author=True):
    """Barcha tasdiqlangan ishlarni ketma-ket e'lon qiladi (TZ 8.4).

    Xatolikdagi postlar keyingi urinishda qayta ishlanadi, lekin muvaffaqiyatli
    joylanganlar takroran chiqmaydi (Publication yozuvi borligi tekshiriladi).
    """
    channel_username = None
    try:
        chat = await bot.get_chat(contest.channel_id)
        channel_username = getattr(chat, "username", None)
    except Exception:
        logger.warning("Kanal ma'lumotini olib bo'lmadi: %s", contest.channel_id)

    ok, failed, errors = 0, 0, []
    for entry in list(ready_for_publication(contest)):
        success, reason = await publish_entry(bot, contest, entry, channel_username)
        if success:
            ok += 1
            if notify_author:
                await _notify_published(bot, entry)
        else:
            failed += 1
            errors.append(f"{entry.code}: {reason}")
        await asyncio.sleep(PUBLISH_PAUSE)
    return ok, failed, errors


async def _notify_published(bot, entry):
    """Ishtirokchiga kanaldagi post havolasini yuboradi (TZ 11, 15)."""
    pub = getattr(entry, "publication", None)
    link = pub.post_url if pub and pub.post_url else "—"
    contest = entry.contest
    if contest.voting_start_at and contest.voting_end_at:
        window = (f"{timezone.localtime(contest.voting_start_at):%d.%m %H:%M}"
                  f" — {timezone.localtime(contest.voting_end_at):%d.%m %H:%M}")
    else:
        window = "tez orada e'lon qilinadi"
    try:
        await bot.send_message(
            chat_id=entry.participant.telegram_id,
            text=(f"📢 Tanlov ishingiz kanalga joylandi!\n\n"
                  f"🆔 Ish raqami: {entry.code}\n"
                  f"🔗 Havola: {link}\n"
                  f"🗳 Ovoz berish: {window}"),
        )
    except Exception:
        logger.warning("Nashr xabari yetmadi: %s", entry.participant.telegram_id)


# ==================== Ovoz berish (TZ 9) ====================

def voting_is_open(contest):
    now = timezone.now()
    return (
        contest.is_active
        and contest.stage == ContestStage.VOTING
        and contest.voting_start_at is not None
        and contest.voting_end_at is not None
        and contest.voting_start_at <= now < contest.voting_end_at
    )


def register_vote(entry_id, voter_id):
    """Ovozni atomar qayd etadi.

    Qaytaradi: (hisoblandimi, yangi_son). UNIQUE(entry, voter) cheklovi
    tufayli bir foydalanuvchi bir ishga faqat bir marta ovoz bera oladi.
    """
    with transaction.atomic():
        _, created = Vote.objects.get_or_create(
            entry_id=entry_id, voter_user_id=voter_id
        )
        if created:
            Entry.objects.filter(id=entry_id).update(
                votes_count=F("votes_count") + 1
            )
    count = Entry.objects.filter(id=entry_id).values_list(
        "votes_count", flat=True).first() or 0
    return created, count


def start_voting(contest):
    """48 soatlik ovoz berishni boshlaydi — hamma uchun bir vaqtda (TZ 9.3)."""
    now = timezone.now()
    contest.voting_start_at = now
    contest.voting_end_at = now + timedelta(hours=contest.voting_hours)
    contest.stage = ContestStage.VOTING
    contest.save(update_fields=["voting_start_at", "voting_end_at", "stage"])
    return contest


def results(contest, nomination):
    """Nominatsiya bo'yicha natijalar — ovoz soni kamayish tartibida (TZ 10)."""
    return list(
        published_entries(contest)
        .filter(nomination=nomination)
        .order_by("-votes_count", "id")
    )


def winners(contest, nomination):
    """G'oliblar va teng ovoz holati.

    Teng ovozda avtomatik g'olib belgilanmaydi — hammasi qaytariladi va
    qaror administratorga qoldiriladi (TZ 10).
    """
    ranked = results(contest, nomination)
    if not ranked:
        return [], False
    top_votes = ranked[0].votes_count
    tied = [e for e in ranked if e.votes_count == top_votes]
    limit = contest.winners_per_nomination
    if len(tied) > limit:
        return tied, True  # teng ovoz — administrator hal qiladi
    return ranked[:limit], False


async def close_voting_if_due(bot):
    """Scheduler: 48 soat tugaganda ovoz qabulini to'xtatadi (TZ 9.3)."""
    from zakovat_bot.models import Contest, TelegramAdminsID

    now = timezone.now()
    # O'chirilgan tanlov ham yopiladi — ochiq qolib ketmasin
    due = Contest.all_objects.filter(
        stage=ContestStage.VOTING, voting_end_at__lte=now
    )
    for contest in due:
        contest.stage = ContestStage.FINISHED
        contest.save(update_fields=["stage"])
        logger.info("Ovoz berish yakunlandi: %s", contest.slug)

        lines = [f"🏁 <b>{esc(contest.title)}</b>\n", "Ovoz berish yakunlandi.\n"]
        for nom, label in ((Nomination.FOTO, "📸 Foto"),
                           (Nomination.VIDEO, "🎬 Video")):
            top, tie = winners(contest, nom)
            lines.append(f"<b>{label}:</b>")
            if not top:
                lines.append("• ish yo'q")
            for e in top[:5]:
                lines.append(f"• {e.code} — {esc(e.participant.full_name)} "
                             f"({e.votes_count} ovoz)")
            if tie:
                lines.append("⚠️ Teng ovoz — g'olibni administrator belgilaydi.")
            lines.append("")
        text = "\n".join(lines)
        for admin in TelegramAdminsID.objects.all():
            try:
                await bot.send_message(chat_id=admin.tg_id, text=text)
            except Exception:
                logger.warning("Adminga natija yetmadi: %s", admin.tg_id)
