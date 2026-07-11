# O'zgarishlar jurnali

> Loyihadagi barcha muhim ishlar shu yerda yoziladi — eng yangisi tepada.
> Har yozuvda: nima qilindi, nega qilindi, va bilish kerak bo'lgan eslatmalar.
> Batafsil reja: [PLAN.md](PLAN.md). Texnik topshiriq: `poytaxt_yoshlari_TZ.md`.

---

## [0.7.0] — 2026-07-11 · Matn animatsiyalari va kartalar (dizayn 2-bosqich)

**Nima qilindi:**
- **TextReveal komponenti** — sarlavha so'zlari niqob ostidan birma-bir ko'tarilib chiqadi (premium "mask reveal" effekti). Bosh sahifadagi barcha bo'lim sarlavhalari + barcha ichki sahifalar sarlavhalari (PageHeader) shu animatsiya bilan chiqadi. Skrinriderlar uchun to'liq matn saqlangan.
- **Yangiliklar kartalari qayta ishlandi** — baraka uslubida: har karta o'z pastel-gradient olamida (krem / havorang / yashil, almashinib), rasmlar **ark-tepali** (gumbaz shakli), hero arki bilan bitta vizual til.
- **Loyihalar kartalari** — har ikkinchi karta ark shaklida, qator "mozaika" ritmini oldi.
- **Hamma bo'lim animatsiyalari yagona tilga o'tdi** — 1s, `cubic-bezier(0.65, 0, 0.35, 1)` (Events, Projects, News, Stats).
- **Tizimli bug tuzatildi: FontAwesome JS → CSS versiyasi.** JS versiyasi `<i>` teglarni `<svg>` ga almashtirib React hydration'ni buzardi (151 joyda, PLAN Faza 4 muammosi). CSS versiyada bu muammo yo'q — hydration xatolari butunlay yo'qoldi.

---

## [0.6.0] — 2026-07-11 · Baraka-uslub dizayn tizimi (1-bosqich)

**Yo'nalish:** baraka.gov.uz tahlil qilindi (skrinshot + CSS'dan o'lchab olindi) va uning "premium his" beruvchi elementlari o'zimizga moslashtirildi — nusxa emas, yoshlar identiteti bilan.

**Nima qilindi:**
- **Shrift: Manrope → Jost** (baraka sarlavha shrifti; kirillchasi bor — 4 til rejasiga ham mos).
- **Reveal animatsiyalar sekinlashtirildi**: 0.6s → 1s, baraka'dan o'lchangan `cubic-bezier(0.65, 0, 0.35, 1)` easing — "og'ir, qimmat" his shu yerdan keladi.
- **Yangi Hero (TZ FR-HOME-01..03)**: «YOSHLAR — KELAJAK BUNYODKORI!» shiori (urg'u so'z yashil), qo'shimcha shior, «Tadbirga yozilish» + «Murojaat yuborish» CTA'lari, **ark-maskali rasm** (o'zbek me'moriy arkasi), romb-ornament separator. Eski yangiliklar-slayderi olib tashlandi (yangiliklar quyida o'z bo'limida bor).
- **Rang-blokli seksiyalar**: About — krem band, News — havorang band; Events oq orol bilan birga scroll'da «sahna almashinuvi» ritmi hosil bo'ldi.
- **Yangi global utility'lar**: `.arch-mask`, `.band-*` (cream/sky/green-pale/navy), `.giant-text` (fon dekorativ matn), `.img-lively` (hover'da filter), `.accent-word`.

**Keyingi dizayn bosqichi:** ichki sahifalar (tadbirlar, yangiliklar, rahbariyat) shu tilga o'tadi; PageHero yagonalashuvi; FontAwesome → SVG.

---

## [0.5.0] — 2026-07-11 · Tadbirlar moduli (TZ §9)

**Nima qilindi:**
- **Yangi `/tadbirlar` sahifasi** — bo'lajak va o'tgan tadbirlar, tur bo'yicha filtr (Tanlov, Seminar, Forum, Uchrashuv, Sport, Volontyorlik). Navbar'ga havola qo'shildi.
- **Tadbir sahifasi** (`/tadbirlar/[slug]`) — banner, to'liq ma'lumot paneli (sana, joy + xarita havolasi, tashkilotchi, hamkorlar), band o'rinlar progress-bar'i, yakunlangan tadbirda natijalar bloki, Google uchun JSON-LD Event schema.
- **Onlayn ro'yxatdan o'tish** — F.I.Sh., telefon, Telegram, OTM/muassasa, maxfiylik roziligi. Himoya: zod validatsiya, IP bo'yicha soatiga 10 ta cheklov, limit to'lganda avtomatik yopilish, bitta telefon bir tadbirga bir marta. Jonli tekshirildi: ro'yxatdan o'tish ✅, takror urinish rad etildi ✅, hisoblagich yangilandi ✅.
- **Admin: Tadbirlar CRUD** — mavjud konfiguratsiya tizimiga qo'shildi, yangi `datetime` maydon turi bilan (sana-vaqt tanlash).
- **Admin: Ishtirokchilar bo'limi** — har tadbir bo'yicha ro'yxat + **CSV yuklab olish** (Excel'da kirillcha to'g'ri ochiladi).
- **Bosh sahifa Events bloki endi bazadan** — 3 ta eng yaqin tadbirni ko'rsatadi (avval qotib qolgan mock edi); tadbir bo'lmasa bo'lim yashirinadi.
- Baza: `Event` + `EventRegistration` jadvallari (migratsiya `add_events`), seed'da 4 namunaviy tadbir.

**Eslatma:** Tadbir qo'shish — Admin panel → Tadbirlar → «Yangi tadbir». «Nashr etilgan» belgilanmagunicha saytda ko'rinmaydi. Ishtirokchilar ro'yxati — Admin → Ishtirokchilar.

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
| Tadbirlar | ✅ To'liq ishlaydi: ro'yxat, filtr, ro'yxatdan o'tish, admin CRUD, CSV eksport |
| Deploy | Hali yo'q — VPS/domen kutilmoqda (PLAN.md, ochiq savollar) |
| Keyingi ish | Fayl yuklash (1.6), Dockerfile+CI (1.10), yoki bosh sahifani TZ §5.2 ga moslash (shior + 3 CTA) |
