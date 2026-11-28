'use client'

import { useEffect } from 'react'

import { toYangiAlifbo } from '@/lib/alifbo'

/**
 * Alifbo almashtirgichi (faqat o'zbekcha sahifalarda). Sayt matni joriy lotin alifbosida keladi;
 * tashrif buyuruvchi “Yangi alifbo”ni tanlasa, sahifadagi barcha matn shu yerda — brauzerda —
 * yangi alifboga o'giriladi (toYangiAlifbo, src/lib/alifbo.ts). Tanlov localStorage'da saqlanadi.
 *
 * Asl matn har bir tugunda saqlanadi — “Joriy alifbo”ga qaytilganda sahifa qayta yuklanmaydi.
 * O'girilmaydi: kiritish maydonlari, kod, data-alifbo="off" belgili joylar.
 * Sahifa chizilishidan oldin <head> dagi ALIFBO_GATE skripti tanlovni o'qib, “abc-wait” sinfi bilan
 * matnni bir lahza yashiradi — joriy alifbodagi matn ko'rinib qolmaydi.
 */
export const ALIFBO_KEY = 'alifbo'
export const ALIFBO_EVENT = 'alifbo-change'
export type AlifboTur = 'joriy' | 'yangi'

export function getAlifbo(): AlifboTur {
  try {
    return localStorage.getItem(ALIFBO_KEY) === 'yangi' ? 'yangi' : 'joriy'
  } catch {
    return 'joriy'
  }
}

export function setAlifbo(v: AlifboTur) {
  try {
    if (v === 'yangi') localStorage.setItem(ALIFBO_KEY, 'yangi')
    else localStorage.removeItem(ALIFBO_KEY)
  } catch {
    // saqlab bo'lmasa ham joriy sahifada almashadi
  }
  window.dispatchEvent(new CustomEvent(ALIFBO_EVENT, { detail: v }))
}

const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT', 'CODE', 'PRE', 'NOSCRIPT'])
const ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'aria-description']

/** Tugunning joriy alifbodagi asl matni va unga mos o'girilgan matn */
type Asl = { joriy: string; yangi: string }
const textAsl = new WeakMap<Text, Asl>()
const attrAsl = new WeakMap<Element, Record<string, Asl>>()
/** O'girilgan elementlar (qaytarish uchun); uzilganlari qaytishda tashlab yuboriladi */
const touched = new Set<Text | Element>()

const skipEl = (el: Element | null) => !el || SKIP.has(el.tagName) || !!el.closest('[data-alifbo="off"],[contenteditable]')

function convText(node: Text) {
  if (skipEl(node.parentElement)) return
  const cur = node.data
  const prev = textAsl.get(node)
  // React matnni yangilagan bo'lsa — yangi asl matn
  if (prev && cur === prev.yangi) return
  const yangi = toYangiAlifbo(cur)
  if (yangi === cur) return
  textAsl.set(node, { joriy: cur, yangi })
  touched.add(node)
  node.data = yangi
}

function convAttrs(el: Element) {
  if (skipEl(el)) return
  for (const a of ATTRS) {
    const cur = el.getAttribute(a)
    if (!cur) continue
    const rec = attrAsl.get(el) ?? {}
    if (rec[a] && rec[a].yangi === cur) continue
    const yangi = toYangiAlifbo(cur)
    if (yangi === cur) continue
    rec[a] = { joriy: cur, yangi }
    attrAsl.set(el, rec)
    touched.add(el)
    el.setAttribute(a, yangi)
  }
}

function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return convText(root as Text)
  if (root.nodeType !== Node.ELEMENT_NODE) return
  const el = root as Element
  convAttrs(el)
  el.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(',')).forEach(convAttrs)
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let n: Node | null
  while ((n = w.nextNode())) convText(n as Text)
}

/** Joriy alifboga qaytarish: faqat biz o'girgan va o'shandan beri o'zgarmagan matnlar */
function restore() {
  for (const t of touched) {
    if (t instanceof Text) {
      const a = textAsl.get(t)
      if (a && t.data === a.yangi) t.data = a.joriy
      textAsl.delete(t)
    } else {
      const rec = attrAsl.get(t)
      if (rec) for (const [k, a] of Object.entries(rec)) if (t.getAttribute(k) === a.yangi) t.setAttribute(k, a.joriy)
      attrAsl.delete(t)
    }
  }
  touched.clear()
}

export function Alifbo() {
  useEffect(() => {
    const html = document.documentElement
    let mo: MutationObserver | null = null

    const on = () => {
      html.setAttribute('data-alifbo', 'yangi')
      // <head> — sahifa sarlavhasi (brauzer varag'i) ham; boshqa sahifaga o'tilganda Next.js uni yangilaydi
      walk(document.head)
      walk(document.body)
      mo ??= new MutationObserver((list) => {
        for (const m of list) {
          if (m.type === 'characterData') convText(m.target as Text)
          else if (m.type === 'attributes') convAttrs(m.target as Element)
          else m.addedNodes.forEach(walk)
        }
      })
      const opts = { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS }
      mo.observe(document.head, opts)
      mo.observe(document.body, opts)
    }
    const off = () => {
      mo?.disconnect()
      mo = null
      restore()
      html.removeAttribute('data-alifbo')
    }

    if (getAlifbo() === 'yangi') on()
    html.classList.remove('abc-wait')

    const onChange = (e: Event) => ((e as CustomEvent<AlifboTur>).detail === 'yangi' ? on() : off())
    window.addEventListener(ALIFBO_EVENT, onChange)
    return () => {
      window.removeEventListener(ALIFBO_EVENT, onChange)
      off()
    }
  }, [])
  return null
}
