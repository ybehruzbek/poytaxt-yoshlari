/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import { Arrow } from '@/components/site/SocialPhones'

import { ABOUT, BASIS, CHAIR, DEPTS, RECEPTION, SHOTS, TASKS } from './data'

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

/* ================= Rais ================= */

/** B — töq keng karta: portret, vazifalar va qabul «çiptasi» */
export function ChairB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="z1-cb">
          <img className="z1-cb-img" src={CHAIR.img} alt={CHAIR.name} />
          <div className="z1-cb-main">
            <span className="z1-cb-tag">Rais</span>
            <h2 className="h2">{CHAIR.name}</h2>
            <p className="z1-cb-role">{CHAIR.role}</p>
            <ul className="z1-cb-duties">
              {CHAIR.duties.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="z1-cb-soc">
              {CHAIR.socials.map((s) => (
                <a key={s.net} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.net}
                </a>
              ))}
            </div>
          </div>
          <aside className="z1-cb-ticket">
            <small>Qabul kuni</small>
            <b>{CHAIR.reception.split(' · ')[0]}</b>
            <span>{CHAIR.reception.split(' · ')[1]}</span>
            <i aria-hidden="true" />
            <strong>{CHAIR.room}</strong>
          </aside>
        </div>
      </div>
    </section>
  )
}

/** C — markazlaşgan profil: dumaloq portret, vazifalar raqamli ustunlarda */
export function ChairC(_: P) {
  return (
    <section className="sec z1-cc-sec">
      <div className="wrap">
        <div className="z1-cc">
          <img className="z1-cc-img" src={CHAIR.img} alt={CHAIR.name} />
          <h2 className="h2">{CHAIR.name}</h2>
          <p className="z1-cc-role">{CHAIR.role}</p>
          <ol className="z1-cc-duties">
            {CHAIR.duties.map((x, i) => (
              <li key={x}>
                <span>{pad(i)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
          <div className="z1-cc-foot">
            <div className="z1-cc-rec">
              <small>Qabul kuni · {CHAIR.room}</small>
              <b>{CHAIR.reception}</b>
            </div>
            {CHAIR.socials.map((s) => (
              <a key={s.net} href={s.href} target="_blank" rel="noopener noreferrer">
                <small>{s.net}</small>
                {s.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= Apparat tuzilmasi ================= */

/** B — oçiladigan röyxat: har bölim qatorida xona va xodimlar, içida vazifalar */
export function DeptsB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="z1-db">
          <div className="z1-db-head">
            <h2 className="h2">Apparat tuzilmasi</h2>
            <p>{BASIS}</p>
          </div>
          <div className="z1-db-list">
            {DEPTS.map((d, i) => (
              <details key={d.key} open={i === 0}>
                <summary>
                  <span className="z1-db-num">{pad(i)}</span>
                  <span className="z1-db-name">
                    <b>{d.short}</b>
                    <small>{d.room}</small>
                  </span>
                  <span className="z1-db-faces">
                    {d.staff.map((s) => (
                      <img key={s.name} src={s.img} alt="" loading="lazy" />
                    ))}
                  </span>
                  <span className="z1-db-plus" aria-hidden="true" />
                </summary>
                <div className="z1-db-body">
                  <h3>{d.t}</h3>
                  <ul>
                    {d.tasks.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="z1-db-staff">
                    {d.staff.map((s) => (
                      <p key={s.name}>
                        <b>{s.name}</b>
                        <small>{s.role}</small>
                      </p>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** C — tuzilma sxemasi: raisdan tört bölimga, har bölimda xodimlar va vazifalar */
export function DeptsC(_: P) {
  return (
    <section className="sec z1-dc-sec">
      <div className="wrap">
        <div className="sec-head z1-dc-top">
          <h2 className="h2">Apparat tuzilmasi</h2>
          <p>{BASIS}</p>
        </div>
        <div className="z1-dc">
          <div className="z1-dc-root">
            <img src={CHAIR.img} alt={CHAIR.name} />
            <div>
              <b>{CHAIR.name}</b>
              <small>{CHAIR.role}</small>
            </div>
          </div>
          <div className="z1-dc-tree">
            {DEPTS.map((d, i) => (
              <article key={d.key}>
                <div className="z1-dc-cap">
                  <span>{pad(i)}</span>
                  <em>{d.room}</em>
                </div>
                <h3>{d.short}</h3>
                <ul className="z1-dc-staff">
                  {d.staff.map((s) => (
                    <li key={s.name}>
                      <img src={s.img} alt={s.name} loading="lazy" />
                      <span>
                        <b>{short(s.name)}</b>
                        <small>{s.role}</small>
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="z1-dc-tasks">
                  {d.tasks.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= Jamoa ================= */

/** B — bölimlar böyiça guruhlar: çapda bölim, öngda dumaloq avatarli xodimlar */
export function TeamB(_: P) {
  const groups = [{ key: 'rais', short: 'Rahbariyat', room: CHAIR.room, staff: [CHAIR] }, ...DEPTS]
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Kengaş apparati jamoasi</h2>
        </div>
        <div className="z1-tb">
          {groups.map((g, i) => (
            <div key={g.key} className="z1-tb-row">
              <div className="z1-tb-dept">
                <span>{pad(i)}</span>
                <h3>{g.short}</h3>
                <small>{g.room}</small>
              </div>
              <div className="z1-tb-people">
                {g.staff.map((s) => (
                  <article key={s.name}>
                    <img src={s.img} alt={s.name} loading="lazy" />
                    <div>
                      <b>{s.name}</b>
                      <small>{s.role}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** C — ixçam maʼlumotnoma jadvali: surat, FIO, lavozim, bölim, xona */
export function TeamC(_: P) {
  const rows = [
    { ...CHAIR, role: 'Kengaş raisi', dept: 'Rahbariyat' },
    ...DEPTS.flatMap((d) => d.staff.map((s) => ({ ...s, dept: d.short, room: d.room }))),
  ]
  return (
    <section className="sec z1-tc-sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Kengaş apparati jamoasi</h2>
        </div>
        <ul className="z1-tc">
          {rows.map((r, i) => (
            <li key={r.name} className={i === 0 ? 'on' : undefined}>
              <img src={r.img} alt={r.name} loading="lazy" />
              <div className="z1-tc-who">
                <b>{r.name}</b>
                <small>{r.role}</small>
              </div>
              <span className="z1-tc-dept">{r.dept}</span>
              <span className="z1-tc-room">{r.room}</span>
            </li>
          ))}
        </ul>
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
