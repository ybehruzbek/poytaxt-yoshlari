'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { type Locale, isLive, localeLabels, locales } from '@/i18n/config'

import { type AlifboTur, getAlifbo, setAlifbo } from './Alifbo'

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
  // menyu faqat bosilganda chiziladi — serverdagi HTML bilan farq qilmaydi
  const [abc, setAbc] = useState<AlifboTur>(() => (typeof window === 'undefined' ? 'joriy' : getAlifbo()))
  const ref = useRef<HTMLDivElement>(null)

  const pick = (v: AlifboTur) => {
    setAbc(v)
    setAlifbo(v)
  }

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
              {isLive(l) ? (
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
              ) : (
                // tarjimasi hali tayyor emas — bosilmaydi
                <span className="lx-soon" aria-disabled="true">
                  <b>{l.toUpperCase()}</b>
                  <span lang={l}>{localeLabels[l]}</span>
                  <em>Tez orada</em>
                </span>
              )}
            </li>
          ))}
          {locale === 'uz' && (
            // namunalar (o‘/ö) o'zgarmasin — data-alifbo="off"
            <li className="lx-abc" data-alifbo="off">
              <span id="lx-abc-t">Alifbo</span>
              <div className="lx-abc-seg" role="group" aria-labelledby="lx-abc-t">
                <button type="button" aria-pressed={abc === 'joriy'} onClick={() => pick('joriy')}>
                  Joriy<small>o‘ g‘ sh ch</small>
                </button>
                <button type="button" aria-pressed={abc === 'yangi'} onClick={() => pick('yangi')}>
                  Yangi<small>ö ğ ş ç</small> {/* imlo-ok: yangi alifbo namunasi */}
                </button>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
