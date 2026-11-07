'use client'

/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
import { useMemo, useState } from 'react'

import type { Ev } from './events'
import { type DirSlug, fmtDate, TG } from './types'

const low = (s: string) => s.toLocaleLowerCase('uz')

/** Tadbirlar arxivi: yil, yönaliş va qidiruv böyiça saralaş; har bir tadbir kanaldagi asl postga olib boradi */
export function EventsList({
  events,
  dirs,
}: {
  events: Ev[]
  dirs: Array<{ slug: DirSlug; title: string }>
}) {
  const years = useMemo(
    () => [...new Set(events.map((e) => e.date.slice(0, 4)))].sort().reverse(),
    [events],
  )
  const [year, setYear] = useState<string>('all')
  const [dir, setDir] = useState<'all' | DirSlug>('all')
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(24)

  const list = useMemo(() => {
    const s = low(q.trim())
    return events.filter(
      (e) =>
        (year === 'all' || e.date.startsWith(year)) &&
        (dir === 'all' || e.dir === dir) &&
        (!s || low(`${e.title} ${e.place} ${e.summary}`).includes(s)),
    )
  }, [events, year, dir, q])

  const usedDirs = dirs.filter((d) => events.some((e) => e.dir === d.slug))

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
            Barçasi <span>{events.length}</span>
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={year === y ? 'on' : undefined}
              aria-pressed={year === y}
              onClick={() => setYear(y)}
            >
              {y} <span>{events.filter((e) => e.date.startsWith(y)).length}</span>
            </button>
          ))}
        </div>
        <div className="fa-tools-r">
          <label className="fa-select">
            <span className="sr-only">Yönaliş</span>
            <select value={dir} onChange={(e) => setDir(e.target.value as 'all' | DirSlug)}>
              <option value="all">Barça yönalişlar</option>
              {usedDirs.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.title}
                </option>
              ))}
            </select>
          </label>
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
              placeholder="Qidiruv: tadbir nomi yoki joyi"
            />
          </label>
        </div>
      </div>

      <p className="fa-count">{list.length} ta tadbir</p>

      <div className="fa-evs">
        {list.slice(0, limit).map((e) => (
          <a key={e.id} href={TG(e.id)} target="_blank" rel="noopener noreferrer" className="fa-ev">
            <span className="fa-ev-ph">
              {e.img ? <img src={e.img} alt="" loading="lazy" /> : <span className="fa-ev-noph" />}
            </span>
            <span className="fa-ev-txt">
              <time dateTime={e.date}>{fmtDate(e.date)}</time>
              <strong>{e.title}</strong>
              {e.place && <span className="fa-ev-place">{e.place}</span>}
              {e.summary && <span className="fa-ev-sum">{e.summary}</span>}
              <span className="fa-ev-src">
                Telegramda köriş <span aria-hidden="true">↗</span>
              </span>
            </span>
          </a>
        ))}
      </div>

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
