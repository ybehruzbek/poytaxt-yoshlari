'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { deleteNews, publishNews, unpublishNews } from '@/lib/boshqaruv/news-actions'

import { Icon } from '../Icon'

export type Row = {
  id: number
  title: string
  thumb: string | null
  cat: string
  catKey: string
  kind: string | null
  date: string
  status: 'draft' | 'published'
}

const CAT_TONE: Record<string, string> = { kengash: 't-brown', boshlangich: 't-blue', imkoniyat: 't-green', tadbir: 't-pink' }

/** Yangiliklar jadvali: qatorni bosish — tahrir; belgilab, bir neçtasini birdan eʼlon qiliş / saytdan oliş / öçiriş */
export function NewsTable({ rows, isAdmin }: { rows: Row[]; isAdmin: boolean }) {
  const router = useRouter()
  const [sel, setSel] = useState<number[]>([])
  const [confirm, setConfirm] = useState(false)
  const [msg, setMsg] = useState<{ t: string; bad?: boolean } | null>(null)
  const [pending, start] = useTransition()

  const all = rows.length > 0 && sel.length === rows.length
  const toggle = (id: number) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const run = (fn: (ids: number[]) => Promise<{ ok: boolean; message: string }>) =>
    start(async () => {
      const r = await fn(sel)
      setMsg({ t: r.message, bad: !r.ok })
      setSel([])
      setConfirm(false)
      router.refresh()
      window.setTimeout(() => setMsg(null), 3500)
    })

  return (
    <>
      {sel.length > 0 && (
        <div className="bulk" role="region" aria-label="Tanlanganlar bilan amallar">
          <span>{sel.length} ta tanlandi</span>
          {confirm ? (
            <>
              <b>O‘chirilsinmi? Qaytarish imkoni yo‘q.</b>
              <button type="button" className="btn btn-sm btn-red" disabled={pending} onClick={() => run(deleteNews)}>
                Ha, o‘chirish
              </button>
              <button type="button" className="btn btn-sm btn-ghost-l" onClick={() => setConfirm(false)}>
                Bekor qilish
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-sm btn-ghost-l" disabled={pending} onClick={() => run(publishNews)}>
                E’lon qilish
              </button>
              <button type="button" className="btn btn-sm btn-ghost-l" disabled={pending} onClick={() => run(unpublishNews)}>
                Saytdan olish
              </button>
              {isAdmin && (
                <button type="button" className="btn btn-sm btn-ghost-l" disabled={pending} onClick={() => setConfirm(true)}>
                  <Icon name="trash" size={16} />
                  O‘chirish
                </button>
              )}
              <button type="button" className="bulk__x" onClick={() => setSel([])} aria-label="Tanlovni bekor qilish">
                <Icon name="x" size={18} />
              </button>
            </>
          )}
        </div>
      )}

      <div className={pending ? 'table is-busy' : 'table'} role="table" aria-label="Yangiliklar">
        <div className="trow thead" role="row">
          <span role="columnheader">
            <input type="checkbox" className="chk" checked={all} onChange={() => setSel(all ? [] : rows.map((r) => r.id))} aria-label="Barchasini tanlash" />
          </span>
          <span role="columnheader" className="c-img">
            Rasm
          </span>
          <span role="columnheader">Sarlavha</span>
          <span role="columnheader" className="c-cat">
            Turkum
          </span>
          <span role="columnheader" className="c-date">
            Sana
          </span>
          <span role="columnheader" className="c-st">
            Holati
          </span>
        </div>
        {rows.map((r) => (
          <div key={r.id} className={sel.includes(r.id) ? 'trow is-sel' : 'trow'} role="row">
            <span role="cell">
              <input type="checkbox" className="chk" checked={sel.includes(r.id)} onChange={() => toggle(r.id)} aria-label={`Tanlash: ${r.title}`} />
            </span>
            <Link href={`/boshqaruv/yangiliklar/${r.id}`} className="trow__link" role="cell" tabIndex={-1} aria-hidden="true">
              {r.thumb ? <img src={r.thumb} alt="" loading="lazy" /> : <span className="ph" />}
            </Link>
            <Link href={`/boshqaruv/yangiliklar/${r.id}`} className="t" role="cell">
              <b>{r.title}</b>
              {r.kind && <small>{r.kind}</small>}
            </Link>
            <span role="cell" className="c-cat">
              <span className={`pill no-dot ${CAT_TONE[r.catKey] ?? ''}`}>{r.cat}</span>
            </span>
            <span role="cell" className="c-date d">
              {r.date}
            </span>
            <span role="cell" className="c-st">
              <span className={r.status === 'published' ? 'pill t-green' : 'pill t-yellow'}>{r.status === 'published' ? 'E’lon qilingan' : 'Qoralama'}</span>
            </span>
          </div>
        ))}
      </div>

      {msg && (
        <div className={msg.bad ? 'toast is-bad' : 'toast'} role="status">
          <Icon name={msg.bad ? 'alert' : 'check'} size={18} />
          {msg.t}
        </div>
      )}
    </>
  )
}
