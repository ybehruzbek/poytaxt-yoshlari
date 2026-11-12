'use client'

import { usePathname } from 'next/navigation'

import { RevealMotion, type RevealOpts } from './RevealMotion'

type Opts = Omit<RevealOpts, 'root'>

/** Hamma sahifada oçilmaydigan qismlar: yöl, variantlar paneli, oçiladigan panellar */
const SKIP = '.pg-crumbs, .crumbs, [popover], .dev-panel'

/**
 * Sahifaga xos sozlamalar (yöl tilsiz). Effekt hamma joyda bir xil (reveal.css); bu yerda faqat
 * qaysi suratlar / raqamlar alohida işlaşi belgilanadi. Röyxatda yöq sahifalar — sukut böyiça.
 */
const PAGES: Record<string, Opts> = {
  // Ustav — uzun rasmiy matn, animatsiyasiz
  '/hujjatlar/normativ/ustav': { skip: 'main' },
  '/biz-haqimizda/ittifoq': {
    counters: '.it-stats b, .it-more b',
    images: '.it-mosaic img',
    skip: `${SKIP}, .it-sib, [role=tablist], .fm`,
  },
  '/faoliyat/natijalar': { counters: '.vb-dash-tiles dd' },
}

/**
 * Barça içki sahifalar uçun skroll animatsiyasi (layout'da). Bosh sahifada — HomeMotion.
 * Har sahifaga ötganda (`key`) qaytadan işga tuşadi.
 */
export function PageMotion({ locale }: { locale: string }) {
  const pathname = usePathname()
  const path = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
  if (path === '/') return null
  const o = PAGES[path] ?? {}
  return <RevealMotion key={pathname} root="main" skip={SKIP} {...o} />
}
