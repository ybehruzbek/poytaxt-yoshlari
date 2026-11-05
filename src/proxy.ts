import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isLocale } from './i18n/config'

/**
 * Til ko'rsatilmagan manzillarni /uz/... ga yo'naltiradi. Admin, API va fayllarga tegmaydi.
 * Xavfsizlik: redirect manzili so'rovdagi Host sarlavhasidan emas, sozlamadagi
 * ishonchli domendan (NEXT_PUBLIC_SERVER_URL) quriladi — Host header injection / open redirect'ning oldi olinadi.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()

  const target = `/${defaultLocale}${pathname === '/' ? '' : pathname}${search}`
  const base = process.env.NEXT_PUBLIC_SERVER_URL
  if (base) return NextResponse.redirect(new URL(target, base))
  // Ishonchli domen sozlanmagan (faqat lokal ishlab chiqishda kutiladi) — joriy so'rov manzili ishlatiladi.
  // Serverda NEXT_PUBLIC_SERVER_URL ALBATTA sozlanishi kerak.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // admin, api, Next ichki fayllari va kengaytmali fayllar (rasm, favicon...) chiqarib tashlanadi
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
