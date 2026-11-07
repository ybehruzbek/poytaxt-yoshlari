import { ABOUT, TASKS } from './data'

type P = { L: (h: string) => string }

const pad = (i: number) => String(i + 1).padStart(2, '0')

/* ================= Kengaş haqida ================= */

/** Kengaş haqida: katta bayonot, ikki ustun matn, töq vazifalar tasmasi */
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
