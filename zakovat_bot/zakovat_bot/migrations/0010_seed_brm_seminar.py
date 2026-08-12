# «Barqaror rivojlanish maqsadlari yoshlar nigohida» seminar-treningi
# (TZ_yoshlaruchuntanlov_bot.md, 2026-08-13 14:00, ZiyoForum).
#
# Eski online chat tadbiri (9-avgust) o'tib ketgan — u faolsizlantiriladi va
# slug bilan belgilanadi, yangi seminar faol tadbir bo'ladi.
from datetime import datetime, timezone as dt_timezone

from django.db import migrations

# 2026-08-13 14:00 Asia/Tashkent (UTC+5) = 09:00 UTC
SEMINAR_START_UTC = datetime(2026, 8, 13, 9, 0, tzinfo=dt_timezone.utc)

TITLE = "«Barqaror rivojlanish maqsadlari yoshlar nigohida» seminar-treningi"
LOCATION = ("Toshkent shahri, Yakkasaroy tumani, Qushbegi ko'chasi, 8-uy, "
            "ZiyoForum Yoshlar markazi")
ARRIVAL_NOTE = ("Iltimos, tadbir boshlanishidan kamida 20–25 daqiqa oldin yetib "
                "keling — ro'yxatni tekshirish va joylashish uchun.")


def seed(apps, schema_editor):
    ChatEvent = apps.get_model("zakovat_bot", "ChatEvent")

    # Eski online chat tadbirini yopamiz va slug beramiz
    for old in ChatEvent.objects.filter(slug__isnull=True).exclude(title=TITLE):
        old.slug = "chat_09aug"
        old.is_active = False
        old.reminder_hours = [24, 10, 1]
        old.save()

    if not ChatEvent.objects.filter(slug="brm_seminar").exists():
        ChatEvent.objects.create(
            title=TITLE,
            slug="brm_seminar",
            start_at=SEMINAR_START_UTC,
            location=LOCATION,
            subscription_channel="@poytaxtyoshlari_yi",
            arrival_note=ARRIVAL_NOTE,
            # 13-avgust 09:00 = tadbirdan 5 soat oldin (TZ 7.3)
            reminder_hours=[5],
            send_start_message=False,  # oflayn tadbir — havola yuborilmaydi
            is_active=True,
        )


def unseed(apps, schema_editor):
    ChatEvent = apps.get_model("zakovat_bot", "ChatEvent")
    ChatEvent.objects.filter(slug="brm_seminar").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("zakovat_bot", "0009_chatevent_arrival_note_chatevent_location_and_more"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
