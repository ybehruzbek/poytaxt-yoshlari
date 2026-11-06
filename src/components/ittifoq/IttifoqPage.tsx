/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import { Centres } from './Centres'
import { GOALS, IMG, INTL, INTRO, MISSION, MORE_STATS, PRIVILEGES, PROJECTS, QUOTE, STATS } from './data'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * "Özbekiston yoşlar ittifoqi" sahifasi: butun ekranli surat bilan boşlanadigan hero,
 * vazifa va raqamlar, suratlar mozaikasi, maqsadlar, iqtibos, imtiyozlar, loyihalar, xalqaro hamkorlik, Yoşlar markazlari.
 */
export function IttifoqPage({ L, crumbs, siblings }: P) {
  return (
    <div className="it">
      <section className="it-hero">
        <img src={IMG.team} alt="" />
        <div className="wrap">
          {crumbs}
          <span className="it-day">30-iyun — Yoşlar kuni</span>
          <h1 className="h1">Özbekiston yoşlar ittifoqi</h1>
          <p className="lead">{INTRO}</p>
          <div className="it-btns">
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Aʼzo böliş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
            <Link href={L('/faoliyat/loyihalar')} className="btn btn-ghost">
              Loyihalarni köriş
            </Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2 it-mission">
            {MISSION.lead}
            <span className="mute">{MISSION.rest}</span>
          </h2>
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

      <section className="sec">
        <div className="wrap">
          <div className="it-mosaic">
            <img src={IMG.girls} alt="Kitob olami festivalida milliy liboslardagi qizlar" />
            <img src={IMG.seminar} alt="Boşlanğiç taşkilot yetakçilari seminari" />
            <img src={IMG.volunteers} alt="Volontyorlar" />
            <img src={IMG.books} alt="Yoşlar ijod saroyida kitobxonlar" />
            <img src={IMG.leaders} alt="Yoşlar yetakçilari forumi iştirokçilari" />
          </div>
          <div className="it-more">
            {MORE_STATS.map((s) => (
              <div key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec it-goals-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Maqsad va vazifalar</h2>
          </div>
          <div className="it-goals">
            {GOALS.map((g, i) => (
              <article key={g.t} style={{ '--c': g.c } as CSSProperties}>
                <span className="it-num">{pad(i)}</span>
                <h3>{g.t}</h3>
                <ul>
                  {g.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap it-quote">
          <img src={IMG.readers} alt="" />
          <blockquote>
            <p>«{QUOTE.text}»</p>
            <footer>
              <b>{QUOTE.author}</b>
              <span>{QUOTE.role}</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Mukofot va imtiyozlar</h2>
          </div>
          <div className="it-priv">
            {PRIVILEGES.map((p, i) => (
              <div key={p.t}>
                <span className="it-num">{pad(i)}</span>
                <h3>{p.t}</h3>
                <p>{p.text}</p>
                <b>{p.fact}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Loyihalar yönalişlari</h2>
          </div>
          <div className="it-proj">
            {PROJECTS.map((d) => (
              <div key={d.t}>
                <b>{d.t}</b>
                <span>{d.p.join(' · ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="it-intl">
            <div>
              <h2 className="h2">Xalqaro hamkorlik</h2>
              <p>{INTL.text}</p>
              <p>{INTL.assoc}</p>
            </div>
            <div className="it-intl-n">
              {INTL.facts.map((f) => (
                <div key={f.l}>
                  <b>{f.v}</b>
                  <span>{f.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Centres />

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
