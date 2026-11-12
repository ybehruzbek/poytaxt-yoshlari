'use client'

/* eslint-disable @next/next/no-img-element -- galereya suratlari statik webp; CMS ulanganda next/image ga ötadi */
import { useCallback, useEffect, useRef, useState } from 'react'

import { ALBUMS, fullDate, photo, VIDEOS, SHORTS } from './data'

/* ============================================================
   Fotolar oynasi (lightbox): sahifadagi istalgan [data-album] tugma
   bosilganda oçiladi; data-i — boşlanğiç surat (1 dan).
   Klaviatura: ← → — almaştiriş, Esc — yopiş.
   ============================================================ */
export function Lightbox() {
  const dlg = useRef<HTMLDialogElement>(null)
  const [st, setSt] = useState<{ id: number; i: number } | null>(null)
  const album = st ? ALBUMS.find((a) => a.id === st.id) : null

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-album]')
      if (!el) return
      e.preventDefault()
      setSt({ id: Number(el.dataset.album), i: Number(el.dataset.i || 1) })
      dlg.current?.showModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const go = useCallback(
    (d: number) =>
      setSt((s) => {
        if (!s) return s
        const n = ALBUMS.find((a) => a.id === s.id)?.n ?? 1
        return { ...s, i: ((s.i - 1 + d + n) % n) + 1 }
      }),
    [],
  )

  useEffect(() => {
    if (!st) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [st, go])

  // tanlangan kiçik surat körinadigan joyga suriladi
  const strip = useRef<HTMLDivElement>(null)
  useEffect(() => {
    strip.current?.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [st])

  return (
    <dialog ref={dlg} className="ax-lb" aria-label="Fotoalbom" onClose={() => setSt(null)}>
      {album && st && (
        <div className="ax-lb-in">
          <header className="ax-lb-top">
            <div>
              <p className="ax-lb-meta">
                {fullDate(album.date)} · {album.place}
              </p>
              <h2>{album.title}</h2>
            </div>
            <button type="button" className="ax-lb-x" onClick={() => dlg.current?.close()} aria-label="Yopiş">
              ×
            </button>
          </header>
          <figure className="ax-lb-fig">
            <img src={photo(album.id, st.i)} alt={`${album.title} — ${st.i}-surat`} />
            <button type="button" className="ax-lb-nav prev" onClick={() => go(-1)} aria-label="Oldingi surat">
              ‹
            </button>
            <button type="button" className="ax-lb-nav next" onClick={() => go(1)} aria-label="Keyingi surat">
              ›
            </button>
          </figure>
          <div className="ax-lb-bar">
            <span className="ax-lb-count">
              {st.i} / {album.n}
            </span>
            <div className="ax-lb-strip" ref={strip}>
              {Array.from({ length: album.n }, (_, k) => (
                <button
                  key={k}
                  type="button"
                  aria-current={k + 1 === st.i ? true : undefined}
                  aria-label={`${k + 1}-surat`}
                  onClick={() => setSt({ id: album.id, i: k + 1 })}
                >
                  <img src={photo(album.id, k + 1)} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <a className="ax-lb-dl" href={photo(album.id, st.i)} download>
              Yuklab oliş ↓
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}

/* ============================================================
   Video oynasi: [data-video] bosilganda YouTube (nocookie) pleyeri oçiladi.
   Sahifada iframe'lar oldindan yuklanmaydi — faqat muqova (tez yuklaniş).
   ============================================================ */
const YT = { code: 'https://www.youtube-nocookie.com/embed/' }.code
const ALLOW = { code: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen' }.code

export function VideoModal() {
  const dlg = useRef<HTMLDialogElement>(null)
  const [id, setId] = useState<string | null>(null)
  const v = VIDEOS.find((x) => x.id === id)
  const s = SHORTS.find((x) => x.id === id)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-video]')
      if (!el) return
      e.preventDefault()
      setId(el.dataset.video!)
      dlg.current?.showModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <dialog ref={dlg} className={`ax-vm${s ? ' is-short' : ''}`} aria-label="Video" onClose={() => setId(null)}>
      {id && (
        <div className="ax-vm-in">
          <div className="ax-vm-frame">
            <iframe src={`${YT}${id}?autoplay=1&rel=0`} title={v?.title ?? s?.title ?? 'Video'} allow={ALLOW} allowFullScreen />
          </div>
          <div className="ax-vm-bar">
            <p>{v?.title ?? s?.title}</p>
            <button type="button" className="ax-lb-x" onClick={() => dlg.current?.close()} aria-label="Yopiş">
              ×
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}

/** Sahifa ičidagi pleyer: muqova bosilgandagina iframe yuklanadi */
export function InlinePlayer({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false)
  // boşqa video tanlansa, yana muqova körsatiladi
  const [prev, setPrev] = useState(id)
  if (prev !== id) {
    setPrev(id)
    setOn(false)
  }
  return (
    <div className="ax-ip">
      {on ? (
        <iframe src={`${YT}${id}?autoplay=1&rel=0`} title={title} allow={ALLOW} allowFullScreen />
      ) : (
        <button type="button" className="ax-ip-cover" onClick={() => setOn(true)} aria-label={`Köriş: ${title}`}>
          <img src={`/img/axborot/video/${id}.webp`} alt="" />
          <span className="ax-play" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

/* ============================================================
   Saralaş tugmalari: #{target} ičidagi [data-f] elementlarni
   tanlangan qiymat böyiça körsatadi/yaşiradi ('all' — hammasi).
   ============================================================ */
export function Pills({
  target,
  items,
  label,
}: {
  target: string
  items: { v: string; l: string }[]
  label: string
}) {
  const [cur, setCur] = useState('all')
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(`#${target} [data-f]`).forEach((el) => {
      el.hidden = cur !== 'all' && !el.dataset.f!.split(' ').includes(cur)
    })
    // bölim ičidagi barça elementlari yaşiringan guruh sarlavhalari ham yaşiriladi
    document.querySelectorAll<HTMLElement>(`#${target} [data-g]`).forEach((g) => {
      g.hidden = !g.querySelector('[data-f]:not([hidden])')
    })
  }, [cur, target])
  return (
    <div className="ax-pills" role="group" aria-label={label}>
      {[{ v: 'all', l: 'Barçasi' }, ...items].map((it) => (
        <button key={it.v} type="button" aria-pressed={cur === it.v} onClick={() => setCur(it.v)}>
          {it.l}
        </button>
      ))}
    </div>
  )
}

/** Matn böyiça qidiriş: #{target} ičidagi [data-q] elementlar */
export function Search({ target, placeholder }: { target: string; placeholder: string }) {
  const [q, setQ] = useState('')
  useEffect(() => {
    const s = q.trim().toLowerCase()
    document.querySelectorAll<HTMLElement>(`#${target} [data-q]`).forEach((el) => {
      el.classList.toggle('ax-off', !!s && !el.dataset.q!.toLowerCase().includes(s))
    })
  }, [q, target])
  return (
    <label className="ax-search">
      <span className="sr-only">{placeholder}</span>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} />
    </label>
  )
}
