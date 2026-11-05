# Yoshlar Ittifoqi — Toshkent shahar kengashi (sayt + admin panel)

Next.js 16 + Payload CMS 3 + PostgreSQL. Texnologiyalar tanlovi: [`../docs/texnologiyalar.md`](../docs/texnologiyalar.md).
Dizayn manbai: `../ittifoq/` (statik prototip).

## Talablar

- **Node 24** (`.nvmrc` bor: `nvm use`)
- **pnpm** 10
- **Docker** (lokal PostgreSQL uchun)

## Lokal ishga tushirish

```bash
nvm use                 # Node 24
docker compose up -d    # PostgreSQL → 127.0.0.1:5437
cp .env.example .env    # birinchi marta; PAYLOAD_SECRET ni o'zgartiring
pnpm install
pnpm dev                # http://localhost:3000
```

- Sayt: http://localhost:3000 → `/uz`, `/ru`, `/en`
- Admin panel: http://localhost:3000/admin — birinchi ochilganda admin hisobini yaratasiz
  (birinchi foydalanuvchi avtomatik **Admin** roliga ega bo'ladi).

## Tuzilma

```
src/
  app/(frontend)/[locale]/   sayt sahifalari (uz / ru / en)
  app/(payload)/             admin panel va API (Payload)
  collections/               admin bo'limlari (Users, Media, ...)
  i18n/config.ts             tillar ro'yxati
  lib/alifbo.ts              joriy → yangi alifbo (Ö Ğ Ş Ç ’) o'girgich
  proxy.ts                   tilsiz manzillarni /uz ga yo'naltirish
  payload.config.ts          Payload sozlamalari (DB, tillar, admin tili)
```

## Foydali buyruqlar

| Buyruq | Vazifa |
| --- | --- |
| `pnpm dev` | Ishlab chiqish serveri |
| `pnpm build && pnpm start` | Production rejimi |
| `pnpm generate:types` | Admin bo'limlari o'zgargandan keyin TypeScript turlarini yangilash |
| `pnpm lint` | Kod tekshiruvi |
| `pnpm exec tsc --noEmit` | Turlar tekshiruvi |

## Rollar

| Rol | Ruxsat |
| --- | --- |
| `admin` | Hammasi, foydalanuvchilarni boshqarish |
| `muharrir` | Kontent: yangiliklar, tadbirlar, imkoniyatlar, media |
| `operator` | Faqat murojaatlar |
