'use client'

import { useLayoutEffect } from 'react'

import { startReveal } from './RevealMotion'

/**
 * Bosh sahifa animatsiyasi: bölimlar ekranga kirganda saytning yagona yumşoq harakati bilan oçiladi
 * (RevealMotion), “Biz haqimizda” raqamlari sanaladi va sarlavha (SplitWords) söz-söz yorişadi.
 * Boş ekran yuklanişda CSS bilan oçiladi (reveal.css); skrolldagi paralaks — faqat CSS (motion.css), JS işlatmaydi.
 */
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

export function HomeMotion() {
  useLayoutEffect(() => startReveal({ root: 'main', items: ITEMS, counters: '#biz-haqimizda .ach b' }), [])
  return null
}
