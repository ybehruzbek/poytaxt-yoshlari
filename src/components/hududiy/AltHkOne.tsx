/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */

import { ABOUT, SHOTS, TASKS } from './data'

type P = { L: (h: string) => string }

const pad = (i: number) => String(i + 1).padStart(2, '0')

/* ================= Kengaş haqida ================= */

/** B — katta bayonot, ikki ustun matn, töq raqamlar tasmasi */
export function AboutB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <h2 className="h2 z1-ab-h">Kengaş haqida</h2>
        <p className="z1-ab-lead">{ABOUT.lead}</p>
        <div className="z1-ab-cols">
          {ABOUT.paras.map((t, i) => (
            <p key={t}>
              <span>{pad(i)}</span>
              {t}
            </p>
          ))}
        </div>
        <h3 className="hk-tasks-h">Asosiy vazifalari</h3>
        <div className="z1-ab-band hk-tasks">
          {TASKS.map((t, i) => (
            <div key={t}>
              <b>{pad(i)}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const COLLAGE = [SHOTS[0], SHOTS[3], SHOTS[1]]

/** C — çapda lavhalar kollaji, öngda matn va rangli raqam plitkalari */
export function AboutC(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="z1-ac">
          <div className="z1-ac-pics">
            {COLLAGE.map((s) => (
              <img key={s.img} src={s.img} alt={s.t} loading="lazy" />
            ))}
          </div>
          <div className="z1-ac-txt">
            <h2 className="h2">Kengaş haqida</h2>
            <p className="z1-ac-lead">{ABOUT.lead}</p>
            {ABOUT.paras.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <h3 className="hk-tasks-h">Asosiy vazifalari</h3>
            <div className="z1-ac-stats hk-tasks">
              {TASKS.map((t, i) => (
                <div key={t}>
                  <b>{pad(i)}</b>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
