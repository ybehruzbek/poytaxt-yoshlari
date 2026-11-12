'use client'

import { useLayoutEffect } from 'react'

import { motionOff, startReveal } from './RevealMotion'

/**
 * Bosh sahifa animatsiyasi: bölimlar elementlari RevealMotion bilan bir xil fade-up bilan çiqadi
 * (birinçi ekran — boş ekran — yaşirilmaydi), “Biz haqimizda” raqamlari sanaladi, sarlavha
 * (SplitWords) söz-söz yorişadi. Boş ekranga faqat skroll paralaksi (--x, motion.css).
 */
const ITEMS = [
  '.news-sec .sec-head > *',
  '.news-sec .na-main',
  '.news-sec .na-list > li',
  '.ev-sec .sec-head > *',
  '.ev-sec .pt-ticket',
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
    const stop = startReveal({ root: 'main', items: ITEMS, counters: '#biz-haqimizda .ach b' })
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
