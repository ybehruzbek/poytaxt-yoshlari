'use client'

import { createContext, useContext, useRef, useState, useTransition, type ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'
import { submitVolunteer, type VolField, type VolState } from '@/app/(frontend)/actions/volunteer'

import type { VolDir } from './data'
import type { VolSahifa } from '@/lib/cms/sahifalar'

type Page = Pick<VolSahifa, 'LAW' | 'QUIZ' | 'TIMES'>
const PageCtx = createContext<Page>({ LAW: { t: '', no: '', url: '' }, QUIZ: [], TIMES: [] })

/** Yönalişlar admin paneldan (Faoliyat → Volontyorlik yönalişlari) — serverdan uzatiladi */
const DirsCtx = createContext<VolDir[]>([])

/* ---------- ikonkalar (24×24, çiziqli) ---------- */
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
const ICONS: Record<string, ReactNode> = {
  qol: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 14h3l3.5 2.5H14a1.5 1.5 0 0 0 0-3h-3" />
      <path d="M6 20h9l5.5-4a1.6 1.6 0 0 0-2-2.5L15 15.5" />
      <path d="M15 9.5S12 7.8 12 5.8A1.8 1.8 0 0 1 15 4.6a1.8 1.8 0 0 1 3 1.2c0 2-3 3.7-3 3.7z" />
    </svg>
  ),
  yurak: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      <path d="M8 11h2l1-2 2 4 1-2h2" />
    </svg>
  ),
  barg: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19c3-4 6-7 10-9" />
    </svg>
  ),
  gumbaz: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M6 12a6 6 0 0 1 12 0M12 4V2.5M4 12h16M5.5 12v8M18.5 12v8M3 20.5h18M10 20.5v-4a2 2 0 0 1 4 0v4" />
    </svg>
  ),
  bayroq: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  ),
  qalqon: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  ),
  kitob: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 6c-2-1.6-5-1.6-8-.6v13c3-1 6-1 8 .6 2-1.6 5-1.6 8-.6v-13c-3-1-6-1-8 .6z" />
      <path d="M12 6v13" />
    </svg>
  ),
  ekran: (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M8 10l2 2-2 2M12.5 14h3" />
    </svg>
  ),
}
export const VolIcon = ({ n }: { n: string }) => (
  <span className="vl-ic" aria-hidden="true">
    {ICONS[n]}
  </span>
)

const MAX_YEAR = new Date().getFullYear() - 16
const MIN_YEAR = new Date().getFullYear() - 35
const YEARS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MAX_YEAR - i)

/* ---------- 1. Yönalişlar ---------- */
function Directions({ onPick }: { onPick: (id: string) => void }) {
  const DIRS = useContext(DirsCtx)
  const [cur, setCur] = useState(DIRS[0].id)
  const d = DIRS.find((x) => x.id === cur)!
  return (
    <div className="vl-dirs">
      <div className="vl-tiles" role="tablist" aria-label="Volontyorlik yönalişlari">
        {DIRS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={cur === x.id}
            className="vl-tile"
            onClick={() => setCur(x.id)}
          >
            <VolIcon n={x.icon} />
            <span>{x.t}</span>
          </button>
        ))}
      </div>
      <div className="vl-card" role="tabpanel" aria-live="polite">
        <div className="vl-card-head">
          <VolIcon n={d.icon} />
          <div>
            <h3>{d.t}</h3>
            <span className="vl-age">{d.age} yoşdan</span>
          </div>
        </div>
        <p>{d.text}</p>
        <h4>Asosiy vazifalar</h4>
        <ul>
          {d.tasks.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {d.example && (
          <p className="vl-ex">
            <b>Kengaş tajribasidan:</b> {d.example}
          </p>
        )}
        <button type="button" className="more-btn" onClick={() => onPick(d.id)}>
          <More>Ariza beriş</More>
        </button>
      </div>
    </div>
  )
}

/* ---------- 2. Test ---------- */
function Quiz({ onPick }: { onPick: (id: string) => void }) {
  const DIRS = useContext(DirsCtx)
  const { QUIZ } = useContext(PageCtx)
  const [ans, setAns] = useState<number[]>([])
  const step = ans.length
  const done = step >= QUIZ.length
  const score: Record<string, number> = {}
  ans.forEach((a, qi) => QUIZ[qi].a[a].dirs.forEach((d) => (score[d] = (score[d] ?? 0) + 1)))
  const top = [...DIRS].sort((a, b) => (score[b.id] ?? 0) - (score[a.id] ?? 0)).slice(0, 2)
  return (
    <div className="vl-quiz">
      <div className="vl-quiz-bar" aria-hidden="true">
        {QUIZ.map((_, i) => (
          <i key={i} className={i < step ? 'on' : undefined} />
        ))}
      </div>
      {!done ? (
        <>
          <p className="vl-quiz-n">
            {step + 1}-savol / {QUIZ.length}
          </p>
          <h3>{QUIZ[step].q}</h3>
          <div className="vl-quiz-a">
            {QUIZ[step].a.map((a, i) => (
              <button key={a.t} type="button" onClick={() => setAns([...ans, i])}>
                {a.t}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" className="vl-quiz-back" onClick={() => setAns(ans.slice(0, -1))}>
              Oldingi savol
            </button>
          )}
        </>
      ) : (
        <div className="vl-quiz-res" aria-live="polite">
          <p className="vl-quiz-n">Natija</p>
          <h3>Sizga mos yönalişlar</h3>
          <div className="vl-quiz-top">
            {top.map((d, i) => (
              <div key={d.id} className={i === 0 ? 'first' : undefined}>
                <VolIcon n={d.icon} />
                <b>{d.t}</b>
                <small>{d.text}</small>
              </div>
            ))}
          </div>
          <div className="vl-quiz-act">
            <button type="button" className="more-btn" onClick={() => onPick(top[0].id)}>
              <More>Ariza beriş</More>
            </button>
            <button type="button" className="vl-quiz-back" onClick={() => setAns([])}>
              Testni qayta topşiriş
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- 3. Ariza şakli ---------- */
function VolForm({ picked, setPicked }: { picked: string[]; setPicked: (v: string[]) => void }) {
  const DIRS = useContext(DirsCtx)
  const { LAW, TIMES } = useContext(PageCtx)
  const [state, setState] = useState<VolState | null>(null)
  const [pending, start] = useTransition()
  const err = (f: VolField) => state?.errors?.[f]
  const toggle = (id: string) =>
    setPicked(picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id])

  if (state?.ok)
    return (
      <div className="az-result" role="status">
        <span className="az-result-ic" aria-hidden="true">
          ✓
        </span>
        <h2>Arizangiz qabul qilindi</h2>
        {state.no && (
          <p className="az-result-no">
            Ariza raqami: <b>{state.no}</b>
          </p>
        )}
        <p>
          Kengaş mutaxassisi körsatilgan telefon raqami orqali siz bilan boğlanib, suhbat vaqtini
          kelişib oladi.
        </p>
      </div>
    )

  return (
    <form
      className="az-form vl-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        start(async () => setState(await submitVolunteer(fd)))
      }}
    >
      <p className="az-form-title">Volontyorlikka ariza</p>
      <label className="az-field">
        <span>
          Familiya, ism, otasining ismi <i aria-hidden="true">*</i>
        </span>
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={err('name') ? true : undefined}
        />
        {err('name') && <small className="az-err">{err('name')}</small>}
      </label>
      <div className="az-row">
        <label className="az-field">
          <span>
            Tuğilgan yili <i aria-hidden="true">*</i>
          </span>
          <select
            name="birthYear"
            defaultValue=""
            required
            aria-invalid={err('birthYear') ? true : undefined}
          >
            <option value="" disabled>
              Tanlang
            </option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {err('birthYear') && <small className="az-err">{err('birthYear')}</small>}
        </label>
        <label className="az-field">
          <span>
            Telefon <i aria-hidden="true">*</i>
          </span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+998 90 123 45 67"
            aria-invalid={err('phone') ? true : undefined}
          />
          {err('phone') && <small className="az-err">{err('phone')}</small>}
        </label>
      </div>
      <label className="az-field">
        <span>
          Öqiş yoki iş joyi <i aria-hidden="true">*</i>
        </span>
        <input
          name="place"
          required
          maxLength={200}
          aria-invalid={err('place') ? true : undefined}
        />
        {err('place') && <small className="az-err">{err('place')}</small>}
      </label>
      <fieldset className="vl-pick">
        <legend>
          Yönalişlar <i aria-hidden="true">*</i>
        </legend>
        <div>
          {DIRS.map((d) => (
            <label key={d.id} className="vl-pill">
              <input
                type="checkbox"
                name="dirs"
                value={d.id}
                checked={picked.includes(d.id)}
                onChange={() => toggle(d.id)}
              />
              <span>{d.t}</span>
            </label>
          ))}
        </div>
        {err('dirs') && <small className="az-err">{err('dirs')}</small>}
      </fieldset>
      <label className="az-field">
        <span>Bandlik vaqti</span>
        <select name="time" defaultValue="">
          <option value="">Tanlang</option>
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="az-field">
        <span>Tajriba va qiziqişlar</span>
        <textarea name="about" rows={3} maxLength={1000} />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="az-hp"
        aria-hidden="true"
      />
      <label className="az-check">
        <input type="checkbox" name="agree" required />
        <span>
          Şaxsiy maʼlumotlarim volontyorlik faoliyatini taşkil etiş maqsadida qayta işlanişiga
          roziman.{' '}
          <a href={LAW.url} target="_blank" rel="noopener noreferrer">
            Volontyorlik faoliyati töğrisidagi Qonun
          </a>
        </span>
      </label>
      {err('agree') && <small className="az-err">{err('agree')}</small>}
      {state && !state.ok && <p className="az-msg">{state.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? 'Yuborilmoqda…' : 'Arizani yuboriş'}
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
      </button>
    </form>
  )
}

/**
 * Sahifaning interaktiv qismi: yönalişlar, test va ariza şakli bitta holatga ega —
 * yönaliş yoki test natijasidan “Ariza beriş” bosilsa, şaklda şu yönaliş belgilanib, şaklga ötiladi.
 * `steps` — test va şakl orasidagi “Volontyor böliş tartibi” bölimi (server komponent).
 */
export function VolInteractive({ steps, dirs, page }: { steps: ReactNode; dirs: VolDir[]; page: Page }) {
  const [picked, setPicked] = useState<string[]>([])
  const formRef = useRef<HTMLElement>(null)
  const pick = (id: string) => {
    setPicked((p) => (p.includes(id) ? p : [...p, id]))
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <PageCtx.Provider value={page}>
    <DirsCtx.Provider value={dirs}>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Volontyorlik yönalişlari</h2>
          </div>
          <Directions onPick={pick} />
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Sizga mos yönalişni aniqlang</h2>
          </div>
          <Quiz onPick={pick} />
        </div>
      </section>
      {steps}
      <section className="sec" ref={formRef} id="ariza">
        <div className="wrap vl-form-wrap">
          <div className="vl-form-side">
            <h2 className="h2">Ariza beriş</h2>
            <p>
              Ariza Kengaşda körib çiqiladi. Volontyorlik faoliyatini 16 yoşga tölgan şaxslar amalga
              oşirişi mumkin; favqulodda vaziyatlar yönalişida faqat 18 yoşdan katta volontyorlar
              iştirok etadi.
            </p>
          </div>
          <VolForm picked={picked} setPicked={setPicked} />
        </div>
      </section>
    </DirsCtx.Provider>
    </PageCtx.Provider>
  )
}
