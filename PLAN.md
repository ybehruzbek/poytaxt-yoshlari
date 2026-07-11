# Poytaxt Yoshlari — MASTER-REJA (v2)

> Manba: `poytaxt_yoshlari_TZ.md` (TZ v1.0, 2026-07-07). Holat jadvali: `PROJECT_STATUS.md`.
> Oxirgi yangilanish: 2026-07-11.
> Maqsad: poytaxtyoshlari.uz ni O'zbekistondagi **eng chiroyli va eng funksional yoshlar platformasi**ga aylantirish.

---

## 1. Qabul qilingan qarorlar

| # | Qaror | Sabab | Holat |
|---|---|---|---|
| A1 | Server-render Next.js (`output: 'standalone'`) + **VPS + Docker** | TZ §17.1. API, NextAuth, Prisma, fayl saqlash, cron, Telegram bot — hammasi bitta serverda, to'liq nazorat | ✅ Tasdiqlandi (2026-07-11) |
| A2 | **PostgreSQL 16** (dev + prod bir xil), Docker Compose | TZ §17.1. SQLite yozuvda lock beradi, prod uchun yaroqsiz | 🔜 Faza 1 |
| A3 | Baza — **yagona haqiqat manbai**; `lib/data.ts` faqat seed | Ikki parallel manba bir-biriga zid edi | ✅ Bajarildi (Faza 2) |
| A4 | Auth: NextAuth (JWT) + RBAC, ikki qavatli himoya (`proxy.ts` + `requireRole()`) | TZ §8.1, §19 SEC-03 | ✅ Poydevor bor, rollar kengayadi |
| A5 | Styling: CSS Modules + `globals.css` **dizayn tokenlari**. Tailwind YO'Q | 57 modul bor; ko'chirish qimmat, foydasi kam | ✅ Tasdiqlandi |
| A6 | **Sxema 4 tilga tayyor** (uz-lotin, uz-kirill, ru, en), kontent dastlab lotin | TZ §14 FR-LANG-01. Keyin qayta yozmaslik uchun hoziroq translation-jadvallar bilan loyihalanadi | ✅ Tasdiqlandi (2026-07-11) |
| A7 | Ish tartibi: **funksional + dizayn parallel** | Har faza oxirida ham ishlaydigan, ham chiroyli natija chiqadi | ✅ Tasdiqlandi (2026-07-11) |
| A8 | `feat/db-single-source-admin-crud` main'ga merge qilindi | Faza 0 + Faza 2 poydevori | ✅ Bajarildi (2026-07-11) |

---

## 2. Texnologik stack (yakuniy)

| Qatlam | Tanlov | Izoh |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript | Mavjud |
| Baza | PostgreSQL 16 + Prisma 7 | SQLite'dan ko'chiriladi (Faza 1) |
| Auth | NextAuth 4 (JWT) + RBAC | Rollar TZ §8.1 bo'yicha kengayadi |
| Validatsiya | zod (server-side, barcha action/API) | Mavjud, qamrov kengayadi |
| i18n | `next-intl` — locale routing: `/` (lotin), `/oz`, `/ru`, `/en` | Faza 1 da texnik tayyorlik, kontent bosqichma-bosqich |
| Fayl saqlash | Server disk (`/uploads` volume) + `sharp` bilan qayta ishlash; keyin MinIO (S3-mos)ga o'tish yo'li ochiq | TZ §17.1 |
| Qidiruv | PostgreSQL full-text search + lotin↔kirill transliteratsiya | Meilisearch keyin, kerak bo'lsa |
| Cache / rate-limit | Boshida in-memory + Postgres; yuklama oshsa Redis | TZ §17.1 |
| Captcha | Cloudflare Turnstile (bepul, reCAPTCHA'dan yengil) | TZ SEC-07 |
| Ikonlar | Lokal SVG sprite (lucide asosida) — FontAwesome CDN olib tashlanadi | 151 joyda hydration muammosi bor |
| Shriftlar | `next/font` lokal subset (lotin + kirill) | Google CDN'ga qaramlik yo'qoladi |
| Monitoring | Sentry (xatolar) + Umami (analytics, self-hosted, cookie'siz) | TZ §15, §20 |
| Test | Playwright E2E (smoke) + CI'da build/lint/typecheck | TZ §22.1 |
| Deploy | Docker Compose (app + postgres + umami) + Nginx + Let's Encrypt, GitHub Actions CI/CD | TZ §17.2 |
| Backup | Kunlik `pg_dump` + uploads → offsite (S3-mos), tiklash yo'riqnomasi | TZ SEC-08 |

---

## 3. Sayt xaritasi (yakuniy IA)

```
/                       Bosh sahifa
/tashkilot              Biz haqimizda (hub) → /missiya, /tarix
/rahbariyat             Rahbariyat → /rahbariyat/[slug]
/loyihalar              Loyihalar → /loyihalar/[slug]
/tadbirlar    [YANGI]   Tadbirlar (ro'yxat + kalendar) → /tadbirlar/[slug]
/tashkilotlar [YANGI]   Boshlang'ich tashkilotlar (xarita + filtr) → /tashkilotlar/[slug]
/yangiliklar            Yangiliklar (kategoriya, teg, qidiruv) → /yangiliklar/[slug]
/imkoniyatlar [YANGI]   Grantlar, tanlovlar, vakansiyalar, volontyorlik
/reyting      [YANGI]   Ochiq reyting (Top-10 uch kesimda) + metodologiya
/hujjatlar              Hujjatlar (filtr + yuklab olish)
/galereya               Media (foto albomlar + video)
/hududlar               Tuman bo'limlari
/yetakchilar            Yosh yetakchilar → /yetakchilar/[slug]
/murojaat               Murojaat yuborish + /murojaat/holat/[kod] kuzatish
/aloqa        [YANGI]   Aloqa (xarita, kontaktlar) — hozir footer'da tarqoq
/qidiruv      [YANGI]   Global qidiruv (yangilik, tadbir, tashkilot, hujjat, media)
/maxfiylik-siyosati [YANGI]
/kabinet      [YANGI]   Shaxsiy kabinet (Faza 4)
/admin                  Boshqaruv paneli (mavjud, kengayadi)
```

Har bir sahifada: SEO metadata (title, description, og:image, canonical), `loading.tsx`, xatolik holatlari. Maxsus: brendlangan 404 / 500 / 403.

---

## 4. Sahifama-sahifa spetsifikatsiya

### 4.1. Bosh sahifa `/`
TZ §5.2 bo'yicha qayta quriladi:
1. **Hero** — shior «Yoshlar – Kelajak Bunyodkori!» (FR-HOME-01) + qo'shimcha shior + 3 CTA: «Tadbirga yozilish», «Murojaat yuborish», «Boshlang'ich tashkilotlar» (FR-HOME-03).
2. **Statistika lentasi** — admin kiritadigan real sonlar (FR-HOME-04).
3. **Yaqin tadbirlar** — sana bo'yicha avtomatik, «kalendarga qo'shish» tugmasi bilan.
4. **So'nggi yangiliklar** — 3–4 karta + «hammasi» havolasi.
5. **Faol loyihalar** — muddati ochiq tanlovlar birinchi.
6. **Top reyting** — eng faol 3 tashkilot (Faza 5 dan keyin).
7. **Media lenta** — oxirgi albom/video.
8. **Hamkorlar logolari** + yakuniy CTA blok.
Mobil birinchi ekranda shior + CTA'lar to'liq ko'rinishi shart (FR-HOME-06).

### 4.2. Tadbirlar `/tadbirlar` [YANGI — TZ §9]
- Ikki ko'rinish: **karta ro'yxati** va **oylik kalendar**; filtr: tur, sana, tashkilot, holat.
- Tadbir sahifasi: banner, sana/vaqt, joy + Google Maps, tashkilotchi, hamkorlar, limit va band o'rinlar progress'i, ro'yxatdan o'tish formasi (TZ §24.2), tadbirdan keyin — natijalar, foto, press-reliz.
- Ro'yxatdan o'tish: forma (F.I.Sh., telefon, Telegram, OTM/muassasa, rozilik) → tasdiqlash + **QR-chipta**; admin eksport (Excel/Google Sheets).
- SEO: JSON-LD `Event` schema → Google'da tadbir rich-result chiqadi. iCal eksport.

### 4.3. Boshlang'ich tashkilotlar `/tashkilotlar` [YANGI — TZ §6]
- Ro'yxat: tur bo'yicha filtr (OTM / harbiy qism / muassasa / hamkor) + **interaktiv xarita** (FR-ORG-06).
- Profil sahifasi: banner, tur belgisi, manzil + xarita, yoshlar soni, yetakchi (foto, telefon, Telegram), media guruh rahbari, reyting ko'rsatkichi va oylik faollik grafigi, tashkilot yangiliklari, tadbirlari, galereyasi, hisobotlari (TZ §6.2).
- Tashkilot kiritgan kontent Kengash moderatsiyasidan keyin chiqadi (FR-ORG-05).

### 4.4. Yangiliklar `/yangiliklar`
- Kategoriyalar (TZ §11.1: rasmiy, tadbirlar, tanlovlar, press-reliz, e'lon...), teglar, sana filtri, qidiruv.
- Maqola: muqova, o'qish vaqti, mundarija (uzun matnda), bog'liq tadbir/loyiha/tashkilot kartalari, ulashish (Telegram birinchi), **avtogeneratsiya og-image**.
- RSS feed.

### 4.5. Loyihalar `/loyihalar`
- Holat filtri (davom etmoqda / tanlov ochiq / yakunlangan), muddat countdown'i.
- Loyiha sahifasi: maqsad, bosqichlar, natijalar/g'oliblar, hamkorlar, bog'liq tadbirlar va yangiliklar, ro'yxatdan o'tish CTA (tadbirlar moduli orqali).

### 4.6. Murojaat `/murojaat` — TZ §10, §24.3
- Forma to'ldiriladi: toifa (7 tur), mavzu, matn, fayl biriktirish, Telegram username, **maxfiylik roziligi**, Turnstile captcha.
- Yuborilgach — **kuzatish kodi** (masalan `PY-2026-04137`): `/murojaat/holat/[kod]` sahifasida 7 holatli timeline (TZ §10.2).
- Rate-limit: IP boshiga soatiga cheklov.

### 4.7. Qolgan ommaviy sahifalar
- **Rahbariyat**: qabul vaqti aniq ko'rinadi, biografiya, telefon/email/Telegram; bo'limlar bo'yicha guruhlash.
- **Hujjatlar**: tur/sana/format filtri, ko'rish + yuklab olish soni.
- **Galereya**: albomlar (tadbirga bog'langan), lightbox, video — `lite-youtube` (tez yuklanadi).
- **Hududlar**: tuman kartalari → har tumanning kontakt va yetakchisi.
- **Imkoniyatlar** [YANGI]: grant/tanlov/vakansiya/volontyorlik e'lonlari, deadline countdown, «muddati tugayapti» saralash.
- **Reyting** [YANGI]: Top-10 uch kesimda (OTM, harbiy qism, muassasa), oylik/choraklik/yillik, metodologiya sahifasi (TZ §12.2 — batafsil ballar faqat dashboardda).
- **Qidiruv**: bitta qatordan yangilik, tadbir, tashkilot, hujjat, media bo'ylab (TZ §5.3), lotin↔kirill transliteratsiya bilan.

---

## 5. Kabinetlar va boshqaruv

### 5.1. Rollar (TZ §8.1 — yakuniy matritsa)
| Rol | Vakolat |
|---|---|
| SUPER_ADMIN | Hamma narsa + foydalanuvchi/rol boshqaruvi + sozlamalar |
| KENGASH_ADMIN | Barcha kontent, tashkilotlar, murojaatlar, reyting, dashboard |
| AXBOROT_XIZMATI | Yangilik, press-reliz, media, bosh sahifa kontenti |
| RAHBARIYAT | Faqat ko'rish: dashboard, reyting, murojaatlar monitoringi (FR-ADMIN-05) |
| TASHKILOT_ADMIN | Faqat o'z tashkiloti: profil, yangilik, tadbir, media, hisobot (FR-ORG-03) |
| MEDIA_RAHBAR | O'z tashkiloti doirasida foto/video/yangilik qo'shish |
| MODERATOR | Kontentni tasdiqlash / tahrirga qaytarish / rad etish |
| USER | Kabinet, tadbirga yozilish, murojaat kuzatish |

### 5.2. Moderatsiya oqimi (TZ §4, FR-ORG-05)
`QORALAMA → MODERATSIYADA → TASDIQLANDI/RAD ETILDI → NASHRDA → ARXIV`
— har o'tishda audit log + tashkilot adminiga bildirishnoma. Rejalashtirilgan nashr (`publishAt`) va draft-preview havolasi.

### 5.3. Shaxsiy kabinet `/kabinet` (TZ §7)
Ro'yxatdan o'tish: telefon yoki email (+ keyin Telegram login). Bo'limlar: profil, **mening tadbirlarim** (QR-chiptalar), **murojaatlarim** (holat), bildirishnomalar. Sertifikat generatsiyasi — kengaytma (TZ FR-USER-06).

### 5.4. Tashkilot kabineti (TZ §6.3)
Admin paneldagi resurslar tashkilot bilan scope'lanadi: tashkilot admini faqat o'zinikini ko'radi (FR-ADMIN-04). Profil tahriri, tadbir yaratish (moderatsiya orqali), ishtirokchilar ro'yxati + eksport, oylik hisobot yuklash, o'z reyting ballarini ko'rish.

### 5.5. Rahbariyat dashboardi (TZ §13)
KPI kartalar: tashkilotlar (faol/sust), tadbirlar va ishtirokchilar dinamikasi, murojaatlar (yangi/kechikkan — SLA timer), top/sust tashkilotlar, eng o'qilgan yangiliklar. Eksport: Excel + PDF (TZ §13.2). Davr filtri: oy/chorak/yil.

---

## 6. Dizayn tizimi — «mukammal» mezoni

Auditda o'lchangan qarzlar va maqsadlar:

| O'lchov | Hozir | Maqsad |
|---|---|---|
| Qo'lda yozilgan `px` (modul CSS) | 2,116 | spacing tokenlari (4px shkala) |
| Qo'lda yozilgan hex rang | 159 | rang tokenlari (brendbook asosida) |
| Responsive breakpoint xilma-xilligi | 30+ | 3 token: `sm 640 / md 1024 / lg 1280` |
| Inline `style={{}}` | 229 | 0 (modullarga) |
| Hero komponentlari | 7 | 1 ta `PageHero` (variantlar bilan) |
| Stats komponentlari | 4 | 1 ta |
| Count-up implementatsiyasi | 3 | 1 ta |
| Animatsiya kutubxonasi | 4 | 2 ta (CSS/IO + gsap; `motion` olib tashlanadi) |
| Keraksiz `"use client"` | 7 | 0 |
| FontAwesome CDN (hydration bilan urishadi, 151 joy) | bor | lokal SVG sprite |

Qo'shimcha qoidalar:
- **Mobile-first** (TZ §16.2): har komponent avval 360px'da loyihalanadi; CTA tugmalar ≥44px.
- Tipografika shkalasi: `clamp()` bilan suyuq o'lchamlar, sarlavhalarda bitta shrift (Poppins), matnda Inter.
- Har sahifada bitta `<h1>`, izchil `PageHero`, izchil bo'lim oralig'i (section rhythm).
- Animatsiya siyosati: kirish animatsiyalari faqat IO/ScrollReveal, `prefers-reduced-motion` hurmat qilinadi; GSAP faqat 2–3 «wow» joyda (bosh sahifa hero, tarix timeline).
- Rasm siyosati: hamma joyda `next/image` + `sharp`, placeholder blur; `images.unoptimized` o'chiriladi.
- **Maxsus imkoniyatlar versiyasi**: shrift kattalashtirish, yuqori kontrast, rasmsiz rejim — davlat saytlari amaliyotidagi de-fakto standart, a11y auditi (kontrast, alt, klaviatura) bilan birga.
- Barcha placeholder'lar (picsum/unsplash) haqiqiy kontent bilan almashadi — buyurtmachidan materiallar (TZ §23.1).

---

## 7. Yangi g'oyalar (TZ'da yo'q yoki chala — «o'ylanmagan tomonlar»)

**Albatta qilamiz (arzon, ta'siri katta):**
1. **QR check-in** — tadbir ishtirokchisiga QR-chipta; kirishda skaner → real qatnashuv soni → reyting halol ma'lumotga tayanadi (TZ reytingi ro'yxatdan o'tishnigina biladi, kelganini bilmaydi).
2. **Avtogeneratsiya OG-rasmlar** (satori) — har yangilik/tadbir Telegram'da chiroyli karta bilan ulashiladi.
3. **JSON-LD structured data** — tadbirlar Google'da rich-result, yangiliklar NewsArticle.
4. **Murojaat kuzatish kodi** — telefonsiz, kabinet ochmasdan ham holatni ko'rish (davlat idorasi uchun ishonch belgisi).
5. **iCal / «kalendarga qo'shish»** — tadbirni bir bosishda telefon kalendariga.
6. **RSS** — OAV uchun (TZ auditoriyasida OAV bor).
7. **SLA-timer murojaatlarda** — javob muddati dashboardda qizarib ko'rinadi (FR-APPEAL-06 ni kuchaytiradi).

**Qilsak juda yaxshi (o'rtacha mehnat):**
8. **Telegram Mini App** — auditoriya Telegram'da yashaydi: tadbirga yozilish, murojaat holati, bildirishnoma — bot ichida. TZ botni faqat xabarnoma deb ko'rgan; Mini App esa to'liq kabinetni beradi.
9. **PWA + push** — «saytni o'rnatish», tadbir eslatmalari pushda (SMS'dan bepul).
10. **Ochiq statistika sahifasi** — «ochiqlik» tamoyilini (TZ §4) raqam bilan isbotlash: tadbirlar, ishtirokchilar, murojaatlarga javob tezligi — jonli grafiklar + JSON/CSV eksport (open data).
11. **AI press-reliz generatori** — TZ §11.2 formaga asoslangan shablon o'rniga Claude API bilan haqiqiy matn qoralamasi; Axborot xizmati tahrir qilib nashr etadi.
12. **Newsletter** — haftalik email-digest (tadbirlar + imkoniyatlar).

**Keyinroq (kengaytmalar):**
13. **OneID (id.egov.uz)** — davlat SSO orqali kirish; sertifikat va rasmiy arizalarda kuchli identifikatsiya.
14. **Sertifikat generatori** — QR-tasdiqli PDF (FR-USER-06 kengaytmasi).
15. **Yoshlar ovozi** — g'oyalar uchun ochiq ovoz berish moduli (murojaatning «loyiha taklifi» toifasini jamoatchilik bosqichiga olib chiqadi).
16. **Gamifikatsiya** — faol ishtirokchilarga belgi/darajalar, «yil faoli» sahifasi.

---

## 8. Sifat standarti (har faza uchun qabul mezoni)

| Yo'nalish | Mezon |
|---|---|
| Tezlik | Bosh sahifa mobil Lighthouse ≥ 90; LCP < 2.5s (4G) |
| SEO | Har sahifada unikal title/description/og; sitemap; robots; canonical; JSON-LD |
| A11y | Kontrast AA, alt matnlar, klaviatura navigatsiyasi, fokus halqalari |
| Xavfsizlik | zod hamma kirishda; rate-limit + Turnstile ommaviy formalarda; URL-sxema validatsiyasi; fayl yuklashda format/hajm/MIME tekshiruvi (SEC-06); audit log; kunlik backup + tiklash mashqi |
| Test | CI: typecheck + lint + build + Playwright smoke (login, CRUD, murojaat, tadbirga yozilish) |
| Kod | `revalidatePath` nishonli; server komponent birinchi; `"use client"` faqat zarurat bo'lsa |

---

## 9. Bosqichlar

### ✅ Faza 0 — Qon to'xtatish (BAJARILDI, 2026-07-10)
Build tuzatildi; ochiq secret, `admin/admin123`, RBAC teshigi, timing attack yopildi; `.env` tartibi; GitHub Pages o'chirildi. *(Tafsilotlar: git tarixi, commit `b4cddb5`.)*

### ✅ Faza 2 (eski) — Yagona haqiqat manbai (BAJARILDI, 2026-07-10)
Butun kontent bazaga ko'chdi; `lib/queries.ts`; slug URL'lar; 11 resursli admin CRUD + zod + audit log; idempotent seed; `published` bayrog'i. *(Commit `50d7de5`.)*
> Topilgan Next 16.2.9 muammosi: `.bind()` qilingan, qiymat qaytaruvchi server action no-JS formada cheksiz sikl beradi — yechim `lib/admin/actions.ts` da izohlangan.

### 🔜 Faza 1 — Poydevor (production-ga tayyor asos)
| # | Ish | TZ |
|---|---|---|
| 1.1 | PostgreSQL 16 + `docker-compose.yml`; SQLite'dan ma'lumot ko'chirish skripti | §17.1 |
| 1.2 | Sxema TZ §18 + i18n: `*_translations` jadvallar (yoki JSONB per-locale), `organizations`, `events`, `event_registrations`, `media`, `ratings`, `notifications`, `appeals` kengaytmasi (toifa, mavzu, fayl, kod, mas'ul, muddat) | §18, §14 |
| 1.3 | `prisma migrate` tartibi (`db push` o'rniga) | §23 |
| 1.4 | **URL-sxema validatsiyasi** (`type:"url"` maydonlar — hozirgi yagona ma'lum xavfsizlik bo'shlig'i) | §19 |
| 1.5 | Rate-limit + Turnstile: `/api/appeals`, login | SEC-07 |
| 1.6 | Fayl yuklash: `/uploads` volume + sharp + MIME/hajm tekshiruvi; admin media kutubxonasi | SEC-06 |
| 1.7 | `next-intl` texnik tayyorlik: locale routing, til tugmasi, admin'da tarjima holati ko'rsatkichi | §14 |
| 1.8 | `error.tsx`, `global-error.tsx`, `loading.tsx` hamma joyda; brendlangan 404/500/403 | §20 |
| 1.9 | `sitemap.ts`, `robots.ts`, canonical, JSON-LD asoslari | §20.1 |
| 1.10 | `output: 'standalone'` + Dockerfile + Nginx + SSL + GitHub Actions deploy | §17.2 |
| 1.11 | Kunlik backup (pg_dump + uploads) + tiklash yo'riqnomasi | SEC-08 |
| 1.12 | Sentry + Umami | §20 |
| 1.13 | Playwright smoke to'plami + CI | §22.1 |
| **Dizayn (parallel)** | Token migratsiyasi boshlanishi: rang/spacing/breakpoint tokenlari, FontAwesome → SVG sprite, lokal shriftlar | §16 |

### Faza 2 — Tadbirlar moduli (TZ MVP yuragi)
Tadbirlar CRUD + moderatsiya holatlari; `/tadbirlar` ro'yxat + kalendar; tadbir sahifasi; ro'yxatdan o'tish + limit + QR-chipta; Excel/Sheets eksport; iCal; bosh sahifa TZ §5.2 ga moslashadi (shior, 3 CTA, yaqin tadbirlar). **Dizayn:** `PageHero` yagonalashuvi, bosh sahifa qayta quriladi.

### Faza 3 — Boshlang'ich tashkilotlar
`organizations` moduli: profil sahifalari, xarita + filtr, tashkilot admini roli va scope'lash (FR-ORG-03), moderatsiya oqimi to'liq (qoralama→tasdiq→nashr), hisobotlar. **Dizayn:** Stats/CountUp birlashuvi, inline-style tozalash.

### Faza 4 — Kabinetlar va bildirishnomalar
Foydalanuvchi ro'yxatdan o'tishi (telefon/email), `/kabinet`, murojaat TZ §24.3 formaga to'liq moslashadi + kuzatish kodi; Telegram bot (xabarnoma + holat so'rovi); email provider; maxfiylik siyosati sahifasi. **Dizayn:** forma UX standarti, xatolik holatlari.

### Faza 5 — Reyting va dashboard
10 mezonli reyting mexanizmi (TZ §12.1, QR check-in ma'lumotidan foydalanadi), `/reyting` ochiq sahifa + metodologiya; rahbariyat dashboardi + Excel/PDF eksport; RAHBARIYAT read-only roli. **Dizayn:** grafik/chart tizimi (bitta kutubxona).

### Faza 6 — Ko'p tillilik kontenti va integratsiyalar
Kirill (transliterator yordamida qoralama!), rus, ingliz kontenti; Instagram/YouTube bloklari; qidiruv sahifasi; RSS; press-reliz generatori (AI qoralama); newsletter. **Dizayn:** a11y versiyasi, Lighthouse ≥90 auditi.

### Faza 7 — Topshirish (TZ §23)
OpenAPI hujjatlari, admin qo'llanma (skrinshotli), kontent yo'riqnomasi, backup/tiklash hujjati, test checklist, qabul dalolatnomasi materiallari.

**Kengaytmalar (rejadan tashqari, kelishuv bo'yicha):** Telegram Mini App, PWA+push, OneID, sertifikat generatori, ochiq statistika, gamifikatsiya (§7 ro'yxati).

---

## 10. Ochiq savollar (buyurtmachi/egadan kutilmoqda)

| # | Savol | Bloklaydigan faza |
|---|---|---|
| 1 | VPS tanlash (provayder, o'lcham) va `poytaxtyoshlari.uz` domenini band qilish | Faza 1 deploy |
| 2 | Brendbook va logotip fayllari (TZ §23.1 «mavjud» deydi — qo'lga olish kerak) | Dizayn treki |
| 3 | Haqiqiy kontent: rahbariyat foto/bio, tashkilotlar Excel ro'yxati, hujjatlar, loyihalar | Faza 2–3 seed |
| 4 | Telegram bot tokeni va rasmiy kanal | Faza 4 |
| 5 | Google Maps API kaliti (yoki bepul muqobil — Leaflet + OSM bilan boshlaymizmi?) | Faza 3 |
| 6 | SMS provider shartnomasi (yoki push/Telegram bilan cheklanamizmi?) | Faza 4 |
