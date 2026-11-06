'use client'

import { useState } from 'react'

import { PROJECT_CARDS } from './data'

const AREAS = ['Hammasi', ...Array.from(new Set(PROJECT_CARDS.map((p) => p.area)))]

/** Yirik loyihalar: yönaliş böyiça süzgiç va maqsad, qamrov, iştirokçilar körsatilgan kartalar */
export function ProjectCards() {
  const [area, setArea] = useState('Hammasi')
  const list = area === 'Hammasi' ? PROJECT_CARDS : PROJECT_CARDS.filter((p) => p.area === area)
  return (
    <div className="ipc">
      <div className="ipc-head">
        <h3>Yirik loyihalar</h3>
        <div className="ipc-tabs" role="group" aria-label="Loyihalar yönalişi">
          {AREAS.map((a) => (
            <button key={a} type="button" aria-pressed={a === area} className={a === area ? 'on' : undefined} onClick={() => setArea(a)}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="ipc-grid">
        {list.map((p) => (
          <article key={p.t}>
            <span className="ipc-area">{p.area}</span>
            <h4>{p.t}</h4>
            <p>{p.goal}</p>
            <dl>
              <div>
                <dt>Qamrov</dt>
                <dd>{p.reach}</dd>
              </div>
              <div>
                <dt>Iştirokçilar</dt>
                <dd>{p.who}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
