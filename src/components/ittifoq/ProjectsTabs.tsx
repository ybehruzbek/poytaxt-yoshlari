'use client'
/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan logotiplar */
import { useState } from 'react'

import { PROJECTS } from './data'

/** Loyihalar: çapda yönaliş tugmalari, öngda tanlangan yönalişning logotipi va loyihalari */
export function ProjectsTabs() {
  const [i, setI] = useState(0)
  const d = PROJECTS[i]
  return (
    <div className="ipr-c">
      <div className="ipr-c-list" role="tablist" aria-label="Yönalişlar">
        {PROJECTS.map((x, k) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            aria-selected={k === i}
            className={k === i ? 'on' : undefined}
            onClick={() => setI(k)}
          >
            <span>{String(k + 1).padStart(2, '0')}</span>
            {x.t}
          </button>
        ))}
      </div>
      <div className="ipr-c-view" role="tabpanel">
        <div className="ipr-c-logo">
          <img key={d.logo} src={d.logo} alt={`${d.t}: ${d.p.join(', ')}`} />
        </div>
        <h3>{d.t}</h3>
        <div className="ipr-c-tags">
          {d.p.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
