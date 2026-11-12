'use client'

import Link from 'next/link'
import { useDeferredValue, useId, useState } from 'react'

import type { YnCat, YnItem, YnMonth } from './data'
import { Chip, Empty, Img } from './YnShared'

/** Rasm nisbatlari navbat bilan almaşadi — jurnal (masonry) ritmi */
const RATIOS = ['r1', 'r2', 'r3', 'r2', 'r1', 'r3']

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ʼ‘’'`]/g, '')

/**
 * C — jurnal arxivi (kun.uz / The Verge arxivi va gov.uk qidiruvi uslubida):
 * yopişqoq filtr paneli (qidiruv, turkum, oy), natijalar soni va masonry kartalar.
 */
export function VariantC({
  items,
  cats,
  months,
  L,
}: {
  items: YnItem[]
  cats: YnCat[]
  months: YnMonth[]
  L: string
}) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [month, setMonth] = useState('all')
  const dq = useDeferredValue(q)
  const uid = useId()

  const needle = norm(dq.trim())
  const list = items.filter(
    (i) =>
      (cat === 'all' || i.category === cat) &&
      (month === 'all' || i.month === month) &&
      (!needle || norm(`${i.title} ${i.excerpt}`).includes(needle)),
  )
  const reset = () => {
    setQ('')
    setCat('all')
    setMonth('all')
  }
  const dirty = q || cat !== 'all' || month !== 'all'

  return (
    <section className="sec yn-c" aria-label="Yangiliklar arxivi">
      <div className="wrap">
        <form className="yn-c-bar" role="search" onSubmit={(e) => e.preventDefault()}>
          <label className="yn-c-search">
            <span className="sr-only">Yangiliklardan qidiriş</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sarlavha yoki matndan qidiriş"
              autoComplete="off"
            />
          </label>
          <label className="yn-c-sel">
            <span>Turkum</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="all">Barçasi</option>
              {cats.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} ({c.count})
                </option>
              ))}
            </select>
          </label>
          <label className="yn-c-sel">
            <span>Oy</span>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="all">Barça oylar</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label} ({m.count})
                </option>
              ))}
            </select>
          </label>
        </form>

        <div className="yn-c-head">
          <p id={`${uid}-n`} aria-live="polite">
            <b>{list.length}</b> ta yangilik
          </p>
          {dirty && (
            <button type="button" className="yn-c-clear" onClick={reset}>
              Filtrni tozalaş ×
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <Empty onReset={reset} />
        ) : (
          <ul className="yn-c-grid" aria-describedby={`${uid}-n`}>
            {list.map((it, k) => (
              <li key={it.id}>
                <article className="yn-c-card">
                  <Link href={`${L}/${it.slug}`}>
                    <div className="yn-c-media">
                      <Img it={it} className={RATIOS[k % RATIOS.length]} />
                      <Chip it={it} />
                    </div>
                    <div className="yn-c-bd">
                      <time dateTime={it.dateISO}>{it.long}</time>
                      <h3>{it.title}</h3>
                      {k % 3 !== 2 && <p>{it.excerpt}</p>}
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
