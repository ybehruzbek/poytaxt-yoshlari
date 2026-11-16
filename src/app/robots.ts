import type { MetadataRoute } from 'next'

const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** Qidiruv tizimlari uçun: admin panel va API indekslanmaydi */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    sitemap: `${SITE}/sitemap.xml`,
  }
}
