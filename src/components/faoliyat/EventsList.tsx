'use client'

/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
import { useMemo, useState } from 'react'

import type { Ev } from './events'
import { type DirSlug, fmtDate, TG } from './types'
import { More } from '@/components/site/MoreBtn'
import { MoreToggle } from '@/components/site/MoreToggle'

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
  const shown = list.slice(0, limit)

  return (
    <>
      <div className="fa-tools">
        <div className="chips fa-chips" role="group" aria-label="Yil">
          <button
            type="button"
            aria-pressed={year === 'all'}
            onClick={() => setYear('all')}
          >
            Barçasi <span>{events.length}</span>
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
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
        {shown.map((e) => (
          <a key={e.id} href={TG(e.id)} target="_blank" rel="noopener noreferrer" className="fa-ev">
            <span className="fa-ev-ph">
              {e.img ? (
                <img src={e.img} alt="" loading="lazy" />
              ) : (
                <span className="fa-ev-noph" aria-hidden="true">
                  Tadbir
                </span>
              )}
            </span>
            <span className="fa-ev-txt">
              <time dateTime={e.date}>{fmtDate(e.date)}</time>
              <strong>{e.title}</strong>
              <span className="fa-ev-place">{e.place}</span>
              <span className="fa-ev-sum">{e.summary}</span>
              <span className="more-btn">
                <More />
              </span>
            </span>
          </a>
        ))}
      </div>

      {list.length === 0 && <p className="fa-empty">Heç narsa topilmadi.</p>}
      {list.length > 24 && (
        <MoreToggle
          rest={Math.max(list.length - limit, 0)}
          noun="tadbir"
          onMore={() => setLimit((l) => l + 24)}
          onLess={() => setLimit(24)}
        />
      )}
    </>
  )
}
