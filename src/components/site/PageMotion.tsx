'use client'

import { usePathname } from 'next/navigation'

import { RevealMotion, type RevealOpts } from './RevealMotion'

type Opts = Omit<RevealOpts, 'root'>

/** Hamma sahifada oçilmaydigan qismlar: yöl, variantlar paneli, oçiladigan panellar */
const SKIP = '.pg-crumbs, .crumbs, [popover], .dev-panel'

/**
 * Barça sahifalarda elementlar bir xil usulda oçiladi (RevealMotion.tsx / reveal.css).
 * Bu yerda faqat sahifaga xos sozlamalar: sanaladigan raqamlar, suratlar, qöşimça yoki çiqarib taşlanadigan qismlar.
 * Yöl tilsiz (masalan /biz-haqimizda/ittifoq).
 */
const PAGES: Record<string, Opts> = {
  // Ustav — uzun rasmiy matn, animatsiyasiz (hamma narsa darhol körinadi)
  '/hujjatlar/normativ/ustav': { skip: 'main' },
  '/biz-haqimizda/ittifoq': {
    counters: '.it-stats b, .it-more b',
    images: '.it-mosaic img',
    skip: `${SKIP}, .it-sib, [role=tablist], .fm`,
  },
  '/biz-haqimizda/hududiy-kengash': { extra: '.z5-hero', images: '.z5-hero-ph, .z5-card-ph' },
  '/biz-haqimizda/boshlangich-tashkilotlar': { extra: '.bt-hub-card' },
  '/biz-haqimizda/boshlangich-tashkilotlar/harbiy': { extra: '.bt-soon' },
  '/faoliyat/natijalar': { counters: '.vb-dash-tiles dd' },
  '/boglanish/aloqa': { extra: '.bg-mapcard' },
  '/boglanish/murojaat': { extra: '.cb-form, .bg-terms' },
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
  return <RevealMotion key={pathname} root="main" skip={o.skip ?? SKIP} {...o} />
}
