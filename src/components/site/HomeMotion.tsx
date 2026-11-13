'use client'

import { useLayoutEffect } from 'react'

import { motionOff, startReveal } from './RevealMotion'

/**
 * Bosh sahifa animatsiyasi: har bölim öz harakati bilan oçiladi (RevealMotion effektlari):
 * yangiliklar — yumşoq köteriliş, tadbirlar — navbat bilan, imkoniyatlar — bento kataklari kattalaşadi,
 * “Biz haqimizda” — raqamlar sanaladi va sarlavha (SplitWords) söz-söz yorişadi, “Nega qöşiliş” — çapdan,
 * belgilar “sakrab”, murojaat şakli — kattadan, ijtimoiy tarmoqlar — kiçikdan.
 * Boş ekran yuklanişda CSS bilan oçiladi (reveal.css), skrollda paralaks (--x, motion.css).
 */
const FX = [
  ['.news-sec .na-main, .news-sec .na-list > li', 'rise'],
  ['.ev-sec .ev-rows > li', 'tilt'],
  ['#imkoniyatlar .opp', 'grow'],
  ['#imkoniyatlar .opps-title', 'mask'],
  ['#biz-haqimizda .ach > div', 'pop'],
  ['.benefit h2, .benefit .body4, .benefit .values li', 'slide'],
  ['#murojaat .cb-steps li', 'side'],
  ['#murojaat .cb-form', 'zoom'],
  ['.sp .sp-phone', 'pop'],
  ['.sec-head > h2', 'mask'],
] as const
const ITEMS = [
  '.news-sec .sec-head > *',
  '.news-sec .na-main',
  '.news-sec .na-list > li',
  '.ev-sec .sec-head > *',
  '.ev-sec .ev-rows > li',
  '#imkoniyatlar .opps-title',
  '#imkoniyatlar .opp',
  '#biz-haqimizda .about-art > *',
  '#biz-haqimizda .ach > div',
  '#biz-haqimizda .about-row .body4',
  '.benefit h2',
  '.benefit .body4',
  '.benefit .values li',
  '#murojaat .cb-txt h2',
  '#murojaat .cb-txt > p',
  '#murojaat .cb-steps li',
  '#murojaat .cb-form',
  '.sp .sp-head > *',
  '.sp .sp-phone',
].join(', ')

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export function HomeMotion() {
  useLayoutEffect(() => {
    const stop = startReveal({ root: 'main', items: ITEMS, counters: '#biz-haqimizda .ach b', fx: FX })
    const hero = document.querySelector<HTMLElement>('.hero')
    if (!hero || motionOff()) return stop

    const html = document.documentElement
    html.classList.add('m-ready')
    let raf = 0
    const update = () => {
      raf = 0
      const r = hero.getBoundingClientRect()
      hero.style.setProperty('--x', clamp(-r.top / Math.max(r.height, 1)).toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)

    return () => {
      stop()
      cancelAnimationFrame(raf)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      hero.style.removeProperty('--x')
      html.classList.remove('m-ready')
    }
  }, [])

  return null
}
