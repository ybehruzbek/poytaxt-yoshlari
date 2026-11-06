/**
 * YAGONA IMLO QOIDASI — saytdagi barcha o'zbekcha matn yangi alifboda yoziladi.
 *
 * Qonun: O‘RQ-1184, 2026-yil 21-oktabr ("Lotin yozuviga asoslangan o'zbek alifbosini joriy etish
 * to'g'risida"gi Qonunga o'zgartirish). Alifbo — 28 harf + 1 tutuq belgisi:
 *   Oʻ oʻ → Ö ö    Gʻ gʻ → Ğ ğ    Sh sh → Ş ş    Ch ch → Ç ç
 *   "ng" alohida harf emas, yozilishi o'zgarmaydi (Toşkentning, kengaş).
 *   Tutuq belgisi — faqat ʼ (U+02BC, MODIFIER LETTER APOSTROPHE): taʼlim, eʼtibor, sanʼat, maʼno.
 *   Oddiy apostrof ', o'ng qo'shtirnoq ’, teskari ‘ va ʻ tutuq o'rnida ishlatilmaydi.
 *   s va h alohida tovush bo'lsa, ular orasidagi tutuq saqlanadi va Ş ga aylanmaydi: Isʼhoq, musʼhaf.
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
]

/**
 * O'girilmaydigan qismlar: havolalar, elektron pochta, domenlar, @nomlar va o'zbekcha bo'lmagan nomlar
 * (domen va pochta ASCII bo'lib qoladi: yoshkent.uz, info@yoshkent.uz).
 */
const XORIJIY = ['Fashion Show', 'English', 'ChatGPT', 'Chrome', 'Shopify', 'Dashboard', 'Microsoft', 'TikTok', 'WhatsApp']
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
