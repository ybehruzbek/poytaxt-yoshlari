'use client'

import { useEffect, useSyncExternalStore } from 'react'

/**
 * VAQTINCHA, FAQAT ISHLAB CHIQISH REJIMIDA: bitta bo'limning dizayn variantlarini (A, B, C) almashtirish paneli.
 * <html data-{name}="a|b|c"> o'rnatadi. Tanlov sessionStorage'da (faqat shu tab uchun) saqlanadi;
 * URL'dagi ?{name}=b o'qib olingach manzildan olib tashlanadi. Production build'da hech narsa chizmaydi.
 */
type V = 'a' | 'b' | 'c'
const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const read = (key: string): V => {
  try {
    const s = sessionStorage.getItem(key)
    return s === 'b' || s === 'c' ? s : 'a'
  } catch {
    return 'a'
  }
}
const write = (key: string, v: V) => {
  try {
    sessionStorage.setItem(key, v)
  } catch {
    /* saqlab bo'lmasa — faqat shu render uchun */
  }
  listeners.forEach((l) => l())
}

export function DevVariantSwitch({
  name,
  label,
  titles,
  labels,
}: {
  name: string
  label: string
  titles: [string, string, string]
  /** tugmalardagi qisqa yozuv (sukut: A, B, C) */
  labels?: [string, string, string]
}) {
  const key = `v-${name}`
  const v = useSyncExternalStore(subscribe, () => read(key), () => 'a' as V)

  useEffect(() => {
    const url = new URL(window.location.href)
    const q = url.searchParams.get(name)
    if (q === 'a' || q === 'b' || q === 'c') {
      write(key, q)
      url.searchParams.delete(name)
      window.history.replaceState(null, '', url)
    }
  }, [key, name])

  useEffect(() => {
    document.documentElement.setAttribute(`data-${name}`, v)
  }, [name, v])

  if (process.env.NODE_ENV === 'production') return null
  return (
    <div className="dev-switch" role="group" aria-label={`${label} varianti`}>
      {label}
      {(['a', 'b', 'c'] as V[]).map((x, i) => (
        <button key={x} type="button" title={titles[i]} className={v === x ? 'on' : undefined} onClick={() => write(key, x)}>
          {labels?.[i] ?? x.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
