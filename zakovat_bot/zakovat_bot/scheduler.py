"""Rejalashtirilgan tarqatish poller'i (TZ 4.2).

APScheduler o'rniga oddiy DB-polling: har 30 soniyada vaqti kelgan
`scheduled` broadcastlar tekshiriladi. Holat DB'da saqlangani uchun
bot qayta ishga tushsa ham rejalar yo'qolmaydi.
"""
import asyncio
import logging

from django.utils import timezone

from zakovat_bot.models import Broadcast, BroadcastStatus
from zakovat_bot.services.broadcasting import run_broadcast

logger = logging.getLogger(__name__)

POLL_INTERVAL = 30  # soniya


async def scheduler_loop(bot):
    logger.info("Rejalashtirilgan tarqatish poller'i ishga tushdi")
    while True:
        try:
            due = list(
                Broadcast.objects.filter(
                    status=BroadcastStatus.SCHEDULED,
                    scheduled_at__lte=timezone.now(),
                )
            )
            for broadcast in due:
                logger.info("Rejalashtirilgan tarqatish boshlanmoqda: #%s", broadcast.id)
                try:
                    report = await run_broadcast(bot, broadcast.id)
                    try:
                        await bot.send_message(chat_id=broadcast.admin_id, text=report)
                    except Exception:
                        logger.warning("Hisobotni adminga yuborib bo'lmadi: %s", broadcast.admin_id)
                except Exception:
                    logger.exception("Rejalashtirilgan tarqatish xatosi: #%s", broadcast.id)
        except Exception:
            logger.exception("Scheduler aylanishida xato")
        await asyncio.sleep(POLL_INTERVAL)
