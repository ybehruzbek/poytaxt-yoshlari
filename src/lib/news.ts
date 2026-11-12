import type { Media, News } from '@/payload-types'

/** Bosh sahifadagi yangilik kartasi uchun yengil ma'lumot (server va brauzerda bir xil ishlatiladi). */
export type NewsCard = {
  id: number
  slug: string
  title: string
  excerpt: string
  /** “tabrik” — tabriklar (alohida rubrika) */
  category: News['category'] | 'tabrik'
  categoryLabel: string
  date: string
  dateISO: string
  image: string
  imageAlt: string
}

const CATEGORY_LABEL: Record<News['category'], string> = {
  kengash: 'Kengaş faoliyati',
  boshlangich: 'Boşlanğiç taşkilotlar',
  imkoniyat: 'Imkoniyatlar',
  tadbir: 'Tadbir',
}
export const CATEGORY_TONE: Record<News['category'] | 'tabrik', 'o' | 'g' | 'b' | 'y'> = {
  tabrik: 'y',
  kengash: 'o',
  boshlangich: 'g',
  imkoniyat: 'y',
  tadbir: 'b',
}

const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

/** "2026-11-05..." → "5-noyabr, 2026" (Toshkent vaqti bo'yicha) */
export function formatDateUz(iso: string): string {
  const d = new Date(new Date(iso).getTime() + 5 * 3600 * 1000) // UTC+5
  return `${d.getUTCDate()}-${MONTHS[d.getUTCMonth()]}, ${d.getUTCFullYear()}`
}

export function toNewsCard(doc: News): NewsCard {
  const img = (typeof doc.image === 'object' ? doc.image : null) as Media | null
  return {
    id: doc.id,
    slug: doc.slug ?? String(doc.id),
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.kind === 'tabrik' ? 'tabrik' : doc.category,
    categoryLabel: doc.kind === 'tabrik' ? 'Tabriklar' : CATEGORY_LABEL[doc.category],
    date: formatDateUz(doc.publishedAt),
    dateISO: doc.publishedAt,
    image: img?.sizes?.card?.url || img?.url || '',
    imageAlt: img?.alt || '',
  }
}

/** Bir sahifada nechta yangilik olinadi: 1 ta asosiy + 4 ta yon karta */
export const NEWS_PAGE_SIZE = 5

/** Faqat yangiliklar (kanaldagi eʼlon va kelgusi tadbirlar alohida bölimlarda körsatiladi) */
export const NEWS_ONLY = { kind: { equals: 'yangilik' as const } }

/** Yangiliklar sahifasi: yangiliklar va tabriklar (tabriklar alohida rubrikada) */
export const NEWS_AND_GREETINGS = { kind: { in: ['yangilik', 'tabrik'] } }
