/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'

/** Yaqin tadbirlar (gorizontal ro‘yxat). ittifoq/index.html prototipidan avtomatik ko'chirilgan — dizaynni o'zgartirmang. */
export function Events({ locale }: { locale: Locale }) {
  return (
    <>
<section className="sec" id="tadbirlar">
  <div className="wrap">
    <div className="sec-head">
      <h2 className="h2">Yaqin tadbirlar</h2>
      <Link href={`/${locale}/faoliyat/tadbirlar`} className="btn btn-ghost">Barchasi</Link>
    </div>
    <div className="track">
      <Link href={`/${locale}/faoliyat/tadbirlar`} className="ev">
        <div className="ev-thumb" style={{ background: "var(--green)" }}><span>14<small>NOY</small></span><img className="cover" src="/img/opp-vol.jpg" alt="" /></div>
        <div className="ev-body"><h3>Volontyorlar forumi</h3><p>Shahar kengashi</p></div>
        <span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
      </Link>
      <Link href={`/${locale}/faoliyat/tadbirlar`} className="ev">
        <div className="ev-thumb" style={{ background: "var(--blue)" }}><span>20<small>NOY</small></span><img className="cover" src="/img/about-2.jpg" alt="" /></div>
        <div className="ev-body"><h3>Yosh tadbirkorlar uchrashuvi</h3><p>Hamkor tashkilotlar bilan</p></div>
        <span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
      </Link>
      <Link href={`/${locale}/faoliyat/tadbirlar`} className="ev">
        <div className="ev-thumb" style={{ background: "var(--sky)" }}><span>27<small>NOY</small></span><img className="cover" src="/img/opp-stip.jpg" alt="" /></div>
        <div className="ev-body"><h3>Kitobxonlik tanlovi finali</h3><p>OTM boshlang‘ich tashkilotlari</p></div>
        <span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
      </Link>
      <Link href={`/${locale}/faoliyat/tadbirlar`} className="ev">
        <div className="ev-thumb" style={{ background: "var(--navy)" }}><span>04<small>DEK</small></span><img className="cover" src="/img/news-2.jpg" alt="" /></div>
        <div className="ev-body"><h3>IT va startaplar haftaligi</h3><p>Poytaxt miqyosida</p></div>
        <span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
      </Link>
    </div>
  </div>
</section>
    </>
  )
}
