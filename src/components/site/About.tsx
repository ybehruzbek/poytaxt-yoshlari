/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import { getOtts, getPartners } from '@/lib/cms/biz'
import { SplitWords } from '@/components/site/SplitWords'
import { getBosh } from '@/lib/cms/sahifalar'
import type { Locale } from '@/i18n/config'
import { logo as kengashLogo } from '@/lib/logo'

const SPARK = 'M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z'
/** “2017” muhri — 20 uçli muntazam yulduz (hisoblab çizilgan) */
const SEAL =
  'M50.0 1.0L56.9 6.5L65.1 3.4L70.0 10.8L78.8 10.4L81.1 18.9L89.6 21.2L89.2 30.0L96.6 34.9L93.5 43.1L99.0 50.0L93.5 56.9L96.6 65.1L89.2 70.0L89.6 78.8L81.1 81.1L78.8 89.6L70.0 89.2L65.1 96.6L56.9 93.5L50.0 99.0L43.1 93.5L34.9 96.6L30.0 89.2L21.2 89.6L18.9 81.1L10.4 78.8L10.8 70.0L3.4 65.1L6.5 56.9L1.0 50.0L6.5 43.1L3.4 34.9L10.8 30.0L10.4 21.2L18.9 18.9L21.2 10.4L30.0 10.8L34.9 3.4L43.1 6.5Z'

/** Biz haqimizda va raqamlar: Ittifoq va uning poytaxtdagi Kengaşi; öngda Kengaş faoliyatidan suratlar to'plami. */
export async function About({ locale }: { locale: Locale }) {
  const [OTMS, { all: PARTNERS }, { about: A }] = await Promise.all([getOtts(locale), getPartners(locale), getBosh(locale)])
  // Toşkent şahar hududiy Kengaşining logotipi (sayt boşidagi bilan bir xil, tanlangan tilda)
  const logo = kengashLogo(locale)
  return (
    <>
<section className="sec" id="biz-haqimizda">
  <div className="wrap">
    <div className="about-head">
      <h2 className="h2"><SplitWords text={A.title} /></h2>
      <div className="about-art" aria-hidden="true">
        {/* Kengaş faoliyatidan suratlar: OTT, hamkor taşkilotlar bilan tadbir, harbiy qism; ustida Kengaş logotipi va “2017” muhri */}
        <span className="ab-card ab-card--1"><img src="/img/biz/ott.webp" alt="" loading="lazy" decoding="async" /></span>
        <span className="ab-card ab-card--2"><img src="/img/biz/hamkor.webp" alt="" loading="lazy" decoding="async" /></span>
        <span className="ab-card ab-card--3"><img src="/img/biz/harbiy.webp" alt="" loading="lazy" decoding="async" /></span>
        <div className="ab-logo ab-logo--pill"><img {...logo} alt="" loading="lazy" decoding="async" /></div>
        <span className="ab-seal">
          <svg viewBox="0 0 100 100"><path d={SEAL} /></svg>
          <b>{A.year}</b>
        </span>
        <svg className="ab-spark ab-spark--g2" viewBox="0 0 40 40"><path d={SPARK} /></svg>
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
