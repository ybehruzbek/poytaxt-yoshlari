'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import type { InboxItem } from '@/lib/boshqaruv/inbox'
import { deleteInboxItem, saveInboxNote, setInboxStatus } from '@/lib/boshqaruv/inbox-actions'
import type { StatusOpt } from '@/lib/boshqaruv/inbox-config'

import { Icon } from '../Icon'

/** Matn xatosini atrofidagi matn içida belgilab körsatadi */
function Highlight({ text, context }: { text: string; context: string }) {
  const i = context ? context.indexOf(text) : -1
  if (i < 0) return <mark>{text}</mark>
  return (
    <>
      {context.slice(0, i)}
      <mark>{text}</mark>
      {context.slice(i + text.length)}
    </>
  )
}

/** Tanlangan xabar: holatni bir bosişda almaştiriş, aloqa maʼlumotlari (nusxa oliş), matn, fayl, içki izoh */
export function InboxDetail({ item, statuses, isAdmin, backHref }: { item: InboxItem; statuses: StatusOpt[]; isAdmin: boolean; backHref: string }) {
  const router = useRouter()
  const [status, setStatus] = useState(item.status)
  const [note, setNote] = useState(item.note ?? '')
  const [savedNote, setSavedNote] = useState(item.note ?? '')
  const [toast, setToast] = useState<{ t: string; bad?: boolean } | null>(null)
  const [confirmDel, setConfirmDel] = useState(false)
  const [pending, start] = useTransition()

  const say = (t: string, bad?: boolean) => {
    setToast({ t, bad })
    window.setTimeout(() => setToast(null), 3000)
  }

  const changeStatus = (v: string) => {
    if (v === status) return
    const prev = status
    setStatus(v) // darhol körinadi, xato bölsa qaytariladi
    start(async () => {
      const r = await setInboxStatus(item.slug, item.id, v)
      if (!r.ok) setStatus(prev)
      say(r.message, !r.ok)
      router.refresh()
    })
  }

  const saveNote = () =>
    start(async () => {
      const r = await saveInboxNote(item.slug, item.id, note)
      if (r.ok) setSavedNote(note)
      say(r.message, !r.ok)
    })

  const remove = () =>
    start(async () => {
      const r = await deleteInboxItem(item.slug, item.id)
      if (r.ok) router.replace(backHref)
      else say(r.message, true)
    })

  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v)
      say('Nusxa olindi')
    } catch {
      say('Nusxa olib bölmadi', true)
    }
  }

  const te = item.textError
  return (
    <article className="card ix">
      <Link href={backHref} className="ix__back" scroll={false}>
        <Icon name="chev" size={16} className="flip" />
        Röyxatga qaytiş
      </Link>
      <header className="ix__head">
        <div>
          <h2>{item.title}</h2>
          <p>
            {item.created}
            {item.tag && <span className={`pill no-dot t-${item.tag.tone}`}>{item.tag.t}</span>}
          </p>
        </div>
      </header>

      <div className="ix__status" role="radiogroup" aria-label="Holati">
        {statuses.map((s) => (
          <button key={s.v} type="button" role="radio" aria-checked={status === s.v} className={status === s.v ? `is-act t-${s.tone}` : undefined} disabled={pending} onClick={() => changeStatus(s.v)}>
            {status === s.v && <Icon name="check" size={14} />}
            {s.t}
          </button>
        ))}
      </div>

      {item.fields.length > 0 && (
        <dl className="ix__fields">
          {item.fields.map((f) => (
            <div key={f.t}>
              <dt>{f.t}</dt>
              <dd>
                {f.href ? <a href={f.href}>{f.v}</a> : f.v}
                {f.copy && (
                  <button type="button" className="ix__copy" onClick={() => copy(f.v)} title="Nusxa oliş" aria-label={`${f.t}: nusxa oliş`}>
                    <Icon name="copy" size={14} />
                  </button>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {item.body && (
        <div className="ix__block">
          <h3>{item.body.t}</h3>
          <p className="ix__body">{item.body.v}</p>
        </div>
      )}

      {te && (
        <div className="ix__block">
          <h3>Belgilangan matn</h3>
          <p className="ix__body ix__te">
            <Highlight text={te.text} context={te.context} />
          </p>
          {te.comment && (
            <>
              <h3>Foydalanuvçi izohi</h3>
              <p className="ix__body">{te.comment}</p>
            </>
          )}
          <a className="btn btn-ghost btn-sm" href={te.page} target="_blank" rel="noopener noreferrer">
            <Icon name="ext" size={16} />
            Sahifani oçiş
          </a>
        </div>
      )}

      {item.file && (
        <div className="ix__block">
          <h3>Biriktirilgan fayl</h3>
          <a className="ix__file" href={item.file.url} target="_blank" rel="noopener noreferrer">
            <Icon name="file" size={22} />
            <span>
              <b>{item.file.name}</b>
              <small>{item.file.size}</small>
            </span>
            <Icon name="ext" size={16} />
          </a>
        </div>
      )}

      {item.note !== null && (
        <div className="ix__block">
          <h3>
            Içki izoh <small>faqat xodimlar köradi</small>
          </h3>
          <textarea className="inp" rows={3} value={note} maxLength={5000} placeholder="Masalan: 18-noyabr kuni telefon orqali boğlanildi" onChange={(e) => setNote(e.target.value)} />
          {note !== savedNote && (
            <div className="ix__note-acts">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setNote(savedNote)}>
                Bekor qiliş
              </button>
              <button type="button" className="btn btn-primary btn-sm" disabled={pending} onClick={saveNote}>
                Izohni saqlaş
              </button>
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <footer className="ix__foot">
          {confirmDel ? (
            <span className="pub-confirm">
              Butunlay öçirilsinmi? Qaytariş imkoni yöq.
              <button type="button" className="btn btn-sm btn-red" disabled={pending} onClick={remove}>
                Ha, öçiriş
              </button>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => setConfirmDel(false)}>
                Yöq
              </button>
            </span>
          ) : (
            <button type="button" className="ix__del" onClick={() => setConfirmDel(true)}>
              <Icon name="trash" size={16} />
              Öçiriş
            </button>
          )}
        </footer>
      )}

      {toast && (
        <div className={toast.bad ? 'toast is-bad' : 'toast'} role="status">
          <Icon name={toast.bad ? 'alert' : 'check'} size={18} />
          {toast.t}
        </div>
      )}
    </article>
  )
}
