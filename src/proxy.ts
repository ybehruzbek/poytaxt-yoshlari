import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isLocale } from './i18n/config'

/** Til ko'rsatilmagan manzillarni /uz/... ga yo'naltiradi. Admin, API va fayllarga tegmaydi. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // admin, api, Next ichki fayllari va kengaytmali fayllar (rasm, favicon...) chiqarib tashlanadi
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
