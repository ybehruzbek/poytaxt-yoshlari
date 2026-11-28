'use client'
/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */

import { useEffect, useState, useSyncExternalStore, useTransition } from 'react'

import {
  type ReactionCounts,
  type RatingStats,
  rateNews,
  reactNews,
} from '@/app/(frontend)/actions/rating'
import type { ReactionKind } from '@/collections/NewsReactions'
import { NET_ERR, safeCall } from '@/lib/net'

const TG = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21.5 4.3 2.9 11.5c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8l3.3-15.4c.3-1.3-.5-1.9-1.4-1.4ZM8.9 14.2l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4-1.6-4.9Z" />
  </svg>
)
const FB = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 8V6.3c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.8 2 14.8 2 12.6 2 11 3.4 11 5.9V8H8.6v3H11v11h3V11h2.6l.4-3H14Z" />
  </svg>
)
const LINK = (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
  </svg>
)

/** Röyxatga qaytiş: öqib kelingan bölsa — öşa joyga, aks holda yangiliklar sahifasiga */
export function BackBtn({ href, label }: { href: string; label: string }) {
  /** röyxatdan kelingan bölsa — brauzer tarixi böyiça öşa joyga qaytamiz */
  const cameFromList = () => {
    try {
      const ref = document.referrer
      return (
        !!ref &&
        new URL(ref).origin === window.location.origin &&
        new URL(ref).pathname.startsWith(href)
      )
    } catch {
      return false
    }
  }
  return (
    <a
      className="ar-back"
      href={href}
      onClick={(e) => {
        if (!cameFromList()) return
        e.preventDefault()
        window.history.back()
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 5 8 12l7 7" />
      </svg>
      {label}
    </a>
  )
}

/** Ulaşiş tugmalari: Telegram, Facebook, havolani nusxalaş */
export function Share({
  url,
  title,
  label,
  vertical = false,
}: {
  url: string
  title: string
  label?: string
  vertical?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const full = () =>
    typeof window === 'undefined' ? url : new URL(url, window.location.origin).href
  const open = (href: string) =>
    window.open(href, '_blank', 'noopener,noreferrer,width=640,height=560')
  return (
    <div className={`ar-share${vertical ? ' v' : ''}`} role="group" aria-label="Ulashish">
      {label && <span className="ar-share-l">{label}</span>}
      <button
        type="button"
        aria-label="Telegram’da ulashish"
        onClick={() =>
          open(
            `https://t.me/share/url?url=${encodeURIComponent(full())}&text=${encodeURIComponent(title)}`,
          )
        }
      >
        {TG}
      </button>
      <button
        type="button"
        aria-label="Facebook’da ulashish"
        onClick={() =>
          open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(full())}`)
        }
      >
        {FB}
      </button>
      <button
        type="button"
        aria-label="Havolani nusxalash"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(full())
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch {
            /* nusxalab bölmadi — heç narsa qilinmaydi */
          }
        }}
      >
        {LINK}
      </button>
      <span className="ar-share-ok" role="status">
        {copied ? 'Havola nusxalandi' : ''}
      </span>
    </div>
  )
}

const noSub = () => () => {}

/**
 * “Maqolaga baho beriş”: 5 ta yulduz. Baho serverda saqlanadi (bir tomonidan bitta, qayta bosilsa yangilanadi);
 * soni va örtaça baho darhol yangilanadi. Tanlangan baho şu brauzerda eslab qolinadi.
 */
export function RateStars({ newsId, initial }: { newsId: number; initial: RatingStats }) {
  const key = `baho-${newsId}`
  const [stats, setStats] = useState(initial)
  // brauzerda saqlangan baho (serverda — 0, şunda çiziliş mos keladi)
  const stored = useSyncExternalStore(
    noSub,
    () => {
      try {
        return Number(localStorage.getItem(key)) || 0
      } catch {
        return 0
      }
    },
    () => 0,
  )
  const [picked, setMine] = useState(0)
  const mine = picked || stored
  const [hover, setHover] = useState(0)
  const [msg, setMsg] = useState('')
  const [pending, start] = useTransition()
  const shown = hover || mine

  const rate = (v: number) =>
    start(async () => {
      const r = await safeCall(() => rateNews(newsId, v), { ok: false, message: NET_ERR })
      if (r.ok && r.stats) {
        setStats(r.stats)
        setMine(v)
        setMsg('Bahoyingiz qabul qilindi')
        try {
          localStorage.setItem(key, String(v))
        } catch {
          /* saqlab bölmasa — muhim emas */
        }
      } else setMsg(r.message ?? '')
    })

  return (
    <>
      <div className="ar-foot-cell">
        <span className="ar-foot-l">Baholaganlar</span>
        <b className="ar-foot-num">{stats.count}</b>
      </div>
      <div className="ar-foot-cell">
        <span className="ar-foot-l">Reyting</span>
        <b className="ar-foot-num">{stats.count ? stats.avg.toLocaleString('uz-UZ') : '—'}</b>
      </div>
      <div className="ar-foot-cell">
        <span className="ar-foot-l" id={`rate-${newsId}`}>
          Maqolaga baho berish
        </span>
        <div
          className="ar-stars"
          role="radiogroup"
          aria-labelledby={`rate-${newsId}`}
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={mine === v}
              aria-label={`${v} ball`}
              disabled={pending}
              className={v <= shown ? 'on' : undefined}
              onMouseEnter={() => setHover(v)}
              onFocus={() => setHover(v)}
              onBlur={() => setHover(0)}
              onClick={() => rate(v)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 2.6 2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z" />
              </svg>
            </button>
          ))}
        </div>
        <span className="ar-stars-msg" role="status">
          {msg}
        </span>
      </div>
    </>
  )
}

type Slide = { url: string; alt: string }

/**
 * Maqola suratlari bitta joyda almaşib turadi: 6 soniyada avtomatik (siçqonça ustida yoki fokusda töxtaydi),
 * çap/öng tugmalari, nuqtalar va kiçik suratlar, klaviatura (← →). “Harakatni kamaytiriş”da avtomatik almaşmaydi.
 */
export function Slider({ slides, caption }: { slides: Slide[]; caption?: string | null }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = slides.length
  const go = (k: number) => setI(((k % n) + n) % n)

  useEffect(() => {
    if (n < 2 || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => setI((x) => (x + 1) % n), 6000)
    return () => window.clearTimeout(t)
  }, [i, n, paused])

  if (!n) return null
  return (
    <figure
      className="ar-sl"
      aria-roledescription="karusel"
      aria-label="Maqola suratlari"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(i - 1)
        if (e.key === 'ArrowRight') go(i + 1)
      }}
    >
      <div className="ar-sl-stage">
        {/* orqa fon — öşa suratning xiralaştirilgan nusxasi: tik poster kesilmay töliq körinadi */}
        <img className="ar-sl-bg" src={slides[Math.min(i, n - 1)].url} alt="" aria-hidden="true" />
        {slides.map((s, k) => (
          <img
            key={s.url}
            src={s.url}
            alt={s.alt}
            className={k === i ? 'on' : undefined}
            aria-hidden={k !== i}
            loading={k === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        {n > 1 && (
          <>
            <button
              type="button"
              className="ar-sl-nav prev"
              aria-label="Oldingi surat"
              onClick={() => go(i - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="ar-sl-nav next"
              aria-label="Keyingi surat"
              onClick={() => go(i + 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="ar-sl-count" aria-live="polite">
              {i + 1} / {n}
            </span>
            {!paused && <span key={i} className="ar-sl-bar" aria-hidden="true" />}
          </>
        )}
      </div>
      {n > 1 && (
        <div className="ar-sl-thumbs" role="group" aria-label="Suratni tanlash">
          {slides.map((s, k) => (
            <button
              key={s.url}
              type="button"
              aria-label={`${k + 1}-surat`}
              aria-current={k === i}
              onClick={() => go(k)}
            >
              <img src={s.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

const EMOJI: Array<[ReactionKind, string, string]> = [
  ['like', '👍', 'Ma’qul'],
  ['fire', '🔥', 'A’lo'],
  ['dislike', '👎', 'Ma’qul emas'],
  ['angry', '😡', 'Norozilik'],
  ['laugh', '😁', 'Quvonch'],
]

/**
 * Reaksiyalar paneli: bitta tomonidan bitta reaksiya (boşqasini bossa almaşadi, şuni qayta bossa olib taşlanadi)
 * va “Ulaşiş” — telefonda tizimning ulaşiş oynasi, kompyuterda Telegram / Facebook / havola tugmalari.
 */
export function Reactions({
  newsId,
  initial,
  url,
  title,
}: {
  newsId: number
  initial: ReactionCounts
  url: string
  title: string
}) {
  const key = `reaksiya-${newsId}`
  const stored = useSyncExternalStore(
    noSub,
    () => {
      try {
        return localStorage.getItem(key) || ''
      } catch {
        return ''
      }
    },
    () => '',
  )
  const [counts, setCounts] = useState(initial)
  const [picked, setPicked] = useState<string | null>(null)
  const mine = picked ?? stored
  const [pending, start] = useTransition()
  const [shareOpen, setShareOpen] = useState(false)

  const react = (k: ReactionKind) =>
    start(async () => {
      const r = await safeCall(() => reactNews(newsId, k), { ok: false })
      if (!r.ok || !r.counts) return
      setCounts(r.counts)
      setPicked(r.mine ?? '')
      try {
        if (r.mine) localStorage.setItem(key, r.mine)
        else localStorage.removeItem(key)
      } catch {
        /* saqlab bölmasa — muhim emas */
      }
    })

  const share = async () => {
    const href = new URL(url, window.location.origin).href
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url: href })
        return
      } catch {
        /* foydalanuvçi bekor qildi */
      }
    }
    setShareOpen((o) => !o)
  }

  return (
    <div className="ar-react">
      <div className="ar-react-list" role="group" aria-label="Maqolaga munosabat">
        {EMOJI.map(([k, e, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={mine === k}
            aria-label={`${label}: ${counts[k]}`}
            title={label}
            disabled={pending}
            onClick={() => react(k)}
          >
            <span aria-hidden="true">{e}</span>
            <b>{counts[k]}</b>
          </button>
        ))}
      </div>
      <div className="ar-react-share">
        <button type="button" className="ar-react-sh" aria-expanded={shareOpen} onClick={share}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
          Ulashish
        </button>
        {shareOpen && <Share url={url} title={title} />}
      </div>
    </div>
  )
}
