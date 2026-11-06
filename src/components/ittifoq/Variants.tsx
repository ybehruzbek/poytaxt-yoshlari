/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import { DAY_NOTE, GOALS, IMG, INTL, INTRO, MISSION, MORE_STATS, PRIVILEGES, PROJECTS, QUOTE, REGIONS, STATS, TIMELINE } from './data'

type P = { L: (h: string) => string; crumbs: React.ReactNode; siblings: React.ReactNode }

const TITLE = 'Özbekiston yoşlar ittifoqi'

function Cta({ L, dark }: { L: P['L']; dark?: boolean }) {
  return (
    <div className="it-cta-btns">
      <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
        Aʼzo böliş{' '}
        <span className="ic">
          <Arrow />
        </span>
      </Link>
      <Link href={L('/faoliyat/loyihalar')} className={`btn btn-ghost${dark ? '' : ' it-ghost'}`}>
        Loyihalarni köriş
      </Link>
    </div>
  )
}

/* ========================= A · HIKOYA ========================= */
export function VariantA({ L, crumbs, siblings }: P) {
  return (
    <div className="itv itv-a">
      <section className="page-hero ita-hero">
        <div className="wrap ita-hero-in">
          <div>
            {crumbs}
            <h1 className="h1">{TITLE}</h1>
            <p className="lead">{INTRO}</p>
            <Cta L={L} />
          </div>
          <div className="ita-art" aria-hidden="true">
            <div className="ita-ph ita-ph1">
              <img src={IMG.girls} alt="" />
            </div>
            <div className="ita-ph ita-ph2">
              <img src={IMG.volunteers} alt="" />
            </div>
            <div className="ita-day">
              <b>30</b>
              <span>iyun</span>
              <small>Yoşlar kuni</small>
            </div>
            <svg className="ita-star" viewBox="0 0 40 40">
              <path fill="#43A574" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <figure className="ita-wide">
            <img src={IMG.team} alt="Özbekiston yoşlar ittifoqi faollari Prezident bilan uçraşuvda" />
            <figcaption>{DAY_NOTE}</figcaption>
          </figure>
          <h2 className="h2 ita-mission">
            {MISSION.lead}
            <span className="mute">{MISSION.rest}</span>
          </h2>
          <div className="ita-stats">
            {STATS.map((s) => (
              <div key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec ita-goals-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Maqsad va vazifalar</h2>
          </div>
          <div className="ita-goals">
            {GOALS.map((g, i) => (
              <article key={g.t} style={{ '--c': g.c } as CSSProperties}>
                <span className="ita-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{g.t}</h3>
                <ul>
                  {g.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap ita-quote">
          <img src={IMG.readers} alt="" />
          <blockquote>
            <p>«{QUOTE.text}»</p>
            <footer>
              <b>{QUOTE.author}</b>
              <span>{QUOTE.role}</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Mukofot va imtiyozlar</h2>
          </div>
          <div className="ita-priv">
            {PRIVILEGES.map((p, i) => (
              <div key={p.t}>
                <span className="ita-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.text}</p>
                <b>{p.fact}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Loyihalar yönalişlari</h2>
          </div>
          <div className="ita-proj">
            {PROJECTS.map((d) => (
              <div key={d.t}>
                <b>{d.t}</b>
                <span>{d.p.join(' · ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="ita-intl">
            <div>
              <h2 className="h2">Xalqaro hamkorlik</h2>
              <p>{INTL.text}</p>
              <p>{INTL.assoc}</p>
            </div>
            <div className="ita-intl-n">
              {INTL.facts.map((f) => (
                <div key={f.l}>
                  <b>{f.v}</b>
                  <span>{f.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}

/* ========================= B · RAQAMLAR ========================= */
export function VariantB({ L, crumbs, siblings }: P) {
  const tiles = [...STATS.slice(0, 2), ...STATS.slice(2)]
  const colors = ['var(--yellow)', 'var(--green)', 'var(--sky)', 'var(--lime)']
  return (
    <div className="itv itv-b">
      <section className="page-hero itb-hero">
        <div className="wrap itb-hero-in">
          <div>
            {crumbs}
            <p className="itb-kick">2017-yildan beri · 30-iyun — Yoşlar kuni</p>
            <h1 className="h1">{TITLE}</h1>
            <p className="lead">{INTRO}</p>
            <Cta L={L} />
          </div>
          <div className="itb-bento">
            {tiles.map((s, i) => (
              <div key={s.l} className={`itb-t itb-t${i + 1}`} style={{ background: colors[i] }}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
            <div className="itb-t itb-photo">
              <img src={IMG.forum} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Ittifoq yöli</h2>
          </div>
          <ol className="itb-time">
            {TIMELINE.map((m) => (
              <li key={m.t}>
                <b>{m.y}</b>
                <span>{m.t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="itb-dark">
        <div className="wrap">
          <h2 className="h2">Maqsad va vazifalar</h2>
          <p className="itb-sub">{MISSION.lead}.</p>
          <div className="itb-goals">
            {GOALS.map((g, i) => (
              <article key={g.t}>
                <i style={{ background: g.c }}>{i + 1}</i>
                <div>
                  <h3>{g.t}</h3>
                  <p>{g.items.join('. ')}.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="itb-mosaic">
            <img src={IMG.girls} alt="" />
            <img src={IMG.seminar} alt="" />
            <img src={IMG.volunteers} alt="" />
            <img src={IMG.books} alt="" />
            <img src={IMG.leaders} alt="" />
          </div>
          <div className="itb-more">
            {MORE_STATS.map((s) => (
              <div key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">10 yönaliş — bitta maqsad</h2>
          </div>
          <div className="itb-proj">
            {PROJECTS.map((d, i) => (
              <div key={d.t} style={{ '--c': ['var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--sky)', 'var(--lime)'][i % 5] } as CSSProperties}>
                <h3>{d.t}</h3>
                <ul>
                  {d.p.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Yoşlarga imtiyozlar</h2>
          </div>
          <div className="itb-priv">
            {PRIVILEGES.map((p) => (
              <div key={p.t}>
                <b>{p.fact}</b>
                <h3>{p.t}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}

/* ========================= C · QÖLLANMA ========================= */
const TOC = [
  ['tarix', 'Taşkil topişi'],
  ['maqsad', 'Maqsad va vazifalar'],
  ['raqamlar', 'Raqamlarda'],
  ['imtiyozlar', 'Mukofot va imtiyozlar'],
  ['loyihalar', 'Loyihalar'],
  ['xalqaro', 'Xalqaro hamkorlik'],
  ['markazlar', 'Yoşlar markazlari'],
] as const

export function VariantC({ L, crumbs, siblings }: P) {
  return (
    <div className="itv itv-c">
      <section className="itc-hero">
        <img src={IMG.team} alt="" />
        <div className="wrap">
          {crumbs}
          <h1 className="h1">{TITLE}</h1>
          <p className="lead">Yoşlarni birlaştiruvçi, ularning ovozi va taşabbuslarini qöllab-quvvatlovçi respublika taşkiloti.</p>
          <Cta L={L} dark />
        </div>
      </section>

      <div className="wrap itc-body">
        <nav className="itc-toc" aria-label="Sahifa mundarijasi">
          <b>Mundarija</b>
          {TOC.map(([id, t]) => (
            <a key={id} href={`#${id}`}>
              {t}
            </a>
          ))}
        </nav>

        <div className="itc-main">
          <section id="tarix">
            <h2 className="h2">Taşkil topişi</h2>
            <p className="itc-big">{INTRO}</p>
            <div className="itc-note">
              <b>30-iyun</b> {DAY_NOTE}
            </div>
            <img className="itc-img" src={IMG.hq} alt="Özbekiston yoşlar ittifoqi Markaziy Kengaşi binosi oldida" />
          </section>

          <section id="maqsad">
            <h2 className="h2">Maqsad va vazifalar</h2>
            <p>
              <b>{MISSION.lead}</b>
              {MISSION.rest}
            </p>
            <div className="itc-goals">
              {GOALS.map((g) => (
                <details key={g.t} style={{ '--c': g.c } as CSSProperties}>
                  <summary>{g.t}</summary>
                  <ul>
                    {g.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          <section id="raqamlar">
            <h2 className="h2">Raqamlarda</h2>
            <dl className="itc-nums">
              {[...STATS, ...MORE_STATS].map((s) => (
                <div key={s.l}>
                  <dt>{s.v}</dt>
                  <dd>{s.l}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="imtiyozlar">
            <h2 className="h2">Mukofot va imtiyozlar</h2>
            {PRIVILEGES.map((p) => (
              <div className="itc-priv" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.text}</p>
                <span>{p.fact}</span>
              </div>
            ))}
          </section>

          <section id="loyihalar">
            <h2 className="h2">Loyihalar</h2>
            <div className="itc-proj">
              {PROJECTS.map((d) => (
                <div key={d.t}>
                  <b>{d.t}</b>
                  {d.p.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section id="xalqaro">
            <h2 className="h2">Xalqaro hamkorlik</h2>
            <p>{INTL.text}</p>
            <p>{INTL.assoc}</p>
            <dl className="itc-nums itc-nums3">
              {INTL.facts.map((s) => (
                <div key={s.l}>
                  <dt>{s.v}</dt>
                  <dd>{s.l}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="markazlar">
            <h2 className="h2">Yoşlar markazlari</h2>
            <p>14 ta hududda Yoşlar markazi doimiy faoliyat yuritadi. Poytaxtda Özbekiston yoşlar ittifoqi Yoşlar ijod saroyi ham yoşlar uçun oçiq.</p>
            <div className="itc-regions">
              {REGIONS.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
            <div className="itc-pair">
              <img src={IMG.palace} alt="Yoşlar ijod saroyi" />
              <img src={IMG.mural} alt="" />
            </div>
          </section>

          {siblings}
        </div>
      </div>
    </div>
  )
}
