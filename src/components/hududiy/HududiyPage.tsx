/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'
import { Arrow } from '@/components/site/SocialPhones'

import { ABOUT, APPEAL_LAW, APPEAL_NOTE, APPEAL_STEPS, CONTACT, IMG, INTRO, TASKS } from './data'
import { TeamNamuna } from './AltHkJamoa'
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
  ['hjm', 'Jamoa'],
  ['hmu', 'Murojaat tartibi'],
  ['hal', 'Aloqa'],
  // «Vazifalar» — alohida örama yöq: html[data-hvz] orqali jamoa kartalarida vazifalar körinişini almaştiradi
  ['hvz', 'Vazifalar körinişi'],
].map(([name, label]) => ({ name, label, count: 3 }))

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi (mazmun: components/hududiy/data.ts):
 * hero, Kengaş haqida, Kengaş jamoasi, murojaat tartibi,
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
    hjm: <TeamNamuna />,
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
            <a href="#jamoa" className="btn btn-ghost">
              Kengaş jamoasi
            </a>
          </div>
        </div>
      </section>

      {PANEL.filter(({ name }) => sections[name]).map(({ name }) => (
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
