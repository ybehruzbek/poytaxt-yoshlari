/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan surat; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'
import { Arrow } from '@/components/site/SocialPhones'

import {
  ABOUT,
  BODIES,
  CONTACT,
  EVENTS,
  IMG,
  INTRO,
  LEADERS,
  MEMBERS,
  ORGANS,
  POWERS,
  STATS,
} from './data'
import { KgVariants } from './variants'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/** VAQTINCHA: bölimlar variantlari faqat ishlab chiqish rejimida */
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
  ['kab', 'Kengaş haqida'],
  ['kor', 'Boşqaruv tizimi'],
  ['kva', 'Vakolatlari'],
  ['kta', 'Tarkibi'],
  ['kra', 'Rahbariyat'],
  ['kij', 'Ijroiya qömitasi va komissiya'],
  ['kqa', 'Qarorlar va yiğilişlar'],
  ['kal', 'Aloqa'],
].map(([name, label]) => ({ name, label, count: 3 }))

const pad = (i: number) => String(i + 1).padStart(2, '0')
const initials = (s: string) =>
  s
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/**
 * “Markaziy Kengaş” sahifasi (mazmun: components/kengash/data.ts, Ustav V bob):
 * yöl va sarlavha, kengaş haqida, boşqaruv tizimi, vakolatlari, tarkibi, rahbariyat, ijroiya qömitasi va komissiya,
 * qarorlar va yiğilişlar, aloqa.
 */
export function KengashPage({ L, crumbs, siblings }: P) {
  const sections: Record<string, ReactNode> = {
    kab: (
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
    kor: (
      <section className="sec kg-org-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Ittifoqning boşqaruv tizimi</h2>
          </div>
          <ol className="kg-org">
            {ORGANS.map((o, i) => (
              <li key={o.t} className={i === 1 ? 'on' : undefined}>
                <span className="it-num">{pad(i)}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
                {o.meta && <b>{o.meta}</b>}
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    kva: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Vakolatlari</h2>
          </div>
          <ol className="kg-pow">
            {POWERS.map((x, i) => (
              <li key={x}>
                <span>{pad(i)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    kta: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Kengaş tarkibi</h2>
          </div>
          <div className="kg-mem">
            <div>
              <p className="kg-mem-lead">{MEMBERS.lead}</p>
              <h3>Lavozimi böyiça kiradi</h3>
              <ul>
                {MEMBERS.byPost.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Soha vakillari</h3>
              <div className="kg-chips">
                {MEMBERS.fields.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <p className="kg-link">{MEMBERS.link}</p>
            </div>
          </div>
        </div>
      </section>
    ),
    kra: (
      <section className="sec kg-lead-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Rahbariyat</h2>
          </div>
          <div className="kg-lead">
            {LEADERS.map((p, i) => (
              <article key={i}>
                <div className="kg-ava">
                  {p.img ? <img src={p.img} alt={p.name} /> : <span>{initials(p.role)}</span>}
                </div>
                <h3>{p.name}</h3>
                <p>{p.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),
    kij: (
      <section className="sec">
        <div className="wrap">
          <div className="kg-bod">
            {BODIES.map((b) => (
              <article key={b.t}>
                <span className="kg-bod-meta">{b.meta}</span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
                <ul>
                  {b.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),
    kqa: (
      <section className="sec">
        <div className="wrap">
          <div className="kg-dec">
            <div>
              <h2 className="h2">Qarorlar va yiğilişlar</h2>
              <p>
                Markaziy Kengaş yiğilişlari, qabul qilingan qarorlar va hisobotlar şu yerda eʼlon
                qilinadi.
              </p>
            </div>
            <Link href={L('/hujjatlar/kengash')} className="btn btn-primary">
              Kengaş hujjatlari{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
          </div>
          <h3 className="kg-ev-title">Sönggi tadbirlar</h3>
          <div className="kg-ev">
            {EVENTS.map((e) => (
              <a key={e.href} href={e.href} target="_blank" rel="noopener noreferrer">
                <img src={e.img} alt="" loading="lazy" />
                <div>
                  <time>{e.date}</time>
                  <h4>{e.t}</h4>
                  <p>{e.d}</p>
                  <span>UzA xabari ↗</span>
                </div>
              </a>
            ))}
          </div>
          <p className="kg-credit">Suratlar: UzA</p>
        </div>
      </section>
    ),
    kal: (
      <section className="sec">
        <div className="wrap kg-con">
          <div>
            <h2 className="h2">Aloqa</h2>
            <p className="kg-con-addr">{CONTACT.address}</p>
            <p className="kg-con-note">{CONTACT.note}</p>
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
              <Link href={L('/boglanish/murojaat')} className="btn btn-ghost it-ghost">
                Murojaat yuboriş
              </Link>
            </div>
          </div>
          <img src={IMG.building} alt="Özbekiston yoşlar ittifoqi Markaziy Kengaşi binosi" />
        </div>
      </section>
    ),
  }

  return (
    <div className="it kg">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Markaziy Kengaş</h1>
          <p className="pg-lead">{INTRO}</p>
        </div>
      </header>

      {PANEL.map(({ name }) => (
        <div key={name} style={{ display: 'contents' }}>
          <V name={name} k="a">
            {sections[name]}
          </V>
          {DEV &&
            (['b', 'c'] as const).map((k) => {
              const C = KgVariants[`${name}-${k}`]
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
