/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { CollageScaler } from './CollageScaler'
import { ScrollCue } from './ScrollCue'

/** Bosh ekran: sarlavha, tugma va kollaj. ittifoq/index.html prototipidan avtomatik ko'chirilgan — dizaynni o'zgartirmang. */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <>
<section className="hero">
  <div className="wrap">
    <div className="hero-content">
      <div className="hero-text">
        <div>
          <h1 className="h1 hero-slogan"><span className="hero-kicker">Özbekiston yoşlar ittifoqi</span> <span>Toşkent şahar</span> <span>hududiy Kengaşi</span></h1>
          <p className="lead">Kengaş poytaxtda Ittifoq boşlanğiç taşkilotlari faoliyatini muvofiqlaştiradi, yoşlar taşabbuslarini qöllab-quvvatlaydi, yoşlarning huquq va qonuniy manfaatlarini himoya qiladi.</p>
        </div>
        <div className="hero-actions">
          <Link href={`/${locale}/faoliyat/loyihalar`} className="btn btn-primary">Imkoniyatlarni köriş
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </div>
      </div>

      <div className="collage-fit" id="collageFit"><CollageScaler />
        <div className="collage" id="collage" aria-hidden="true">
          <div className="c-wave"><b style={{ height: "28px" }}></b><b style={{ height: "41px" }}></b><b style={{ height: "51px" }}></b><b style={{ height: "41px" }}></b><b style={{ height: "28px" }}></b></div>
          <div className="c-pill"><img src="/img/about-1.jpg" alt="" /></div>
          <div className="c-bubble">Salom!</div>
          <svg className="c-blob" viewBox="0 0 100 100"><path d="M99.7 50.0L98.9 52.6L96.8 54.9L94.0 57.0L91.0 58.7L88.6 60.4L87.4 62.1L87.3 64.3L88.3 67.0L89.6 70.2L90.8 73.5L91.1 76.7L90.2 79.2L88.1 80.8L85.0 81.5L81.5 81.5L78.0 81.1L75.2 81.1L73.1 81.8L71.8 83.5L71.0 86.3L70.2 89.6L69.2 93.0L67.6 95.7L65.4 97.3L62.7 97.3L59.8 96.1L57.0 94.0L54.4 91.7L52.1 89.9L50.0 89.3L47.9 89.9L45.6 91.7L43.0 94.0L40.2 96.1L37.3 97.3L34.6 97.3L32.4 95.7L30.8 93.0L29.8 89.6L29.1 86.3L28.2 83.5L26.9 81.8L24.8 81.1L22.0 81.1L18.5 81.5L15.0 81.5L11.9 80.8L9.8 79.2L8.9 76.7L9.2 73.5L10.4 70.2L11.7 67.0L12.7 64.3L12.6 62.1L11.4 60.4L9.0 58.7L6.0 57.0L3.2 54.9L1.1 52.6L0.3 50.0L1.1 47.4L3.2 45.1L6.0 43.0L9.0 41.3L11.4 39.6L12.6 37.9L12.7 35.7L11.7 33.0L10.4 29.8L9.2 26.5L8.9 23.3L9.8 20.8L11.9 19.2L15.0 18.5L18.5 18.5L22.0 18.9L24.8 18.9L26.9 18.2L28.2 16.5L29.0 13.7L29.8 10.4L30.8 7.0L32.4 4.3L34.6 2.7L37.3 2.7L40.2 3.9L43.0 6.0L45.6 8.3L47.9 10.1L50.0 10.7L52.1 10.1L54.4 8.3L57.0 6.0L59.8 3.9L62.7 2.7L65.4 2.7L67.6 4.3L69.2 7.0L70.2 10.4L71.0 13.7L71.8 16.5L73.1 18.2L75.2 18.9L78.0 18.9L81.5 18.5L85.0 18.5L88.1 19.2L90.2 20.8L91.1 23.3L90.8 26.5L89.6 29.8L88.3 33.0L87.3 35.7L87.4 37.9L88.6 39.6L91.0 41.3L94.0 43.0L96.8 45.1L98.9 47.4Z" /></svg>
          <div className="c-play"></div>
          <svg className="c-star" viewBox="0 0 100 100"><path d="M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z" /></svg>
          <div className="c-half"></div>
          <div className="c-tag">Yoşlar ittifoqi</div>
          <div className="c-circle">
            <i style={{ height: "21px", left: "35px", top: "78px", borderRadius: "50%" }}></i><i style={{ height: "31px", left: "45px", top: "102px" }}></i>
            <i style={{ height: "70px", left: "68px", top: "56px" }}></i><i style={{ height: "92px", left: "106px", top: "34px" }}></i>
          </div>
          <svg className="c-star2" viewBox="0 0 100 100"><path d="M50 0L61 30.9L93.3 25L72 50L93.3 75L61 69.1L50 100L39 69.1L6.7 75L28 50L6.7 25L39 30.9Z" /></svg>
          <div className="c-green"></div>
          <div className="c-bottom"></div>
          <div className="c-photo"><img className="cover" src="/img/hero-tk.jpg" alt="" /></div>
          <div className="c-o"></div>
        </div>
      </div>
    </div>
  </div>
  <ScrollCue />
</section>
    </>
  )
}
