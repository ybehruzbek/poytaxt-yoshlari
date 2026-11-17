'use client'

/* eslint-disable @next/next/no-img-element -- galereya suratlari statik webp; CMS ulanganda next/image ga ötadi */
import { useCallback, useEffect, useRef, useState } from 'react'

import { MoreToggle } from '@/components/site/MoreToggle'

import { type Album, fullDate, photo, thumb } from './data'
import { smoothScroll } from '@/lib/scroll'

/* ============================================================
   Fotolar oynasi (lightbox): sahifadagi istalgan [data-album] tugma
   bosilganda oçiladi; data-i — boşlanğiç surat (1 dan).
   Klaviatura: ← → — almaştiriş, Esc — yopiş.
   ============================================================ */
export function Lightbox({ albums: ALBUMS }: { albums: Album[] }) {
  const dlg = useRef<HTMLDialogElement>(null)
  const [st, setSt] = useState<{ id: number; i: number } | null>(null)
  const album = st ? ALBUMS.find((a) => a.id === st.id) : null
  // joriy surat yuklanguncha örnida skelet turadi (surat almaşganda boş ekran körinmaydi)
  const [ready, setReady] = useState('')
  const cur = st ? `${st.id}-${st.i}` : ''

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
    [ALBUMS],
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

  const sx = useRef(0)
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
          <figure
            className="ax-lb-fig"
            data-wait={ready !== cur || undefined}
            onPointerDown={(e) => (sx.current = e.clientX)}
            onPointerUp={(e) => {
              const d = e.clientX - sx.current
              if (Math.abs(d) > 50) go(d < 0 ? 1 : -1)
            }}
          >
            {ready !== cur && <span className="sk ax-lb-sk" aria-hidden="true" />}
            <img
              key={st.i}
              src={photo(album, st.i)}
              alt={`${album.title} — ${st.i}-surat`}
              draggable={false}
              onLoad={() => setReady(cur)}
              onError={() => setReady(cur)}
            />
            {/* qöşni suratlar oldindan yuklanadi — almaştirişda kutiş bölmaydi */}
            <link rel="preload" as="image" href={photo(album, (st.i % album.n) + 1)} />
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
                  <img src={photo(album, k + 1)} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <a className="ax-lb-dl" href={photo(album, st.i)} download>
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
  const [st, setSt] = useState<{ id: string; title: string; short: boolean } | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-video]')
      if (!el) return
      e.preventDefault()
      setSt({ id: el.dataset.video!, title: el.dataset.title ?? 'Video', short: 'short' in el.dataset })
      dlg.current?.showModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <dialog ref={dlg} className={`ax-vm${st?.short ? ' is-short' : ''}`} aria-label="Video" onClose={() => setSt(null)}>
      {st && (
        <div className="ax-vm-in">
          <div className="ax-vm-frame">
            <iframe src={`${YT}${st.id}?autoplay=1&rel=0`} title={st.title} allow={ALLOW} allowFullScreen />
          </div>
          <div className="ax-vm-bar">
            <p>{st.title}</p>
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
          <img src={thumb(id)} alt="" loading="lazy" decoding="async" />
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
  items: { v: string; l: string; n?: number }[]
  label: string
}) {
  const [cur, setCur] = useState('all')
  useEffect(() => {
    // saralanganda “Köproq körsatiş” bilan yaşirilganlar ham körinadi
    document.getElementById(target)?.classList.toggle('is-f1', cur !== 'all')
    document.querySelectorAll<HTMLElement>(`#${target} [data-f]`).forEach((el) => {
      el.hidden = cur !== 'all' && !el.dataset.f!.split(' ').includes(cur)
    })
    // bölim ičidagi barça elementlari yaşiringan guruh sarlavhalari ham yaşiriladi
    document.querySelectorAll<HTMLElement>(`#${target} [data-g]`).forEach((g) => {
      g.hidden = !g.querySelector('[data-f]:not([hidden])')
    })
  }, [cur, target])
  return (
    <div className="chips ax-pills" role="group" aria-label={label}>
      {[{ v: 'all', l: 'Barçasi', n: undefined as number | undefined }, ...items].map((it) => (
        <button key={it.v} type="button" aria-pressed={cur === it.v} onClick={() => setCur(it.v)}>
          {it.l}
          {it.n !== undefined && <span className="ax-pill-n">{it.n}</span>}
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
    document.getElementById(target)?.classList.toggle('is-f2', !!s)
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

/** “Köproq körsatiş”: #{target} ičidagi .ax-cut elementlarni oçadi */
export function ShowMore({ target, rest }: { target: string; rest: number }) {
  const [open, setOpen] = useState(false)
  if (rest <= 0) return null
  const set = (v: boolean) => {
    const el = document.getElementById(target)
    el?.classList.toggle('is-all', v)
    setOpen(v)
    if (!v) smoothScroll(el, { block: 'start' })
  }
  return (
    <div className="ax-showmore">
      <MoreToggle rest={open ? 0 : rest} noun="albom" controls={target} onMore={() => set(true)} onLess={() => set(false)} />
    </div>
  )
}
