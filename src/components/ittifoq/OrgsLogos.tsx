/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan logotiplar */
import type { IttifoqData } from '@/lib/cms/sahifalar'
import { ShowMore } from './ShowMore'

const TITLE = 'Ittifoq ta’sischiligidagi tashkilotlar'

function Logo({ src, alt, className }: { src?: string; alt: string; className: string }) {
  return <span className={className}>{src && <img src={src} alt={alt} loading="lazy" />}</span>
}

/** “Ittifoq taʼsisçiligidagi taşkilotlar”: raqamlar va kartalar — çapda yirik logotip, öngda nomi, maqomi va faoliyati */
export function OrgsD({ D }: { D: IttifoqData }) {
  const { ORGS } = D
  return (
    <section className="sec">
      <div className="wrap">
        <div className="og-head">
          <h2 className="h2">{TITLE}</h2>
          <div className="og-facts">
            <div>
              <b>36</b>
              <span>Ittifoq tizimidagi tashkilotlar</span>
            </div>
            <div>
              <b>19</b>
              <span>nodavlat notijorat tashkilotlar</span>
            </div>
            <div>
              <b>228</b>
              <span>xodimlar soni</span>
            </div>
          </div>
        </div>
        <ul className="og3-c" id="taskilotlar-royxat">
          {ORGS.ngos.map((o) => (
            <li key={o.t}>
              <Logo src={o.logo} alt={`${o.t} logotipi`} className="og3-logo og3-logo-xl" />
              <div className="og3-c-bd">
                <h3>{o.t}</h3>
                <small>Nodavlat notijorat tashkiloti</small>
                <p>{o.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <ShowMore target="taskilotlar-royxat" noun="tashkilot" />
      </div>
    </section>
  )
}
