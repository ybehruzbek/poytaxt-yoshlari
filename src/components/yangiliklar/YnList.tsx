'use client'

import Link from 'next/link'

import { MoreList } from '@/components/site/MoreToggle'

import type { YnItem } from './data'
import { Chip, Day, Img, Read, Rubrics, When, byDay, useRubric } from './YnShared'

/** öngdagi lentada nečta yangilik */
const FEED = 12

/**
 * Yangiliklar röyxati (tasdiqlangan köriniş):
 *  - tepada rubrikalar (son bilan);
 *  - asosiy yangilik — rasm ustida sarlavha va “Batafsil”;
 *  - qolgan barça yangiliklar — bitta 3 ustunli röyxat, har birida “Batafsil”;
 *    dastlab 6 ta, qolgani “Köproq körsatiş” / “Yiğiş” bilan yiğilib-oçiladi;
 *  - öngda “Sönggi yangiliklar”: kunlar böyiça vaqt çizigi (faqat sana).
 */
export function YnList({ items, L }: { items: YnItem[]; L: string }) {
  const { cat, setCat, list } = useRubric(items)
  const href = (it: YnItem) => `${L}/${it.slug}`
  const [lead, ...rest] = list

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

          {rest.length > 0 && (
            <MoreList key={cat} as="ul" className="yn-a3-second" noun="yangilik" first={6} id="yn-royxat">
              {rest.map((it) => (
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
            </MoreList>
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
