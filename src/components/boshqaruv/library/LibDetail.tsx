'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import type { LibItem, Usage } from '@/lib/boshqaruv/library'
import { deleteLibItem, renameLibItem } from '@/lib/boshqaruv/library-actions'

import { Icon } from '../Icon'

/** Tanlangan fayl: körinişi, tavsifi (saytda körinadi), ölçami, havolasi va qayerda işlatilgani */
export function LibDetail({ kind, item, usage, isAdmin, backHref }: { kind: 'media' | 'files'; item: LibItem; usage: Usage[]; isAdmin: boolean; backHref: string }) {
  const router = useRouter()
  const [alt, setAlt] = useState(item.alt)
  const [saved, setSaved] = useState(item.alt)
  const [msg, setMsg] = useState<{ t: string; bad?: boolean } | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [pending, start] = useTransition()
  const isFile = kind === 'files'

  const say = (t: string, bad?: boolean) => {
    setMsg({ t, bad })
    window.setTimeout(() => setMsg(null), 3000)
  }
  const save = () =>
    start(async () => {
      const r = await renameLibItem(kind, item.id, alt)
      if (r.ok) setSaved(alt.trim())
      say(r.message, !r.ok)
      router.refresh()
    })
  const remove = () =>
    start(async () => {
      const r = await deleteLibItem(kind, item.id)
      if (r.ok) router.replace(backHref)
      else say(r.message, true)
    })
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(new URL(item.url, window.location.origin).toString())
      say('Havola nusxalandi')
    } catch {
      say('Nusxa olib bölmadi', true)
    }
  }

  return (
    <article className="card libd">
      <Link href={backHref} className="ix__back" scroll={false}>
        <Icon name="chev" size={16} className="flip" />
        Kutubxonaga qaytiş
      </Link>
      {isFile ? (
        <a className="libd__doc" href={item.url} target="_blank" rel="noopener noreferrer">
          <Icon name="file" size={36} />
          <b>{item.name}</b>
          <span>Oçiş</span>
        </a>
      ) : (
        <a className="libd__img" href={item.url} target="_blank" rel="noopener noreferrer">
          <img src={item.url} alt={item.alt} />
        </a>
      )}

      <div className="f">
        <label className="lbl" htmlFor="lib-alt">
          {isFile ? 'Fayl nomi (saytda körinadi)' : 'Rasm tavsifi'}
          <span className="req">*</span>
        </label>
        <textarea id="lib-alt" className="inp" rows={2} value={alt} onChange={(e) => setAlt(e.target.value)} />
        {!isFile && <p className="help">Rasmni köra olmaydiganlar uçun ekran öquvçi şu matnni öqiydi. Rasmda nima tasvirlanganini qisqa yozing.</p>}
        {alt.trim() !== saved && (
          <div className="ix__note-acts">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAlt(saved)}>
              Bekor qiliş
            </button>
            <button type="button" className="btn btn-primary btn-sm" disabled={pending} onClick={save}>
              Saqlaş
            </button>
          </div>
        )}
      </div>

      <dl className="libd__meta">
        <div>
          <dt>Fayl</dt>
          <dd>{item.name}</dd>
        </div>
        {item.dims && (
          <div>
            <dt>Ölçami</dt>
            <dd>{item.dims}</dd>
          </div>
        )}
        <div>
          <dt>Hajmi</dt>
          <dd>{item.size}</dd>
        </div>
        <div>
          <dt>Yuklangan</dt>
          <dd>{item.when}</dd>
        </div>
      </dl>
      <button type="button" className="btn btn-ghost btn-sm libd__copy" onClick={copy}>
        <Icon name="copy" size={16} />
        Havolani nusxalaş
      </button>

      <div className="ix__block">
        <h3>
          Qayerda işlatilgan <small>{usage.length ? `${usage.length} joyda` : 'heç qayerda'}</small>
        </h3>
        {usage.length > 0 ? (
          <ul className="libd__use">
            {usage.map((u, i) => (
              <li key={i}>
                <Link href={u.href}>
                  <small>{u.where}</small>
                  <b>{u.title}</b>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="help">Bu fayl saytning heç bir sahifasida işlatilmagan.</p>
        )}
      </div>

      {isAdmin && (
        <footer className="ix__foot">
          {usage.length > 0 ? (
            <p className="help">Işlatilgan faylni öçirib bölmaydi — avval yuqoridagi sahifalardan olib taşlang.</p>
          ) : confirm ? (
            <span className="pub-confirm">
              Butunlay öçirilsinmi?
              <button type="button" className="btn btn-sm btn-red" disabled={pending} onClick={remove}>
                Ha, öçiriş
              </button>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => setConfirm(false)}>
                Yöq
              </button>
            </span>
          ) : (
            <button type="button" className="ix__del" onClick={() => setConfirm(true)}>
              <Icon name="trash" size={16} />
              Öçiriş
            </button>
          )}
        </footer>
      )}

      {msg && (
        <div className={msg.bad ? 'toast is-bad' : 'toast'} role="status">
          <Icon name={msg.bad ? 'alert' : 'check'} size={18} />
          {msg.t}
        </div>
      )}
    </article>
  )
}
