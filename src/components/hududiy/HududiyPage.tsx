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
  ORGS,
  RECEPTION,
  SHOTS,
  STATS,
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

const PANEL: PanelSection[] = [
  ['hab', 'Kengaş haqida'],
  ['hra', 'Rais'],
  ['hap', 'Apparat tuzilmasi'],
  ['hja', 'Apparat jamoasi'],
  ['hqa', 'Qabul kunlari'],
  ['hmu', 'Murojaat tartibi'],
  ['hbo', 'Boşlanğiç taşkilotlar'],
  ['hla', 'Tadbirlardan lavhalar'],
  ['hal', 'Aloqa'],
].map(([name, label]) => ({ name, label, count: 3 }))

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi (mazmun: components/hududiy/data.ts):
 * hero, Kengaş haqida, rais, apparat tuzilmasi, jamoa, qabul jadvali, murojaat tartibi,
 * boşlanğiç taşkilotlar, tadbirlardan lavhalar, aloqa.
 */
export function HududiyPage({ L, crumbs, siblings }: P) {
  const staff = DEPTS.flatMap((d) => d.staff.map((s) => ({ ...s, dept: d.short, room: d.room })))

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
          <div className="it-stats">
            {STATS.map((s) => (
              <div key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    hra: (
      <section className="sec hk-chair-sec">
        <div className="wrap">
          <div className="hk-chair">
            <img src={CHAIR.img} alt={CHAIR.name} />
            <div>
              <span className="hk-tag">Rahbariyat · {CHAIR.room}</span>
              <h2 className="h2">{CHAIR.name}</h2>
              <p className="hk-chair-role">{CHAIR.role}</p>
              <ul className="hk-chair-duties">
                {CHAIR.duties.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="hk-chair-foot">
                <div>
                  <small>Qabul kuni</small>
                  <b>{CHAIR.reception}</b>
                </div>
                <div className="hk-soc">
                  {CHAIR.socials.map((s) => (
                    <a key={s.net} href={s.href} target="_blank" rel="noopener noreferrer">
                      <small>{s.net}</small>
                      {s.handle}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    hap: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Apparat tuzilmasi</h2>
          </div>
          <p className="hk-basis">{BASIS}</p>
          <div className="hk-depts">
            {DEPTS.map((d, i) => (
              <article key={d.key}>
                <div className="hk-dept-top">
                  <span className="it-num">{pad(i)}</span>
                  <span className="hk-room">{d.room}</span>
                </div>
                <h3>{d.t}</h3>
                <ul>
                  {d.tasks.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="hk-dept-head">
                  <small>Bölim boşliği</small>
                  {d.staff[0]?.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),
    hja: (
      <section className="sec hk-team-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Kengaş apparati jamoasi</h2>
          </div>
          <div className="hk-team">
            {staff.map((s) => (
              <article key={s.name}>
                <img src={s.img} alt={s.name} loading="lazy" />
                <h3>{s.name}</h3>
                <p>{s.role}</p>
                <span>
                  {s.dept} · {s.room}
                </span>
              </article>
            ))}
          </div>
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
    hbo: (
      <section className="sec hk-org-sec">
        <div className="wrap">
          <div className="hk-org">
            <div>
              <h2 className="h2">Oliy taʼlimdagi boşlanğiç taşkilotlar</h2>
              <p className="hk-basis">{ORGS.basis}</p>
              <div className="hk-org-num">
                <b>{ORGS.total.v}</b>
                <span>{ORGS.total.l}</span>
              </div>
              <div className="hk-org-split">
                {ORGS.split.map((x) => (
                  <div key={x.l}>
                    <b>{x.v}</b>
                    <span>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Hududiy Kengaşga yuklatilgan vazifalar</h3>
              <ol className="hk-org-tasks">
                {ORGS.tasks.map((x, i) => (
                  <li key={x}>
                    <span>{pad(i)}</span>
                    <p>{x}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    ),
    hla: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Tadbirlardan lavhalar</h2>
          </div>
          <div className="hk-shots">
            {SHOTS.map((s) => (
              <figure key={s.img}>
                <img src={s.img} alt={s.t} loading="lazy" />
                <figcaption>{s.t}</figcaption>
              </figure>
            ))}
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
          <V name={name} k="a">
            {sections[name]}
          </V>
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
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
