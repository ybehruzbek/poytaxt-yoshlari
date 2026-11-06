/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { CENTRES, CITY_CENTRE, PALACE } from './data'

const REGIONAL = CENTRES.slice(1)

function Head() {
  return (
    <div className="sec-head">
      <h2 className="h2">Yoşlar markazlari</h2>
      <p className="it-cen-lead">
        <b>14</b> ta hududda Yoşlar markazi doimiy faoliyat yuritadi
      </p>
    </div>
  )
}

/** B — keng Yoşlar ijod saroyi lentasi, Toşkent şahar markazi va barça hududlar suratli toʼrda */
export function CentresB() {
  return (
    <section className="sec" id="yoshlar-markazlari-b">
      <div className="wrap">
        <Head />
        <article className="icb-palace">
          <img src={PALACE.img} alt={`${PALACE.org} ${PALACE.name} binosi`} />
          <div>
            <span className="it-city-tag">{PALACE.org}</span>
            <h3>{PALACE.name}</h3>
            <p>{PALACE.text}</p>
            <ul>
              {PALACE.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </article>
        <div className="icb-grid">
          <article className="icb-city">
            <img src={CITY_CENTRE.img} alt={`${CITY_CENTRE.name} binosi`} />
            <div>
              <span className="it-city-tag">Poytaxtda</span>
              <h3>{CITY_CENTRE.name}</h3>
              <p>{CITY_CENTRE.text}</p>
            </div>
          </article>
          {REGIONAL.map((c) => (
            <figure key={c.region} className="icb-card">
              <img src={c.img} alt={`${c.region} Yoşlar markazi binosi`} />
              <figcaption>
                <b>{c.region}</b>
                <span>Yoşlar markazi</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
