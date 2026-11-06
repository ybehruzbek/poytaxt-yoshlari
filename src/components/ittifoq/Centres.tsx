'use client'
/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { useState } from 'react'

import { CENTRES, CITY_CENTRE, PALACE } from './data'

/**
 * Yoşlar markazlari: avval Yoşlar ijod saroyi va Toşkent şahar Yoşlar markazi (asosiy),
 * keyin hududlar röyxati — hududni bossangiz, shu markazning surati çiqadi.
 */
export function Centres() {
  const [i, setI] = useState(0)
  const c = CENTRES[i]
  return (
    <section className="sec" id="yoshlar-markazlari">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Yoşlar markazlari</h2>
          <p className="it-cen-lead">
            <b>14</b> ta hududda Yoşlar markazi doimiy faoliyat yuritadi
          </p>
        </div>

        <div className="it-cen-main">
          <article className="it-palace">
            <div className="it-palace-img">
              <img src={PALACE.img} alt={`${PALACE.org} ${PALACE.name} binosi`} />
              <span>{PALACE.org}</span>
            </div>
            <div className="it-palace-txt">
              <h3>{PALACE.name}</h3>
              <p>{PALACE.text}</p>
              <ul>
                {PALACE.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="it-palace-gal">
                {PALACE.gallery.map((g) => (
                  <img key={g} src={g} alt="" />
                ))}
              </div>
            </div>
          </article>

          <article className="it-city">
            <img src={CITY_CENTRE.img} alt={`${CITY_CENTRE.name} binosi`} />
            <div>
              <span className="it-city-tag">Poytaxtda</span>
              <h3>{CITY_CENTRE.name}</h3>
              <p>{CITY_CENTRE.text}</p>
              <ul>
                {CITY_CENTRE.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <div className="it-reg">
          <div className="it-reg-list" role="tablist" aria-label="Hududlar">
            {CENTRES.map((x, k) => (
              <button
                key={x.region}
                type="button"
                role="tab"
                aria-selected={k === i}
                className={k === i ? 'on' : undefined}
                onClick={() => setI(k)}
              >
                {x.region}
              </button>
            ))}
          </div>
          <figure className="it-reg-view" role="tabpanel">
            <img key={c.img} src={c.img} alt={`${c.region} Yoşlar markazi binosi`} />
            <figcaption>
              <b>{c.region}</b>
              <span>Yoşlar markazi</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
