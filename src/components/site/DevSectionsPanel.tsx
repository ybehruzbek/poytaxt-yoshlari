'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

/**
 * VAQTINCHA, FAQAT ISHLAB CHIQISH REJIMIDA: bir sahifadagi köp bölimlarning dizayn variantlarini
 * bitta yiğiladigan panelda almaştiriş. Har bölim uçun <html data-{name}="a|b|c|…"> qöyiladi va
 * [data-v="{name}-{k}"] örama körsatiladi (qolganlari yaşiriladi). Tanlov sessionStorage'da saqlanadi.
 */
export type PanelSection = { name: string; label: string; count: number }

const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const key = (n: string) => `v-${n}`
const readAll = (names: string[]) =>
  names
    .map((n) => {
      try {
        return sessionStorage.getItem(key(n)) || 'a'
      } catch {
        return 'a'
      }
    })
    .join(',')
const write = (n: string, v: string) => {
  try {
    sessionStorage.setItem(key(n), v)
  } catch {
    /* saqlab bölmasa — faqat şu render uçun */
  }
  listeners.forEach((l) => l())
}

const letters = (count: number) => Array.from({ length: count }, (_, i) => String.fromCharCode(97 + i))

/** Har bölim uçun körsatiş qoidalari (sukut böyiça A) */
function css(sections: PanelSection[]) {
  return (
    '.vx{display:none}' +
    sections
      .map(({ name, count }) =>
        [`html:not([data-${name}]) [data-v=${name}-a]`, ...letters(count).map((k) => `html[data-${name}=${k}] [data-v=${name}-${k}]`)].join(','),
      )
      .join(',') +
    '{display:block}'
  )
}

export function DevSectionsPanel({ sections }: { sections: PanelSection[] }) {
  const names = sections.map((s) => s.name)
  const namesId = names.join(',')
  const state = useSyncExternalStore(subscribe, () => readAll(namesId.split(',')), () => names.map(() => 'a').join(','))
  const values = state.split(',')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    namesId.split(',').forEach((n, i) => document.documentElement.setAttribute(`data-${n}`, state.split(',')[i] || 'a'))
  }, [namesId, state])

  const jump = (name: string) => {
    const vis = [...document.querySelectorAll<HTMLElement>(`[data-v^="${name}-"]`)].find((e) => e.offsetParent !== null)
    vis?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{css(sections)}</style>
      {process.env.NODE_ENV !== 'production' && (
        <div className={`dev-panel${open ? ' open' : ''}`}>
          <button type="button" className="dev-panel-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            Variantlar · {sections.length} bölim {open ? '×' : '▴'}
          </button>
          {open && (
            <ul>
              {sections.map((s, i) => (
                <li key={s.name}>
                  <button type="button" className="dev-panel-name" onClick={() => jump(s.name)} title="Bölimga ötiş">
                    {s.label}
                  </button>
                  <span>
                    {letters(s.count).map((k) => (
                      <button key={k} type="button" className={values[i] === k ? 'on' : undefined} onClick={() => write(s.name, k)}>
                        {k.toUpperCase()}
                      </button>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}
