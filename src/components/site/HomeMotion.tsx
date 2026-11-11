'use client'

import { useLayoutEffect } from 'react'

/**
 * Bosh sahifa animatsiyalari (Apple uslubi). Bölimlar belgilanmaydi — mavjud sinflar orqali topiladi:
 * – bölimga `.m-in` (körinişga kirganda) va --x (bölimdan çiqiş progressi, 0→1) qöyiladi;
 * – söz-söz yorişadigan sarlavhaga --t (skroll progressi) qöyiladi;
 * – elementlarga `.m-i`, --i (bölimdagi tartib) va --j (öz guruhidagi tartib).
 * Uslublar motion.css da.
 */
type Sec = { name: string; sel: string; items: string[] }

const SECTIONS: Sec[] = [
  { name: 'm-hero', sel: '.hero', items: ['.hero-slogan > span', '.hero-text .lead', '.hero-actions', '.collage > *'] },
  { name: 'm-news', sel: '.news-sec', items: ['.sec-head > *', '.na-main', '.na-list > li'] },
  { name: 'm-ev', sel: '.ev-sec', items: ['.sec-head > *', '.pt-ticket'] },
  { name: 'm-opps', sel: '#imkoniyatlar', items: ['.opps-title', '.opp'] },
  { name: 'm-about', sel: '#biz-haqimizda', items: ['.about-head h2', '.about-art > *', '.ach > div', '.about-row .body4'] },
  { name: 'm-ben', sel: 'section:has(> .benefit)', items: ['.ui > *', '.benefit h2', '.benefit .body4', '.values li'] },
  { name: 'm-cta', sel: '#murojaat', items: ['.cb-txt h2', '.cb-txt > p', '.cb-steps li', '.cb-form'] },
  { name: 'm-sp', sel: '.sp', items: ['.sp-head > *', '.sp-phone'] },
]

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Sözlarni <span class="m-w"> ga börib çiqadi (matn yorişişi uçun) */
function splitWords(root: HTMLElement) {
  if (root.dataset.mSplit) return
  root.dataset.mSplit = '1'
  let w = 0
  const walk = (node: Node) => {
    ;[...node.childNodes].forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment()
        ;(ch.textContent || '').split(/(\s+)/).forEach((part) => {
          if (!part) return
          if (/^\s+$/.test(part)) frag.append(part)
          else {
            const s = document.createElement('span')
            s.className = 'm-w'
            s.style.setProperty('--w', String(w++))
            s.textContent = part
            frag.append(s)
          }
        })
        ch.replaceWith(frag)
      } else walk(ch)
    })
  }
  walk(root)
  root.style.setProperty('--wn', String(w))
}

/** Raqamlarni 0 dan sanab çiqadi (100+ → 0…100+) */
function countUp(els: HTMLElement[]) {
  els.forEach((el) => {
    const orig = el.dataset.mOrig ?? (el.dataset.mOrig = el.textContent || '')
    const m = orig.match(/^(\d+)(.*)$/)
    if (!m) return
    const to = Number(m[1])
    const t0 = performance.now()
    const tick = (t: number) => {
      const k = clamp((t - t0) / 1600)
      el.textContent = `${Math.round(to * (1 - Math.pow(1 - k, 4)))}${m[2]}`
      if (k < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

export function HomeMotion() {
  useLayoutEffect(() => {
    const html = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const found = SECTIONS.map((s) => ({ s, el: document.querySelector<HTMLElement>(s.sel) })).filter(
      (x): x is { s: Sec; el: HTMLElement } => !!x.el,
    )

    found.forEach(({ s, el }) => {
      el.dataset.m = s.name
      let i = 0
      s.items.forEach((sel) => {
        const group = [...el.querySelectorAll<HTMLElement>(sel)]
        group.forEach((it, j) => {
          it.classList.add('m-i')
          it.style.setProperty('--i', String(i++))
          it.style.setProperty('--j', String(j))
        })
      })
      if (s.name === 'm-about') el.querySelectorAll<HTMLElement>('.about-head h2').forEach(splitWords)
    })

    if (reduce) {
      html.classList.remove('motion-boot')
      return
    }
    html.classList.add('m-ready')
    // boşlanğiç (yaşirin) holat hisoblansin, keyin mazmun oçiladi — birinçi ekran ham animatsiya bilan çiqadi
    void document.body.offsetWidth
    html.classList.remove('motion-boot')

    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          el.classList.add('m-in')
          io.unobserve(el)
          if (el.dataset.m === 'm-about') countUp([...el.querySelectorAll<HTMLElement>('.ach b')])
        }),
      { threshold: 0.15 },
    )
    found.forEach(({ el }) => io.observe(el))

    // Skroll özgaruvçilari: boş ekrandan çiqiş (--x) va söz-söz yorişadigan sarlavha (--t)
    const hero = found.find((f) => f.s.name === 'm-hero')?.el
    const heads = [...document.querySelectorAll<HTMLElement>('[data-m-split]')]
    let raf = 0
    const update = () => {
      raf = 0
      const vh = innerHeight
      if (hero) {
        const r = hero.getBoundingClientRect()
        hero.style.setProperty('--x', clamp(-r.top / Math.max(r.height, 1)).toFixed(4))
      }
      // sarlavha ekran pastidan (90%) örtasiğa (40%) çiqquncha yorişadi
      heads.forEach((h) => {
        h.style.setProperty('--t', clamp((vh * 0.9 - h.getBoundingClientRect().top) / (vh * 0.5)).toFixed(4))
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      html.classList.remove('m-ready')
    }
  }, [])

  return null
}
