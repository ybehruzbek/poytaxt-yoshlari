'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { changeMyPassword, updateMyName } from '@/lib/boshqaruv/users-actions'

import { Icon } from '../Icon'

/** Hisobim: ismni özgartiriş va parolni almaştiriş (joriy parol talab qilinadi) */
export function MyAccount({ name: n0, email, role }: { name: string; email: string; role: string }) {
  const router = useRouter()
  const [name, setName] = useState(n0)
  const [cur, setCur] = useState('')
  const [next, setNext] = useState('')
  const [again, setAgain] = useState('')
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState<{ t: string; bad?: boolean } | null>(null)
  const [pending, start] = useTransition()

  const say = (t: string, bad?: boolean) => {
    setMsg({ t, bad })
    window.setTimeout(() => setMsg(null), 3500)
  }
  const mismatch = again.length > 0 && again !== next

  return (
    <div className="acct">
      <section className="card">
        <h2 className="acct__h">Shaxsiy ma’lumot</h2>
        <div className="f">
          <label className="lbl" htmlFor="me-name">
            Ism-familiya
          </label>
          <input id="me-name" className="inp" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <dl className="libd__meta">
          <div>
            <dt>Elektron pochta (login)</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Rol</dt>
            <dd>{role}</dd>
          </div>
        </dl>
        {name.trim() !== n0 && (
          <div className="uedit__acts">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  const r = await updateMyName(name)
                  say(r.message, !r.ok)
                  if (r.ok) router.refresh()
                })
              }
            >
              Saqlash
            </button>
          </div>
        )}
      </section>

      <section className="card">
        <h2 className="acct__h">Parolni almashtirish</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (mismatch || !next) return
            start(async () => {
              const r = await changeMyPassword(cur, next)
              say(r.message, !r.ok)
              if (r.ok) {
                setCur('')
                setNext('')
                setAgain('')
              }
            })
          }}
        >
          <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />
          <div className="f">
            <label className="lbl" htmlFor="me-cur">
              Joriy parol
            </label>
            <input id="me-cur" className="inp" type={show ? 'text' : 'password'} autoComplete="current-password" value={cur} onChange={(e) => setCur(e.target.value)} required />
          </div>
          <div className="f">
            <label className="lbl" htmlFor="me-new">
              Yangi parol
            </label>
            <input id="me-new" className="inp" type={show ? 'text' : 'password'} autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} required />
            <p className="help">Kamida 10 belgi, harf ham, raqam ham bo‘lsin.</p>
          </div>
          <div className="f">
            <label className="lbl" htmlFor="me-again">
              Yangi parol (yana bir bor)
            </label>
            <input id="me-again" className={mismatch ? 'inp has-err' : 'inp'} type={show ? 'text' : 'password'} autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} required />
            {mismatch && <p className="f-err">Parollar mos kelmadi</p>}
          </div>
          <label className="switch-row">
            <input type="checkbox" className="switch" checked={show} onChange={(e) => setShow(e.target.checked)} />
            <span>Parollarni ko‘rsatish</span>
          </label>
          <div className="uedit__acts">
            <button type="submit" className="btn btn-primary" disabled={pending || mismatch || !cur || !next}>
              Parolni almashtirish
            </button>
          </div>
        </form>
      </section>

      {msg && (
        <div className={msg.bad ? 'toast is-bad' : 'toast'} role="status">
          <Icon name={msg.bad ? 'alert' : 'check'} size={18} />
          {msg.t}
        </div>
      )}
    </div>
  )
}
