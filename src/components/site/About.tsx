/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import { getOtts, getPartners } from '@/lib/cms/biz'
import { SplitWords } from '@/components/site/SplitWords'
import { getBosh } from '@/lib/cms/sahifalar'
import type { Locale } from '@/i18n/config'
import { ittifoqLogo } from '@/lib/logo'

const SPARK = 'M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z'
const BURST =
  'M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z'

/** Biz haqimizda va raqamlar: Ittifoq va uning poytaxtdagi Kengaşi; öngda Ittifoq mavzusidagi kompozitsiya. */
export async function About({ locale }: { locale: Locale }) {
  const [OTMS, { all: PARTNERS }, { about: A }] = await Promise.all([getOtts(locale), getPartners(locale), getBosh(locale)])
  const logo = ittifoqLogo(locale)
  return (
    <>
<section className="sec" id="biz-haqimizda">
  <div className="wrap">
    <div className="about-head">
      <h2 className="h2"><SplitWords text={A.title} /></h2>
      <div className="about-art" aria-hidden="true">
        {/* VAQTINÇA: 3 ta variant (DevSectionsPanel → about) — Ittifoq mavzusidagi kompozitsiya */}
        <div className="vx" data-v="about-a">
          <div className="ab-ring"></div>
          <div className="ab-logo ab-logo--orbit"><img {...logo} alt="" loading="lazy" decoding="async" /></div>
          <span className="ab-ph ab-ph--1"><img src="/img/ittifoq/lenta/1-01.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ab-ph ab-ph--2"><img src="/img/ittifoq/lenta/1-05.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ab-ph ab-ph--3"><img src="/img/ittifoq/lenta/2-06.webp" alt="" loading="lazy" decoding="async" /></span>
          <svg className="ab-spark ab-spark--g" viewBox="0 0 40 40"><path d={SPARK} /></svg>
          <svg className="ab-spark ab-spark--b" viewBox="0 0 40 40"><path d={SPARK} /></svg>
          <svg className="ab-burst" viewBox="0 0 100 100"><path d={BURST} /></svg>
        </div>
        <div className="vx" data-v="about-b">
          <span className="ab-card ab-card--1"><img src="/img/ittifoq/lenta/1-01.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ab-card ab-card--2"><img src="/img/ittifoq/lenta/2-02.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ab-card ab-card--3"><img src="/img/ittifoq/lenta/1-05.webp" alt="" loading="lazy" decoding="async" /></span>
          <div className="ab-logo ab-logo--pill"><img {...logo} alt="" loading="lazy" decoding="async" /></div>
          <span className="ab-seal">
            <svg viewBox="0 0 100 100"><path d={BURST} /></svg>
            <b>{A.year}</b>
          </span>
          <svg className="ab-spark ab-spark--g2" viewBox="0 0 40 40"><path d={SPARK} /></svg>
        </div>
        <div className="vx" data-v="about-c">
          <svg className="ab-green" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#43A574" strokeWidth="20" /></svg>
          <span className="ab-badge"><img src="/img/ittifoq/nishon-ozbekiston-belgisi.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ab-medal ab-medal--1"><img src="/img/ittifoq/medal-mard-oglon.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ab-medal ab-medal--2"><img src="/img/ittifoq/medal-kelajak-bunyodkori.webp" alt="" loading="lazy" decoding="async" /></span>
          <div className="ab-logo ab-logo--pill ab-logo--c"><img {...logo} alt="" loading="lazy" decoding="async" /></div>
          <svg className="ab-spark ab-spark--b2" viewBox="0 0 40 40"><path d={SPARK} /></svg>
          <svg className="ab-burst ab-burst--c" viewBox="0 0 100 100"><path d={BURST} /></svg>
        </div>
      </div>
    </div>
    <div className="about-row">
      <div className="ach">
        {/* Raqamlar sayt maʼlumotlaridan hisoblanadi: OTTlar röyxati va hamkorlar röyxati */}
        <div><b>{A.year}</b><span>{A.yearLabel}</span></div>
        <div><b>{OTMS.length}</b><span>{A.ottLabel}</span></div>
        <div><b>{PARTNERS.length}</b><span>{A.partnersLabel}</span></div>
      </div>
      <p className="body4">{A.text}</p>
    </div>
  </div>
</section>
    </>
  )
}
