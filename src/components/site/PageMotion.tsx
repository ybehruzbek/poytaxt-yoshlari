'use client'

import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

import { RevealMotion } from './RevealMotion'

type Opts = Omit<ComponentProps<typeof RevealMotion>, 'root'>

/** Hamma sahifada oçilmaydigan qismlar: yöl, variantlar paneli, oçiladigan panellar */
const SKIP = '.pg-crumbs, .crumbs, [popover], .dev-panel'

/** Alohida sozlamali sahifalar (yöl tilsiz, masalan /biz-haqimizda/ittifoq) */
const PAGES: Record<string, Opts> = {
  '/biz-haqimizda/ittifoq': {
    words: '.it-mission',
    counters: '.it-stats b, .it-more b',
    images: '.it-mosaic img',
    skip: `${SKIP}, .it-sib, [role=tablist], .fm`,
  },
  '/biz-haqimizda/hududiy-kengash': {
    extra: '.z5-lead, .z5-hero',
    images: '.z5-hero-ph, .z5-card-ph',
  },
}

/**
 * Barça sahifalar uçun skroll animatsiyasi (layout'da). Bosh sahifada ishlamaydi — u yerda HomeMotion.
 * Har sahifaga ötganda (`key`) qaytadan işga tuşadi.
 */
export function PageMotion({ locale }: { locale: string }) {
  const pathname = usePathname()
  const path = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
  if (path === '/') return null
  const o = PAGES[path] ?? {}
  return <RevealMotion key={pathname} root="main" skip={o.skip ?? SKIP} {...o} />
}
