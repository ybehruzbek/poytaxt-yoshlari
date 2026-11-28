'use client'

import { useEffect } from 'react'

/**
 * Sayt böylab qator bölinişini tuzatadi (matnlar özgarmaydi, faqat körinişi):
 * - “15-dekabr”, “4-uy”, “28-modda”, “PF-6017”, “2026-2027” — defisda qator bölinmaydi;
 * - “14:00–17:00”, “2026–2027” — raqamlar orasidagi tirega qator bölinmaydi;
 * - “261 ming”, “12 ta”, “15 kun” — raqam keyingi söz bilan bir qatorda qoladi;
 * - “—” tiresi yangi qatorni boşlamaydi;
 * - sanada defis qöyiladi: “2017 yil 5 iyul” → “2017-yil 5-iyul”.
 * Admin paneldan keladigan matnlarga ham taʼsir qiladi. Tor joylarda (masalan, hujjat raqami)
 * qoidani öçiriş uçun elementga data-typo="off" qöyiladi.
 */
const NBH = '\u2011' // ajralmas defis
const WJ = '\u2060' // söz biriktirgiç (qator bölinmaydi)
const NBSP = '\u00a0'

const RULES: [RegExp, string][] = [
  // sana: “2017 yil” → “2017-yil”, “5 iyulda” → “5-iyulda” (Telegram va boşqa taşqi matnlar uçun;
  // sayt matnlarida bu qoidani `pnpm imlo` taʼminlaydi — src/lib/alifbo.ts)
  [/(?<![\p{L}\d])((?:18|19|20)\d{2}) (yil|y\.)/gu, '$1-$2'],
  [
    /(?<![\p{L}\d.,])(\d{1,2}) (yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)(?=(?:da|dagi|ga|gacha|gaça|dan|ning|ida|idagi|idan|i)?(?!\p{L}))/gu,
    '$1-$2',
  ],
  // raqam/katta harf + defis + harf yoki raqam: 15-dekabr, PF-6017, 2026-2027
  [/(\d|\p{Lu})-(?=[\p{L}\d])/gu, `$1${NBH}`],
  // raqamlar orasidagi tire: 14:00–17:00, 2026–2027
  [/(\d)([–—])(?=\d)/g, `$1${WJ}$2${WJ}`],
  // raqam keyingi söz bilan bir qatorda: “261 ming”, “12 ta”, “1 nafardan”, “5 taşabbus”
  [/(^|[\s(“])(\d{1,4}) (?=\p{L})/gu, `$1$2${NBSP}`],
  // tire va undan keyingi raqam ajralmaydi: “Yoş diplomat – 2026”
  [/([—–]) (?=\d)/g, `$1${NBSP}`],
  // tire oldidagi böşliq ajralmas: tire qator boşiga tuşmaydi
  [/(\S) ([—–]) /g, `$1${NBSP}$2 `],
]

const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE', 'NOSCRIPT'])

function fix(node: Text) {
  const p = node.parentElement
  if (!p || SKIP.has(p.tagName) || p.closest('svg,[contenteditable],[data-typo="off"]')) return
  let t = node.data
  if (!/[\d—–]/.test(t)) return
  for (const [re, to] of RULES) t = t.replace(re, to)
  if (t !== node.data) node.data = t
}

function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return fix(root as Text)
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let n: Node | null
  while ((n = w.nextNode())) fix(n as Text)
}

export function Typograf() {
  useEffect(() => {
    walk(document.body)
    const mo = new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === 'characterData') fix(m.target as Text)
        else m.addedNodes.forEach(walk)
      }
    })
    mo.observe(document.body, { subtree: true, childList: true, characterData: true })
    return () => mo.disconnect()
  }, [])
  return null
}
