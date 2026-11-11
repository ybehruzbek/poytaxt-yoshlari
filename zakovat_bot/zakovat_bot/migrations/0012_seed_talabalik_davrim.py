# «Talabalik davrim — 2026» tanlovini yaratish va eski loyihani yopish.
#
# TZ 2: «Barqaror rivojlanish maqsadlari» seminariga ro'yxat to'xtatiladi.
# Ma'lumotlar O'CHIRILMAYDI — faqat deaktivatsiya qilinadi (TZ 2: zaxira va
# qonuniy saqlash talabi), shuning uchun ishtirokchilar bazasi joyida qoladi.
from datetime import datetime, timezone as dt_timezone

from django.db import migrations

# 2026-11-17 18:00 Asia/Tashkent (UTC+5) = 13:00 UTC
SUBMISSION_DEADLINE_UTC = datetime(2026, 11, 17, 13, 0, tzinfo=dt_timezone.utc)

TITLE = "Talabalik davrim — 2026"
SLUG = "talabalik_davrim_2026"

RULES = """🎯 <b>Tanlov haqida</b>
«Talabalik davrim — 2026» foto va video challenge 17-noyabr — Xalqaro
talabalar kuniga bag'ishlanadi.

🏷 <b>Nominatsiyalar</b>
📸 Foto — bitta ishda 1 tadan 3 tagacha surat
🎬 Video — bitta ishda 1 ta video

📅 <b>Muddat</b>
Arizalar 17-noyabr soat 18:00 gacha qabul qilinadi. Shu vaqtdan keyin
yuborilgan arizalar qabul qilinmaydi.

⚖️ <b>Shartlar</b>
• material mualliflik huquqi ishtirokchiga tegishli bo'lishi;
• tasvirdagi shaxslar e'lon qilinishiga rozi bo'lishi;
• material mavzuga mos, haqoratli va qonunga zid mazmunsiz bo'lishi;
• har bir ish moderatsiyadan o'tadi.

🏆 <b>G'oliblar</b>
Barcha tasdiqlangan ishlar tanlov kanalida e'lon qilinadi va 48 soat
davomida ovoz berish ochiq bo'ladi. Har bir nominatsiyada eng ko'p ovoz
to'plagan ish g'olib deb topiladi."""

CONTACT = ("Tashkilotchilar: O'zbekiston Yoshlar ittifoqi Toshkent shahar "
           "hududiy Kengashi\nKanal: @poytaxtyoshlari_yi")


def seed(apps, schema_editor):
    Contest = apps.get_model("zakovat_bot", "Contest")
    ChatEvent = apps.get_model("zakovat_bot", "ChatEvent")

    # Eski loyihalarni yopamiz (ma'lumotlar saqlanadi)
    ChatEvent.objects.filter(is_active=True).update(is_active=False)

    if not Contest.objects.filter(slug=SLUG).exists():
        Contest.objects.create(
            title=TITLE,
            slug=SLUG,
            description="17-noyabr — Xalqaro talabalar kuniga bag'ishlangan "
                        "foto va video challenge",
            stage="accepting",
            submission_deadline=SUBMISSION_DEADLINE_UTC,
            voting_hours=48,
            min_photos=1,
            max_photos=3,
            max_video_seconds=180,
            max_video_mb=50,
            allow_both_nominations=True,
            winners_per_nomination=1,
            rules_text=RULES,
            contact_text=CONTACT,
            is_active=True,
        )


def unseed(apps, schema_editor):
    Contest = apps.get_model("zakovat_bot", "Contest")
    Contest.objects.filter(slug=SLUG).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("zakovat_bot", "0011_contest_alter_telegramadminsid_role_and_more"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
