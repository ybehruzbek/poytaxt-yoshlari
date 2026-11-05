/**
 * Joriy o'zbek lotin yozuvini yangi alifboga o'giradi.
 * Qonun: 2026-yil 21-oktabrda imzolangan, 2027-yil 22-aprelda kuchga kiradi.
 *   Oʻ → Ö, Gʻ → Ğ, Sh → Ş, Ch → Ç; "ng" alohida harf emas (yozilishi o'zgarmaydi);
 *   tutuq belgisi ’ saqlanadi (e’tibor, ta’lim). 28 harf + tutuq belgisi.
 */
const APOS = "[‘ʻ'’ʼ`]"

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
  [/['ʼ]/g, '’'], // tutuq belgisi
]

export function toYangiAlifbo(text: string): string {
  return RULES.reduce((t, [re, to]) => t.replace(re, to), text)
}
