/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */
/**
 * Bitta yangilik sahifasi (daryo.uz uslubi): çapda maqola — turkum, sana, öqiş vaqti, sarlavha, lid, surat va izoh,
 * almaşib turadigan suratlar (slayder), matn yonida birga suriladigan ulaşiş tugmalari, asl post havolasi,
 * muallif, teglar va baholar; öngda “Sönggi yangiliklar” lentasi; pastda mavzuga oid yangiliklar.
 */
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'

import { BackBtn, Reactions, RateStars, Share, Slider } from './ArticleClient'
import type { ReactionCounts, RatingStats } from '@/app/(frontend)/actions/rating'

export type ArticleData = {
  title: string
  catLabel: string
  tone: 'o' | 'g' | 'b' | 'y'
  date: string
  dateISO: string
  readMin: number
  hero: string
  heroAlt: string
  caption?: string | null
  excerpt?: string | null
  content?: SerializedEditorState | null
  gallery: { url: string; alt: string }[]
  source?: string | null
  url: string
  id: number
  author?: { name: string; position?: string | null; photo?: string | null } | null
  tags: string[]
  rating: RatingStats
  reactions: ReactionCounts
  tagHref: (t: string) => string
}
export type MiniNews = {
  href: string
  title: string
  date: string
  image: string
  catLabel: string
  tone: string
}

type P = {
  a: ArticleData
  crumbs: ReactNode
  related: MiniNews[]
  latest: MiniNews[]
  listHref: string
}

function Meta({ a }: { a: ArticleData }) {
  return (
    <div className="ar-meta">
      <span className={`chip ${a.tone}`}>{a.catLabel}</span>
      <time dateTime={a.dateISO}>{a.date}</time>
      <span aria-hidden="true">·</span>
      <span>{a.readMin} daqiqada öqiladi</span>
    </div>
  )
}

function Body({ a }: { a: ArticleData }) {
  return a.content ? (
    <div className="news-body ar-body">
      <RichText data={a.content} />
    </div>
  ) : null
}

const TG_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21.5 4.3 2.9 11.5c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8l3.3-15.4c.3-1.3-.5-1.9-1.4-1.4ZM8.9 14.2l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4-1.6-4.9Z" />
  </svg>
)

/** Asl post: Telegram belgisi bilan kanalga havola (kanalda suratlar va boşqa xabarlar) */
function Source({ a }: { a: ArticleData }) {
  if (!a.source) return null
  return (
    <a href={a.source} target="_blank" rel="noopener noreferrer" className="ar-tg">
      <span className="ar-tg-ic" aria-hidden="true">
        {TG_ICON}
      </span>
      <span>
        Asl xabar <b>“Poytaxt yoşlari”</b> Telegram kanalida
      </span>
      <svg className="ar-tg-go" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
      <span className="sr-only"> (yangi oynada oçiladi)</span>
    </a>
  )
}

/** Maqola ostida: muallif, teglar, baholaganlar, reyting, baho beriş */
function ArticleFoot({ a }: { a: ArticleData }) {
  return (
    <section className="ar-foot" aria-label="Maqola haqida">
      <div className="ar-foot-cell ar-foot-author">
        <span className="ar-foot-l">Maqola muallifi</span>
        {a.author ? (
          <div className="ar-author">
            {a.author.photo ? (
              <img src={a.author.photo} alt="" />
            ) : (
              <span className="ar-author-ini" aria-hidden="true">
                {a.author.name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')
                  .toLocaleUpperCase('uz')}
              </span>
            )}
            <span>
              <b>{a.author.name}</b>
              {a.author.position && <small>{a.author.position}</small>}
            </span>
          </div>
        ) : (
          <div className="ar-author">
            <span className="ar-author-ini" aria-hidden="true">
              AX
            </span>
            <span>
              <b>Axborot xizmati</b>
            </span>
          </div>
        )}
      </div>
      {a.tags.length > 0 && (
        <div className="ar-foot-cell ar-foot-tags">
          <span className="ar-foot-l">Teglar</span>
          <ul>
            {a.tags.map((t) => (
              <li key={t}>
                <Link href={a.tagHref(t)}>{t}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <RateStars newsId={a.id} initial={a.rating} />
    </section>
  )
}

function Related({ items, listHref }: { items: MiniNews[]; listHref: string }) {
  if (!items.length) return null
  return (
    <section className="ar-rel" aria-label="Öxşaş yangiliklar">
      <div className="ar-rel-head">
        <h2 className="ar-h">Mavzuga oid yangiliklar</h2>
        <Link href={listHref} className="more-btn">
          <More>
            Batafsil<span className="sr-only">: Barça yangiliklar</span>
          </More>
        </Link>
      </div>
      <ul className="ar-rel-grid">
        {items.map((n) => (
          <li key={n.href}>
            <Link href={n.href}>
              <span className="ar-rel-img">
                {n.image && <img src={n.image} alt="" loading="lazy" />}
              </span>
              <span className="ar-rel-meta">
                <span className={`chip ${n.tone}`}>{n.catLabel}</span>
                <time>{n.date}</time>
              </span>
              <b>{n.title}</b>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ArticleB({ a, crumbs, related, latest, listHref }: P) {
  return (
    <article className="ar ar-b">
      <section className="sec ar-sec ar-b-sec">
        <div className="wrap">
          {crumbs}
          <BackBtn href={listHref} label="Yangiliklarga qaytiş" />
          <div className="ar-b-grid">
            <div className="ar-b-main">
              <Meta a={a} />
              <h1 className="h2 pg-title ar-title">{a.title}</h1>
              {a.excerpt && <p className="ar-lede">{a.excerpt}</p>}
              <Slider
                slides={[{ url: a.hero, alt: a.heroAlt }, ...a.gallery]}
                caption={a.caption}
              />
              <div className="ar-b-body">
                <aside className="ar-b-share">
                  <Share url={a.url} title={a.title} label="Ulaşiş" vertical />
                </aside>
                <div>
                  <Body a={a} />
                  <div className="ar-end">
                    <Source a={a} />
                  </div>
                  <Reactions newsId={a.id} initial={a.reactions} url={a.url} title={a.title} />
                  <ArticleFoot a={a} />
                </div>
              </div>
            </div>
            <aside className="ar-b-side" aria-label="Sönggi yangiliklar">
              <h2 className="ar-h">Sönggi yangiliklar</h2>
              <ol>
                {latest.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>
                      <time>{n.date}</time>
                      <span>{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href={listHref} className="more-btn">
                <More>
                  Batafsil<span className="sr-only">: Barça yangiliklar</span>
                </More>
              </Link>
            </aside>
          </div>
          <Related items={related} listHref={listHref} />
        </div>
      </section>
    </article>
  )
}

export function Article(p: P) {
  return <ArticleB {...p} />
}
