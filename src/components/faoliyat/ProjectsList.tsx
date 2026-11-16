'use client'

/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { type DirSlug, type Project } from './types'

const low = (s: string) => s.toLocaleLowerCase('uz')
const STATUS = {
  'davom etmoqda': 'Davom etmoqda',
  'har yili': 'Har yili',
  yakunlangan: 'Yakunlangan',
} as const

/** Loyihalar: yönaliş va holat böyiça saralaş, qidiruv */
export function ProjectsList({
  projects,
  dirs,
  base,
}: {
  projects: Project[]
  dirs: Array<{ slug: DirSlug; title: string }>
  base: string
}) {
  const [dir, setDir] = useState<'all' | DirSlug>('all')
  const [st, setSt] = useState<'all' | Project['status']>('all')
  const [q, setQ] = useState('')
  const title = (s: DirSlug) => dirs.find((d) => d.slug === s)?.title ?? ''
  const used = dirs.filter((d) => projects.some((p) => p.dir === d.slug))

  const list = useMemo(() => {
    const s = low(q.trim())
    return projects.filter(
      (p) =>
        (dir === 'all' || p.dir === dir) &&
        (st === 'all' || p.status === st) &&
        (!s || low(`${p.title} ${p.lead} ${p.description}`).includes(s)),
    )
  }, [projects, dir, st, q])

  if (!projects.length) return <p className="fa-empty">Loyihalar maʼlumoti tayyorlanmoqda.</p>

  return (
    <>
      <div className="fa-tools">
        <div className="chips fa-chips" role="group" aria-label="Holati">
          {(['all', 'davom etmoqda', 'har yili', 'yakunlangan'] as const).map((k) => (
            <button key={k} type="button" aria-pressed={st === k} onClick={() => setSt(k)}>
              {k === 'all' ? 'Barçasi' : STATUS[k]}{' '}
              <span>
                {k === 'all' ? projects.length : projects.filter((p) => p.status === k).length}
              </span>
            </button>
          ))}
        </div>
        <div className="fa-tools-r">
          <label className="fa-select">
            <span className="sr-only">Yönaliş</span>
            <select value={dir} onChange={(e) => setDir(e.target.value as 'all' | DirSlug)}>
              <option value="all">Barça yönalişlar</option>
              {used.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.title}
                </option>
              ))}
            </select>
          </label>
          <label className="fa-search">
            <span className="sr-only">Qidiruv</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Qidiruv: loyiha nomi"
            />
          </label>
        </div>
      </div>
      <p className="fa-count">{list.length} ta loyiha</p>

      <div className="vc-mag">
        {list.map((p, i) => (
          <Link
            key={p.slug}
            href={`${base}/${p.slug}`}
            className={i === 0 ? 'vc-mag-i vc-mag-big' : 'vc-mag-i'}
          >
            <img src={p.cover} alt="" loading="lazy" />
            <span className="vc-mag-t">
              <small>
                {title(p.dir)} · {STATUS[p.status]}
              </small>
              <strong>{p.title}</strong>
              {i === 0 && <span>{p.lead}</span>}
            </span>
          </Link>
        ))}
      </div>

      {list.length === 0 && <p className="fa-empty">Qidiruv böyiça natija topilmadi.</p>}
    </>
  )
}
