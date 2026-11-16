'use client'

/* eslint-disable @next/next/no-img-element -- kanal posterlari; CMS ulanganda next/image ga o'tadi */
import { useMemo, useState } from 'react'

import type { Announce } from './types'
import { fmtDate, TG } from './types'
import { More } from '@/components/site/MoreBtn'
import { MoreToggle } from '@/components/site/MoreToggle'

const low = (s: string) => s.toLocaleLowerCase('uz')

/** Eʼlon turi — sarlavha va matndagi kalit sözlardan aniqlanadi */
const TURLAR = [
  { id: 'challenge', label: 'Çellenjlar', re: /çellenj|challenge/i },
  {
    id: 'tanlov',
    label: 'Tanlovlar',
    re: /tanlov|musobaqa|olimpiada|viktorina|quiz|turnir|bellaşuv|çempionat/i,
  },
  {
    id: 'trening',
    label: 'Trening va seminarlar',
    re: /seminar|trening|master|masterklass|vebinar|kurs|maktab|dars|konferensiya|forum|muloqot/i,
  },
  { id: 'sayohat', label: 'Sayohat va oromgoh', re: /sayohat|hiking|oromgoh|lager|ekskursiya/i },
  {
    id: 'grant',
    label: 'Stipendiya va grant',
    re: /stipendiya|grant|subsidiya|imtiyoz|mukofot|çegirma/i,
  },
] as const

const turi = (e: Announce) => TURLAR.find((t) => t.re.test(`${e.title} ${e.text}`))?.id ?? 'boshqa'

/** Eʼlonlar doskasi: har bir poster öz şaklida (tik yoki yotiq) turadi, kesilmaydi */
export function AnnounceList({ items }: { items: Announce[] }) {
  const years = useMemo(
    () => [...new Set(items.map((e) => e.date.slice(0, 4)))].sort().reverse(),
    [items],
  )
  const [year, setYear] = useState('all')
  const [tur, setTur] = useState('all')
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(24)

  const list = useMemo(() => {
    const s = low(q.trim())
    return items.filter(
      (e) =>
        (year === 'all' || e.date.startsWith(year)) &&
        (tur === 'all' || turi(e) === tur) &&
        (!s || low(`${e.title} ${e.text}`).includes(s)),
    )
  }, [items, year, tur, q])

  return (
    <>
      <div className="fa-tools">
        <div className="chips fa-chips" role="group" aria-label="Yil">
          <button type="button" aria-pressed={year === 'all'} onClick={() => setYear('all')}>
            Barçasi <span>{items.length}</span>
          </button>
          {years.map((y) => (
            <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>
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

      <div className="chips fa-chips fa-chips-tur" role="group" aria-label="Eʼlon turi">
        <button type="button" aria-pressed={tur === 'all'} onClick={() => setTur('all')}>
          Hammasi
        </button>
        {TURLAR.map((t) => {
          const n = items.filter((e) => turi(e) === t.id).length
          return n ? (
            <button
              key={t.id}
              type="button"
              aria-pressed={tur === t.id}
              onClick={() => setTur(t.id)}
            >
              {t.label} <span>{n}</span>
            </button>
          ) : null
        })}
      </div>

      <p className="fa-count">{list.length} ta eʼlon</p>

      <div className="vc-board">
        {list.slice(0, limit).map((e) => (
          <a
            key={e.id}
            href={e.href ?? TG(e.id)}
            {...(e.href ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <span className="vc-board-ph">
              <img src={e.img} alt="" loading="lazy" />
            </span>
            <span className="vc-board-t">
              <time dateTime={e.date}>{fmtDate(e.date)}</time>
              <strong>{e.title}</strong>
              <span>{e.text}</span>
            </span>
            <span className="more-btn">
              <More />
            </span>
          </a>
        ))}
      </div>

      {list.length === 0 && <p className="fa-empty">Qidiruv böyiça natija topilmadi.</p>}
      {list.length > 24 && (
        <MoreToggle
          rest={Math.max(list.length - limit, 0)}
          noun="eʼlon"
          onMore={() => setLimit((l) => l + 24)}
          onLess={() => setLimit(24)}
        />
      )}
    </>
  )
}
