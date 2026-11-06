/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan logotiplar */
import type { CSSProperties } from 'react'

import { COMPANIES, type Company } from './data'

const TITLE = 'Media, naşriyot va xizmat taşkilotlari'
const LEAD =
  'Ittifoq uluşi bölgan taşkilotlar yoşlar uçun teleradio, matbuot, naşriyot, turizm va dam oliş xizmatlarini taqdim etadi.'
const KINDS: Company['kind'][] = ['Media', 'Naşriyot', 'Xizmat']
const KIND_COLOR: Record<Company['kind'], string> = {
  Media: 'var(--blue)',
  Naşriyot: 'var(--green)',
  Xizmat: 'var(--sky)',
}

function Logo({ c, className }: { c: Company; className: string }) {
  return (
    <span className={className}>
      <img src={c.logo} alt={`${c.t} logotipi`} loading="lazy" />
    </span>
  )
}

function Head() {
  return (
    <div className="co-head">
      <h2 className="h2">{TITLE}</h2>
      <p>{LEAD}</p>
    </div>
  )
}

/** A — uç ustun: Media, Naşriyot, Xizmat; har birida logotipli kartalar */
export function CompaniesA() {
  return (
    <section className="sec">
      <div className="wrap">
        <Head />
        <div className="co-a">
          {KINDS.map((k) => (
            <div key={k} className="co-a-col" style={{ '--k': KIND_COLOR[k] } as CSSProperties}>
              <h3>{k}</h3>
              {COMPANIES.filter((c) => c.kind === k).map((c) => (
                <article key={c.t}>
                  <Logo c={c} className="co-a-logo" />
                  <div>
                    <h4>{c.t}</h4>
                    <p>{c.d}</p>
                    <b>Ittifoq uluşi: {c.share}</b>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** B — töq bölimda logotiplar devori: katta oq plitkalar, ostida nomi va yönaliş belgisi */
export function CompaniesB() {
  return (
    <section className="sec co-b-sec">
      <div className="wrap">
        <Head />
        <div className="co-b">
          {COMPANIES.map((c) => (
            <article key={c.t}>
              <Logo c={c} className="co-b-logo" />
              <h4>{c.t}</h4>
              <p>{c.d}</p>
              <span className="co-b-kind" style={{ background: KIND_COLOR[c.kind] }}>{c.kind}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** C — jadval: logotip, nomi va faoliyati, yönaliş va Ittifoq uluşi çizğiçasi */
export function CompaniesC() {
  return (
    <section className="sec">
      <div className="wrap">
        <Head />
        <ol className="co-c">
          {COMPANIES.map((c) => (
            <li key={c.t}>
              <Logo c={c} className="co-c-logo" />
              <div className="co-c-name">
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
              <span className="co-c-kind" style={{ color: KIND_COLOR[c.kind] }}>
                {c.kind}
              </span>
              <div className="co-c-share" aria-label={`Ittifoq uluşi ${c.share}`}>
                <i style={{ width: c.share }} />
                <b>{c.share}</b>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
