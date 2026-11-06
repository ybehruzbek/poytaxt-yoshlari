/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { OFFICIAL, STRUCTURE } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/* ================= 2. Tuzilma ================= */

/** B — iyerarxiya: Qurultoydan boşlanğiç taşkilotgaça poğonali sxema */
export function StructureB() {
  const [top, council, ...rest] = STRUCTURE.organs
  return (
    <section className="sec x3-strb">
      <div className="wrap">
        <div className="x3-strb-head">
          <h2 className="h2">Qanday tuzilganmiz</h2>
          <p>{STRUCTURE.lead}</p>
        </div>
        <div className="x3-strb-tree">
          <article className="x3-strb-top">
            <span className="it-num">01</span>
            <h3>{top.t}</h3>
            <p>{top.d}</p>
          </article>
          <article className="x3-strb-council">
            <span className="it-num">02</span>
            <h3>{council.t}</h3>
            <p>{council.d}</p>
          </article>
          <div className="x3-strb-row">
            {rest.map((o, i) => (
              <article key={o.t}>
                <span className="it-num">{pad(i + 2)}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </article>
            ))}
          </div>
        </div>
        <ul className="x3-strb-princ">
          {STRUCTURE.principles.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ================= 3. Aʼzolik ================= */

/* ================= 4. Hujjatlar ================= */

/* ================= 5. Rasmiy maʼlumotlar ================= */

/** B — töq «pasport» kartasi: nişon va maʼlumot plitalari */
export function OfficialB() {
  return (
    <section className="sec x3-offb">
      <div className="wrap">
        <div className="x3-offb-card">
          <div className="x3-offb-head">
            <img src="/img/ittifoq/belgi.png" alt="Özbekiston yoşlar ittifoqi nişoni" />
            <h2 className="h2">Rasmiy maʼlumotlar</h2>
          </div>
          <dl>
            {OFFICIAL.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
