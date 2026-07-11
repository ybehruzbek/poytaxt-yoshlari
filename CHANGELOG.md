# O'zgarishlar jurnali

> Loyihadagi barcha muhim ishlar shu yerda yoziladi — eng yangisi tepada.
> Har yozuvda: nima qilindi, nega qilindi, va bilish kerak bo'lgan eslatmalar.
> Batafsil reja: [PLAN.md](PLAN.md). Texnik topshiriq: `poytaxt_yoshlari_TZ.md`.

---

## [0.9.4] — 2026-07-11 · Singan havolalar tuzatildi, FAQ bo'limi qo'shildi

**Sayt bo'ylab link auditi o'tkazildi (Paket 1):**
- **4 ta singan mega-menyu havolasi tuzatildi**: `/faoliyat/grantlar` (bunday yo'nalish yo'q edi) → «Tadbirlar» havolasi bilan almashtirildi; `/faoliyat/talabalar` → to'g'ri slug `/faoliyat/talaba-yoshlari`; mavjud bo'lmagan `/axborot-markazi/video` va `/axborot-markazi/press-reliz` → bitta «Media markaz» (`/axborot-markazi`) havolasiga birlashtirildi.
- **5 ta ishlamaydigan anchor tuzatildi**: footer'dagi `/tashkilot#tashkilot`, `#hujjatlar`, `#rahbariyat` endi to'g'ridan-to'g'ri sahifalarga boradi; `/faoliyat#yonalishlar` va `#loyihalar` uchun faoliyat sahifasiga mos `id` lar qo'shildi.
- **Yangi FAQ bo'limi** — `/murojaat#savol-javob` havolasi bor edi, bo'limning o'zi yo'q edi. 6 savolli accordion qo'shildi (`components/Faq/`): server komponent, `<details>` asosida — JS talab qilmaydi, landing dizayn tilida (`.section-label`, tokenlar).
- **O'lik kod o'chirildi**: `components/CTA/` hech qayerda ishlatilmasdi (ichida `href="#"` placeholder ham bor edi).

**Eslatma:** ijtimoiy tarmoq havolalari (Telegram/Instagram/YouTube/Facebook) hali ham `#` — buyurtmachidan rasmiy sahifa URL'lari kutilmoqda.

---

## [0.9.3] — 2026-07-11 · Footer logo oq siluэt + yangiliklar lentasi to'ldirildi

**Foydalanuvchi fikri asosida:**
- **Footer logotipi endi o'zi oq** — oldingi oq kartacha yechim o'rniga CSS `filter: brightness(0) invert(1)` bilan logotipning o'zi bir rangli oq silуэtga aylantirildi (shaffoflik saqlanadi).
- **Yangiliklar lentasidagi bo'sh joy to'ldirildi** — bazada atigi 6 ta yangilik bor edi (3 tasi aylanishda, faqat 3 tasi lentaga yetardi, 4-o'rin bo'sh qolardi). 2 ta yangi yangilik qo'shildi («IT Park bilan hamkorlik», «Yosh tadbirkor tanlovi») — endi lenta to'liq.

---

## [0.9.2] — 2026-07-11 · Footer qayta ishlandi: to'q navy, o'lik havolalar tuzatildi

**Nima qilindi:**
- **Footer fon rangi oqdan to'q navy'ga** (`--blue-deep`) — sayt hero'dan boshlanib, navy footer bilan "yopiladi"; yumshoq yashil glow va romb-ornament qatori hero bilan bitta vizual tilda.
- **Logo oq kartachaga o'ralди** — logotipning matni och-ko'k, to'q fonda yo'qolib qolardi.
- **Ijtimoiy tarmoq ikonkalari** — eski `translateY` sakrash-hover olib tashlandi, endi faqat rang o'zgaradi (yashilga to'ladi) — tugmalar tizimi bilan bir xil mantiq.
- **2 ta o'lik havola tuzatildi**: «Maxfiylik siyosati» va «Foydalanish shartlari» `href="#"` edi — endi haqiqiy sahifalarga (`/maxfiylik-siyosati`, `/foydalanish-shartlari`) olib boradi, TZ §19.1 talabiga muvofiq placeholder matn bilan.
- Footer navigatsiyasiga **«Tadbirlar»** havolasi qo'shildi (yangi bo'lim, ilgari yo'q edi).

---

## [0.9.1] — 2026-07-11 · Aylanadigan yangiliklar qaytdi + navbar zichlashdi

**Nima qilindi:**
- **Yangiliklar aylanishi qaytdi** — eski hero slayderi ruhida, endi «So'nggi voqealar» bo'limidagi katta kartada: eng so'nggi 3 yangilik 6 soniyada yumshoq krossfeyd bilan almashadi, rasm ustida bosiladigan nuqtalar bor. O'ngdagi lenta esa keyingi 4 yangilikni ko'rsatadi (takrorlanish yo'q).
- **Navbar bo'shliqlari yo'qotildi** — pill 1400px, ichki qator esa 1300px edi: har chetda 50px bo'sh joy shundan qolardi. Endi kontent pill chetlarigacha boradi; pill kengligi 1240px'ga ixchamlashdi.

---

## [0.9.0] — 2026-07-11 · Navbar: bazadan boshqariladi, ixcham, login menyu ichida

**Nima qilindi:**
- **Navbar havolalari endi bazadan** — admin panelda yangi **«Menyu»** bo'limi: nom, havola, tartib raqami, ko'rinadi/yo'q. Ko'rinadigan birinchi 5 tasi navbar qatorida chiqadi, tartibni sudrab emas, raqam bilan boshqarasiz. (Yangi `NavLink` jadvali, migratsiya `add_nav_links`.)
- **Balandlik ixchamlashdi**: desktop 80→66px, mobil 64→58px; logo mosravishda kichraydi.
- **«Tizimga kirish» asosiy qatordan olib tashlandi** — endi burger-menyu ichida, kontakt bloki ostida sokin kulrang havola (hover'da navy). Asosiy qator endi faqat: logo · havolalar · til · burger.

**Eslatma:** menyuga yangi havola qo'shish — Admin → Menyu → «Yangi havola». Dev serverda yangi jadval qo'shilgandan keyin server qayta ishga tushirilishi kerak (eski Prisma klienti xotirada qoladi).

---

## [0.8.3] — 2026-07-11 · Tugmalar: minimal, faqat rang bilan ishlaydigan hover

**Foydalanuvchi fikri asosida:** tugma hoverlar "sakraydigan" va notekis edi.

**Nima qilindi:**
- Barcha global tugmalardan (`btn-primary`, `btn-secondary`, `btn-view-all`, `nav-cta`, hero tugmalari) **ko'tarilish, scale va soya-sakrashlar olib tashlandi**.
- Yangi tizim — faqat sokin rang o'tishlari (0.35s ease): primary navy→chuqur navy; secondary och-ko'k bir tonna quyuqlashadi; «Barchasi» konturli tugma hover'da yumshoq och-ko'kka to'ladi (faqat ichidagi strelka 4px siljiydi); bosishda yengil opacity.
- Tadbir ro'yxatdan o'tish formasi tugmasi ham shu tizimga o'tdi (pill shakl).
- Karta hoverlari (ko'tarilish) atayin qoldirildi — muammo tugmalarda edi; ichki sahifalardagi qolgan tugmalar ichki-sahifa dizayn bosqichida tekislanadi.
- **Qo'shimcha tuzatish (fikrdan keyin):** hover ranglari juda och edi — endi konturli tugma hover'da **to'liq navy'ga to'ladi** (oq matn), secondary ham navy bo'ladi, navbar CTA yanada quyuqlashadi. Konturli tugmaning default foni shaffof emas — **oq**.

---

## [0.8.2] — 2026-07-11 · Kartalar yakuniy: progress olib tashlandi, yangiliklar «digest»

**Foydalanuvchi fikri asosida:**
- **Loyihalar kartasidan foiz/progress-chiziq olib tashlandi** — landing kartada ortiqcha ma'lumot edi (gradient ham ketdi). Endi: rasm + kategoriya + sarlavha + tavsif + «Batafsil».
- **Tadbir kartalariga oq fon qaytdi** — loyihalar bilan bir xil karta yuzasi (oq, 24px radius, hover'da ko'tarilish).
- **Yangiliklar butunlay yangi «digest» maketida**: chapda bitta katta bosh yangilik (rasm + sarlavha + qisqacha + «O'qish»), o'ngda 4 ta ixcham gorizontal qator (kichik rasm + teg + sana + sarlavha) — gazeta lentasi uslubi. Hover'da qatorlar o'ngga siljiydi. Har bo'lim endi o'z xarakteriga ega: loyihalar — grid, tadbirlar — grid, yangiliklar — lenta.

---

## [0.8.1] — 2026-07-11 · Tinchlantirish: ranglar soddalashdi, silliqlik tuzatildi

**Foydalanuvchi fikri asosida:** juda rang-barang bo'lib ketgan edi, scroll silliq emasdi, loyiha kartalariga o'z foni kerak edi.

**Nima qilindi:**
- **Ranglar soddalashdi**: har bo'limda boshqa rang almashinuvi o'rniga bitta xotirjam juftlik (yashil + amber, past opacity) — bo'limlar orasida rang emas, faqat yengil siljish.
- **Silliqlik tuzatildi** (scroll jank sabablari): `background-attachment: fixed` olib tashlandi (har kadrda qayta chizdirardi); glow qatlamlari kichraytirildi (40vw → 30vw) va blur yengillashtirildi (150px → 90-100px) — GPU yuki keskin kamaydi; rang-transition o'rniga faqat transform.
- **Loyihalar kartalariga o'z foni qaytdi**: oq karta ichida rasm (baraka uslubi), kategoriya + jonli progress-chiziq + sarlavha; umumiy bo'lim foni yo'q.

---

## [0.8.0] — 2026-07-11 · Chegarasiz oqim: landing to'liq ochiq uslubga o'tdi

**Foydalanuvchi fikri asosida:** ark radiuslar kartalardan olib tashlandi, bo'lim orasidagi barcha "quti" fonlar yo'qotildi — hero'dagi ochiq-havodor his endi butun sahifada.

**Nima qilindi:**
- **Bo'lim chegaralari yo'qoldi**: band'lar (krem/havorang), Events oq oroli, Projects kulrang bloki — hammasi olib tashlandi. Sahifa endi bitta uzluksiz oqim.
- **Ambient fon kuchaytirildi**: har bo'limda brend ranglari (yashil, amber, teal, navy) yumshoq dog' bo'lib 1.5s'da almashadi — "sahna" endi chegara bilan emas, rang bilan ajraladi.
- **Loyihalar kartalari butunlay yangi**: quti yo'q — rasm (16px radius, hover'da sekin zoom + jonlanish), kategoriya yorlig'i + jonli progress-chiziq + foiz, sarlavha (hover'da teal), tavsif, «Batafsil →». Editorial-jurnalcha uslub.
- **Yangiliklar kartalari ham shu tilda**: pastel qutilar va ark olib tashlandi — rasm + sana + sarlavha ochiq turadi, featured yangilik katta rasm bilan.
- **Tadbirlar kartalari (bosh sahifa)** ham qutisiz qilindi — uchala bo'lim bitta vizual oilada.

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
