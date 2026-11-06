/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { INTL, PRIVILEGES, PROJECTS } from './data'
import { ProjectsTabs } from './ProjectsTabs'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/* ======================= Mukofot va imtiyozlar ======================= */

/** A — kartalar, tepada surat (nişon sariq fonda) */
export function PrivilegesA() {
  return (
    <div className="ip-a">
      {PRIVILEGES.map((p, i) => (
        <article key={p.t}>
          <div className={`ip-img${p.badge ? ' ip-badge' : ''}`}>
            <img src={p.img} alt={p.badge ? p.t : ''} />
          </div>
          <div className="ip-body">
            <span className="it-num">{pad(i)}</span>
            <h3>{p.t}</h3>
            <p>{p.text}</p>
            <b>{p.fact}</b>
          </div>
        </article>
      ))}
    </div>
  )
}

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

/** C — zigzag qatorlar: surat va matn navbat bilan almaşadi */
export function PrivilegesC() {
  return (
    <div className="ip-c">
      {PRIVILEGES.map((p, i) => (
        <article key={p.t} className={i % 2 ? 'rev' : undefined}>
          <div className={`ip-c-img${p.badge ? ' ip-badge' : ''}`}>
            <img src={p.img} alt={p.badge ? p.t : ''} />
          </div>
          <div className="ip-c-txt">
            <span className="ip-c-n">{pad(i)}</span>
            <h3>{p.t}</h3>
            <p>{p.text}</p>
            <b>{p.fact}</b>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ======================= Loyihalar yönalişlari ======================= */

const PCOL = ['var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--sky)', 'var(--lime)']

/** A — röyxat qatorlari, öngda loyihalar logotiplari */
export function ProjectsA() {
  return (
    <div className="ipr-a">
      {PROJECTS.map((d, i) => (
        <div key={d.t}>
          <span className="ipr-dot" style={{ background: PCOL[i % 5] }} />
          <div>
            <b>{d.t}</b>
            <span>{d.p.join(' · ')}</span>
          </div>
          <img src={d.logo} alt={`${d.t}: ${d.p.join(', ')}`} />
        </div>
      ))}
    </div>
  )
}

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

/** C — yönaliş tugmalari va tanlangan yönalişning katta kartasi */
export function ProjectsC() {
  return <ProjectsTabs />
}

/* ======================= Xalqaro hamkorlik ======================= */

/** A — töq blok + ostida hamkor taşkilotlar va bayroqlar */
export function IntlA() {
  return (
    <div className="ix-a">
      <div className="it-intl">
        <div>
          <h2 className="h2">Xalqaro hamkorlik</h2>
          <p>{INTL.text}</p>
          <p>{INTL.assoc}</p>
        </div>
        <div className="it-intl-n">
          {INTL.facts.map((f) => (
            <div key={f.l}>
              <b>{f.v}</b>
              <span>{f.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ix-a-row">
        <figure>
          <figcaption>Hamkor xalqaro taşkilotlar</figcaption>
          <img src={INTL.partners} alt="Hamkor xalqaro taşkilotlar logotiplari" />
        </figure>
        <figure>
          <figcaption>20 dan ziyod hamkor mamlakat</figcaption>
          <img src={INTL.flags} alt="Hamkor mamlakatlar bayroqlari" />
        </figure>
      </div>
    </div>
  )
}

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

/** C — katta raqamlar, ikki karta (taşkilotlar, mamlakatlar) va xalqaro loyihalar röyxati */
export function IntlC() {
  return (
    <div className="ix-c">
      <div className="sec-head">
        <h2 className="h2">Xalqaro hamkorlik</h2>
      </div>
      <div className="ix-c-n">
        {INTL.facts.map((f) => (
          <div key={f.l}>
            <b>{f.v}</b>
            <span>{f.l}</span>
          </div>
        ))}
      </div>
      <div className="ix-c-grid">
        <div className="ix-c-card">
          <h3>Hamkor taşkilotlar</h3>
          <p>{INTL.text}</p>
          <img src={INTL.partners} alt="Hamkor xalqaro taşkilotlar logotiplari" />
        </div>
        <div className="ix-c-card">
          <h3>20 dan ziyod mamlakat</h3>
          <p>{INTL.assoc}</p>
          <img src={INTL.flags} alt="Hamkor mamlakatlar bayroqlari" />
        </div>
        <div className="ix-c-card ix-c-dark">
          <h3>Xalqaro loyihalar</h3>
          <ol>
            {INTL.projects.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
