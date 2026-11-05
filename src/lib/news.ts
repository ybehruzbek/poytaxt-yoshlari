import type { Media, News } from '@/payload-types'

/** Bosh sahifadagi yangilik kartasi uchun yengil ma'lumot (server va brauzerda bir xil ishlatiladi). */
export type NewsCard = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: News['category']
  categoryLabel: string
  date: string
  dateISO: string
  image: string
  imageAlt: string
}

const CATEGORY_LABEL: Record<News['category'], string> = {
  kengash: 'Kengash faoliyati',
  boshlangich: 'Boshlang‘ich tashkilotlar',
  imkoniyat: 'Imkoniyatlar',
  tadbir: 'Tadbir',
}
export const CATEGORY_TONE: Record<News['category'], 'o' | 'g' | 'b' | 'y'> = {
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
    category: doc.category,
    categoryLabel: CATEGORY_LABEL[doc.category],
    date: formatDateUz(doc.publishedAt),
    dateISO: doc.publishedAt,
    image: img?.sizes?.card?.url || img?.url || '',
    imageAlt: img?.alt || '',
  }
}

/** Bir sahifada nechta yangilik olinadi: 1 ta asosiy + 4 ta yon karta */
export const NEWS_PAGE_SIZE = 5
