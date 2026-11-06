'use client'
import { useState } from 'react'

import { PROJECT_CARDS, RESULTS } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')
const ALL = 'Hammasi'
const AREAS = [ALL, ...Array.from(new Set(PROJECT_CARDS.map((p) => p.area)))]
const count = (a: string) =>
  a === ALL ? PROJECT_CARDS.length : PROJECT_CARDS.filter((p) => p.area === a).length
const byArea = (a: string) =>
  a === ALL ? PROJECT_CARDS : PROJECT_CARDS.filter((p) => p.area === a)

/* ================= Ustuvor yönalişlar ================= */

/* ================= Iqtibos ================= */

/* ================= Yirik loyihalar ================= */

/** C — chapda vertikal yönaliş menyusi, öngda qamrovi katta raqam bilan ajratilgan kartalar */
export function ProjectCardsC() {
  const [area, setArea] = useState(ALL)
  return (
    <div className="x2-kc">
      <div className="x2-kc-side">
        <h3>Yirik loyihalar</h3>
        <div className="x2-kc-tabs" role="group" aria-label="Loyihalar yönalişi">
          {AREAS.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={a === area}
              className={a === area ? 'on' : undefined}
              onClick={() => setArea(a)}
            >
              <span>{a}</span>
              <b>{count(a)}</b>
            </button>
          ))}
        </div>
      </div>
      <div className="x2-kc-grid">
        {byArea(area).map((p) => (
          <article key={p.t}>
            <strong>{p.reach}</strong>
            <h4>{p.t}</h4>
            <p>{p.goal}</p>
            <footer>
              <span>{p.area}</span>
              <small>
                Iştirokçilar: <b>{p.who}</b>
              </small>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ================= Natijalar ================= */

function ResSrc({ src }: { src?: string }) {
  return src ? (
    <a className="x2-src" href={src} target="_blank" rel="noopener noreferrer">
      Manba <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span className="x2-src x2-src-mute">Manba: Ittifoq taqdimoti, 2026</span>
  )
}

/** C — töq fon, yillar böyiça almaşuvçi tugmalar va katta raqamli natijalar */
export function ResultsC() {
  const [y, setY] = useState(RESULTS[RESULTS.length - 1].y)
  const r = RESULTS.find((x) => x.y === y) ?? RESULTS[0]
  return (
    <section className="sec x2-rc-sec">
      <div className="wrap">
        <div className="x2-rc-head">
          <h2 className="h2">Natijalar</h2>
          <div className="x2-rc-tabs" role="group" aria-label="Yil">
            {RESULTS.map((x) => (
              <button
                key={x.y}
                type="button"
                aria-pressed={x.y === y}
                className={x.y === y ? 'on' : undefined}
                onClick={() => setY(x.y)}
              >
                {x.y}
              </button>
            ))}
          </div>
        </div>
        <div className="x2-rc">
          <b className="x2-rc-year" aria-hidden="true">
            {r.y}
          </b>
          <ol>
            {r.items.map((x, i) => (
              <li key={x}>
                <span>{pad(i)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
        <ResSrc src={r.src} />
      </div>
    </section>
  )
}
