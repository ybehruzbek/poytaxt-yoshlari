/* eslint-disable @next/next/no-img-element -- yetakçilar suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { OTMS } from './data'

const LED = OTMS.filter((o) => o.leader)

/** VAQTINCHA: dizayn variantlari faqat işlab çiqiş rejimida */
const DEV = process.env.NODE_ENV !== 'production'
const PANEL: PanelSection[] = [{ name: 'bth', label: 'Sahifa körinişi', count: 4 }]

type Stat = { v: string; t: string; accent?: boolean }
type Dir = {
  n: string
  t: string
  d: string
  href: string
  go: string
  stats: Stat[]
  faces: string[]
}

const DIRS: Dir[] = [
  {
    n: '01',
    t: 'Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar',
    d: 'Davlat, nodavlat va xorijiy oliy taʼlim taşkilotlarining filiallaridagi boşlanğiç taşkilotlar va ularning yoşlar yetakçilari.',
    href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim',
    go: 'Yetakçilarni köriş',
    stats: [
      { v: String(OTMS.length), t: 'Oliy taʼlim taşkiloti' },
      { v: String(LED.length), t: 'Yoşlar yetakçisi' },
      { v: String(OTMS.length - LED.length), t: 'Vakant', accent: true },
    ],
    faces: LED.map((o) => o.leader!.img),
  },
  {
    n: '02',
    t: 'Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar',
    d: 'Harbiy qismlar va muassasalarda faoliyat yuritayotgan boşlanğiç taşkilotlar va ularning yoşlar yetakçilari.',
    href: '/biz-haqimizda/boshlangich-tashkilotlar/harbiy',
    go: 'Sahifaga ötiş',
    stats: [{ v: '—', t: 'Röyxat tayyorlanmoqda' }],
    faces: [],
  },
]

type V = 'a' | 'b' | 'c' | 'd'

function Stats({ s }: { s: Stat[] }) {
  return (
    <dl className="bt-stats">
      {s.map((x) => (
        <div key={x.t} className={x.accent ? 'acc' : undefined}>
          <dt>{x.t}</dt>
          <dd>{x.v}</dd>
        </div>
      ))}
    </dl>
  )
}

const Arrow = () => <span aria-hidden="true">→</span>

const Shield = () => (
  <svg className="bh-shield" viewBox="0 0 64 72" aria-hidden="true">
    <path d="M32 3 6 13v20c0 17 11 30 26 36 15-6 26-19 26-36V13L32 3z" />
    <path d="m22 36 7 7 14-15" />
  </svg>
)

/** Bitta yönaliş kartasi — tanlangan körinişda */
function Dir({ x, view, L }: { x: Dir; view: V; L: (h: string) => string }) {
  const href = L(x.href)
  if (view === 'c')
    return (
      <Link href={href} className="bh-row">
        <span className="bh-row-n">{x.n}</span>
        <span className="bh-row-txt">
          <h2>{x.t}</h2>
          <p>{x.d}</p>
        </span>
        <Stats s={x.stats} />
        <span className="bh-row-go" aria-label={x.go}>
          <Arrow />
        </span>
      </Link>
    )
  if (view === 'd')
    return (
      <Link href={href} className="bh-pic">
        <span className="bh-pic-txt">
          <span className="bt-hub-n">{x.n}</span>
          <h2>{x.t}</h2>
          <p>{x.d}</p>
          <Stats s={x.stats} />
          <span className="bt-hub-go">
            {x.go} <Arrow />
          </span>
        </span>
        <span className="bh-pic-side" aria-hidden="true">
          {x.faces.length ? (
            <span className="bh-mosaic">
              {x.faces.slice(0, 12).map((f) => (
                <img key={f} src={f} alt="" />
              ))}
            </span>
          ) : (
            <Shield />
          )}
        </span>
      </Link>
    )
  // a va b — bir xil tuzilma, b da töq/oçiq kontrast va yirik raqamlar
  return (
    <Link href={href} className={`bt-hub-card${view === 'b' ? ' bh-b' : ''}`}>
      <span className="bt-hub-n">{x.n}</span>
      <h2>{x.t}</h2>
      <p>{x.d}</p>
      <Stats s={x.stats} />
      <span className="bt-hub-foot">
        <span className="bt-faces" aria-hidden="true">
          {x.faces.slice(0, view === 'b' ? 8 : 6).map((f) => (
            <img key={f} src={f} alt="" />
          ))}
          {!x.faces.length && view === 'b' && <Shield />}
        </span>
        <span className="bt-hub-go">
          {x.go} <Arrow />
        </span>
      </span>
    </Link>
  )
}

function Hub({ view, L }: { view: V; L: (h: string) => string }) {
  return (
    <div className={`wrap bt-hub bt-hub--${view}`}>
      {DIRS.map((x) => (
        <Dir key={x.n} x={x} view={view} L={L} />
      ))}
    </div>
  )
}

/**
 * “Boşlanğiç taşkilotlar” umumiy sahifasi: ikki yönaliş — oliy taʼlim taşkilotlari
 * hamda harbiy qismlar va muassasalar. Har karta öz sahifasiga olib boradi.
 */
export function BtHub({ L, crumbs }: { L: (h: string) => string; crumbs: ReactNode }) {
  return (
    <div className="bt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Boşlanğiç taşkilotlar</h1>
          <p className="pg-lead">
            Özbekiston yoşlar ittifoqining Toşkent şahridagi boşlanğiç taşkilotlari — oliy taʼlim
            taşkilotlarida hamda harbiy qismlar va muassasalarda.
          </p>
        </div>
      </header>
      <section className="sec bt-sec">
        {DEV ? (
          (['a', 'b', 'c', 'd'] as const).map((v) => (
            <div key={v} className="vx" data-v={`bth-${v}`}>
              <Hub view={v} L={L} />
            </div>
          ))
        ) : (
          <Hub view="a" L={L} />
        )}
      </section>
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
