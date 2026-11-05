'use client'
/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga o'tadi */

import Link from 'next/link'
import { useState } from 'react'

import type { Locale } from '@/i18n/config'
import { OPP_TYPES, OPPS, type OppType, daysTo, deadlineLabel } from '@/lib/opps'

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const ICON: Record<OppType, React.ReactNode> = {
  grant: <path d="M12 2v20M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.6 7 6.5s2.2 2.8 5 3.5 5 1.6 5 3.5-2.2 3-5 3-5-1.1-5-3" />,
  stip: <path d="M2 9l10-5 10 5-10 5L2 9zm4 2.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8M22 9v6" />,
  vol: <path d="M12 21s-7.5-4.6-9.3-9.2C1.4 8.3 3.6 5 7 5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.6 3.3 4.3 6.8C19.5 16.4 12 21 12 21z" />,
  tanlov: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />,
}
const Icon = ({ t }: { t: OppType }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICON[t]}
  </svg>
)
const leftTxt = (n: number | null) => (n === null ? 'Doimiy qabul' : n === 0 ? 'Bugun tugaydi' : `${n} kun qoldi`)

/** B · Tablar: chapda turlar, o'ngda tanlangan tur tafsiloti va joriy imkoniyatlar */
export function OppsTabs({ locale }: { locale: Locale }) {
  const [cur, setCur] = useState<OppType>('grant')
  const t = OPP_TYPES.find((x) => x.key === cur)!
  const list = OPPS.filter((o) => o.type === cur)
  const href = `/${locale}/faoliyat/loyihalar`

  return (
    <div className="opv opv-b">
      <div className="ob-tabs" role="tablist" aria-label="Imkoniyat turlari">
        {OPP_TYPES.map((x) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            id={`ob-tab-${x.key}`}
            aria-selected={cur === x.key}
            aria-controls="ob-panel"
            className={`ob-tab${cur === x.key ? ' on' : ''}`}
            onClick={() => setCur(x.key)}
          >
            <span className="ob-ic" style={{ background: x.color, color: x.dark ? 'var(--navy)' : '#fff' }}><Icon t={x.key} /></span>
            <span className="ob-tx">
              <b>{x.label}</b>
              <small>{OPPS.filter((o) => o.type === x.key).length} ta faol</small>
            </span>
            <Arrow />
          </button>
        ))}
      </div>
      <div className="ob-panel" id="ob-panel" role="tabpanel" aria-labelledby={`ob-tab-${cur}`} key={cur}>
        <div className="ob-img">
          <img className="cover" src={t.img} alt="" />
          <span className="ob-lead">{t.lead}</span>
        </div>
        <div className="ob-bd">
          <h3>{t.label}</h3>
          <p>{t.desc}</p>
          <ul className="ob-list">
            {list.map((o) => (
              <li key={o.title}>
                <Link href={href}>
                  <span>
                    <b>{o.title}</b>
                    <small>{o.level}</small>
                  </span>
                  <em suppressHydrationWarning>{o.deadline ? `Muddat: ${deadlineLabel(o.deadline)}` : 'Doimiy'}</em>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href} className="btn btn-primary">Ariza topshirish <span className="ic"><Arrow /></span></Link>
        </div>
      </div>
    </div>
  )
}

/** C · Muddat bo'yicha lenta: filtr va eng yaqin muddatdan boshlab saralangan kartalar */
export function OppsFeed({ locale }: { locale: Locale }) {
  const [f, setF] = useState<'all' | OppType>('all')
  const href = `/${locale}/faoliyat/loyihalar`
  const sorted = [...OPPS].sort((a, b) => (a.deadline ?? '9999').localeCompare(b.deadline ?? '9999'))
  const list = sorted.filter((o) => f === 'all' || o.type === f).slice(0, 6)

  return (
    <div className="opv opv-c">
      <div className="oc-filter" role="group" aria-label="Turi bo‘yicha saralash">
        <button type="button" className={`tab${f === 'all' ? ' on' : ''}`} aria-pressed={f === 'all'} onClick={() => setF('all')}>
          Barchasi <span>{OPPS.length}</span>
        </button>
        {OPP_TYPES.map((x) => (
          <button key={x.key} type="button" className={`tab${f === x.key ? ' on' : ''}`} aria-pressed={f === x.key} onClick={() => setF(x.key)}>
            {x.label} <span>{OPPS.filter((o) => o.type === x.key).length}</span>
          </button>
        ))}
      </div>
      <div className="oc-grid">
        {list.map((o) => {
          const t = OPP_TYPES.find((x) => x.key === o.type)!
          const n = daysTo(o.deadline)
          const urgent = n !== null && n <= 14
          return (
            <Link key={o.title} href={href} className="oc-card">
              <span className="oc-ic" style={{ background: t.color, color: t.dark ? 'var(--navy)' : '#fff' }}><Icon t={o.type} /></span>
              <span className="oc-type">{t.label} · {o.level}</span>
              <b>{o.title}</b>
              <span className="oc-foot">
                <span className={`oc-left${urgent ? ' urgent' : ''}`} suppressHydrationWarning>{leftTxt(n)}</span>
                <span className="oc-dl" suppressHydrationWarning>{deadlineLabel(o.deadline)}</span>
              </span>
              <span className="go-sm"><Arrow /></span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
