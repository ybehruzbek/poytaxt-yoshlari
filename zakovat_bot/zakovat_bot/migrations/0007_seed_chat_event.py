# 9-avgust 20:00 (Asia/Tashkent) online chat tadbirini seed qilish (TZ 1.2).
# Tadbir allaqachon mavjud bo'lsa qayta yaratilmaydi.
from datetime import datetime, timezone as dt_timezone

from django.db import migrations

# 2026-08-09 20:00 Asia/Tashkent (UTC+5) = 15:00 UTC
EVENT_START_UTC = datetime(2026, 8, 9, 15, 0, tzinfo=dt_timezone.utc)


def seed_event(apps, schema_editor):
    ChatEvent = apps.get_model("zakovat_bot", "ChatEvent")
    if not ChatEvent.objects.filter(is_active=True).exists():
        ChatEvent.objects.create(title="Online chat", start_at=EVENT_START_UTC)


def unseed_event(apps, schema_editor):
    ChatEvent = apps.get_model("zakovat_bot", "ChatEvent")
    ChatEvent.objects.filter(title="Online chat", start_at=EVENT_START_UTC).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("zakovat_bot", "0006_chatevent_chatparticipant_reminderlog_and_more"),
    ]

    operations = [
        migrations.RunPython(seed_event, unseed_event),
    ]
