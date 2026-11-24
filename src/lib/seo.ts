/**
 * Qidiruv tizimlari uçun umumiy qiymatlar va tuzilgan maʼlumot (schema.org, JSON-LD).
 * Google va Yandex sahifadagi bu maʼlumotdan taşkilot nomi, logotipi, yöl va yangilik sanasini oladi.
 */
export const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
export const SITE_NAME = 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi'
export const SITE_DESC =
  'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşining rasmiy veb-sayti: Kengaş faoliyati, boşlanğiç taşkilotlar, yoşlar uçun imkoniyatlar, hujjatlar va yangiliklar.'

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
        url: `${SITE}/uz`,
        logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
        image: abs('/og.jpg'),
        description: SITE_DESC,
        areaServed: { '@type': 'City', name: 'Toşkent' },
        parentOrganization: { '@type': 'Organization', name: 'Özbekiston yoşlar ittifoqi' },
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#sayt`,
        name: SITE_NAME,
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
      name: it.name,
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
    headline: n.title.slice(0, 110),
    ...(n.description ? { description: n.description } : {}),
    image: [abs(n.image || '/og.jpg')],
    ...(n.published ? { datePublished: n.published } : {}),
    ...(n.modified || n.published ? { dateModified: n.modified || n.published } : {}),
    inLanguage: 'uz',
    author: n.author ? { '@type': 'Person', name: n.author } : { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/uz` },
    publisher: { '@id': ORG_ID, '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: abs('/icon-512.png') } },
  }
}
