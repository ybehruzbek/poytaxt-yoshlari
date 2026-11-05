'use client'

import { useEffect, useSyncExternalStore } from 'react'

/**
 * VAQTINCHA: bitta bo'limning dizayn variantlarini (A, B, C) saytda almashtirib ko'rish uchun panel.
 * <html data-{name}="a|b|c"> o'rnatadi. URL: ?{name}=b. Variant tanlangandan keyin olib tashlanadi.
 */
type V = 'a' | 'b' | 'c'
const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function DevVariantSwitch({ name, label, titles }: { name: string; label: string; titles: [string, string, string] }) {
  const key = `v-${name}`
  const v = useSyncExternalStore(
    subscribe,
    () => {
      const s = localStorage.getItem(key)
      return (s === 'b' || s === 'c' ? s : 'a') as V
    },
    () => 'a' as V,
  )
  const set = (x: V) => {
    localStorage.setItem(key, x)
    listeners.forEach((l) => l())
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get(name)
    if (q === 'a' || q === 'b' || q === 'c') {
      localStorage.setItem(key, q)
      listeners.forEach((l) => l())
    }
  }, [key, name])

  useEffect(() => {
    document.documentElement.setAttribute(`data-${name}`, v)
  }, [name, v])

  return (
    <div className="dev-switch" role="group" aria-label={`${label} varianti`}>
      {label}
      {(['a', 'b', 'c'] as V[]).map((x, i) => (
        <button key={x} type="button" title={titles[i]} className={v === x ? 'on' : undefined} onClick={() => set(x)}>
          {x.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
