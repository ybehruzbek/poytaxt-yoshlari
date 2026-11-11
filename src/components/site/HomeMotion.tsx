'use client'

import { useEffect } from 'react'

import { DevSectionsPanel, type PanelSection } from './DevSectionsPanel'

/**
 * Bosh sahifa animatsiyalari (Apple uslubi). Bölimlar belgilanmaydi — mavjud sinflar orqali topiladi:
 * – bölimga `.m-in` (körinişga kirganda) va skroll özgaruvçilari qöyiladi:
 *   --e kiriş (0→1), --x çiqiş (0→1), --p ötiş (0→1), --s yopişqoq (sticky) bölim ičidagi progress;
 * – elementlarga `.m-i`, --i (bölimdagi tartib), --j/--n (guruh ičidagi tartib/soni), --r (tasodifiy çuqurlik).
 * Variant <html data-m-{bölim}="a|b|c"> orqali tanlanadi; uslublar motion.css da.
 */
type Sec = PanelSection & { sel: string; items: string[] }

const SECTIONS: Sec[] = [
  {
    name: 'm-hero', label: 'Boş ekran', count: 3, sel: '.hero',
    items: ['.hero-slogan > span', '.hero-text .lead', '.hero-actions', '.collage > *'],
    hints: ['Keynote kirişi', 'Çuqurlik qatlamlari', 'Sahna: qatorlar yorişadi'],
  },
  {
    name: 'm-news', label: 'Yangiliklar', count: 3, sel: '.news-sec',
    items: ['.sec-head > *', '.na-main', '.na-list > li'],
    hints: ['Yumşoq köteriliş', 'Kino kesimi', 'Ikki tomondan'],
  },
  {
    name: 'm-ev', label: 'Tadbirlar', count: 3, sel: '.ev-sec',
    items: ['.sec-head > *', '.pt-ticket'],
    hints: ['Navbat bilan', 'Yelpiğ (skroll)', '3D aylaniş'],
  },
  {
    name: 'm-opps', label: 'Imkoniyatlar', count: 3, sel: '#imkoniyatlar',
    items: ['.opps-title', '.opp'],
    hints: ['Bento', 'Rasm ičdan kattalaşadi', 'Parda'],
  },
  {
    name: 'm-about', label: 'Biz haqimizda', count: 3, sel: '#biz-haqimizda',
    items: ['.about-head h2', '.about-art > *', '.ach > div', '.about-row .body4'],
    hints: ['Matn sözma-söz yorişadi', 'Şakllar uçib keladi', 'Raqamlar kattalaşadi'],
  },
  {
    name: 'm-ben', label: 'Nega qöşiliş', count: 3, sel: 'section:has(> .benefit)',
    items: ['.ui > *', '.benefit h2', '.benefit .body4', '.values li'],
    hints: ['Çuqurlik qatlamlari', 'Ketma-ket belgilar', 'Sahna: bandlar yorişadi'],
  },
  {
    name: 'm-cta', label: 'Murojaat', count: 3, sel: '#murojaat',
    items: ['.cb-txt h2', '.cb-txt > p', '.cb-steps li', '.cb-form'],
    hints: ['Yumşoq köteriliş', 'Qadamlar va forma', 'Karta kattalaşadi'],
  },
  {
    name: 'm-sp', label: 'Ijtimoiy tarmoqlar', count: 3, sel: '.sp',
    items: ['.sp-head > *', '.sp-phone'],
    hints: ['Navbat bilan', 'Yelpiğ (skroll)', 'Suzib turadi'],
  },
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
  useEffect(() => {
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
          it.style.setProperty('--n', String(group.length))
          it.style.setProperty('--r', String(((i * 37) % 11) / 10))
        })
      })
      if (s.name === 'm-about') el.querySelectorAll<HTMLElement>('.about-head h2').forEach(splitWords)
    })

    if (reduce) return
    html.classList.add('m-ready')

    const variant = (name: string) => html.getAttribute(`data-${name}`) || 'a'
    const counters = (el: HTMLElement) => [...el.querySelectorAll<HTMLElement>('.ach b')]
    const enter = (el: HTMLElement) => {
      el.classList.add('m-in')
      if (el.dataset.m === 'm-about' && variant('m-about') !== 'c') countUp(counters(el))
    }

    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && enter(e.target as HTMLElement)),
      { threshold: 0.15 },
    )
    found.forEach(({ el }) => io.observe(el))

    // Skroll özgaruvçilari
    let raf = 0
    const update = () => {
      raf = 0
      const vh = innerHeight
      found.forEach(({ el }) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -vh || r.top > vh * 2) return
        const st = el.style
        st.setProperty('--e', clamp((vh - r.top) / (vh * 0.75)).toFixed(4))
        st.setProperty('--x', clamp(-r.top / Math.max(r.height, 1)).toFixed(4))
        st.setProperty('--p', clamp((vh - r.top) / (vh + r.height)).toFixed(4))
        st.setProperty('--s', clamp(-r.top / Math.max(r.height - vh, 1)).toFixed(4))
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)

    // Variant almaşganda: bölimga ötib, animatsiyani boşidan körsatiş va nomini yozib qöyiş
    const toast = document.createElement('div')
    toast.className = 'm-toast'
    document.body.append(toast)
    let toastT = 0
    const born = performance.now() // sahifa yuklanişidagi dastlabki tiklaşni almaşiş deb hisoblamaslik
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => {
        const name = m.attributeName?.replace(/^data-/, '')
        const hit = found.find((f) => f.s.name === name)
        const v = html.getAttribute(m.attributeName!) || 'a'
        if (!hit || m.oldValue === v || m.oldValue === null || performance.now() - born < 1200) return
        const { el, s } = hit
        toast.textContent = `${s.label}: ${v.toUpperCase()} — ${s.hints?.[v.charCodeAt(0) - 97] ?? ''}`
        toast.classList.add('on')
        clearTimeout(toastT)
        toastT = window.setTimeout(() => toast.classList.remove('on'), 2600)

        // 1) yaşirin holatga bir zumda qaytariş (öçiş animatsiyasisiz)
        el.classList.add('m-reset')
        el.classList.remove('m-in')
        counters(el).forEach((b) => b.dataset.mOrig && (b.textContent = b.dataset.mOrig))
        // 2) bölim pastdan kirib kelişi uçun undan sal yuqoriga sakrab, keyin silliq tuşiş
        const top = el.getBoundingClientRect().top + scrollY
        if (top > 0) scrollTo({ top: Math.max(0, top - innerHeight * 0.85), behavior: 'instant' })
        void el.offsetWidth
        el.classList.remove('m-reset')
        onScroll()
        requestAnimationFrame(() => {
          if (top > 0) scrollTo({ top: Math.max(0, top - 90), behavior: 'smooth' })
          setTimeout(() => enter(el), top > 0 ? 250 : 80)
        })
      })
    })
    mo.observe(html, { attributes: true, attributeOldValue: true, attributeFilter: SECTIONS.map((s) => `data-${s.name}`) })

    return () => {
      io.disconnect()
      mo.disconnect()
      toast.remove()
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      html.classList.remove('m-ready')
    }
  }, [])

  return <DevSectionsPanel sections={SECTIONS.map(({ name, label, count, hints }) => ({ name, label, count, hints }))} />
}
