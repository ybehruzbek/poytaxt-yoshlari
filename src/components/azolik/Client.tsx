'use client'

import { useRef, useState, useTransition } from 'react'

import { type MemberField, type MemberState, submitMembership } from '@/app/(frontend)/actions/membership'
import { NET_ERR, safeCall } from '@/lib/net'


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

/* ---------------- Onlayn ariza ---------------- */
export function OnlineForm({ otts, ustavHref, after: AFTER }: { otts: string[]; ustavHref: string; after: string[] }) {
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
        start(async () => setState(await safeCall(() => submitMembership(fd), { ok: false, message: NET_ERR })))
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
        <span className="ic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    </form>
  )
}
