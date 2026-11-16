/**
 * Matnda bir butun bölişi kerak bölgan birikmalarni qator oxirida uzilmaydigan qiladi (oddiy boşliq → U+00A0):
 * – raqam guruhlari: “1 000”, “12 000”, “200 000”;
 * – raqam va ölçov birligi: “1 mlrd”, “50 mln söm”, “10 foiz”, “24 oy”, “5 nafar”, “9 kun”;
 * – “2026-yil 18-avgust” kabi sanalar va “PQ–59-son” kabi raqamli hujjat nomlari.
 */
const NB = ' '
const UNITS =
  'mln|mlrd|ming|söm|sömgaça|sömdan|foiz|foizi|nafar|ta|kun|oy|yil|yoş|yoşdan|yoşgaça|ball|dollar|dollarigaça|AQŞ|baravar|baravarigaça|nusxa|nusxada'

export function nbsp(s: string): string {
  return (
    s
      // raqam guruhlari (takroran: “1 000 000”)
      .replace(/(\d) (?=\d{3}\b)/g, `$1${NB}`)
      // raqam va ölçov birligi
      .replace(new RegExp(`(\\d) (?=(${UNITS})(?![\\p{L}]))`, 'gu'), `$1${NB}`)
      // “mln söm”, “mlrd söm”, “AQŞ dollari”
      .replace(/\b(mln|mlrd|AQŞ) (?=\S)/g, `$1${NB}`)
      // “2026-yil 18-avgust”: yil va kun birga
      .replace(/(\d+-yil) (?=\d+-)/g, `$1${NB}`)
  )
}
