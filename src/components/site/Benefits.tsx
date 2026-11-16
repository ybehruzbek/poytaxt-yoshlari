/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import type { Locale } from '@/i18n/config'

import { getBosh } from '@/lib/cms/sahifalar'

import { BenefitsTabs } from './BenefitsTabs'

/** “Ittifoq yoşlarga nima beradi”: çapda prototip kollaji, öngda faoliyat turiga qarab imkoniyatlar (BenefitsTabs). */
export async function Benefits({ locale }: { locale: Locale }) {
  const { benefits: B } = await getBosh(locale)
  return (
    <>
<section className="sec">
  <div className="wrap benefit">
    <div className="ui" aria-hidden="true">
      <div style={{ left: "421px", top: "116px", width: "175px", height: "412px", borderRadius: "136px", background: "var(--sky)" }}></div>
      <div style={{ left: "95px", top: "0", width: "328px", height: "592px", borderRadius: "164px", overflow: "hidden", background: "var(--green)" }}><img className="cover" src="/img/about-2.jpg" alt="" style={{ objectPosition: "62% 50%" }} /></div>
      <div style={{ left: "30px", top: "452px", width: "190px", height: "96px", borderRadius: "50px", background: "#fff", transform: "rotate(-10deg)", boxShadow: "0 10px 30px rgba(83,40,34,.1)", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>
        <i className="bar" style={{ height: "34px" }}></i><i className="bar" style={{ height: "46px" }}></i><i className="bar" style={{ height: "60px" }}></i><i className="bar" style={{ height: "46px" }}></i><i className="bar" style={{ height: "34px" }}></i>
      </div>
      <div style={{ left: "6px", top: "300px", width: "220px", height: "58px", borderRadius: "20px", background: "var(--blue)", transform: "rotate(6.7deg)", display: "grid", placeItems: "center", fontFamily: "var(--f-head)", fontWeight: "600", fontSize: "24px", color: "#fff" }}>#YoşlarBilan</div>
      <div style={{ left: "459px", top: "160px", width: "100px", height: "100px", borderRadius: "50%", border: "5px solid #fff", display: "grid", placeItems: "center" }}><span style={{ borderLeft: "26px solid #fff", borderTop: "16px solid transparent", borderBottom: "16px solid transparent", marginLeft: "8px" }}></span></div>
      <div style={{ left: "480px", top: "285px", width: "57px", height: "94px", borderRadius: "136px", background: "var(--blue)" }}></div>
      <div style={{ left: "430px", top: "400px", width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", border: "8px solid #fff" }}><img className="cover" src="/img/news-3.jpg" alt="" /></div>
    </div>
    <div>
      <h2 className="h2">{B.title}</h2>
      <p className="body4 bnf-lead">{B.lead}</p>
      <BenefitsTabs base={`/${locale}`} roles={B.roles} />
    </div>
  </div>
</section>
    </>
  )
}
