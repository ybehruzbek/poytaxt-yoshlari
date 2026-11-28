/* eslint-disable @next/next/no-img-element -- medal tasvirlari */
import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'
import { nbsp } from '@/lib/nbsp'
import { getAwards } from '@/lib/cms/imkoniyatlar'
import { getMiqdorlar } from '@/lib/cms/miqdorlar'
import { type Miqdorlar, rateSum, rateText, som } from '@/lib/miqdorlar'

import type { Award } from './data'

/** Rasmiy tasviri eʼlon qilinmagan mukofotlar uçun ramziy medal: lenta, oltin halqa, içida ramz va nom */
const EMBLEM: Record<string, { c1: string; c2: string; icon: ReactNode; label: string }> = {
  zulfiya: {
    c1: '#FF939A',
    c2: '#ffffff',
    label: 'ZULFIYA',
    icon: (
      <g fill="none" stroke="#5a2a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 150c0-18 0-28 0-40" />
        <path d="M100 112c-14-2-22-12-22-26 9 0 17 4 22 12 5-8 13-12 22-12 0 14-8 24-22 26z" />
        <path d="M100 98c-4-8-4-16 0-24 4 8 4 16 0 24z" />
        <path d="M100 136c-10-8-20-8-28-4M100 136c10-8 20-8 28-4" />
      </g>
    ),
  },
  'ilgor-ijodkor': {
    c1: '#8E7CC3',
    c2: '#FFD25A',
    label: 'ILG‘OR IJODKOR',
    icon: (
      <g fill="none" stroke="#3b2a5c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 104c-9-7-22-7-34-3v40c12-4 25-4 34 3 9-7 22-7 34-3v-40c-12-4-25-4-34 3z" />
        <path d="M100 104v40" />
        <path d="M118 78l10 10-20 20-12 3 3-12z" />
      </g>
    ),
  },
}

function Medallion({ id }: { id: string }) {
  const e = EMBLEM[id]
  return (
    <svg
      className="mk-medal"
      viewBox="0 0 200 255"
      role="img"
      aria-label={`${e.label.toLowerCase()} ramziy tasviri`}
    >
      <defs>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset=".45" stopColor="#e8b94a" />
          <stop offset="1" stopColor="#9c6b16" />
        </linearGradient>
      </defs>
      {/* lenta */}
      <path d="M70 0h60l-12 78H82z" fill={e.c1} />
      <path d="M86 0h10l-4 78h-6zM104 0h10l-2 78h-6z" fill={e.c2} opacity=".9" />
      {/* halqa va disk */}
      <circle cx="100" cy="128" r="66" fill={`url(#gold-${id})`} />
      <circle cx="100" cy="128" r="56" fill="#fff8e6" stroke="#b9862b" strokeWidth="2" />
      <circle cx="100" cy="128" r="47" fill={e.c1} opacity=".28" />
      {/* dafna novdalari */}
      <g fill="none" stroke="#b9862b" strokeWidth="2.4" strokeLinecap="round">
        <path d="M58 150c6 14 18 24 32 28M142 150c-6 14-18 24-32 28" />
        <path d="M62 158l-7 2M68 166l-6 4M76 172l-4 6M138 158l7 2M132 166l6 4M124 172l4 6" />
      </g>
      <g transform="translate(0 6)">{e.icon}</g>
      <text
        x="100"
        y="226"
        textAnchor="middle"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="2"
        fill="#f3c95a"
      >
        {e.label}
      </text>
    </svg>
  )
}

const MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']

/** Yil davomida har bir mukofot böyiça hujjat qabuli, saralaş va taqdirlaş qaysi oylarga töğri kelişi */
function YearLine({ awards }: { awards: Award[] }) {
  const rows = awards.filter((a) => a.timeline.length)
  return (
    <div className="mk-year" aria-label="Mukofotlarni topshirish jadvali">
      <h2 className="mk-h">Mukofotlarni topshirish jadvali</h2>
      <div className="mk-grid">
        <span />
        {MONTHS.map((m) => (
          <span key={m} className="mk-m">
            {m}
          </span>
        ))}
        {rows.map((a) => (
          <div key={a.id} className={`mk-row mk-${a.id}`}>
            <span className="mk-name">{a.t}</span>
            {a.timeline.map((s) => (
              <span
                key={s.t}
                className={`mk-bar${s.end ? ' mk-bar-end' : ''}`}
                style={{ gridColumn: `${s.from + 1} / ${s.to + 2}` }}
                title={s.t}
              >
                <span>{s.t}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mk-legend">
        <span>
          <i className="mk-sw" /> Hujjatlar qabuli va saralash bosqichlari
        </span>
        <span>
          <i className="mk-sw mk-sw-end" /> Mukofotlarni topshirish
        </span>
      </p>
    </div>
  )
}

/** Mukofot kartasi: yuqorida töq blok — çapda pul mukofoti va qisqa faktlar, öngda medal; ostida maʼlumotlar */
function Card({ a, M }: { a: Award; M: Miqdorlar }) {
  return (
    <li className={`gr-card mk-card mk-${a.id}`}>
      <div className="gr-ph mk-ph">
        <div className="mk-ph-info">
          <div className="mk-prize">
            <small>Pul mukofoti · {rateText(a.prize)}</small>
            <b>{som(rateSum(a.prize, M))}</b>
          </div>
          <ul className="mk-facts">
            {a.facts.map((f) => (
              <li key={f}>{nbsp(f)}</li>
            ))}
          </ul>
        </div>
        <div className="mk-ph-medal">
          {a.img ? (
            <img src={a.img} alt={`${a.t} tasviri`} loading="lazy" />
          ) : (
            <Medallion id={a.id} />
          )}
        </div>
      </div>
      <div className="gr-bd">
        <span className="gr-st">{a.when}</span>
        <h3>{nbsp(a.t)}</h3>
        <p className="gr-org">
          <span>Huquqiy asos:</span> {nbsp(a.basis)}
        </p>
        <dl>
          <div>
            <dt>Kimlar uchun</dt>
            <dd>{nbsp(a.who)}</dd>
          </div>
          <div>
            <dt>Mukofot va imtiyozlar</dt>
            <dd>{nbsp(a.perks)}</dd>
          </div>
          <div>
            <dt>Yillik mukofotlar soni</dt>
            <dd>{nbsp(a.count)}</dd>
          </div>
        </dl>
        <p className="gr-text">{nbsp(a.how)}</p>
        <div className="gr-ft">
          <a className="more-btn" href={a.url} target="_blank" rel="noopener noreferrer">
            <More />
          </a>
          <small>
            Manba: {a.source}
            {a.extra && (
              <>
                {' · '}
                <a href={a.extra.url} target="_blank" rel="noopener noreferrer">
                  {a.extra.t}
                </a>
              </>
            )}
          </small>
        </div>
      </div>
    </li>
  )
}

/** “Yoşlar uçun davlat mukofotlari” sahifasi: yöl, sarlavha, yillik vaqt çizğisi, mukofotlar kartalari */
export async function AwardsPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const [AWARDS, M] = await Promise.all([getAwards(locale), getMiqdorlar(locale)])
  return (
    <div className="gr st mk">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Yoshlar uchun davlat mukofotlari</h1>
        </div>
      </header>
      <section className="sec gr-sec">
        <div className="wrap">
          <YearLine awards={AWARDS} />
          <ul className="gr-list mk-list">
            {AWARDS.map((a) => (
              <Card key={a.id} a={a} M={M} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
