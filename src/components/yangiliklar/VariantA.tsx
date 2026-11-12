'use client'

import Link from 'next/link'
import { useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import type { YnItem } from './data'
import { Chip, Img, When } from './YnShared'

const MAIN = 7
const STEP = 6

/**
 * A — Daryo.uz uslubi (portal boşi). daryo.uz bosh sahifasidan olingan:
 *  - “Asosiy yangiliklar”: bitta katta yangilik (sarlavha + qisqa matn + “Bugun, 11:55” + “Öqiş”),
 *    uning ostida vaqti körsatilgan 6 ta ikkinçi darajali sarlavha;
 *  - öng tomonda uzun “Sönggi yangiliklar” lentasi: har qatorda vaqt va sarlavha;
 *  - qolgan yangiliklar pastda, “Köproq körsatiş” bilan oçiladi.
 * Körişlar soni körsatilmaydi (bazada yöq).
 */
export function VariantA({ items, L }: { items: YnItem[]; L: string }) {
  const [shown, setShown] = useState(STEP)
  const [lead, ...rest] = items
  const second = rest.slice(0, MAIN - 1)
  const more = rest.slice(MAIN - 1)
  const href = (it: YnItem) => `${L}/${it.slug}`

  return (
    <section className="sec yn-a" aria-label="Yangiliklar">
      <div className="wrap yn-a-grid">
        <div className="yn-a-main">
          <h2 className="yn-kicker">Asosiy yangiliklar</h2>
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
          <ol>
            {items.map((it) => (
              <li key={it.id}>
                <Link href={href(it)}>
                  <time dateTime={it.dateISO}>
                    <b>{it.time}</b>
                    <small>{it.rel}</small>
                  </time>
                  <span>{it.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}
