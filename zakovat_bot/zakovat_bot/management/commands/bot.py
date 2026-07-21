import logging
import sys
import asyncio
from django.core.management.base import BaseCommand
from zakovat_bot.handlers import *
from zakovat_bot.dispatcher import bot,  dp
from zakovat_bot.permissions import ensure_super_admin
from zakovat_bot.scheduler import scheduler_loop
from zakovat_bot.utils import set_bot_commands

# Set the default settings module for your Django project
async def main() -> None:
    await set_bot_commands(bot)
    # Rejalashtirilgan tarqatishlar poller'i polling bilan parallel ishlaydi
    asyncio.create_task(scheduler_loop(bot))
    await dp.start_polling(bot)



class Command(BaseCommand):

    def handle(self, *args, **options):
        logging.basicConfig(level=logging.INFO, stream=sys.stdout)
        ensure_super_admin()
        asyncio.run(main())