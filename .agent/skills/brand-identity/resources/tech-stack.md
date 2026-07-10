# Texnologiya to'plami va implementatsiya qoidalari

> Bu fayl loyihaning **haqiqiy** holatini aks ettiradi. Ilgari bu yerda to'ldirilmagan
> shablon turgan edi — unda "Tailwind CSS majburiy, shadcn/ui, Lucide React, yangi CSS
> fayl yaratmang" deb yozilgan edi. Bu loyihaga **umuman to'g'ri kelmaydi**: bu yerda
> Tailwind yo'q, 57 ta CSS Module fayl bor. O'sha shablonga ergashgan agent butun
> dizayn tizimini buzardi.

## Asosiy stack

| Qism | Nima ishlatiladi |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Til | TypeScript |
| Styling | **CSS Modules** (`*.module.css`) + `app/globals.css` dagi tokenlar |
| Tailwind | ❌ **Ishlatilmaydi.** Qo'shmang. |
| Komponent kutubxonasi | ❌ Yo'q. Komponentlar qo'lda yoziladi. |
| Ikonkalar | FontAwesome 6 (`<i className="fas fa-...">`) |
| Shriftlar | `next/font/google` — Manrope (sarlavha) + Inter (matn) |
| Animatsiya | `ScrollReveal` (IntersectionObserver) — asosiy usul. `motion`, `gsap`, `swiper` ham bor |
| ORM / Baza | Prisma 7 + SQLite (Faza 1 da PostgreSQL ga o'tadi) |
| Auth | NextAuth v4 (credentials + JWT). Rollar: `ADMIN`, `MODERATOR` |

## Implementatsiya qoidalari

### 1. Styling
- Yangi komponent → yangi `ComponentName.module.css`.
- **Rangni hex bilan qo'lda yozmang.** `var(--blue-deep)`, `var(--accent-orange)` va h.k.
- **Bo'shliq va shrift o'lchamini px bilan yozmang.** `var(--sp-4)`, `var(--fs-lg)`.
- Tugmalar uchun global sinflar bor: `.btn-primary`, `.btn-secondary`, `.btn-view-all`. Modul ichida qayta yozmang.
- Seksiya sarlavhalari: `.section-title`, `.section-label`, `.section-desc`.
- Barcha tokenlar `app/globals.css` `:root` da. Yagona manba shu.

### 2. Komponentlar
- Sukut bo'yicha **server komponenti**. `"use client"` faqat hook, event handler yoki brauzer API kerak bo'lganda.
- Rasm uchun `next/image`, ichki havola uchun `next/link`.
- Inline `style={{}}` dan qoching — CSS modulga chiqaring.

### 3. Formalar
- Label input **ustida** turadi.
- Har bir forma **serverda** validatsiyadan o'tadi. Klient tekshiruvi yetarli emas.

### 4. Xavfsizlik
- Maxfiy qiymat fallback bilan yozilmaydi: `process.env.X || "default"` ❌. `lib/env.ts` orqali oling.
- Admin sahifa/action faqat `proxy.ts` ga tayanmaydi — `requireRole()` bilan o'zini ham himoya qiladi.

## Ma'lum texnik qarzlar (Faza 4 da hal qilinadi)

- ~2100 qo'lda yozilgan `px` va 159 hex rang → tokenlarga ko'chiriladi.
- 7 ta o'xshash Hero komponenti → bitta `PageHero`.
- 4 ta Stats komponenti, 3 xil count-up → bittaga.
- 4 xil animatsiya tizimi → bittasi tanlanadi.
- FontAwesome CDN **JS** versiyasi hydration bilan urishishi mumkin → lokal SVG.
- 30+ turli responsive breakpoint → `--bp-*` tokenlari.
