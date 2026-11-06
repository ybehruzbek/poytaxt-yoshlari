/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan logotiplar */
import { ORGS } from './data'

const TITLE = 'Ittifoq taʼsisçiligidagi taşkilotlar'

function Logo({ src, alt, className }: { src?: string; alt: string; className: string }) {
  return <span className={className}>{src && <img src={src} alt={alt} loading="lazy" />}</span>
}

/** D — logotiplar devori: katta logotip, ostida nomi va qisqa tavsif */
export function OrgsD() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">{TITLE}</h2>
        </div>
        <p className="ol-lead">{ORGS.lead}</p>
        <div className="ol-d">
          {ORGS.ngos.map((o) => (
            <article key={o.t}>
              <Logo src={o.logo} alt={`${o.t} logotipi`} className="ol-d-logo" />
              <h3>{o.t}</h3>
              <p>{o.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** E — tepada aylanib turuvçi logotiplar lentasi, ostida ixçam röyxat (logotip + nom + tavsif) */
export function OrgsE() {
  const loop = [...ORGS.ngos, ...ORGS.ngos]
  return (
    <section className="sec ol-e-sec">
      <div className="wrap">
        <div className="ol-e-head">
          <h2 className="h2">{TITLE}</h2>
          <p>{ORGS.lead}</p>
        </div>
      </div>
      <div className="ol-e-marq" aria-hidden="true">
        <div>
          {loop.map((o, i) => (
            <Logo key={i} src={o.logo} alt="" className="ol-e-chip" />
          ))}
        </div>
      </div>
      <div className="wrap">
        <ol className="ol-e-list">
          {ORGS.ngos.map((o) => (
            <li key={o.t}>
              <Logo src={o.logo} alt={`${o.t} logotipi`} className="ol-e-logo" />
              <div>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** F — töq bölim: logotiplar oq doiralarda, ostida nomi; tavsif sichqonça olib borilganda çiqadi */
export function OrgsF() {
  return (
    <section className="sec ol-f-sec">
      <div className="wrap">
        <div className="ol-f-head">
          <h2 className="h2">{TITLE}</h2>
          <p>{ORGS.lead}</p>
        </div>
        <ul className="ol-f">
          {ORGS.ngos.map((o) => (
            <li key={o.t} tabIndex={0}>
              <Logo src={o.logo} alt={`${o.t} logotipi`} className="ol-f-logo" />
              <h3>{o.t}</h3>
              <p>{o.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
