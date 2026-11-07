/* eslint-disable @next/next/no-img-element -- taqdimot suratlari; CMS ulanganda next/image ga o'tadi */
import { ABOUT, IMG, MEMBERS, ORGANS, POWERS, STATS } from './data'

type P = { L: (h: string) => string }

const pad = (i: number) => String(i + 1).padStart(2, '0')
const BINO_ALT = 'Özbekiston yoşlar ittifoqi Markaziy Kengaşi binosi'

/* ================= Kengaş haqida ================= */

/** B — chapda bino surati, öngda matn; pastda rangli raqam plitkalari */
export function AboutB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y1-ab">
          <img className="y1-ab-img" src={IMG.building} alt={BINO_ALT} />
          <div className="y1-ab-txt">
            <h2 className="h2">Kengaş haqida</h2>
            <p className="y1-ab-lead">{ABOUT.lead}</p>
            {ABOUT.paras.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
        <div className="y1-ab-stats">
          {STATS.map((s) => (
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

/** C — töq karta: katta bayonot, ikki ustun matn, sariq raqamlar qatori */
export function AboutC(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y1-ac">
          <img className="y1-ac-mark" src="/img/ittifoq/belgi.png" alt="" />
          <h2 className="h2">Kengaş haqida</h2>
          <p className="y1-ac-lead">{ABOUT.lead}</p>
          <div className="y1-ac-cols">
            {ABOUT.paras.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="y1-ac-stats">
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

/* ================= Boşqaruv tizimi ================= */

const KENGASH = 1

/** B — Markaziy Kengaş katta töq kartada, qolgan organlar öngda ixçam qatorlar */
export function OrgansB(_: P) {
  const main = ORGANS[KENGASH]
  return (
    <section className="sec y1-ob-sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Ittifoqning boşqaruv tizimi</h2>
        </div>
        <div className="y1-ob">
          <article className="y1-ob-main">
            <img src="/img/ittifoq/belgi.png" alt="" />
            <span className="y1-ob-num">{pad(KENGASH)}</span>
            <h3>{main.t}</h3>
            <p>{main.d}</p>
            {main.meta && <b>{main.meta}</b>}
          </article>
          <ol className="y1-ob-list">
            {ORGANS.map((o, i) =>
              i === KENGASH ? null : (
                <li key={o.t}>
                  <span className="y1-ob-num">{pad(i)}</span>
                  <div>
                    <h3>{o.t}</h3>
                    <p>{o.d}</p>
                    {o.meta && <b>{o.meta}</b>}
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
      </div>
    </section>
  )
}

/** C — jadval qatorlari; Markaziy Kengaş qatori sariq va kattalaştirilgan */
export function OrgansC(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Ittifoqning boşqaruv tizimi</h2>
        </div>
        <ol className="y1-oc">
          {ORGANS.map((o, i) => (
            <li key={o.t} className={i === KENGASH ? 'on' : undefined}>
              <span className="y1-oc-num">{pad(i)}</span>
              <h3>{o.t}</h3>
              <p>{o.d}</p>
              {o.meta && <b>{o.meta}</b>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================= Vakolatlari ================= */

/** B — 5×2 kartalar dastasi, katta raqamlar bilan */
export function PowersB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Vakolatlari</h2>
        </div>
        <ol className="y1-pb">
          {POWERS.map((x, i) => (
            <li key={x}>
              <span>{pad(i)}</span>
              <p>{x}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** C — chapda yopişqoq sarlavha va surat, öngda katta harfli röyxat */
export function PowersC(_: P) {
  return (
    <section className="sec y1-pc-sec">
      <div className="wrap">
        <div className="y1-pc">
          <aside className="y1-pc-side">
            <h2 className="h2">Vakolatlari</h2>
            <strong>{POWERS.length}</strong>
            <img src="/img/ittifoq/seminar.jpg" alt="" />
          </aside>
          <ol className="y1-pc-list">
            {POWERS.map((x, i) => (
              <li key={x}>
                <span>{pad(i)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ================= Kengaş tarkibi ================= */

const TAG = ['y', 'p', 's', 'g', 'c'] as const

/** B — töq kartada lavozim böyiça aʼzolar, öngda rangli soha teglari, pastda belgi bilan izoh */
export function MembersB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y1-mb-head">
          <h2 className="h2">Kengaş tarkibi</h2>
          <p>{MEMBERS.lead}</p>
        </div>
        <div className="y1-mb">
          <div className="y1-mb-post">
            <h3>Lavozimi böyiça kiradi</h3>
            <ol>
              {MEMBERS.byPost.map((x, i) => (
                <li key={x}>
                  <span>{pad(i)}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
          <div className="y1-mb-fields">
            <h3>Soha vakillari</h3>
            <div className="y1-mb-tags">
              {MEMBERS.fields.map((x, i) => (
                <span key={x} className={`y1-t${TAG[i % TAG.length]}`}>
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="y1-mb-link">
          <img src="/img/ittifoq/belgi.png" alt="" />
          <p>{MEMBERS.link}</p>
        </div>
      </div>
    </section>
  )
}

/** C — chapda surat ustida izoh, öngda lavozimlar qatorlari va soha röyxati */
export function MembersC(_: P) {
  return (
    <section className="sec y1-mc-sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Kengaş tarkibi</h2>
        </div>
        <div className="y1-mc">
          <figure className="y1-mc-pic">
            <img src="/img/ittifoq/yetakchilar.jpg" alt="" />
            <figcaption>{MEMBERS.link}</figcaption>
          </figure>
          <div className="y1-mc-body">
            <p className="y1-mc-lead">{MEMBERS.lead}</p>
            <h3>Lavozimi böyiça kiradi</h3>
            <ol className="y1-mc-post">
              {MEMBERS.byPost.map((x, i) => (
                <li key={x}>
                  <span>{pad(i)}</span>
                  <p>{x}</p>
                </li>
              ))}
            </ol>
            <h3>Soha vakillari</h3>
            <ul className="y1-mc-fields">
              {MEMBERS.fields.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
