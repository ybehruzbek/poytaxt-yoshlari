'use client'

import { usePathname } from 'next/navigation'

import { RevealMotion, type RevealOpts } from './RevealMotion'

type Opts = Omit<RevealOpts, 'root'>

/** Hamma sahifada oçilmaydigan qismlar: yöl, variantlar paneli, oçiladigan panellar */
const SKIP = '.pg-crumbs, .crumbs, [popover], .dev-panel'

/**
 * Har sahifaning öz “imzosi” — elementlar boşqa-boşqa usulda oçiladi (effektlar: RevealMotion.tsx / reveal.css).
 * Yöl tilsiz (masalan /biz-haqimizda/ittifoq). Röyxatda yöq sahifalar — UMUMIY.
 */
const UMUMIY: Opts = { head: 'mask', grid: 'rise' }

const PAGES: Record<string, Opts> = {
  // Ustav — uzun rasmiy matn, animatsiyasiz (hamma narsa darhol körinadi)
  '/hujjatlar/normativ/ustav': { skip: 'main' },

  /* ---- Biz haqimizda: sarlavhalar pastdan “suzib” çiqadi ---- */
  '/biz-haqimizda/ittifoq': {
    counters: '.it-stats b, .it-more b',
    images: '.it-mosaic img',
    img: 'circle',
    head: 'mask',
    grid: 'pop',
    fx: [
      ['.it-hist > li', 'side'],
      ['.ip-b-list > article, .ipr-b > article', 'tilt'],
      ['.it-steps > li', 'drop'],
    ],
    skip: `${SKIP}, .it-sib, [role=tablist], .fm`,
  },
  '/biz-haqimizda/markaziy-kengash': {
    head: 'mask',
    grid: 'drop',
    fx: [
      ['.y1-oc > li', 'side'],
      ['.kg-pow > li', 'slide'],
      ['.kg-lead > article', 'flip'],
      ['.kg-chips > span', 'pop'],
      ['.kg-bod > article', 'paper'],
    ],
  },
  '/biz-haqimizda/hududiy-kengash': {
    head: 'mask',
    extra: '.z5-hero',
    images: '.z5-hero-ph, .z5-card-ph',
    img: 'curtain',
    grid: 'pop',
    fx: [['.z5-hero', 'zoom']],
  },
  '/biz-haqimizda/boshlangich-tashkilotlar': {
    head: 'mask',
    extra: '.bt-hub-card',
    grid: 'pop',
    fx: [['.bt-hub-card', 'side']],
  },
  '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim': {
    head: 'mask',
    grid: 'pop',
    fx: [['.bt-chips > button', 'drop']],
  },
  '/biz-haqimizda/boshlangich-tashkilotlar/harbiy': {
    head: 'mask',
    extra: '.bt-soon',
    fx: [['.bt-soon', 'zoom']],
  },
  '/biz-haqimizda/hamkorlar': { head: 'mask', grid: 'pop', fx: [['.pt-stats > li', 'drop']] },

  /* ---- Faoliyat: sarlavhalar çapdan “çizilib” oçiladi, har bölim öz harakati bilan ---- */
  '/faoliyat/yonalishlar': {
    head: 'wipe',
    images: '.vy3-ph img',
    img: 'curtain',
    grid: 'side',
    fx: [['.vy-sum > span', 'pop']],
  },
  '/faoliyat/loyihalar': { head: 'wipe', grid: 'zoom', fx: [['.chips > button, .fa-chips > button', 'drop']] },
  '/faoliyat/tadbirlar': { head: 'wipe', grid: 'tilt', fx: [['.chips > button, .fa-chips > button', 'drop']] },
  '/faoliyat/elonlar': { head: 'wipe', grid: 'swing', fx: [['.chips > button, .fa-chips > button', 'drop']] },
  '/faoliyat/natijalar': {
    head: 'wipe',
    grid: 'pop',
    counters: '.vb-dash-tiles dd',
    fx: [['.vb-ycols > section', 'skew']],
  },

  /* ---- Hujjatlar: qoğozlar dastasi ---- */
  '/hujjatlar/normativ': { head: 'mask', grid: 'paper', fx: [['.nh-jump > a', 'drop']] },
  '/hujjatlar/kengash': { head: 'mask', grid: 'skew' },
  '/hujjatlar/namunalar': { head: 'mask', grid: 'skew' },

  /* ---- Axborot xizmati ---- */
  '/axborot-xizmati/fotogalereya': { head: 'wipe', grid: 'pop', img: 'circle' },
  '/axborot-xizmati/videogalereya': { head: 'wipe', grid: 'zoom' },
  '/axborot-xizmati/press-relizlar': { head: 'wipe', grid: 'slide' },
  '/axborot-xizmati/oav': { head: 'wipe', grid: 'tilt' },
  '/yangiliklar': { head: 'wipe', grid: 'rise', fx: [['.yn-a3-second > li', 'rise']] },

  /* ---- Boğlaniş ---- */
  '/boglanish/aloqa': {
    head: 'mask',
    extra: '.bg-mapcard',
    grid: 'slide',
    fx: [
      ['.bg-mapcard', 'zoom'],
      ['.bg-week > li', 'flip'],
      ['.bg-soc > a', 'pop'],
    ],
  },
  '/boglanish/murojaat': {
    head: 'mask',
    extra: '.cb-form, .bg-terms',
    grid: 'drop',
    fx: [['.cb-form', 'zoom']],
  },
  '/boglanish/savollar': { head: 'mask', grid: 'slide', fx: [['.chips > button', 'drop']] },
}

/**
 * Barça içki sahifalar uçun skroll animatsiyasi (layout'da). Bosh sahifada — HomeMotion.
 * Har sahifaga ötganda (`key`) qaytadan işga tuşadi.
 */
export function PageMotion({ locale }: { locale: string }) {
  const pathname = usePathname()
  const path = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
  if (path === '/') return null
  const o = PAGES[path] ?? UMUMIY
  return <RevealMotion key={pathname} root="main" skip={o.skip ?? SKIP} {...o} />
}
