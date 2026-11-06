'use client'
/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { useState } from 'react'
import type { CSSProperties } from 'react'

import { GOALS, IMG, PRIORITIES, PROJECT_CARDS, QUOTE, RESULTS } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')
const ALL = 'Hammasi'
const AREAS = [ALL, ...Array.from(new Set(PROJECT_CARDS.map((p) => p.area)))]
const count = (a: string) => (a === ALL ? PROJECT_CARDS.length : PROJECT_CARDS.filter((p) => p.area === a).length)
const byArea = (a: string) => (a === ALL ? PROJECT_CARDS : PROJECT_CARDS.filter((p) => p.area === a))

function Source() {
  return (
    <>
      <a href={PRIORITIES.href} target="_blank" rel="noopener noreferrer">
        {PRIORITIES.source} <span aria-hidden="true">↗</span>
      </a>{' '}
      Ittifoq faoliyatining 12 ta ustuvor yönalişini belgilab bergan.
    </>
  )
}

/* ================= Nima qilamiz ================= */

/** B — tahririy röyxat: chapda yopişqoq sarlavha, öngda katta raqamli qatorlar */
export function GoalsB() {
  return (
    <section className="sec x2-gb-sec">
      <div className="wrap x2-gb">
        <div className="x2-gb-head">
          <h2 className="h2">Nima qilamiz</h2>
          <div className="x2-gb-dots" aria-hidden="true">
            {GOALS.map((g) => (
              <i key={g.t} style={{ background: g.c }} />
            ))}
          </div>
        </div>
        <ol className="x2-gb-list">
          {GOALS.map((g, i) => (
            <li key={g.t} style={{ '--c': g.c } as CSSProperties}>
              <span className="x2-gb-n">{pad(i)}</span>
              <h3>{g.t}</h3>
              <p>{g.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** C — rangli bento mozaika: har bir yönaliş öz rangidagi plitkada, turli ölçamda */
export function GoalsC() {
  return (
    <section className="sec x2-gc-sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Nima qilamiz</h2>
        </div>
        <div className="x2-gc">
          {GOALS.map((g, i) => (
            <article key={g.t} className={`x2-gc-${i}`} style={{ '--c': g.c } as CSSProperties}>
              <span className="x2-gc-n">{pad(i)}</span>
              <h3>{g.t}</h3>
              <p>{g.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= Ustuvor yönalişlar ================= */

/** B — krem fon, katta sariq raqamli oq kartalar uç ustunda */
export function PrioritiesB() {
  return (
    <section className="sec x2-pb-sec">
      <div className="wrap">
        <div className="x2-pb-head">
          <span className="x2-pb-big" aria-hidden="true">
            12
          </span>
          <div>
            <h2 className="h2">Davlat belgilagan ustuvor yönalişlar</h2>
            <p>
              <Source />
            </p>
          </div>
        </div>
        <ol className="x2-pb">
          {PRIORITIES.items.map((x, i) => (
            <li key={x}>
              <span>{pad(i)}</span>
              <p>{x}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** C — chapda yopişqoq töq karta (sarlavha va manba), öngda raqam-pilyulali ingiçka röyxat */
export function PrioritiesC() {
  return (
    <section className="sec x2-pc-sec">
      <div className="wrap x2-pc">
        <aside className="x2-pc-card">
          <img src="/img/ittifoq/belgi.png" alt="" />
          <h2 className="h2">Davlat belgilagan ustuvor yönalişlar</h2>
          <p>
            <Source />
          </p>
        </aside>
        <ol className="x2-pc-list">
          {PRIORITIES.items.map((x, i) => (
            <li key={x}>
              <span>{pad(i)}</span>
              <p>{x}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================= Iqtibos ================= */

/** B — butun kenglikdagi surat ustida markazlaşgan oq iqtibos */
export function QuoteB() {
  return (
    <section className="sec x2-qb-sec">
      <div className="wrap">
        <figure className="x2-qb">
          <img src={IMG.readers} alt="" />
          <blockquote>
            <p>«{QUOTE.text}»</p>
            <footer>
              <b>{QUOTE.author}</b>
              <span>{QUOTE.role}</span>
            </footer>
          </blockquote>
        </figure>
      </div>
    </section>
  )
}

/** C — sariq karta, ulkan qoştirnoq, öngda doira surat va belgi */
export function QuoteC() {
  return (
    <section className="sec">
      <div className="wrap">
        <figure className="x2-qc">
          <span className="x2-qc-mark" aria-hidden="true">
            «
          </span>
          <blockquote>
            <p>{QUOTE.text}</p>
            <footer>
              <b>{QUOTE.author}</b>
              <span>{QUOTE.role}</span>
            </footer>
          </blockquote>
          <div className="x2-qc-pic">
            <img src={IMG.readers} alt="" />
            <img className="x2-qc-badge" src="/img/ittifoq/belgi.png" alt="" />
          </div>
        </figure>
      </div>
    </section>
  )
}

/* ================= Yirik loyihalar ================= */

/** B — sanoqli segment süzgiç va jadvalsimon qatorlar: nom, maqsad, qamrov, iştirokçilar */
export function ProjectCardsB() {
  const [area, setArea] = useState(ALL)
  return (
    <div className="x2-kb">
      <div className="x2-kb-head">
        <h3>Yirik loyihalar</h3>
        <div className="x2-kb-tabs" role="group" aria-label="Loyihalar yönalişi">
          {AREAS.map((a) => (
            <button key={a} type="button" aria-pressed={a === area} className={a === area ? 'on' : undefined} onClick={() => setArea(a)}>
              {a} <sup>{count(a)}</sup>
            </button>
          ))}
        </div>
      </div>
      <ul className="x2-kb-list">
        {byArea(area).map((p) => (
          <li key={p.t}>
            <div className="x2-kb-name">
              <span>{p.area}</span>
              <h4>{p.t}</h4>
            </div>
            <p>{p.goal}</p>
            <dl>
              <div>
                <dt>Qamrov</dt>
                <dd className="x2-kb-reach">{p.reach}</dd>
              </div>
              <div>
                <dt>Iştirokçilar</dt>
                <dd>{p.who}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** C — chapda vertikal yönaliş menyusi, öngda qamrovi katta raqam bilan ajratilgan kartalar */
export function ProjectCardsC() {
  const [area, setArea] = useState(ALL)
  return (
    <div className="x2-kc">
      <div className="x2-kc-side">
        <h3>Yirik loyihalar</h3>
        <div className="x2-kc-tabs" role="group" aria-label="Loyihalar yönalişi">
          {AREAS.map((a) => (
            <button key={a} type="button" aria-pressed={a === area} className={a === area ? 'on' : undefined} onClick={() => setArea(a)}>
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

/** B — vertikal vaqt çiziği: chapda katta yil, öngda natijalar kiçik kartalarda */
export function ResultsB() {
  return (
    <section className="sec x2-rb-sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Natijalar</h2>
        </div>
        <ol className="x2-rb">
          {RESULTS.map((r) => (
            <li key={r.y}>
              <div className="x2-rb-y">
                <b>{r.y}</b>
                <ResSrc src={r.src} />
              </div>
              <ul>
                {r.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
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
              <button key={x.y} type="button" aria-pressed={x.y === y} className={x.y === y ? 'on' : undefined} onClick={() => setY(x.y)}>
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
