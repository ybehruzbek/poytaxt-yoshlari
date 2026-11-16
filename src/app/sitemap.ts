import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { NAV } from '@/config/nav'

const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
// RU va EN tarjimalari hali tayyor emas — xaritada faqat özbekça sahifalar
const L = 'uz'

export const revalidate = 3600

/** Sayt xaritasi: menyudagi barça sahifalar va eʼlon qilingan yangiliklar */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>([''])
  for (const g of NAV) {
    if (g.href) paths.add(g.href)
    for (const i of g.items ?? []) {
      paths.add(i.href)
      for (const c of i.children ?? []) paths.add(c.href)
    }
  }
  const pages: MetadataRoute.Sitemap = [...paths].map((p) => ({ url: `${SITE}/${L}${p}` }))

  try {
    const payload = await getPayload({ config })
    const news = await payload.find({
      collection: 'news',
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
      limit: 5000,
      depth: 0,
      pagination: false,
    })
    for (const n of news.docs) {
      if (n.slug) pages.push({ url: `${SITE}/${L}/yangiliklar/${n.slug}`, lastModified: n.updatedAt })
    }
  } catch {
    // baza vaqtinça mavjud bölmasa ham sahifalar xaritasi qaytariladi
  }
  return pages
}
