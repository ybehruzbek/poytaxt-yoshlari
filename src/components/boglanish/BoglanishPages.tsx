import Link from 'next/link'
import type { ReactNode } from 'react'

import { AppealForm } from '@/components/site/AppealForm'
import { More } from '@/components/site/MoreBtn'
import { Svg } from '@/components/site/SocialPhones'

import { ADDRESS, EMAIL, HOURS, LAW, MAPS, ORG, PHONES, RECEPTIONS, SOCIALS } from './data'
import { OpenNow } from './OpenNow'

/* ---------- umumiy bölaklar ---------- */

const PATH = {
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
  pin: 'M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2',
  metro: 'M4 20 9 5l3 8 3-8 5 15M2 20h20',
  flag: 'M5 21V4m0 0h11l-2 4 2 4H5',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
}
function Ic({ d }: { d: string }) {
  return (
    <span className="bg-ic" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  )
}

function Head({ crumbs, title, lead }: { crumbs: ReactNode; title: string; lead: string }) {
  return (
    <header className="pg-head">
      <div className="wrap">
        {crumbs}
        <h1 className="h2 pg-title">{title}</h1>
        <p className="pg-lead">{lead}</p>
      </div>
    </header>
  )
}

/** Poçta manzili: qator faqat “@” dan keyin bölinadi */
function Mail() {
  const [u, d] = EMAIL.split('@')
  return (
    <>
      {u}@<wbr />
      {d}
    </>
  )
}

const net = (n: string) => n.toLowerCase() as 'telegram' | 'instagram' | 'facebook'

function Socials() {
  return (
    <div className="bg-soc">
      {SOCIALS.map((s) => (
        <a key={s.net} href={s.href} target="_blank" rel="noopener noreferrer">
          <span className="bg-soc-ic">
            <Svg net={net(s.net)} />
          </span>
          <span>
            <b>{s.net}</b>
            <small>{s.handle}</small>
          </span>
        </a>
      ))}
    </div>
  )
}

/** Fuqarolar qabuli jadvali */
function Reception({ cards }: { cards?: boolean }) {
  return (
    <section className="sec bg-sec" id="qabul">
      <div className="wrap">
        <div className="bg-sec-head">
          <h2 className="h2">Fuqarolar qabuli</h2>
          <p>
            Kengaş rahbariyati haftaning belgilangan kunlarida fuqarolarni şaxsan qabul qiladi.
            Qabulga oldindan telefon orqali yoziliş tavsiya etiladi.
          </p>
        </div>
        {cards ? (
          <ol className="bg-week">
            {RECEPTIONS.map((r) => (
              <li key={r.day}>
                <b>{r.day}</b>
                <span className="bg-week-time">{r.time}</span>
                <strong>{r.name}</strong>
                <small>{r.dept}</small>
                <em>{r.room}</em>
              </li>
            ))}
          </ol>
        ) : (
          <div className="bg-table" role="table" aria-label="Fuqarolar qabuli jadvali">
            <div className="bg-tr bg-th" role="row">
              <span role="columnheader">Kun</span>
              <span role="columnheader">Vaqt</span>
              <span role="columnheader">Qabul qiladi</span>
              <span role="columnheader">Xona</span>
            </div>
            {RECEPTIONS.map((r) => (
              <div className="bg-tr" role="row" key={r.day}>
                <span role="cell">
                  <b>{r.day}</b>
                </span>
                <span role="cell">{r.time}</span>
                <span role="cell">
                  <strong>{r.name}</strong>
                  <small>{r.dept}</small>
                </span>
                <span role="cell">{r.room}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function MapFrame({
  src,
  title = 'Xarita: Universitet köçasi, 4',
}: {
  src: string
  title?: string
}) {
  return (
    <iframe
      className="bg-map"
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}

/* ===================== Aloqa maʼlumotlari ===================== */

/** Ikki ustun: çapda aloqa röyxati, öngda xarita; ostida qabul hafta kunlari kartalarida */
function AloqaB({ L }: { L: (h: string) => string }) {
  const rows = [
    {
      d: PATH.phone,
      k: 'Telefon',
      v: PHONES.map((p) => (
        <a key={p.href} href={p.href}>
          {p.v}
        </a>
      )),
    },
    {
      d: PATH.mail,
      k: 'Elektron poçta',
      v: (
        <a href={`mailto:${EMAIL}`}>
          <Mail />
        </a>
      ),
    },
    {
      d: PATH.pin,
      k: 'Manzil',
      v: (
        <span>
          {ADDRESS.line}
          <small>{ADDRESS.landmark}</small>
          <small>
            {ADDRESS.metro.station} — {ADDRESS.metro.walk}
          </small>
        </span>
      ),
    },
    {
      d: PATH.clock,
      k: 'Iş vaqti',
      v: (
        <span>
          {HOURS.days}, {HOURS.time}
          <small>{HOURS.off}</small>
        </span>
      ),
    },
  ]
  return (
    <>
      <section className="sec bg-sec">
        <div className="wrap bg-split">
          <div className="bg-list">
            <OpenNow />
            {rows.map((r) => (
              <div key={r.k} className="bg-row">
                <Ic d={r.d} />
                <div>
                  <small className="bg-k">{r.k}</small>
                  <div className="bg-v">{r.v}</div>
                </div>
              </div>
            ))}
            <Socials />
          </div>
          <div className="bg-mapcard">
            <MapFrame src={MAPS.yandexEmbed} />
            <MapLinks />
          </div>
        </div>
      </section>
      <Reception cards />
      <section className="sec bg-sec">
        <div className="wrap">
          <div className="bg-cta">
            <div>
              <h2 className="h2">Savol, taklif yoki şikoyatingiz bormi?</h2>
              <p>Onlayn murojaat qoldiring — Qonunda belgilangan muddatda javob beriladi.</p>
            </div>
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Murojaat yuboriş{' '}
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function AloqaPage({ crumbs, L }: { crumbs: ReactNode; L: (h: string) => string }) {
  return (
    <div className="bg">
      <Head
        crumbs={crumbs}
        title="Aloqa maʼlumotlari"
        lead={`${ORG} bilan boğlanişning barça yöllari: telefon, poçta, manzil, iş vaqti va rahbariyatning fuqarolar qabuli.`}
      />
      <AloqaB L={L} />
    </div>
  )
}

/* ---------- xaritani tashqi ilovada oçiş ---------- */

function MapLinks() {
  return (
    <div className="bg-maplinks">
      <a href={MAPS.yandex} target="_blank" rel="noopener noreferrer" className="more-btn">
        <More>Yandex Xaritalarda oçiş</More>
      </a>
      <a href={MAPS.google} target="_blank" rel="noopener noreferrer" className="more-btn">
        <More>Google Mapsʼda oçiş</More>
      </a>
    </div>
  )
}

/* ===================== Elektron murojaat ===================== */

const STEPS = [
  {
    t: 'Yozing',
    d: 'Murojaat turini tanlang, masalani bayon qiling, kerak bölsa fayl biriktiring.',
  },
  {
    t: 'Körib çiqiladi',
    d: 'Murojaat masʼul bölimga yuboriladi va Qonunda belgilangan muddatda örganiladi.',
  },
  {
    t: 'Javob beriladi',
    d: 'Natija haqida siz qoldirgan telefon yoki poçta orqali xabar beriladi.',
  },
]

function Terms() {
  return (
    <div className="bg-terms">
      {LAW.terms.map((t) => (
        <div key={t.v}>
          <b>{t.v}</b>
          <span>{t.t}</span>
        </div>
      ))}
      <a href={LAW.href} target="_blank" rel="noopener noreferrer" className="bg-law">
        {LAW.title} — 28-modda ↗
      </a>
    </div>
  )
}

/** Forma va jarayon: çapda qadamlar va muddatlar, öngda forma */
function MurojaatA() {
  return (
    <section className="sec bg-sec">
      <div className="wrap bg-split bg-split--form">
        <div>
          <ol className="bg-steps">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <i>{i + 1}</i>
                <span>
                  <strong>{s.t}</strong>
                  {s.d}
                </span>
              </li>
            ))}
          </ol>
          <Terms />
        </div>
        <AppealForm />
      </div>
    </section>
  )
}

export function MurojaatPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="bg">
      <Head
        crumbs={crumbs}
        title="Elektron murojaat"
        lead="Savol, ariza, taklif yoki şikoyatingizni onlayn yuboring. Murojaatlar “Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonun asosida körib çiqiladi."
      />
      <MurojaatA />
    </div>
  )
}
