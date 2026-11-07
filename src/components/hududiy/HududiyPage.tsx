/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'
import { Arrow } from '@/components/site/SocialPhones'

import {
  ABOUT,
  APPEAL_LAW,
  APPEAL_NOTE,
  APPEAL_STEPS,
  BASIS,
  CHAIR,
  CONTACT,
  DEPTS,
  IMG,
  INTRO,
  RECEPTION,
  TASKS,
} from './data'
import { HkVariants } from './variants'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/** VAQTINCHA: bölimlar variantlari faqat işlab çiqiş rejimida */
const DEV = process.env.NODE_ENV !== 'production'

function V({ name, k, children }: { name: string; k: string; children: ReactNode }) {
  if (!DEV) return <>{children}</>
  return (
    <div className="vx" data-v={`${name}-${k}`}>
      {children}
    </div>
  )
}

/** Jamoa bölimi tanlangan (A, variantsiz) */
const FIXED = 'hjm'

const PANEL: PanelSection[] = [
  ['hab', 'Kengaş haqida'],
  ['hjm', 'Jamoa'],
  ['hqa', 'Qabul kunlari'],
  ['hmu', 'Murojaat tartibi'],
  ['hal', 'Aloqa'],
].map(([name, label]) => ({ name, label, count: 3 }))

/* Rahbariyat kartasi uçun çiziqli belgilar (24×24) */
const IC = {
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z',
  door: 'M3 21h18M6 21V3h12v18M14 12h.01',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2',
}

function Ic({ d }: { d: string }) {
  return (
    <span className="hk-lead-ic" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  )
}

type Member = {
  name: string
  role: string
  img: string
  dept?: string
  room: string
  reception?: string
  duties?: string[]
}

const recOf = (name: string) => {
  const r = RECEPTION.find((x) => x.name === name)
  return r ? `${r.day} ${r.time}` : undefined
}

/** Jamoa: rais → bölim boşliqlari → mutaxassislar */
const TEAM: { title: string; lead?: boolean; people: Member[] }[] = [
  {
    title: 'Rais',
    lead: true,
    people: [
      {
        ...CHAIR,
        room: CHAIR.room,
        reception: CHAIR.reception.replace(' · ', ' '),
        duties: CHAIR.duties,
      },
    ],
  },
  {
    title: 'Bölim boşliqlari',
    people: DEPTS.flatMap((d) =>
      d.staff
        .filter((x) => x.role.startsWith('Bölim boşliği'))
        .map((x) => ({
          ...x,
          dept: d.t,
          room: d.room,
          reception: recOf(x.name),
          duties: x.duties ?? d.tasks,
        })),
    ),
  },
  {
    title: 'Mutaxassislar',
    people: DEPTS.flatMap((d) =>
      d.staff
        .filter((x) => !x.role.startsWith('Bölim boşliği'))
        .map((x) => ({ ...x, dept: d.t, room: d.room, duties: x.duties })),
    ),
  },
]

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi (mazmun: components/hududiy/data.ts):
 * hero, Kengaş haqida, rais, apparat tuzilmasi, jamoa, qabul jadvali, murojaat tartibi,
 * aloqa.
 */
export function HududiyPage({ L, crumbs, siblings }: P) {
  const sections: Record<string, ReactNode> = {
    hab: (
      <section className="sec">
        <div className="wrap">
          <div className="it-who">
            <div>
              <h2 className="h2">Kengaş haqida</h2>
              <p className="it-motto">{ABOUT.lead}</p>
            </div>
            <div className="it-who-txt">
              {ABOUT.paras.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <h3 className="hk-tasks-h">Asosiy vazifalari</h3>
          <div className="it-stats hk-tasks">
            {TASKS.map((t, i) => (
              <div key={t}>
                <b>{pad(i)}</b>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    hjm: (
      <section className="sec" id="jamoa">
        <div className="wrap">
          <div className="sec-head hk-jm-head">
            <span>Özbekiston yoşlar ittifoqi</span>
            <h2 className="h2">Toşkent şahar hududiy Kengaşi jamoasi</h2>
          </div>
          <p className="hk-basis">{BASIS}</p>
          {TEAM.map((g) => (
            <div key={g.title} className="hk-jm-grp">
              <h3 className="hk-jm-gt">
                {g.title} <span>{g.people.length}</span>
              </h3>
              {g.people.map((m) => (
                <article key={m.name} className={`hk-lead${g.lead ? '' : ' hk-lead--sm'}`}>
                  <div className="hk-lead-ph">
                    <img src={m.img} alt={m.name} loading="lazy" />
                  </div>
                  <div className="hk-lead-main">
                    <h3>{m.name}</h3>
                    <p>{m.role}</p>
                    {m.dept && <small>{m.dept}</small>}
                  </div>
                  <ul className="hk-lead-con">
                    {g.lead && (
                      <>
                        <li>
                          <Ic d={IC.phone} />
                          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                        </li>
                        <li>
                          <Ic d={IC.mail} />
                          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                        </li>
                        <li>
                          <Ic d={IC.send} />
                          <a
                            href={CHAIR.socials[0]?.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {CHAIR.socials[0]?.handle}
                          </a>
                        </li>
                      </>
                    )}
                    <li>
                      <Ic d={IC.door} />
                      <span>{m.room}</span>
                    </li>
                    {m.reception && (
                      <li>
                        <Ic d={IC.clock} />
                        <span>{m.reception}</span>
                      </li>
                    )}
                  </ul>
                  {m.duties && (
                    <details className="hk-duty">
                      <summary>
                        <span className="hk-duty-l">Vazifalari</span>
                        <span className="hk-duty-ic" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ol>
                        {m.duties.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ol>
                    </details>
                  )}
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
    ),
    hqa: (
      <section className="sec" id="qabul">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Qabul kunlari</h2>
          </div>
          <ol className="hk-rec">
            {RECEPTION.map((r) => (
              <li key={r.day}>
                <b className="hk-rec-day">{r.day}</b>
                <span className="hk-rec-time">{r.time}</span>
                <div className="hk-rec-who">
                  <strong>{r.name}</strong>
                  <span>{r.dept}</span>
                </div>
                <span className="hk-rec-room">
                  <b>{r.room}</b>xona
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    hmu: (
      <section className="sec">
        <div className="wrap">
          <div className="hk-app">
            <div className="hk-app-head">
              <h2 className="h2">Murojaatni körib çiqiş tartibi</h2>
              <p>{APPEAL_NOTE}</p>
              <small>{APPEAL_LAW}</small>
            </div>
            <ol className="hk-steps">
              {APPEAL_STEPS.map((s, i) => (
                <li key={s.t}>
                  <span>{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
            <div className="hk-app-foot">
              <a href={CONTACT.phoneHref}>
                <small>Işonç telefoni</small>
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`}>
                <small>Elektron poçta</small>
                {CONTACT.email}
              </a>
              <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
                Onlayn murojaat{' '}
                <span className="ic">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    ),
    hal: (
      <section className="sec">
        <div className="wrap">
          <div className="hk-con">
            <div>
              <h2 className="h2">Aloqa</h2>
              <p className="kg-con-addr">{CONTACT.address}</p>
              <p className="kg-con-note">{CONTACT.hours}</p>
              <div className="it-btns">
                <a
                  href={CONTACT.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Xaritada köriş{' '}
                  <span className="ic">
                    <Arrow />
                  </span>
                </a>
              </div>
            </div>
            <dl className="hk-con-list">
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Elektron poçta</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </dd>
              </div>
              {CONTACT.socials.map((s) => (
                <div key={s.net}>
                  <dt>{s.net}</dt>
                  <dd>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.handle}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    ),
  }

  return (
    <div className="it hk">
      <section className="it-hero" data-head-dark>
        <img src={IMG.hero} alt="" />
        <div className="wrap">
          <div className="it-crumbs">{crumbs}</div>
          <h1 className="h1">Toşkent şahar hududiy Kengaşi</h1>
          <p className="lead">{INTRO}</p>
          <div className="it-btns">
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Murojaat yuboriş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
            <a href="#qabul" className="btn btn-ghost">
              Qabul jadvali
            </a>
          </div>
        </div>
      </section>

      {PANEL.map(({ name }) => (
        <div key={name} style={{ display: 'contents' }}>
          {name === FIXED ? (
            sections[name]
          ) : (
            <V name={name} k="a">
              {sections[name]}
            </V>
          )}
          {DEV &&
            (['b', 'c'] as const).map((k) => {
              const C = HkVariants[`${name}-${k}`]
              return C ? (
                <V key={k} name={name} k={k}>
                  <C L={L} />
                </V>
              ) : null
            })}
        </div>
      ))}

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
      {DEV && <DevSectionsPanel sections={PANEL.filter((x) => x.name !== FIXED)} />}
    </div>
  )
}
