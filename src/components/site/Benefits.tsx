/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import type { Locale } from '@/i18n/config'

import { getBosh } from '@/lib/cms/sahifalar'
import { ittifoqLogo } from '@/lib/logo'

import { BenefitsTabs } from './BenefitsTabs'

/** A bezak: imtiyoz stikerlari (bölim matnidagi imkoniyatlar) */
const CHIPS = ['Imtiyozlar', 'Tavsiyanoma', 'Kökrak nişoni']
/** B bezak: konfetti — [çap, tepa, burilish, rang] */
const CONFETTI: Array<[string, string, number, string]> = [
  ['36px', '40px', 24, 'var(--yellow)'],
  ['250px', '70px', -18, 'var(--lime)'],
  ['20px', '220px', 60, 'var(--sky)'],
  ['560px', '90px', 12, 'var(--green)'],
  ['600px', '330px', -36, 'var(--yellow)'],
  ['380px', '560px', 40, 'var(--lime)'],
  ['250px', '575px', -8, 'var(--sky)'],
  ['10px', '390px', 18, 'var(--green)'],
]
const Spark = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
  </svg>
)

/** “Ittifoq yoşlarga nima beradi”: çapda prototip kollaji, öngda faoliyat turiga qarab imkoniyatlar (BenefitsTabs). */
export async function Benefits({ locale }: { locale: Locale }) {
  const { benefits: B } = await getBosh(locale)
  return (
    <>
<section className="sec">
  <div className="wrap benefit">
    <div className="ui" aria-hidden="true">
      <div style={{ left: "421px", top: "116px", width: "175px", height: "412px", borderRadius: "136px", background: "var(--sky)" }}></div>
      {/* VAQTINÇA: orqa bezaklarning 2 varianti (DevSectionsPanel → bnf) */}
      <div className="vx" data-v="bnf-a">
        <div className="bnf-ring"></div>
        <Spark className="bnf-spark bnf-spark--1" />
        <Spark className="bnf-spark bnf-spark--2" />
        <Spark className="bnf-spark bnf-spark--3" />
      </div>
      <div className="vx" data-v="bnf-b">
        <div className="bnf-dots"></div>
        <div className="bnf-sun"></div>
        {CONFETTI.map(([l, t, r, c], k) => (
          <i key={k} className="bnf-conf" style={{ left: l, top: t, rotate: `${r}deg`, background: c }} />
        ))}
      </div>
      {/* odam: boşi yaşil kapsuladan çiqib turadi */}
      <div className="bnf-pill bnf-pill--low"></div>
      <div className="bnf-slot"><img className="bnf-cut" src="/img/odamlar/ittifoq-beradi.webp" width={713} height={1200} alt="" loading="lazy" decoding="async" /></div>
      <div style={{ left: "30px", top: "452px", width: "190px", height: "96px", borderRadius: "50px", background: "#fff", transform: "rotate(-10deg)", boxShadow: "0 10px 30px rgba(83,40,34,.1)", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>
        <i className="bar" style={{ height: "34px" }}></i><i className="bar" style={{ height: "46px" }}></i><i className="bar" style={{ height: "60px" }}></i><i className="bar" style={{ height: "46px" }}></i><i className="bar" style={{ height: "34px" }}></i>
      </div>
      <div style={{ left: "6px", top: "300px", width: "220px", height: "58px", borderRadius: "20px", background: "var(--blue)", transform: "rotate(6.7deg)", display: "grid", placeItems: "center", fontFamily: "var(--f-head)", fontWeight: "600", fontSize: "24px", color: "#fff" }}>#YoşlarBilan</div>
      <div style={{ left: "459px", top: "160px", width: "100px", height: "100px", borderRadius: "50%", border: "5px solid #fff", display: "grid", placeItems: "center" }}><span style={{ borderLeft: "26px solid #fff", borderTop: "16px solid transparent", borderBottom: "16px solid transparent", marginLeft: "8px" }}></span></div>
      <div style={{ left: "480px", top: "285px", width: "57px", height: "94px", borderRadius: "136px", background: "var(--blue)" }}></div>
      {/* Ittifoq logotipi — sayt qaysi tilda oçilsa, öşa tildagi logotip */}
      <div className="bnf-logo"><img {...ittifoqLogo(locale)} alt="" loading="lazy" decoding="async" /></div>
      <div className="vx" data-v="bnf-a">
        {CHIPS.map((t, k) => (
          <span key={t} className={`bnf-chip bnf-chip--${k + 1}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l2.4 2.1 3.2-.3.9 3.1 2.8 1.6-1.1 3 1.1 3-2.8 1.6-.9 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.9-3.1-2.8-1.6 1.1-3-1.1-3 2.8-1.6.9-3.1 3.2.3z" />
              <path d="M8.5 12.2l2.3 2.3 4.7-4.8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t}
          </span>
        ))}
      </div>
      <div className="vx" data-v="bnf-b">
        <svg className="bnf-seal" viewBox="0 0 160 160">
          <defs>
            <path id="bnfSeal" d="M80 80m-60 0a60 60 0 1 1 120 0a60 60 0 1 1-120 0" />
          </defs>
          <circle cx="80" cy="80" r="78" />
          <text>
            <textPath href="#bnfSeal">ITTIFOQ AʼZOSI · IMKONIYAT · IMTIYOZ ·</textPath>
          </text>
          <path className="bnf-seal-star" d="M80 58l6 16 17 1-13 11 4 17-14-9-14 9 4-17-13-11 17-1z" />
        </svg>
      </div>
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
