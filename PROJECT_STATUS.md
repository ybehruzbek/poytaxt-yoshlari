# TZ va Hozirgi Holat Taqqoslash + Ish Rejasi

## Umumiy ko'rinish

TZ (Texnik Topshiriq) 4 ta bosqichda katta platformani nazarda tutadi. Hozirgi holatda biz **1-bosqich (MVP)** ning **faqat frontend/UI qismini** qurganmiz. Backend, admin panel, autentifikatsiya va integratsiyalar hali yo'q.

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
| 9 | Yangiliklar | `/yangiliklar` | ✅ List, filter, detail page (`/yangiliklar/[id]`) |
| 10 | Hududlar / Tumanlar | `/hududlar` | ✅ Map section, districts |
| 11 | Yetakchilar | `/yetakchilar` | ✅ Leaders list |
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
| MiniStats (counter) | ✅ |
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

#### 🔴 Backend & Ma'lumotlar bazasi
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 1 | PostgreSQL baza yaratish va ulash | 17, 18 | ❌ Yo'q — hozir barcha ma'lumotlar `lib/data.ts` da statik |
| 2 | Prisma ORM + migratsiyalar | 17 | ❌ Yo'q |
| 3 | REST/GraphQL API endpointlar | 17.3 | ❌ Yo'q |
| 4 | Ma'lumotlar modeli (users, organizations, news, events, appeals, documents, media, projects, ratings, audit_logs, notifications) | 18 | ❌ Yo'q |

#### 🔴 Admin panel
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 5 | Admin panel UI | 8 | ❌ Yo'q |
| 6 | Kontent CRUD (yaratish, tahrirlash, tasdiqlash, o'chirish) | 8.2 | ❌ Yo'q |
| 7 | Role-based access control (Super admin, Kengash admin, Axborot xizmati, Moderator) | 8.1 | ❌ Yo'q |
| 8 | Audit logging | 8.2, 19 | ❌ Yo'q |

#### 🔴 Autentifikatsiya
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 9 | Foydalanuvchi ro'yxatdan o'tish (telefon, email) | 7.1 | ❌ Yo'q |
| 10 | Telegram orqali login | 7.1 | ❌ Yo'q |
| 11 | JWT/session autentifikatsiya | 17.1 | ❌ Yo'q |
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
| 20 | Murojaat formasi UI | 10 | ✅ UI bor (statik) |
| 21 | Murojaat toifalarini tanlash (savol, taklif, shikoyat, loyiha, hamkorlik, yordam) | 10.1 | 🟡 Bazaviy — faqat 5 ta toifa bor |
| 22 | Fayl biriktirish | 10.2 | ❌ Yo'q |
| 23 | Murojaat holatini kuzatish | 10.2 | ❌ Backend yo'q |
| 24 | Admin ko'rish, status o'zgartirish | 10.3 | ❌ Backend yo'q |

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

#### 🔴 Xavfsizlik
| # | Talab | TZ bo'lim | Holat |
|---|---|---|---|
| 34 | SSL sertifikat | 19 | ❌ Hali deploy qilinmagan |
| 35 | Kuchli parol siyosati | 19 | ❌ Auth yo'q |
| 36 | RBAC | 19 | ❌ Yo'q |
| 37 | Captcha / rate limit | 19 | ❌ Yo'q |
| 38 | Backup tizimi | 19 | ❌ Yo'q |

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
| **Hozirgi holat** | Faqat 1 modul (Ochiq portal) ning UI qismi |
| **Frontend tayyor** | ~85% (UI statik, interaktivlik kam) |
| **Backend tayyor** | 0% |
| **Admin panel tayyor** | 0% |
| **Integratsiyalar tayyor** | 0% |
| **Ko'p tillilik tayyor** | 0% |

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

## Open Questions

1. **Backend texnologiya tanlovi**: Next.js API routes yetarlimi yoki alohida NestJS backend kerakmi?
2. **Ma'lumotlar bazasi**: PostgreSQL + Prisma bilan boshlaymizmi?
3. **Hosting**: Vercel, VPS yoki Docker? Domen tayyor bo'lganmi?
4. **Birinchi navbat frontend UI yaxshilashlar qilamizmi yoki to'g'ridan-to'g'ri backendga o'tamizmi?**
5. **Tadbirlar sahifasi** — alohida `/tadbirlar` sahifa kerakmi (TZ da bor), yoki `/faoliyat` ichida qolsinmi?
