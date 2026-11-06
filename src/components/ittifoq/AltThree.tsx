/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import { Arrow } from '@/components/site/SocialPhones'

import { ACTS, IMG, JOIN, OFFICIAL, ORGS, STRUCTURE } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')
const host = (href: string) => new URL(href).hostname.replace(/^www\./, '')
const year = (d: string) => d.slice(-4)
const ACCENTS = ['var(--yellow)', 'var(--green)', 'var(--sky)', 'var(--lime)', 'var(--blue)']

type LP = { L: (h: string) => string }

function JoinButton({ L }: LP) {
  return (
    <Link href={L('/boglanish/murojaat?mavzu=azo')} className="btn btn-primary">
      Aʼzo böliş{' '}
      <span className="ic">
        <Arrow />
      </span>
    </Link>
  )
}

/* ================= 1. Taşkilotlar ================= */

/** B — chap tomonda yopişqoq sarlavha, öngda raqamli indeks röyxati; pastda sariq lenta */
export function OrgsB() {
  return (
    <section className="sec x3-orgsb">
      <div className="wrap">
        <div className="x3-orgsb-grid">
          <div className="x3-orgsb-side">
            <h2 className="h2">Ittifoq taʼsisçiligidagi taşkilotlar</h2>
            <p>{ORGS.lead}</p>
          </div>
          <ol className="x3-orgsb-list">
            {ORGS.ngos.map((o, i) => (
              <li key={o.t}>
                <span>{pad(i)}</span>
                <div>
                  <h3>{o.t}</h3>
                  <p>{o.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="x3-orgsb-band">
          <h3>Media, naşriyot va xizmat taşkilotlari</h3>
          <ul>
            {ORGS.companies.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** C — surat ustida lid, rangli belgili ustunlar va töq kartadagi kompaniyalar */
export function OrgsC() {
  return (
    <section className="sec x3-orgsc">
      <div className="wrap">
        <div className="x3-orgsc-top">
          <img src={IMG.volunteers} alt="Volontyorlar" />
          <div>
            <h2 className="h2">Ittifoq taʼsisçiligidagi taşkilotlar</h2>
            <p>{ORGS.lead}</p>
          </div>
        </div>
        <div className="x3-orgsc-cols">
          {ORGS.ngos.map((o, i) => (
            <article key={o.t} style={{ borderColor: ACCENTS[i % ACCENTS.length] }}>
              <h3>{o.t}</h3>
              <p>{o.d}</p>
            </article>
          ))}
        </div>
        <div className="x3-orgsc-comp">
          <h3>Media, naşriyot va xizmat taşkilotlari</h3>
          <ol>
            {ORGS.companies.map((c, i) => (
              <li key={c}>
                <span>{pad(i)}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ================= 2. Tuzilma ================= */

/** B — iyerarxiya: Qurultoydan boşlanğiç taşkilotgaça poğonali sxema */
export function StructureB() {
  const [top, council, ...rest] = STRUCTURE.organs
  return (
    <section className="sec x3-strb">
      <div className="wrap">
        <div className="x3-strb-head">
          <h2 className="h2">Qanday tuzilganmiz</h2>
          <p>{STRUCTURE.lead}</p>
        </div>
        <div className="x3-strb-tree">
          <article className="x3-strb-top">
            <span className="it-num">01</span>
            <h3>{top.t}</h3>
            <p>{top.d}</p>
          </article>
          <article className="x3-strb-council">
            <span className="it-num">02</span>
            <h3>{council.t}</h3>
            <p>{council.d}</p>
          </article>
          <div className="x3-strb-row">
            {rest.map((o, i) => (
              <article key={o.t}>
                <span className="it-num">{pad(i + 2)}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </article>
            ))}
          </div>
        </div>
        <ul className="x3-strb-princ">
          {STRUCTURE.principles.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** C — chapda surat va tamoyillar, öngda katta raqamli tahririy jadval */
export function StructureC() {
  return (
    <section className="sec x3-strc">
      <div className="wrap x3-strc-grid">
        <aside className="x3-strc-side">
          <h2 className="h2">Qanday tuzilganmiz</h2>
          <p>{STRUCTURE.lead}</p>
          <img src={IMG.leaders} alt="Yoşlar yetakçilari forumi iştirokçilari" />
          <ol>
            {STRUCTURE.principles.map((x, i) => (
              <li key={x}>
                <span>{pad(i)}</span>
                {x}
              </li>
            ))}
          </ol>
        </aside>
        <ol className="x3-strc-list">
          {STRUCTURE.organs.map((o, i) => (
            <li key={o.t}>
              <span>{pad(i)}</span>
              <div>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================= 3. Aʼzolik ================= */

/** B — töq fon: chapda çaqiriq va tugma, öngda vertikal qadamlar; pastda ikki karta */
export function JoinB({ L }: LP) {
  return (
    <section className="sec x3-joinb">
      <div className="wrap">
        <div className="x3-joinb-grid">
          <div className="x3-joinb-side">
            <h2 className="h2">Qanday aʼzo böliş mumkin</h2>
            <h3>{JOIN.cta.t}</h3>
            <p>{JOIN.cta.d}</p>
            <JoinButton L={L} />
          </div>
          <ol className="x3-joinb-steps">
            {JOIN.steps.map((st, i) => (
              <li key={st.t}>
                <i>{i + 1}</i>
                <div>
                  <h3>{st.t}</h3>
                  <p>{st.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="x3-joinb-cards">
          <div className="x3-joinb-rights">
            <h3>Aʼzo sifatida siz</h3>
            <ul>
              {JOIN.rights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="x3-joinb-perks">
            <h3>Qöşimça imkoniyatlar</h3>
            <ul>
              {JOIN.perks.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/** C — suratli boşlama, gorizontal qadamlar yöli va sariq çaqiriq kartasi */
export function JoinC({ L }: LP) {
  return (
    <section className="sec x3-joinc">
      <div className="wrap">
        <div className="x3-joinc-top">
          <div className="x3-joinc-pic">
            <img src={IMG.girls} alt="Kitob olami festivalida milliy liboslardagi qizlar" />
            <img src="/img/ittifoq/belgi.png" alt="" className="x3-joinc-badge" />
          </div>
          <div>
            <h2 className="h2">Qanday aʼzo böliş mumkin</h2>
            <ul className="x3-joinc-rights">
              {JOIN.rights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <ol className="x3-joinc-steps">
          {JOIN.steps.map((st, i) => (
            <li key={st.t}>
              <b>{pad(i)}</b>
              <h3>{st.t}</h3>
              <p>{st.d}</p>
            </li>
          ))}
        </ol>
        <div className="x3-joinc-bottom">
          {JOIN.perks.map((x) => (
            <p key={x} className="x3-joinc-perk">
              {x}
            </p>
          ))}
          <div className="x3-joinc-cta">
            <h3>{JOIN.cta.t}</h3>
            <p>{JOIN.cta.d}</p>
            <JoinButton L={L} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= 4. Hujjatlar ================= */

const NOTE = 'Ittifoq faoliyati, şuningdek, Özbekiston Respublikasi Konstitutsiyasi, nodavlat notijorat taşkilotlari töğrisidagi qonunlar va Ittifoq Ustaviga asoslanadi.'

/** B — yil katta raqam bilan berilgan hujjat kartalari töri */
export function ActsB() {
  return (
    <section className="sec x3-actsb">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Normativ-huquqiy hujjatlar</h2>
        </div>
        <ol className="x3-actsb-grid">
          {ACTS.map((x) => (
            <li key={x.t}>
              <div className="x3-actsb-y">
                <b>{year(x.y)}</b>
                <time>{x.y}</time>
              </div>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
              {x.href && (
                <a href={x.href} target="_blank" rel="noopener noreferrer">
                  {host(x.href)} <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ol>
        <p className="x3-actsb-note">{NOTE}</p>
      </div>
    </section>
  )
}

/** C — markaziy çiziqli vertikal xronologiya, hujjatlar galma-galdan */
export function ActsC() {
  return (
    <section className="sec x3-actsc">
      <div className="wrap">
        <h2 className="h2 x3-actsc-h">Normativ-huquqiy hujjatlar</h2>
        <ol className="x3-actsc-line">
          {ACTS.map((x) => (
            <li key={x.t}>
              <time>{x.y}</time>
              <div className="x3-actsc-card">
                <h3>
                  {x.href ? (
                    <a href={x.href} target="_blank" rel="noopener noreferrer">
                      {x.t} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    x.t
                  )}
                </h3>
                <p>{x.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="x3-actsc-note">{NOTE}</p>
      </div>
    </section>
  )
}

/* ================= 5. Rasmiy maʼlumotlar ================= */

/** B — töq «pasport» kartasi: nişon va maʼlumot plitalari */
export function OfficialB() {
  return (
    <section className="sec x3-offb">
      <div className="wrap">
        <div className="x3-offb-card">
          <div className="x3-offb-head">
            <img src="/img/ittifoq/belgi.png" alt="Özbekiston yoşlar ittifoqi nişoni" />
            <h2 className="h2">Rasmiy maʼlumotlar</h2>
          </div>
          <dl>
            {OFFICIAL.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/** C — yirik şriftdagi qiymatlar, kiçik yorliqlar va sariq çiziqlar */
export function OfficialC() {
  return (
    <section className="sec x3-offc">
      <div className="wrap">
        <h2 className="h2">Rasmiy maʼlumotlar</h2>
        <dl>
          {OFFICIAL.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
