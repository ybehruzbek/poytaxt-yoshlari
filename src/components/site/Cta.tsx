import Link from 'next/link'

import type { Locale } from '@/i18n/config'

/** Murojaat bloki (CTA). ittifoq/index.html prototipidan avtomatik ko'chirilgan — dizaynni o'zgartirmang. */
export function Cta({ locale }: { locale: Locale }) {
  return (
    <>
<section className="sec" id="murojaat">
  <div className="wrap">
    <div className="cta">
      <div className="cta-art" aria-hidden="true">
        <div style={{ left: "165px", top: "266px", width: "332px", height: "160px", borderRadius: "0 0 166px 166px", background: "var(--blue)" }}></div>
        <svg style={{ left: "10px", top: "266px", width: "160px" }} viewBox="0 0 100 100"><path fill="#89C0FF" d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z" /></svg>
        <div style={{ left: "220px", top: "50px", width: "218px", height: "123px", background: "var(--green)", transform: "rotate(32.8deg)" }}></div>
        <div style={{ left: "400px", top: "177px", width: "72px", height: "72px", borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}><span style={{ borderLeft: "20px solid var(--blue)", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", marginLeft: "6px" }}></span></div>
        <div style={{ left: "30px", top: "130px", width: "84px", height: "123px", borderRadius: "42px", background: "var(--lime)", transform: "rotate(36.9deg)", display: "grid", placeItems: "center" }}><i style={{ width: "22px", height: "62px", borderRadius: "12px", background: "var(--navy)" }}></i></div>
        <div style={{ left: "156px", top: "140px", width: "108px", height: "108px", borderRadius: "50%", background: "var(--sky)" }}></div>
        <svg style={{ left: "113px", top: "105px", width: "34px", opacity: ".6" }} viewBox="0 0 40 40"><path fill="#89C0FF" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" /></svg>
        <svg style={{ left: "280px", top: "196px", width: "60px", transform: "rotate(-28deg)", opacity: ".5" }} viewBox="0 0 40 40"><path fill="#fff" d="M20 0l4 13 13-6-6 13 13 4-13 4 6 13-13-6-4 13-4-13-13 6 6-13-13-4 13-4-6-13 13 6z" /></svg>
      </div>
      <div className="cta-text">
        <div>
          <h2 className="h2">Tashabbusingiz bormi? <span>Biz yordam beramiz.</span></h2>
          <p>G‘oya, taklif yoki muammo bilan murojaat qiling — mutaxassislarimiz siz bilan bog‘lanadi.</p>
        </div>
        <Link href={`/${locale}/boglanish/murojaat`} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Murojaat yuborish
          <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
        </Link>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
