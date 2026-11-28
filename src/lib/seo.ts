/**
 * Qidiruv tizimlari uçun umumiy qiymatlar va tuzilgan maʼlumot (schema.org, JSON-LD).
 * Google va Yandex sahifadagi bu maʼlumotdan taşkilot nomi, logotipi, yöl va yangilik sanasini oladi.
 * Qidiruvga körinadigan matnlar joriy lotin yozuvida (config/seo-lotin.ts ga qarang); sahifadagi matn — yangi alifboda.
 */
import type { Metadata } from 'next'

import { BOSH, BREND, ITTIFOQ, MUQOBIL_NOMLAR, NOM, SAHAR, SAHIFA } from '@/config/seo-lotin'
import { eskiLotin } from '@/lib/alifbo'

export const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
export const SITE_NAME = NOM
export const SITE_DESC = BOSH.d
export const SITE_TITLE = BOSH.t

/** Yangi alifbodagi matn (CMS sarlavhasi, tavsifi) → qidiruv uçun joriy lotin yozuvi */
export const lotin = (s: string | null | undefined) => (s ? eskiLotin(s) : '')
/** “Sarlavha | Yoshlar ittifoqi Toshkent” */
export const sarlavha = (t: string) => `${t} | ${BREND}`

/** Menyu sahifasining metamaʼlumoti: sarlavha, tavsif, yagona manzil va ulaşiş kartasi */
export function sahifaMeta(path: string): Metadata {
  const m = SAHIFA[path]
  if (!m) throw new Error(`seo-lotin.ts da “${path}” uchun matn yo‘q`)
  const title = sarlavha(m.t)
  return {
    title: { absolute: title },
    description: m.d,
    alternates: { canonical: `/uz${path}` },
    openGraph: { title, description: m.d, url: `/uz${path}` },
  }
}

/** Boş sahifa */
export function bashMeta(): Metadata {
  return {
    title: { absolute: BOSH.t },
    description: BOSH.d,
    alternates: { canonical: '/uz' },
    openGraph: { title: BOSH.t, description: BOSH.d, url: '/uz' },
  }
}

/** Içki sahifa (yangilik, loyiha, OTT…): CMS dagi matn joriy lotinga ögiriladi */
export function ichkiMeta(o: { title: string; description?: string | null; path: string }): Metadata {
  const title = sarlavha(lotin(o.title))
  const description = lotin(o.description) || undefined
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: o.path },
    openGraph: { title, description, url: o.path },
  }
}

/** Nisbiy manzil → töliq manzil (https://yoshkent.uz/…) */
export const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE}${path.startsWith('/') ? '' : '/'}${path}`)

export const ORG_ID = `${SITE}/#taskilot`

/** Taşkilot (har bir sahifada): nom, logotip, rasmiy ijtimoiy tarmoqlar */
export function organizationLd(sameAs: string[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE_NAME,
        alternateName: MUQOBIL_NOMLAR,
        url: `${SITE}/uz`,
        logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
        image: abs('/og.jpg'),
        description: SITE_DESC,
        areaServed: { '@type': 'City', name: SAHAR },
        parentOrganization: { '@type': 'Organization', name: ITTIFOQ },
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#sayt`,
        name: SITE_NAME,
        alternateName: BREND,
        url: `${SITE}/uz`,
        inLanguage: 'uz',
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}

/** Yöl (breadcrumbs): oxirgi band — joriy sahifa, manzilsiz ham böladi */
export function breadcrumbLd(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: lotin(it.name),
      ...(it.url ? { item: abs(it.url) } : {}),
    })),
  }
}

/** Yangilik maqolasi */
export function newsArticleLd(n: {
  url: string
  title: string
  description?: string | null
  image?: string | null
  published?: string | null
  modified?: string | null
  author?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(n.url) },
    headline: lotin(n.title).slice(0, 110),
    ...(n.description ? { description: lotin(n.description) } : {}),
    image: [abs(n.image || '/og.jpg')],
    ...(n.published ? { datePublished: n.published } : {}),
    ...(n.modified || n.published ? { dateModified: n.modified || n.published } : {}),
    inLanguage: 'uz',
    author: n.author ? { '@type': 'Person', name: lotin(n.author) } : { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/uz` },
    publisher: { '@id': ORG_ID, '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: abs('/icon-512.png') } },
  }
}

/** Savol-javoblar (FAQPage): Google ularni natijaning özida oçiladigan röyxat qilib körsatişi mumkin */
export function faqLd(list: { q: string; a: string[]; li?: string[] }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: lotin(f.q),
      acceptedAnswer: { '@type': 'Answer', text: lotin([...f.a, ...(f.li ?? []).map((x) => `— ${x}`)].join('\n')) },
    })),
  }
}
