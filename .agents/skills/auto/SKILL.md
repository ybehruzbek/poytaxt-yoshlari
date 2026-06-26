---
name: auto
description: "Har bir so'rovda avtomatik skill'larni aniqlash va ishlatish. So'rov yozganda /auto tanlab yuboring — agent o'zi kerakli skill'larni topadi, o'qiydi va xabar beradi."
---

# 🤖 Auto Skill Detector — Yoshlar Dashboard

Foydalanuvchi so'rov yozganda kerakli skill'larni **avtomatik aniqla**, o'qi va ishga tushir.

> **Muhim:** Bu skill har bir `/auto` so'rovda ishga tushadi. Agent bu ko'rsatmalarni qat'iy bajarishi **SHART**.

---

## 📁 Skill joylashuvi

Barcha skill'lar **bitta joyda** — loyiha papkasida:

```
.agents/skills/   ← 25 ta skill
```

Boshqa joyda skill yo'q. Quyidagi yo'llardan foydalaning.

---

## 📦 To'liq Skill'lar Ro'yxati (25 ta)

| # | Skill nomi | Yo'l |
|---|---|---|
| 1 | `auto` | `.agents/skills/auto/SKILL.md` |
| 2 | `brainstorming` | `.agents/skills/brainstorming/SKILL.md` |
| 3 | `brand-identity` | `.agents/skills/brand-identity/SKILL.md` |
| 4 | `conventional-commits` | `.agents/skills/conventional-commits/SKILL.md` |
| 5 | `copywriting` | `.agents/skills/copywriting/SKILL.md` |
| 6 | `data-encryption` | `.agents/skills/data-encryption/SKILL.md` |
| 7 | `error-handling-patterns` | `.agents/skills/error-handling-patterns/SKILL.md` |
| 8 | `executing-plans` | `.agents/skills/executing-plans/SKILL.md` |
| 9 | `find-skills` | `.agents/skills/find-skills/SKILL.md` |
| 10 | `frontend-design` | `.agents/skills/frontend-design/SKILL.md` |
| 11 | `harden` | `.agents/skills/harden/SKILL.md` |
| 12 | `marketing-psychology` | `.agents/skills/marketing-psychology/SKILL.md` |
| 13 | `next-best-practices` | `.agents/skills/next-best-practices/SKILL.md` |
| 14 | `programmatic-seo` | `.agents/skills/programmatic-seo/SKILL.md` |
| 15 | `requesting-code-review` | `.agents/skills/requesting-code-review/SKILL.md` |
| 16 | `seo-audit` | `.agents/skills/seo-audit/SKILL.md` |
| 17 | `subagent-driven-development` | `.agents/skills/subagent-driven-development/SKILL.md` |
| 18 | `systematic-debugging` | `.agents/skills/systematic-debugging/SKILL.md` |
| 19 | `technical-specification` | `.agents/skills/technical-specification/SKILL.md` |
| 20 | `test-driven-development` | `.agents/skills/test-driven-development/SKILL.md` |
| 21 | `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| 22 | `verification-before-completion` | `.agents/skills/verification-before-completion/SKILL.md` |
| 23 | `web-design-guidelines` | `.agents/skills/web-design-guidelines/SKILL.md` |
| 24 | `web-security-testing` | `.agents/skills/web-security-testing/SKILL.md` |
| 25 | `writing-plans` | `.agents/skills/writing-plans/SKILL.md` |

---

## 🔄 Jarayon (5 qadam)

### 1-qadam: Kontekstni tushun

1. Foydalanuvchi so'rovini **to'liq o'qi va tahlil qil**
2. Ochiq fayllar va cursor pozitsiyasini hisobga ol
3. So'rov qaysi kategoriyaga tegishli ekanini aniqla

### 2-qadam: Skill'larni aniqla

So'rovni quyidagi kategoriyalar bo'yicha tekshir. Bir nechta mos kelsa — **barchasini** tanla.

---

#### 🔴 KRITIK — Har doim avtomatik qo'shiladigan skill'lar

Bu skill'lar ma'lum harakatlardan **OLDIN** har doim o'qilishi kerak:

| Trigger | Skill | Yo'l |
|---------|-------|------|
| Kodni tugataman / yakunlayman deyilganda | `verification-before-completion` | `.agents/skills/verification-before-completion/SKILL.md` |
| `git commit` qilishdan oldin | `conventional-commits` | `.agents/skills/conventional-commits/SKILL.md` |

---

#### 🛠️ DEBUGGING & XATOLIK

| Kalit so'zlar | Skill | Yo'l |
|---------------|-------|------|
| bug, xato, tuzat, ishlamayapti, error, crash, noto'g'ri, buzilgan, qizil xato | `systematic-debugging` | `.agents/skills/systematic-debugging/SKILL.md` |
| error handling, try-catch, xatolik boshqarish, graceful degradation | `error-handling-patterns` | `.agents/skills/error-handling-patterns/SKILL.md` |
| barcha sahifani tekshir, hamma page, umumiy test | `systematic-debugging` + `verification-before-completion` | Ikkalasini o'qi |

---

#### 🏗️ ARXITEKTURA & REJALASHTIRISH

| Kalit so'zlar | Skill | Yo'l |
|---------------|-------|------|
| yangi feature, funksiya, qo'sh, yaratish, g'oya, loyiha | `brainstorming` → keyin `writing-plans` | `.agents/skills/brainstorming/SKILL.md` |
| reja, plan, katta vazifa, bosqichma-bosqich, roadmap | `writing-plans` → keyin `executing-plans` | `.agents/skills/writing-plans/SKILL.md` |
| parallel ish, subagent, mustaqil vazifalar, tez bajarish | `subagent-driven-development` | `.agents/skills/subagent-driven-development/SKILL.md` |
| review, tekshir, PR, code review, merge oldin | `requesting-code-review` | `.agents/skills/requesting-code-review/SKILL.md` |
| test, testing, sinov, TDD, unit test, e2e | `test-driven-development` | `.agents/skills/test-driven-development/SKILL.md` |
| TZ, texnik topshiriq, spec, spetsifikatsiya, hujjat, PRD | `technical-specification` | `.agents/skills/technical-specification/SKILL.md` |

---

#### ⚛️ FRONTEND & UI

| Kalit so'zlar | Skill | Yo'l |
|---------------|-------|------|
| next.js, sahifa, route, API route, middleware, layout, SSR, RSC | `next-best-practices` | `.agents/skills/next-best-practices/SKILL.md` |
| react, komponent, component, hook, state, props, context, performance | `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| UI, dizayn, interfeys, frontend, stil, responsive, mobile, chiroyli | `frontend-design` | `.agents/skills/frontend-design/SKILL.md` |
| UI tekshirish, audit, accessibility, UX, a11y, contrast | `web-design-guidelines` | `.agents/skills/web-design-guidelines/SKILL.md` |
| brand, brend, logo, rang, dizayn tizimi, tipografiya, palette | `brand-identity` | `.agents/skills/brand-identity/SKILL.md` |
| harden, production-ready, edge case, overflow, i18n, mustahkamlash | `harden` | `.agents/skills/harden/SKILL.md` |

---

#### 🔒 XAVFSIZLIK

| Kalit so'zlar | Skill | Yo'l |
|---------------|-------|------|
| xavfsizlik, security, himoya, zaiflik, vulnerability, OWASP, penetration | `web-security-testing` | `.agents/skills/web-security-testing/SKILL.md` |
| shifrlash, encryption, AES, RSA, TLS, kalit, key management | `data-encryption` | `.agents/skills/data-encryption/SKILL.md` |

---

#### ✍️ KONTENT & MARKETING

| Kalit so'zlar | Skill | Yo'l |
|---------------|-------|------|
| matn yozish, kopy, marketing, landing page, CTA, headline | `copywriting` | `.agents/skills/copywriting/SKILL.md` |
| psixologiya, mental model, persuasion, konversiya, nudge | `marketing-psychology` | `.agents/skills/marketing-psychology/SKILL.md` |
| SEO, meta, Google, qidiruv, indexing, sitemap, robots | `seo-audit` | `.agents/skills/seo-audit/SKILL.md` |
| programmatic SEO, template sahifalar, pSEO, ko'p sahifa | `programmatic-seo` | `.agents/skills/programmatic-seo/SKILL.md` |

---

#### 🔧 UTILITIES

| Kalit so'zlar | Skill | Yo'l |
|---------------|-------|------|
| commit, git, versiya, push | `conventional-commits` | `.agents/skills/conventional-commits/SKILL.md` |
| skill izla, topish, qanday qilaman, yangi skill, o'rnatish | `find-skills` | `.agents/skills/find-skills/SKILL.md` |

---

### 3-qadam: Mos skill'larni O'QI

Aniqlangan **barcha** mos skill'larning `SKILL.md` fayllarini `view_file` tool bilan o'qi.

**Tartib:**
1. Avval **KRITIK** skill'larni o'qi (agar kerak bo'lsa)
2. Keyin **asosiy** vazifaga tegishli skill'larni o'qi
3. Oxirida **qo'shimcha** (yordamchi) skill'larni o'qi

> ⚠️ Agar skill fayli topilmasa — xato bermay, tashlab ket va keyingi skill'ga o't.

---

### 4-qadam: MAJBURIY — Foydalanuvchiga xabar ber

Ish boshlashdan **OLDIN** quyidagi formatda yoz:

```
🔧 Skill'lar aniqlandi va o'qildi:
  ✅ skill-nomi — sabab
  ✅ skill-nomi — sabab

📋 Ish rejasi:
  1. Birinchi qadam
  2. Ikkinchi qadam
  ...
```

**⛔ Bu blokni HECH QACHON tashlab ketma!** Foydalanuvchi shu orqali skill tizimi ishlayotganini tekshiradi.

---

### 5-qadam: Skill ko'rsatmalariga amal qilib ishla

Har bir o'qilgan skill'ning ko'rsatmalariga **to'liq** amal qil. Skill'lar bir-biriga zid kelsa — **loyiha skill'lari ustunlik** oladi.

---

## 📐 Skill zanjiri (chaining) qoidalari

Ba'zi vazifalar ketma-ket bir nechta skill talab qiladi:

| Vazifa turi | Skill zanjiri |
|-------------|---------------|
| Yangi feature yaratish | `brainstorming` → `writing-plans` → `executing-plans` → `verification-before-completion` |
| Bug tuzatish | `systematic-debugging` → `test-driven-development` → `verification-before-completion` |
| TZ/Spec yozish | `brainstorming` → `technical-specification` → `writing-plans` |
| Xavfsizlik auditi | `web-security-testing` → `data-encryption` → `harden` |
| UI yaratish | `brand-identity` → `frontend-design` → `web-design-guidelines` → `harden` |
| PR yaratish | `requesting-code-review` → `conventional-commits` |
| Production tayyorlash | `harden` → `verification-before-completion` |

---

## 🚫 Qo'shimcha qoidalar

1. **Bir nechta skill mos kelsa** — hammasini o'qi, lekin asosiy vazifaga tegishlisini birinchi o'qi
2. **Hech biri mos kelmasa** — shunday yoz: `🔧 Skill'lar: maxsus skill kerak emas, umumiy bilim bilan ishlayman.`
3. **Commit qilishdan oldin** — `conventional-commits` skill'ini **har doim** o'qi
4. **Ishni tugatishdan oldin** — `verification-before-completion` skill'ini **har doim** o'qi
5. **O'zbek tilida** muloqot qil — foydalanuvchi o'zbek tilida yozadi
6. **Skill yo'l topilmasa** — xato berma, log qoldir va davom et
7. **Barcha skill'lar** `.agents/skills/` papkasida — boshqa joyda qidirma
