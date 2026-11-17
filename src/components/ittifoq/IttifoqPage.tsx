/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'
import { FaqBlock } from '@/components/faq/FaqBlock'
import { More } from '@/components/site/MoreBtn'
import { SplitWords } from '@/components/site/SplitWords'
import { Arrow } from '@/components/site/SocialPhones'
import { CompaniesA } from './Companies'
import { CentresB } from './CentresAlt'
import { Hero } from './Hero'
import { History } from './History'
import { Priorities } from './Priorities'
import { OfficialB } from './AltThree'
import { Structure } from './Structure'
import { OrgsD } from './OrgsLogos'
import { QuoteE } from './QuotePhoto'
import { getIttifoq } from '@/lib/cms/sahifalar'
import { IntlB, PrivilegesB } from './Sections'

/** Ustav matnidagi band havolasi: /hujjatlar/normativ/ustav#band-4.2 */
const USTAV = (L: (h: string) => string, band: string) =>
  L(`/hujjatlar/normativ/ustav#band-${band}`)

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/**
 * "Özbekiston yoşlar ittifoqi" sahifasi (matn: docs/matnlar/ittifoq-haqida.md): hero, biz kimmiz, raqamlar,
 * qisqa tarix, maqsad, nima qilamiz, iqtibos, imtiyozlar, xalqaro hamkorlik, Yoşlar markazlari,
 * tuzilma, aʼzolik va rasmiy maʼlumotlar.
 */
export async function IttifoqPage({ L, crumbs, siblings }: P) {
  // sahifa mazmuni admin paneldan (Biz haqimizda → Ittifoq haqida sahifasi)
  const D = await getIttifoq(L('').split('/')[1] || 'uz')
  const { IMG, JOIN, MISSION, MORE_STATS, STATS, WHO } = D
  return (
    <div className="it">
      <Hero D={D} L={L} crumbs={crumbs} />

      <section className="sec">
        <div className="wrap">
          <div className="it-who">
            <div>
              <h2 className="h2">Ittifoq haqida</h2>
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
            <img src={IMG.girls} alt="Kitob olami festivalida milliy liboslardagi qizlar" loading="lazy" decoding="async" />
            <img src={IMG.seminar} alt="Boşlanğiç taşkilot yetakçilari seminari" loading="lazy" decoding="async" />
            <img src={IMG.volunteers} alt="Volontyorlar" loading="lazy" decoding="async" />
            <img src={IMG.books} alt="Yoşlar ijod saroyida kitobxonlar" loading="lazy" decoding="async" />
            <img src={IMG.leaders} alt="Yoşlar yetakçilari forumi iştirokçilari" loading="lazy" decoding="async" />
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

      <section className="sec it-hsec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Qisqa tarix</h2>
          </div>
          <History D={D} />
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
          <Priorities D={D} />
        </div>
      </section>

      <QuoteE D={D} />

      <section className="sec" id="mukofotlar">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Mukofot va imtiyozlar</h2>
          </div>

          <PrivilegesB D={D} awardsHref={L('/faoliyat/davlat-mukofotlari')} locale={L('').split('/')[1] || 'uz'} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <IntlB D={D} />
        </div>
      </section>

      <CentresB D={D} />

      <OrgsD D={D} />

      <CompaniesA D={D} />

      <Structure D={D} L={L} />

      <section className="sec it-join-sec" id="azo-bolish">
        <div className="wrap">
          <div className="sec-head it-join-head">
            <h2 className="h2">Aʼzolikka qabul qiliş tartibi</h2>
            <Link href={USTAV(L, '4.1')} className="more-btn">
              <More>
                Batafsil<span className="sr-only">: Ustavning IV bobi</span>
              </More>
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
                Aʼzolikni bekor qiliş asoslari <span className="it-band">4.6-band</span>
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
            <FaqBlock
              pick="azolik"
              base={L('')}
              title="Aʼzolik haqida savollar"
              section={false}
            />
          </div>
        </div>
      </section>

      <OfficialB D={D} locale={L('').replace('/', '')} />

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
