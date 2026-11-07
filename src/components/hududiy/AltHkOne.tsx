/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import { Arrow } from '@/components/site/SocialPhones'

import { ABOUT, CHAIR, DEPTS, RECEPTION, SHOTS, TASKS } from './data'

type P = { L: (h: string) => string }

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** Xodim ismi böyiça surat (qabul jadvali uçun) */
const PHOTO: Record<string, string> = Object.fromEntries(
  [CHAIR, ...DEPTS.flatMap((d) => d.staff)].map((p) => [p.name, p.img]),
)

/** Familiya va ism (otasining ismisiz) */
const short = (name: string) => name.split(' ').slice(0, 2).join(' ')

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

/* ================= Qabul kunlari ================= */

const HOURS = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']

/** B — haftalik kalendar: 09–18 soat panjarasida 14:00–17:00 qabul bloklari */
export function ReceptionB(_: P) {
  return (
    <section className="sec" id="qabul-b">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Qabul kunlari</h2>
        </div>
        <div className="z1-rb">
          <div className="z1-rb-hours" aria-hidden="true">
            {HOURS.map((h) => (
              <span key={h}>{h}:00</span>
            ))}
          </div>
          {RECEPTION.map((r) => (
            <div key={r.day} className="z1-rb-day">
              <div className="z1-rb-cap">
                <b>{r.day}</b>
                <span>{r.time}</span>
              </div>
              <div className="z1-rb-col">
                <article>
                  {PHOTO[r.name] && <img src={PHOTO[r.name]} alt="" loading="lazy" />}
                  <b>{short(r.name)}</b>
                  <small>{r.dept}</small>
                  <em>{r.room}-xona</em>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** C — vertikal vaqt çizigi: çapda sarlavha va tugma, öngda kunlar */
export function ReceptionC({ L }: P) {
  return (
    <section className="sec z1-rc-sec" id="qabul-c">
      <div className="wrap">
        <div className="z1-rc">
          <div className="z1-rc-head">
            <h2 className="h2">Qabul kunlari</h2>
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Onlayn murojaat{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
          </div>
          <ol className="z1-rc-line">
            {RECEPTION.map((r) => (
              <li key={r.day}>
                <div className="z1-rc-when">
                  <b>{r.day}</b>
                  <span>{r.time}</span>
                </div>
                <div className="z1-rc-card">
                  {PHOTO[r.name] && <img src={PHOTO[r.name]} alt="" loading="lazy" />}
                  <div>
                    <strong>{r.name}</strong>
                    <small>{r.dept}</small>
                  </div>
                  <span className="z1-rc-room">
                    <b>{r.room}</b>xona
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
