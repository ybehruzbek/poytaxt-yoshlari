'use client'
import { useState } from 'react'

import { BODIES } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** C: almaşlaşuvçi tugmalar va 2×2 vazifa kartalari */
export function BodiesTabs() {
  const [on, setOn] = useState(0)
  const b = BODIES[on]
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y2-bc-tabs" role="tablist">
          {BODIES.map((x, i) => (
            <button
              key={x.t}
              type="button"
              role="tab"
              aria-selected={i === on}
              className={i === on ? 'on' : undefined}
              onClick={() => setOn(i)}
            >
              {x.t}
            </button>
          ))}
        </div>
        {b && (
          <div className="y2-bc" role="tabpanel">
            <div className="y2-bc-intro">
              <span className="y2-bc-meta">{b.meta}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </div>
            <ul className="y2-bc-grid">
              {b.items.map((x, j) => (
                <li key={x}>
                  <span>{pad(j)}</span>
                  <p>{x}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
