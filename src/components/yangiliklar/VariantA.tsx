'use client'

import Link from 'next/link'

import { MoreList } from '@/components/site/MoreToggle'

import type { YnItem } from './data'
import { Chip, Day, Img, Read, Rubrics, When, byDay, useRubric } from './YnShared'

/** asosiy + ikkinçi darajali yangiliklar soni */
const MAIN = 7
/** öngdagi lentada nečta yangilik */
const FEED = 12

/**
 * A1 — Daryo.uz uslubi, ixçam kartalar:
 *  - tepada rubrikalar (son bilan);
 *  - katta asosiy yangilik (rasm + matn + “Öqiş”);
 *  - 6 ta ikkinçi darajali yangilik — kiçik rasmli ixçam kartalar, har birida “Öqiş”;
 *  - öngda “Sönggi yangiliklar”: kunlar böyiça guruhlangan sarlavhalar (vaqtsiz);
 *  - pastda qolgan yangiliklar 3 ustunli kartalarda, “Köproq körsatiş” bilan.
 */
export function VariantA({ items, L }: { items: YnItem[]; L: string }) {
  const { cat, setCat, list } = useRubric(items)
  const href = (it: YnItem) => `${L}/${it.slug}`
  const [lead, ...rest] = list
  const second = rest.slice(0, MAIN - 1)
  const more = rest.slice(MAIN - 1)

  return (
    <section className="sec yn-a yn-a1" aria-label="Yangiliklar">
      <div className="wrap yn-a-grid">
        <div className="yn-a-main">
          <Rubrics items={items} cat={cat} onPick={setCat} />

          {lead && (
            <>
              <h2 className="yn-kicker">{cat === 'all' ? 'Asosiy yangiliklar' : lead.categoryLabel}</h2>
              <article className="yn-a1-lead">
                <Link href={href(lead)}>
                  <Img it={lead} />
                  <div className="yn-a1-lead-bd">
                    <div className="yn-meta">
                      <Chip it={lead} />
                      <When it={lead} />
                    </div>
                    <h3>{lead.title}</h3>
                    <p>{lead.excerpt}</p>
                    <Read />
                  </div>
                </Link>
              </article>
            </>
          )}

          {second.length > 0 && (
            <ul className="yn-a1-second">
              {second.map((it) => (
                <li key={it.id}>
                  <article>
                    <Link href={href(it)}>
                      <Img it={it} />
                      <div className="yn-a1-second-bd">
                        <div className="yn-meta">
                          <span className="yn-cat">{it.categoryLabel}</span>
                          <When it={it} />
                        </div>
                        <h3>{it.title}</h3>
                        <Read />
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
              <MoreList key={cat} as="ul" className="yn-a1-cards" noun="yangilik" first={6} id="yn-a1-more">
                {more.map((it) => (
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
                        <Read />
                      </Link>
                    </article>
                  </li>
                ))}
              </MoreList>
            </>
          )}
        </div>

        <aside className="yn-a-feed yn-a1-feed" aria-labelledby="yn-a1-feed-h">
          <h2 className="yn-kicker" id="yn-a1-feed-h">
            Sönggi yangiliklar
          </h2>
          {byDay(items.slice(0, FEED)).map((day) => (
            <section key={day[0].dayKey} className="yn-a1-day">
              <h3>
                <Day it={day[0]} className="" />
              </h3>
              <ol>
                {day.map((it) => (
                  <li key={it.id}>
                    <Link href={href(it)}>
                      <i className={`yn-dot ${it.tone}`} aria-hidden="true" />
                      <span>
                        {it.title}
                        <small>{it.categoryLabel}</small>
                      </span>
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
