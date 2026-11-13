'use client'
/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */

import Link from 'next/link'
import { useState } from 'react'

import { More } from './MoreBtn'

export type EvView = {
  title: string
  type: string
  org: string
  img: string
  href: string
  left: string
  day: string
  mon: string
  wd: string
  full: string
  time: string
}

const Org = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </svg>
)
const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

type V = 'a' | 'b' | 'c' | 'd'
const VARS: { id: V; label: string }[] = [
  { id: 'a', label: 'A · Afişa (hozirgi)' },
  { id: 'b', label: 'B · Kalendar qator' },
  { id: 'c', label: 'C · Banner' },
  { id: 'd', label: 'D · Yonma-yon' },
]

/** Yaqin tadbirlar köriniş variantlari (tanlangandan keyin bittasi qoldiriladi) */
export function EventsViews({ items }: { items: EvView[] }) {
  const [v, setV] = useState<V>('a')

  const afisha = (
    <div className={`evv-c${items.length < 3 ? ' evv-wide' : ''}`}>
      {items.map((e) => (
        <Link key={e.href} href={e.href} className="pt-ticket">
          <div className="pt-img">
            <img className="cover" src={e.img} alt="" />
            <span className="pa-type">{e.type}</span>
            <span className="pt-left">{e.left}</span>
          </div>
          <div className="pt-cut" aria-hidden="true" />
          <div className="pt-stub">
            <span className="pt-date">
              <b>{e.day}</b>
              <small>{e.mon}</small>
            </span>
            <div className="pt-txt">
              <h3>{e.title}</h3>
              <p>{e.wd}, {e.full} · {e.time}</p>
              <p><Org /> {e.org}</p>
            </div>
          </div>
          <span className="more-btn pt-cta"><More /></span>
        </Link>
      ))}
    </div>
  )

  const kalendar = (
    <ol className="ev-rows">
      {items.map((e) => (
        <li key={e.href}>
          <Link href={e.href}>
            <span className="ev-row-d">
              <b>{e.day}</b>
              <small>{e.mon}</small>
            </span>
            <span className="ev-row-t">
              <strong>{e.title}</strong>
              <span className="ev-row-m">
                <span><Clock /> {e.wd}, {e.time}</span>
                <span><Org /> {e.org}</span>
              </span>
            </span>
            <img src={e.img} alt="" />
            <span className="ev-row-l">{e.left}</span>
            <span className="more-btn"><More /></span>
          </Link>
        </li>
      ))}
    </ol>
  )

  const banner = (
    <div className="ev-bans">
      {items.map((e) => (
        <Link key={e.href} href={e.href} className="ev-ban">
          <img src={e.img} alt="" />
          <span className="ev-ban-in">
            <span className="ev-ban-top">
              <span className="ev-ban-d">{e.full}</span>
              <span className="ev-ban-l">{e.left}</span>
            </span>
            <strong>{e.title}</strong>
            <span className="ev-ban-m">
              <span><Clock /> {e.wd}, {e.time}</span>
              <span><Org /> {e.org}</span>
            </span>
            <span className="more-btn"><More /></span>
          </span>
        </Link>
      ))}
    </div>
  )

  const split = (
    <div className="ev-splits">
      {items.map((e) => (
        <Link key={e.href} href={e.href} className="ev-split">
          <span className="ev-split-im">
            <img src={e.img} alt="" />
            <span className="ev-split-d">
              <b>{e.day}</b>
              <small>{e.mon}</small>
            </span>
          </span>
          <span className="ev-split-t">
            <span className="ev-split-l">{e.left}</span>
            <strong>{e.title}</strong>
            <span className="ev-row-m">
              <span><Clock /> {e.wd}, {e.time}</span>
              <span><Org /> {e.org}</span>
            </span>
            <span className="more-btn"><More /></span>
          </span>
        </Link>
      ))}
    </div>
  )

  return (
    <>
      {process.env.NODE_ENV !== 'production' && (
        <div className="chips dev-vars" role="group" aria-label="Köriniş varianti">
          {VARS.map((x) => (
            <button key={x.id} type="button" aria-pressed={v === x.id} onClick={() => setV(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
      )}
      {v === 'a' && afisha}
      {v === 'b' && kalendar}
      {v === 'c' && banner}
      {v === 'd' && split}
    </>
  )
}
