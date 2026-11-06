/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import { IMG, INTRO, STATS } from './data'

type H = { L: (h: string) => string; crumbs: ReactNode }

const TITLE = 'Özbekiston yoşlar ittifoqi'

function Btns({ L, light }: { L: H['L']; light?: boolean }) {
  return (
    <div className="it-btns">
      <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
        Aʼzo böliş{' '}
        <span className="ic">
          <Arrow />
        </span>
      </Link>
      <Link href={L('/faoliyat/loyihalar')} className={`btn btn-ghost${light ? ' ith-ghost' : ''}`}>
        Loyihalarni köriş
      </Link>
    </div>
  )
}

/** A — butun ekranli surat, matn ustida (hozirgi) */
export function HeroA({ L, crumbs }: H) {
  return (
    <section className="it-hero ith ith-a">
      <img src={IMG.team} alt="" />
      <div className="wrap">
        {crumbs}
        <span className="it-day">30-iyun — Yoşlar kuni</span>
        <h1 className="h1">{TITLE}</h1>
        <p className="lead">{INTRO}</p>
        <Btns L={L} />
      </div>
    </section>
  )
}

/** B — çapda matn, öngda arka şaklidagi katta surat va suzib turgan raqamlar */
export function HeroB({ L, crumbs }: H) {
  return (
    <section className="page-hero ith ith-b">
      <div className="wrap ithb-in">
        <div>
          {crumbs}
          <span className="it-day">2017-yildan beri · 30-iyun — Yoşlar kuni</span>
          <h1 className="h1">
            Özbekiston <span>yoşlar</span> ittifoqi
          </h1>
          <p className="lead">{INTRO}</p>
          <Btns L={L} light />
        </div>
        <div className="ithb-art">
          <div className="ithb-arch">
            <img src={IMG.team} alt="" />
          </div>
          <div className="ithb-chip ithb-c1">
            <b>{STATS[0].v}</b>
            <span>yetakçi va koordinator</span>
          </div>
          <div className="ithb-chip ithb-c2">
            <b>{STATS[2].v}</b>
            <span>hududda Yoşlar markazi</span>
          </div>
          <div className="ithb-sun" aria-hidden="true">
            <b>30</b>
            <span>iyun</span>
          </div>
          <svg className="ithb-star" viewBox="0 0 40 40" aria-hidden="true">
            <path fill="#43A574" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
          </svg>
        </div>
      </div>
    </section>
  )
}

/** C — surat ustida oq karta, pastda 4 ta raqam lentasi */
export function HeroC({ L, crumbs }: H) {
  return (
    <section className="ith ith-c">
      <div className="ithc-photo">
        <img src={IMG.team} alt="" />
      </div>
      <div className="wrap ithc-in">
        <div className="ithc-card">
          {crumbs}
          <h1 className="h1">{TITLE}</h1>
          <p className="lead">{INTRO}</p>
          <Btns L={L} light />
        </div>
        <div className="ithc-stats">
          {STATS.map((s) => (
            <div key={s.l}>
              <b>{s.v}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** D — katta sarlavha, ostida keng surat lentasi va yoşlar suratlari */
export function HeroD({ L, crumbs }: H) {
  return (
    <section className="page-hero ith ith-d">
      <div className="wrap">
        {crumbs}
        <div className="ithd-top">
          <h1 className="h1">
            Yoşlar uçun, <span>yoşlar</span> bilan
          </h1>
          <div>
            <p className="ithd-kick">{TITLE}</p>
            <p className="lead">{INTRO}</p>
            <Btns L={L} light />
          </div>
        </div>
        <div className="ithd-strip">
          <div className="ithd-p ithd-p1">
            <img src={IMG.girls} alt="" />
          </div>
          <div className="ithd-p ithd-p2">
            <img src={IMG.team} alt="" />
            <span className="ithd-badge">30-iyun — Yoşlar kuni</span>
          </div>
          <div className="ithd-p ithd-p3">
            <img src={IMG.volunteers} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
