/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'
import { DevVariantSwitch } from '@/components/site/DevVariantSwitch'
import { Arrow } from '@/components/site/SocialPhones'
import { CompaniesA } from './Companies'
import { CentresB } from './CentresAlt'
import { Acc, AccHead, GroupPanel, type AccMeta } from './Accordion'
import { GroupDeck } from './GroupDeck'
import { Hero } from './Hero'
import { ProjectCardsC, ResultsC } from './AltTwo'
import { OfficialB, StructureB } from './AltThree'
import { OrgsD } from './OrgsLogos'
import { QuoteE } from './QuotePhoto'
import { ACTS, HISTORY, IMG, JOIN, MISSION, MORE_STATS, PRIORITIES, STATS, WHO } from './data'
import { IntlB, PrivilegesB, ProjectsB } from './Sections'

/** VAQTINCHA: akkordeon körinişi variantlari faqat ishlab chiqish rejimida */
const DEV = process.env.NODE_ENV !== 'production'

/** Akkordeon bölimlari: nomi, qisqa izohi va guruhi */
const ACC: Record<string, AccMeta> = {
  'biz-kimmiz': {
    id: 'biz-kimmiz',
    title: 'Biz kimmiz',
    sub: 'Taşkilot haqida qisqaça va asosiy raqamlar',
    g: 'biz',
  },
  suratlar: {
    id: 'suratlar',
    title: 'Suratlarda Ittifoq',
    sub: 'Tadbirlardan lavhalar va yana 4 ta raqam',
    g: 'biz',
  },
  tarix: { id: 'tarix', title: 'Qisqa tarix', sub: '2001-yildan bugungaça', g: 'biz' },
  maqsad: { id: 'maqsad', title: 'Maqsadimiz', sub: 'Biz nimaga intilamiz', g: 'biz' },
  ustuvor: {
    id: 'ustuvor',
    title: 'Ustuvor yönalişlar',
    sub: 'PF-5106-son Farmondagi 12 ta yönaliş',
    g: 'biz',
  },
  iqtibos: { id: 'iqtibos', title: 'Prezident iqtibosi', sub: 'Yoşlarga murojaat', g: 'biz' },
  imtiyozlar: {
    id: 'imtiyozlar',
    title: 'Mukofot va imtiyozlar',
    sub: '6 ta mukofot va imtiyoz',
    g: 'faol',
  },
  loyihalar: {
    id: 'loyihalar',
    title: 'Loyihalar',
    sub: '10 ta yönaliş va 19 ta yirik loyiha',
    g: 'faol',
  },
  natijalar: {
    id: 'natijalar',
    title: 'Natijalar',
    sub: '2018, 2023 va 2025–2026-yillar',
    g: 'faol',
  },
  xalqaro: {
    id: 'xalqaro',
    title: 'Xalqaro hamkorlik',
    sub: '20 dan ziyod hamkor mamlakat',
    g: 'faol',
  },
  markazlar: {
    id: 'markazlar',
    title: 'Yoşlar markazlari',
    sub: 'Yoşlar ijod saroyi va 14 ta hudud',
    g: 'tizim',
  },
  taskilotlar: {
    id: 'taskilotlar',
    title: 'Ittifoq taʼsisçiligidagi taşkilotlar',
    sub: '19 ta nodavlat notijorat taşkilot',
    g: 'tizim',
  },
  media: {
    id: 'media',
    title: 'Media, naşriyot va xizmat taşkilotlari',
    sub: '11 ta taşkilot va Ittifoq uluşi',
    g: 'tizim',
  },
  tuzilma: {
    id: 'tuzilma',
    title: 'Qanday tuzilganmiz',
    sub: 'Qurultoydan boşlanğiç taşkilotgaça',
    g: 'tizim',
  },
  azolik: {
    id: 'azolik',
    title: 'Qanday aʼzo böliş mumkin',
    sub: '4 ta qadam va aʼzolar imkoniyatlari',
    g: 'azo',
  },
  hujjatlar: {
    id: 'hujjatlar',
    title: 'Normativ-huquqiy hujjatlar',
    sub: '8 ta asosiy hujjat',
    g: 'azo',
  },
  rasmiy: { id: 'rasmiy', title: 'Rasmiy maʼlumotlar', sub: 'Nomi, sanasi va manzili', g: 'azo' },
}

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * "Özbekiston yoşlar ittifoqi" sahifasi (matn: docs/matnlar/ittifoq-haqida.md): hero, biz kimmiz, raqamlar,
 * qisqa tarix, maqsad, nima qilamiz, iqtibos, imtiyozlar, loyihalar, xalqaro hamkorlik, Yoşlar markazlari,
 * tuzilma, aʼzolik va rasmiy maʼlumotlar.
 */
export function IttifoqPage({ L, crumbs, siblings }: P) {
  return (
    <div className="it it-accs">
      <Hero L={L} crumbs={crumbs} />

      <AccHead />
      {DEV && (
        <DevVariantSwitch
          name="acc"
          label="Akkordeon"
          titles={[
            'A · Röyxat',
            'B · Kartalar',
            'C · Guruhlar',
            'D · Töq çiziqlar',
            'E · Yonga oçiladigan çiziqlar',
          ]}
        />
      )}
      <GroupDeck>
        <GroupPanel g="biz" label="Biz haqimizda" n={1}>
          <Acc meta={ACC['biz-kimmiz']} n={1} open>
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
          </Acc>

          <Acc meta={ACC['suratlar']} n={2}>
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
          </Acc>

          <Acc meta={ACC['tarix']} n={3}>
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
          </Acc>

          <Acc meta={ACC['maqsad']} n={4}>
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
          </Acc>

          <Acc meta={ACC['ustuvor']} n={5}>
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
          </Acc>

          <Acc meta={ACC['iqtibos']} n={6}>
            <QuoteE />
          </Acc>
        </GroupPanel>
        <GroupPanel g="faol" label="Faoliyat va natijalar" n={2}>
          <Acc meta={ACC['imtiyozlar']} n={7}>
            <section className="sec">
              <div className="wrap">
                <div className="sec-head">
                  <h2 className="h2">Mukofot va imtiyozlar</h2>
                </div>

                <PrivilegesB />
              </div>
            </section>
          </Acc>

          <Acc meta={ACC['loyihalar']} n={8}>
            <section className="sec">
              <div className="wrap">
                <div className="sec-head">
                  <h2 className="h2">Loyihalar yönalişlari</h2>
                </div>

                <ProjectsB />

                <ProjectCardsC />
              </div>
            </section>
          </Acc>

          <Acc meta={ACC['natijalar']} n={9}>
            <ResultsC />
          </Acc>

          <Acc meta={ACC['xalqaro']} n={10}>
            <section className="sec">
              <div className="wrap">
                <IntlB />
              </div>
            </section>
          </Acc>
        </GroupPanel>
        <GroupPanel g="tizim" label="Tizim va taşkilotlar" n={3}>
          <Acc meta={ACC['markazlar']} n={11}>
            <CentresB />
          </Acc>

          <Acc meta={ACC['taskilotlar']} n={12}>
            <OrgsD />
          </Acc>

          <Acc meta={ACC['media']} n={13}>
            <CompaniesA />
          </Acc>

          <Acc meta={ACC['tuzilma']} n={14}>
            <StructureB />
          </Acc>
        </GroupPanel>
        <GroupPanel g="azo" label="Aʼzolik va hujjatlar" n={4}>
          <Acc meta={ACC['azolik']} n={15}>
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
          </Acc>

          <Acc meta={ACC['hujjatlar']} n={16}>
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
          </Acc>

          <Acc meta={ACC['rasmiy']} n={17}>
            <OfficialB />
          </Acc>
        </GroupPanel>
      </GroupDeck>

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
