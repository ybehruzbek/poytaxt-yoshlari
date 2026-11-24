import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isLive, isLocale } from './i18n/config'

/**
 * Til ko'rsatilmagan manzillarni /uz/... ga yo'naltiradi. Admin, API va fayllarga tegmaydi.
 * Xavfsizlik: redirect manzili so'rovdagi Host sarlavhasidan emas, sozlamadagi
 * ishonchli domendan (NEXT_PUBLIC_SERVER_URL) quriladi — Host header injection / open redirect'ning oldi olinadi.
 */
/** Admin panel tili: foydalanuvçi tanlamagan bölsa (cookie yöq) — özbekça; brauzer tiliga qaralmaydi */
const ADMIN_LNG = 'payload-lng'

/**
 * Sessiya tokenidagi rol (faqat yönaltiriş uçun, imzo tekşirilmaydi). Haqiqiy taqiq Payload'da:
 * Users.access.admin — eski panelga faqat administrator kiradi.
 */
function tokenRole(request: NextRequest): string | null {
  const t = request.cookies.get('payload-token')?.value
  if (!t) return null
  try {
    const part = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return (JSON.parse(atob(part)) as { role?: string }).role ?? null
  } catch {
    return null
  }
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    // kirgan, lekin administrator bölmagan xodim yangi panelga ötkaziladi
    const role = tokenRole(request)
    if (role && role !== 'admin') {
      // manzil Host sarlavhasidan emas, ishonçli domendan quriladi (pastdagi qoida bilan bir xil)
      const base = process.env.NEXT_PUBLIC_SERVER_URL
      return NextResponse.redirect(new URL('/boshqaruv', base || request.nextUrl.origin))
    }
    if (request.cookies.has(ADMIN_LNG)) return NextResponse.next()
    // şu söröv ham özbekça çizilsin: cookie söröv sarlavhasiga qöşiladi, javobda esa brauzerga saqlanadi
    const headers = new Headers(request.headers)
    headers.set('cookie', [request.headers.get('cookie'), `${ADMIN_LNG}=uz`].filter(Boolean).join('; '))
    const res = NextResponse.next({ request: { headers } })
    res.cookies.set(ADMIN_LNG, 'uz', { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
    return res
  }
  const first = pathname.split('/')[1]
  if (isLocale(first) && isLive(first)) return NextResponse.next()

  // til yöq — /uz qöşiladi; tarjimasi tayyor bölmagan til (/ru, /en) — vaqtinça özbekça nusxasiga
  const rest = isLocale(first) ? pathname.slice(first.length + 1) : pathname
  const target = `/${defaultLocale}${rest === '/' ? '' : rest}${search}`
  // til körsatilmagan manzil doimiy (308) — qidiruv tizimlari /uz ni asosiy deb biladi;
  // /ru va /en vaqtinça (307) — tarjima tayyor bölganda öz manzillari qaytadi
  const status = isLocale(first) ? 307 : 308
  const base = process.env.NEXT_PUBLIC_SERVER_URL
  if (base) return NextResponse.redirect(new URL(target, base), status)
  // Ishonchli domen sozlanmagan (faqat lokal ishlab chiqishda kutiladi) — joriy so'rov manzili ishlatiladi.
  // Serverda NEXT_PUBLIC_SERVER_URL ALBATTA sozlanishi kerak.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url, status)
}

export const config = {
  // admin, boshqaruv (yangi panel), api, Next ichki fayllari va kengaytmali fayllar (rasm, favicon...) chiqarib tashlanadi
  matcher: ['/((?!admin|boshqaruv|api|_next|.*\\..*).*)', '/admin', '/admin/:path*'],
}
