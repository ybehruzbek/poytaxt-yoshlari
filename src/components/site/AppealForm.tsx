'use client'

import { useRef, useState, useTransition } from 'react'

import { type AppealField, type AppealState, submitAppeal } from '@/app/(frontend)/actions/appeal'

const MAX = 10 * 1024 * 1024
const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,.doc,.docx'

/** "Savol, murojaat yoki taklif" shakli — bazaga (admin paneldagi "Murojaatlar") yozadi */
export function AppealForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<AppealState | null>(null)
  const [fileName, setFileName] = useState('')
  const [pending, start] = useTransition()
  const err = (f: AppealField) => state?.errors?.[f]

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const f = fd.get('file')
    if (f instanceof File && f.size > MAX) {
      setState({ ok: false, errors: { file: 'Fayl hajmi 10 MB dan oşmasin.' }, message: 'Iltimos, belgilangan maydonlarni tekşiring.' })
      return
    }
    start(async () => {
      const res = await submitAppeal(fd)
      setState(res)
      if (res.ok) {
        form.reset()
        setFileName('')
      }
    })
  }

  const field = (id: AppealField) => ({
    'aria-invalid': err(id) ? true : undefined,
    'aria-describedby': err(id) ? `af-${id}-err` : undefined,
  })
  const errEl = (id: AppealField) =>
    err(id) ? (
      <small className="cb-err" id={`af-${id}-err`}>
        {err(id)}
      </small>
    ) : null

  return (
    <form ref={formRef} className="cb-form" onSubmit={onSubmit} noValidate>
      <p className="cb-form-title">Murojaat yuboriş</p>

      <fieldset className="cb-types">
        <legend>Murojaat turi</legend>
        {[
          ['savol', 'Savol'],
          ['murojaat', 'Murojaat'],
          ['taklif', 'Taklif'],
        ].map(([v, l], i) => (
          <label key={v}>
            <input type="radio" name="type" value={v} defaultChecked={i === 0} />
            <span>{l}</span>
          </label>
        ))}
      </fieldset>

      <label className="cb-field">
        <span>Ism-familiya <i aria-hidden="true">*</i></span>
        <input name="name" autoComplete="name" required maxLength={120} placeholder="Ism-familiya" {...field('name')} />
        {errEl('name')}
      </label>
      <div className="cb-row">
        <label className="cb-field">
          <span>Telefon <i aria-hidden="true">*</i></span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+998 90 123 45 67" {...field('phone')} />
          {errEl('phone')}
        </label>
        <label className="cb-field">
          <span>Elektron poçta <i aria-hidden="true">*</i></span>
          <input name="email" type="email" autoComplete="email" required placeholder="nom@pochta.uz" {...field('email')} />
          {errEl('email')}
        </label>
      </div>
      <label className="cb-field">
        <span>Xabar <i aria-hidden="true">*</i></span>
        <textarea name="message" rows={3} required maxLength={4000} placeholder="Savolingiz, murojaatingiz yoki taklifingizni yozing" {...field('message')} />
        {errEl('message')}
      </label>

      <label className={`cb-file${fileName ? ' has' : ''}`}>
        <input
          type="file"
          name="file"
          accept={ACCEPT}
          onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? '')}
          {...field('file')}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
        </svg>
        <span>
          <b>{fileName || 'Fayl biriktiriş'}</b>
          <small>{fileName ? 'Boşqa fayl tanlaş uçun bosing' : 'PDF, JPG, PNG, Word · 10 MB gaça (ixtiyoriy)'}</small>
        </span>
      </label>
      {errEl('file')}

      {/* botlar uchun yashirin maydon — odamlar ko'rmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="cb-hp" aria-hidden="true" />

      <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
        {pending ? 'Yuborilmoqda…' : 'Yuboriş'}
        <span className="ic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
      <p className="cb-note"><i aria-hidden="true">*</i> — töldirilişi şart bölgan maydonlar</p>

      {state?.message && (
        <p className={`cb-msg ${state.ok ? 'ok' : 'bad'}`} role={state.ok ? 'status' : 'alert'}>
          {state.message}
        </p>
      )}
    </form>
  )
}
