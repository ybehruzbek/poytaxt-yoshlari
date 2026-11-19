'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { COLLAPSE_COOKIE, type CountKey, type MenuGroup, type MenuLink, type Pinned } from '@/lib/boshqaruv/menu'

import { chiqish } from '@/lib/boshqaruv/session'

import { Icon } from './Icon'

type Props = {
  initialCollapsed: boolean
  menu: MenuGroup[]
  pinned: Pinned[]
  counts: Partial<Record<CountKey, number>>
  user: { name: string; initials: string; role: string }
  children: React.ReactNode
}


const isActive = (href: string, path: string) =>
  href === '/boshqaruv' ? path === href : path === href || path.startsWith(`${href}/`)

function NavLink({ l, path, children }: { l: MenuLink; path: string; children: React.ReactNode }) {
  const act = isActive(l.href, path)
  return (
    <Link href={l.href} className={act ? 'nav__a is-act' : 'nav__a'} aria-current={act ? 'page' : undefined} prefetch={!l.eski}>
      {children}
      {l.eski && (
        <span className="eski" title="Eski panelda oçiladi">
          <Icon name="ext" size={14} />
        </span>
      )}
    </Link>
  )
}

/** Menyu, yiğiş tugmasi, qidiruv oynasi va asosiy panel. Sahifalar öz sarlavhasini <Top/> bilan beradi. */
export function Shell({ initialCollapsed, menu, pinned, counts, user, children }: Props) {
  const path = usePathname()
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  // boşqa sahifaga ötilganda telefondagi menyu yopiladi
  const [lastPath, setLastPath] = useState(path)
  if (path !== lastPath) {
    setLastPath(path)
    setOpen(false)
  }

  const toggle = () => {
    const next = !collapsed
    setCollapsed(next)
    const base = '/boshqaruv'
    document.cookie = [`${COLLAPSE_COOKIE}=${next ? '1' : '0'}`, `path=${base}`, 'max-age=31536000', 'samesite=lax'].join('; ')
  }

  // Burger tugmasi <Top/> içida — u şu hodisa orqali menyuni oçadi
  useEffect(() => {
    const h = () => setOpen((o) => !o)
    window.addEventListener('bq:menu', h)
    return () => window.removeEventListener('bq:menu', h)
  }, [])

  // ⌘K / Ctrl+K va “/” — qidiruv
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      const typing = t.closest('input, textarea, [contenteditable="true"]')
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])


  return (
    <div className={open ? 'bq is-menu' : 'bq'} data-collapsed={collapsed ? '1' : '0'} onClick={(e) => {
      if (open && !(e.target as HTMLElement).closest('.side, .burger')) setOpen(false)
    }}>
      <aside className="side" aria-label="Asosiy menyu">
        <div className="brand">
          <img src="/icon-192.png" alt="" />
          <div className="brand__t">
            <b>Boşqaruv paneli</b>
            <small>Toşkent şahar Kengaşi</small>
          </div>
          <button className="collapse" type="button" onClick={toggle} title={collapsed ? 'Menyuni yoyiş' : 'Menyuni yiğiş'}>
            <Icon name="layout" size={18} />
          </button>
        </div>

        <button className="search" type="button" onClick={() => setSearch(true)} title="Qidiruv">
          <Icon name="search" />
          <span>Qidiruv</span>
          <kbd>⌘K</kbd>
          <kbd>/</kbd>
        </button>

        <nav className="nav">
          {menu.map((grp, gi) => (
            <div className="nav__grp" key={grp.t ?? gi}>
              {grp.t && <p className="nav__lbl">{grp.t}</p>}
              {grp.items.map((it) =>
                it.sub ? (
                  <details key={it.t} open={it.sub.some((s) => isActive(s.href, path)) || undefined}>
                    <summary title={it.t}>
                      <Icon name={it.icon} />
                      <span className="nav__t">{it.t}</span>
                      <Icon name="chev" size={16} className="chev" />
                    </summary>
                    <div className="sub">
                      {it.sub.map((s) => (
                        <NavLink key={s.href} l={s} path={path}>
                          <span className="nav__t">{s.t}</span>
                        </NavLink>
                      ))}
                    </div>
                  </details>
                ) : (
                  <NavLink key={it.href} l={it} path={path}>
                    <Icon name={it.icon} />
                    <span className="nav__t">{it.t}</span>
                    {it.count && counts[it.count] ? (
                      <>
                        <span className="cnt">{counts[it.count]}</span>
                        <span className="dot-cnt" />
                      </>
                    ) : null}
                  </NavLink>
                ),
              )}
            </div>
          ))}

          {pinned.length > 0 && (
            <>
              <div className="divider" />
              <p className="nav__lbl">Mahkamlangan</p>
              {pinned.map((p) => (
                <Link key={p.href} href={p.href} className="pin" prefetch={false} title={p.t}>
                  <span className={`letter letter--${p.color}`}>{p.t[0]}</span>
                  <span className="nav__t">{p.t}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="me">
          <span className="ava">{user.initials}</span>
          <Link href="/boshqaruv/hisob" className="me__t" title="Hisobim">
            <b>{user.name}</b>
            <small>{user.role}</small>
          </Link>
          <form action={chiqish}>
            <button type="submit" title="Çiqiş">
              <Icon name="logout" size={18} />
            </button>
          </form>
        </div>
      </aside>

      <div className="main">{children}</div>

      {search && <SearchDialog menu={menu} pinned={pinned} onClose={() => setSearch(false)} />}
    </div>
  )
}

/** Menyu böyiça tezkor qidiruv: bölim nomini yozib, Enter bilan oçiladi */
function SearchDialog({ menu, pinned, onClose }: { menu: MenuGroup[]; pinned: Pinned[]; onClose: () => void }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const ref = useRef<HTMLInputElement>(null)

  const all = useMemo(() => {
    const out: { t: string; grp: string; href: string }[] = []
    for (const g of menu)
      for (const it of g.items) {
        if (it.sub) for (const s of it.sub) out.push({ t: s.t, grp: it.t, href: s.href })
        else out.push({ t: it.t, grp: g.t ?? '', href: it.href })
      }
    for (const p of pinned) if (!out.some((o) => o.href === p.href)) out.push({ t: p.t, grp: 'Mahkamlangan', href: p.href })
    return out
  }, [menu, pinned])

  const norm = (s: string) => s.toLocaleLowerCase('uz').replace(/[ʼ'‘’]/g, '')
  const list = useMemo(() => {
    const n = norm(q.trim())
    return n ? all.filter((a) => norm(`${a.t} ${a.grp}`).includes(n)) : all
  }, [q, all])

  useEffect(() => ref.current?.focus(), [])

  const go = useCallback(
    (href: string) => {
      onClose()
      router.push(href)
    },
    [onClose, router],
  )

  return (
    <div className="dlg" role="dialog" aria-modal="true" aria-label="Qidiruv" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dlg__box">
        <label className="dlg__in">
          <Icon name="search" />
          <input
            ref={ref}
            value={q}
            placeholder="Bölim nomini yozing…"
            onChange={(e) => {
              setQ(e.target.value)
              setI(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setI((x) => Math.min(x + 1, list.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setI((x) => Math.max(x - 1, 0))
              }
              if (e.key === 'Enter' && list[i]) go(list[i].href)
            }}
          />
          <kbd>Esc</kbd>
        </label>
        <ul className="dlg__list">
          {list.length === 0 && <li className="empty">Heç narsa topilmadi</li>}
          {list.map((a, k) => (
            <li key={a.href}>
              <button type="button" className={k === i ? 'is-act' : undefined} onMouseEnter={() => setI(k)} onClick={() => go(a.href)}>
                <b>{a.t}</b>
                <span>{a.grp}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Sahifa tepasidagi panel: yöl, sarlavha, izoh va amallar */
export function Top({
  title,
  sub,
  crumbs,
  children,
}: {
  title: React.ReactNode
  sub?: React.ReactNode
  crumbs?: { t: string; href?: string }[]
  children?: React.ReactNode
}) {
  return (
    <header className="top">
      <button className="burger" type="button" aria-label="Menyuni oçiş" onClick={() => window.dispatchEvent(new Event('bq:menu'))}>
        <Icon name="menu" />
      </button>
      <div className="top__t">
        {crumbs && crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Yöl">
            {crumbs.map((c, k) => (
              <span key={k} style={{ display: 'contents' }}>
                {k > 0 && <Icon name="chev" size={14} />}
                {c.href ? <Link href={c.href}>{c.t}</Link> : <span>{c.t}</span>}
              </span>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children && <div className="top__end">{children}</div>}
    </header>
  )
}
