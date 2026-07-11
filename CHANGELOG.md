# O'zgarishlar jurnali

> Loyihadagi barcha muhim ishlar shu yerda yoziladi — eng yangisi tepada.
> Har yozuvda: nima qilindi, nega qilindi, va bilish kerak bo'lgan eslatmalar.
> Batafsil reja: [PLAN.md](PLAN.md). Texnik topshiriq: `poytaxt_yoshlari_TZ.md`.

---

## [0.4.0] — 2026-07-11 · PostgreSQL'ga ko'chish

**Nima qilindi:**
- SQLite → **PostgreSQL 16** (Docker Compose, `postgres:16-alpine`).
- Dev bazasi **5433** portda (bu kompyuterda 5432 da lokal Postgres bor — konflikt bo'lmasin deb).
- Prisma `@prisma/adapter-pg` ga o'tdi; `better-sqlite3` butunlay olib tashlandi.
- **Migratsiya tartibi joriy**: sxema o'zgarishlari endi `prisma/migrations/` da versiyalanadi (`db push` o'rniga). Yangi skriptlar: `db:migrate`, `db:deploy`, `db:reset`.
- `.env.example` repoga qo'shildi (gitignore'da istisno qilindi).

**Endi dev muhitni ishga tushirish:**
```
docker compose up -d      # Postgres (bir marta; keyin o'zi ko'tariladi)
npm run dev
```

**Mac'da birinchi marta pull qilgandan keyin:**
1. `.env` ga `.env.example` dagi kalitlarni to'ldirish (`POSTGRES_PASSWORD`, `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`)
2. `docker compose up -d && npx prisma migrate dev && npm run db:seed && npm run db:seed:admin`

---

## [0.3.0] — 2026-07-11 · Xavfsizlik va SEO poydevori

**Nima qilindi:**
- **URL validatsiyasi** (`lib/admin/validation.ts`) — admin formalardagi URL maydonlar faqat `https://` yoki `/` bilan boshlanadi. `javascript:` orqali stored-XSS yo'li yopildi (branch tahlilida topilgan yagona ochiq teshik edi).
- **`/api/appeals` himoyalandi** — zod validatsiya (xabar 10–5000 belgi, telefon format) + bitta IP'dan **soatiga 5 ta murojaat** cheklovi. Avval hech qanday cheklov yo'q edi.
- `error.tsx`, `global-error.tsx`, `loading.tsx` — xatolikda oq ekran o'rniga "Qayta urinish" tugmali sahifa.
- `sitemap.xml` (barcha sahifa + yangilik/loyiha/yo'nalish sluglari bazadan) va `robots.txt` (`/admin`, `/api` yopiq), `metadataBase`.
- Kechagi branch'dan qolgan 2 ta **yashirin production-build xatosi** tuzatildi (dev'da bilinmasdi): `SectionTheme` tip ro'yxati provider bilan sinxron emas edi; 5 komponentda `motion` `Variants` tiplari xato.

---

## [0.2.1] — 2026-07-11 · Merge, master-reja, lokal baza tiklash

**Nima qilindi:**
- `feat/db-single-source-admin-crud` branch **main'ga merge qilindi** va push qilindi. (Kechagi Mac'dagi ish main'ga emas, shu branch'ga push qilingan ekan — hech narsa yo'qolmagan.)
- **PLAN.md master-reja v2** ga kengaytirildi: yakuniy stack, sayt xaritasi (6 yangi sahifa: tadbirlar, tashkilotlar, imkoniyatlar, reyting, qidiruv, kabinet), sahifama-sahifa spetsifikatsiya, rollar matritsasi, dizayn-mezonlar, yangi g'oyalar (QR check-in, Telegram Mini App, murojaat kuzatish kodi, OG-rasm avtogeneratsiya...), 7 faza.
- Qabul qilingan qarorlar: **VPS + Docker** hosting; **sxema 4 tilga tayyor**, kontent lotin; funksional + dizayn **parallel**.
- Lokal baza yangi sxemaga to'g'irlandi (`db:reset` + seed) — merge'dan keyingi `News.slug does not exist` xatosi shu bilan ketdi.
- Admin hisobi endi `.env` dan: login `admin`, parol `.env` dagi `ADMIN_PASSWORD` qatorida.

---

## [0.2.0] — 2026-07-10 · Baza — yagona manba + admin CRUD *(Mac, feature branch)*

**Faza 0 — «qon to'xtatish»:**
- Build umuman ishlamasdi (`prisma generate` yo'q edi) — tuzatildi.
- Git'da ochiq yotgan `NEXTAUTH_SECRET` zaxira kaliti olib tashlandi (`lib/env.ts` — endi yo'q bo'lsa build yiqiladi).
- `/admin` endi **rolni tekshiradi** (avval istalgan login qilgan foydalanuvchi kirardi) + admin layout'da ikkinchi qavat himoya.
- `admin/admin123` standart parol o'chirildi — endi `.env` dan, kamida 12 belgi, bcrypt cost 12.
- Login'dagi timing-attack yopildi; NextAuth tiplari (`as any` o'rniga augmentatsiya).
- GitHub Pages deploy o'chirildi (server kod u yerda ishlamaydi).

**Faza 2 — yagona haqiqat manbai:**
- Butun kontent `lib/data.ts` dan **bazaga ko'chdi**; `lib/queries.ts` o'qish qatlami.
- URL'lar `[id]` → `[slug]` (o'zbekcha slugify: `Ta'lim` → `talim`).
- Tuzatilgan bug: ro'yxat bazadan, detal sahifa statik fayldan o'qirdi — **har qanday yangilik/loyihaga bosish 404 berardi**.
- Admin panelda **11 resurs uchun to'liq CRUD** (konfiguratsiya asosida), zod validatsiya, **audit log** (kim nimani o'zgartirgani), murojaat holati/javobi tahriri, `published` bayrog'i.
- Seed **idempotent** — to'ldirilgan jadvalga tegmaydi, admin kiritgan kontent o'chmaydi.
- Topilgan Next 16.2.9 bug: `.bind()` li server action no-JS formada cheksiz sikl — yechim `lib/admin/actions.ts` da izohlangan.
- Landing sayqallari: ambient scroll fonlar, floating kartalar, Events komponenti.

---

## [0.1.0] — 2026-07-07…08 · Frontend poydevor *(tarixiy)*

- 15 ta ommaviy sahifa premium UI bilan: bosh sahifa, tashkilot/missiya/tarix, rahbariyat, faoliyat, loyihalar, yangiliklar, hududlar, yetakchilar, hujjatlar, galereya, murojaat, axborot markazi.
- CSS Modules + dizayn tokenlari, ScrollReveal animatsiyalar, GSAP sticky-scroll effektlar.
- Birinchi admin dashboard + SQLite + NextAuth (keyinchalik 0.2.0 da qayta ishlandi).

---

## Joriy holat (2026-07-11)

| Nima | Holat |
|---|---|
| Baza | PostgreSQL 16 (Docker, port 5433), migratsiyalar bilan |
| Admin | `/admin` — login `admin`, parol `.env` da |
| Deploy | Hali yo'q — VPS/domen kutilmoqda (PLAN.md, ochiq savollar) |
| Keyingi ish | Faza 1 qoldiqlari: fayl yuklash (1.6) yoki Dockerfile+CI (1.10); yoki Faza 2 — Tadbirlar moduli |
