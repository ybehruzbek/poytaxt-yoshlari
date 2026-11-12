'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import type { YnItem } from './data'
import { Chip, Img } from './YnShared'

const PER = 8

/**
 * B — Gazeta.uz uslubi (lenta). gazeta.uz/uz/list/news sahifasidan olingan:
 *  - qatʼiy xronologik zič röyxat, kunlar böyiça: “Bugun”, “Keça”, “5-noyabr”;
 *  - har yangilikda vaqt (“12:56”), sarlavha va 1–2 gaplik qisqa matn, kiçik rasm öngda;
 *  - pastda raqamli sahifalaş: “Avvalgi” / 1 2 3 / “Keyingi”.
 * Reuters “World” lentasidagi kabi turkum yorliği sarlavha ustida turadi.
 */
export function VariantB({ items, L }: { items: YnItem[]; L: string }) {
  const [page, setPage] = useState(1)
  const top = useRef<HTMLElement>(null)
  const pages = Math.max(1, Math.ceil(items.length / PER))
  const slice = items.slice((page - 1) * PER, page * PER)

  const groups: { key: string; label: string; items: YnItem[] }[] = []
  for (const it of slice) {
    const g = groups.at(-1)
    if (g && g.key === it.dayKey) g.items.push(it)
    else groups.push({ key: it.dayKey, label: it.rel, items: [it] })
  }

  const go = (p: number) => {
    setPage(p)
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="sec yn-b" aria-label="Yangiliklar lentasi" ref={top}>
      <div className="wrap yn-b-wrap">
        {groups.map((g) => (
          <section key={g.key} className="yn-b-day" aria-labelledby={`yn-b-${g.key}`}>
            <h2 id={`yn-b-${g.key}`}>{g.label}</h2>
            <ol>
              {g.items.map((it) => (
                <li key={it.id}>
                  <article className="yn-b-row">
                    <Link href={`${L}/${it.slug}`}>
                      <time dateTime={it.dateISO}>{it.time}</time>
                      <div className="yn-b-txt">
                        <Chip it={it} />
                        <h3>{it.title}</h3>
                        <p>{it.excerpt}</p>
                      </div>
                      <Img it={it} className="yn-b-th" />
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        ))}

        {pages > 1 && (
          <nav className="yn-b-pager" aria-label="Sahifalar">
            <button type="button" className="yn-b-prev" onClick={() => go(page - 1)} disabled={page === 1}>
              ← Avvalgi
            </button>
            <ol>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => go(p)}
                    aria-current={p === page ? 'page' : undefined}
                    aria-label={`${p}-sahifa`}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ol>
            {page < pages ? (
              <button type="button" className="more-btn" onClick={() => go(page + 1)}>
                <More>Keyingi</More>
              </button>
            ) : (
              <span className="yn-b-end">Oxirgi sahifa</span>
            )}
          </nav>
        )}
      </div>
    </section>
  )
}
