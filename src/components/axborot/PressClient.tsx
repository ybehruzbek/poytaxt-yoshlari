'use client'

import { useEffect, useState } from 'react'

import { fullDate } from './data'
import { PressDoc } from './PressDoc'
import type { PressContactT } from '@/lib/cms/aloqa'
import { PRESS_KINDS, type PressItem } from './press'
import { smoothScroll } from '@/lib/scroll'

/** Faqat tanlangan blankani çop etiş (qolgan sahifa yaşiriladi — axborot.css @media print) */
function printDoc(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.classList.add('is-print')
  document.documentElement.classList.add('pr-printing')
  const done = () => {
    el.classList.remove('is-print')
    document.documentElement.classList.remove('pr-printing')
    window.removeEventListener('afterprint', done)
  }
  window.addEventListener('afterprint', done)
  window.print()
}

/** Blanka ustidagi asboblar: çop etiş / PDF, matnni va havolani nusxalaş */
export function PressTools({ docId, slug }: { docId: string; slug: string }) {
  const [msg, setMsg] = useState('')
  const copy = async (text: string, ok: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setMsg(ok)
    } catch {
      setMsg('Nusxalab bo‘lmadi')
    }
    setTimeout(() => setMsg(''), 2000)
  }
  return (
    <div className="pr-tools" role="toolbar" aria-label="Hujjat bilan amallar">
      <button type="button" onClick={() => printDoc(docId)}>
        <Ic d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z" /> Chop etish / PDF
      </button>
      <button
        type="button"
        onClick={() => copy(document.getElementById(docId)?.innerText ?? '', 'Matn nusxalandi')}
      >
        <Ic d="M9 9h11v11H9zM5 15H4V4h11v1" /> Matnni nusxalash
      </button>
      <button
        type="button"
        onClick={() => copy(`${location.origin}${location.pathname.replace(/\/[^/]*$/, '')}/press-relizlar/${slug}`.replace('/press-relizlar/press-relizlar/', '/press-relizlar/'), 'Havola nusxalandi')}
      >
        <Ic d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /> Havola
      </button>
      <span className="pr-tools-msg" role="status">
        {msg}
      </span>
    </div>
  )
}

function Ic({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/* ====================================================================
   “Rasmiy blanka”: çapda hujjatlar röyxati, öngda tanlangan blanka
   (manzil satrida #slug — havolani ulaşiş mumkin)
   ==================================================================== */
export function PressDesk({ press: PRESS, contact }: { press: PressItem[]; contact: PressContactT }) {
  const [slug, setSlug] = useState(PRESS[0].slug)
  useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1))
    // manzildagi #slug böyiça hujjat oçiladi
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hash faqat brauzerda maʼlum
    if (PRESS.some((p) => p.slug === h)) setSlug(h)
  }, [PRESS])
  const p = PRESS.find((x) => x.slug === slug)!
  const pick = (s: string) => {
    setSlug(s)
    history.replaceState(null, '', `#${s}`)
    smoothScroll(document.getElementById('pr-desk-doc'), { block: 'start' })
  }
  return (
    <div className="pr-desk">
      <nav className="pr-desk-list" aria-label="Press-relizlar ro‘yxati">
        {PRESS.map((x) => (
          <button key={x.slug} type="button" aria-current={x.slug === slug ? true : undefined} onClick={() => pick(x.slug)}>
            <span className={`pr-kind k-${x.kind}`}>{PRESS_KINDS[x.kind]}</span>
            <b>{x.title}</b>
            <time dateTime={x.date}>{fullDate(x.date)}</time>
          </button>
        ))}
      </nav>
      <div className="pr-desk-doc" id="pr-desk-doc">
        <PressTools docId="pr-a-doc" slug={p.slug} />
        <PressDoc p={p} id="pr-a-doc" contact={contact} />
      </div>
    </div>
  )
}
