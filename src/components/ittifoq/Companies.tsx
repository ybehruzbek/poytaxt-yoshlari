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
