import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { NAV } from '@/config/nav'
import { getPress } from '@/lib/cms/axborot'
import { getOtts } from '@/lib/cms/biz'
import { getFaoliyat } from '@/lib/cms/faoliyat'

const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
// RU va EN tarjimalari hali tayyor emas — xaritada faqat özbekça sahifalar
const L = 'uz'

export const revalidate = 3600

/** Sayt xaritasi: menyudagi barça sahifalar, içki sahifalar (OTT yetakçilari, loyihalar, yönalişlar,
 * press-relizlar, Ustav) va eʼlon qilingan yangiliklar */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(['', '/hujjatlar/normativ/ustav'])
  for (const g of NAV) {
    if (g.href) paths.add(g.href)
    for (const i of g.items ?? []) {
      paths.add(i.href)
      for (const c of i.children ?? []) paths.add(c.href)
    }
  }
  // içki sahifalar: har biri alohida qidiruv natijasi (masalan, “TATU yoshlar ittifoqi”); baza vaqtinça
  // mavjud bölmasa ham qolganlari qaytariladi
  const ichki = await Promise.allSettled([
    getOtts(L).then((l) => l.filter((o) => o.leader).map((o) => `/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim/${o.leader!.slug}`)),
    getFaoliyat(L).then((f) => [
      ...f.projects.map((p) => `/faoliyat/loyihalar/${p.slug}`),
      ...f.directions.map((d) => `/faoliyat/yonalishlar/${d.slug}`),
    ]),
    getPress(L).then((l) => l.map((p) => `/axborot-xizmati/press-relizlar/${p.slug}`)),
  ])
  for (const r of ichki) if (r.status === 'fulfilled') for (const p of r.value) paths.add(p)

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
