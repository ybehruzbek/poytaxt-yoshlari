import Link from 'next/link'

import type { Locale } from '@/i18n/config'

/**
 * "Tashabbusingiz bormi?" bloki.
 * VAQTINCHA 3 ta ko'rinish (<html data-cta="a|b|c">): A — illyustratsiya + matn, B — tezkor shakl, C — uch yo'l.
 */
export function Cta({ locale }: { locale: Locale }) {
  return (
    <>
<section className="sec" id="murojaat">
  <div className="wrap">
    {/* ===== A · Hozirgi: illyustratsiya + matn ===== */}
    <div className="ctv ctv-a cta">
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

    {/* ===== B · Tezkor shakl: matn, 3 qadam va qisqa murojaat shakli ===== */}
    <div className="ctv ctv-b cb">
      <div className="cb-txt">
        <h2 className="h2">Tashabbusingiz bormi? <span>Biz yordam beramiz.</span></h2>
        <p>G‘oya, taklif yoki muammo bilan murojaat qiling — mutaxassislarimiz siz bilan bog‘lanadi.</p>
        <ol className="cb-steps">
          <li><b>1</b><span><strong>Yozing</strong>Tashabbusingizni qisqacha bayon qiling</span></li>
          <li><b>2</b><span><strong>Ko‘rib chiqamiz</strong>Mas’ul xodim murojaatni o‘rganadi</span></li>
          <li><b>3</b><span><strong>Bog‘lanamiz</strong>Siz bilan aloqaga chiqib, yo‘l ko‘rsatamiz</span></li>
        </ol>
      </div>
      {/* Hozircha murojaat sahifasiga ma'lumotni olib o'tadi; server ulanganda bevosita yuboriladi */}
      <form className="cb-form" action={`/${locale}/boglanish/murojaat`} method="get">
        <p className="cb-form-title">Tezkor murojaat</p>
        <label className="cb-field">
          <span>Ismingiz</span>
          <input name="ism" autoComplete="name" required placeholder="Ism-familiya" />
        </label>
        <label className="cb-field">
          <span>Telefon</span>
          <input name="tel" type="tel" autoComplete="tel" required placeholder="+998" />
        </label>
        <label className="cb-field">
          <span>Tashabbusingiz</span>
          <textarea name="xabar" rows={3} required placeholder="G‘oyangizni qisqacha yozing" />
        </label>
        <input type="hidden" name="mavzu" value="tashabbus" />
        <button type="submit" className="btn btn-primary">Yuborish
          <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
        </button>
      </form>
    </div>

    {/* ===== C · Uch yo'l: tashabbus, savol, a'zolik ===== */}
    <div className="ctv ctv-c cc">
      <div className="cc-head">
        <h2 className="h2">Tashabbusingiz bormi? <span>Biz yordam beramiz.</span></h2>
        <p>O‘zingizga mos yo‘lni tanlang — qolganini birga hal qilamiz.</p>
      </div>
      <div className="cc-grid">
        {[
          { m: 'tashabbus', t: 'Tashabbus taklif qilish', d: 'Loyiha yoki g‘oyangizni yuboring — amalga oshirishda ko‘maklashamiz.', c: 'var(--yellow)', dark: true,
            i: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /> },
          { m: 'savol', t: 'Savol berish', d: 'Grant, tanlov, volontyorlik yoki boshqa masala bo‘yicha savolingizni yozing.', c: 'var(--sky)', dark: true,
            i: <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01" /> },
          { m: 'azo', t: 'A‘zo bo‘lish', d: 'Yoshlar Ittifoqi safiga qo‘shiling va boshlang‘ich tashkilot faoliyatida qatnashing.', c: 'var(--green)',
            i: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6" /> },
        ].map((x) => (
          <Link key={x.m} href={`/${locale}/boglanish/murojaat?mavzu=${x.m}`} className="cc-card">
            <span className="cc-ic" style={{ background: x.c, color: x.dark ? 'var(--navy)' : '#fff' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{x.i}</svg>
            </span>
            <b>{x.t}</b>
            <span className="cc-d">{x.d}</span>
            <span className="cc-go">Boshlash
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
    </>
  )
}
