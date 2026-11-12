'use client'

import { type ReactNode, useRef, useState, useTransition } from 'react'

import { type MemberField, type MemberState, submitMembership } from '@/app/(frontend)/actions/membership'
import { DevVariantSwitch, useDevVariant } from '@/components/site/DevVariantSwitch'

import { AFTER, ARIZA } from './data'

/* ---------------- VAQTINCHA: variantlar ---------------- */
const TITLES = ['Yöl-yöriqnoma', 'Onlayn ariza', 'Bosqiçma-bosqiç']

export function AzSwitch({ a, b, c }: { a: ReactNode; b?: ReactNode; c?: ReactNode }) {
  const v = useDevVariant('az', TITLES.length)
  return (
    <>
      {v === 'b' && b ? b : v === 'c' && c ? c : a}
      <DevVariantSwitch name="az" label="Aʼzo böliş" titles={TITLES} />
    </>
  )
}

/** Çop etiş tugmasi (ariza namunasi) */
export function PrintBtn({ label = 'Arizani çop etiş' }: { label?: string }) {
  return (
    <button type="button" className="btn btn-primary" onClick={() => window.print()}>
      {label}
    </button>
  )
}

const MAX_YEAR = new Date().getFullYear() - 14
const MIN_YEAR = new Date().getFullYear() - 30
const YEARS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MAX_YEAR - i)

/** Öqiş / iş joyi tanlovi: OTT röyxati yoki boşqa joy */
function PlaceField({ otts, err }: { otts: string[]; err?: string }) {
  const [v, setV] = useState('')
  return (
    <>
      <label className="az-field">
        <span>
          Öqiş yoki iş joyi <i aria-hidden="true">*</i>
        </span>
        <select name="place" value={v} onChange={(e) => setV(e.target.value)} required aria-invalid={err ? true : undefined}>
          <option value="" disabled>
            Tanlang
          </option>
          {otts.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
          <option value="boshqa">Boşqa taʼlim muassasasi yoki iş joyi</option>
        </select>
      </label>
      {v === 'boshqa' && (
        <label className="az-field">
          <span>
            Taʼlim muassasasi yoki iş joyining nomi <i aria-hidden="true">*</i>
          </span>
          <input name="placeOther" required maxLength={200} />
        </label>
      )}
      {err && <small className="az-err">{err}</small>}
    </>
  )
}

/* ---------------- B — onlayn ariza ---------------- */
export function OnlineForm({ otts, ustavHref }: { otts: string[]; ustavHref: string }) {
  const [state, setState] = useState<MemberState | null>(null)
  const [pending, start] = useTransition()
  const top = useRef<HTMLDivElement>(null)
  const err = (f: MemberField) => state?.errors?.[f]

  if (state?.ok)
    return (
      <div className="az-result" ref={top} role="status">
        <span className="az-result-ic" aria-hidden="true">
          ✓
        </span>
        <h2>Arizangiz qabul qilindi</h2>
        {state.no && (
          <p className="az-result-no">
            Ariza raqami: <b>{state.no}</b>
          </p>
        )}
        <h3>Keyingi bosqiçlar</h3>
        <ol className="az-after">
          {AFTER.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </div>
    )

  return (
    <form
      className="az-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        start(async () => setState(await submitMembership(fd)))
      }}
    >
      <p className="az-form-title">Aʼzolikka ariza</p>
      <label className="az-field">
        <span>
          Familiya, ism, otasining ismi <i aria-hidden="true">*</i>
        </span>
        <input name="name" autoComplete="name" required maxLength={120} aria-invalid={err('name') ? true : undefined} />
        {err('name') && <small className="az-err">{err('name')}</small>}
      </label>
      <div className="az-row">
        <label className="az-field">
          <span>
            Tuğilgan yili <i aria-hidden="true">*</i>
          </span>
          <select name="birthYear" defaultValue="" required aria-invalid={err('birthYear') ? true : undefined}>
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
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+998 90 123 45 67" aria-invalid={err('phone') ? true : undefined} />
          {err('phone') && <small className="az-err">{err('phone')}</small>}
        </label>
      </div>
      <label className="az-field">
        <span>Elektron poçta</span>
        <input name="email" type="email" autoComplete="email" aria-invalid={err('email') ? true : undefined} />
        {err('email') && <small className="az-err">{err('email')}</small>}
      </label>
      <PlaceField otts={otts} err={err('place')} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="az-hp" aria-hidden="true" />
      <label className="az-check">
        <input type="checkbox" name="agree" required />
        <span>
          <a href={ustavHref} target="_blank" rel="noopener noreferrer">
            Ittifoq Ustavi
          </a>{' '}
          bilan tanişdim, uning maqsadlarini qöllab-quvvatlayman va aʼzolik majburiyatlarini bajarişni zimmamga olaman.
        </span>
      </label>
      {err('agree') && <small className="az-err">{err('agree')}</small>}
      {state && !state.ok && <p className="az-msg">{state.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? 'Yuborilmoqda…' : 'Arizani yuboriş'}
      </button>
    </form>
  )
}

/* ---------------- C — bosqiçma-bosqiç ---------------- */
const fmtToday = () => {
  const m = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
  const d = new Date()
  return `${d.getFullYear()}-yil ${d.getDate()}-${m[d.getMonth()]}`
}

export function Wizard({ otts }: { otts: string[] }) {
  const [step, setStep] = useState(1)
  const [year, setYear] = useState('')
  const [civ, setCiv] = useState('')
  const [place, setPlace] = useState('')
  const [other, setOther] = useState('')
  const [name, setName] = useState('')
  const age = year ? new Date().getFullYear() - Number(year) : 0
  const okAge = age >= 14 && age <= 30
  const okCiv = civ === 'fuqaro' || civ === 'apatrid'
  const org = place === 'boshqa' ? other.trim() : place
  const LABELS = ['Moslik', 'Öqiş yoki iş joyi', 'Ariza']

  return (
    <div className="az-wiz">
      <ol className="az-wiz-bar" aria-label="Bosqiçlar">
        {LABELS.map((l, i) => (
          <li key={l} className={step === i + 1 ? 'on' : step > i + 1 ? 'done' : undefined} aria-current={step === i + 1 ? 'step' : undefined}>
            <span>{i + 1}</span>
            {l}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <section className="az-wiz-card">
          <h2>Aʼzolik şartlariga mosligingizni tekşiring</h2>
          <div className="az-row">
            <label className="az-field">
              <span>Tuğilgan yilingiz</span>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="" disabled>
                  Tanlang
                </option>
                {Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - 10 - i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label className="az-field">
              <span>Fuqarolik</span>
              <select value={civ} onChange={(e) => setCiv(e.target.value)}>
                <option value="" disabled>
                  Tanlang
                </option>
                <option value="fuqaro">Özbekiston Respublikasi fuqarosi</option>
                <option value="apatrid">Özbekistonda muntazam yaşab kelayotgan fuqaroligi bölmagan şaxs</option>
                <option value="xorijiy">Boşqa davlat fuqarosi</option>
              </select>
            </label>
          </div>
          {year && civ && (
            <p className={`az-verdict${okAge && okCiv ? ' ok' : ''}`} role="status">
              {okAge && okCiv
                ? 'Siz Ittifoqqa aʼzo bölişingiz mumkin (Ustavning 4.2-bandi).'
                : !okAge
                  ? 'Ittifoqqa 14 yoşga tölgan va 30 yoşdan oşmagan şaxslar aʼzo bölişi mumkin (Ustavning 4.2-bandi).'
                  : 'Ittifoqqa Özbekiston Respublikasi fuqarolari va Özbekistonda muntazam yaşab kelayotgan fuqaroligi bölmagan şaxslar aʼzo bölişi mumkin (Ustavning 4.2-bandi).'}
            </p>
          )}
          <div className="az-wiz-nav">
            <button type="button" className="btn btn-primary" disabled={!(okAge && okCiv)} onClick={() => setStep(2)}>
              Davom etiş
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="az-wiz-card">
          <h2>Öqiş yoki iş joyingizni tanlang</h2>
          <p className="az-wiz-note">Ariza öqiş yoki iş joyingizdagi Ittifoq boşlanğiç taşkilotiga taqdim etiladi (Ustavning 4.1-bandi).</p>
          <label className="az-field">
            <span>Öqiş yoki iş joyi</span>
            <select value={place} onChange={(e) => setPlace(e.target.value)}>
              <option value="" disabled>
                Tanlang
              </option>
              {otts.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              <option value="boshqa">Boşqa taʼlim muassasasi yoki iş joyi</option>
            </select>
          </label>
          {place === 'boshqa' && (
            <label className="az-field">
              <span>Taʼlim muassasasi yoki iş joyining nomi</span>
              <input value={other} onChange={(e) => setOther(e.target.value)} maxLength={200} />
            </label>
          )}
          <div className="az-wiz-nav">
            <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
              Ortga
            </button>
            <button type="button" className="btn btn-primary" disabled={org.length < 3} onClick={() => setStep(3)}>
              Davom etiş
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="az-wiz-card">
          <h2>Arizangiz tayyor</h2>
          <label className="az-field az-noprint">
            <span>Familiya, ism, otasining ismi</span>
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} autoComplete="name" />
          </label>
          <div className="az-print">
            <article className="az-doc" aria-label="Ariza">
              <div className="az-doc-to">
                <p>{ARIZA.to(org)}</p>
                <p>{ARIZA.from(name.trim())}</p>
              </div>
              <h3>ARIZA</h3>
              <p className="az-doc-body">{ARIZA.body}</p>
              <div className="az-doc-sign">
                <span>Sana: {fmtToday()}</span>
                <span>Imzo: ______________</span>
              </div>
            </article>
          </div>
          <ol className="az-after az-noprint">
            <li>Arizani çop eting va imzolang.</li>
            <li>Uni {org} Ittifoq boşlanğiç taşkiloti yetakçisiga topşiring.</li>
            <li>Ariza boşlanğiç taşkilotning Umumiy yiğilişida (Kengaş yiğilişida) körib çiqiladi; uning qarori yakuniy hisoblanadi (Ustavning 4.4–4.5-bandlari).</li>
          </ol>
          <div className="az-wiz-nav az-noprint">
            <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
              Ortga
            </button>
            <button type="button" className="btn btn-primary" disabled={name.trim().length < 5} onClick={() => window.print()}>
              Çop etiş yoki PDF saqlaş
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
