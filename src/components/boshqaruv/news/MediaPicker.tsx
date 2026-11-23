'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'

import { type LibCol, type MediaItem, searchMedia, uploadMedia } from '@/lib/boshqaruv/media-actions'
import { siqish } from '@/lib/boshqaruv/siqish'

import { Icon } from '../Icon'

type Props = { multiple?: boolean; title: string; col?: LibCol; onPick: (items: MediaItem[]) => void; onClose: () => void }

/**
 * Rasm tanlaş oynasi: kompyuterdan yuklaş (tugma yoki sudrab taşlaş, bir neçta fayl birdan) va
 * kutubxonadan qidirib tanlaş. Yuklangan rasm darhol tanlangan bölib turadi.
 */
export function MediaPicker({ multiple, title, col = 'media', onPick, onClose }: Props) {
  const isFile = col === 'files'
  const [items, setItems] = useState<MediaItem[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [picked, setPicked] = useState<MediaItem[]>([])
  const [busy, setBusy] = useState(0)
  const [err, setErr] = useState<string | null>(null)
  const [drag, setDrag] = useState(false)
  const [loading, start] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback((query: string, p: number) => {
    start(async () => {
      const r = await searchMedia(query, p, col)
      setItems((old) => (p === 1 ? r.items : [...old, ...r.items]))
      setHasMore(r.hasMore)
      setPage(p)
    })
  }, [col])

  useEffect(() => {
    const t = setTimeout(() => load(q, 1), q ? 300 : 0)
    return () => clearTimeout(t)
  }, [q, load])

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const toggle = (m: MediaItem) => {
    if (!multiple) {
      setPicked([m])
      return
    }
    setPicked((p) => (p.some((x) => x.id === m.id) ? p.filter((x) => x.id !== m.id) : [...p, m]))
  }

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files).slice(0, multiple ? 24 : 1)
    if (!list.length) return
    setErr(null)
    setBusy((b) => b + list.length)
    for (const f of list) {
      const fd = new FormData()
      // rasm brauzerda siqiladi (2000 px, 2 MB gaça) — yuboriş va serverdagi işlov tezlaşadi
      fd.set('file', col === 'files' ? f : await siqish(f))
      fd.set('col', col)
      const r = await uploadMedia(fd)
      setBusy((b) => b - 1)
      if (!r.ok) {
        setErr(`${f.name}: ${r.message}`)
        continue
      }
      setItems((old) => [r.item, ...old])
      setPicked((p) => (multiple ? [...p, r.item] : [r.item]))
    }
  }

  return (
    <div className="dlg" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={drag ? 'mp is-drag' : 'mp'}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={(e) => e.currentTarget === e.target && setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          upload(e.dataTransfer.files)
        }}
      >
        <div className="mp__head">
          <h2>{title}</h2>
          <button type="button" className="mp__x" onClick={onClose} aria-label="Yopiş">
            <Icon name="x" />
          </button>
        </div>
        <div className="mp__tools">
          <label className="field-search">
            <Icon name="search" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={isFile ? 'Fayl nomi böyiça qidiriş' : 'Rasm tavsifi böyiça qidiriş'} />
          </label>
          <button type="button" className="btn btn-dark" onClick={() => fileRef.current?.click()}>
            <Icon name="upload" size={18} />
            Kompyuterdan yuklaş
          </button>
          <input
            ref={fileRef}
            type="file"
            accept={isFile ? '.pdf,.doc,.docx,.xls,.xlsx' : 'image/*'}
            multiple={multiple}
            hidden
            onChange={(e) => {
              if (e.target.files) upload(e.target.files)
              e.target.value = ''
            }}
          />
        </div>
        {err && (
          <p className="err" role="alert">
            <Icon name="alert" size={18} />
            {err}
          </p>
        )}
        <div className={isFile ? 'mp__grid is-files' : 'mp__grid'}>
          {Array.from({ length: busy }).map((_, i) => (
            <div key={`u${i}`} className="mp__cell is-loading">
              <span>Yuklanmoqda…</span>
            </div>
          ))}
          {items.map((m) => {
            const n = picked.findIndex((x) => x.id === m.id)
            return (
              <button key={m.id} type="button" className={n >= 0 ? 'mp__cell is-on' : 'mp__cell'} onClick={() => toggle(m)} onDoubleClick={() => !multiple && onPick([m])} title={m.alt}>
                {isFile ? (
                  <span className="mp__doc">
                    <Icon name="file" size={22} />
                    <b>{m.alt || m.name}</b>
                    <small>
                      {m.name} · {m.size}
                    </small>
                  </span>
                ) : (
                  <img src={m.thumb} alt="" loading="lazy" />
                )}
                {n >= 0 && <span className="mp__n">{multiple ? n + 1 : <Icon name="check" size={14} />}</span>}
              </button>
            )
          })}
          {!loading && items.length === 0 && busy === 0 && <p className="empty">{isFile ? 'Fayl topilmadi' : 'Rasm topilmadi'}</p>}
          {hasMore && (
            <button type="button" className="btn btn-ghost mp__more" disabled={loading} onClick={() => load(q, page + 1)}>
              {loading ? 'Yuklanmoqda…' : 'Yana körsatiş'}
            </button>
          )}
        </div>
        <div className="mp__foot">
          <span className="mp__hint">{isFile ? 'Faylni' : 'Rasmni'} şu oynaga sudrab taşlaş ham mumkin</span>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Bekor qiliş
          </button>
          <button type="button" className="btn btn-primary" disabled={!picked.length || busy > 0} onClick={() => onPick(picked)}>
            {multiple && picked.length > 1 ? `${picked.length} tasini qöşiş` : 'Tanlaş'}
          </button>
        </div>
      </div>
    </div>
  )
}
