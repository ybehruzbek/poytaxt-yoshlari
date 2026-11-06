/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar */
import { HISTORY, IMG, MISSION, MORE_STATS, STATS, WHO } from './data'

const STAT_TONES = ['var(--yellow)', 'var(--green)', 'var(--sky)', 'var(--lime)']

/* ===================== 1. Biz kimmiz ===================== */

/** B — toʼq blok: ulkan şior, ikki ustunli matn, sariq raqamlar tasmasi */
export function WhoB() {
  return (
    <section className="sec x1-who-b">
      <div className="wrap">
        <div className="x1-who-b-card">
          <h2 className="x1-who-b-kick">Biz kimmiz</h2>
          <p className="x1-who-b-motto">«{WHO.motto}»</p>
          <div className="x1-who-b-txt">
            {WHO.paras.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="x1-who-b-stats">
            {STATS.map((s) => (
              <div key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** C — çapda matn va nişon, öngda raqamlar röyxati (katta son + izoh qatorlari) */
export function WhoC() {
  return (
    <section className="sec x1-who-c">
      <div className="wrap">
        <div className="x1-who-c-grid">
          <div className="x1-who-c-main">
            <div className="x1-who-c-head">
              <h2 className="h2">Biz kimmiz</h2>
              <img src="/img/ittifoq/belgi.png" alt="" className="x1-who-c-badge" />
            </div>
            <p className="x1-who-c-lead">{WHO.paras[0]}</p>
            {WHO.paras.slice(1).map((t) => (
              <p key={t} className="x1-who-c-p">
                {t}
              </p>
            ))}
            <p className="x1-who-c-motto">«{WHO.motto}»</p>
          </div>
          <ul className="x1-who-c-stats">
            {STATS.map((s, i) => (
              <li key={s.l}>
                <i style={{ background: STAT_TONES[i % STAT_TONES.length] }} aria-hidden="true" />
                <b>{s.v}</b>
                <span>{s.l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ===================== 2. Suratlar mozaikasi ===================== */

const PHOTOS = [
  { src: IMG.girls, alt: 'Kitob olami festivalida milliy liboslardagi qizlar' },
  { src: IMG.seminar, alt: 'Boşlanğiç taşkilot yetakçilari seminari' },
  { src: IMG.volunteers, alt: 'Volontyorlar' },
  { src: IMG.books, alt: 'Yoşlar ijod saroyida kitobxonlar' },
  { src: IMG.leaders, alt: 'Yoşlar yetakçilari forumi iştirokçilari' },
]

/** B — pillapoya suratlar lentasi (turli balandlik), ostida toʼq raqamlar paneli */
export function MosaicB() {
  return (
    <section className="sec x1-mos-b">
      <div className="wrap">
        <div className="x1-mos-b-strip">
          {PHOTOS.map((p) => (
            <img key={p.src} src={p.src} alt={p.alt} />
          ))}
        </div>
        <div className="x1-mos-b-panel">
          {MORE_STATS.map((s) => (
            <div key={s.l}>
              <b>{s.v}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** C — 3×3 bento: suratlar va rangli raqam kartalari şaxmat tartibida */
export function MosaicC() {
  const [a, b, c, d, e] = PHOTOS
  const [s1, s2, s3, s4] = MORE_STATS
  const cells = [
    { k: 'p', v: a, cls: 'x1-mos-c-tall' },
    { k: 's', v: s1, tone: 'yellow' },
    { k: 'p', v: b },
    { k: 'p', v: c },
    { k: 's', v: s2, tone: 'green' },
    { k: 's', v: s3, tone: 'sky' },
    { k: 'p', v: d },
    { k: 's', v: s4, tone: 'lime' },
    { k: 'p', v: e, cls: 'x1-mos-c-wide' },
  ] as const
  return (
    <section className="sec x1-mos-c">
      <div className="wrap">
        <div className="x1-mos-c-grid">
          {cells.map((cell, i) =>
            cell.k === 'p' ? (
              <img
                key={i}
                src={cell.v.src}
                alt={cell.v.alt}
                className={'cls' in cell ? cell.cls : undefined}
              />
            ) : (
              <div key={i} className={`x1-mos-c-stat x1-tone-${cell.tone}`}>
                <b>{cell.v.v}</b>
                <span>{cell.v.l}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

/* ===================== 3. Qisqa tarix ===================== */

/** B — vertikal vaqt çizigi: çapda katta sanalar, öngda matn, oxirgisi sariq karta */
export function HistoryB() {
  return (
    <section className="sec x1-his-b">
      <div className="wrap">
        <div className="x1-his-b-grid">
          <div className="x1-his-b-side">
            <h2 className="h2">Qisqa tarix</h2>
            <p className="x1-his-b-range">
              {HISTORY[0].y} — {HISTORY[HISTORY.length - 1].y}
            </p>
          </div>
          <ol className="x1-his-b-list">
            {HISTORY.map((m) => (
              <li key={m.y}>
                <b>{m.y}</b>
                <p>{m.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/** C — toʼq fondagi gorizontal yöl: nuqtali çiziq, rangli sana pillalari */
export function HistoryC() {
  return (
    <section className="sec x1-his-c">
      <div className="wrap">
        <div className="x1-his-c-card">
          <h2 className="h2 x1-his-c-title">Qisqa tarix</h2>
          <ol className="x1-his-c-track">
            {HISTORY.map((m, i) => (
              <li key={m.y}>
                <span className="x1-his-c-dot" aria-hidden="true" />
                <b style={{ background: STAT_TONES[i % STAT_TONES.length] }}>{m.y}</b>
                <p>{m.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ===================== 4. Maqsadimiz ===================== */

/** B — sariq katta blok: maqsad sarlavhasi, nişon, oq kartada Ustav iqtibosi */
export function MissionB() {
  return (
    <section className="sec x1-mis-b">
      <div className="wrap">
        <div className="x1-mis-b-card">
          <img src="/img/ittifoq/belgi.png" alt="" className="x1-mis-b-badge" />
          <p className="x1-mis-b-kick">Maqsadimiz</p>
          <h2 className="x1-mis-b-lead">{MISSION.lead}</h2>
          <p className="x1-mis-b-rest">{MISSION.rest.trim()}</p>
          <blockquote className="x1-mis-b-charter">{MISSION.charter}</blockquote>
        </div>
      </div>
    </section>
  )
}

/** C — markazlaşgan tahririyat sahifasi: ulkan sarlavha, puşti urğu, ikki ustunli Ustav matni */
export function MissionC() {
  return (
    <section className="sec x1-mis-c">
      <div className="wrap">
        <div className="x1-mis-c-inner">
          <p className="x1-mis-c-kick">
            <span aria-hidden="true" />
            Maqsadimiz
            <span aria-hidden="true" />
          </p>
          <h2 className="x1-mis-c-lead">{MISSION.lead}</h2>
          <p className="x1-mis-c-rest">
            <mark>{MISSION.rest.trim()}</mark>
          </p>
          <div className="x1-mis-c-rule" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="x1-mis-c-charter">{MISSION.charter}</p>
        </div>
      </div>
    </section>
  )
}
