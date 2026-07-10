# TZ va Hozirgi Holat Taqqoslash + Ish Rejasi

> **Batafsil yo'l xaritasi va arxitektura qarorlari: [`PLAN.md`](PLAN.md).**
> Bu fayl faqat TZ bilan solishtirma jadvali.

## Umumiy ko'rinish

TZ (Texnik Topshiriq) 4 ta bosqichda katta platformani nazarda tutadi. Hozirgi holatda **1-bosqich (MVP)** ning ochiq portali va boshqaruv qatlami ishlaydi: SQLite baza yagona haqiqat manbai, NextAuth autentifikatsiya, rol tekshiruvi, 11 ta resurs uchun to'liq CRUD va audit log.

Asosiy qolgan ishlar: PostgreSQL ga ko'chish, fayl yuklash, **tadbirlar** va **boshlang'ich tashkilotlar** modullari, shaxsiy kabinet, ko'p tillilik va integratsiyalar.

---

## ✅ BAJARILGAN ISHLAR (Frontend UI)

### Sahifalar

| # | TZ dagi bo'lim | Sahifa | Holat |
|---|---|---|---|
| 1 | Bosh sahifa | `/` | ✅ Hero, About, Projects, Stats, News mavjud |
| 2 | Biz haqimizda | `/tashkilot` | ✅ HeroSlider, Structure, Values, Timeline, Directions, ChairmanMessage |
| 3 | Missiya | `/tashkilot/missiya` | ✅ Hero, Values, Principles, Directions, CTA |
| 4 | Tarix | `/tashkilot/tarix` | ✅ Hero, Intro, Stats |
| 5 | Rahbariyat | `/rahbariyat` | ✅ Hero, Intro, Heroes, Apparat |
| 6 | Faoliyat / Yo'nalishlar | `/faoliyat` | ✅ Hero, Bento directions, Grant timeline, Projects, CTA |
| 7 | Faoliyat tafsiloti | `/faoliyat/[slug]` | ✅ Dynamic direction detail pages |
| 8 | Loyihalar | `/loyihalar` | ✅ Hero, Grid |
| 9 | Yangiliklar | `/yangiliklar` | ✅ List, filter, detail page (`/yangiliklar/[slug]`) |
| 10 | Hududlar / Tumanlar | `/hududlar` | ✅ Map section, districts |
| 11 | Yetakchilar | `/yetakchilar` | ✅ Yosh yetakchilar ro'yxati + tafsilot |
| 12 | Hujjatlar | `/hujjatlar` | ✅ Hero, Categories, List, Guarantees |
| 13 | Galeriya | `/galereya` | ✅ Photo gallery |
| 14 | Murojaat | `/murojaat` | ✅ Appeals form, Contact info |
| 15 | Axborot markazi | `/axborot-markazi` | ✅ Page exists |

### Umumiy komponentlar

| Komponent | Holat |
|---|---|
| Navbar (mega menu) | ✅ |
| Footer | ✅ |
| ScrollReveal animatsiyalar | ✅ |
| MiniStats (counter) | ⚠️ Mavjud, lekin hech qayerda ishlatilmaydi |
| NavigationCards | ✅ |
| PageHeader | ✅ |
| FilterTabs | ✅ |
| 404 sahifa | ✅ |
| SEO metadata (har sahifada) | ✅ |

---

## ❌ BAJARILMAGAN ISHLAR

### 1-BOSQICH (MVP) — Qolgan ishlar

> [!IMPORTANT]
> Bu ishlar loyihani "ishga tushirish" uchun minimum zarur narsalar

#### 🟢 Backend & Ma'lumotlar bazasi
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 1 | PostgreSQL baza yaratish va ulash | 17, 18 | 🟡 SQLite ishlaydi; PostgreSQL ga ko'chirish — Faza 1 |
| 2 | Prisma ORM + migratsiyalar | 17 | 🟡 Prisma 7 bor; migratsiya emas, `db push` ishlatiladi |
| 3 | REST/GraphQL API endpointlar | 17.3 | 🟡 Faqat `POST /api/appeals` va NextAuth |
| 4 | Ma'lumotlar modeli (users, organizations, news, events, appeals, documents, media, projects, ratings, audit_logs, notifications) | 18 | 🟡 13 jadvaldan 6 tasi. Yo'q: `roles`, `organizations`, `events`, `event_registrations`, `media`, `ratings`, `notifications` |
| 4b | Kontent bazadan o'qilishi | 18 | ✅ **Barcha sahifalar bazadan o'qiydi.** `lib/data.ts` da faqat navigatsiya/footer qoldi |

#### 🟢 Admin panel
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 5 | Admin panel UI | 8 | ✅ Sidebar, dashboard, 11 ta kontent bo'limi, murojaatlar, audit log |
| 6 | Kontent CRUD (yaratish, tahrirlash, tasdiqlash, o'chirish) | 8.2 | 🟡 11 ta resurs uchun to'liq CRUD ✅. Tasdiqlash oqimi yo'q — faqat `published` bayrog'i |
| 7 | Role-based access control (Super admin, Kengash admin, Axborot xizmati, Moderator) | 8.1 | 🟡 `ADMIN`/`MODERATOR` ikki qavatda majburlanadi (`proxy.ts` + `requireRole()`). TZ dagi 7 ta rol emas |
| 8 | Audit logging | 8.2, 19 | ✅ Har bir yaratish/tahrirlash/o'chirish yoziladi, `/admin/audit` da ko'rinadi |

#### 🟡 Autentifikatsiya
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 9 | Foydalanuvchi ro'yxatdan o'tish (telefon, email) | 7.1 | ❌ Yo'q — faqat admin login |
| 10 | Telegram orqali login | 7.1 | ❌ Yo'q |
| 11 | JWT/session autentifikatsiya | 17.1 | ✅ NextAuth + JWT, bcrypt (cost 12) |
| 12 | Shaxsiy kabinet | 7.2 | ❌ Yo'q |

#### 🔴 Tadbirlar tizimi
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 13 | Tadbirlar sahifasi va kalendar ko'rinish | 9, 5.1 | ❌ Alohida `/tadbirlar` sahifa yo'q |
| 14 | Tadbirga onlayn ro'yxatdan o'tish | 9.2, 9.3 | ❌ Yo'q |
| 15 | Google Sheet eksport | 9.3 | ❌ Yo'q |
| 16 | Tadbir natijalari va media bog'lash | 9.3 | ❌ Yo'q |

#### 🔴 Boshlang'ich tashkilotlar moduli
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 17 | OTM, harbiy qism, muassasa profil sahifalari | 6.1, 6.2 | ❌ Yo'q |
| 18 | Tashkilotlar xaritada ko'rinish va filtr | 6.3 | ❌ Hududlar sahifasida tumanlar bor, lekin tashkilotlar yo'q |
| 19 | Tashkilot kabineti (admin panel) | 6.3 | ❌ Yo'q |

#### 🟡 Murojaat tizimi — Qisman
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 20 | Murojaat formasi UI | 10 | ✅ Ishlaydi — bazaga yoziladi |
| 21 | Murojaat toifalarini tanlash (savol, taklif, shikoyat, loyiha, hamkorlik, yordam) | 10.1 | 🟡 Bazaviy — faqat 5 ta toifa bor |
| 22 | Fayl biriktirish | 10.2 | ❌ Yo'q |
| 23 | Murojaat holatini kuzatish | 10.2 | ❌ Foydalanuvchi tomonida yo'q (kabinet kerak) |
| 24 | Admin ko'rish, status o'zgartirish | 10.3 | ✅ Ko'rish, holat va javob yozish ishlaydi |

#### 🔴 Ko'p tillilik
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 25 | 4 til (o'zbek lotin, kirill, rus, ingliz) | 14 | ❌ Faqat o'zbek lotin |
| 26 | Til almashtirish tugmasi | 14 | ❌ Yo'q |
| 27 | Kontent tilga qarab ko'rinishi | 14 | ❌ Yo'q |

#### 🔴 Integratsiyalar
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 28 | Telegram bot (bildirishnomalar, murojaat) | 15 | ❌ Yo'q |
| 29 | Google Maps (tashkilotlar va tadbirlar) | 15 | ❌ Yo'q (statik tumanlar xaritasi bor) |
| 30 | Google Sheets (tadbir ishtirokchilari) | 15 | ❌ Yo'q |
| 31 | Instagram/YouTube/Telegram postlar | 15 | ❌ Yo'q |
| 32 | Email provider | 15 | ❌ Yo'q |
| 33 | Analytics (Tashriflar tahlili) | 15 | ❌ Yo'q |

#### 🟡 Xavfsizlik
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 34 | SSL sertifikat | 19 | ❌ Hali deploy qilinmagan |
| 35 | Kuchli parol siyosati | 19 | 🟡 Seed'da min. 12 belgi majburiy; parol almashtirish oqimi yo'q |
| 36 | RBAC | 19 | 🟡 `ADMIN`/`MODERATOR` ishlaydi va tasdiqlangan. TZ dagi 7 rol yo'q |
| 37 | Captcha / rate limit | 19 | ❌ Yo'q — `/api/appeals` va login ochiq |
| 38 | Backup tizimi | 19 | ❌ Yo'q |
| 39 | Parollar hash holatda | 19 SEC-04 | ✅ bcrypt, cost 12 |
| 40 | Maxfiy kalitlar serverda | 19 SEC-09 | ✅ `.env` + `lib/env.ts`, git'da fallback yo'q |
| 41 | Shaxsiy ma'lumotlar ommaga chiqmasligi | 19 SEC-10 | ✅ Murojaatlar faqat rol tekshiruvidan o'tgan panelda |

---

### 2-BOSQICH — Kabinetlar va ro'yxatdan o'tish
| # | Talab | Holat |
|---|---|---|
| 39 | Shaxsiy kabinet (profil, tadbirlar tarixi, murojaatlar) | ❌ |
| 40 | Tadbirga onlayn ro'yxatdan o'tish tizimi | ❌ |
| 41 | Google Sheet integratsiya | ❌ |
| 42 | Tashkilot admin paneli (OTM/harbiy/muassasa admini) | ❌ |

### 3-BOSQICH — Dashboard va reyting
| # | Talab | Holat |
|---|---|---|
| 43 | Rahbariyat dashboardi | ❌ |
| 44 | Tashkilotlar reyting tizimi (10 ta mezon) | ❌ |
| 45 | Murojaatlar monitoringi | ❌ |
| 46 | Hisobot eksporti (Excel, PDF) | ❌ |

### 4-BOSQICH — Avtomatlashtirish
| # | Talab | Holat |
|---|---|---|
| 47 | Press-reliz generatori | ❌ |
| 48 | Telegram bot to'liq | ❌ |
| 49 | SMS xabarlar | ❌ |
| 50 | Ijtimoiy tarmoq avtomatik integratsiyasi | ❌ |

---

## 📊 UMUMIY XULOSA

| Ko'rsatkich | Qiymat |
|---|---|
| **TZ dagi jami sahifalar** | ~15 ta asosiy sahifa |
| **Qurigan sahifalarimiz** | 15 ta (barcha frontend UI) |
| **TZ dagi modullar** | 5 ta katta modul |
| **Hozirgi holat** | Ochiq portal UI + ishlaydigan backend (baza yagona manba) |
| **Frontend tayyor** | ~85% (UI statik, interaktivlik kam) |
| **Backend tayyor** | ~45% (auth + RBAC + CRUD + audit ✅; PostgreSQL, fayl yuklash, tadbirlar yo'q) |
| **Admin panel tayyor** | ~60% (11 resurs CRUD, audit log; moderatsiya oqimi va TZ dagi 7 rol yo'q) |
| **Integratsiyalar tayyor** | 0% |
| **Ko'p tillilik tayyor** | 0% |
| **Yetishmayotgan katta modullar** | Tadbirlar, Boshlang'ich tashkilotlar, Shaxsiy kabinet, Reyting, Dashboard |

---

## 🎯 KEYINGI QADAM NIMA BO'LISHI KERAK?

> [!IMPORTANT]
> Quyidagi ishlarni bosqichma-bosqich bajarish tavsiya etiladi

### Birinchi navbat: Frontend yaxshilashlar (hozir qilsa bo'ladigan ishlar)
1. **Bosh sahifani TZ ga moslash** — "Yoshlar – Kelajak Bunyodkori!" shiori, CTA tugmalar (Tadbirga yozilish, Murojaat yuborish, Boshlang'ich tashkilotlar), yaqin tadbirlar bloki
2. **Tadbirlar sahifasi** — `/tadbirlar` alohida sahifa yaratish (kalendar ko'rinish, filtr)
3. **Murojaat formasini to'ldirish** — fayl biriktirish UI, barcha 7 ta toifa
4. **Responsive optimizatsiya** — 320px-1920px barcha ekranlarni tekshirish
5. **Error sahifalar** — 500, ruxsat yo'q sahifalar
6. **sitemap.xml, robots.txt** — SEO fayllar

### Ikkinchi navbat: Backend tayyorlash
7. PostgreSQL + Prisma setup
8. API endpointlar (News, Events, Appeals, Documents, Projects, Organizations)
9. Auth tizimi (JWT + RBAC)
10. Admin panel UI va CRUD

> [!WARNING]
> TZ da belgilangan barcha funksiyalar frontendda "ko'rsatish" emas, balki **ishlaydigan tizim** sifatida talab qilingan. Ya'ni ma'lumotlar bazasidan olinishi, admin tomonidan boshqarilishi va foydalanuvchi tomonidan kiritilishi kerak.

## Hal qilingan savollar

| Savol | Qaror | Sabab |
|---|---|---|
| Backend: Next.js API routes yoki NestJS? | **Next.js API routes + server actions** | TZ §17.1 ikkalasiga ham ruxsat beradi; alohida servis hozircha ortiqcha murakkablik |
| Ma'lumotlar bazasi? | **PostgreSQL + Prisma** (Faza 1) | TZ §17.1. Hozirgi SQLite serverda ishonchsiz |
| Hosting? | **VPS + Docker** (`output: 'standalone'`) | TZ §17.1. GitHub Pages server kodini ishlata olmaydi — workflow o'chirildi |
| Frontend yaxshilash yoki backend? | **Avval backend poydevori** (Faza 0–2) | Build siniq va admin panel parolsiz ochiq edi — bu birinchi navbat |
| `/tadbirlar` alohida sahifa kerakmi? | **Ha** | TZ §5.1 asosiy menyuda alohida bo'lim sifatida talab qiladi |

## Ochiq savollar

1. **Domen** — `poytaxtyoshlari.uz` band qilinganmi? VPS provayderi tanlanganmi?
2. **Fayl saqlash** — S3-mos xizmat (MinIO) yoki server diski?
3. **Telegram bot** — token va kanal kim tomonidan beriladi?
4. **Kontent** — TZ §23.1 dagi materiallar (rahbariyat fotolari, tashkilotlar Excel ro'yxati, hujjatlar) tayyormi? Hozir hammasi placeholder rasm.
5. **Ko'p tillilik** — 4 til birdaniga kerakmi, yoki lotin bilan chiqib keyin qo'shamizmi? (TZ §21.1 faqat lotinni majburiy qiladi.)
