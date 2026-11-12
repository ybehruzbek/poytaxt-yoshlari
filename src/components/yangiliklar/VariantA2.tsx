'use client'

import Link from 'next/link'

import { MoreList } from '@/components/site/MoreToggle'

import type { YnItem } from './data'
import { Chip, Day, Img, Read, Rubrics, When, useRubric } from './YnShared'

/** öngdagi lentada nečta yangilik */
const FEED = 10

/**
 * A2 — Daryo.uz uslubi, kattalaştirilgan boş qism:
 *  - tepada rubrikalar (son bilan);
 *  - keng rasmli katta asosiy yangilik, ostida 2 ta yordamçi yangilik (rasm + “Öqiş”);
 *  - keyin 4 ta qator: kiçik rasm, sarlavha, “Öqiş”;
 *  - öngda “Sönggi yangiliklar”: har qatorda sana kapsulasi va turkum (vaqtsiz);
 *  - pastda qolganlari 2 ustunli gorizontal kartalarda, “Köproq körsatiş” bilan.
 */
export function VariantA2({ items, L }: { items: YnItem[]; L: string }) {
  const { cat, setCat, list } = useRubric(items)
  const href = (it: YnItem) => `${L}/${it.slug}`
  const [lead, ...rest] = list
  const subs = rest.slice(0, 2)
  const rows = rest.slice(2, 6)
  const more = rest.slice(6)

  return (
    <section className="sec yn-a yn-a2" aria-label="Yangiliklar">
      <div className="wrap yn-a-grid">
        <div className="yn-a-main">
          <Rubrics items={items} cat={cat} onPick={setCat} />

          {lead && (
            <>
              <h2 className="yn-kicker">{cat === 'all' ? 'Asosiy yangiliklar' : lead.categoryLabel}</h2>
              <article className="yn-a2-lead">
                <Link href={href(lead)}>
                  <Img it={lead} />
                  <div className="yn-a2-lead-bd">
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

          {subs.length > 0 && (
            <ul className="yn-a2-subs">
              {subs.map((it) => (
                <li key={it.id}>
                  <article>
                    <Link href={href(it)}>
                      <Img it={it} />
                      <div className="yn-meta">
                        <Chip it={it} />
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

          {rows.length > 0 && (
            <ul className="yn-a2-rows">
              {rows.map((it) => (
                <li key={it.id}>
                  <article>
                    <Link href={href(it)}>
                      <Img it={it} />
                      <div>
                        <div className="yn-meta">
                          <span className="yn-cat">{it.categoryLabel}</span>
                          <When it={it} />
                        </div>
                        <h3>{it.title}</h3>
                      </div>
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
              <MoreList key={cat} as="ul" className="yn-a2-cards" noun="yangilik" first={6} id="yn-a2-more">
                {more.map((it) => (
                  <li key={it.id}>
                    <article>
                      <Link href={href(it)}>
                        <Img it={it} />
                        <div className="yn-a2-cards-bd">
                          <div className="yn-meta">
                            <Chip it={it} />
                            <When it={it} />
                          </div>
                          <h3>{it.title}</h3>
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

        <aside className="yn-a-feed yn-a2-feed" aria-labelledby="yn-a2-feed-h">
          <h2 className="yn-kicker" id="yn-a2-feed-h">
            Sönggi yangiliklar
          </h2>
          <ol>
            {items.slice(0, FEED).map((it) => (
              <li key={it.id}>
                <Link href={href(it)}>
                  <span className="yn-a2-feed-m">
                    <Day it={it} className="yn-a2-date" />
                    <span className={`yn-a2-tag ${it.tone}`}>{it.categoryLabel}</span>
                  </span>
                  <b>{it.title}</b>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}
