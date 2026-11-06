/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import type { CSSProperties, ReactNode } from 'react'

import { DevVariantSwitch } from '@/components/site/DevVariantSwitch'

import { Centres } from './Centres'
import { CentresB, CentresC } from './CentresAlt'
import { Hero } from './Hero'
import { GOALS, IMG, MISSION, MORE_STATS, QUOTE, STATS } from './data'
import { IntlA, IntlB, IntlC, PrivilegesA, PrivilegesB, PrivilegesC, ProjectsA, ProjectsB, ProjectsC } from './Sections'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/** VAQTINCHA: bölimlar variantlari faqat ishlab chiqish rejimida */
const DEV = process.env.NODE_ENV !== 'production'

/** Variant öramasi: <html data-{name}="a|b|c"> böyiça körsatiladi */
function V({ name, k, children }: { name: string; k: string; children: ReactNode }) {
  return (
    <div className="vx" data-v={`${name}-${k}`}>
      {children}
    </div>
  )
}

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * "Özbekiston yoşlar ittifoqi" sahifasi: butun ekranli surat bilan boşlanadigan hero,
 * vazifa va raqamlar, suratlar mozaikasi, maqsadlar, iqtibos, imtiyozlar, loyihalar, xalqaro hamkorlik, Yoşlar markazlari.
 */
export function IttifoqPage({ L, crumbs, siblings }: P) {
  return (
    <div className="it">
      <Hero L={L} crumbs={crumbs} />

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
          <V name="imt" k="a">
            <PrivilegesA />
          </V>
          {DEV && (
            <>
              <V name="imt" k="b">
                <PrivilegesB />
              </V>
              <V name="imt" k="c">
                <PrivilegesC />
              </V>
            </>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Loyihalar yönalişlari</h2>
          </div>
          <V name="loy" k="a">
            <ProjectsA />
          </V>
          {DEV && (
            <>
              <V name="loy" k="b">
                <ProjectsB />
              </V>
              <V name="loy" k="c">
                <ProjectsC />
              </V>
            </>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <V name="xal" k="a">
            <IntlA />
          </V>
          {DEV && (
            <>
              <V name="xal" k="b">
                <IntlB />
              </V>
              <V name="xal" k="c">
                <IntlC />
              </V>
            </>
          )}
        </div>
      </section>

      <V name="mar" k="a">
        <Centres />
      </V>
      {DEV && (
        <>
          <V name="mar" k="b">
            <CentresB />
          </V>
          <V name="mar" k="c">
            <CentresC />
          </V>
          <DevVariantSwitch name="imt" label="Imtiyozlar" className="s1" titles={['A · Suratli kartalar', 'B · Katta nişon va röyxat', 'C · Zigzag qatorlar']} />
          <DevVariantSwitch name="loy" label="Loyihalar" className="s2" titles={['A · Röyxat va logotiplar', 'B · Logotipli kartalar', 'C · Tugmalar va katta karta']} />
          <DevVariantSwitch name="xal" label="Xalqaro" className="s3" titles={['A · Töq blok va hamkorlar', 'B · Hamkorlar kartasi va bayroqlar lentasi', 'C · Uç karta va loyihalar']} />
          <DevVariantSwitch name="mar" label="Markazlar" className="s4" titles={['A · Hozirgi', 'B · Keng lenta va suratli tör', 'C · Gorizontal lenta']} />
        </>
      )}

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
