# Tanlov boti — integratsiya holati

Bu papka — **@yoshlaruchuntanlov_bot** uchun Telegram bot kodi. Saytning Next.js
kodidan mustaqil, **alohida Docker servis** sifatida deploy qilinadi (arxitektura
qarori: 2026-07-21, Python kodni saqlab qolish tanlandi).

| | |
|---|---|
| **Manba** | https://github.com/Norqulov-Sardorbek/zakovat_bot (vendored, ichki `.git` olib tashlangan) |
| **Stek** | Python 3.12 · Django 5.2 · aiogram 3.22 (polling) · PostgreSQL |
| **Bot** | @yoshlaruchuntanlov_bot — yoshlar uchun tanlov/viktorina boti |
| **DB** | Saytning PostgreSQL'i, alohida `zakovat` sxemasida (`DB_SCHEMA` env) |
| **Token** | `.env` faylida (`BOT_TOKEN`) — gitga tushmaydi, shablon: `.env.example` |
| **Holat** | Integratsiya qilingan: Docker to'plami tayyor, saytda CTA bor (`/tadbirlar`) |

## Nima qiladi

Foydalanuvchi botda ro'yxatdan o'tadi (ism + telefon) → admin savol yuklaydi
(matn/rasm/audio/video/hujjat) va tasdiqlaydi → savol Telegram kanalga deep-link
tugma bilan chiqadi → foydalanuvchilar 24 soat ichida javob yuboradi → muddat
tugagach adminlarga javoblar Excel bo'lib keladi.

## Ishga tushirish (lokal)

```bash
cp .env.example .env   # BOT_TOKEN, SECRET_KEY, DB_PASSWORD, CHANNEL_USERNAME to'ldiring
docker compose up --build
```

Entrypoint o'zi: DB'ni kutadi → `zakovat` sxemasini yaratadi → migratsiya qiladi →
polling botni ishga tushiradi. Lokal DB — saytning `poytaxt-db` konteyneri
(host port 5433), `.env.example`dagi qiymatlar shunga mos.

## Dokploy'ga deploy

1. Dokploy'da yangi **Compose/Dockerfile servis**: build konteksti — `zakovat_bot/`.
2. Env panelida: `BOT_TOKEN`, `SECRET_KEY`, `CHANNEL_USERNAME`, `DEBUG=False`,
   `ALLOWED_HOSTS=localhost`, DB uchun saytning Postgres servisi ma'lumotlari
   (`DB_HOST` — Dokploy ichki tarmog'idagi db host, `DB_PORT=5432`,
   `DB_SCHEMA=zakovat`).
3. Port ochish shart emas — bot polling rejimida ishlaydi.
4. Bot kanalga post yozishi uchun @yoshlaruchuntanlov_bot `CHANNEL_USERNAME`
   kanaliga **admin** qilib qo'shilishi kerak.

## Sayt bilan bog'lanish nuqtalari

- `lib/data.ts` — `TANLOV_BOT_USERNAME` / `TANLOV_BOT_URL` konstantalari.
- `app/tadbirlar/page.tsx` — bot CTA banneri.

## Ma'lum eslatmalar

- `core/constants.py` — buzilgan importlar (`sms_service`, `click_up`) bor, lekin
  bot runtime uni **import qilmaydi** (o'lik kod, asl loyihadan qolgan). Tegilmagan.
- `nginx.conf` — endi ishlatilmaydi (eski compose'dan qolgan), polling botga kerak emas.
- Django admin (gunicorn) ham deploy qilinmaydi — kerak bo'lsa keyin alohida yoqiladi.
