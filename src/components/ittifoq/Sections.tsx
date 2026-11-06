/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { INTL, PRIVILEGES, PROJECTS } from './data'

/* ======================= Mukofot va imtiyozlar ======================= */

/** B — çapda katta nişon va birinçi mukofot, öngda qolgan uçtasi kiçik suratlar bilan */
export function PrivilegesB() {
  const [first, ...rest] = PRIVILEGES
  return (
    <div className="ip-b">
      <article className="ip-b-main">
        <div className="ip-b-badge">
          <img src={first.img} alt={first.t} />
        </div>
        <h3>{first.t}</h3>
        <p>{first.text}</p>
        <b>{first.fact}</b>
      </article>
      <div className="ip-b-list">
        {rest.map((p) => (
          <article key={p.t}>
            <img src={p.img} alt="" />
            <div>
              <h3>{p.t}</h3>
              <p>{p.text}</p>
              <b>{p.fact}</b>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ======================= Loyihalar yönalişlari ======================= */

const PCOL = ['var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--sky)', 'var(--lime)']

/** B — kartalar toʼri: tepada logotiplar, pastda yönaliş va loyihalar */
export function ProjectsB() {
  return (
    <div className="ipr-b">
      {PROJECTS.map((d, i) => (
        <article key={d.t} style={{ borderTopColor: PCOL[i % 5] }}>
          <div className="ipr-b-logo">
            <img src={d.logo} alt={`${d.t}: ${d.p.join(', ')}`} />
          </div>
          <h3>{d.t}</h3>
          <ul>
            {d.p.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

/* ======================= Xalqaro hamkorlik ======================= */

/** B — çapda matn va raqamlar, öngda oq kartada hamkorlar; pastda bayroqlar lentasi */
export function IntlB() {
  return (
    <div className="ix-b">
      <div className="ix-b-top">
        <div>
          <h2 className="h2">Xalqaro hamkorlik</h2>
          <p>{INTL.text}</p>
          <ul>
            {INTL.forms.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="ix-b-n">
            {INTL.facts.map((f) => (
              <div key={f.l}>
                <b>{f.v}</b>
                <span>{f.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ix-b-card">
          <span>Hamkor taşkilotlar</span>
          <img src={INTL.partners} alt="Hamkor xalqaro taşkilotlar logotiplari" />
          <p>{INTL.assoc}</p>
        </div>
      </div>
      <div className="ix-b-flags" aria-label="Hamkor mamlakatlar bayroqlari">
        <div>
          <img src={INTL.flags} alt="" />
          <img src={INTL.flags} alt="" />
        </div>
      </div>
    </div>
  )
}
