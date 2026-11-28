/** Boşqaruv paneli uçun sana va vaqt (Toşkent vaqti, UTC+5, yangi alifbo) */

const OY = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const KUN = ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba']
const TZ = 5 * 3600 * 1000
const NBSP = ' '

/** UTC+5 dagi “soat” qiymatlari getUTC* orqali öqiladi */
const tk = (d: Date | string | number) => new Date(new Date(d).getTime() + TZ)
const dayKey = (d: Date) => `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`
const hm = (d: Date) => `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`

export const oyNomi = (i: number) => OY[i]

/** “17-noyabr, seşanba” */
export function bugunSarlavha(now = new Date()) {
  const d = tk(now)
  return `${d.getUTCDate()}-${OY[d.getUTCMonth()]}, ${KUN[d.getUTCDay()]}`
}

/** “bugun, 10:42” · “keça, 18:05” · “15-noyabr” · “3-mart, 2025” (bölinmaydigan böşliqlar bilan) */
export function qisqaVaqt(iso: string | Date, now = new Date()) {
  const d = tk(iso)
  const n = tk(now)
  const y = tk(now.getTime() - 86400000)
  if (dayKey(d) === dayKey(n)) return `bugun, ${hm(d)}`
  if (dayKey(d) === dayKey(y)) return `kecha, ${hm(d)}`
  const base = `${d.getUTCDate()}-${OY[d.getUTCMonth()]}`.replace('-', '-⁠')
  return d.getUTCFullYear() === n.getUTCFullYear() ? base : `${base},${NBSP}${d.getUTCFullYear()}`
}

/** “14-noyabr, 19:28” */
export function sanaVaqt(iso: string | Date) {
  const d = tk(iso)
  return `${d.getUTCDate()}-${OY[d.getUTCMonth()]}, ${hm(d)}`
}

/** Necha kun oldin (butun kun) */
export function kunOldin(iso: string | Date, now = new Date()) {
  return Math.max(0, Math.floor((now.getTime() - new Date(iso).getTime()) / 86400000))
}

/** Joriy va ötgan oyning boşi hamda ötgan oyning şu davri oxiri (Toşkent vaqti böyiça, UTC ISO satri) */
export function oyChegaralari(now = new Date()) {
  const d = tk(now)
  const start = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1) - TZ
  const prev = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1) - TZ
  // ötgan oyning şu davri: masalan, 17-noyabrda — 1–17-oktabr (töliq oy bilan solişturiş notöğri natija beradi)
  const prevSame = Math.min(prev + (now.getTime() - start), start)
  return {
    oy: d.getUTCMonth(),
    prevOy: (d.getUTCMonth() + 11) % 12,
    kun: d.getUTCDate(),
    start: new Date(start).toISOString(),
    prev: new Date(prev).toISOString(),
    prevSame: new Date(prevSame).toISOString(),
  }
}

/** Bugunning boşi (Toşkent vaqti) */
export function bugunBoshi(now = new Date()) {
  const d = tk(now)
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - TZ).toISOString()
}
