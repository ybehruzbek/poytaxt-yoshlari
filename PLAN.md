# Poytaxt Yoshlari — Yo'l xaritasi

> Manba: `poytaxt_yoshlari_TZ.md`. Holat jadvali: `PROJECT_STATUS.md`.
> Oxirgi yangilanish: 2026-07-10.

---

## Qabul qilingan arxitektura qarorlari

| # | Qaror | Sabab | Qaytariladimi |
|---|---|---|---|
| A1 | **GitHub Pages'dan voz kechiladi.** Server render qiladigan Next.js (`output: 'standalone'`) + Docker | Pages statik-only; API route, NextAuth, Prisma, `proxy.ts` u yerda ishlamaydi. TZ §17.1 VPS/Docker tavsiya qiladi | Ha — hosting hali olinmagan (TZ §23.1) |
| A2 | **PostgreSQL** (dev + prod), Docker Compose orqali | TZ §17.1. SQLite fayl-baza serverda ishonchsiz, yozuvda lock beradi | Qiyin — Faza 1 da bajarilsa arzon |
| A3 | Baza — **yagona haqiqat manbai**. `lib/data.ts` seed'ga aylanadi | Hozir ikkita parallel manba bor, ular bir-biriga zid | Yo'q |
| A4 | Auth: NextAuth (JWT) + rol asosidagi RBAC, ikki qavatli himoya (`proxy.ts` + `requireRole()`) | TZ §8.1, §19 SEC-03 | Yo'q |
| A5 | Styling: CSS Modules + `globals.css` tokenlari. Tailwind qo'shilmaydi | Loyihada 57 ta modul bor, ko'chirish qimmat va foydasi kam | — |

---

## ✅ Faza 0 — Qon to'xtatish (BAJARILDI)

Build butunlay siniq edi, admin panel esa parolsiz ochiq edi.

| # | Ish | Fayl | Holat |
|---|---|---|---|
| 0.1 | `prisma generate` build'ga ulandi, `postinstall` qo'shildi | `package.json` | ✅ |
| 0.2 | Baza yaratildi va seed qilindi (`dev.db` umuman yo'q edi) | `prisma/` | ✅ |
| 0.3 | Git'dagi ochiq `NEXTAUTH_SECRET` fallback'i olib tashlandi | `lib/env.ts`, `lib/auth.ts`, `proxy.ts` | ✅ |
| 0.4 | `.env` + `.env.example`, kuchli tasodifiy secret | `.env*` | ✅ |
| 0.5 | `admin/admin123` seed'i olib tashlandi → `.env` dan o'qiydi, min. 12 belgi, bcrypt cost 12 | `prisma/seed-admin.ts` | ✅ |
| 0.6 | RBAC: `proxy.ts` endi rolni tekshiradi (`!!token` emas) | `proxy.ts` | ✅ |
| 0.7 | Admin layout serverda `requireRole()` bilan o'zini himoya qiladi | `app/admin/(dashboard)/layout.tsx` | ✅ |
| 0.8 | `/admin/login` himoya matcher'idan chiqarildi (redirect halqasi) | `proxy.ts` | ✅ |
| 0.9 | Login'da timing attack yopildi (dummy hash solishtirish) | `lib/auth.ts` | ✅ |
| 0.10 | `as any` o'rniga NextAuth tip augmentatsiyasi | `types/next-auth.d.ts` | ✅ |
| 0.11 | GitHub Pages workflow o'chirildi (izoh bilan, o'chirib tashlanmadi) | `.github/workflows/deploy.yml` | ✅ |
| 0.12 | O'lik `basePath`/`assetPrefix` olib tashlandi | `next.config.ts` | ✅ |
| 0.13 | `revalidate = 60` — DB'dan o'qiydigan sahifalar qotib qolmasin | `app/yangiliklar`, `app/loyihalar` | ✅ |
| 0.14 | Aniqlanmagan `--primary-dark` tokeni (19 joyda ishlatilardi) tuzatildi | `app/globals.css` | ✅ |
| 0.15 | `brand-identity` skill'i shablondan haqiqiy qiymatlarga o'tkazildi | `.agent(s)/skills/brand-identity/` | ✅ |

**Tasdiqlangan (jonli server bilan):** noto'g'ri parol → 401 · to'g'ri parol → sessiya · `GUEST` roli haqiqiy sessiya bilan ham `/admin` ga kira olmaydi → 307.

---

## 🔜 Faza 1 — Poydevor

**Maqsad:** production'ga chiqarish mumkin bo'lgan, xavfsiz asos.

| # | Ish | TZ |
|---|---|---|
| 1.1 | PostgreSQL + `docker-compose.yml` (dev va prod bir xil baza) | §17.1 |
| 1.2 | Prisma sxemasini TZ §18 bo'yicha to'liq qayta yozish: `roles`, `organizations`, `events`, `event_registrations`, `media`, `ratings`, `audit_logs`, `notifications` qo'shiladi | §18 |
| 1.3 | Migratsiyalar (`prisma migrate`), `db push` o'rniga | §23 |
| 1.4 | Zod bilan server-side validatsiya, barcha API/action uchun | §19 |
| 1.5 | Rate limit + captcha (`/api/appeals`, login) | §19 SEC-07 |
| 1.6 | Audit log: har bir admin amali yoziladi | §19 SEC-05 |
| 1.7 | Kuchli parol siyosati, parol almashtirish oqimi | §19 SEC-02 |
| 1.8 | `error.tsx`, `global-error.tsx`, `loading.tsx`, 403 sahifasi | §20 |
| 1.9 | `app/sitemap.ts`, `app/robots.ts`, canonical URL | §20.1 |
| 1.10 | `output: 'standalone'` + `Dockerfile` + CI pipeline | §17.2 |
| 1.11 | Backup skripti va tiklash yo'riqnomasi | §19 SEC-08 |

---

## ✅ Faza 2 — Bitta haqiqat manbai (BAJARILDI)

**Muammo edi:** `lib/data.ts` (614 qator) ni ~30 fayl o'qir, bazani atigi 5 fayl. `/yangiliklar` ro'yxati bazadan, `/yangiliklar/[id]` esa statik fayldan olardi — admin yangilik qo'shsa, ustiga bosilganda **404**.

| # | Ish | Holat |
|---|---|---|
| 2.1 | Sxema kengaytirildi: `slug`, `content`, `published`, `bio`, `receptionDays`, ijtimoiy havolalar, `Stat.group`, `AuditLog` | ✅ |
| 2.2 | `lib/data.ts` dan **butun kontent** olib tashlandi — endi faqat navigatsiya/footer/aloqa turadi | ✅ |
| 2.3 | `lib/queries.ts` — `cache()` bilan o'ralgan so'rovlar qatlami | ✅ |
| 2.4 | 15 ta komponent props qabul qiladigan bo'ldi; 17 sahifa bazadan o'qiydi | ✅ |
| 2.5 | Seed **idempotent** — bo'sh bo'lmagan jadvalga tegmaydi, admin kontentini o'chirmaydi | ✅ |
| 2.6 | URL'lar `[id]` → `[slug]` (TZ §20.1). O'zbekcha slugify (`Ta'lim` → `talim`) | ✅ |
| 2.7 | Admin panelda **to'liq CRUD**: 11 ta resurs, konfiguratsiya asosida | ✅ |
| 2.8 | Server-side validatsiya (zod), majburiy maydonlar, unique-slug xatolari | ✅ |
| 2.9 | **Audit log** (TZ §19 SEC-05) — har bir yaratish/tahrirlash/o'chirish yoziladi | ✅ |
| 2.10 | Murojaat holati va javobini tahrirlash | ✅ |
| 2.11 | `published` bayrog'i — nashrdan olingan kontent ommaga ko'rinmaydi | ✅ |
| 2.12 | Mutatsiyadan keyin `revalidatePath("/", "layout")` — sayt darhol yangilanadi | ✅ |

**Yo'l-yo'lakay tuzatilgan bug:** `/yetakchilar` sahifasi `leaders` (rahbariyat) ro'yxatini chizar, havolalari esa `/yetakchilar/[id]` (yosh yetakchi) ga ketardi — ya'ni foydalanuvchi butunlay boshqa odamning sahifasiga tushardi. Endi yosh yetakchilarni ko'rsatadi.

**Topilgan Next.js muammosi:** Next 16.2.9 da `.bind()` bilan bog'langan argumentli va qiymat qaytaradigan server action JavaScriptsiz forma yuborilganda serverni cheksiz siklga tushiradi (CPU 85%, javob yo'q). Yechim: resurs kaliti va id yashirin forma maydonlari orqali uzatiladi. `lib/admin/actions.ts` da izohlangan.

**Qolgan ishlar (Faza 3 ga ko'chdi):**

| # | Ish |
|---|---|
| 2.13 | Moderatsiya oqimi: qoralama → tasdiqlash → nashr (TZ §8.2, FR-ORG-05). Hozir faqat `published` bayrog'i bor, tasdiqlovchi rol yo'q |
| 2.14 | Fayl yuklash (S3-mos yoki server storage), format/hajm/virus tekshiruvi (SEC-06). Hozir rasm/fayl faqat URL sifatida kiritiladi |
| 2.15 | `Direction` ning `stats`/`goals` bog'liq jadvallarini admin panelda tahrirlash |
| 2.16 | O'lik komponentlar: `MiniStats`, `MapSection`, `Documents`, `Leadership`, `Directions` — hech qayerda render qilinmaydi |

---

## Faza 3 — TZ MVP bo'shliqlari

TZ §21.1 "birinchi versiyada majburiy" ro'yxatidan yetishmayotganlar.

| # | Modul | TZ |
|---|---|---|
| 3.1 | **Tadbirlar**: `/tadbirlar` sahifasi, kalendar, filtr, tadbir sahifasi | §9.1, §5.1 |
| 3.2 | Tadbirga onlayn ro'yxatdan o'tish + Google Sheet eksport | §9.2, §9.3 |
| 3.3 | **Boshlang'ich tashkilotlar**: OTM / harbiy qism / muassasa / hamkor profillari | §6 |
| 3.4 | Tashkilotlar xaritada + tur bo'yicha filtr, Google Maps | §6.3 FR-ORG-06 |
| 3.5 | Tashkilot kabineti (o'z profili, yangiligi, tadbiri, mediasi) | §6.3 FR-ORG-02..04 |
| 3.6 | **Shaxsiy kabinet** + ro'yxatdan o'tish (telefon, email, Telegram) | §7 |
| 3.7 | **Murojaat** to'ldiriladi: mavzu, fayl, Telegram username, maxfiylik roziligi, holat kuzatish | §10, §24.3 |
| 3.8 | Bosh sahifa TZ ga moslashadi: "Yoshlar – Kelajak Bunyodkori!" shiori, 3 ta CTA, yaqin tadbirlar bloki | §5.2 |
| 3.9 | Qidiruv va filtrlash (yangilik, tadbir, tashkilot, hujjat, media) | §5.3 |
| 3.10 | Maxfiylik siyosati sahifasi | §19.1 |

---

## Faza 4 — Dizayn tizimini konsolidatsiya

Auditda o'lchangan qarzlar:

| O'lchov | Hozir | Maqsad |
|---|---|---|
| Qo'lda yozilgan `px` (modul CSS) | 2,116 | tokenlar |
| Qo'lda yozilgan hex rang | 159 | tokenlar |
| Turli responsive breakpoint | 30+ | 3–4 ta token |
| Inline `style={{}}` | 229 | modulga |
| Hero komponentlari | 7 | 1 ta `PageHero` |
| Stats komponentlari | 4 | 1 ta |
| Count-up implementatsiyasi | 3 | 1 ta |
| Animatsiya kutubxonasi | 4 (CSS-IO, motion, gsap, swiper) | 2 ta |
| Keraksiz `"use client"` | 7 | 0 |

Qo'shimcha: FontAwesome CDN **JS** versiyasi `<i>` ni `<svg>` ga almashtiradi va React hydration bilan urishadi (151 joyda) → lokal SVG sprite'ga o'tish. `<img>` → `next/image` (`tashkilot/tarix/page.tsx:150`). Bo'sh `<a href="#">` havolalarni tuzatish. `galereya` sahifasiga metadata. Ba'zi sahifalarda `<h1>` yo'q.

---

## Faza 5+ — Kengaytmalar

| Faza | Mazmun | TZ |
|---|---|---|
| 5 | Ko'p tillilik: o'zbek lotin, kirill, rus, ingliz | §14 |
| 6 | Integratsiyalar: Telegram bot, Google Maps/Sheets, email, analytics, Instagram/YouTube | §15 |
| 7 | Reyting tizimi (10 mezon) + rahbariyat dashboardi + hisobot eksporti (Excel, PDF) | §12, §13 |
| 8 | Press-reliz generatori, SMS, ijtimoiy tarmoq avtomatizatsiyasi | §11.2, §21 (4-bosqich) |
| 9 | Topshirish: API hujjatlari (OpenAPI), admin qo'llanma, backup yo'riqnomasi, test checklist | §23 |

---

## Ochiq savollar

1. **Hosting** — VPS (Docker) yoki Vercel? TZ VPS+Docker tavsiya qiladi, lekin hosting hali olinmagan. Domen `poytaxtyoshlari.uz` band qilinganmi?
2. **Fayl saqlash** — S3-mos xizmat (masalan, MinIO) yoki server diski?
3. **Telegram bot** — kim token beradi, qaysi kanal/guruhga bog'lanadi?
4. **Kontent** — TZ §23.1 dagi materiallar (rahbariyat fotolari, tashkilotlar Excel ro'yxati, hujjatlar) buyurtmachidan olinganmi? Hozir hammasi placeholder (picsum.photos, unsplash).
5. **Ko'p tillilik** — 4 tilning hammasi 1-bosqichdami yoki lotin bilan chiqib, keyin qo'shamizmi? (TZ §21.1 faqat lotinni majburiy qiladi.)
