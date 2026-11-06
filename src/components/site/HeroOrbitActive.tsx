'use client'
/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga ötadi */

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import { DIRS, DirChip } from './HeroArt'

/**
 * C2 · Faol yönaliş: orbitadagi yönalişlar navbat bilan "yonadi", markazdagi surat va izoh şu yönalişga
 * almaşadi. Ustiga kelinganda töxtaydi; yorliq ustiga kelsa — öşa yönaliş tanlanadi.
 */
export function HeroOrbitActive() {
  const [on, setOn] = useState(0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (hold) return
    const id = window.setInterval(() => setOn((v) => (v + 1) % DIRS.length), 3000)
    return () => window.clearInterval(id)
  }, [hold])

  const cur = DIRS[on]
  return (
    <div
      className="ha hac hac2"
      aria-hidden="true"
      style={{ '--tone': cur.c } as CSSProperties}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <span className="hac2-glow" />
      <span className="hac-ring r1" />
      <span className="hac-ring r2" />
      <div className="hac-photo hac2-photo">
        {DIRS.map((d, i) => (
          <img key={d.t} src={`/img/${d.img}.jpg`} alt="" className={i === on ? 'on' : undefined} />
        ))}
      </div>
      {DIRS.map((d, i) => {
        const a = (360 / DIRS.length) * i - 90
        return (
          <span
            key={d.t}
            className={`hac2-item${i === on ? ' on' : ''}`}
            style={{ '--a': `${a}deg` } as CSSProperties}
            onMouseEnter={() => setOn(i)}
          >
            <DirChip d={d} />
          </span>
        )
      })}
      <div className="hac2-caption">
        <b>{cur.t}</b>
        <span>{cur.d}</span>
        <span className="hac2-dots">
          {DIRS.map((d, i) => (
            <i key={d.t} className={i === on ? 'on' : undefined} />
          ))}
        </span>
      </div>
    </div>
  )
}
