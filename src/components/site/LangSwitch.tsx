'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { type Locale, localeLabels, locales } from '@/i18n/config'

import { DevSectionsPanel } from './DevSectionsPanel'

type P = { locale: Locale; path: string }

const hrefOf = (l: Locale, path: string) => `/${l}${path === '/' ? '' : path}`

/** Tashqariga bosilganda yoki Esc da yopiladigan holat */
function useDrop() {
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
  return { open, setOpen, ref }
}

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
const Globe = () => (
  <svg
    className="lx-globe"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
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

/** A — hozirgi: uçala til doim oçiq */
function LangOpen({ locale, path }: P) {
  return (
    <nav className="lang" aria-label="Til">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefOf(l, path)}
          hrefLang={l}
          lang={l}
          className={l === locale ? 'on' : undefined}
          aria-current={l === locale ? 'true' : undefined}
          aria-label={localeLabels[l]}
          title={localeLabels[l]}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}

/** Oçiladigan röyxat — B va C uçun umumiy: til kodi va töliq nomi, tanlangani belgili */
function Menu({ locale, path, onPick }: P & { onPick: () => void }) {
  return (
    <ul className="lx-menu" role="list">
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={hrefOf(l, path)}
            hrefLang={l}
            lang={l}
            className={l === locale ? 'on' : undefined}
            aria-current={l === locale ? 'true' : undefined}
            onClick={onPick}
          >
            <b>{l.toUpperCase()}</b>
            <span>{localeLabels[l]}</span>
            {l === locale && <Check />}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** B — Kapsula: “UZ ⌄”, bosilganda tagida röyxat */
function LangPill({ locale, path }: P) {
  const { open, setOpen, ref } = useDrop()
  return (
    <div className={`lx lx-pill${open ? ' open' : ''}`} ref={ref}>
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
      {open && <Menu locale={locale} path={path} onPick={() => setOpen(false)} />}
    </div>
  )
}

/** C — Globus: dumaloq tugmada globus belgisi va til kodi, bosilganda röyxat */
function LangGlobe({ locale, path }: P) {
  const { open, setOpen, ref } = useDrop()
  return (
    <div className={`lx lx-globe-w${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lx-btn"
        aria-expanded={open}
        aria-label={`Til: ${localeLabels[locale]}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Globe />
        {locale.toUpperCase()}
      </button>
      {open && <Menu locale={locale} path={path} onPick={() => setOpen(false)} />}
    </div>
  )
}

/** D — Yoyiladigan: faqat joriy til doirasi; bosilganda kapsula yonga yoyilib qolgan tillar çiqadi */
function LangExpand({ locale, path }: P) {
  const { open, setOpen, ref } = useDrop()
  const others = locales.filter((l) => l !== locale)
  return (
    <div className={`lx lx-exp${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lx-cur"
        aria-expanded={open}
        aria-label={`Til: ${localeLabels[locale]}`}
        onClick={() => setOpen((o) => !o)}
      >
        {locale.toUpperCase()}
      </button>
      <span className="lx-rest" aria-hidden={!open}>
        {others.map((l) => (
          <Link
            key={l}
            href={hrefOf(l, path)}
            hrefLang={l}
            lang={l}
            tabIndex={open ? 0 : -1}
            title={localeLabels[l]}
            onClick={() => setOpen(false)}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </span>
    </div>
  )
}

const VARIANTS = [LangOpen, LangPill, LangGlobe, LangExpand]

/** Til tanlagiç — VAQTINÇA 4 köriniş varianti (panel faqat işlab çiqiş rejimida); tanlangaç bittasi qoladi */
export function LangSwitch(p: P) {
  return (
    <div className="lx-wrap">
      {VARIANTS.map((V, i) => (
        <div key={i} className="vx" data-v={`lang-${String.fromCharCode(97 + i)}`}>
          <V {...p} />
        </div>
      ))}
      <DevSectionsPanel
        sections={[
          {
            name: 'lang',
            label: 'Til tanlagiç',
            count: 4,
            hints: ['Hozirgi (oçiq)', 'Kapsula + röyxat', 'Globus + röyxat', 'Yoyiladigan'],
          },
        ]}
      />
    </div>
  )
}
