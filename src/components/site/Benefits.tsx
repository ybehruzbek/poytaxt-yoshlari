/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import type { Locale } from '@/i18n/config'

import { getBosh } from '@/lib/cms/sahifalar'

import { BenefitsTabs } from './BenefitsTabs'

/** Ittifoq logotiplarining balandligi (eni 760 px) */
const LOGO_H: Record<Locale, number> = { uz: 314, ru: 252, en: 325 }

/** “Ittifoq yoşlarga nima beradi”: çapda prototip kollaji, öngda faoliyat turiga qarab imkoniyatlar (BenefitsTabs). */
export async function Benefits({ locale }: { locale: Locale }) {
  const { benefits: B } = await getBosh(locale)
  return (
    <>
<section className="sec">
  <div className="wrap benefit">
    <div className="ui" aria-hidden="true">
      <div style={{ left: "421px", top: "116px", width: "175px", height: "412px", borderRadius: "136px", background: "var(--sky)" }}></div>
      {/* VAQTINÇA: 2 ta variant (DevSectionsPanel) — A: odam kapsula içida, B: boşi kapsuladan çiqadi */}
      <div className="vx" data-v="bnf-a">
        <div className="bnf-pill bnf-pill--in"><img className="bnf-cut" src="/img/odamlar/ittifoq-beradi.webp" width={713} height={1200} alt="" loading="lazy" decoding="async" /></div>
      </div>
      <div className="vx" data-v="bnf-b">
        <div className="bnf-pill bnf-pill--low"></div>
        <div className="bnf-slot"><img className="bnf-cut" src="/img/odamlar/ittifoq-beradi.webp" width={713} height={1200} alt="" loading="lazy" decoding="async" /></div>
      </div>
      <div style={{ left: "30px", top: "452px", width: "190px", height: "96px", borderRadius: "50px", background: "#fff", transform: "rotate(-10deg)", boxShadow: "0 10px 30px rgba(83,40,34,.1)", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>
        <i className="bar" style={{ height: "34px" }}></i><i className="bar" style={{ height: "46px" }}></i><i className="bar" style={{ height: "60px" }}></i><i className="bar" style={{ height: "46px" }}></i><i className="bar" style={{ height: "34px" }}></i>
      </div>
      <div style={{ left: "6px", top: "300px", width: "220px", height: "58px", borderRadius: "20px", background: "var(--blue)", transform: "rotate(6.7deg)", display: "grid", placeItems: "center", fontFamily: "var(--f-head)", fontWeight: "600", fontSize: "24px", color: "#fff" }}>#YoşlarBilan</div>
      <div style={{ left: "459px", top: "160px", width: "100px", height: "100px", borderRadius: "50%", border: "5px solid #fff", display: "grid", placeItems: "center" }}><span style={{ borderLeft: "26px solid #fff", borderTop: "16px solid transparent", borderBottom: "16px solid transparent", marginLeft: "8px" }}></span></div>
      <div style={{ left: "480px", top: "285px", width: "57px", height: "94px", borderRadius: "136px", background: "var(--blue)" }}></div>
      {/* Ittifoq logotipi — sayt qaysi tilda oçilsa, öşa tildagi logotip */}
      <div className="bnf-logo"><img src={`/img/ittifoq-logo-${locale}.webp`} width={760} height={LOGO_H[locale]} alt="" loading="lazy" decoding="async" /></div>
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
