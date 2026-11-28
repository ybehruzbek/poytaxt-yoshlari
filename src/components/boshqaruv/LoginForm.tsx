'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Icon } from './Icon'

/**
 * Kiriş şakli. Payload'ning öz kiriş manziliga yuboriladi: sessiya cookie'sini Payload qöyadi,
 * xato urinişlar hisobi va hisobni vaqtinça bloklaş ham Payload'da.
 */
export function LoginForm() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true)
    setErr(null)
    try {
      const r = await fetch('/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: String(f.get('email') ?? '').trim(), password: String(f.get('password') ?? '') }),
      })
      if (r.ok) {
        router.replace('/boshqaruv')
        router.refresh()
        return
      }
      const j = (await r.json().catch(() => null)) as { errors?: { message?: string }[] } | null
      const m = j?.errors?.[0]?.message ?? ''
      setErr(
        /lock/i.test(m)
          ? 'Hisob ko‘p marta noto‘g‘ri parol kiritilgani uchun vaqtincha bloklandi. 15 daqiqadan keyin qayta urinib ko‘ring.'
          : r.status === 401
            ? 'Elektron pochta yoki parol noto‘g‘ri.'
            : 'Kirish amalga oshmadi. Birozdan keyin qayta urinib ko‘ring.',
      )
    } catch {
      setErr('Server bilan aloqa yo‘q. Internetni tekshirib, qayta urinib ko‘ring.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <div className="f">
        <label className="lbl" htmlFor="email">
          Elektron pochta
        </label>
        <input className="inp" id="email" name="email" type="email" autoComplete="username" required autoFocus />
      </div>
      <div className="f">
        <label className="lbl" htmlFor="password">
          Parol
        </label>
        <div className="inp-wrap">
          <input className="inp" id="password" name="password" type={show ? 'text' : 'password'} autoComplete="current-password" required />
          <button className="inp-eye" type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Parolni yashirish' : 'Parolni ko‘rsatish'}>
            <Icon name={show ? 'eye-off' : 'eye'} size={18} />
          </button>
        </div>
      </div>
      {err && (
        <p className="err" role="alert">
          {err}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? 'Tekshirilmoqda…' : 'Kirish'}
      </button>
    </form>
  )
}
