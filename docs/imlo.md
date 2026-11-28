# Imlo qoidasi — yagona va qat’iy

Saytdagi **barcha o‘zbekcha yozuvlar** — sahifa matnlari, tugmalar, xabarlar, admin paneldagi nomlar, yangiliklar, rasm tavsiflari, meta-sarlavhalar — **joriy lotin alifbosida** yoziladi va saqlanadi (foydalanuvchi qarori, 2026-11-28).

**Yangi alifbo** (O‘RQ-1184-son Qonun, 2026-yil 21-oktabr) — tashrif buyuruvchi tanlovi: til menyusidagi **Alifbo: Joriy / Yangi** tugmasi. “Yangi” tanlansa, sahifa brauzerda avtomatik o‘giriladi (`src/components/site/Alifbo.tsx`, `toYangiAlifbo`). Tanlov brauzerda eslab qolinadi. Kod va bazada yangi alifbo harflari saqlanmaydi.

## Harflar

| Joriy (saqlanadi) | Yangi (tanlovda ko‘rsatiladi) | Misol |
|---|---|---|
| O‘ o‘ | Ö ö | O‘zbekiston, bo‘lish |
| G‘ g‘ | Ğ ğ | bog‘lanish, g‘olib |
| Sh sh | Ş ş | Toshkent, yoshlar |
| Ch ch | Ç ç | uchun, birinchi |

- o‘ va g‘ — faqat **‘** (U+2018) bilan: O‘zbekiston, g‘oya.
- Bosh harflarda: O‘ZBEKISTON, YOSHKENT, TOSHKENT.

## Tutuq belgisi

- Faqat **’** (U+2019): ta’lim, e’lon, ma’lumot, a’zo, mas’ul.
- Oddiy apostrof `'`, `ʻ`, `ʼ` va `` ` `` ishlatilmaydi — `pnpm imlo:fix` va admin panel hook'i o‘zi to‘g‘rilaydi.
- s va h alohida tovush bo‘lsa, orasidagi tutuq saqlanadi: Is’hoq.

## Qo‘shtirnoq — qat’iy

- Faqat **“…”** (U+201C ochiluvchi, U+201D yopiluvchi): “Yoshlar kuni”, “Mard o‘g‘lon” mukofoti.
- Ruscha **«…»** va nemischa **„…“** **ishlatilmaydi**.

## Atamalar

- Oliy ta’lim tashkiloti qisqartmasi — **OTT** (OTM emas).

## O‘zgarmaydiganlar

- Havolalar, slug va domenlar ASCII bo‘lib qoladi: `yoshkent.uz`, `/boglanish/murojaat`, `info@yoshkent.uz`.
- Kod qiymatlari (enum, maydon nomlari, className) — o‘zgarmaydi.
- Xorijiy nomlar: English, ChatGPT, Tashkent va h.k. — yangi alifboga o‘girilmaydi (`src/lib/alifbo.ts` → `XORIJIY`). Yangi alifbo tanlovida noto‘g‘ri o‘girilgan inglizcha so‘z ko‘rilsa, shu ro‘yxatga qo‘shiladi.
- Fuqarolar murojaatlari va arizalari asl holida saqlanadi.
- Sahifaning ma’lum qismi yangi alifboga o‘girilmasligi kerak bo‘lsa — elementga `data-alifbo="off"`.
- Logotip rasmlaridagi yozuv o‘girilmaydi (rasm).

## Qanday ta’minlanadi

| Qayerda | Nima qiladi |
|---|---|
| `src/lib/alifbo.ts` | Qoidalar: `toJoriyAlifbo` (saqlash), `toYangiAlifbo` (tanlovda ko‘rsatish), `eskiLotin` |
| `pnpm imlo` | Koddagi barcha matnni tekshiradi; yangi alifbo harfi yoki noto‘g‘ri apostrof bo‘lsa to‘xtaydi |
| `pnpm imlo:fix` | Topilganlarini o‘zi to‘g‘rilaydi. Ataylab qoldirilgan qator — izohida `imlo-ok` |
| `pnpm lint` | Avval `pnpm imlo` ishlaydi |
| Admin panel | Matn saqlanganda avtomatik joriy alifboga keltiriladi (`src/lib/imlo-hook.ts`) |
| Telegram sinxronlash | Kanal postlari joriy alifboga keltiriladi (`src/lib/tg/transform.ts`) |
| `pnpm imlo:db` | Lokal bazani o‘tkazadi; serverda xuddi shuni `20261128_joriy_alifbo` migratsiyasi bajaradi (`src/lib/joriy-baza.ts`) |

Yangi kolleksiya yoki maydon qo‘shilganda: o‘zbekcha matn maydoniga `hooks: { beforeChange: [imloMatn] }` (richText uchun `imloRichText`) qo‘shiladi.

Commit xabarlari va hujjatlar ham joriy alifboda yoziladi.
