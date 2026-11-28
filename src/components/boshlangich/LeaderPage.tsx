/* eslint-disable @next/next/no-img-element -- yetakçi surati; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { IC } from '@/components/hududiy/team'

import { type Leader, type Otm, TYPE_LABEL } from './data'

const EMPTY = 'Ma’lumot kiritilmoqda'

/** Aloqa kanallari — qiymat bölsa havola, böş bölsa “Maʼlumot kiritilmoqda” */
const CHANNELS: Array<{
  k: 'phone' | 'email' | 'telegram' | 'instagram' | 'facebook'
  t: string
  d: string
  href: (v: string) => string
}> = [
  { k: 'phone', t: 'Telefon', d: IC.phone, href: (v) => `tel:${v.replace(/[^+\d]/g, '')}` },
  { k: 'email', t: 'Elektron pochta', d: IC.mail, href: (v) => `mailto:${v}` },
  { k: 'telegram', t: 'Telegram', d: IC.Telegram, href: (v) => v },
  { k: 'instagram', t: 'Instagram', d: IC.Instagram, href: (v) => v },
  { k: 'facebook', t: 'Facebook', d: IC.Facebook, href: (v) => v },
]

/** Havoladan qisqa körinadigan nom: https://t.me/nom → @nom */
const short = (k: string, v: string) =>
  k === 'phone' || k === 'email'
    ? v
    : v
        .replace(/^https?:\/\/(www\.)?/, '')
        .replace(/^(t\.me|instagram\.com|facebook\.com)\//, '@')
        .replace(/\/$/, '')

function Field({ t, v }: { t: string; v: string }) {
  return (
    <div className="ld-field">
      <dt>{t}</dt>
      <dd className={v ? undefined : 'empty'}>{v || EMPTY}</dd>
    </div>
  )
}

type P = { o: Otm; crumbs: ReactNode; list: string; prev?: Otm; next?: Otm }

/**
 * Yetakçining alohida sahifasi: surat, F.I.Ş., OTT, lavozimi va mutaxassisligi, aloqa kanallari
 * hamda şablon maydonlar (faoliyati, saylangan sana, aʼzolar soni, qabul kunlari, yutuqlari).
 */
export function LeaderPage({ o, crumbs, list, prev, next }: P) {
  const L = o.leader as Leader
  return (
    <div className="bt ld">
      <header className="pg-head">
        <div className="wrap">{crumbs}</div>
      </header>
      <section className="sec ld-sec">
        <div className="wrap">
          <article className="ld-hero">
            <img className="ld-ph" src={L.img} alt={L.name} />
            <div className="ld-main">
              <span className="ld-otm">{o.otm}</span>
              <span className="ld-type">
                {TYPE_LABEL[o.type]} · boshlang‘ich tashkilot yoshlar yetakchisi
              </span>
              <h1 className="ld-name">{L.name}</h1>
              <dl className="ld-facts">
                <Field t="Lavozimi / kursi" v={L.role} />
                <Field t="Mutaxassisligi" v={L.spec} />
              </dl>
            </div>
          </article>

          <div className="ld-grid">
            <section className="ld-box">
              <h2>Aloqa</h2>
              <ul className="ld-ch">
                {CHANNELS.map(({ k, t, d, href }) => {
                  const v = L[k].trim()
                  return (
                    <li key={k} className={v ? undefined : 'empty'}>
                      <span className="ld-ic" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d={d} />
                        </svg>
                      </span>
                      <span>
                        <small>{t}</small>
                        {v ? (
                          <a
                            href={href(v)}
                            {...(k === 'phone' || k === 'email'
                              ? {}
                              : { target: '_blank', rel: 'noopener noreferrer' })}
                          >
                            {short(k, v)}
                          </a>
                        ) : (
                          <b>{EMPTY}</b>
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section className="ld-box">
              <h2>Boshlang‘ich tashkilot haqida</h2>
              <dl className="ld-facts ld-facts--2">
                <Field t="Yetakchi etib saylangan sana" v={L.elected} />
                <Field t="A’zolar soni" v={L.members} />
                <Field t="Qabul kunlari" v={L.reception} />
              </dl>
            </section>

            <section className="ld-box ld-box--wide">
              <h2>Faoliyati haqida</h2>
              <p className={L.about ? undefined : 'empty'}>{L.about || EMPTY}</p>
            </section>

            <section className="ld-box ld-box--wide">
              <h2>Yutuqlari</h2>
              {L.achievements.length ? (
                <ul className="ld-list">
                  {L.achievements.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty">{EMPTY}</p>
              )}
            </section>
          </div>

          <nav className="ld-nav" aria-label="Boshqa yetakchilar">
            {prev ? (
              <Link href={`${list}/${prev.leader!.slug}`} className="ld-step">
                <span aria-hidden="true">←</span>
                <span>
                  <small>Oldingi</small>
                  {prev.leader!.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            <Link href={list} className="ld-back">
              Barcha yetakchilar
            </Link>
            {next ? (
              <Link href={`${list}/${next.leader!.slug}`} className="ld-step ld-step--next">
                <span>
                  <small>Keyingi</small>
                  {next.leader!.name}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </section>
    </div>
  )
}
