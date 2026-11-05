/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { OPPS, OPP_TYPES, type OppType, deadlineLabel } from '@/lib/opps'

const ICON: Record<OppType, React.ReactNode> = {
  grant: <path d="M12 2v20M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.6 7 6.5s2.2 2.8 5 3.5 5 1.6 5 3.5-2.2 3-5 3-5-1.1-5-3" />,
  stip: <path d="M2 9l10-5 10 5-10 5L2 9zm4 2.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8M22 9v6" />,
  vol: <path d="M12 21s-7.5-4.6-9.3-9.2C1.4 8.3 3.6 5 7 5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.6 3.3 4.3 6.8C19.5 16.4 12 21 12 21z" />,
  tanlov: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />,
}

/**
 * Kartaning qo'shimcha qatlamlari (qaysi biri ko'rinishi variantga bog'liq):
 *  .opp-rail  — toraygan kartadagi vertikal nom, ikonka va son (B)
 *  .opp-shade — rasm butun kartaga yoyilganda matn o'qilishi uchun soya (C)
 *  .opp-info  — kengaygan kartadagi tavsif, dasturlar ro'yxati, muddat va "Batafsil"
 */
function OppInfo({ t }: { t: OppType }) {
  const type = OPP_TYPES.find((x) => x.key === t)!
  const list = OPPS.filter((o) => o.type === t)
  const next = list.map((o) => o.deadline).filter(Boolean).sort()[0] ?? null
  const icon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON[t]}
    </svg>
  )
  return (
    <>
      <span className="opp-rail" aria-hidden="true">
        <i>{icon}</i>
        <b>{type.label}</b>
        <small>{list.length} ta</small>
      </span>
      <span className="opp-shade" aria-hidden="true" />
      <div className="opp-info">
        <p>{type.desc}</p>
        <ul className="opp-progs">
          {list.slice(0, 3).map((o) => (
            <li key={o.title}>
              <span>{o.title}</span>
              <em>{deadlineLabel(o.deadline)}</em>
            </li>
          ))}
        </ul>
        <div className="opp-meta">
          <span><b>{list.length}</b> ta faol dastur</span>
          <span>{next ? <>Eng yaqin muddat: <b>{deadlineLabel(next)}</b></> : <b>Doimiy qabul</b>}</span>
        </div>
        <span className="opp-more">
          Batafsil
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </>
  )
}

/**
 * Siz uchun imkoniyatlar.
 * Rangli kartalar: sichqoncha (yoki klaviatura fokusi) kelgan karta kengayadi, qolganlari torayadi;
 * kengaygan kartada qisqa tavsif, faol dasturlar soni va eng yaqin muddat chiqadi.
 */
export function Opportunities({ locale }: { locale: Locale }) {
  return (
    <>
<section className="sec" id="imkoniyatlar">
  <div className="wrap">
    <h2 className="h2 opps-title">Siz uchun <span>imkoniyatlar</span></h2>
    <div className="opps">
      <Link href={`/${locale}/faoliyat/loyihalar`} className="opp big o1">
        <div className="title"><b>Grantlar</b><span>Tashabbusingizni moliyalashtiring</span></div>
        <svg className="deco" style={{ left: "20px", top: "320px", width: "72px", transform: "rotate(-28deg)" }} viewBox="0 0 40 40"><path fill="#532822" d="M20 0l4 13 13-6-6 13 13 4-13 4 6 13-13-6-4 13-4-13-13 6 6-13-13-4 13-4-6-13 13 6z" /></svg>
        <svg className="deco" style={{ left: "100px", top: "300px", width: "160px" }} viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="#89C0FF" strokeWidth="22" /></svg>
        <svg className="deco" style={{ left: "36px", top: "420px", width: "90px" }} viewBox="0 0 100 100"><path fill="#FF939A" d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z" /></svg>
        <div className="ph"><img className="cover" src="/img/opp-grant.jpg" alt="Grant tanlovi ishtirokchilari" /></div>
      <OppInfo t="grant" />
      </Link>
      <Link href={`/${locale}/faoliyat/loyihalar`} className="opp o2">
        <p className="name">Stipendiyalar</p>
        <svg className="deco" style={{ left: "-10px", top: "120px", width: "120px", opacity: ".25" }} viewBox="0 0 100 100"><path fill="#89C0FF" d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z" /></svg>
        <svg className="deco" style={{ right: "30px", top: "150px", width: "30px", opacity: ".5" }} viewBox="0 0 40 40"><path fill="#FF854B" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" /></svg>
        <div className="ph"><img className="cover" src="/img/opp-stip.jpg" alt="Stipendiya sohiblari" /></div>
      <OppInfo t="stip" />
      </Link>
      <Link href={`/${locale}/faoliyat/loyihalar`} className="opp o3">
        <p className="name">Volontyorlik</p>
        <div className="deco leaf" style={{ left: "110px", top: "40px", width: "110px", height: "110px", transform: "rotate(-32deg)" }}></div>
        <div className="deco leaf" style={{ left: "18px", top: "270px", width: "36px", height: "36px", transform: "rotate(28deg)" }}></div>
        <div className="ph"><img className="cover" src="/img/opp-vol.jpg" alt="Volontyorlar" /></div>
      <OppInfo t="vol" />
      </Link>
      <Link href={`/${locale}/faoliyat/loyihalar`} className="opp o4">
        <p className="name">Tanlovlar</p>
        <div className="deco" style={{ left: "25px", top: "180px", width: "55px", height: "134px", borderRadius: "28px", background: "rgba(255,255,255,.45)" }}></div>
        <div className="deco" style={{ left: "95px", top: "130px", width: "55px", height: "134px", borderRadius: "28px", background: "rgba(255,255,255,.45)" }}></div>
        <div className="deco" style={{ left: "165px", top: "100px", width: "55px", height: "134px", borderRadius: "28px", background: "rgba(255,255,255,.45)" }}></div>
        <div className="ph"><img className="cover" src="/img/news-1.jpg" alt="Tanlov ishtirokchilari" /></div>
      <OppInfo t="tanlov" />
      </Link>
    </div>
  </div>
</section>
    </>
  )
}
