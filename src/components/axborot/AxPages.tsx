/* eslint-disable @next/next/no-img-element -- galereya suratlari statik webp; CMS ulanganda next/image ga ötadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'

import { InlinePlayer, Lightbox, Pills, Search, ShowMore, VideoModal } from './AxClient'
import {
  type Album,
  ALBUM_TYPES,
  type AlbumType,
  cover,
  fullDate,
  photo,
  type Short,
  shortThumb,
} from './data'
import { MEDIA_KINDS, type MediaItem } from './oav'
import { VideoWatch } from './VideoWatch'
import { PressDesk, PressTools } from './PressClient'
import { PressDoc } from './PressDoc'
import { ORG, type PressItem } from './press'
import { getAlbums, getOav, getPress } from '@/lib/cms/axborot'
import { type PressContactT, getAloqa } from '@/lib/cms/aloqa'
import { getYoutubeFeed } from '@/lib/youtube'

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

const typePills = (ALBUMS: Album[]) =>
  (Object.keys(ALBUM_TYPES) as AlbumType[])
    .filter((t) => ALBUMS.some((a) => a.type === t))
    .map((t) => ({ v: t, l: ALBUM_TYPES[t] }))

/* ====================================================================
   FOTOGALEREYA
   ==================================================================== */

const FIRST = 9

/** Albomlar uçun umumiy asboblar: tur (sonlari bilan), qidiruv, jami */
function FotoTools({ target, albums: ALBUMS }: { target: string; albums: Album[] }) {
  const TOTAL_PHOTOS = ALBUMS.reduce((s, a) => s + a.n, 0)
  return (
    <div className="ax-tools ax-ftools">
      <Pills
        target={target}
        label="Albom turi"
        items={typePills(ALBUMS).map((t) => ({ ...t, n: ALBUMS.filter((a) => a.type === t.v).length }))}
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
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

/** Kartaning umumiy atributlari: saralaş, qidiruv, “Köproq körsatiş” */
const liAttrs = (a: Album, i: number) => ({
  'data-f': a.type,
  'data-q': `${a.title} ${a.place} ${ALBUM_TYPES[a.type]}`,
  className: i >= FIRST ? 'ax-cut' : undefined,
})

/** Fotogalereya (tasdiqlangan B varianti — albom stopkasi): muqova ortida yana 2 surat,
 *  sičqonça olib borilganda yelpiğiçdek oçiladi */
function FotoStack({ albums: ALBUMS }: { albums: Album[] }) {
  return (
    <section className="sec ax">
      <div className="wrap">
        <FotoTools target="fb-grid" albums={ALBUMS} />
        <ul className="ax-albums ax-stack-grid" id="fb-grid">
          {ALBUMS.map((a, i) => (
            <li key={a.id} {...liAttrs(a, i)}>
              <button type="button" className="ax-stack" data-album={a.id}>
                <span className="ax-stack-ph">
                  <img className="s3" src={photo(a, 3)} alt="" loading="lazy" />
                  <img className="s2" src={photo(a, 2)} alt="" loading="lazy" />
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
        <p className="ax-empty">Tanlangan tur yoki söz böyiça albom topilmadi.</p>
        <ShowMore target="fb-grid" rest={ALBUMS.length - FIRST} />
      </div>
    </section>
  )
}

function Cam() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}

export async function FotoPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const albums = await getAlbums(locale)
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="Fotogalereya" />
      <FotoStack albums={albums} />
      <Lightbox albums={albums} />
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
            <button
              type="button"
              className="ax-short"
              data-video={s.id}
              data-title={s.title}
              data-short=""
            >
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
function PressContact({ c: PRESS_CONTACT }: { c: PressContactT }) {
  return (
    <aside className="ax-pc dark">
      <h2>OAV uçun aloqa</h2>
      <p>
        Akkreditatsiya, intervyu va rasmiy izoh uçun Kengaşning {PRESS_CONTACT.unit}ga murojaat
        qiling.
      </p>
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
      <a className="ax-kit-dl" href="/img/logo-uz.png" download>
        <img src="/img/logo-uz.png" alt="" />
        <span>
          <b>Logotip (PNG)</b>
          <small>Yuklab oliş ↓</small>
        </span>
      </a>
      <p className="ax-kit-name">{ORG}</p>
    </aside>
  )
}

/** “Rasmiy blanka”: çapda hujjatlar röyxati, öngda tanlangan relizning rasmiy blankasi */
function PressA({ press, contact }: { press: PressItem[]; contact: PressContactT }) {
  return (
    <section className="sec ax">
      <div className="wrap">
        <PressDesk press={press} contact={contact} />
      </div>
    </section>
  )
}

export async function PressPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const [press, A] = await Promise.all([getPress(locale), getAloqa(locale)])
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="Press-relizlar" />
      <PressA press={press} contact={A.PRESS_CONTACT} />
    </div>
  )
}

/** Bitta press-relizning sahifasi: rasmiy blanka, asboblar, suratlar va video, OAV uçun aloqa */
export async function PressItemPage({
  crumbs,
  p,
  L,
}: {
  crumbs: ReactNode
  p: PressItem
  L: (h: string) => string
}) {
  const album = p.album ? (await getAlbums()).find((a) => a.id === p.album) : undefined
  const { PRESS_CONTACT } = await getAloqa(L('').split('/')[1] || 'uz')
  return (
    <div className="ax-page">
      <header className="pg-head">
        <div className="wrap">{crumbs}</div>
      </header>
      <section className="sec ax">
        <div className="wrap ax-press">
          <div className="pr-item">
            <PressTools docId="pr-item-doc" slug={p.slug} />
            <PressDoc p={p} id="pr-item-doc" level={1} contact={PRESS_CONTACT} />
            {album && (
              <div className="pr-media">
                <h2 className="pr-h">Suratlar</h2>
                <div className="pr-photos">
                  {Array.from({ length: Math.min(album.n, 6) }, (_, k) => (
                    <button
                      key={k}
                      type="button"
                      data-album={album.id}
                      data-i={k + 1}
                      aria-label={`${k + 1}-surat`}
                    >
                      <img src={photo(album, k + 1)} alt="" loading="lazy" />
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
            <PressContact c={PRESS_CONTACT} />
            <MediaKit />
            <Link href={L('/axborot-xizmati/press-relizlar')} className="more-btn">
              <More>
                Batafsil<span className="sr-only">: Barça press-relizlar</span>
              </More>
            </Link>
          </div>
        </div>
      </section>
      {album && <Lightbox albums={[album]} />}
    </div>
  )
}

/* ====================================================================
   OAV BIZ HAQIMIZDA
   ==================================================================== */


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
          Batafsil<span className="sr-only">: Naşrda öqiş (yangi oynada oçiladi)</span>
        </More>
      </a>
    </article>
  )
}

/** Kliping lentasi: naşr, tur va yil böyiça saralaş */
function OavA({ MEDIA }: { MEDIA: MediaItem[] }) {
  const YEARS = [...new Set(MEDIA.map((m) => m.date.slice(0, 4)))]
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

export async function OavPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const MEDIA = await getOav(locale)
  return (
    <div className="ax-page">
      <Head crumbs={crumbs} title="OAVda Kengaş haqida" />
      <OavA MEDIA={MEDIA} />
    </div>
  )
}
