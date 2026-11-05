'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useSyncExternalStore } from 'react'

import { toYangiAlifbo } from '@/lib/alifbo'

type Abc = 'joriy' | 'yangi'
const KEY = 'alifbo'

/* Tanlov localStorage'da saqlanadi; useSyncExternalStore orqali o'qiladi (server: doim "joriy"). */
const listeners = new Set<() => void>()
function subscribe(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}
const getSnapshot = (): Abc => (localStorage.getItem(KEY) === 'yangi' ? 'yangi' : 'joriy')
const getServerSnapshot = (): Abc => 'joriy'
function setAbc(v: Abc) {
  localStorage.setItem(KEY, v)
  listeners.forEach((l) => l())
}

/**
 * Joriy / yangi alifbo almashtirgichi (faqat o'zbekcha sahifalarda).
 * Hozircha brauzerda matn tugunlarini o'giradi; CMS ulanganda o'girish serverga ko'chadi.
 * URL'dagi ?alifbo=yangi|joriy saqlangan tanlovdan ustun turadi.
 */
export function AlphabetSwitch() {
  const pathname = usePathname()
  const abc = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const apply = useCallback((mode: Abc) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement
        if (!p || /SCRIPT|STYLE/.test(p.nodeName) || p.closest('.abc-switch')) return NodeFilter.FILTER_REJECT
        return /\S/.test(n.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      },
    })
    type T = Text & { __orig?: string; __conv?: string }
    let n: Node | null
    while ((n = walker.nextNode())) {
      const t = n as T
      const cur = t.nodeValue || ''
      // birinchi marta ko'rilgan yoki React matnni yangilagan bo'lsa — asl matnni qayta yozib olamiz
      if (t.__orig === undefined || (cur !== t.__orig && cur !== t.__conv)) {
        t.__orig = cur
        t.__conv = toYangiAlifbo(cur)
      }
      const next = mode === 'yangi' ? t.__conv! : t.__orig
      if (t.nodeValue !== next) t.nodeValue = next
    }
    document.querySelectorAll<HTMLElement>('[alt],[aria-label]').forEach((el) => {
      ;['alt', 'aria-label'].forEach((a) => {
        const v = el.getAttribute(a)
        if (v === null) return
        const key = `data-orig-${a}`
        if (!el.hasAttribute(key)) el.setAttribute(key, v)
        const orig = el.getAttribute(key) || ''
        el.setAttribute(a, mode === 'yangi' ? toYangiAlifbo(orig) : orig)
      })
    })
  }, [])

  // URL parametri bo'lsa — saqlab qo'yamiz
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get(KEY)
    if (q === 'yangi' || q === 'joriy') setAbc(q)
  }, [])

  // har sahifa o'zgarganda va tanlov o'zgarganda qayta qo'llash
  useEffect(() => {
    // setTimeout: yashirin tabda ham ishlaydi (requestAnimationFrame to'xtab qoladi)
    const id = window.setTimeout(() => apply(abc), 0)
    return () => window.clearTimeout(id)
  }, [abc, pathname, apply])

  // yangi alifboda: sahifada keyin paydo bo'lgan matnlarni ham o'giramiz (masalan, aylanuvchi yangiliklar)
  useEffect(() => {
    if (abc !== 'yangi') return
    let t: number | undefined
    const mo = new MutationObserver(() => {
      window.clearTimeout(t)
      t = window.setTimeout(() => apply('yangi'), 30)
    })
    mo.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => {
      mo.disconnect()
      window.clearTimeout(t)
    }
  }, [abc, apply])

  return (
    <div className="abc-switch" role="group" aria-label="Alifbo">
      <button type="button" className={abc === 'joriy' ? 'on' : undefined} onClick={() => setAbc('joriy')}>
        Oʻzbekcha
      </button>
      <button type="button" className={abc === 'yangi' ? 'on' : undefined} onClick={() => setAbc('yangi')}>
        Özbekça
      </button>
    </div>
  )
}
