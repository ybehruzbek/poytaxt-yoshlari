/* eslint-disable @next/next/no-img-element -- galereya suratlari statik webp; CMS ulanganda next/image ga ötadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'
import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { InlinePlayer, Lightbox, Pills, Search, ShowMore, VideoModal } from './AxClient'
import {
  ALBUM_TYPES,
  ALBUMS,
  type AlbumType,
  cover,
  dayMonth,
  fullDate,
  photo,
  PRESS_CONTACT,
  type Short,
  shortThumb,
} from './data'
import { MEDIA, MEDIA_KINDS, type MediaItem } from './oav'
import { VideoWatch } from './VideoWatch'
import { PressDesk, PressRegistry, PressTools } from './PressClient'
import { PressDoc } from './PressDoc'
import { ORG, PRESS, type PressItem } from './press'
import { getYoutubeFeed } from '@/lib/youtube'

/** VAQTINÇA: variantlar faqat işlab çiqiş rejimida; saytda — A */
const DEV = process.env.NODE_ENV !== 'production'

function Variants({ name, views }: { name: string; views: ReactNode[] }) {
  if (!DEV) return <>{views[0]}</>
  return (
    <>
      {views.map((v, i) => (
        <div key={i} className="vx" data-v={`${name}-${String.fromCharCode(97 + i)}`}>
          {v}
        </div>
      ))}
    </>
  )
}

function Head({ crumbs, title, lead }: { crumbs: ReactNode; title: string; lead?: string }) {
  return (
    <header className="pg-head">
      <div className="wrap">
        {crumbs}
        <h1 className="h2 pg-title">{title}</h1>
        {lead && <p className="pg-lead">{lead}</p>}
      </div>
    </header>
  )
}


const TYPE_PILLS = (Object.keys(ALBUM_TYPES) as AlbumType[])
  .filter((t) => ALBUMS.some((a) => a.type === t))
  .map((t) => ({ v: t, l: ALBUM_TYPES[t] }))

const TOTAL_PHOTOS = ALBUMS.reduce((s, a) => s + a.n, 0)

/* ====================================================================
   FOTOGALEREYA
   ==================================================================== */

const FIRST = 9

/** Albomlar uçun umumiy asboblar: tur (sonlari bilan), qidiruv, jami */
function FotoTools({ target }: { target: string }) {
  return (
    <div className="ax-tools ax-ftools">
      <Pills
        target={target}
        label="Albom turi"
        items={TYPE_PILLS.map((t) => ({ ...t, n: ALBUMS.filter((a) => a.type === t.v).length }))}
      />
      <div className="ax-ftools-r">
        <Search target={target} placeholder="Tadbir yoki OTT nomi" />
        <p className="ax-total">
          {ALBUMS.length} ta albom · {TOTAL_PHOTOS} ta surat
        </p>
      </div>
    </div>
  )
}

function Pin() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

/** Kartaning umumiy atributlari: saralaş, qidiruv, “Köproq körsatiş” */
const liAttrs = (a: (typeof ALBUMS)[number], i: number) => ({
  'data-f': a.type,
  'data-q': `${a.title} ${a.place} ${ALBUM_TYPES[a.type]}`,
  className: i >= FIRST ? 'ax-cut' : undefined,
})

/** Fotogalereya (tasdiqlangan B varianti — albom stopkasi): muqova ortida yana 2 surat,
 *  sičqonça olib borilganda yelpiğiçdek oçiladi */
function FotoStack() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <FotoTools target="fb-grid" />
        <ul className="ax-albums ax-stack-grid" id="fb-grid">
          {ALBUMS.map((a, i) => (
            <li key={a.id} {...liAttrs(a, i)}>
              <button type="button" className="ax-stack" data-album={a.id}>
                <span className="ax-stack-ph">
                  <img className="s3" src={photo(a.id, 3)} alt="" loading="lazy" />
                  <img className="s2" src={photo(a.id, 2)} alt="" loading="lazy" />
                  <img className="s1" src={cover(a)} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
                  <span className="ax-album-n">
                    <Cam /> {a.n}
                  </span>
                </span>
                <span className="ax-stack-b">
                  <span className="ax-stack-meta">
                    <time dateTime={a.date}>{fullDate(a.date)}</time>
                    <span className="ax-chip">{ALBUM_TYPES[a.type]}</span>
                  </span>
                  <b>{a.title}</b>
                  <small>
                    <Pin /> {a.place}
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="ax-empty">Bu söz böyiça albom topilmadi.</p>
        <ShowMore target="fb-grid" rest={ALBUMS.length - FIRST} />
      </div>
    </section>
  )
}

function Cam() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}

export function FotoPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="Fotogalereya" />
      <FotoStack />
      <Lightbox />
    </div>
  )
}


/* ====================================================================
   VIDEOGALEREYA
   ==================================================================== */

function ShortsRail({ shorts }: { shorts: Short[] }) {
  return (
    <div className="ax-shorts">
      <div className="ax-row-h">
        <h2>Qisqa videolar</h2>
        <span>{shorts.length} ta</span>
      </div>
      <ul className="ax-rail">
        {shorts.map((s) => (
          <li key={s.id}>
            <button type="button" className="ax-short" data-video={s.id} data-title={s.title} data-short="">
              <img src={shortThumb(s.id)} alt="" loading="lazy" />
              <span className="ax-play sm" aria-hidden="true" />
              <b>{s.title}</b>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Videogalereya (tasdiqlangan C varianti): çapda pleyer, öngda videolar röyxati, pastda qisqa videolar.
 *  Videolar Kengaşning rasmiy YouTube kanalidan avtomatik olinadi (lib/youtube.ts). */
export async function VideoPage({ crumbs }: { crumbs: ReactNode }) {
  const { videos, shorts } = await getYoutubeFeed()
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="Videogalereya" />
      <section className="sec ax">
        <div className="wrap">
          <VideoWatch videos={videos} />
          <ShortsRail shorts={shorts} />
        </div>
      </section>
      <VideoModal />
    </div>
  )
}

/* ====================================================================
   PRESS-RELIZLAR
   ==================================================================== */

/** Jurnalistlar uçun aloqa (har variantda bir xil) */
function PressContact() {
  return (
    <aside className="ax-pc dark">
      <h2>OAV uçun aloqa</h2>
      <p>Akkreditatsiya, intervyu va rasmiy izoh uçun Kengaş {PRESS_CONTACT.unit.toLowerCase()}.</p>
      <ul>
        <li>
          <span>Telefon</span>
          <a href={PRESS_CONTACT.phone.href}>{PRESS_CONTACT.phone.v}</a>
        </li>
        <li>
          <span>Elektron poçta</span>
          <a href={PRESS_CONTACT.email.href}>{PRESS_CONTACT.email.v}</a>
        </li>
        <li>
          <span>Telegram</span>
          <a href={PRESS_CONTACT.telegram.href} target="_blank" rel="noopener noreferrer">
            {PRESS_CONTACT.telegram.v}
          </a>
        </li>
      </ul>
    </aside>
  )
}

function MediaKit() {
  return (
    <aside className="ax-kit">
      <h2>Media-töplam</h2>
      <p>Kengaş logotipi — naşrlarda foydalaniş uçun.</p>
      <a className="ax-kit-dl" href="/img/logo-toshkent.png" download>
        <img src="/img/logo-toshkent.png" alt="" />
        <span>
          <b>Logotip (PNG)</b>
          <small>Yuklab oliş ↓</small>
        </span>
      </a>
      <p className="ax-kit-name">{ORG}</p>
    </aside>
  )
}

const relHref = (L: (h: string) => string, slug: string) => L(`/axborot-xizmati/press-relizlar/${slug}`)

/** A — “Rasmiy blanka”: çapda hujjatlar röyxati, öngda tanlangan relizning rasmiy blankasi */
function PressA() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <PressDesk />
      </div>
    </section>
  )
}

/** B — “Matbuot xonasi”: OAV uçun anonslar, keyin press-relizlar; har biri alohida sahifada töliq */
function PressB({ L }: { L: (h: string) => string }) {
  const anons = PRESS.filter((p) => p.kind === 'anons')
  const rel = PRESS.filter((p) => p.kind === 'reliz')
  return (
    <section className="sec ax">
      <div className="wrap ax-press">
        <div>
          <h2 className="pr-h">OAV uçun anonslar</h2>
          <ul className="pr-anons">
            {anons.map((p) => (
              <li key={p.slug}>
                <div className="pr-anons-when">
                  <b>{p.event!.when}</b>
                  {p.event!.time && <span>soat {p.event!.time}</span>}
                </div>
                <div className="pr-anons-b">
                  <h3>
                    <Link href={relHref(L, p.slug)}>{p.title}</Link>
                  </h3>
                  <p className="pr-anons-place">
                    <Pin /> {p.event!.place}
                  </p>
                  <p>{p.lead}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="pr-h">Press-relizlar</h2>
          <ol className="pr-list">
            {rel.map((p) => (
              <li key={p.slug}>
                <article>
                  <p className="pr-dateline">Toşkent, {fullDate(p.date)}</p>
                  <h3>
                    <Link href={relHref(L, p.slug)}>{p.title}</Link>
                  </h3>
                  <p>{p.lead}</p>
                  {p.facts && (
                    <ul className="pr-list-facts">
                      {p.facts.map((f) => (
                        <li key={f.k}>
                          <b>{f.v}</b> {f.k}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href={relHref(L, p.slug)} className="more-btn">
                    <More>Töliq matn</More>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </div>
        <div className="ax-side">
          <PressContact />
          <MediaKit />
        </div>
      </div>
    </section>
  )
}

/** C — “Hujjatlar reyestri”: yillar böyiça jadval, tur böyiça saralaş, qidiruv; blanka oyna ičida */
function PressC({ L }: { L: (h: string) => string }) {
  return (
    <section className="sec ax">
      <div className="wrap ax-press">
        <PressRegistry base={L('')} />
        <div className="ax-side">
          <PressContact />
          <MediaKit />
        </div>
      </div>
    </section>
  )
}

export function PressPage({ crumbs, L }: { crumbs: ReactNode; L: (h: string) => string }) {
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="Press-relizlar" />
      <Variants name="pr" views={[<PressA key="a" />, <PressB key="b" L={L} />, <PressC key="c" L={L} />]} />
      {DEV && <DevSectionsPanel sections={PANEL_PRESS} />}
    </div>
  )
}

const PANEL_PRESS: PanelSection[] = [
  {
    name: 'pr',
    label: 'Press-relizlar',
    count: 3,
    hints: ['Rasmiy blanka: röyxat + hujjat', 'Matbuot xonasi: anonslar + relizlar', 'Hujjatlar reyestri: jadval + oyna'],
  },
]

/** Bitta press-relizning sahifasi: rasmiy blanka, asboblar, suratlar va video, OAV uçun aloqa */
export function PressItemPage({ crumbs, p, L }: { crumbs: ReactNode; p: PressItem; L: (h: string) => string }) {
  const album = p.album ? ALBUMS.find((a) => a.id === p.album) : undefined
  return (
    <div className="ax-page">
      <header className="pg-head">
        <div className="wrap">{crumbs}</div>
      </header>
      <section className="sec ax">
        <div className="wrap ax-press">
          <div className="pr-item">
            <PressTools docId="pr-item-doc" slug={p.slug} />
            <PressDoc p={p} id="pr-item-doc" />
            {album && (
              <div className="pr-media">
                <h2 className="pr-h">Suratlar</h2>
                <div className="pr-photos">
                  {Array.from({ length: Math.min(album.n, 6) }, (_, k) => (
                    <button key={k} type="button" data-album={album.id} data-i={k + 1} aria-label={`${k + 1}-surat`}>
                      <img src={photo(album.id, k + 1)} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {p.video && (
              <div className="pr-media">
                <h2 className="pr-h">Video</h2>
                <InlinePlayer id={p.video} title={p.title} />
              </div>
            )}
          </div>
          <div className="ax-side">
            <PressContact />
            <MediaKit />
            <Link href={L('/axborot-xizmati/press-relizlar')} className="more-btn">
              <More>Barça press-relizlar</More>
            </Link>
          </div>
        </div>
      </section>
      {album && <Lightbox />}
    </div>
  )
}

/* ====================================================================
   OAV BIZ HAQIMIZDA
   ==================================================================== */

const OUTLETS = [...new Set(MEDIA.map((m) => m.outlet))]
const YEARS = [...new Set(MEDIA.map((m) => m.date.slice(0, 4)))]

function Ext() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

/** Naşr belgisi: naşrning öz saytidagi rasmiy belgisi (favicon) */
function Badge({ m }: { m: MediaItem }) {
  return (
    <span className="ax-ob" aria-hidden="true">
      <img src={`/img/axborot/oav/${m.domain}.png`} alt="" loading="lazy" />
    </span>
  )
}

function Clip({ m, quote = false }: { m: MediaItem; quote?: boolean }) {
  return (
    <article className="ax-clip">
      <header>
        <Badge m={m} />
        <span>
          <b>{m.outlet}</b>
          <small>
            {m.domain} · {fullDate(m.date)}
            {m.lang === 'ru' ? ' · rus tilida' : ''}
          </small>
        </span>
      </header>
      <h3>{m.title}</h3>
      {quote ? <p className="ax-clip-q">{m.sum}</p> : <p>{m.sum}</p>}
      <a href={m.url} target="_blank" rel="noopener noreferrer" className="more-btn ax-clip-a">
        <More>
          Naşrda öqiş<span className="sr-only"> (yangi oynada oçiladi)</span>
        </More>
      </a>
    </article>
  )
}

/** A — kliping lentasi: naşr, tur va yil böyiça saralaş */
function OavA() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-tools">
          <Pills
            target="oa-list"
            label="Saralaş"
            items={[
              ...Object.entries(MEDIA_KINDS).map(([v, l]) => ({ v, l })),
              ...YEARS.slice(0, 4).map((y) => ({ v: `y${y}`, l: `${y}-yil` })),
            ]}
          />
          <p className="ax-total">{MEDIA.length} ta material</p>
        </div>
        <ul className="ax-clips" id="oa-list">
          {MEDIA.map((m) => (
            <li key={m.url} data-f={`${m.kind} y${m.date.slice(0, 4)}`}>
              <Clip m={m} quote />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** B — raqamlar va naşrlar devori, pastda yillar böyiça röyxat */
function OavB() {
  const byYear = YEARS.map((y) => [y, MEDIA.filter((m) => m.date.startsWith(y))] as const)
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-ostat">
          <div>
            <b>{MEDIA.length}</b>
            <span>material</span>
          </div>
          <div>
            <b>{OUTLETS.length}</b>
            <span>naşr va sayt</span>
          </div>
          <div>
            <b>{MEDIA.filter((m) => m.kind === 'gov').length}</b>
            <span>davlat organlari saytlarida</span>
          </div>
        </div>
        <ul className="ax-owall" aria-label="Naşrlar">
          {OUTLETS.map((o) => {
            const m = MEDIA.find((x) => x.outlet === o)!
            return (
              <li key={o}>
                <Badge m={m} />
                <span>
                  <b>{o}</b>
                  <small>{MEDIA.filter((x) => x.outlet === o).length} ta material</small>
                </span>
              </li>
            )
          })}
        </ul>
        <div className="ax-oyears">
          {byYear.map(([y, list]) => (
            <section key={y}>
              <h2 className="ax-tl-h">{y}</h2>
              <ol>
                {list.map((m) => (
                  <li key={m.url}>
                    <time dateTime={m.date}>{dayMonth(m.date)}</time>
                    <span className="ax-oy-o">{m.outlet}</span>
                    <a href={m.url} target="_blank" rel="noopener noreferrer">
                      {m.title} <Ext />
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

/** C — vaqt çizigi: yil va oy böyiça, har material — sana nuqtasi va karta */
function OavC() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-hub-top">
          <Search target="oc-list" placeholder="Sarlavha yoki naşr nomi böyiça qidiriş" />
        </div>
        <ol className="ax-otl" id="oc-list">
          {MEDIA.map((m) => (
            <li key={m.url} data-q={`${m.title} ${m.outlet} ${m.domain}`}>
              <time dateTime={m.date}>
                <b>{m.date.slice(0, 4)}</b>
                <span>{dayMonth(m.date)}</span>
              </time>
              <Clip m={m} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function OavPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="OAV biz haqimizda" />
      <Variants name="oa" views={[<OavA key="a" />, <OavB key="b" />, <OavC key="c" />]} />
      {DEV && <DevSectionsPanel sections={PANEL_OAV} />}
    </div>
  )
}

const PANEL_OAV: PanelSection[] = [
  {
    name: 'oa',
    label: 'OAV biz haqimizda',
    count: 3,
    hints: ['Kliping lentasi + saralaş', 'Raqamlar + naşrlar devori', 'Vaqt çizigi + qidiruv'],
  },
]
