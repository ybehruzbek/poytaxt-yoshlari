/**
 * YAGONA IMLO QOIDASI. 2026-11-28 dan: saytdagi barcha o'zbekcha matn JORIY lotin alifbosida saqlanadi
 * (toJoriyAlifbo, pastda); yangi alifbo — tashrif buyuruvchi tanlovi, brauzerda toYangiAlifbo bilan hosil qilinadi.
 * Quyidagi yangi alifbo qoidalari toYangiAlifbo uchun:
 *
 * Qonun: O‘RQ-1184, 2026-yil 21-oktabr ("Lotin yozuviga asoslangan o'zbek alifbosini joriy etish
 * to'g'risida"gi Qonunga o'zgartirish). Alifbo — 28 harf + 1 tutuq belgisi:
 *   Oʻ oʻ → Ö ö    Gʻ gʻ → Ğ ğ    Sh sh → Ş ş    Ch ch → Ç ç
 *   "ng" alohida harf emas, yozilishi o'zgarmaydi (Toşkentning, kengaş).
 *   Tutuq belgisi — faqat ʼ (U+02BC, MODIFIER LETTER APOSTROPHE): taʼlim, eʼtibor, sanʼat, maʼno.
 *   Oddiy apostrof ', o'ng qo'shtirnoq ’, teskari ‘ va ʻ tutuq o'rnida ishlatilmaydi.
 *   s va h alohida tovush bo'lsa, ular orasidagi tutuq saqlanadi va Ş ga aylanmaydi: Isʼhoq, musʼhaf.
 *   Qo'shtirnoq — faqat “…” (U+201C / U+201D). Ruscha «…» va „…“ ishlatilmaydi: «Yoshlar kuni» → “Yoshlar kuni”.
 *   Atama: oliy ta'lim tashkiloti — OTT (OTM emas).
 *   Sana: yil va oy nomi raqamga chiziqcha bilan qo'shiladi: 2017-yil, 5-iyulda, 2026–2027-yillarda.
 *
 * Bu fayl — qoidaning yagona manbai: sayt matnlari (scripts/imlo.mjs), admin paneldan saqlanadigan
 * kontent (Payload hook) va tekshiruv shu funksiyalardan foydalanadi.
 */

/** Tutuq belgisi (rasmiy) */
export const TUTUQ = 'ʼ'

/** Tutuq yoki oʻ/gʻ belgisi o'rnida uchraydigan barcha belgilar */
const APOS = "['‘’ʻʼ`´]"

const RULES: Array<[RegExp, string]> = [
  [new RegExp('O' + APOS, 'g'), 'Ö'],
  [new RegExp('o' + APOS, 'g'), 'ö'],
  [new RegExp('G' + APOS, 'g'), 'Ğ'],
  [new RegExp('g' + APOS, 'g'), 'ğ'],
  // boşqa alifbolardagi öxşaş harflar (ruminça ș, turkça ı emas): ș → ş
  [/ș/g, 'ş'],
  [/Ș/g, 'Ş'],
  [/SH/g, 'Ş'],
  [/Sh/g, 'Ş'],
  [/sh/g, 'ş'],
  [/CH/g, 'Ç'],
  [/Ch/g, 'Ç'],
  [/ch/g, 'ç'],
  // Ö/Ğ dan keyin tutuq ortiqça (tö'lov → tölov, tö'garak → tögarak)
  [new RegExp('([ÖöĞğ])' + APOS, 'g'), '$1'],
  // qolgan apostroflar — harf orasida yoki so'z oxirida turgan bo'lsa tutuq belgisi
  [new RegExp(`(?<=\\p{L})${APOS}(?=\\p{L})`, 'gu'), TUTUQ],
  // qo'shtirnoq: faqat “…” — ruscha «…» va nemischa „…“ almaştiriladi
  [/„([^“”„]*)“/g, '\u201C$1\u201D'],
  [/[«„]/g, '\u201C'],
  [/»/g, '\u201D'],
  // atama: oliy taʼlim taşkiloti — OTT (OTM emas): OTMlarda → OTTlarda
  [/\bOTM(?!S\b)/g, 'OTT'],  // sana: yil va oy nomi raqamga defis bilan qöşiladi — 2017 yil → 2017-yil, 2026–2027 yillarda →
  // 2026–2027-yillarda, 5 iyulda → 5-iyulda. Sanoq son bilan “5 yil”, “12 oy” özgarmaydi (faqat
  // 4 xonali yil — 1800–2099 — va oy nomlari).
  [/(?<![\p{L}\d])((?:18|19|20)\d{2}) (yil|y\.)/gu, '$1-$2'],
  [
    /(?<![\p{L}\d.,])(\d{1,2}) (yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)(?=(?:da|dagi|ga|gaça|dan|ning|ida|idagi|idan|i)?(?!\p{L}))/gu,
    '$1-$2',
  ],
]

/**
 * O'girilmaydigan qismlar: havolalar, elektron pochta, domenlar, @nomlar va o'zbekcha bo'lmagan nomlar
 * (domen va pochta ASCII bo'lib qoladi: yoshkent.uz, info@yoshkent.uz).
 */
const XORIJIY = [
  'Fashion Show', 'English', 'ChatGPT', 'Chrome', 'Shopify', 'Dashboard', 'Microsoft', 'TikTok', 'WhatsApp',
  'Championship', 'Champions', 'Cash', 'Show', 'Shorts', 'PowerPoint', 'Photoshop', 'Research', 'Coach', 'Teacher', 'Speech',
  'Fashion', 'Exchange', 'Mentorship', 'Internship', 'Tashkent', String.raw`FinTech\w*`, String.raw`[Cc]hallenge\w*`,
  // inglizça sözlar: “ch” bu yerda “k” deb öqiladi, ç ga ögirilmaydi (Taşkent Tech, International School of …)
  'Tech', 'Technology', 'Technologies', 'School',
  // xorijiy taşkilot va dastur nomlari
  'China', 'Chevening', 'Scholarship', 'BellashAIlik', 'UPSHIFT',
]
const HIMOYA = new RegExp(
  [
    String.raw`https?:\/\/\S+`,
    String.raw`[\w.+-]+@[\w-]+(?:\.[\w-]+)+`,
    String.raw`@[\w.]+`,
    String.raw`\b[\w-]+(?:\.[\w-]+)*\.(?:uz|com|org|net|ru|me|io|gov)\b`,
    String.raw`\b(?:${XORIJIY.join('|')})\b`,
  ].join('|'),
  'g',
)

const ogir = (t: string) => RULES.reduce((s, [re, to]) => s.replace(re, to), t)

/** Joriy (eski) o'zbek lotin yozuvidagi matnni yangi alifboga o'giradi. Qayta qo'llash xavfsiz. */
export function toYangiAlifbo(text: string): string {
  let out = ''
  let last = 0
  for (const m of text.matchAll(HIMOYA)) {
    out += ogir(text.slice(last, m.index)) + m[0]
    last = m.index! + m[0].length
  }
  return out + ogir(text.slice(last))
}

/** Matnda eski yozuv yoki noto'g'ri tutuq belgisi qolganmi */
export function eskiImlo(text: string): boolean {
  return toYangiAlifbo(text) !== text
}

/**
 * Teskari o'girish: yangi alifbo → joriy lotin yozuvi (harflar; apostroflarni toJoriyAlifbo to'g'rilaydi).
 *   Ö ö → O‘ o‘   Ğ ğ → G‘ g‘   Ş ş → Sh sh   Ç ç → Ch ch   ʼ → ’
 */
export function eskiLotin(text: string): string {
  return text
    .replace(/Ş(?=\p{Lu})|(?<=\p{Lu})Ş/gu, 'SH')
    .replace(/Ç(?=\p{Lu})|(?<=\p{Lu})Ç/gu, 'CH')
    .replace(/Ş/g, 'Sh')
    .replace(/ş/g, 'sh')
    .replace(/Ç/g, 'Ch')
    .replace(/ç/g, 'ch')
    .replace(/Ö/g, 'O‘')
    .replace(/ö/g, 'o‘')
    .replace(/Ğ/g, 'G‘')
    .replace(/ğ/g, 'g‘')
    .replace(/ʼ/g, '’')
}


/**
 * Saytning asosiy yozuvi — JORIY lotin alifbosi (foydalanuvchi qarori, 2026-11-28). Kod va bazadagi barcha
 * o'zbekcha matn shu yozuvda saqlanadi; yangi alifbo — tashrif buyuruvchi tanlasa brauzerda
 * toYangiAlifbo() orqali hosil qilinadi (components/site/Alifbo.tsx).
 *   o‘ g‘ — U+2018 (‘) bilan;  tutuq — ’ (U+2019): ta’lim, e’lon, san’at.
 *   Yangi alifbo harflari (Ö Ğ Ş Ç, ʼ) joriy shaklga qaytariladi; ' ʻ ` ´ belgilari to'g'rilanadi.
 */
const JORIY_RULES: Array<[RegExp, string]> = [
  [new RegExp('([OoGg])' + APOS, 'g'), '$1‘'],
  // harf orasidagi qolgan apostroflar — tutuq (’)
  [new RegExp(`(?<=\\p{L})(?<![OoGg])${APOS}(?=\\p{L})`, 'gu'), '’'],
  [/„([^“”„]*)“/g, '\u201C$1\u201D'],
  [/[«„]/g, '\u201C'],
  [/»/g, '\u201D'],
  [/\bOTM(?!S\b)/g, 'OTT'],
  [/(?<![\p{L}\d])((?:18|19|20)\d{2}) (yil|y\.)/gu, '$1-$2'],
  [
    /(?<![\p{L}\d.,])(\d{1,2}) (yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)(?=(?:da|dagi|ga|gacha|dan|ning|ida|idagi|idan|i)?(?!\p{L}))/gu,
    '$1-$2',
  ],
]

const joriy = (t: string) => JORIY_RULES.reduce((s, [re, to]) => s.replace(re, to), eskiLotin(t))

/** Har qanday o'zbekcha lotin matnni (yangi alifboda yoki noto'g'ri apostrof bilan) joriy alifboga keltiradi. Qayta qo'llash xavfsiz. */
export function toJoriyAlifbo(text: string): string {
  let out = ''
  let last = 0
  for (const m of text.matchAll(HIMOYA)) {
    out += joriy(text.slice(last, m.index)) + m[0]
    last = m.index! + m[0].length
  }
  return out + joriy(text.slice(last))
}

/** Matnda yangi alifbo harfi yoki noto'g'ri apostrof qolganmi (joriy alifbo qoidasi bo'yicha) */
export function joriyEmas(text: string): boolean {
  return toJoriyAlifbo(text) !== text
}
