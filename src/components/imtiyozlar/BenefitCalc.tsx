'use client'

import { useState, type ReactNode } from 'react'

import { useMiqdor } from '@/components/site/MiqdorProvider'
import { som } from '@/lib/miqdorlar'

/* ---------- ikonkalar ---------- */
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
export const BENEFIT_ICONS: Record<string, ReactNode> = {
  uy: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  kontrakt: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  ),
  til: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 6 6 7.5M11 5c-.7 3.5-3 6.5-7 8" />
      <path d="m12 21 4-9 4 9M13.5 18h5" />
    </svg>
  ),
  avto: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M5 16V11l2-5h10l2 5v5z" />
      <path d="M5 11h14" />
      <circle cx="8" cy="16.5" r="1.8" />
      <circle cx="16" cy="16.5" r="1.8" />
    </svg>
  ),
  kurs: (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M8 9l2 2-2 2M12.5 13h3" />
    </svg>
  ),
  yotoq: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="11" r="2" />
    </svg>
  ),
  magistr: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M2.5 8 12 3.5 21.5 8 12 12.5z" />
      <path d="M6.5 10v4c1.5 1.4 3.4 2.1 5.5 2.1s4-.7 5.5-2.1v-4" />
      <path d="M21.5 8v4.5" />
      <rect x="8" y="17.5" width="8" height="4" rx="1" />
      <path d="M10.5 19.5h3" />
    </svg>
  ),
  kitob: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 6c-2-1.6-5-1.6-8-.6v13c3-1 6-1 8 .6 2-1.6 5-1.6 8-.6v-13c-3-1-6-1-8 .6z" />
      <path d="M12 6v13" />
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 9.5 12 4l9 5.5M4.5 10v8M9.5 10v8M14.5 10v8M19.5 10v8M3 20.5h18" />
    </svg>
  ),
  sertifikat: (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M7 9h10M7 12.5h6" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="m15.8 19.2-.8 2.8 2-1 2 1-.8-2.8" />
    </svg>
  ),
  avtobus: (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="5" y="3" width="14" height="15" rx="3" />
      <path d="M5 11h14M8 18v2M16 18v2M8.5 14.5h.01M15.5 14.5h.01" />
    </svg>
  ),
  sovga: (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18M12 9v11M12 9c-1.5-3-5-4-5-1.5S10 9 12 9zM12 9c1.5-3 5-4 5-1.5S14 9 12 9z" />
    </svg>
  ),
  nota: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  ),
  vaucher: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z" />
      <path d="M14 7v10" strokeDasharray="2 2" />
    </svg>
  ),
  yulduz: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9z" />
    </svg>
  ),
  qalqon: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
}
const Icon = ({ n }: { n: string }) => (
  <span className="sc-ic" aria-hidden="true">
    {BENEFIT_ICONS[n]}
  </span>
)

/* ---------- umumiy elementlar ---------- */
type Row = { t: string; note?: string; v: number; minus?: boolean }
type Result = { label: string; total: number; rows: Row[]; extra?: { t: string; v: string } }

const digits = (s: string) => Number(s.replace(/\D/g, '').slice(0, 12)) || 0

function Money({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (n: number) => void
}) {
  return (
    <label className="ic-num">
      <span>{label}</span>
      <span className="ic-num-in">
        <input
          inputMode="numeric"
          value={value ? value.toLocaleString('ru-RU').replace(/\s/g, ' ') : ''}
          onChange={(e) => onChange(digits(e.target.value))}
          placeholder="0"
        />
        <b>söm</b>
      </span>
    </label>
  )
}

function Choice<T extends string>({
  label,
  value,
  set,
  opts,
}: {
  label: string
  value: T
  set: (v: T) => void
  opts: { v: T; t: string }[]
}) {
  return (
    <fieldset className="ic-ch">
      <legend>{label}</legend>
      <div>
        {opts.map((o) => (
          <label key={o.v} className="ic-pill">
            <input type="radio" checked={value === o.v} onChange={() => set(o.v)} />
            <span>{o.t}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function Months({
  value,
  set,
  max,
  label = 'Oylar soni',
}: {
  value: number
  set: (n: number) => void
  max: number
  label?: string
}) {
  return (
    <label className="sc-sl">
      <span className="sc-sl-h">
        <span>{label}</span>
        <b>{value} oy</b>
      </span>
      <input
        type="range"
        min={1}
        max={max}
        step={1}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        style={{ ['--p' as string]: `${((value - 1) / (max - 1)) * 100}%` }}
      />
      <span className="sc-sl-s">
        <span>1</span>
        <span>{max} oy</span>
      </span>
    </label>
  )
}

/* ---------- hisob-kitoblar ---------- */
function Ijara(): [ReactNode, Result] {
  // joriy BHM va Markaziy bank stavkasi — admin paneldagi “Miqdorlar”dan
  const { BHM } = useMiqdor()
  const [city, setCity] = useState<'t' | 'h'>('t')
  const [m, setM] = useState(10)
  const k = city === 't' ? 1 : 0.5
  const month = k * BHM.v
  return [
    <>
      <Choice
        label="Öqiş joyi"
        value={city}
        set={setCity}
        opts={[
          { v: 't', t: 'Toşkent şahri' },
          { v: 'h', t: 'Boşqa hududlar' },
        ]}
      />
      <Months value={m} set={setM} max={10} label="Ijarada yaşaladigan oylar soni" />
    </>,
    {
      label: `${m} oy uçun jami`,
      total: month * m,
      rows: [{ t: 'Har oy', note: `BHM ${som(BHM.v)} × ${String(k).replace('.', ',')}`, v: month }],
    },
  ]
}

function Kontrakt(): [ReactNode, Result] {
  // joriy BHM va Markaziy bank stavkasi — admin paneldagi “Miqdorlar”dan
  const { BHM, MB_STAVKA } = useMiqdor()
  const [sum, setSum] = useState(15_000_000)
  const [kind, setKind] = useState<'yoq' | 'pedagog' | 'reyestr' | 'magistr'>('reyestr')
  const [sex, setSex] = useState<'a' | 'e'>('a')
  const cover =
    kind === 'magistr'
      ? sum
      : kind === 'pedagog'
        ? sum * 0.3
        : kind === 'reyestr'
          ? Math.min(sum * 0.5, 50 * BHM.v)
          : 0
  const rest = Math.max(sum - cover, 0)
  const r = sex === 'a' ? 0 : MB_STAVKA.v / 100 / 12
  const n = 84
  const pay = rest === 0 ? 0 : r === 0 ? rest / n : (rest * r) / (1 - Math.pow(1 + r, -n))
  const notes: Record<typeof kind, string> = {
    yoq: 'Imtiyoz qöllanmaydi',
    pedagog: 'Kontraktning 30 foizi',
    reyestr: `Kontraktning 50 foizi, ${som(50 * BHM.v)}dan oşmagan holda`,
    magistr: 'Kontraktning 100 foizi',
  }
  return [
    <>
      <Money label="Bir yillik kontrakt summasi" value={sum} onChange={setSum} />
      <Choice
        label="Imtiyoz"
        value={kind}
        set={setKind}
        opts={[
          { v: 'reyestr', t: 'Ijtimoiy reyestr — 50 foizgaça' },
          { v: 'pedagog', t: 'Pedagog farzandi — 30 foiz' },
          { v: 'magistr', t: 'Magistraturadagi xotin-qizlar — 100 foiz' },
          { v: 'yoq', t: 'Imtiyozsiz' },
        ]}
      />
      <Choice
        label="Qolgan qism uçun taʼlim krediti"
        value={sex}
        set={setSex}
        opts={[
          { v: 'a', t: 'Xotin-qizlar — foizsiz' },
          { v: 'e', t: `Yigitlar — yillik ${MB_STAVKA.v} foiz` },
        ]}
      />
    </>,
    {
      label: 'Davlat tomonidan qoplanadi',
      total: cover,
      rows: [
        { t: 'Kontrakt summasi', v: sum },
        { t: 'Imtiyoz', note: notes[kind], v: cover, minus: true },
        {
          t: 'Talaba tölaydigan qism',
          note: 'taʼlim krediti hisobidan moliyalaştirilişi mumkin',
          v: rest,
        },
      ],
      extra: rest ? { t: 'Kreditni qaytariş: 7 yil davomida oyiga', v: som(pay) } : undefined,
    },
  ]
}

function YoshOila(): [ReactNode, Result] {
  // joriy BHM va Markaziy bank stavkasi — admin paneldagi “Miqdorlar”dan
  const { BHM } = useMiqdor()
  const [rent, setRent] = useState(3_000_000)
  const [city, setCity] = useState<'m' | 't'>('m')
  const [m, setM] = useState(12)
  const cap = (city === 'm' ? 3 : 2) * BHM.v
  const month = Math.min(rent * 0.5, cap)
  return [
    <>
      <Money label="Oylik ijara haqi" value={rent} onChange={setRent} />
      <Choice
        label="Yaşaş joyi"
        value={city}
        set={setCity}
        opts={[
          { v: 'm', t: 'Toşkent, Nukus, viloyat markazi' },
          { v: 't', t: 'Tuman va boşqa şaharlar' },
        ]}
      />
      <Months value={m} set={setM} max={12} />
    </>,
    {
      label: `${m} oy uçun jami`,
      total: month * m,
      rows: [
        { t: 'Har oy', note: `ijara haqining 50 foizi, ${som(cap)}dan oşmagan holda`, v: month },
      ],
    },
  ]
}

function IkkiOlti(): [ReactNode, Result] {
  // joriy BHM va Markaziy bank stavkasi — admin paneldagi “Miqdorlar”dan
  const { BHM } = useMiqdor()
  const [loc, setLoc] = useState<'t' | 'v' | 'd'>('t')
  const [m, setM] = useState(6)
  const k = loc === 't' ? 2 : loc === 'v' ? 1.5 : 1
  return [
    <>
      <Choice
        label="Kurs joylaşgan hudud"
        value={loc}
        set={setLoc}
        opts={[
          { v: 't', t: 'Toşkent şahri' },
          { v: 'v', t: 'Nukus va viloyat markazlari' },
          { v: 'd', t: 'Tumanlar' },
        ]}
      />
      <Months value={m} set={setM} max={6} label="Davlat qoplaydigan oylar" />
    </>,
    {
      label: `${m} oy uçun jami`,
      total: k * BHM.v * m,
      rows: [
        { t: 'Dastlabki 2 oy', note: 'kurs tölovini yoş özi amalga oşiradi', v: 0 },
        { t: 'Keyingi har oy', note: `BHM × ${String(k).replace('.', ',')}gaça`, v: k * BHM.v },
      ],
    },
  ]
}

function Kurslar(): [ReactNode, Result] {
  // joriy BHM va Markaziy bank stavkasi — admin paneldagi “Miqdorlar”dan
  const { BHM } = useMiqdor()
  const [fee, setFee] = useState(1_500_000)
  const [m, setM] = useState(6)
  const [drive, setDrive] = useState(4_000_000)
  const month = Math.min(fee, 4 * BHM.v)
  const d = Math.min(drive, 8 * BHM.v)
  return [
    <>
      <Money label="Kursning oylik narxi (til, IT, kasb)" value={fee} onChange={setFee} />
      <Months value={m} set={setM} max={6} />
      <Money label="Haydovçilik kursi narxi" value={drive} onChange={setDrive} />
    </>,
    {
      label: 'Jami qoplanadi',
      total: month * m + d,
      rows: [
        { t: `Kurslar, ${m} oy`, note: `oyiga ${som(4 * BHM.v)}gaça`, v: month * m },
        { t: 'Haydovçilik kursi', note: `bir marta ${som(8 * BHM.v)}gaça`, v: d },
      ],
    },
  ]
}

const TABS = [
  { id: 'ijara', t: 'Talabalar ijarasi', icon: 'uy', fn: Ijara },
  { id: 'kontrakt', t: 'Kontrakt va taʼlim krediti', icon: 'kontrakt', fn: Kontrakt },
  { id: 'yosh-oila', t: 'Yoş oila ijarasi', icon: 'yotoq', fn: YoshOila },
  { id: 'ikki-olti', t: '“2+6” til kurslari', icon: 'til', fn: IkkiOlti },
  { id: 'kurslar', t: 'Kurslar va haydovçilik', icon: 'avto', fn: Kurslar },
] as const

function Panel({ fn }: { fn: () => [ReactNode, Result] }) {
  // joriy BHM va Markaziy bank stavkasi — admin paneldagi “Miqdorlar”dan
  const { BHM, MB_STAVKA } = useMiqdor()
  const [form, res] = fn()
  return (
    <div className="sc-a ic-panel">
      <div className="sc-a-form">{form}</div>
      <div className="sc-a-res" aria-live="polite">
        <small>{res.label}</small>
        <b className="sc-sum">{som(res.total)}</b>
        <ul className="sc-a-rows">
          {res.rows.map((r) => (
            <li key={r.t}>
              <i className={`sc-dot ${r.minus ? 'sc-seg-main' : 'sc-seg-qoshimcha'}`} />
              <span>
                {r.t}
                {r.note && <small>{r.note}</small>}
              </span>
              <b>
                {r.minus ? '−' : ''}
                {som(r.v)}
              </b>
            </li>
          ))}
        </ul>
        {res.extra && (
          <div className="sc-a-x">
            <span>{res.extra.t}</span>
            <b className="ic-x">{res.extra.v}</b>
          </div>
        )}
        <p className="sc-note">
          Hisob asosi: BHM {som(BHM.v)} ({BHM.from}dan), Markaziy bankning asosiy stavkasi — yillik{' '}
          {MB_STAVKA.v} foiz. Miqdorlar normativ hujjatlarda belgilangan eng yuqori çegaralar
          asosida hisoblangan; aniq summa ariza körib çiqilganidan söng belgilanadi.
        </p>
      </div>
    </div>
  )
}

/** Imtiyozlar kalkulyatori: beş turdagi imtiyoz böyiça summani BHM va kiritilgan qiymatlar asosida hisoblaydi */
export function BenefitCalc() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('ijara')
  const cur = TABS.find((t) => t.id === tab)!
  return (
    <section className="sc ic-calc" aria-labelledby="ic-title">
      <h2 id="ic-title" className="sc-h">
        Imtiyozlar kalkulyatori
      </h2>
      <div className="ic-tabs" role="tablist" aria-label="Imtiyoz turi">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className="sc-a-tile"
            onClick={() => setTab(t.id)}
          >
            <Icon n={t.icon} />
            <span className="sc-a-t">{t.t}</span>
          </button>
        ))}
      </div>
      <Panel key={cur.id} fn={cur.fn} />
    </section>
  )
}
