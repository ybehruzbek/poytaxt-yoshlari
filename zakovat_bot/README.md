# «Yoshlar uchun imkoniyatlar» boti (@yoshlaruchuntanlov_bot)

Kanallar bazasi, admin-panel va ommaviy tarqatishni avtomatlashtiruvchi Telegram bot.
Texnik topshiriq: `TZ_BOT.md`, bosqichlar holati: `PLAN_BOT.md`.

**Stek:** Python 3.12 · Django 5.2 · aiogram 3.22 (polling) · PostgreSQL

## Imkoniyatlar

- **Kanallar bazasi (TZ 2):** kanal qo'shish/tahrirlash/o'chirish, faol/nofaol holat,
  OTT turi (Davlat/Xorijiy/Nodavlat) va teg bo'yicha filtr, sahifalangan ro'yxat.
  Qo'shishda bot kanalda admin ekanligi avtomatik tekshiriladi.
- **Excel (TZ 2.2):** bazani ommaviy yangilash uchun import (dublikat aniqlanadi,
  xato qatorlar hisobotda) va istalgan vaqtda eksport (zaxira).
- **Rollar (TZ 2.3):** Bosh admin / Operator / Kuzatuvchi. Kanal qo'shish-o'chirish va
  adminlarni boshqarish — faqat Bosh admin. Barcha amallar audit-jurnalga yoziladi.
- **Tarqatish (TZ 4.1):** postni forward qilish → qamrov tanlash (hammasi / tur / teg) →
  preview → yuborish. Flood-limitga pauza, 3 martagacha qayta urinish, har kanal
  natijasi bazada.
- **Rejalashtirish (TZ 4.2):** aniq sana-vaqtga qo'yish, ro'yxatini ko'rish, bekor qilish.
  Bot qayta ishga tushsa ham rejalar saqlanadi (DB-polling scheduler).
- **Statistika (TZ 5):** tarqatishlar tarixi, yetkazilmaganlar sabab bilan, muammoli
  (bot admin bo'lmagan) kanallar, Excel hisobot.
- **Zakovat (eski funksiya):** savol e'lon qilish, javoblar yig'ish, Excel yuklab olish.

## O'rnatish

```bash
cp .env.example .env    # qiymatlarni to'ldiring (quyida)
docker compose up --build -d
docker compose logs -f bot
```

Entrypoint o'zi: DB'ni kutadi → sxema yaratadi → migratsiya → botni ishga tushiradi.

### .env qiymatlari

| O'zgaruvchi | Izoh |
|---|---|
| `BOT_TOKEN` | @BotFather'dan olingan token |
| `SECRET_KEY` | Django maxfiy kaliti (istalgan uzun tasodifiy satr) |
| `SUPER_ADMIN_ID` | Birinchi Bosh adminning Telegram ID'si (@userinfobot orqali) |
| `CHANNEL_USERNAME` | Zakovat savollari chiqadigan kanal (@username yoki -100... ID) |
| `DB_*` | PostgreSQL ulanishi; `DB_SCHEMA=zakovat` — sayt bazasidan ajratilgan sxema |

## Foydalanish (admin)

1. Botga `/admin` yozing (yoki `admin_panel`).
2. **Kanallar bazasi** → kanal qo'shing yoki Excel'dan import qiling.
   Import format: `A` — OTT nomi, `B` — link, `C` — turi, `D` — teg (ixtiyoriy).
3. Bot har bir kanalda **admin** (post yuborish huquqi bilan) bo'lishi shart —
   panel buni o'zi tekshirib, kartochkada ko'rsatadi.
4. **Kanallarga tarqatish** → postni forward qiling → qamrov → tasdiqlang
   (hozir yoki rejalashtirilgan vaqtga).
5. Yakunda hisobot keladi; **Statistika** bo'limida tarix va Excel eksport bor.

## Dokploy'ga deploy

`INTEGRATSIYA.md` faylida batafsil. Qisqacha: `zakovat_bot/` katalogidan Dockerfile
servis, env'lar panel orqali, port ochish shart emas (polling).
