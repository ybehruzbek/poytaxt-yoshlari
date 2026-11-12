/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan surat; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import { Arrow } from '@/components/site/SocialPhones'

import { BodiesTabs } from './BodiesTabs'
import { BODIES, CONTACT, IMG, LEADERS, type Leader } from './data'

type P = { L: (h: string) => string }

const pad = (i: number) => String(i + 1).padStart(2, '0')
const initials = (s: string) =>
  s
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

const DEC_TEXT =
  'Markaziy Kengaş yiğilişlari, qabul qilingan qarorlar va hisobotlar şu yerda eʼlon qilinadi.'
const BUILDING_ALT = 'Özbekiston yoşlar ittifoqi Markaziy Kengaşi binosi'

function Ava({ p, className }: { p: Leader; className: string }) {
  return (
    <div className={className}>
      {p.img ? <img src={p.img} alt={p.name} /> : <span>{initials(p.role)}</span>}
    </div>
  )
}

/* ---------- Rahbariyat ---------- */

/** B: rais katta kartada, örinbosarlar yonida gorizontal qatorlar */
export function LeadersB(_: P) {
  const [head, ...rest] = LEADERS
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Rahbariyat</h2>
        </div>
        <div className="y2-lb">
          {head && (
            <article className="y2-lb-main">
              <Ava p={head} className="y2-lb-ava" />
              <div>
                <span className="y2-lb-role">{head.role}</span>
                <h3>{head.name}</h3>
              </div>
            </article>
          )}
          <div className="y2-lb-list">
            {rest.map((p, i) => (
              <article key={i}>
                <Ava p={p} className="y2-lb-sm" />
                <div>
                  <span className="y2-lb-role">{p.role}</span>
                  <h3>{p.name}</h3>
                </div>
                <b>{pad(i + 1)}</b>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** C: töq fon, arka şaklidagi baland portretlar */
export function LeadersC(_: P) {
  return (
    <section className="sec y2-lc-sec">
      <div className="wrap">
        <h2 className="h2 y2-lc-h">Rahbariyat</h2>
        <div className="y2-lc">
          {LEADERS.map((p, i) => (
            <article key={i} className={i === 0 ? 'on' : undefined}>
              <Ava p={p} className="y2-lc-arch" />
              <span className="y2-lc-n">{pad(i)}</span>
              <h3>{p.name}</h3>
              <p>{p.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Ijroiya qömitasi va komissiya ---------- */

/** B: har bir organ — keng gorizontal qator (sarlavha · tavsif · vazifalar) */
export function BodiesB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y2-bb">
          {BODIES.map((b, i) => (
            <article key={b.t}>
              <div className="y2-bb-head">
                <span className="y2-bb-n">{pad(i)}</span>
                <h3>{b.t}</h3>
                <span className="y2-bb-meta">{b.meta}</span>
              </div>
              <p className="y2-bb-d">{b.d}</p>
              <ol className="y2-bb-items">
                {b.items.map((x, j) => (
                  <li key={x}>
                    <span>{pad(j)}</span>
                    {x}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** C: almaşlaşuvçi tugmalar va 2×2 vazifa kartalari (holat: BodiesTabs.tsx) */
export function BodiesC(_: P) {
  return <BodiesTabs />
}

/* ---------- Qarorlar va yiğilişlar ---------- */

/** B: töq keng banner, sarlavha çapda, tugma öngda */
export function DecisionsB({ L }: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y2-db">
          <img src="/img/ittifoq/seminar.jpg" alt="" />
          <div className="y2-db-txt">
            <h2 className="h2">Qarorlar va yiğilişlar</h2>
            <p>{DEC_TEXT}</p>
            <Link href={L('/hujjatlar/kengash')} className="btn btn-primary">
              Kengaş hujjatlari{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** C: markazlaşgan, ustida hujjatlar dastasi bezagi */
export function DecisionsC({ L }: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y2-dc">
          <div className="y2-dc-stack" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h2 className="h2">Qarorlar va yiğilişlar</h2>
          <p>{DEC_TEXT}</p>
          <Link href={L('/hujjatlar/kengash')} className="btn btn-primary">
            Kengaş hujjatlari{' '}
            <span className="ic">
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Aloqa ---------- */

/** B: bino surati to'liq kenglikda, ustida oq panel */
export function ContactB({ L }: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="y2-cb">
          <img src={IMG.building} alt={BUILDING_ALT} />
          <div className="y2-cb-panel">
            <h2 className="h2">Aloqa</h2>
            <p className="y2-cb-addr">{CONTACT.address}</p>
            <div className="y2-btns">
              <a
                href={CONTACT.map}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Xaritada köriş{' '}
                <span className="ic">
                  <Arrow />
                </span>
              </a>
              <Link href={L('/boglanish/murojaat')} className="btn btn-outline">
                Murojaat yuboriş
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** C: mozaika — sariq manzil kartasi, baland surat, krem izoh kartasi */
export function ContactC({ L }: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Aloqa</h2>
        </div>
        <div className="y2-cc">
          <div className="y2-cc-addr">
            <p>{CONTACT.address}</p>
            <a
              href={CONTACT.map}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Xaritada köriş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </a>
          </div>
          <img src={IMG.building} alt={BUILDING_ALT} />
          <div className="y2-cc-note">
            <Link href={L('/boglanish/murojaat')} className="btn btn-outline">
              Murojaat yuboriş
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
