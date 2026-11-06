'use client'

import { useEffect, useState } from 'react'

export type NavItem = { id: string; label: string; g: string }
export type NavGroup = { g: string; label: string }

/** Körinib turgan bölimni kuzatadi (sahifa böylab aylantirganda faol bölim) */
function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const [progress, setProgress] = useState(0)
  const [past, setPast] = useState(false)
  const key = ids.join(',')
  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let cur = els[0]?.id
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id
      setActive(cur)
      const first = els[0]?.getBoundingClientRect().top ?? 0
      setPast(first < window.innerHeight * 0.6)
      const doc = document.documentElement
      setProgress(
        Math.min(1, Math.max(0, window.scrollY / (doc.scrollHeight - window.innerHeight))),
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])
  return { active, progress, past }
}

const go = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/** A — hero ostidan boşlab yopişib turuvçi gorizontal bölimlar qatori */
export function NavA({ items }: { items: NavItem[] }) {
  const { active } = useActive(items.map((i) => i.id))
  useEffect(() => {
    document
      .querySelector(`.snav-a [data-id="${active}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [active])
  return (
    <nav className="snav snav-a" aria-label="Sahifa bölimlari">
      <div className="wrap">
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                data-id={it.id}
                className={active === it.id ? 'on' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  go(it.id)
                }}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/** B — çapda suzib turuvçi mundarija (katta ekranda), kiçik ekranda pastdagi «Bölimlar» tugmasi */
export function NavB({ items }: { items: NavItem[] }) {
  const { active, progress, past } = useActive(items.map((i) => i.id))
  const [open, setOpen] = useState(false)
  return (
    <nav
      className={`snav snav-b${past ? ' show' : ''}${open ? ' open' : ''}`}
      aria-label="Sahifa bölimlari"
    >
      <button
        type="button"
        className="snav-b-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Bölimlar
      </button>
      <div className="snav-b-panel">
        <b>Mundarija</b>
        <span className="snav-b-bar">
          <i style={{ height: `${progress * 100}%` }} />
        </span>
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={active === it.id ? 'on' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  go(it.id)
                }}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/** C — öng çetda nuqtalar (nomi sichqonça olib borilganda çiqadi) va tepada öqiş çizğiçasi */
export function NavC({ items }: { items: NavItem[] }) {
  const { active, progress, past } = useActive(items.map((i) => i.id))
  return (
    <>
      <div className="snav-c-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav className={`snav snav-c${past ? ' show' : ''}`} aria-label="Sahifa bölimlari">
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={active === it.id ? 'on' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  go(it.id)
                }}
              >
                <span>{it.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

/** D — sahifa 4 ta yorliqqa bölinadi: faqat tanlangan guruh bölimlari körinadi */
export function NavD({ items, groups }: { items: NavItem[]; groups: NavGroup[] }) {
  const [g, setG] = useState(groups[0].g)
  useEffect(() => {
    const root = document.querySelector('.it')
    root?.setAttribute('data-grp', g)
    return () => root?.removeAttribute('data-grp')
  }, [g])
  const pick = (x: string) => {
    setG(x)
    document.querySelector('.snav-d')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav className="snav snav-d" aria-label="Sahifa bölimlari">
      <div className="wrap">
        <div className="snav-d-tabs" role="tablist">
          {groups.map((x) => (
            <button
              key={x.g}
              type="button"
              role="tab"
              aria-selected={g === x.g}
              className={g === x.g ? 'on' : undefined}
              onClick={() => pick(x.g)}
            >
              {x.label}
              <small>{items.filter((i) => i.g === x.g).length}</small>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
