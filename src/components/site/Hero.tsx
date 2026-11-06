/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { CollageScaler } from './CollageScaler'
import { HeroArtB, HeroArtC, HeroArtD, HeroArtE, HeroArtF } from './HeroArt'

/** Bosh ekran: sarlavha, tugma va kollaj. ittifoq/index.html prototipidan avtomatik ko'chirilgan — dizaynni o'zgartirmang. */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <>
<section className="hero">
  <div className="wrap">
    <div className="hero-content">
      <div className="hero-text">
        <div>
          <h1 className="h1 hero-slogan"><span>Orzu qil.</span> <span>Harakat qil.</span> <span>Biz yoningdamiz.</span></h1>
          <p className="lead">Taʼlim, sport, ijod, tadbirkorlik va volontyorlik yönalişlarida poytaxt yoşlari uçun doimiy dasturlar. Yangiliklarni ötkazib yubormang.</p>
        </div>
        <div className="hero-actions">
          <Link href={`/${locale}/faoliyat/loyihalar`} className="btn btn-primary">Imkoniyatlarni köriş
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </div>
      </div>

      <div className="collage-fit hrv hrv-a" id="collageFit"><CollageScaler />
        <div className="collage" id="collage" aria-hidden="true">
          <div className="c-wave"><b style={{ height: "34px" }}></b><b style={{ height: "46px" }}></b><b style={{ height: "60px" }}></b><b style={{ height: "46px" }}></b><b style={{ height: "34px" }}></b></div>
          <div className="c-pill"><img src="/img/about-1.jpg" alt="" /></div>
          <div className="c-bubble">Salom!</div>
          <svg className="c-blob" viewBox="0 0 100 100"><path fill="#89C0FF" d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z" /></svg>
          <div className="c-play"></div>
          <svg className="c-star" viewBox="0 0 40 40"><path fill="#FF854B" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" /></svg>
          <div className="c-half"></div>
          <div className="c-tag">Yoşlar Ittifoqi</div>
          <div className="c-circle">
            <i style={{ height: "40px", left: "62px", top: "104px" }}></i><i style={{ height: "24px", left: "62px", top: "128px", borderRadius: "50%" }}></i>
            <i style={{ height: "66px", left: "96px", top: "78px" }}></i><i style={{ height: "96px", left: "130px", top: "52px" }}></i>
          </div>
          <svg className="c-star2" viewBox="0 0 40 40"><path fill="#43A574" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" /></svg>
          <div className="c-green"></div>
          <div className="c-bottom"></div>
          <div className="c-photo"><img className="cover" src="/img/hero-tk.jpg" alt="" /></div>
          <div className="c-o"></div>
        </div>
      </div>
      {/* VAQTINCHA (faqat dev): öng tomon variantlari */}
      {process.env.NODE_ENV !== 'production' && (
        <>
          <div className="hrv hrv-b"><HeroArtB locale={locale} /></div>
          <div className="hrv hrv-c"><HeroArtC /></div>
          <div className="hrv hrv-d"><HeroArtD /></div>
          <div className="hrv hrv-e"><HeroArtE /></div>
          <div className="hrv hrv-f"><HeroArtF /></div>
        </>
      )}
    </div>
  </div>
</section>
    </>
  )
}
