'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { type Locale, localeLabels, locales } from '@/i18n/config'

type P = { locale: Locale; path: string }

const hrefOf = (l: Locale, path: string) => `/${l}${path === '/' ? '' : path}`

const Chevron = () => (
  <svg
    className="lx-chev"
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)
const Check = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 5 5 9-10" />
  </svg>
)

/**
 * Til tanlagiç (kapsula): yopiq holatda faqat joriy til “UZ ⌄”; bosilganda tagida röyxat —
 * til kodi, töliq nomi, tanlangani belgili. Tashqariga bosiş yoki Esc yopadi.
 * Tanlanganda joriy sahifaning boşqa tildagi nusxasi oçiladi.
 */
export function LangSwitch({ locale, path }: P) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`lx${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lx-btn"
        aria-expanded={open}
        aria-label={`Til: ${localeLabels[locale]}`}
        onClick={() => setOpen((o) => !o)}
      >
        {locale.toUpperCase()}
        <Chevron />
      </button>
      {open && (
        <ul className="lx-menu">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={hrefOf(l, path)}
                hrefLang={l}
                lang={l}
                className={l === locale ? 'on' : undefined}
                aria-current={l === locale ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <b>{l.toUpperCase()}</b>
                <span>{localeLabels[l]}</span>
                {l === locale && <Check />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
