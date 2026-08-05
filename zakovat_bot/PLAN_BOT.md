# Bot rivojlantirish rejasi (TZ bo'yicha)

TZ manbalari: `TZ_BOT.md` (asosiy, 2026-07-21) va `TZ_CHAT_BOT.md`
(online chat ro'yxati, 2026-08-05, muddat: 7-avgust).
Buyurtmachi belgilagan ustuvorlik: **1-bosqich → 5-bosqich (monitoring) → 6-bosqich (ommaviy qatlam)**.

## Online chat boti (TZ_CHAT_BOT.md) — ✅ Bajarildi (2026-08-05)

F-01–F-08 to'liq: deep-link (`?start=chat_09aug`), ro'yxat oqimi (ism/telefon
validatsiya, dublikat nazorati), tasdiqlash, takroriy kirish, idempotent
eslatmalar (1 kun/10 soat/1 soat/start — scheduler'da, T-10 kafolati bilan),
admin bo'limi (statistika, xlsx eksport, ommaviy xabar, eslatmalar holati,
sozlamalar). 9-avgust 20:00 tadbiri migratsiyada seed qilingan.
Smoke-testda T-01–T-12 ssenariylari qamrab olingan (91 tekshiruv).

## Bosqichlar holati

| Bosqich | Mazmuni | Holat |
|---|---|---|
| 1-bosqich | Kanallar bazasi + admin-panel (CRUD, Excel import/eksport, rollar, audit) | ✅ **Bajarildi** (2026-07-21) |
| 2-bosqich | Yaxshilangan va rejalashtirilgan tarqatish | ✅ **Bajarildi** (2026-07-21) |
| 3-bosqich | Kengaytirilgan statistika (tarix, muammoli kanallar, eksport) | ✅ **Bajarildi** — views'siz (B variant kelishilgach) |
| 4-bosqich | Zakovat reyting/leaderboard | Kutilmoqda |
| 5-bosqich | OTT kanallari monitoringi (A/B variant) | Kutilmoqda — **A/B varianti buyurtmachi bilan kelishiladi** |
| 6-bosqich | Foydalanuvchi qatlami (imkoniyatlar katalogi, obuna, ko'p tillilik) | Kutilmoqda |
| 7-bosqich | Geymifikatsiya, referal, dayjest | Kutilmoqda |
| 8-bosqich | AI-yordamchi, Mini App | Kutilmoqda |

## Qabul qilingan texnik qarorlar

- **Stek saqlanadi:** Python 3.12 + Django 5.2 + aiogram 3.22 + PostgreSQL (TZ 1.3 ga mos).
- **Rollar:** `TelegramAdminsID.role` — `superadmin` / `operator` / `observer` (TZ 2.3).
  Birinchi superadmin `SUPER_ADMIN_ID` env orqali bootstrap qilinadi. Eski
  «"admin_panel" yozgan har kim admin bo'ladi» xatti-harakati olib tashlandi.
- **Teg:** v1'da har kanalga bitta ixtiyoriy matnli teg (`tag` maydoni). M2M kerak
  bo'lsa keyingi bosqichda kengaytiriladi.
- **Rejalashtirish:** APScheduler o'rniga DB-polling asyncio task (30 soniyada bir
  marta `scheduled` broadcastlarni tekshiradi) — restart'ga chidamli, qo'shimcha
  dependency talab qilmaydi.
- **Rate-limit:** kanallar orasida 0.5s pauza, `TelegramRetryAfter` hurmat qilinadi,
  3 martagacha qayta urinish (TZ 4.1).
- **Excel:** openpyxl (pandas import faqat eski kod uchun qoladi). Import format:
  A=OTT nomi, B=link/@username, C=turi (Davlat/Xorijiy/Nodavlat), D=teg (ixtiyoriy).
  Birinchi qator sarlavha bo'lsa avtomatik tashlab yuboriladi.
- **Views statistikasi** (TZ 5, 10.3): Bot API views bermaydi — B variant (userbot)
  buyurtmachi bilan kelishilgach qo'shiladi. Hozircha hisobotlar views'siz.

## Modul tuzilmasi

- `zakovat_bot/models.py` — Channel, Broadcast, BroadcastResult, AuditLog (+ eski modellar)
- `zakovat_bot/permissions.py` — rol tekshiruvi, bootstrap, audit-jurnal helper
- `zakovat_bot/services/excel.py` — import/eksport
- `zakovat_bot/services/broadcasting.py` — tarqatish yadrosi (rate-limit, retry, natijalar)
- `zakovat_bot/scheduler.py` — rejalashtirilgan tarqatish poller'i
- `zakovat_bot/handlers/channel_handler.py` — kanallar CRUD + Excel
- `zakovat_bot/handlers/broadcast_handler.py` — tarqatish oqimi + rejalar + statistika
- `zakovat_bot/handlers/admin_handler.py` — eski funksiyalar (zakovat, suhbat) + rol himoyasi
