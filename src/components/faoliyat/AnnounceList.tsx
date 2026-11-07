'use client'

/* eslint-disable @next/next/no-img-element -- kanal posterlari; CMS ulanganda next/image ga o'tadi */
import { useMemo, useState } from 'react'

import type { Announce } from './announcements'
import { fmtDate, TG } from './types'

const low = (s: string) => s.toLocaleLowerCase('uz')

/** Eʼlonlar: poster töliq körinadi (kesilmaydi), yil va qidiruv böyiça saralaş */
export function AnnounceList({
  items,
  view = 'a',
}: {
  items: Announce[]
  /** VAQTINÇA: dizayn varianti — a poster to‘ri, b masonry, c doska qatorlari */
  view?: 'a' | 'b' | 'c'
}) {
  const years = useMemo(
    () => [...new Set(items.map((e) => e.date.slice(0, 4)))].sort().reverse(),
    [items],
  )
  const [year, setYear] = useState('all')
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(24)

  const list = useMemo(() => {
    const s = low(q.trim())
    return items.filter(
      (e) =>
        (year === 'all' || e.date.startsWith(year)) &&
        (!s || low(`${e.title} ${e.text}`).includes(s)),
    )
  }, [items, year, q])

  return (
    <>
      <div className="fa-tools">
        <div className="fa-chips" role="group" aria-label="Yil">
          <button
            type="button"
            className={year === 'all' ? 'on' : undefined}
            aria-pressed={year === 'all'}
            onClick={() => setYear('all')}
          >
            Barçasi <span>{items.length}</span>
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={year === y ? 'on' : undefined}
              aria-pressed={year === y}
              onClick={() => setYear(y)}
            >
              {y} <span>{items.filter((e) => e.date.startsWith(y)).length}</span>
            </button>
          ))}
        </div>
        <div className="fa-tools-r">
          <label className="fa-search">
            <span className="sr-only">Qidiruv</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Qidiruv: eʼlon mavzusi"
            />
          </label>
        </div>
      </div>

      <p className="fa-count">{list.length} ta eʼlon</p>

      {view === 'b' && (
        <div className="vb-mas">
          {list.slice(0, limit).map((e) => (
            <a key={e.id} href={TG(e.id)} target="_blank" rel="noopener noreferrer">
              <img src={e.img} alt="" loading="lazy" />
              <span>
                <time dateTime={e.date}>{fmtDate(e.date)}</time>
                <strong>{e.title}</strong>
              </span>
            </a>
          ))}
        </div>
      )}

      {view === 'c' && (
        <div className="vc-board">
          {list.slice(0, limit).map((e) => (
            <a key={e.id} href={TG(e.id)} target="_blank" rel="noopener noreferrer">
              <img src={e.img} alt="" loading="lazy" />
              <span className="vc-board-t">
                <time dateTime={e.date}>{fmtDate(e.date)}</time>
                <strong>{e.title}</strong>
                <span>{e.text}</span>
              </span>
              <em>Batafsil ↗</em>
            </a>
          ))}
        </div>
      )}

      {view === 'a' && (
        <div className="fa-anns">
          {list.slice(0, limit).map((e) => (
            <a
              key={e.id}
              href={TG(e.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="fa-ann"
            >
              <span className="fa-ann-ph">
                {e.img ? (
                  <img src={e.img} alt="" loading="lazy" />
                ) : (
                  <span className="fa-ann-noph" aria-hidden="true">
                    <small>Eʼlon</small>
                    <b>{Number(e.date.slice(8, 10))}</b>
                    <em>{fmtDate(e.date, false).split('-')[1]}</em>
                    <i>{e.date.slice(0, 4)}</i>
                  </span>
                )}
              </span>
              <span className="fa-ann-txt">
                <time dateTime={e.date}>{fmtDate(e.date)}</time>
                <strong>{e.title}</strong>
                {e.text && <span className="fa-ann-sum">{e.text}</span>}
                <span className="fa-ev-src">
                  Telegramda köriş <span aria-hidden="true">↗</span>
                </span>
              </span>
            </a>
          ))}
        </div>
      )}

      {list.length === 0 && <p className="fa-empty">Heç narsa topilmadi.</p>}
      {list.length > limit && (
        <div className="fa-more-wrap">
          <button type="button" className="btn btn-outline" onClick={() => setLimit((l) => l + 24)}>
            Yana körsatiş ({list.length - limit})
          </button>
        </div>
      )}
    </>
  )
}
