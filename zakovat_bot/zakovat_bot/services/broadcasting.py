"""Tarqatish yadrosi (TZ 4.1): bazadagi kanallarga post yuborish.

- Qamrov filtri: "all" | "type:<davlat|xorijiy|nodavlat>" | "tag:<teg>"
- Rate-limit: kanallar orasida pauza, TelegramRetryAfter hurmat qilinadi
- Vaqtinchalik xatoda 3 martagacha qayta urinish
- Har bir kanal natijasi BroadcastResult'ga yoziladi
"""
import asyncio
import logging

from aiogram.exceptions import (
    TelegramBadRequest,
    TelegramForbiddenError,
    TelegramNetworkError,
    TelegramRetryAfter,
)
from django.utils import timezone

from zakovat_bot.models import Broadcast, BroadcastResult, BroadcastStatus, Channel

logger = logging.getLogger(__name__)

SEND_PAUSE = 0.5   # kanallar orasidagi pauza (soniya)
MAX_RETRIES = 3


def channels_for_filter(target_filter):
    """Qamrov satridan faol kanallar queryset'ini quradi."""
    qs = Channel.objects.filter(is_active=True)
    if target_filter.startswith("type:"):
        qs = qs.filter(ott_type=target_filter.split(":", 1)[1])
    elif target_filter.startswith("tag:"):
        qs = qs.filter(tag=target_filter.split(":", 1)[1])
    return qs.order_by("ott_name")


def describe_filter(target_filter):
    if target_filter.startswith("type:"):
        return {"davlat": "Davlat OTTlari", "xorijiy": "Xorijiy OTTlar",
                "nodavlat": "Nodavlat OTTlar"}.get(target_filter.split(":", 1)[1], target_filter)
    if target_filter.startswith("tag:"):
        return f"«{target_filter.split(':', 1)[1]}» tegi"
    return "Barcha faol kanallar"


async def check_bot_is_admin(bot, chat):
    """Bot kanalda admin va post yubora oladimi (TZ 2.1 avtotekshiruv).
    Qaytaradi: (ok: bool, chat_id: int|None, sabab: str)."""
    try:
        chat_obj = await bot.get_chat(chat)
        member = await bot.get_chat_member(chat_obj.id, bot.id)
    except (TelegramBadRequest, TelegramForbiddenError) as e:
        return False, None, f"kanal topilmadi yoki bot kirmagan ({e.message})"
    except Exception as e:
        return False, None, f"tekshirib bo'lmadi: {e}"

    if member.status == "creator":
        return True, chat_obj.id, ""
    if member.status == "administrator":
        if getattr(member, "can_post_messages", False):
            return True, chat_obj.id, ""
        return False, chat_obj.id, "bot admin, lekin post yuborish huquqi yo'q"
    return False, chat_obj.id, "bot kanalda admin emas"


async def _forward_with_retry(bot, target, source_chat_id, message_ids):
    """Bitta kanalga yuborish; qaytaradi (message_id|None, xato_sababi)."""
    last_error = "noma'lum xato"
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            msgs = await bot.forward_messages(
                chat_id=target,
                from_chat_id=source_chat_id,
                message_ids=message_ids,
            )
            first_id = msgs[0].message_id if msgs else None
            return first_id, ""
        except TelegramRetryAfter as e:
            # flood-limit: kutamiz va qayta urinamiz
            logger.warning("Flood-limit %s: %ss kutilmoqda", target, e.retry_after)
            await asyncio.sleep(e.retry_after + 1)
            last_error = f"flood-limit ({e.retry_after}s)"
        except TelegramNetworkError as e:
            await asyncio.sleep(2 * attempt)
            last_error = f"tarmoq xatosi: {e}"
        except TelegramForbiddenError:
            return None, "bot kanalda admin emas yoki chiqarib yuborilgan"
        except TelegramBadRequest as e:
            return None, f"so'rov xatosi: {e.message}"
        except Exception as e:
            return None, f"xato: {e}"
    return None, last_error


async def run_broadcast(bot, broadcast_id, progress_chat_id=None):
    """Broadcast yozuvini bajaradi va yakuniy hisobot matnini qaytaradi."""
    broadcast = Broadcast.objects.get(id=broadcast_id)
    broadcast.status = BroadcastStatus.IN_PROGRESS
    broadcast.save(update_fields=["status"])

    channels = list(channels_for_filter(broadcast.target_filter))
    success = failed = 0

    for channel in channels:
        target = channel.target
        if target is None:
            failed += 1
            BroadcastResult.objects.create(
                broadcast=broadcast, channel=channel,
                delivered=False, error_reason="manzil yo'q (username ham, ID ham)",
            )
            continue

        message_id, error = await _forward_with_retry(
            bot, target, broadcast.source_chat_id, broadcast.message_ids
        )
        delivered = message_id is not None or error == ""
        if delivered:
            success += 1
        else:
            failed += 1
            if "admin emas" in error:
                channel.bot_is_admin = False
                channel.save(update_fields=["bot_is_admin"])

        BroadcastResult.objects.create(
            broadcast=broadcast,
            channel=channel,
            delivered=delivered,
            error_reason=None if delivered else error,
            message_id=message_id,
            sent_at=timezone.now() if delivered else None,
        )
        await asyncio.sleep(SEND_PAUSE)

    broadcast.status = BroadcastStatus.DONE
    broadcast.finished_at = timezone.now()
    broadcast.success_count = success
    broadcast.failed_count = failed
    broadcast.save(update_fields=["status", "finished_at", "success_count", "failed_count"])

    return build_report(broadcast)


def build_report(broadcast):
    """Tarqatish hisobot matni: yetkazildi/yetkazilmadi + sabablar (TZ 5)."""
    lines = [
        f"📊 <b>Tarqatish #{broadcast.id} yakunlandi</b>",
        f"Qamrov: {describe_filter(broadcast.target_filter)}",
        f"✅ Yetkazildi: {broadcast.success_count}",
        f"❌ Yetkazilmadi: {broadcast.failed_count}",
    ]
    failed_results = broadcast.results.filter(delivered=False).select_related("channel")
    if failed_results:
        lines.append("\n<b>Yetkazilmaganlar:</b>")
        for r in failed_results[:30]:
            lines.append(f"• {r.channel.ott_name} — {r.error_reason}")
        if failed_results.count() > 30:
            lines.append(f"… va yana {failed_results.count() - 30} ta")
    return "\n".join(lines)
