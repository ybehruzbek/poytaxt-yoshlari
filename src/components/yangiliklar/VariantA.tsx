'use client'

import Link from 'next/link'
import { useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import type { YnItem } from './data'
import { Chip, Img, When } from './YnShared'

/** asosiy + ikkinçi darajali yangiliklar soni */
const MAIN = 7
const STEP = 6
/** öngdagi lentada nečta yangilik */
const FEED = 12

/**
 * A — Daryo.uz uslubi (portal boşi):
 *  - tepada rubrikalar (turkum böyiça saralaş, har birida son);
 *  - “Asosiy yangiliklar”: keng rasmli bitta katta yangilik va uning ostida 6 ta ikkinçi darajali sarlavha;
 *  - öngda “Sönggi yangiliklar” lentasi: kunlar böyiça guruhlangan, har qatorda vaqt va turkum rangi;
 *  - qolgan yangiliklar pastda, “Köproq körsatiş” bilan oçiladi.
 * Körişlar soni körsatilmaydi (bazada yöq).
 */
export function VariantA({ items, L }: { items: YnItem[]; L: string }) {
  const [cat, setCat] = useState<'all' | YnItem['category']>('all')
  const [shown, setShown] = useState(STEP)
  const href = (it: YnItem) => `${L}/${it.slug}`

  const cats = [...new Map(items.map((it) => [it.category, it.categoryLabel])).entries()]
  const list = cat === 'all' ? items : items.filter((it) => it.category === cat)
  const [lead, ...rest] = list
  const second = rest.slice(0, MAIN - 1)
  const more = rest.slice(MAIN - 1)

  const feed = items.slice(0, FEED)
  const days = [...new Set(feed.map((it) => it.dayKey))]

  const pick = (k: typeof cat) => {
    setCat(k)
    setShown(STEP)
  }

  return (
    <section className="sec yn-a" aria-label="Yangiliklar">
      <div className="wrap yn-a-grid">
        <div className="yn-a-main">
          <div className="yn-a-rub" role="group" aria-label="Rubrikalar">
            <button type="button" aria-pressed={cat === 'all'} onClick={() => pick('all')}>
              Barçasi <span>{items.length}</span>
            </button>
            {cats.map(([k, label]) => (
              <button key={k} type="button" aria-pressed={cat === k} onClick={() => pick(k)}>
                {label} <span>{items.filter((it) => it.category === k).length}</span>
              </button>
            ))}
          </div>

          {lead && (
            <>
              <h2 className="yn-kicker">{cat === 'all' ? 'Asosiy yangiliklar' : lead.categoryLabel}</h2>
              <article className="yn-a-lead">
                <Link href={href(lead)}>
                  <Img it={lead} />
                  <div className="yn-a-lead-bd">
                    <div className="yn-meta">
                      <Chip it={lead} />
                      <When it={lead} />
                    </div>
                    <h3>{lead.title}</h3>
                    <p>{lead.excerpt}</p>
                    <span className="more-btn">
                      <More>Öqiş</More>
                    </span>
                  </div>
                </Link>
              </article>
            </>
          )}

          {second.length > 0 && (
            <ul className="yn-a-second">
              {second.map((it) => (
                <li key={it.id}>
                  <article>
                    <Link href={href(it)}>
                      <Img it={it} />
                      <div>
                        <h3>{it.title}</h3>
                        <div className="yn-meta">
                          <span className="yn-cat">{it.categoryLabel}</span>
                          <When it={it} />
                        </div>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {more.length > 0 && (
            <>
              <h2 className="yn-kicker yn-a-sub">Boşqa yangiliklar</h2>
              <ul className="yn-a-cards">
                {more.slice(0, shown).map((it) => (
                  <li key={it.id}>
                    <article>
                      <Link href={href(it)}>
                        <Img it={it} />
                        <div className="yn-meta">
                          <Chip it={it} />
                          <When it={it} />
                        </div>
                        <h3>{it.title}</h3>
                        <p>{it.excerpt}</p>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
              {more.length > shown && (
                <button type="button" className="more-btn yn-more" onClick={() => setShown((s) => s + STEP)}>
                  <More>Köproq körsatiş</More>
                </button>
              )}
            </>
          )}
        </div>

        <aside className="yn-a-feed" aria-labelledby="yn-a-feed-h">
          <h2 className="yn-kicker" id="yn-a-feed-h">
            Sönggi yangiliklar
          </h2>
          {days.map((d) => {
            const day = feed.filter((it) => it.dayKey === d)
            return (
              <section key={d} className="yn-a-day">
                <h3>{day[0].rel}</h3>
                <ol>
                  {day.map((it) => (
                    <li key={it.id}>
                      <Link href={href(it)}>
                        <time dateTime={it.dateISO}>{it.time}</time>
                        <span>
                          {it.title}
                          <small className={`yn-a-dot ${it.tone}`}>{it.categoryLabel}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </aside>
      </div>
    </section>
  )
}
