/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'
import { FaqBlock } from '@/components/faq/FaqBlock'
import { FAQ_AZOLIK } from '@/components/faq/data'
import { More } from '@/components/site/MoreBtn'
import { SplitWords } from '@/components/site/SplitWords'
import { Arrow } from '@/components/site/SocialPhones'
import { CompaniesA } from './Companies'
import { CentresB } from './CentresAlt'
import { Hero } from './Hero'
import { OfficialB } from './AltThree'
import { Structure } from './Structure'
import { OrgsD } from './OrgsLogos'
import { QuoteE } from './QuotePhoto'
import { HISTORY, IMG, JOIN, MISSION, MORE_STATS, PRIORITIES, STATS, WHO } from './data'
import { IntlB, PrivilegesB, ProjectsB } from './Sections'

/** Ustav matnidagi band havolasi: /hujjatlar/normativ/ustav#band-4.2 */
const USTAV = (L: (h: string) => string, band: string) => L(`/hujjatlar/normativ/ustav#band-${band}`)

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

      <section className="sec">
        <div className="wrap">
          <div className="it-who">
            <div>
              <h2 className="h2">Biz kimmiz</h2>
              <p className="it-motto">“{WHO.motto}”</p>
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
            <SplitWords text={MISSION.text} />
          </h2>
        </div>
      </section>

      <section className="sec it-pri-sec">
        <div className="wrap">
          <div className="it-pri-head">
            <h2 className="h2">
              <span>Özbekiston yoşlar ittifoqining</span> <span>ustuvor yönalişlari</span>
            </h2>
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

      <QuoteE />

      <section className="sec" id="mukofotlar">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Mukofot va imtiyozlar</h2>
          </div>

          <PrivilegesB />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Loyihalar yönalişlari</h2>
          </div>

          <ProjectsB />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <IntlB />
        </div>
      </section>

      <CentresB />

      <OrgsD />

      <CompaniesA />

      <Structure L={L} />

      <section className="sec it-join-sec" id="azo-bolish">
        <div className="wrap">
          <div className="sec-head it-join-head">
            <h2 className="h2">Qanday aʼzo böliş mumkin</h2>
            <Link href={USTAV(L, '4.1')} className="more-btn">
              <More>Ustavning IV bobi</More>
            </Link>
          </div>

          <ol className="it-steps">
            {JOIN.steps.map((st, i) => (
              <li key={st.t}>
                <div className="it-step-top">
                  <i>{i + 1}</i>
                  <Link href={USTAV(L, st.band)} className="it-band">
                    {st.band}-band
                  </Link>
                </div>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <p className="it-join-note">
            <b>4.3-band.</b> {JOIN.note}
          </p>

          <div className="it-join-grid">
            <div>
              <h3>
                Aʼzoning huquqlari <span className="it-band">4.10-band</span>
              </h3>
              <ul>
                {JOIN.rights.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>
                Aʼzoning majburiyatlari <span className="it-band">4.11-band</span>
              </h3>
              <ul className="it-duties">
                {JOIN.duties.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>
                Yuridik şaxslar aʼzoligi <span className="it-band">4.7–4.8-bandlar</span>
              </h3>
              <p>{JOIN.legal.d}</p>
              <p className="it-join-how">{JOIN.legal.how}</p>
            </div>
            <div>
              <h3>
                Aʼzolik qaysi hollarda bekor qilinadi <span className="it-band">4.6-band</span>
              </h3>
              <ul className="it-ends">
                {JOIN.ends.map((x) => (
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
            <Link href={L('/boglanish/azo-bolish')} className="btn btn-primary">
              Aʼzo böliş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
          </div>
          <div className="it-join-faq">
            <FaqBlock ids={FAQ_AZOLIK} base={L('')} title="Aʼzolik haqida savollar" section={false} />
          </div>
        </div>
      </section>

      <OfficialB />

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
