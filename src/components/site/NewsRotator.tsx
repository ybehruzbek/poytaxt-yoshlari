'use client'
/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor o'lchamda (WebP) keladi */

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { CATEGORY_TONE, type NewsCard } from '@/lib/news'
import { More } from './MoreBtn'

/** Asosiy yangilik necha millisekundda almashadi */
const INTERVAL = 7000
const SIDE = 4

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/**
 * Aylanuvchi yangiliklar: faqat sönggi 5 ta yangilik aylanadi (qolgani “Barça yangiliklar”da).
 *  - har INTERVAL'da yon ro'yxatdagi birinchi yangilik asosiy joyga o'tadi, ro'yxat bir pog'ona suriladi;
 *  - ro'yxat tugasa — boshidan aylanadi.
 * Sichqoncha ustida turganda yoki fokusda to'xtaydi; "to'xtatish" tugmasi bor (WCAG 2.2.2);
 * "harakatni kamaytirish" yoqilgan bo'lsa — avtomatik aylanmaydi.
 */
export function NewsRotator({ locale, initial }: { locale: Locale; initial: NewsCard[] }) {
  const items = initial
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hover, setHover] = useState(false)
  const [reduced, setReduced] = useState(false)
  // blok ekrandan çiqsa aylaniş töxtaydi — körinmayotgan joyda işlov bajarilmaydi
  const box = useRef<HTMLDivElement>(null)
  const [away, setAway] = useState(false)
  useEffect(() => {
    const el = box.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setAway(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const go = useCallback(
    (step: number) => {
      setIdx((i) => {
        const next = i + step
        return next < 0 ? items.length - 1 : next
      })
    },
    [items.length],
  )

  // Avtomatik almashish navbatdagi kartaning "to'lish" animatsiyasiga bog'langan:
  // animatsiya tugashi (onAnimationEnd) — almashish signali. Hover/fokusda animatsiya pauza bo'ladi
  // va qolgan joyidan davom etadi (taymer qaytadan boshlanmaydi).
  const run = playing && !reduced && items.length > 1

  if (!items.length) return null
  const n = items.length
  const at = (k: number) => items[((k % n) + n) % n]
  const main = at(idx)
  // yon ro'yxat: asosiydan keyingi 4 ta (bazada tugasa — boshidan)
  const side = Array.from({ length: Math.min(SIDE, n - 1) }, (_, k) => at(idx + 1 + k))
  const href = (s: NewsCard) => `/${locale}/yangiliklar/${s.slug}`

  return (
    <div
      ref={box}
      className="nv-a"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false)
      }}
    >
      <article className="na-main" key={main.id} aria-roledescription="asosiy yangilik">
        <div className="im">
          <img className="cover" src={main.image} alt={main.imageAlt} loading="lazy" decoding="async" />
        </div>
        <div className="bd">
          <div className="meta">
            <span className={`chip ${CATEGORY_TONE[main.category]}`}>{main.categoryLabel}</span>
            <time dateTime={main.dateISO}>{main.date}</time>
          </div>
          <h3>{main.title}</h3>
          <p>{main.excerpt}</p>
          <div className="na-actions">
            <Link href={href(main)} className="more-btn">
              <More />
            </Link>
            {n > 1 && (
              <div className="na-ctrl" role="group" aria-label="Yangiliklarni almaştiriş">
                <button type="button" onClick={() => go(-1)} aria-label="Oldingi yangilik">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Töxtatiş' : 'Davom ettiriş'}
                  aria-pressed={!playing}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1.5" />
                      <rect x="14" y="5" width="4" height="14" rx="1.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                    </svg>
                  )}
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Keyingi yangilik">
                  <Arrow />
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      <ul className="na-list">
        {side.map((s, k) => (
          <li
            key={`${s.id}-${idx + 1 + k}`}
            style={{ animationDelay: `${k * 60}ms` }}
            className={k === 0 ? 'is-next' : undefined}
          >
            <article>
              {/* navbatdagi karta almashishgacha sariq bilan to'lib boradi */}
              {k === 0 && run && (
                <span
                  className={`pg-next${hover || away ? ' paused' : ''}`}
                  style={{ animationDuration: `${INTERVAL}ms` }}
                  onAnimationEnd={() => go(1)}
                  aria-hidden="true"
                />
              )}
              <div className="th">
                <img className="cover" src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" />
              </div>
              <div>
                <div className="meta">
                  <span className={`chip ${CATEGORY_TONE[s.category]}`}>{s.categoryLabel}</span>
                  <time dateTime={s.dateISO}>{s.date}</time>
                </div>
                <h3>{s.title}</h3>
                <Link href={href(s)} className="more-btn">
                  <More />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
