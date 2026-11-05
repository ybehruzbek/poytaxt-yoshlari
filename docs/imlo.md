# Imlo qoidasi — yagona va qatʼiy

Saytdagi **barça özbekça yozuvlar** — sahifa matnlari, tugmalar, xabarlar, admin paneldagi nomlar, yangiliklar, rasm tavsiflari, meta-sarlavhalar — faqat **yangi alifboda** yoziladi.

Asos: ÖRQ-1184-son Qonun, 2026-yil 21-oktabr ([lex.uz](https://www.lex.uz/uz/doc-passport/8548754)). Alifbo — 28 harf va 1 tutuq belgisi.

## Harflar

| Eski | Yangi | Misol |
|---|---|---|
| Oʻ oʻ | **Ö ö** | Özbekiston, böliş, köngilli |
| Gʻ gʻ | **Ğ ğ** | boğlaniş, ğolib, töğri |
| Sh sh | **Ş ş** | Toşkent, yoşlar, kengaş |
| Ch ch | **Ç ç** | uçun, içki, birinçi |

- **ng** alohida harf emas, yozilişi özgarmaydi: Toşkentning, köngilli.
- Bosh harflarda ham: YOŞKENT, ÖZBEKISTON.

## Tutuq belgisi

- Faqat **ʼ** (U+02BC, MODIFIER LETTER APOSTROPHE): taʼlim, eʼlon, maʼlumot, aʼzo, masʼul.
- Oddiy apostrof `'`, qöştirnoq `’`, `‘` va `ʻ` tutuq örnida **işlatilmaydi**.
- s va h alohida tovuş bölsa, orasidagi tutuq saqlanadi va Ş ga aylanmaydi: Isʼhoq.

## Özgarmaydiganlar

- Havolalar, slug va domenlar ASCII bölib qoladi: `yoshkent.uz`, `/boglanish/murojaat`, `info@yoshkent.uz`.
- Kod qiymatlari (enum, maydon nomlari, className) — özgarmaydi.
- Xorijiy nomlar: English, ChatGPT, Chrome va h.k. (`src/lib/alifbo.ts` → `XORIJIY`).
- Fuqarolar murojaatlari asl holida saqlanadi.
- Kod içidagi izohlar (komentariyalar) bu qoidaga kirmaydi.

## Qanday taʼminlanadi

| Qayerda | Nima qiladi |
|---|---|
| `src/lib/alifbo.ts` | Qoidaning yagona manbai (`toYangiAlifbo`, `TUTUQ`) |
| `pnpm imlo` | Kod içidagi barça körinadigan matnni tekşiradi; xato bölsa töxtaydi |
| `pnpm imlo:fix` | Topilganlarini özi töğrilaydi |
| `pnpm lint` | Avval `pnpm imlo` işlaydi — eski yozuv bilan lint ötmaydi |
| Admin panel | Yangiliklar (sarlavha, qisqa va töliq matn) va rasm tavsifi saqlanganda avtomatik yangi alifboga ötadi (`src/lib/imlo-hook.ts`) |
| `pnpm imlo:db` | Bazadagi eski yozuvlarni bir martada ötkazadi (qayta işga tuşiriş xavfsiz) |

Yangi kolleksiya yoki maydon qöşilganda: özbekça matn maydoniga `hooks: { beforeChange: [imloMatn] }` (richText uçun `imloRichText`) qöşiladi.

Commit xabarlari va hujjatlar ham yangi alifboda yoziladi.
