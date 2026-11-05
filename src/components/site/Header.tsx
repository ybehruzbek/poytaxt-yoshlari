'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { NAV, type NavGroup, groupPaths } from '@/config/nav'
import type { Locale } from '@/i18n/config'

const Chevron = ({ dir = 'down' }: { dir?: 'down' | 'right' }) => (
  <svg className={`chev chev-${dir}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'down' ? <path d="m6 9 6 6 6-6" /> : <path d="m9 6 6 6-6 6" />}
  </svg>
)
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/**
 * Navbar · shaffof kapsula + majburiy menyu tuzilmasi (src/config/nav.ts).
 * Ochiladigan ro'yxat: hover yoki bosish bilan ochiladi; Esc / tashqariga bosish yopadi.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const path = pathname.replace(new RegExp(`^/${locale}`), '') || '/'
  const L = (href: string) => `/${locale}${href}`

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null) // desktop: ochiq guruh
  const [drawer, setDrawer] = useState(false) // mobil menyu
  const [mOpen, setMOpen] = useState<string | null>(null) // mobil: ochiq guruh
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // sahifa almashganda hamma menyular yopiladi (render paytida, effektsiz)
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(null)
    setDrawer(false)
  }

  const closeAll = useCallback(() => {
    setOpen(null)
    setDrawer(false)
  }, [])

  // tashqariga bosish va Esc — yopadi
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeAll()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const key = open
      closeAll()
      if (key) document.getElementById(`nb-${key}`)?.focus()
    }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, closeAll])

  // hover: kichik kechikish bilan yopiladi (sichqoncha panelga o'tguncha)
  const hoverOpen = (key: string | null) => {
    window.clearTimeout(closeTimer.current)
    setOpen(key)
  }
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(null), 160)
  }

  const isActive = (g: NavGroup) => groupPaths(g).some((p) => path === p || path.startsWith(p + '/'))
  const joinHref = L('/boglanish/murojaat?mavzu=azo')

  return (
    <div className={`site-head${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`} id="siteHead">
      <div className="wrap">
        <header
          className="header"
          ref={headerRef}
          onPointerLeave={hoverClose}
          onBlur={(e) => {
            if (!headerRef.current?.contains(e.relatedTarget as Node)) setOpen(null)
          }}
        >
          <Link href={`/${locale}`} className="logo" aria-label="Bosh sahifa">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-toshkent.png" alt="O‘zbekiston Yoshlar Ittifoqi — Toshkent shahar hududiy kengashi" />
          </Link>

          {/* ===== Kompyuter menyusi ===== */}
          <nav className="mnav" aria-label="Asosiy menyu">
            <ul>
              {NAV.map((g) =>
                g.href ? (
                  <li key={g.key} onPointerEnter={() => hoverOpen(null)}>
                    <Link href={L(g.href)} className={`mnav-link${isActive(g) ? ' active' : ''}`} aria-current={isActive(g) ? 'page' : undefined}>
                      {g.label}
                    </Link>
                  </li>
                ) : (
                  <li key={g.key} className={open === g.key ? 'is-open' : undefined} onPointerEnter={() => hoverOpen(g.key)}>
                    <button
                      id={`nb-${g.key}`}
                      type="button"
                      className={`mnav-link${isActive(g) ? ' active' : ''}`}
                      aria-expanded={open === g.key}
                      aria-controls={`np-${g.key}`}
                      onClick={() => setOpen((o) => (o === g.key ? null : g.key))}
                    >
                      {g.label} <Chevron />
                    </button>

                    <div className="dd" id={`np-${g.key}`} hidden={open !== g.key}>
                      <ul className="dd-list">
                        {g.items!.map((it) => (
                          <li key={it.href} className={it.children ? 'has-sub' : undefined}>
                            <Link href={L(it.href)} className={path === it.href ? 'cur' : undefined} aria-current={path === it.href ? 'page' : undefined}>
                              <span className="t">{it.label}</span>
                              {it.children && <Chevron dir="right" />}
                            </Link>
                            {it.children && (
                              <ul className="dd-sub">
                                {it.children.map((c) => (
                                  <li key={c.href}>
                                    <Link href={L(c.href)} className={path === c.href ? 'cur' : undefined} aria-current={path === c.href ? 'page' : undefined}>
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <Link href={joinHref} className="btn btn-outline head-cta">
            A‘zo bo‘lish
          </Link>
          <button
            className="burger"
            type="button"
            aria-label="Menyu"
            aria-controls="mdrawer"
            aria-expanded={drawer}
            onClick={() => setDrawer((d) => !d)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#532822" strokeWidth="2" strokeLinecap="round">
              {drawer ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          {/* ===== Mobil menyu (akkordeon) ===== */}
          <nav className="mdrawer" id="mdrawer" aria-label="Mobil menyu" hidden={!drawer}>
            <ul>
              {NAV.map((g) =>
                g.href ? (
                  <li key={g.key}>
                    <Link href={L(g.href)} className={`m-top${isActive(g) ? ' active' : ''}`}>
                      {g.label}
                    </Link>
                  </li>
                ) : (
                  <li key={g.key}>
                    <button
                      type="button"
                      className={`m-top${isActive(g) ? ' active' : ''}`}
                      aria-expanded={mOpen === g.key}
                      onClick={() => setMOpen((o) => (o === g.key ? null : g.key))}
                    >
                      {g.label} <Chevron />
                    </button>
                    <ul className="m-sub" hidden={mOpen !== g.key}>
                      {g.items!.map((it) => (
                        <li key={it.href}>
                          <Link href={L(it.href)}>{it.label}</Link>
                          {it.children && (
                            <ul>
                              {it.children.map((c) => (
                                <li key={c.href}>
                                  <Link href={L(c.href)}>{c.label}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ),
              )}
            </ul>
            <Link href={joinHref} className="btn btn-primary m-join">
              A‘zo bo‘lish <span className="ic"><Arrow /></span>
            </Link>
          </nav>
        </header>
      </div>
    </div>
  )
}
