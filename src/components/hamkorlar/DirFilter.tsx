'use client'

import { useState } from 'react'

import { type Dir, DIRS, PARTNERS } from './data'
import { PartnerCard } from './PartnerCard'

/** Hamkorlik yönalişi böyiça saralaş: “Barçasi” va har bir yönaliş tugmasi */
export function DirFilter() {
  const [on, setOn] = useState<Dir | ''>('')
  const used = DIRS.filter((d) => PARTNERS.some((p) => p.dirs.includes(d.k)))
  const list = on ? PARTNERS.filter((p) => p.dirs.includes(on)) : PARTNERS
  return (
    <>
      <div className="pt-filter" role="group" aria-label="Hamkorlik yönalişi">
        <span className="pt-filter-l">Yönaliş:</span>
        <button type="button" aria-pressed={!on} onClick={() => setOn('')}>
          Barçasi <b>{PARTNERS.length}</b>
        </button>
        {used.map((d) => (
          <button key={d.k} type="button" aria-pressed={on === d.k} onClick={() => setOn(d.k)}>
            {d.t} <b>{PARTNERS.filter((p) => p.dirs.includes(d.k)).length}</b>
          </button>
        ))}
      </div>
      <div className="pt-grid pt-grid--3">
        {list.map((p) => (
          <PartnerCard key={p.name} p={p} />
        ))}
      </div>
    </>
  )
}
