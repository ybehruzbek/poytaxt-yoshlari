/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'
import { Arrow } from '@/components/site/SocialPhones'

import { Centres } from './Centres'
import { CompaniesA, CompaniesB, CompaniesC } from './Companies'
import { CentresB, CentresC } from './CentresAlt'
import { Hero } from './Hero'
import { HistoryB, HistoryC, MissionB, MissionC, MosaicB, MosaicC, WhoB, WhoC } from './AltOne'
import {
  PrioritiesB,
  PrioritiesC,
  ProjectCardsB,
  ProjectCardsC,
  QuoteB,
  QuoteC,
  ResultsB,
  ResultsC,
} from './AltTwo'
import {
  ActsB,
  ActsC,
  JoinB,
  JoinC,
  OfficialB,
  OfficialC,
  OrgsB,
  OrgsC,
  StructureB,
  StructureC,
} from './AltThree'
import { OrgsD, OrgsE, OrgsF } from './OrgsLogos'
import { ProjectCards } from './ProjectCards'
import { QuoteD, QuoteE } from './QuotePhoto'
import {
  ACTS,
  HISTORY,
  IMG,
  JOIN,
  MISSION,
  MORE_STATS,
  OFFICIAL,
  ORGS,
  PRIORITIES,
  QUOTE,
  RESULTS,
  STATS,
  STRUCTURE,
  WHO,
} from './data'
import {
  IntlA,
  IntlB,
  IntlC,
  PrivilegesA,
  PrivilegesB,
  PrivilegesC,
  ProjectsA,
  ProjectsB,
  ProjectsC,
} from './Sections'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/** VAQTINCHA: bölimlar variantlari faqat ishlab chiqish rejimida */
const DEV = process.env.NODE_ENV !== 'production'

/** Variant öramasi: <html data-{name}="a|b|c"> böyiça körsatiladi */
function V({ name, k, children }: { name: string; k: string; children: ReactNode }) {
  if (!DEV) return <>{children}</>
  return (
    <div className="vx" data-v={`${name}-${k}`}>
      {children}
    </div>
  )
}

/** Variant panelidagi bölimlar (sahifadagi tartibda) */
const PANEL: PanelSection[] = [
  ['who', 'Biz kimmiz'],
  ['mos', 'Suratlar va raqamlar'],
  ['tar', 'Qisqa tarix'],
  ['maq', 'Maqsadimiz'],
  ['ust', 'Ustuvor yönalişlar'],
  ['iqt', 'Iqtibos'],
  ['imt', 'Mukofot va imtiyozlar'],
  ['loy', 'Loyihalar yönalişlari'],
  ['yir', 'Yirik loyihalar'],
  ['nat', 'Natijalar'],
  ['xal', 'Xalqaro hamkorlik'],
  ['mar', 'Yoşlar markazlari'],
  ['tas', 'Taşkilotlar'],
  ['med', 'Media va xizmat taşkilotlari'],
  ['tuz', 'Tuzilma'],
  ['azo', 'Aʼzolik'],
  ['huj', 'Normativ hujjatlar'],
  ['ras', 'Rasmiy maʼlumotlar'],
].map(([name, label]) => ({ name, label, count: name === 'iqt' ? 5 : name === 'tas' ? 6 : 3 }))

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

      <V name="who" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="who" k="b">
            <WhoB />
          </V>
          <V name="who" k="c">
            <WhoC />
          </V>
        </>
      )}

      <V name="mos" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="mos" k="b">
            <MosaicB />
          </V>
          <V name="mos" k="c">
            <MosaicC />
          </V>
        </>
      )}

      <V name="tar" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="tar" k="b">
            <HistoryB />
          </V>
          <V name="tar" k="c">
            <HistoryC />
          </V>
        </>
      )}

      <V name="maq" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="maq" k="b">
            <MissionB />
          </V>
          <V name="maq" k="c">
            <MissionC />
          </V>
        </>
      )}

      <V name="ust" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="ust" k="b">
            <PrioritiesB />
          </V>
          <V name="ust" k="c">
            <PrioritiesC />
          </V>
        </>
      )}

      <V name="iqt" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="iqt" k="b">
            <QuoteB />
          </V>
          <V name="iqt" k="c">
            <QuoteC />
          </V>
          <V name="iqt" k="d">
            <QuoteD />
          </V>
          <V name="iqt" k="e">
            <QuoteE />
          </V>
        </>
      )}

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
          <V name="yir" k="a">
            <ProjectCards />
          </V>
          {DEV && (
            <>
              <V name="yir" k="b">
                <ProjectCardsB />
              </V>
              <V name="yir" k="c">
                <ProjectCardsC />
              </V>
            </>
          )}
        </div>
      </section>

      <V name="nat" k="a">
        <section className="sec it-res-sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">Natijalar</h2>
            </div>
            <div className="it-res">
              {RESULTS.map((r) => (
                <article key={r.y}>
                  <b>{r.y}</b>
                  <ul>
                    {r.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  {r.src ? (
                    <a href={r.src} target="_blank" rel="noopener noreferrer">
                      Manba <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="it-res-src">Manba: Ittifoq taqdimoti, 2026</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </V>
      {DEV && (
        <>
          <V name="nat" k="b">
            <ResultsB />
          </V>
          <V name="nat" k="c">
            <ResultsC />
          </V>
        </>
      )}

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
        </>
      )}

      <V name="tas" k="a">
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">Ittifoq taʼsisçiligidagi taşkilotlar</h2>
            </div>
            <p className="it-struct-lead">{ORGS.lead}</p>
            <div className="it-orgs">
              {ORGS.ngos.map((o) => (
                <article key={o.t}>
                  <h3>{o.t}</h3>
                  <p>{o.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </V>
      {DEV && (
        <>
          <V name="tas" k="b">
            <OrgsB />
          </V>
          <V name="tas" k="c">
            <OrgsC />
          </V>
          <V name="tas" k="d">
            <OrgsD />
          </V>
          <V name="tas" k="e">
            <OrgsE />
          </V>
          <V name="tas" k="f">
            <OrgsF />
          </V>
        </>
      )}

      <V name="med" k="a">
        <CompaniesA />
      </V>
      {DEV && (
        <>
          <V name="med" k="b">
            <CompaniesB />
          </V>
          <V name="med" k="c">
            <CompaniesC />
          </V>
        </>
      )}

      <V name="tuz" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="tuz" k="b">
            <StructureB />
          </V>
          <V name="tuz" k="c">
            <StructureC />
          </V>
        </>
      )}

      <V name="azo" k="a">
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
      </V>
      {DEV && (
        <>
          <V name="azo" k="b">
            <JoinB L={L} />
          </V>
          <V name="azo" k="c">
            <JoinC L={L} />
          </V>
        </>
      )}

      <V name="huj" k="a">
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">Normativ-huquqiy hujjatlar</h2>
            </div>
            <ol className="it-acts">
              {ACTS.map((x) => (
                <li key={x.t}>
                  <time>{x.y}</time>
                  <div>
                    <h3>
                      {x.href ? (
                        <a href={x.href} target="_blank" rel="noopener noreferrer">
                          {x.t} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        x.t
                      )}
                    </h3>
                    <p>{x.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="it-acts-note">
              Ittifoq faoliyati, şuningdek, Özbekiston Respublikasi Konstitutsiyasi, nodavlat
              notijorat taşkilotlari töğrisidagi qonunlar va Ittifoq Ustaviga asoslanadi.
            </p>
          </div>
        </section>
      </V>
      {DEV && (
        <>
          <V name="huj" k="b">
            <ActsB />
          </V>
          <V name="huj" k="c">
            <ActsC />
          </V>
        </>
      )}

      <V name="ras" k="a">
        <section className="sec">
          <div className="wrap it-off">
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
        </section>
      </V>
      {DEV && (
        <>
          <V name="ras" k="b">
            <OfficialB />
          </V>
          <V name="ras" k="c">
            <OfficialC />
          </V>
        </>
      )}

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
