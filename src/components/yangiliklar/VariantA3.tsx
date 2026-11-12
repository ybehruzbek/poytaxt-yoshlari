'use client'

import Link from 'next/link'

import { MoreList } from '@/components/site/MoreToggle'

import type { YnItem } from './data'
import { Chip, Day, Img, Read, Rubrics, When, byDay, useRubric } from './YnShared'

/** öngdagi lentada nečta yangilik */
const FEED = 12

/**
 * A3 — Kun.uz/Daryo.uz uslubi, rasm ustida sarlavha:
 *  - tepada rubrikalar (son bilan);
 *  - asosiy yangilik — butun rasm ustida sarlavha va “Öqiş” (pastki qorayiş);
 *  - 6 ta ikkinçi darajali yangilik — 3 ustunli rasmli kartalar, har birida “Öqiş”;
 *  - öngda “Sönggi yangiliklar”: kunlar böyiça vaqt çizigi (vaqtsiz, faqat sana);
 *  - pastda qolganlari keng qatorlar (rasm, sarlavha, qisqa matn, “Öqiş”), “Köproq körsatiş” bilan.
 */
export function VariantA3({ items, L }: { items: YnItem[]; L: string }) {
  const { cat, setCat, list } = useRubric(items)
  const href = (it: YnItem) => `${L}/${it.slug}`
  const [lead, ...rest] = list
  const second = rest.slice(0, 6)
  const more = rest.slice(6)

  return (
    <section className="sec yn-a yn-a3" aria-label="Yangiliklar">
      <div className="wrap yn-a-grid">
        <div className="yn-a-main">
          <Rubrics items={items} cat={cat} onPick={setCat} />

          {lead && (
            <>
              <h2 className="yn-kicker">{cat === 'all' ? 'Asosiy yangiliklar' : lead.categoryLabel}</h2>
              <article className="yn-a3-lead">
                <Link href={href(lead)}>
                  <Img it={lead} />
                  <div className="yn-a3-lead-bd">
                    <div className="yn-meta">
                      <Chip it={lead} />
                      <When it={lead} />
                    </div>
                    <h3>{lead.title}</h3>
                    <Read />
                  </div>
                </Link>
              </article>
            </>
          )}

          {second.length > 0 && (
            <ul className="yn-a3-second">
              {second.map((it) => (
                <li key={it.id}>
                  <article>
                    <Link href={href(it)}>
                      <Img it={it} />
                      <div className="yn-meta">
                        <span className="yn-cat">{it.categoryLabel}</span>
                        <When it={it} />
                      </div>
                      <h3>{it.title}</h3>
                      <Read />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {more.length > 0 && (
            <>
              <h2 className="yn-kicker yn-a-sub">Boşqa yangiliklar</h2>
              <MoreList key={cat} as="ul" className="yn-a3-rows" noun="yangilik" first={6} id="yn-a3-more">
                {more.map((it) => (
                  <li key={it.id}>
                    <article>
                      <Link href={href(it)}>
                        <Img it={it} />
                        <div className="yn-a3-rows-bd">
                          <div className="yn-meta">
                            <Chip it={it} />
                            <When it={it} />
                          </div>
                          <h3>{it.title}</h3>
                          <p>{it.excerpt}</p>
                          <Read />
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </MoreList>
            </>
          )}
        </div>

        <aside className="yn-a-feed yn-a3-feed" aria-labelledby="yn-a3-feed-h">
          <h2 className="yn-kicker" id="yn-a3-feed-h">
            Sönggi yangiliklar
          </h2>
          {byDay(items.slice(0, FEED)).map((day) => (
            <section key={day[0].dayKey} className="yn-a3-day">
              <h3>
                <Day it={day[0]} className="" />
                <small>{day.length} ta</small>
              </h3>
              <ol>
                {day.map((it) => (
                  <li key={it.id} className={it.tone}>
                    <Link href={href(it)}>
                      <small>{it.categoryLabel}</small>
                      <span>{it.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </aside>
      </div>
    </section>
  )
}
