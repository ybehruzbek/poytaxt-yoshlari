'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import type { UserRow } from '@/lib/boshqaruv/users'
import { createUser, deleteUser, setUserPassword, unlockUser, updateUser } from '@/lib/boshqaruv/users-actions'

import { Icon } from '../Icon'
import { makePassword } from './pw'

const ROLES = [
  { v: 'admin', t: 'Administrator', d: 'Hamma narsa, jumladan foydalanuvçilar va öçiriş' },
  { v: 'muharrir', t: 'Muharrir', d: 'Yangiliklar, bölimlar va sahifa matnlari' },
  { v: 'operator', t: 'Operator', d: 'Faqat kiruvçi murojaat va arizalar' },
]
const TONE: Record<string, string> = { admin: 't-brown', muharrir: 't-blue', operator: 't-green' }

function RolePick({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="roles" role="radiogroup" aria-label="Rol">
      {ROLES.map((r) => (
        <button key={r.v} type="button" role="radio" aria-checked={value === r.v} aria-label={`${r.t}: ${r.d}`} className={value === r.v ? 'is-act' : undefined} onClick={() => onChange(r.v)}>
          <b>{r.t}</b>
          <small>{r.d}</small>
        </button>
      ))}
    </div>
  )
}

function PasswordInput({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="pw-row">
      <input id={id} className="inp" type="text" autoComplete="new-password" spellCheck={false} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Kamida 10 belgi, harf va raqam" />
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange(makePassword())}>
        Yasaş
      </button>
    </div>
  )
}

/** Xodimlar röyxati: qöşiş, rol va ismni özgartiriş, yangi parol beriş, bloklanişdan çiqariş, öçiriş */
export function UsersPanel({ users, meId }: { users: UserRow[]; meId: number }) {
  const router = useRouter()
  const [open, setOpen] = useState<number | 'new' | null>(null)
  const [f, setF] = useState({ name: '', email: '', role: 'muharrir', password: '' })
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [msg, setMsg] = useState<{ t: string; bad?: boolean } | null>(null)
  const [pending, start] = useTransition()

  const say = (t: string, bad?: boolean) => {
    setMsg({ t, bad })
    window.setTimeout(() => setMsg(null), 3500)
  }
  const toggle = (id: number | 'new') => {
    setConfirm(false)
    setPw('')
    if (open === id) return setOpen(null)
    setOpen(id)
    const u = users.find((x) => x.id === id)
    setF(u ? { name: u.name, email: u.email, role: u.role, password: '' } : { name: '', email: '', role: 'muharrir', password: '' })
  }
  const run = (fn: () => Promise<{ ok: boolean; message: string }>, close = false) =>
    start(async () => {
      const r = await fn()
      say(r.message, !r.ok)
      if (r.ok) {
        if (close) setOpen(null)
        setPw('')
        router.refresh()
      }
    })

  return (
    <>
      <div className="users-head">
        <span className="count-note">Jami: {users.length}</span>
        <button type="button" className="btn btn-primary" onClick={() => toggle('new')}>
          <Icon name="plus" size={18} />
          Foydalanuvçi qöşiş
        </button>
      </div>

      {open === 'new' && (
        <section className="card uedit">
          <h2>Yangi foydalanuvçi</h2>
          <div className="f-row">
            <div className="f">
              <label className="lbl" htmlFor="u-name">
                Ism-familiya<span className="req">*</span>
              </label>
              <input id="u-name" className="inp" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            </div>
            <div className="f">
              <label className="lbl" htmlFor="u-email">
                Elektron poçta<span className="req">*</span>
              </label>
              <input id="u-email" className="inp" type="email" autoComplete="off" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </div>
          </div>
          <div className="f">
            <span className="lbl">Rol</span>
            <RolePick value={f.role} onChange={(role) => setF({ ...f, role })} />
          </div>
          <div className="f">
            <label className="lbl" htmlFor="u-pw">
              Boşlanğiç parol<span className="req">*</span>
            </label>
            <PasswordInput id="u-pw" value={f.password} onChange={(password) => setF({ ...f, password })} />
            <p className="help">Parolni xodimga şaxsan bering. Xodim birinçi kirgandan keyin uni “Hisobim” sahifasida almaştiradi.</p>
          </div>
          <div className="uedit__acts">
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(null)}>
              Bekor qiliş
            </button>
            <button type="button" className="btn btn-primary" disabled={pending} onClick={() => run(() => createUser(f), true)}>
              Qöşiş
            </button>
          </div>
        </section>
      )}

      <ul className="users">
        {users.map((u) => (
          <li key={u.id} className={open === u.id ? 'is-open' : undefined}>
            <button type="button" className="urow" onClick={() => toggle(u.id)} aria-expanded={open === u.id}>
              <span className="ava">
                {u.name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w.replace(/^[^\p{L}]+/u, '')[0] ?? '')
                  .join('')
                  .toLocaleUpperCase('uz')}
              </span>
              <span className="urow__t">
                <b>
                  {u.name}
                  {u.id === meId && <em> (siz)</em>}
                </b>
                <small>{u.email}</small>
              </span>
              {u.locked && <span className="pill t-orange">Bloklangan</span>}
              <span className={`pill no-dot ${TONE[u.role]}`}>{ROLES.find((r) => r.v === u.role)?.t}</span>
              <Icon name="chev" size={16} className={open === u.id ? 'rot90' : undefined} />
            </button>
            {open === u.id && (
              <div className="uedit">
                <div className="f">
                  <label className="lbl" htmlFor={`n-${u.id}`}>
                    Ism-familiya
                  </label>
                  <input id={`n-${u.id}`} className="inp" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                </div>
                <div className="f">
                  <span className="lbl">Rol</span>
                  <RolePick value={f.role} onChange={(role) => setF({ ...f, role })} />
                </div>
                {(f.name !== u.name || f.role !== u.role) && (
                  <div className="uedit__acts">
                    <button type="button" className="btn btn-primary btn-sm" disabled={pending} onClick={() => run(() => updateUser(u.id, f))}>
                      Saqlaş
                    </button>
                  </div>
                )}
                <div className="f">
                  <label className="lbl" htmlFor={`p-${u.id}`}>
                    Yangi parol beriş
                  </label>
                  <PasswordInput id={`p-${u.id}`} value={pw} onChange={setPw} />
                  <p className="help">Xodim parolini unutganda. Yangi parol örnatilganda hisob bloklangan bölsa ham oçiladi.</p>
                  {pw && (
                    <div className="uedit__acts">
                      <button type="button" className="btn btn-primary btn-sm" disabled={pending} onClick={() => run(() => setUserPassword(u.id, pw))}>
                        Parolni örnatiş
                      </button>
                    </div>
                  )}
                </div>
                <div className="uedit__foot">
                  {u.locked && (
                    <button type="button" className="btn btn-ghost btn-sm" disabled={pending} onClick={() => run(() => unlockUser(u.id))}>
                      Bloklanişdan çiqariş
                    </button>
                  )}
                  {u.id !== meId &&
                    (confirm ? (
                      <span className="pub-confirm">
                        Hisob öçirilsinmi?
                        <button type="button" className="btn btn-sm btn-red" disabled={pending} onClick={() => run(() => deleteUser(u.id), true)}>
                          Ha, öçiriş
                        </button>
                        <button type="button" className="btn btn-sm btn-ghost" onClick={() => setConfirm(false)}>
                          Yöq
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="ix__del" onClick={() => setConfirm(true)}>
                        <Icon name="trash" size={16} />
                        Hisobni öçiriş
                      </button>
                    ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {msg && (
        <div className={msg.bad ? 'toast is-bad' : 'toast'} role="status">
          <Icon name={msg.bad ? 'alert' : 'check'} size={18} />
          {msg.t}
        </div>
      )}
    </>
  )
}
