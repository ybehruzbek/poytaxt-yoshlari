'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import { dayMonth, fullDate } from './data'
import { PressDoc } from './PressDoc'
import { PRESS, PRESS_KINDS, type PressItem } from './press'

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
      setMsg('Nusxalab bölmadi')
    }
    setTimeout(() => setMsg(''), 2000)
  }
  return (
    <div className="pr-tools" role="toolbar" aria-label="Hujjat bilan amallar">
      <button type="button" onClick={() => printDoc(docId)}>
        <Ic d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z" /> Çop etiş / PDF
      </button>
      <button
        type="button"
        onClick={() => copy(document.getElementById(docId)?.innerText ?? '', 'Matn nusxalandi')}
      >
        <Ic d="M9 9h11v11H9zM5 15H4V4h11v1" /> Matnni nusxalaş
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
   A — “Rasmiy blanka”: çapda hujjatlar röyxati, öngda tanlangan blanka
   (manzil satrida #slug — havolani ulaşiş mumkin)
   ==================================================================== */
export function PressDesk() {
  const [slug, setSlug] = useState(PRESS[0].slug)
  useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1))
    // manzildagi #slug böyiça hujjat oçiladi
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hash faqat brauzerda maʼlum
    if (PRESS.some((p) => p.slug === h)) setSlug(h)
  }, [])
  const p = PRESS.find((x) => x.slug === slug)!
  const pick = (s: string) => {
    setSlug(s)
    history.replaceState(null, '', `#${s}`)
    document.getElementById('pr-desk-doc')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div className="pr-desk">
      <nav className="pr-desk-list" aria-label="Press-relizlar röyxati">
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
        <PressDoc p={p} id="pr-a-doc" />
      </div>
    </div>
  )
}

/* ====================================================================
   C — “Hujjatlar reyestri”: tur va yil böyiça saralaş, qidiruv;
   “Oçiş” — blanka oyna ičida
   ==================================================================== */
export function PressRegistry({ base }: { base: string }) {
  const [kind, setKind] = useState<'all' | PressItem['kind']>('all')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<PressItem | null>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const s = q.trim().toLowerCase()
  const list = PRESS.filter(
    (p) => (kind === 'all' || p.kind === kind) && (!s || `${p.title} ${p.lead}`.toLowerCase().includes(s)),
  )
  const years = [...new Set(list.map((p) => p.date.slice(0, 4)))]

  return (
    <div className="pr-reg">
      <div className="pr-reg-top">
        <div className="ax-pills" role="group" aria-label="Hujjat turi">
          {(['all', 'reliz', 'anons'] as const).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {k === 'all' ? 'Barçasi' : PRESS_KINDS[k]}
              <span className="ax-pill-n">{k === 'all' ? PRESS.length : PRESS.filter((p) => p.kind === k).length}</span>
            </button>
          ))}
        </div>
        <label className="ax-search">
          <span className="sr-only">Press-relizlardan qidiriş</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sarlavha yoki matndan qidiriş" />
        </label>
      </div>

      {list.length === 0 && <p className="pr-none">Bu söz böyiça hujjat topilmadi.</p>}

      {years.map((y) => (
        <section key={y} className="pr-reg-year">
          <h2>{y}-yil</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Sana</th>
                <th scope="col">Turi</th>
                <th scope="col">Sarlavha</th>
                <th scope="col">
                  <span className="sr-only">Amallar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {list
                .filter((p) => p.date.startsWith(y))
                .map((p) => (
                  <tr key={p.slug}>
                    <td className="pr-reg-d">
                      <time dateTime={p.date}>{dayMonth(p.date)}</time>
                    </td>
                    <td>
                      <span className={`pr-kind k-${p.kind}`}>{PRESS_KINDS[p.kind]}</span>
                    </td>
                    <td>
                      <Link href={`${base}/axborot-xizmati/press-relizlar/${p.slug}`} className="pr-reg-t">
                        {p.title}
                      </Link>
                    </td>
                    <td className="pr-reg-act">
                      <button
                        type="button"
                        className="more-btn"
                        onClick={() => {
                          setOpen(p)
                          dlg.current?.showModal()
                        }}
                      >
                        <More>Oçiş</More>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}

      <dialog ref={dlg} className="pr-dlg" aria-label="Press-reliz" onClose={() => setOpen(null)}>
        {open && (
          <div className="pr-dlg-in">
            <div className="pr-dlg-bar">
              <PressTools docId="pr-c-doc" slug={open.slug} />
              <button type="button" className="ax-lb-x" onClick={() => dlg.current?.close()} aria-label="Yopiş">
                ×
              </button>
            </div>
            <PressDoc p={open} id="pr-c-doc" />
          </div>
        )}
      </dialog>
    </div>
  )
}
