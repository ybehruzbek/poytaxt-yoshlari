/* eslint-disable @next/next/no-img-element -- yetakçilar suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { Otm } from './data'
import { More } from '@/components/site/MoreBtn'
import { getOtts } from '@/lib/cms/biz'

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

/** Ikki yönaliş kartasi: OTT raqamlari admin paneldagi röyxatdan */
const dirsOf = (OTMS: Otm[], LED = OTMS.filter((o) => o.leader)): Dir[] => [
  {
    n: '01',
    t: 'Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar',
    d: 'Toşkent şahridagi davlat va nodavlat oliy taʼlim taşkilotlari hamda xorijiy oliy taʼlim taşkilotlarining filiallaridagi boşlanğiç taşkilotlar va ularning yoşlar yetakçilari.',
    href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim',
    go: 'Sahifaga ötiş',
    stats: [
      { v: String(OTMS.length), t: 'Oliy taʼlim taşkiloti' },
      { v: String(LED.length), t: 'Yoşlar yetakçisi' },
      { v: String(OTMS.length - LED.length), t: 'Yetakçi lavozimi vakant', accent: true },
    ],
    faces: LED.map((o) => o.leader!.img),
  },
  {
    n: '02',
    t: 'Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar',
    d: 'Toşkent şahridagi harbiy qismlar va muassasalarda faoliyat yuritayotgan boşlanğiç taşkilotlar va ularning yoşlar yetakçilari.',
    href: '/biz-haqimizda/boshlangich-tashkilotlar/harbiy',
    go: 'Sahifaga ötiş',
    stats: [{ v: '—', t: 'Röyxat tayyorlanmoqda' }],
    faces: [],
  },
]

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

const Shield = () => (
  <svg className="bh-shield" viewBox="0 0 64 72" aria-hidden="true">
    <path d="M32 3 6 13v20c0 17 11 30 26 36 15-6 26-19 26-36V13L32 3z" />
    <path d="m22 36 7 7 14-15" />
  </svg>
)

/**
 * Bitta yönaliş kartasi (B — kontrastli): birinçisi töq fonda sariq yirik raqamlar va yetakçilar
 * suratlari bilan, ikkinçisi oçiq fonda qalqon belgisi bilan.
 */
function Dir({ x, L }: { x: Dir; L: (h: string) => string }) {
  return (
    <Link href={L(x.href)} className="bt-hub-card bh-b">
      <span className="bt-hub-n">{x.n}</span>
      <h2>{x.t}</h2>
      <p>{x.d}</p>
      <Stats s={x.stats} />
      <span className="bt-hub-foot">
        <span className="bt-faces" aria-hidden="true">
          {x.faces.slice(0, 8).map((f) => (
            <img key={f} src={f} alt="" loading="lazy" decoding="async" />
          ))}
          {!x.faces.length && <Shield />}
        </span>
        <span className="more-btn">
          <More>
            Batafsil<span className="sr-only">{`: ${x.go}`}</span>
          </More>
        </span>
      </span>
    </Link>
  )
}

/**
 * “Boşlanğiç taşkilotlar” umumiy sahifasi: ikki yönaliş — oliy taʼlim taşkilotlari
 * hamda harbiy qismlar va muassasalar. Har karta öz sahifasiga olib boradi.
 */
export async function BtHub({ L, crumbs, locale = 'uz' }: { L: (h: string) => string; crumbs: ReactNode; locale?: string }) {
  const DIRS = dirsOf(await getOtts(locale))
  return (
    <div className="bt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Boşlanğiç taşkilotlar</h1>
        </div>
      </header>
      <section className="sec bt-sec">
        <div className="wrap bt-hub bt-hub--b">
          {DIRS.map((x) => (
            <Dir key={x.n} x={x} L={L} />
          ))}
        </div>
      </section>
    </div>
  )
}
