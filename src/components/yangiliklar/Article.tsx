/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */
/**
 * Bitta yangilik sahifasi — VAQTINCHA uç dizayn varianti (tanlangaç bittasi qoladi):
 *  A — Klassik (kun.uz uslubi): sarlavha, lid, ulaşiş, keng surat va izoh, tor matn ustuni, galereya, öxşaş yangiliklar.
 *  B — Yon panelli (daryo.uz uslubi): çapda maqola va yopişqoq ulaşiş tugmalari, öngda “Sönggi yangiliklar” lentasi.
 *  C — Keng muqova (long-read): ekran kengligidagi surat ustida sarlavha, keyin yirik şriftli matn va katta galereya.
 */
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'

import { ArticleSwitch, Share } from './ArticleClient'

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
}
export type MiniNews = { href: string; title: string; date: string; image: string; catLabel: string; tone: string }

type P = { a: ArticleData; crumbs: ReactNode; related: MiniNews[]; latest: MiniNews[]; listHref: string }

const DEV = process.env.NODE_ENV !== 'production'

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

function Gallery({ a, big = false }: { a: ArticleData; big?: boolean }) {
  if (!a.gallery.length) return null
  return (
    <section className={`ar-gal${big ? ' big' : ''}`} aria-label="Fotogalereya">
      <h2 className="ar-h">Fotogalereya</h2>
      <div className="ar-gal-grid">
        {a.gallery.map((g) => (
          <a key={g.url} href={g.url} target="_blank" rel="noopener noreferrer">
            <img src={g.url} alt={g.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  )
}

function Source({ a }: { a: ArticleData }) {
  if (!a.source) return null
  return (
    <a href={a.source} target="_blank" rel="noopener noreferrer" className="more-btn ar-src">
      <More>Telegram kanalida öqiş</More>
    </a>
  )
}

function Related({ items, listHref }: { items: MiniNews[]; listHref: string }) {
  if (!items.length) return null
  return (
    <section className="ar-rel" aria-label="Öxşaş yangiliklar">
      <div className="ar-rel-head">
        <h2 className="ar-h">Mavzuga oid yangiliklar</h2>
        <Link href={listHref} className="more-btn">
          <More>Barça yangiliklar</More>
        </Link>
      </div>
      <ul className="ar-rel-grid">
        {items.map((n) => (
          <li key={n.href}>
            <Link href={n.href}>
              <span className="ar-rel-img">{n.image && <img src={n.image} alt="" loading="lazy" />}</span>
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

/* ============ A — Klassik ============ */
function ArticleA({ a, crumbs, related, listHref }: P) {
  return (
    <article className="ar ar-a">
      <header className="pg-head">
        <div className="wrap">
          <div className="ar-col-w">
            {crumbs}
            <Meta a={a} />
            <h1 className="h2 pg-title ar-title">{a.title}</h1>
            {a.excerpt && <p className="ar-lede">{a.excerpt}</p>}
            <Share url={a.url} title={a.title} />
          </div>
        </div>
      </header>
      <section className="sec ar-sec">
        <div className="wrap">
          <figure className="ar-fig ar-col-w">
            <img src={a.hero} alt={a.heroAlt} />
            {a.caption && <figcaption>{a.caption}</figcaption>}
          </figure>
          <div className="ar-col">
            <Body a={a} />
            <Gallery a={a} />
            <div className="ar-end">
              <Source a={a} />
              <Share url={a.url} title={a.title} label="Ulaşiş:" />
            </div>
          </div>
          <Related items={related} listHref={listHref} />
        </div>
      </section>
    </article>
  )
}

/* ============ B — Yon panelli ============ */
function ArticleB({ a, crumbs, related, latest, listHref }: P) {
  return (
    <article className="ar ar-b">
      <section className="sec ar-sec ar-b-sec">
        <div className="wrap">
          {crumbs}
          <div className="ar-b-grid">
            <div className="ar-b-main">
              <Meta a={a} />
              <h1 className="h2 pg-title ar-title">{a.title}</h1>
              {a.excerpt && <p className="ar-lede">{a.excerpt}</p>}
              <figure className="ar-fig">
                <img src={a.hero} alt={a.heroAlt} />
                {a.caption && <figcaption>{a.caption}</figcaption>}
              </figure>
              <div className="ar-b-body">
                <aside className="ar-b-share">
                  <Share url={a.url} title={a.title} vertical />
                </aside>
                <div>
                  <Body a={a} />
                  <Gallery a={a} />
                  <div className="ar-end">
                    <Source a={a} />
                  </div>
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
                <More>Barça yangiliklar</More>
              </Link>
            </aside>
          </div>
          <Related items={related} listHref={listHref} />
        </div>
      </section>
    </article>
  )
}

/* ============ C — Keng muqova (long-read) ============ */
function ArticleC({ a, crumbs, related, listHref }: P) {
  return (
    <article className="ar ar-c">
      <section className="sec ar-sec ar-c-sec">
        <div className="wrap">
          {crumbs}
          <figure className="ar-c-cover">
            <img src={a.hero} alt={a.heroAlt} />
            <figcaption className="ar-c-cap">
              <Meta a={a} />
              <h1 className="ar-c-title">{a.title}</h1>
            </figcaption>
          </figure>
          {a.caption && <p className="ar-c-credit">{a.caption}</p>}
          <div className="ar-col ar-c-col">
            {a.excerpt && <p className="ar-lede ar-c-lede">{a.excerpt}</p>}
            <Body a={a} />
          </div>
          <Gallery a={a} big />
          <div className="ar-col ar-end">
            <Source a={a} />
            <Share url={a.url} title={a.title} label="Ulaşiş:" />
          </div>
          <Related items={related} listHref={listHref} />
        </div>
      </section>
    </article>
  )
}

export function Article(p: P) {
  return (
    <ArticleSwitch
      a={<ArticleA {...p} />}
      b={DEV ? <ArticleB {...p} /> : undefined}
      c={DEV ? <ArticleC {...p} /> : undefined}
    />
  )
}
