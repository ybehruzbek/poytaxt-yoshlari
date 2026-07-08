---
name: auto
description: "Universal Agent Directive. Barcha so'rovlar uchun asosiy ishga tushirish qoidasi. Foydalanuvchi qanday savol bermasin, doimo avval mana shu skill o'qilishi shart."
---

# 🤖 THE MASTER SKILL (Auto Directive)

**DIQQAT: SIZ USHBU FAYLNI HAR BIR SO'ROVDA O'QISHINGIZ SHART!**
Foydalanuvchi qanday ko'rsatma berishidan qat'i nazar, barcha ishlarni bajarishdan oldin, ushbu jarayondan o'tish majburiy.

---

## 📌 0. LOYIHA HOLATI (Har doim birinchi o'qiladi!)

**MAJBURIY:** Har bir so'rovda, hech qanday ish boshlamasdan oldin, `PROJECT_STATUS.md` faylini `view_file` orqali o'qib chiqing. Bu faylda TZ (Texnik Topshiriq) bilan hozirgi loyiha holatining solishtirmasi, bajarilgan va bajarilmagan ishlar ro'yxati bor. Ish bajarganingizda shu faylni yangilab boring (✅ / ❌ belgilarini o'zgartiring).

```
view_file → e:\poytaxt-yoshlari\PROJECT_STATUS.md
```

---

## 📁 1. JORIY SKILL BAZASI (Loyihadagi barcha skillar)

Barcha skill'lar `.agents/skills/` papkasida saqlanadi. 

### 🔴 MAJBURIY SKILLAR (Jarayoniga qarab har doim o'qilishi shart)
1. `verification-before-completion` — Vazifani tugatish yoki "bo'ldi" deyishdan oldin o'qiladi.
2. `conventional-commits` — `git commit` yozishdan oldin o'qiladi.
3. `systematic-debugging` — Qizil xato (error), bug, yoki "ishlamayapti" degan so'z bo'lsa o'qiladi.

### 🎨 DIZAYN, UI & ANIMATSIYA (Jahon darajasi - Awwwards/Vercel)
4. `design-taste-frontend` — Har qanday frontend, UI, dizayn, vizual qism so'ralganda (Arzon "AI slop" qoliplarni yo'q qilish uchun).
5. `review-animations` — Har qanday animatsiya, motion, GSAP, yoki interaktiv tranzaksiyalar qilinganda.
6. `brand-identity` — Sayt ranglari, logotiplar va brend qoidalari so'ralganda.
7. `frontend-design` — Dizayn bo'yicha umumiy falsafa (design-taste bilan birga o'qilishi tavsiya etiladi).
8. `web-design-guidelines` — UI kodining to'g'riligini, UX va A11Y (Accessibility) ni tekshirish uchun.

### 🏗️ ARXITEKTURA, REJA & KOD SIFATI
9. `writing-plans` — Katta, yangi bo'lim (feature) qo'shishdan oldin reja yozish uchun.
10. `executing-plans` — Yozilgan rejani kodga aylantirish (amalga oshirish) uchun.
11. `subagent-driven-development` — Katta vazifalarni subagentlarga bo'lib berish uchun.
12. `requesting-code-review` — Katta kod o'zgarishini yozgach PR (Pull Request) tayyorlash uchun.
13. `test-driven-development` — Unit test, E2E yozish yoki test orqali bug tuzatish uchun.
14. `technical-specification` — Arxitketura tizimi yoki texnik loyiha hujjatini yozish uchun.
15. `harden` — Tayyor kodni production (jonli muhit) ga chiqarishdan oldin xavfsiz va baquvvat qilish uchun.
16. `error-handling-patterns` — Catch, Result type, Graceful degradation va xatolarni ushlash sxemalari uchun.

### ⚛️ NEXT.JS & TEXNOLOGIYALAR
17. `next-best-practices` — Next.js dagi App Router, SSR, RSC, Route Handler qoidalari uchun.
18. `vercel-react-best-practices` — React componentlar, performance, render optimizatsiya uchun.

### 🔒 XAVFSIZLIK (SECURITY)
19. `web-security-testing` — OWASP, xakerlik hujumlari va zaifliklarni tekshirish uchun.
20. `data-encryption` — Parollarni shifrlash, AES/RSA va ma'lumotlar xavfsizligi uchun.

### ✍️ KONTENT, MARKETING & SEO
21. `copywriting` — Matn, sarlavha, CTA tugmalariga chiroyli so'z yozish uchun.
22. `marketing-psychology` — Inson psixologiyasiga ta'sir qiluvchi, sotuvchi uslublar uchun.
23. `seo-audit` — Sayt Google qidiruvida chiqishini tekshirish uchun.
24. `programmatic-seo` — SEO uchun ommaviy sahifalar yaratish (template scaling) uchun.

### 🛠️ KENGAYTIRISH
25. `find-skills` — Boshqa turdagi (masalan, DevOps, Docker, Python) skillarni npx orqali qidirib o'rnatish uchun.

---

## 🔄 2. MUKAMMAL ISH JARAYONI (The Ultimate Pipeline)

Foydalanuvchining har bir xabarida quyidagi 4 qadamni bajarishingiz SHART. 

### QADAM 1: Analiz va Trigger
- Foydalanuvchi so'rovi nimaga qaratilgan? (Masalan: UI dizayn + Bug fix + Yangi qism)
- Yuqoridagi 25 ta skill ichidan so'rovga tegishli bo'lgan **BARCHA mos skillarni tanlab oling**. (Odatda bitta so'rov 2-3 ta skill talab qiladi).

### QADAM 2: Skillarni ketma-ket O'QISH
- Tanlangan skillarni `view_file` asbobi orqali to'liq o'qib chiqing.
- **QAT'IY QOIDA:** Agar siz frontend/UI vazifa olayotgan bo'lsangiz, `design-taste-frontend` va `review-animations` ni O'QISHINGIZ MAJBURIY.

### QADAM 3: Foydalanuvchiga Hisobot (Xabar berish)
Hech qanday ish boshlamasdan turib, xabaringizning eng tepasiga quyidagi blokni qo'shing:

```
🔧 **Aktivlashgan Skillar (Auto):**
✅ [skill-nomi] — [nima uchun aynan shu skill ishlatilayotgani haqida 1 ta gap]
✅ [skill-nomi] — [sabab]

📋 **Jarayon Rejasi:**
1. [qadam]
2. [qadam]
```

### QADAM 4: Skillarga Bo'ysunish
- O'qilgan skill ko'rsatmalari sizning o'z "standartingizdan" doimo ustun turadi.
- Agar `design-taste-frontend` sizga "Markazga joylashni (centered bias) to'xtat" desa, uni to'xtatishingiz shart.

> **Diqqat Agent:** Bu qoidalarga doimiy rioya etilishi tizim tomonidan kuzatilmoqda. Ushbu jarayonni aylanib o'tish taqiqlanadi!
