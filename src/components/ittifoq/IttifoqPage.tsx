/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'
import { DevVariantSwitch } from '@/components/site/DevVariantSwitch'
import { Arrow } from '@/components/site/SocialPhones'
import { CompaniesA } from './Companies'
import { CentresB } from './CentresAlt'
import { Hero } from './Hero'
import { NavA, NavB, NavC, NavD, type NavGroup, type NavItem } from './SectionNav'
import { ProjectCardsC, ResultsC } from './AltTwo'
import { OfficialB, StructureB } from './AltThree'
import { OrgsD } from './OrgsLogos'
import { QuoteE } from './QuotePhoto'
import { ACTS, HISTORY, IMG, JOIN, MISSION, MORE_STATS, PRIORITIES, STATS, WHO } from './data'
import { IntlB, PrivilegesB, ProjectsB } from './Sections'

/** VAQTINCHA: bölimlar navigatsiyasi variantlari (B, C, D) faqat ishlab chiqish rejimida */
const DEV = process.env.NODE_ENV !== 'production'

/** Bölimlar röyxati (sahifa navigatsiyasi uçun) */
const NAV_ITEMS: NavItem[] = [
  { id: 'biz-kimmiz', label: 'Biz kimmiz', g: 'biz' },
  { id: 'tarix', label: 'Tarix', g: 'biz' },
  { id: 'maqsad', label: 'Maqsad', g: 'biz' },
  { id: 'ustuvor', label: 'Ustuvor yönalişlar', g: 'biz' },
  { id: 'imtiyozlar', label: 'Imtiyozlar', g: 'faol' },
  { id: 'loyihalar', label: 'Loyihalar', g: 'faol' },
  { id: 'natijalar', label: 'Natijalar', g: 'faol' },
  { id: 'xalqaro', label: 'Xalqaro hamkorlik', g: 'faol' },
  { id: 'markazlar', label: 'Yoşlar markazlari', g: 'tizim' },
  { id: 'taskilotlar', label: 'Taşkilotlar', g: 'tizim' },
  { id: 'media', label: 'Media va xizmatlar', g: 'tizim' },
  { id: 'tuzilma', label: 'Tuzilma', g: 'tizim' },
  { id: 'azolik', label: 'Aʼzolik', g: 'azo' },
  { id: 'hujjatlar', label: 'Hujjatlar', g: 'azo' },
  { id: 'rasmiy', label: 'Rasmiy maʼlumotlar', g: 'azo' },
]
const NAV_GROUPS: NavGroup[] = [
  { g: 'biz', label: 'Biz haqimizda' },
  { g: 'faol', label: 'Faoliyat va natijalar' },
  { g: 'tizim', label: 'Tizim va taşkilotlar' },
  { g: 'azo', label: 'Aʼzolik va hujjatlar' },
]

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

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
      <NavA items={NAV_ITEMS} />
      {DEV && (
        <>
          <NavB items={NAV_ITEMS} />
          <NavC items={NAV_ITEMS} />
          <NavD items={NAV_ITEMS} groups={NAV_GROUPS} />
          <DevVariantSwitch
            name="toc"
            label="Bölimlar"
            titles={[
              'A · Yopişqoq qator',
              'B · Çapda mundarija',
              'C · Öngda nuqtalar',
              'D · 4 ta yorliq',
            ]}
          />
        </>
      )}

      <div className="it-anc" id="biz-kimmiz" data-g="biz">
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
      </div>

      <div className="it-anc" id="suratlar" data-g="biz">
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
      </div>

      <div className="it-anc" id="tarix" data-g="biz">
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
      </div>

      <div className="it-anc" id="maqsad" data-g="biz">
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
      </div>

      <div className="it-anc" id="ustuvor" data-g="biz">
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
      </div>

      <div className="it-anc" id="iqtibos" data-g="biz">
        <QuoteE />
      </div>

      <div className="it-anc" id="imtiyozlar" data-g="faol">
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">Mukofot va imtiyozlar</h2>
            </div>

            <PrivilegesB />
          </div>
        </section>
      </div>

      <div className="it-anc" id="loyihalar" data-g="faol">
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">Loyihalar yönalişlari</h2>
            </div>

            <ProjectsB />

            <ProjectCardsC />
          </div>
        </section>
      </div>

      <div className="it-anc" id="natijalar" data-g="faol">
        <ResultsC />
      </div>

      <div className="it-anc" id="xalqaro" data-g="faol">
        <section className="sec">
          <div className="wrap">
            <IntlB />
          </div>
        </section>
      </div>

      <div className="it-anc" id="markazlar" data-g="tizim">
        <CentresB />
      </div>

      <div className="it-anc" id="taskilotlar" data-g="tizim">
        <OrgsD />
      </div>

      <div className="it-anc" id="media" data-g="tizim">
        <CompaniesA />
      </div>

      <div className="it-anc" id="tuzilma" data-g="tizim">
        <StructureB />
      </div>

      <div className="it-anc" id="azolik" data-g="azo">
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
      </div>

      <div className="it-anc" id="hujjatlar" data-g="azo">
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
      </div>

      <div className="it-anc" id="rasmiy" data-g="azo">
        <OfficialB />
      </div>

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
