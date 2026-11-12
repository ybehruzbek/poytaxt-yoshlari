import { CATEGORY_TONE, type NewsCard } from '@/lib/news'

/** Yangiliklar röyxati sahifasi uçun karta: bosh sahifa kartasi + töliq sana va oy guruhi */
export type YnItem = NewsCard & {
  tone: (typeof CATEGORY_TONE)[NewsCard['category']]
  /** “2026-yil 5-noyabr” */
  long: string
  /** “5-noyabr” */
  day: string
  /** “2026-11” — oy böyiça guruhlaş kaliti */
  month: string
}

export type YnCat = { value: NewsCard['category']; label: string; count: number }
export type YnMonth = { value: string; label: string; count: number }

const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

/** Toşkent vaqti (UTC+5) böyiça sana qismlari */
const parts = (iso: string) => {
  const d = new Date(new Date(iso).getTime() + 5 * 3600 * 1000)
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() }
}

export function toYnItem(c: NewsCard): YnItem {
  const { y, m, d } = parts(c.dateISO)
  return {
    ...c,
    tone: CATEGORY_TONE[c.category],
    long: `${y}-yil ${d}-${MONTHS[m]}`,
    day: `${d}-${MONTHS[m]}`,
    month: `${y}-${String(m + 1).padStart(2, '0')}`,
  }
}

/** “2026-11” → “2026-yil noyabr” */
export function monthLabel(key: string): string {
  const [y, m] = key.split('-')
  return `${y}-yil ${MONTHS[Number(m) - 1]}`
}

export function catsOf(items: YnItem[]): YnCat[] {
  const map = new Map<string, YnCat>()
  for (const it of items) {
    const c = map.get(it.category) ?? { value: it.category, label: it.categoryLabel, count: 0 }
    c.count += 1
    map.set(it.category, c)
  }
  return [...map.values()].sort((a, b) => b.count - a.count)
}

export function monthsOf(items: YnItem[]): YnMonth[] {
  const map = new Map<string, YnMonth>()
  for (const it of items) {
    const g = map.get(it.month) ?? { value: it.month, label: monthLabel(it.month), count: 0 }
    g.count += 1
    map.set(it.month, g)
  }
  return [...map.values()]
}
