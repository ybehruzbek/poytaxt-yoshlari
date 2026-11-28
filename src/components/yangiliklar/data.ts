import { CATEGORY_TONE, type NewsCard } from '@/lib/news'

/** Yangiliklar röyxati sahifasi uçun karta: bosh sahifa kartasi + vaqt, kun va guruh kalitlari */
export type YnItem = NewsCard & {
  tone: (typeof CATEGORY_TONE)[NewsCard['category']]
  /** “10:00” — Toşkent vaqti */
  time: string
  /** “Bugun” / “Keça” / “5-noyabr” (joriy yildan boşqa bölsa “2025-yil 5-noyabr”) */
  rel: string
  /** “2026-yil 5-noyabr” */
  long: string
  /** “05.11.2026” */
  num: string
  /** “2026-11-05” — kun böyiça guruhlaş kaliti */
  dayKey: string
}

const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const p2 = (n: number) => String(n).padStart(2, '0')

/** Toşkent vaqti (UTC+5) böyiça sana qismlari */
const parts = (t: number) => {
  const d = new Date(t + 5 * 3600 * 1000)
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes() }
}
const key = (x: { y: number; m: number; d: number }) => `${x.y}-${p2(x.m + 1)}-${p2(x.d)}`

/** `now` — serverda bir marta olinadi (Bugun/Keça hisoblaş uçun) */
export function toYnItem(c: NewsCard, now: number): YnItem {
  const x = parts(new Date(c.dateISO).getTime())
  const today = parts(now)
  const yest = parts(now - 86400000)
  const k = key(x)
  const day = `${x.d}-${MONTHS[x.m]}`
  const rel =
    k === key(today) ? 'Bugun' : k === key(yest) ? 'Kecha' : x.y === today.y ? day : `${x.y}-yil ${day}`
  return {
    ...c,
    tone: CATEGORY_TONE[c.category],
    time: `${p2(x.h)}:${p2(x.mi)}`,
    rel,
    long: `${x.y}-yil ${day}`,
    num: `${p2(x.d)}.${p2(x.m + 1)}.${x.y}`,
    dayKey: k,
  }
}

/** Barça kartalar: “Bugun/Keça” hozirgi vaqtga nisbatan (sahifa har 60 soniyada qayta quriladi) */
export function toYnItems(cards: NewsCard[]): YnItem[] {
  const now = Date.now()
  return cards.map((c) => toYnItem(c, now))
}
