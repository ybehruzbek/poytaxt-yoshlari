'use client'

import { useLayoutEffect } from 'react'

/**
 * Saytning skroll animatsiyasi (uslublar: reveal.css). Sahifa kodiga tegmaydi — elementlarni
 * mavjud teglar va sinflar orqali topadi va faqat sinf / CSS özgaruvçilarini qöyadi (DOM tuzilişi özgarmaydi):
 * – sarlavha, matn, karta, ro'yxat bandi — ekranga kirganda çiqadi; har sahifa öz “imzosi” bilan
 *   (effektlar löğati: head — sarlavhalar, grid — töplamlar, img — suratlar, fx — aniq elementlar);
 * – `counters` raqamlari 0 dan sanaladi;
 * – `.split-words` (SplitWords) sarlavhalari skroll bilan söz-söz yorişadi.
 * Birinçi ekrandagi mazmun heç qaçon yaşirilmaydi (u CSS bilan, yuklanişda oçiladi — reveal.css);
 * “harakatni kamaytiriş” va öqiş rejimida hammasi darhol körinadi.
 */

/** Effektlar löğati (reveal.css dagi .fx-* bilan) */
export type Fx =
  | 'up'
  | 'rise'
  | 'grow'
  | 'pop'
  | 'drop'
  | 'side'
  | 'slide'
  | 'swing'
  | 'zoom'
  | 'skew'
  | 'paper'
  | 'tilt'
  | 'flip'
  | 'mask'
  | 'wipe'
  | 'curtain'
  | 'circle'

export type RevealOpts = {
  root: string
  /** aniq elementlar (berilmasa — avtomatik topiladi) */
  items?: string
  counters?: string
  images?: string
  skip?: string
  /** qöşimça oçiladigan elementlar (avtomatik topilganlardan taşqari) */
  extra?: string
  /** h1/h2 va .sec-head effekti */
  head?: Fx
  /** töplam (kartalar, ro'yxat) elementlari effekti */
  grid?: Fx
  /** suratlar effekti (sukut — ramkadan oçiliş) */
  img?: Fx
  /** aniq elementlar uçun effekt: [selektor, effekt] — birinçi mos kelgani olinadi */
  fx?: ReadonlyArray<readonly [string, Fx]>
}

const STAGGER_MS = 80
const STAGGER_MAX = 7 // 8 ta elementdan keyin navbat ösmaydi
const ANIM_MS = 1400 // eng uzun effekt (curtain/circle/swing) + zaxira
const COUNT_MS = 1600
/** juda baland elementlarda kuçli harakat ğalati körinadi — ular uçun faqat yumşoq effektlar */
const SOFT = /^(up|rise|mask|wipe|curtain|circle|zoom)$/

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/** “Harakatni kamaytiriş” yoki A11yPanel öqiş rejimi yoqilganmi */
export const motionOff = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.hasAttribute('data-a11y-read')

const SKIP_TAGS = new Set([
  'P',
  'H2',
  'H3',
  'SPAN',
  'B',
  'STRONG',
  'EM',
  'A',
  'BR',
  'svg',
  'path',
  'I',
  'SMALL',
])

/** Avtomatik topiş: töplamlar (kamida 3 ta bir xil teg-farzand), sarlavhalar va matnlar */
function autoItems(host: HTMLElement, add: (e: HTMLElement, grid?: boolean) => void) {
  host.querySelectorAll<HTMLElement>('*').forEach((e) => {
    const kids = [...e.children] as HTMLElement[]
    if (kids.length < 3 || SKIP_TAGS.has(e.tagName) || e.parentElement?.closest('li')) return
    if (!kids.every((c) => c.tagName === kids[0].tagName)) return
    // butun bölimlar yoki variant örama-lari töplam emas
    if (kids[0].tagName === 'SECTION' || kids.some((c) => c.classList.contains('vx'))) return
    kids.forEach((k) => add(k, true))
  })
  host
    .querySelectorAll<HTMLElement>(
      'h1, h2, .sec-head, h1 ~ p, h2 ~ p, h1 ~ div, .btn, blockquote, figure',
    )
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
  const m = orig.match(/^(\D*)(\d[\d\s ]*)(.*)$/s)
  if (!m || /^[.,]\d/.test(m[3])) return // kasr sonlar (1,87 mln) sanalmaydi
  const digits = m[2].replace(/[\s ]/g, '')
  const to = Number(digits)
  // yillar (2017) sanalmaydi
  if (!to || to > 1e7 || (/^(19|20)\d\d$/.test(digits) && !m[3].trim())) return
  const tail = m[2].match(/[\s ]+$/)?.[0] ?? ''
  const grouped = /\d[\s ]\d/.test(m[2])
  const fmt = (n: number) => (grouped ? n.toLocaleString('ru-RU') : String(n))
  const t0 = performance.now()
  const tick = (t: number) => {
    const k = clamp((t - t0) / COUNT_MS)
    if (k < 1) {
      text.nodeValue = `${m[1]}${fmt(Math.round(to * (1 - Math.pow(1 - k, 4))))}${tail}${m[3]}`
      rafs.add(requestAnimationFrame(tick))
    } else text.nodeValue = orig
  }
  text.nodeValue = `${m[1]}0${tail}${m[3]}`
  rafs.add(requestAnimationFrame(tick))
  return () => {
    text.nodeValue = orig
  }
}

/** Birinçi yuklaniş ötdimi (keyingi işga tuşişlar — sahifalar orasida ötiş) */
let navigated = false

/** Animatsiyani işga tuşiradi; töxtatiş funksiyasini qaytaradi */
export function startReveal(o: RevealOpts): () => void {
  const html = document.documentElement
  const host = document.querySelector<HTMLElement>(o.root)
  if (!host || motionOff()) return () => {}

  const vh0 = innerHeight
  // Birinçi ekrandan pastdami. Sahifa yuklanişida (mazmun SSR dan allaqaçon çizilgan) — sahifa boşidan
  // ham, hozirgi körinişdan ham pastda bölsa; sahifalar orasida ötganda (yangi mazmun hali çizilmagan,
  // skroll esa eski sahifaniki) — faqat sahifa boşiga nisbatan.
  const nav = navigated
  const below = (e: Element) => {
    const r = e.getBoundingClientRect()
    return r.height > 0 && r.top + scrollY > vh0 && (nav || r.top > vh0)
  }
  if (!navigated) setTimeout(() => (navigated = true), 0)
  const skipped = (e: Element) => !!o.skip && !!e.closest(o.skip)

  const items = new Set<HTMLElement>()
  const inGrid = new Set<HTMLElement>()
  const add = (e: HTMLElement, grid = false, img = false) => {
    if (items.has(e) || skipped(e) || e.closest('.rv') || !below(e)) return
    e.classList.add('rv')
    if (img) e.classList.add('rv-img')
    if (grid) inGrid.add(e)
    items.add(e)
  }
  if (o.images) host.querySelectorAll<HTMLElement>(o.images).forEach((e) => add(e, false, true))
  if (o.items) host.querySelectorAll<HTMLElement>(o.items).forEach((e) => add(e))
  else autoItems(host, add)
  if (o.extra) host.querySelectorAll<HTMLElement>(o.extra).forEach((e) => add(e))

  // effekt: aniq selektor > surat > sarlavha > töplam
  const fxOf = new Map<HTMLElement, string>()
  items.forEach((e) => {
    const hit = o.fx?.find(([sel]) => e.matches(sel))?.[1]
    const name =
      hit ??
      (e.classList.contains('rv-img')
        ? o.img
        : /^H[12]$/.test(e.tagName) || e.classList.contains('sec-head')
          ? o.head
          : inGrid.has(e)
            ? o.grid
            : undefined)
    if (!name || name === 'up') return
    if (!SOFT.test(name) && e.offsetHeight > innerHeight * 0.75) return
    e.classList.add(`fx-${name}`)
    fxOf.set(e, `fx-${name}`)
  })
  const clean = (el: HTMLElement) => {
    el.classList.remove('rv', 'rv-in', 'rv-img')
    const f = fxOf.get(el)
    if (f) el.classList.remove(f)
    el.style.removeProperty('--d')
  }

  const heads = [...host.querySelectorAll<HTMLElement>('.split-words')].filter((h) => !skipped(h))
  const nums = o.counters
    ? [...host.querySelectorAll<HTMLElement>(o.counters)].filter((n) => !skipped(n) && below(n))
    : []

  html.classList.add('rv-ready')

  let pending = [...items]
  let pendingNums = nums
  const timers: number[] = []
  const rafs = new Set<number>()
  const restores: Array<() => void> = []

  let raf = 0
  const update = () => {
    raf = 0
    const vh = innerHeight
    heads.forEach((h) =>
      h.style.setProperty(
        '--t',
        clamp((vh * 0.9 - h.getBoundingClientRect().top) / (vh * 0.5)).toFixed(4),
      ),
    )
    // sahifa oxiriga yetilgan bölsa — qolganlarning hammasi oçiladi
    const end = scrollY + vh >= document.documentElement.scrollHeight - 4
    const inView = (e: Element) => end || e.getBoundingClientRect().top < vh * 0.92
    if (pendingNums.length)
      pendingNums = pendingNums.filter((n) => {
        if (!inView(n)) return true
        const r = countUp(n, rafs)
        if (r) restores.push(r)
        return false
      })
    if (!pending.length) return
    const show: Array<{ el: HTMLElement; r: DOMRect }> = []
    pending = pending.filter((el) => {
      if (!inView(el)) return true
      show.push({ el, r: el.getBoundingClientRect() })
      return false
    })
    show
      .sort((x, y) => x.r.top - y.r.top || x.r.left - y.r.left)
      .forEach(({ el, r }, i) => {
        // ötib ketilganlari kutmasdan, ekrandagilari navbat bilan
        const d = r.bottom < 0 ? 0 : Math.min(i, STAGGER_MAX) * STAGGER_MS
        el.style.setProperty('--d', `${d}ms`)
        el.classList.add('rv-in')
        // çiqib bölgaç sinflar olinadi — elementning öz hover/transition uslublari qaytadi
        timers.push(
          window.setTimeout(() => {
            clean(el)
            items.delete(el)
          }, d + ANIM_MS),
        )
      })
  }
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  let stopped = false
  const stop = () => {
    if (stopped) return
    stopped = true
    cancelAnimationFrame(raf)
    rafs.forEach(cancelAnimationFrame)
    restores.forEach((r) => r())
    timers.forEach(clearTimeout)
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onScroll)
    ro.disconnect()
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
  mo.observe(html, { attributes: true, attributeFilter: ['data-a11y-read'] })
  // rasm yuklanib sahifa balandligi özgarsa ham tekşiriladi
  const ro = new ResizeObserver(onScroll)
  ro.observe(document.body)

  try {
    update()
  } catch (err) {
    stop()
    throw err
  }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll)
  return stop
}

/** Içki sahifalar uçun (PageMotion orqali) */
export function RevealMotion({ root, items, counters, images, skip, extra, head, grid, img, fx }: RevealOpts) {
  // useLayoutEffect: yangi mazmun çizilişidan oldin tayyorlanadi; fx — doimiy massiv (havolasi özgarmaydi)
  useLayoutEffect(
    () => startReveal({ root, items, counters, images, skip, extra, head, grid, img, fx }),
    [root, items, counters, images, skip, extra, head, grid, img, fx],
  )
  return null
}
