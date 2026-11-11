/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan logotiplar */
import { ORGS } from './data'
import { ShowMore } from './ShowMore'

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
        <div className="ol-d" id="taskilotlar-royxat">
          {ORGS.ngos.map((o) => (
            <article key={o.t}>
              <Logo src={o.logo} alt={`${o.t} logotipi`} className="ol-d-logo" />
              <h3>{o.t}</h3>
              <p>{o.d}</p>
            </article>
          ))}
        </div>
        <ShowMore target="taskilotlar-royxat" noun="taşkilot" />
      </div>
    </section>
  )
}
