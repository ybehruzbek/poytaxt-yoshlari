'use client'

import Link from 'next/link'
import { useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import type { YnCat, YnItem } from './data'
import { Chip, Empty, Img } from './YnShared'

const STEP = 6

/**
 * A — tahririyat boşi (Apple Newsroom / BBC bölim sahifasi uslubida):
 * turkum kapsulalari, bitta katta asosiy yangilik + 2 ta ikkinçi darajali, pastda 3 ustunli tör
 * va “Köproq körsatiş” tugmasi.
 */
export function VariantA({ items, cats, L }: { items: YnItem[]; cats: YnCat[]; L: string }) {
  const [cat, setCat] = useState<string>('all')
  const [shown, setShown] = useState(STEP)
  const list = cat === 'all' ? items : items.filter((i) => i.category === cat)
  const [lead, ...rest] = list
  const second = rest.slice(0, 2)
  const grid = rest.slice(2)
  const visible = grid.slice(0, shown)
  const href = (it: YnItem) => `${L}/${it.slug}`

  const pick = (v: string) => {
    setCat(v)
    setShown(STEP)
  }

  return (
    <section className="sec yn-a" aria-label="Yangiliklar">
      <div className="wrap">
        <div className="yn-a-bar" role="group" aria-label="Turkum böyiça saralaş">
          <button type="button" aria-pressed={cat === 'all'} onClick={() => pick('all')}>
            Barçasi <span>{items.length}</span>
          </button>
          {cats.map((c) => (
            <button key={c.value} type="button" aria-pressed={cat === c.value} onClick={() => pick(c.value)}>
              {c.label} <span>{c.count}</span>
            </button>
          ))}
        </div>

        {!lead ? (
          <Empty onReset={() => pick('all')} />
        ) : (
          <>
            <div className={`yn-a-top${second.length ? '' : ' solo'}`}>
              <article className="yn-a-lead">
                <Link href={href(lead)}>
                  <Img it={lead} />
                  <div className="yn-a-lead-bd">
                    <div className="yn-meta">
                      <Chip it={lead} />
                      <time dateTime={lead.dateISO}>{lead.long}</time>
                    </div>
                    <h2>{lead.title}</h2>
                    <p>{lead.excerpt}</p>
                    <span className="more-btn">
                      <More />
                    </span>
                  </div>
                </Link>
              </article>
              {second.length > 0 && (
                <ul className="yn-a-second">
                  {second.map((it) => (
                    <li key={it.id}>
                      <article>
                        <Link href={href(it)}>
                          <Img it={it} />
                          <div className="yn-meta">
                            <Chip it={it} />
                            <time dateTime={it.dateISO}>{it.long}</time>
                          </div>
                          <h3>{it.title}</h3>
                        </Link>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {visible.length > 0 && (
              <>
                <h2 className="yn-a-sub">Boşqa yangiliklar</h2>
                <ul className="yn-a-grid">
                  {visible.map((it) => (
                    <li key={it.id}>
                      <article>
                        <Link href={href(it)}>
                          <Img it={it} />
                          <div className="yn-a-card-bd">
                            <div className="yn-meta">
                              <Chip it={it} />
                              <time dateTime={it.dateISO}>{it.long}</time>
                            </div>
                            <h3>{it.title}</h3>
                            <p>{it.excerpt}</p>
                          </div>
                        </Link>
                      </article>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {grid.length > shown && (
              <div className="yn-a-more">
                <button type="button" className="btn btn-outline" onClick={() => setShown((s) => s + STEP)}>
                  Köproq körsatiş
                </button>
                <span>
                  {shown + 3} / {list.length}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
