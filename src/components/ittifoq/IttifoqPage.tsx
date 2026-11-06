/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { DevVariantSwitch } from '@/components/site/DevVariantSwitch'
import { Arrow } from '@/components/site/SocialPhones'

import { Centres } from './Centres'
import { CentresB, CentresC } from './CentresAlt'
import { Hero } from './Hero'
import { ProjectCards } from './ProjectCards'
import { GOALS, HISTORY, IMG, JOIN, MISSION, MORE_STATS, OFFICIAL, PRIORITIES, QUOTE, STATS, STRUCTURE, WHO } from './data'
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
 * "Özbekiston yoşlar ittifoqi" sahifasi (matn: docs/matnlar/ittifoq-haqida.md): hero, biz kimmiz, raqamlar,
 * qisqa tarix, maqsad, nima qilamiz, iqtibos, imtiyozlar, loyihalar, xalqaro hamkorlik, Yoşlar markazlari,
 * tuzilma, aʼzolik va rasmiy maʼlumotlar.
 */
export function IttifoqPage({ L, crumbs, siblings }: P) {
  return (
    <div className="it">
      <Hero L={L} crumbs={crumbs} />

      <section className="sec">
        <div className="wrap">
          <div className="it-who">
            <div>
              <h2 className="h2">Biz kimmiz</h2>
              <p className="it-motto">«{WHO.motto}»</p>
            </div>
            <div className="it-who-txt">
              {WHO.paras.map((t) => (
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

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Qisqa tarix</h2>
          </div>
          <ol className="it-hist">
            {HISTORY.map((m) => (
              <li key={m.y}>
                <b>{m.y}</b>
                <p>{m.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="it-kick">Maqsadimiz</p>
          <h2 className="h2 it-mission">
            {MISSION.lead}
            <span className="mute">{MISSION.rest}</span>
          </h2>
          <p className="it-charter">{MISSION.charter}</p>
        </div>
      </section>

      <section className="sec it-goals-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Nima qilamiz</h2>
          </div>
          <div className="it-goals">
            {GOALS.map((g, i) => (
              <article key={g.t} style={{ '--c': g.c } as CSSProperties}>
                <span className="it-num">{pad(i)}</span>
                <h3>{g.t}</h3>
                <p>{g.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec it-pri-sec">
        <div className="wrap">
          <div className="it-pri-head">
            <h2 className="h2">Davlat belgilagan ustuvor yönalişlar</h2>
            <p>
              <a href={PRIORITIES.href} target="_blank" rel="noopener noreferrer">
                {PRIORITIES.source} <span aria-hidden="true">↗</span>
              </a>{' '}
              Ittifoq faoliyatining 12 ta ustuvor yönalişini belgilab bergan.
            </p>
          </div>
          <ol className="it-pri">
            {PRIORITIES.items.map((x, i) => (
              <li key={x}>
                <span>{pad(i)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
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
          <ProjectCards />
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
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Qanday tuzilganmiz</h2>
          </div>
          <p className="it-struct-lead">{STRUCTURE.lead}</p>
          <ol className="it-struct">
            {STRUCTURE.organs.map((o, i) => (
              <li key={o.t}>
                <span className="it-num">{pad(i)}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </li>
            ))}
          </ol>
          <div className="it-princ">
            <span>Tamoyillarimiz:</span>
            {STRUCTURE.principles.map((x) => (
              <b key={x}>{x}</b>
            ))}
          </div>
        </div>
      </section>

      <section className="sec it-join-sec" id="azo-bolish">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Qanday aʼzo böliş mumkin</h2>
          </div>
          <ol className="it-steps">
            {JOIN.steps.map((st, i) => (
              <li key={st.t}>
                <i>{i + 1}</i>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <div className="it-join-grid">
            <div>
              <h3>Aʼzo sifatida siz</h3>
              <ul>
                {JOIN.rights.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Qöşimça imkoniyatlar</h3>
              <ul>
                {JOIN.perks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="it-cta">
            <div>
              <h2 className="h2">{JOIN.cta.t}</h2>
              <p>{JOIN.cta.d}</p>
            </div>
            <Link href={L('/boglanish/murojaat?mavzu=azo')} className="btn btn-primary">
              Aʼzo böliş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap it-off">
          <div>
            <h2 className="h2">Rasmiy maʼlumotlar</h2>
            <dl>
              {OFFICIAL.rows.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>Huquqiy asos</h3>
            <ul>
              {OFFICIAL.laws.map((x) => (
                <li key={x.t}>
                  {x.href ? (
                    <a href={x.href} target="_blank" rel="noopener noreferrer">
                      {x.t} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    x.t
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
