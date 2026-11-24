import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { NAV } from '@/config/nav'
import { getPress } from '@/lib/cms/axborot'
import { getOtts } from '@/lib/cms/biz'
import { getFaoliyat } from '@/lib/cms/faoliyat'
import type { Media } from '@/payload-types'

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
  // har sahifaning rasmlari ham xaritaga yoziladi — Google Rasmlar va natijadagi kiçik suratlar uçun
  const rasm = new Map<string, string[]>([['', ['/og.jpg']]])
  type Item = [string, string[]]
  const ichki = await Promise.allSettled([
    getOtts(L).then((l) =>
      l.filter((o) => o.leader).map((o): Item => [`/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim/${o.leader!.slug}`, [o.leader!.img]]),
    ),
    getFaoliyat(L).then((f) => [
      ...f.projects.map((p): Item => [`/faoliyat/loyihalar/${p.slug}`, [p.cover, ...p.gallery]]),
      ...f.directions.map((d): Item => [`/faoliyat/yonalishlar/${d.slug}`, []]),
    ]),
    getPress(L).then((l) => l.map((p): Item => [`/axborot-xizmati/press-relizlar/${p.slug}`, []])),
  ])
  for (const r of ichki)
    if (r.status === 'fulfilled')
      for (const [p, imgs] of r.value) {
        paths.add(p)
        rasm.set(p, imgs)
      }

  const pages: MetadataRoute.Sitemap = [...paths].map((p) => ({ url: `${SITE}/${L}${p}`, ...rasmlar(rasm.get(p)) }))

  try {
    const payload = await getPayload({ config })
    const news = await payload.find({
      collection: 'news',
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true, image: true, gallery: true },
      limit: 5000,
      depth: 1,
      pagination: false,
    })
    for (const n of news.docs) {
      const url = (m: unknown) => (m && typeof m === 'object' ? ((m as Media).sizes?.hero?.url ?? (m as Media).url ?? '') : '')
      const imgs = [url(n.image), ...(n.gallery ?? []).map(url)]
      if (n.slug) pages.push({ url: `${SITE}/${L}/yangiliklar/${n.slug}`, lastModified: n.updatedAt, ...rasmlar(imgs) })
    }
  } catch {
    // baza vaqtinça mavjud bölmasa ham sahifalar xaritasi qaytariladi
  }
  return pages
}

/** Sahifa rasmlari: töliq manzil, takrorsiz, köpi bilan 10 ta (Google bir sahifa uçun 1000 tagaça qabul qiladi) */
function rasmlar(list: (string | null | undefined)[] | undefined) {
  const out = [...new Set((list ?? []).filter((u): u is string => Boolean(u)))]
    .slice(0, 10)
    .map((u) => (/^https?:\/\//.test(u) ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`))
  return out.length ? { images: out } : {}
}
