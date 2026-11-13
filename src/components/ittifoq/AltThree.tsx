/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import { OFFICIAL } from './data'

/* ================= 3. Aʼzolik ================= */

/* ================= 4. Hujjatlar ================= */

/* ================= 5. Rasmiy maʼlumotlar ================= */

/** B — töq “pasport” kartasi: nişon va maʼlumot plitalari */
export function OfficialB() {
  return (
    <section className="sec x3-offb">
      <div className="wrap">
        <div className="x3-offb-card">
          <div className="x3-offb-head">
            <span className="x3-offb-logo">
              <img src="/img/ittifoq/logo-ittifoq.png" alt="Özbekiston yoşlar ittifoqi logotipi" width={500} height={191} />
            </span>
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
