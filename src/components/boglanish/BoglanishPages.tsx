import Link from 'next/link'
import type { ReactNode } from 'react'

import { AppealForm } from '@/components/site/AppealForm'
import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'
import { More } from '@/components/site/MoreBtn'
import { Svg } from '@/components/site/SocialPhones'

import { ADDRESS, EMAIL, HOURS, LAW, MAPS, ORG, PHONES, RECEPTIONS, SOCIALS, TOPICS } from './data'
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

function Topics({ L, big }: { L: (h: string) => string; big?: boolean }) {
  return (
    <div className={big ? 'bg-topics bg-topics--big' : 'bg-topics'}>
      {TOPICS.map((t, i) => {
        const href = t.href.startsWith('/') ? L(t.href) : t.href
        const Inner = (
          <>
            <span className="bg-topic-n">0{i + 1}</span>
            <h3>{t.t}</h3>
            <p>{t.d}</p>
            <span className="more-btn">
              <More>{t.go}</More>
            </span>
          </>
        )
        return t.href.startsWith('/') ? (
          <Link key={t.t} href={href} className="bg-topic">
            {Inner}
          </Link>
        ) : (
          <a key={t.t} href={href} className="bg-topic">
            {Inner}
          </a>
        )
      })}
    </div>
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
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}

/* ===================== Aloqa maʼlumotlari ===================== */

/** A — Kanallar: tört karta, “Sizga nima kerak?”, qabul jadvali, tarmoqlar */
function AloqaA({ L }: { L: (h: string) => string }) {
  return (
    <>
      <section className="sec bg-sec">
        <div className="wrap">
          <div className="bg-cards">
            <div className="bg-card">
              <Ic d={PATH.phone} />
              <h3>Telefon</h3>
              {PHONES.map((p) => (
                <a key={p.href} href={p.href} className="bg-big">
                  {p.v}
                </a>
              ))}
            </div>
            <div className="bg-card">
              <Ic d={PATH.mail} />
              <h3>Elektron poçta</h3>
              <a href={`mailto:${EMAIL}`} className="bg-big bg-mail">
                <Mail />
              </a>
              <Link href={L('/boglanish/murojaat')} className="bg-link">
                Yoki onlayn murojaat yuboring →
              </Link>
            </div>
            <div className="bg-card">
              <Ic d={PATH.pin} />
              <h3>Manzil</h3>
              <p className="bg-big-t">{ADDRESS.line}</p>
              <small>{ADDRESS.landmark}</small>
              <Link href={L('/boglanish/manzil')} className="bg-link">
                Xaritada köriş →
              </Link>
            </div>
            <div className="bg-card">
              <Ic d={PATH.clock} />
              <h3>Iş vaqti</h3>
              <p className="bg-big-t">
                {HOURS.days}
                <br />
                {HOURS.time}
              </p>
              <small>{HOURS.off}</small>
              <OpenNow />
            </div>
          </div>
        </div>
      </section>
      <section className="sec bg-sec">
        <div className="wrap">
          <div className="bg-sec-head">
            <h2 className="h2">Sizga nima kerak?</h2>
            <p>Masalangizga mos yöl — kim va qanday yordam beradi.</p>
          </div>
          <Topics L={L} />
        </div>
      </section>
      <Reception />
      <section className="sec bg-sec">
        <div className="wrap">
          <div className="bg-sec-head">
            <h2 className="h2">Ijtimoiy tarmoqlarda</h2>
            <p>Yangiliklar va eʼlonlar birinçi bölib şu yerda çiqadi.</p>
          </div>
          <Socials />
        </div>
      </section>
    </>
  )
}

/** B — Ikki ustun: çapda aloqa röyxati, öngda xarita; qabul hafta kunlari kartalarida */
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
            <Link href={L('/boglanish/manzil')} className="more-btn">
              <More>Qanday boriş mumkin</More>
            </Link>
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

/** C — Yönaltiruvçi: avval “Sizga nima kerak?”, keyin ixçam aloqa satri va qabul */
function AloqaC({ L }: { L: (h: string) => string }) {
  return (
    <>
      <section className="sec bg-sec">
        <div className="wrap">
          <Topics L={L} big />
          <div className="bg-strip">
            {PHONES.map((p) => (
              <a key={p.href} href={p.href}>
                <Ic d={PATH.phone} />
                {p.v}
              </a>
            ))}
            <a href={`mailto:${EMAIL}`}>
              <Ic d={PATH.mail} />
              <Mail />
            </a>
            <Link href={L('/boglanish/manzil')}>
              <Ic d={PATH.pin} />
              {ADDRESS.line}
            </Link>
            <span>
              <Ic d={PATH.clock} />
              {HOURS.days}, {HOURS.time} · {HOURS.off}
            </span>
          </div>
        </div>
      </section>
      <Reception />
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
      <div className="vx" data-v="aloqa-a">
        <AloqaA L={L} />
      </div>
      <div className="vx" data-v="aloqa-b">
        <AloqaB L={L} />
      </div>
      <div className="vx" data-v="aloqa-c">
        <AloqaC L={L} />
      </div>
      <DevSectionsPanel
        sections={[
          {
            name: 'aloqa',
            label: 'Aloqa maʼlumotlari',
            count: 3,
            hints: ['Kanallar kartalari', 'Ikki ustun + xarita', 'Yönaltiruvçi'],
          },
        ]}
      />
    </div>
  )
}

/* ===================== Manzil va xarita ===================== */

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

function WayCards() {
  return (
    <div className="bg-ways">
      <div className="bg-way">
        <Ic d={PATH.flag} />
        <h3>Mölja</h3>
        <p>{ADDRESS.landmark}.</p>
      </div>
      <div className="bg-way">
        <Ic d={PATH.metro} />
        <h3>Metro</h3>
        <p>
          {ADDRESS.metro.station} — {ADDRESS.metro.walk}.
        </p>
      </div>
      <div className="bg-way">
        <Ic d={PATH.clock} />
        <h3>Iş vaqti</h3>
        <p>
          {HOURS.days}, {HOURS.time}. {HOURS.off}.
        </p>
        <OpenNow />
      </div>
    </div>
  )
}

/** A — Katta xarita: xarita butun eni böylab, ustida manzil kartasi; ostida yöl kartalari */
function ManzilA() {
  return (
    <section className="sec bg-sec">
      <div className="wrap">
        <div className="bg-bigmap">
          <MapFrame src={MAPS.yandexEmbed} />
          <div className="bg-addr">
            <Ic d={PATH.pin} />
            <h2>{ADDRESS.line}</h2>
            <p>{ADDRESS.landmark}</p>
            <MapLinks />
          </div>
        </div>
        <WayCards />
      </div>
    </section>
  )
}

/** B — Yonma-yon: çapda manzil va yöl, öngda Yandex va Google xaritalari */
function ManzilB() {
  return (
    <section className="sec bg-sec">
      <div className="wrap bg-split">
        <div className="bg-list">
          <div className="bg-row">
            <Ic d={PATH.pin} />
            <div>
              <small className="bg-k">Manzil</small>
              <div className="bg-v">
                <span>
                  {ADDRESS.line}
                  <small>{ADDRESS.landmark}</small>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-row">
            <Ic d={PATH.metro} />
            <div>
              <small className="bg-k">Metro</small>
              <div className="bg-v">
                <span>
                  {ADDRESS.metro.station}
                  <small>{ADDRESS.metro.walk}</small>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-row">
            <Ic d={PATH.clock} />
            <div>
              <small className="bg-k">Iş vaqti</small>
              <div className="bg-v">
                <span>
                  {HOURS.days}, {HOURS.time}
                  <small>{HOURS.off}</small>
                </span>
              </div>
            </div>
          </div>
          <OpenNow />
          <MapLinks />
        </div>
        <div className="bg-maps2">
          <MapFrame src={MAPS.yandexEmbed} title="Yandex xaritasi" />
          <MapFrame src={MAPS.googleEmbed} title="Google xaritasi" />
        </div>
      </div>
    </section>
  )
}

export function ManzilPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="bg">
      <Head
        crumbs={crumbs}
        title="Manzil va xarita"
        lead={`${ADDRESS.full}. ${ADDRESS.landmark}.`}
      />
      <div className="vx" data-v="manzil-a">
        <ManzilA />
      </div>
      <div className="vx" data-v="manzil-b">
        <ManzilB />
      </div>
      <DevSectionsPanel
        sections={[
          {
            name: 'manzil',
            label: 'Manzil va xarita',
            count: 2,
            hints: ['Katta xarita', 'Yonma-yon, ikki xarita'],
          },
        ]}
      />
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

/** A — Forma va jarayon: çapda qadamlar va muddatlar, öngda forma */
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

/** B — Turlar avval: Qonundagi uç tur kartada, ostida forma, oxirida muddatlar */
function MurojaatB() {
  return (
    <section className="sec bg-sec">
      <div className="wrap">
        <div className="bg-types">
          {LAW.types.map((t) => (
            <div key={t.t}>
              <h3>{t.t}</h3>
              <p>{t.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-formwrap">
          <AppealForm />
        </div>
        <Terms />
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
      <div className="vx" data-v="murojaat-a">
        <MurojaatA />
      </div>
      <div className="vx" data-v="murojaat-b">
        <MurojaatB />
      </div>
      <DevSectionsPanel
        sections={[
          {
            name: 'murojaat',
            label: 'Elektron murojaat',
            count: 2,
            hints: ['Forma + jarayon', 'Turlar + forma'],
          },
        ]}
      />
    </div>
  )
}
