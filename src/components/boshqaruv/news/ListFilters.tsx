'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { Icon } from '../Icon'

type Opt = { value: string; t: string }

/** Qidiruv (yozib turganda 300 ms kutib), turkum, tur va tartib — URL parametrlarida saqlanadi */
export function ListFilters(props: { q: string; turkum: string; tur: string; tartib: string; categories: Opt[]; kinds: Opt[] }) {
  const router = useRouter()
  const path = usePathname()
  const sp = useSearchParams()
  const [q, setQ] = useState(props.q)
  const [pending, start] = useTransition()

  const push = (patch: Record<string, string>) => {
    const n = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(patch)) (v ? n.set(k, v) : n.delete(k))
    n.delete('sahifa')
    const s = n.toString()
    start(() => router.replace(`${path}${s ? `?${s}` : ''}`, { scroll: false }))
  }

  useEffect(() => {
    if (q === props.q) return
    const t = setTimeout(() => push({ q: q.trim() }), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  return (
    <>
      <label className={pending ? 'field-search is-busy' : 'field-search'}>
        <Icon name="search" size={18} />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sarlavha bo‘yicha qidirish" aria-label="Qidirish" />
      </label>
      <select className="select" value={props.turkum} onChange={(e) => push({ turkum: e.target.value })} aria-label="Turkum">
        <option value="">Barcha turkumlar</option>
        {props.categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.t}
          </option>
        ))}
      </select>
      <select className="select" value={props.tur} onChange={(e) => push({ tur: e.target.value })} aria-label="Turi">
        <option value="">Barcha turlar</option>
        {props.kinds.map((c) => (
          <option key={c.value} value={c.value}>
            {c.t}
          </option>
        ))}
      </select>
      <select className="select" value={props.tartib} onChange={(e) => push({ tartib: e.target.value })} aria-label="Tartib">
        <option value="">Yangi avval</option>
        <option value="eski">Eski avval</option>
        <option value="tahrir">Oxirgi tahrirlangan</option>
      </select>
    </>
  )
}
