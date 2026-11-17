'use client'

import { useLayoutEffect } from 'react'

/**
 * Saytning skroll animatsiyasi (uslublar: reveal.css). Sahifa kodiga tegmaydi — elementlarni
 * mavjud teglar va sinflar orqali topadi va faqat sinf / CSS özgaruvçilarini qöyadi (DOM tuzilişi özgarmaydi):
 * – sarlavha, matn, karta, röyxat bandi — ekranga kirganda bir xil yumşoq harakat bilan çiqadi
 *   (xiradan sal köteriliş; suratlar — faqat xiradan);
 * – `counters` raqamlari 0 dan sanaladi;
 * – `.split-words` (SplitWords) sarlavhalari skroll bilan söz-söz yorişadi.
 *
 * Tezlik: ekranga kiriş brauzerning IntersectionObserver'i bilan kuzatiladi — skroll paytida elementlar
 * ölçanmaydi (kuçsiz telefonda qotmaslik uçun). Ölçaş faqat bir marta, sahifa oçilganda, bitta öqiş bosqiçida.
 * Birinçi ekrandagi mazmun heç qaçon yaşirilmaydi (u CSS bilan, yuklanişda oçiladi — reveal.css);
 * “harakatni kamaytiriş”, öqiş rejimi va kuçsiz qurilmalar uçun yengil rejimda (html[data-lite]) hammasi darhol körinadi.
 */

export type RevealOpts = {
  root: string
  /** aniq elementlar (berilmasa — avtomatik topiladi) */
  items?: string
  counters?: string
  images?: string
  skip?: string
  /** qöşimça oçiladigan elementlar (avtomatik topilganlardan taşqari) */
  extra?: string
}

const STAGGER_MS = 40
const STAGGER_MAX = 5 // 6 ta elementdan keyin navbat ösmaydi
const ANIM_MS = 700 // reveal.css dagi eng uzun effekt + zaxira
const COUNT_MS = 1200
/** element ekranning pastki 8% qismidan yuqoriga çiqqanda oçiladi */
const MARGIN = '0px 0px -8% 0px'

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/** “Harakatni kamaytiriş”, A11yPanel öqiş rejimi yoki kuçsiz qurilma uçun yengil rejim yoqilganmi */
export const motionOff = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.hasAttribute('data-a11y-read') ||
  document.documentElement.hasAttribute('data-lite')

const SKIP_TAGS = new Set(['P', 'H2', 'H3', 'SPAN', 'B', 'STRONG', 'EM', 'A', 'BR', 'svg', 'path', 'I', 'SMALL'])

/** Avtomatik topiş: töplamlar (kamida 3 ta bir xil teg-farzand), sarlavhalar va matnlar */
function autoItems(host: HTMLElement, add: (e: HTMLElement) => void) {
  host.querySelectorAll<HTMLElement>('*').forEach((e) => {
    const kids = e.children
    if (kids.length < 3 || SKIP_TAGS.has(e.tagName)) return
    const tag = kids[0].tagName
    for (let i = 1; i < kids.length; i++) if (kids[i].tagName !== tag) return
    // butun bölimlar yoki variant örama-lari töplam emas
    if (tag === 'SECTION' || e.parentElement?.closest('li') || e.querySelector(':scope > .vx')) return
    for (const k of kids) add(k as HTMLElement)
  })
  host
    .querySelectorAll<HTMLElement>('h1, h2, .sec-head, h1 ~ p, h2 ~ p, h1 ~ div, .btn, blockquote, figure')
    .forEach((e) => {
      if (e.closest('li, article') || e.querySelector('.split-words')) return
      add(e)
    })
}

/** Raqamni 0 dan sanaydi — faqat mavjud matn tugunining qiymati özgaradi (React tugunlari joyida qoladi) */
function countUp(el: HTMLElement, rafs: Set<number>) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let node: Text | null = null
  while (walker.nextNode()) {
    const t = walker.currentNode as Text
    if (/\d/.test(t.nodeValue || '')) {
      node = t
      break
    }
  }
  if (!node) return
  const text = node
  const orig = text.nodeValue || ''
  const m = orig.match(/^(\D*)(\d[\d\s ]*)(.*)$/s)
  if (!m || /^[.,]\d/.test(m[3])) return // kasr sonlar (1,87 mln) sanalmaydi
  const digits = m[2].replace(/[\s ]/g, '')
  const to = Number(digits)
  // yillar (2017) sanalmaydi
  if (!to || to > 1e7 || (/^(19|20)\d\d$/.test(digits) && !m[3].trim())) return
  const tail = m[2].match(/[\s ]+$/)?.[0] ?? ''
  const grouped = /\d[\s ]\d/.test(m[2])
  const fmt = (n: number) => (grouped ? n.toLocaleString('ru-RU') : String(n))
  // sanaş paytida element yakuniy kengligida qotiriladi — oraliq raqamlar kengroq bölsa ham qöşni matn “sakramaydi”
  el.style.width = `${el.offsetWidth}px`
  el.classList.add('rv-count')
  const t0 = performance.now()
  const tick = (t: number) => {
    const k = clamp((t - t0) / COUNT_MS)
    if (k < 1) {
      text.nodeValue = `${m[1]}${fmt(Math.round(to * (1 - Math.pow(1 - k, 4))))}${tail}${m[3]}`
      rafs.add(requestAnimationFrame(tick))
    } else {
      text.nodeValue = orig
      el.classList.remove('rv-count')
      el.style.removeProperty('width')
    }
  }
  text.nodeValue = `${m[1]}0${tail}${m[3]}`
  rafs.add(requestAnimationFrame(tick))
  return () => {
    text.nodeValue = orig
    el.classList.remove('rv-count')
    el.style.removeProperty('width')
  }
}

/** Birinçi yuklaniş ötdimi (keyingi işga tuşişlar — sahifalar orasida ötiş) */
let navigated = false

/** Animatsiyani işga tuşiradi; töxtatiş funksiyasini qaytaradi */
export function startReveal(o: RevealOpts): () => void {
  const html = document.documentElement
  const host = document.querySelector<HTMLElement>(o.root)
  if (!host || motionOff() || typeof IntersectionObserver === 'undefined') return () => {}

  const skipped = (e: Element) => !!o.skip && !!e.closest(o.skip)

  // 1) nomzodlar yiğiladi (DOM faqat öqiladi)
  const cand = new Set<HTMLElement>()
  const imgs = new Set<HTMLElement>()
  const add = (e: HTMLElement) => {
    if (!skipped(e)) cand.add(e)
  }
  if (o.images)
    host.querySelectorAll<HTMLElement>(o.images).forEach((e) => {
      if (!skipped(e)) (cand.add(e), imgs.add(e))
    })
  if (o.items) host.querySelectorAll<HTMLElement>(o.items).forEach(add)
  else autoItems(host, add)
  if (o.extra) host.querySelectorAll<HTMLElement>(o.extra).forEach(add)
  const heads = [...host.querySelectorAll<HTMLElement>('.split-words')].filter((h) => !skipped(h))
  const numsAll = o.counters ? [...host.querySelectorAll<HTMLElement>(o.counters)].filter((n) => !skipped(n)) : []

  // 2) bitta öqiş bosqiçi: birinçi ekrandan pastdagilari tanlanadi. Sahifa yuklanişida (mazmun SSR dan
  // çizilgan) — sahifa boşidan ham, hozirgi körinişdan ham pastda bölsa; sahifalar orasida ötganda
  // (skroll hali eski sahifaniki) — faqat sahifa boşiga nisbatan.
  const vh = innerHeight
  const sy = scrollY
  const nav = navigated
  if (!navigated) setTimeout(() => (navigated = true), 0)
  const below = (e: Element) => {
    const r = e.getBoundingClientRect()
    return r.height > 0 && r.top + sy > vh && (nav || r.top > vh)
  }
  const low = new Set([...cand].filter(below))
  // ichma-ich elementlardan faqat taşqisi animatsiya qilinadi
  const items = [...low].filter((e) => {
    for (let p = e.parentElement; p && p !== host; p = p.parentElement) if (low.has(p)) return false
    return true
  })
  const nums = numsAll.filter(below)

  // 3) yozuv bosqiçi: yaşiriş sinflari bir yöla qöyiladi
  for (const e of items) {
    e.classList.add('rv')
    if (imgs.has(e)) e.classList.add('rv-img')
  }
  html.classList.add('rv-ready')

  const timers: number[] = []
  const rafs = new Set<number>()
  const restores: Array<() => void> = []
  const clean = (el: HTMLElement) => {
    el.classList.remove('rv', 'rv-in', 'rv-img')
    el.style.removeProperty('--d')
  }

  // bir kadrda ekranga kirganlar navbat bilan (yuqoridan pastga) çiqadi
  let batch: HTMLElement[] = []
  let batchRaf = 0
  const flush = () => {
    batchRaf = 0
    const list = batch
    batch = []
    list.forEach((el, i) => {
      const d = Math.min(i, STAGGER_MAX) * STAGGER_MS
      el.style.setProperty('--d', `${d}ms`)
      el.classList.add('rv-in')
      // çiqib bölgaç sinflar olinadi — elementning öz hover/transition uslublari qaytadi
      timers.push(window.setTimeout(() => clean(el), d + ANIM_MS))
    })
  }
  const pending = new Set<HTMLElement>([...items, ...nums])
  const show = (el: HTMLElement) => {
    if (!pending.delete(el)) return
    io.unobserve(el)
    if (el.classList.contains('rv')) batch.push(el)
    else {
      const r = countUp(el, rafs)
      if (r) restores.push(r)
    }
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) if (en.isIntersecting) show(en.target as HTMLElement)
      if (batch.length && !batchRaf) batchRaf = requestAnimationFrame(flush)
    },
    { rootMargin: MARGIN },
  )
  items.forEach((e) => io.observe(e))
  nums.forEach((n) => io.observe(n))

  // Zaxira: gorizontal lenta yoki overflow:hidden içidagi element IntersectionObserver uçun “körinmaydi”.
  // Skroll töxtagaç (har 150 ms dan köp emas) qolganlari faqat vertikal holati böyiça tekşiriladi;
  // sahifa oxiriga yetilsa — hammasi oçiladi.
  let sweepT = 0
  const sweep = () => {
    sweepT = 0
    if (!pending.size) return
    const h = innerHeight
    const end = scrollY + h >= document.documentElement.scrollHeight - 4
    const hit = [...pending].filter((el) => end || el.getBoundingClientRect().top < h * 0.92)
    hit.forEach(show)
    if (batch.length && !batchRaf) batchRaf = requestAnimationFrame(flush)
  }
  const onSweep = () => {
    if (!sweepT && pending.size) sweepT = window.setTimeout(sweep, 150)
  }
  addEventListener('scroll', onSweep, { passive: true })

  // söz-söz yorişadigan sarlavhalar: faqat ekranda turganlari, skroll kadrida avval öqiladi, keyin yoziladi
  const active = new Set<HTMLElement>()
  let raf = 0
  const paint = () => {
    raf = 0
    const h = innerHeight
    const vals = [...active].map((el) => [el, clamp((h * 0.9 - el.getBoundingClientRect().top) / (h * 0.5))] as const)
    for (const [el, t] of vals) el.style.setProperty('--t', t.toFixed(3))
  }
  const onScroll = () => {
    if (!raf && active.size) raf = requestAnimationFrame(paint)
  }
  const hio = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const el = en.target as HTMLElement
      if (en.isIntersecting) active.add(el)
      else active.delete(el)
    }
    onScroll()
  })
  heads.forEach((h) => hio.observe(h))
  if (heads.length) addEventListener('scroll', onScroll, { passive: true })

  let stopped = false
  const stop = () => {
    if (stopped) return
    stopped = true
    io.disconnect()
    hio.disconnect()
    cancelAnimationFrame(raf)
    cancelAnimationFrame(batchRaf)
    rafs.forEach(cancelAnimationFrame)
    restores.forEach((r) => r())
    timers.forEach(clearTimeout)
    removeEventListener('scroll', onScroll)
    removeEventListener('scroll', onSweep)
    clearTimeout(sweepT)
    mo.disconnect()
    mq.removeEventListener('change', onPref)
    items.forEach(clean)
    heads.forEach((h) => h.style.removeProperty('--t'))
    html.classList.remove('rv-ready')
  }
  // öqiş rejimi yoki “harakatni kamaytiriş” keyin yoqilsa — hammasi darhol körinadi
  const onPref = () => motionOff() && stop()
  const mq = matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onPref)
  const mo = new MutationObserver(onPref)
  mo.observe(html, { attributes: true, attributeFilter: ['data-a11y-read', 'data-lite'] })
  return stop
}

/** Içki sahifalar uçun (PageMotion orqali) */
export function RevealMotion({ root, items, counters, images, skip, extra }: RevealOpts) {
  // useLayoutEffect: yangi mazmun çizilişidan oldin tayyorlanadi
  useLayoutEffect(
    () => startReveal({ root, items, counters, images, skip, extra }),
    [root, items, counters, images, skip, extra],
  )
  return null
}
