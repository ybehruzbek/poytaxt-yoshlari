'use client'

import { useLayoutEffect } from 'react'

/**
 * Ički sahifalar uçun umumiy skroll animatsiyasi (Apple uslubi). Sahifa kodiga tegmaydi — elementlarni
 * mavjud teglar va sinflar orqali topadi:
 * – sarlavhalar va izohlar (h1/h2, .sec-head, kiçik matnlar) xiradan aniqlaşib köteriladi;
 * – bir xil elementlardan iborat töplamlar (ro'yxat, kartalar, raqamlar) navbat bilan çiqadi;
 * – `words` sarlavhalari skroll bilan söz-söz yorişadi; `counters` raqamlari 0 dan sanaladi;
 * – `images` suratlari ramkadan oçilib, ičdan kiçrayadi.
 * Har element ekranga kirganda alohida çiqadi; tez aylantirib ötib ketilganlari ham albatta oçiladi.
 */
type Props = {
  root: string
  words?: string
  counters?: string
  images?: string
  skip?: string
  /** qöşimça oçiladigan elementlar (sarlavha va töplamlardan taşqari) */
  extra?: string
  /** h1/h2 sarlavhalar effekti (masalan, mask — pastdan, wipe — çapdan oçiladi) */
  head?: Fx
  /** töplam (kartalar, ro'yxat) elementlari effekti */
  grid?: Fx
  /** suratlar effekti: clip (sukut), curtain — pastdan parda, circle — doiradan */
  img?: Fx
  /** aniq elementlar uçun effekt: [selektor, effekt] — birinçi mos kelgani olinadi */
  fx?: ReadonlyArray<readonly [string, Fx]>
}

/** Effektlar löğati (reveal.css dagi .fx-* bilan) */
export type Fx =
  | 'up'
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

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
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

function splitWords(root: HTMLElement) {
  if (root.dataset.rvSplit) return
  root.dataset.rvSplit = '1'
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
            s.className = 'rv-w'
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

function countUp(el: HTMLElement) {
  if (el.dataset.rvCounted) return
  el.dataset.rvCounted = '1'
  const orig = el.textContent || ''
  const m = orig.match(/^(\D*)(\d[\d\s]*)(.*)$/)
  if (!m || /^[.,]\d/.test(m[3])) return // kasr sonlar (1,87 mln) sanalmaydi
  const to = Number(m[2].replace(/\s/g, ''))
  if (!to || to > 1e7) return
  const t0 = performance.now()
  const fmt = (n: number) => (/\s/.test(m[2]) ? n.toLocaleString('ru-RU') : String(n))
  const tick = (t: number) => {
    const k = clamp((t - t0) / 1600)
    el.textContent = `${m[1]}${fmt(Math.round(to * (1 - Math.pow(1 - k, 4))))}${m[3]}`
    if (k < 1) requestAnimationFrame(tick)
    else el.textContent = orig
  }
  requestAnimationFrame(tick)
}

export function RevealMotion({
  root,
  words,
  counters,
  images,
  skip,
  extra,
  head,
  grid,
  img,
  fx,
}: Props) {
  // useLayoutEffect: sahifalar orasida ötganda ham yangi mazmun çizilişidan oldin tayyorlanadi
  useLayoutEffect(() => {
    const host = document.querySelector<HTMLElement>(root)
    const html = document.documentElement
    if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      html.classList.add('motion-on')
      return
    }
    const skipped = (e: Element) => !!skip && !!e.closest(skip)
    const items = new Set<HTMLElement>()
    const inGrid = new Set<HTMLElement>()
    const add = (e: HTMLElement, kind = '') => {
      if (items.has(e) || skipped(e) || e.closest('.rv')) return
      e.classList.add('rv')
      if (kind) e.classList.add(kind)
      items.add(e)
    }

    // 1) suratlar
    if (images) host.querySelectorAll<HTMLElement>(images).forEach((e) => add(e, 'rv-img'))
    // 2) söz-söz yorişadigan sarlavhalar (öz holida turadi, faqat sözlar yorişadi)
    const heads = words ? [...host.querySelectorAll<HTMLElement>(words)] : []
    heads.forEach((h) => {
      splitWords(h)
      items.add(h)
      h.classList.add('rv-words')
    })
    // 3) töplamlar: kamida 3 ta bir xil teg-farzandli konteynerlar (ičma-ič ro'yxatlar emas)
    host.querySelectorAll<HTMLElement>('*').forEach((e) => {
      const kids = [...e.children] as HTMLElement[]
      if (kids.length < 3 || SKIP_TAGS.has(e.tagName) || e.parentElement?.closest('li')) return
      if (!kids.every((c) => c.tagName === kids[0].tagName)) return
      // butun bölimlar yoki variant örama-lari töplam emas — ularning ičidagi elementlar alohida oçiladi
      if (kids[0].tagName === 'SECTION' || kids.some((c) => c.classList.contains('vx'))) return
      kids.forEach((c) => {
        add(c)
        inGrid.add(c)
      })
    })
    // 4) qöşimça elementlar
    if (extra) host.querySelectorAll<HTMLElement>(extra).forEach((e) => add(e))
    // 5) sarlavhalar va qolgan matnlar
    host
      .querySelectorAll<HTMLElement>(
        'h1, h2, .sec-head, h1 ~ p, h2 ~ p, h1 ~ div, .btn, blockquote, figure',
      )
      .forEach((e) => {
        if (e.closest('li, article, .rv-words')) return
        add(e)
      })

    // effektlar: aniq selektor > surat > sarlavha > töplam
    const fxOf = new Map<HTMLElement, string>()
    items.forEach((e) => {
      if (e.classList.contains('rv-words')) return
      const hit = fx?.find(([sel]) => e.matches(sel))?.[1]
      const name =
        hit ??
        (e.classList.contains('rv-img')
          ? img
          : /^H[12]$/.test(e.tagName) || e.classList.contains('sec-head')
            ? head
            : inGrid.has(e)
              ? grid
              : undefined)
      if (!name || name === 'up') return
      // juda baland elementlarda (ekranning 3/4 qismidan katta) kuçli harakat ğalati körinadi — oddiy köteriliş qoladi
      if (!/^(mask|wipe|curtain|circle|zoom)$/.test(name) && e.offsetHeight > innerHeight * 0.75)
        return
      e.classList.add(`fx-${name}`)
      fxOf.set(e, `fx-${name}`)
    })

    html.classList.add('rv-ready')

    const nums = counters ? [...host.querySelectorAll<HTMLElement>(counters)] : []
    let pending = [...items].filter((e) => !e.classList.contains('rv-words'))
    const timers: number[] = []

    // Har kadrda: ekranga kirgan (yoki allaqaçon ötib ketilgan) elementlar navbat bilan oçiladi
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
      if (!pending.length) return
      const show: Array<{ el: HTMLElement; r: DOMRect }> = []
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.92) {
          show.push({ el, r })
          return false
        }
        return true
      })
      show
        .sort((x, y) => x.r.top - y.r.top || x.r.left - y.r.left)
        .forEach(({ el, r }, i) => {
          // ötib ketilganlari kutmasdan, ekrandagilari navbat bilan
          const d = r.bottom < 0 ? 0 : Math.min(i, 8) * 70
          el.style.setProperty('--d', `${d}ms`)
          el.classList.add('rv-in')
          // çiqib bölgaç animatsiya sinflari olinadi — elementning öz hover/transition uslublari qaytadi
          timers.push(
            window.setTimeout(
              () => el.classList.remove('rv', 'rv-in', 'rv-img', fxOf.get(el) ?? 'rv'),
              d + 1900,
            ),
          )
          nums.forEach((n) => (n === el || el.contains(n)) && countUp(n))
        })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    // ekrandagi elementlar shu zahoti (çizilişdan oldin) .rv-in oladi — keyframe animatsiya birinçi kadrdan öynaydi
    update()
    html.classList.add('motion-on')
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      items.forEach((e) =>
        e.classList.remove('rv', 'rv-in', 'rv-img', 'rv-words', fxOf.get(e) ?? 'rv'),
      )
      html.classList.remove('rv-ready')
    }
    // fx — PAGES dagi doimiy massiv, havolasi özgarmaydi
  }, [root, words, counters, images, skip, extra, head, grid, img, fx])

  return null
}
