'use client'

import { useEffect, useRef } from 'react'

import { DevSectionsPanel } from './DevSectionsPanel'

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

/**
 * Hero pastidagi “pastga suring” belgisi. Bosilganda keyingi bölimga silliq tuşadi,
 * sahifa aylantirila boşlaşi bilan yöqoladi.
 * VAQTINCHA: uç variant (A — siçqonça, B — aylana yozuv, C — sariq tugma) panel orqali almaşadi.
 */
export function ScrollCue() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const on = () => el.classList.toggle('cue-gone', window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = () => {
    const next = root.current?.closest('section')?.nextElementSibling
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="cue" ref={root}>
      <div className="vx" data-v="cue-a">
        <button type="button" className="cue-a" onClick={go} aria-label="Pastga suring">
          <span className="cue-mouse" aria-hidden="true">
            <i />
          </span>
          <span className="cue-a-t">Pastga suring</span>
        </button>
      </div>
      <div className="vx" data-v="cue-b">
        <button type="button" className="cue-b" onClick={go} aria-label="Pastga suring">
          <svg className="cue-ring" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="cue-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
            </defs>
            <text>
              <textPath href="#cue-circle" textLength="282">
                PASTGA SURING • YOŞLAR ITTIFOQI •
              </textPath>
            </text>
          </svg>
          <span className="cue-b-ic">
            <Arrow />
          </span>
        </button>
      </div>
      <div className="vx" data-v="cue-c">
        <button type="button" className="cue-c" onClick={go} aria-label="Pastga suring">
          <Arrow />
        </button>
      </div>
      <DevSectionsPanel
        sections={[
          {
            name: 'cue',
            label: 'Pastga suriş belgisi',
            count: 3,
            hints: ['Siçqonça belgisi', 'Aylana yozuv', 'Sariq tugma'],
          },
        ]}
      />
    </div>
  )
}
