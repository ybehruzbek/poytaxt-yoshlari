@AGENTS.md

# Loyiha konteksti

- **Reja va yo'l xaritasi:** `PLAN.md` — nima qilinayotgani, nima qolgani, qaysi fazada.
- **Texnik topshiriq:** `poytaxt_yoshlari_TZ.md` — buyurtmachi talablari. Yagona haqiqat manbai.
- **Holat jadvali:** `PROJECT_STATUS.md` — TZ bilan solishtirma.

# Skill bazasi

Loyihada `.agents/skills/` papkasida 27 ta skill bor (`.agent/` — o'sha skill'larning
kichikroq nusxasi, boshqa AI muhitlari uchun). Ular avtomatik yuklanmaydi — kerak
bo'lganda o'zingiz o'qing:

| Vazifa turi | O'qish kerak bo'lgan skill |
|---|---|
| UI, dizayn, vizual | `.agents/skills/design-taste-frontend/`, `frontend-design/`, `brand-identity/` |
| Animatsiya, motion, GSAP | `.agents/skills/review-animations/` |
| Next.js App Router, RSC, route handler | `.agents/skills/next-best-practices/` |
| React performance | `.agents/skills/vercel-react-best-practices/` |
| Bug, xato, "ishlamayapti" | `.agents/skills/systematic-debugging/` |
| Xavfsizlik, OWASP | `.agents/skills/web-security-testing/`, `data-encryption/` |
| Production'ga chiqarish | `.agents/skills/harden/` |
| A11Y va UX tekshiruvi | `.agents/skills/web-design-guidelines/` |
| SEO | `.agents/skills/seo-audit/`, `programmatic-seo/` |
| Matn, CTA, sarlavha | `.agents/skills/copywriting/` |

`brand-identity/resources/design-tokens.json` — ranglar, shrift, radius uchun yagona
ma'lumotnoma. Lekin haqiqiy manba `app/globals.css` `:root` bo'limi; ikkalasi mos
kelishi shart.

# Muhim texnik qoidalar

- Styling: **CSS Modules**. Tailwind YO'Q, qo'shilmaydi.
- Rang/bo'shliq/shrift — `globals.css` tokenlari orqali, qo'lda hex yoki px yozilmaydi.
- Komponent sukut bo'yicha **server komponenti**. `"use client"` faqat zarurat bo'lganda.
- Maxfiy qiymatlar `lib/env.ts` orqali olinadi. `process.env.X || "default"` yozilmaydi.
- Admin sahifa/action `requireRole()` bilan o'zini himoya qiladi — faqat `proxy.ts` ga tayanmaydi.
