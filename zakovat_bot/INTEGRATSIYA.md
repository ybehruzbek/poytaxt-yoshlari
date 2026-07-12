# ⚠️ Bu papka — integratsiya uchun

Bu papka **poytaxt-yoshlari saytining bir qismi EMAS** — bu keyinchalik
loyihaga integratsiya qilinadigan alohida Telegram bot kodi.

| | |
|---|---|
| **Manba** | https://github.com/Norqulov-Sardorbek/zakovat_bot (vendored nusxa, ichki `.git` olib tashlangan) |
| **Nima o'zi** | "Zakovat" intellektual o'yin boti — Django + aiogram (Python) |
| **Maqsad bot** | **@yoshlaruchuntanlov_bot** — yoshlar uchun tanlov/viktorina boti sifatida ulanadi |
| **Token qayerda** | `zakovat_bot/.env` faylida (`BOT_TOKEN`) — **gitga tushmaydi**, shablon: `.env.example` |
| **Holat** | Hozircha shunchaki saqlab qo'yilgan; integratsiya boshlanmagan |

## Tuzilma

- `zakovat_bot/` — bot mantiqi: `bot.py`, `dispatcher.py`, `models.py`, `state.py`, `signals.py`
- `config/` — Django sozlamalari (secretlar `python-decouple` orqali env'dan)
- `core/` — yordamchi Django app (`constants.py`da Eskiz SMS integratsiyasi bor)
- `Dockerfile`, `docker-compose.yml`, `nginx.conf` — deploy konfiguratsiyasi

## Integratsiyada e'tibor berish kerak

- `zakovat_bot/dispatcher.py:10` — `print(TOKEN)` bor: tokenni log'ga chiqaradi,
  integratsiyada OLIB TASHLANSIN.
- `core/constants.py` `sms_service.models`ni import qiladi, lekin `sms_service`
  app'i repoda yo'q — asl loyihadan tushib qolgan bo'lsa kerak; ishga
  tushirishdan oldin hal qilinadi.
- Bot Python/Django — bizning sayt Next.js/TypeScript. Integratsiya usuli
  (alohida servis sifatida deploy vs mantiqni qayta yozish) hali hal qilinmagan.
