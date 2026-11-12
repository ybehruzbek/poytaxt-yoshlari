/* eslint-disable @next/next/no-img-element -- galereya suratlari statik webp; CMS ulanganda next/image ga ötadi */
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { InlinePlayer, Lightbox, Pills, Search, VideoModal } from './AxClient'
import {
  ALBUM_TYPES,
  ALBUMS,
  type AlbumType,
  cover,
  dayMonth,
  dur,
  fullDate,
  monthKey,
  photo,
  PRESS_CONTACT,
  RELEASE_TYPES,
  RELEASES,
  type Release,
  SERIES,
  SHORTS,
  shortThumb,
  thumb,
  VIDEO_TYPES,
  VIDEOS,
  type Video,
} from './data'
import { MEDIA, MEDIA_KINDS, type MediaItem } from './oav'
import { VideoWatch } from './VideoWatch'

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

function Head({ crumbs, title, lead }: { crumbs: ReactNode; title: string; lead: string }) {
  return (
    <header className="pg-head">
      <div className="wrap">
        {crumbs}
        <h1 className="h2 pg-title">{title}</h1>
        <p className="pg-lead">{lead}</p>
      </div>
    </header>
  )
}

/** Oy böyiça guruhlaş (sana kamayiş tartibida) */
function byMonth<T extends { date: string }>(list: T[]) {
  const m = new Map<string, T[]>()
  for (const x of list) {
    const k = monthKey(x.date)
    m.set(k, [...(m.get(k) ?? []), x])
  }
  return [...m.entries()]
}

const TYPE_PILLS = (Object.keys(ALBUM_TYPES) as AlbumType[])
  .filter((t) => ALBUMS.some((a) => a.type === t))
  .map((t) => ({ v: t, l: ALBUM_TYPES[t] }))

const TOTAL_PHOTOS = ALBUMS.reduce((s, a) => s + a.n, 0)

/* ====================================================================
   FOTOGALEREYA
   ==================================================================== */

/** A — albomlar töri: muqova, suratlar soni, sana, tur böyiça saralaş */
function FotoA() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-tools">
          <Pills target="fa-grid" items={TYPE_PILLS} label="Albom turi" />
          <p className="ax-total">
            {ALBUMS.length} ta albom · {TOTAL_PHOTOS} ta surat
          </p>
        </div>
        <ul className="ax-albums" id="fa-grid">
          {ALBUMS.map((a) => (
            <li key={a.id} data-f={a.type}>
              <button type="button" className="ax-album" data-album={a.id}>
                <span className="ax-album-ph">
                  <img src={cover(a)} alt="" loading="lazy" />
                  <span className="ax-album-n">
                    <Cam /> {a.n}
                  </span>
                  <span className="ax-date">{dayMonth(a.date)}</span>
                </span>
                <span className="ax-album-b">
                  <span className="ax-chip">{ALBUM_TYPES[a.type]}</span>
                  <b>{a.title}</b>
                  <small>{a.place}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** B — oylar böyiça xronologiya: har tadbir — qator va suratlar tasmasi */
function FotoB() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-tl">
          {byMonth(ALBUMS).map(([m, list]) => (
            <section key={m} className="ax-tl-m">
              <h2 className="ax-tl-h">{m}</h2>
              <ol>
                {list.map((a) => (
                  <li key={a.id} className="ax-tl-row">
                    <div className="ax-tl-txt">
                      <time dateTime={a.date}>{dayMonth(a.date)}</time>
                      <b>{a.title}</b>
                      <small>
                        {ALBUM_TYPES[a.type]} · {a.place}
                      </small>
                    </div>
                    <div className="ax-tl-strip">
                      {Array.from({ length: Math.min(a.n, 5) }, (_, k) => (
                        <button key={k} type="button" data-album={a.id} data-i={k + 1} aria-label={`${a.title}: ${k + 1}-surat`}>
                          <img src={photo(a.id, k + 1)} alt="" loading="lazy" />
                          {k === 4 && a.n > 5 && <span className="ax-more-n">+{a.n - 5}</span>}
                        </button>
                      ))}
                    </div>
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

/** C — tahririyat uslubi: haftaning albomi (mozaika), keyin “devor” */
function FotoC() {
  const [lead, ...rest] = ALBUMS
  return (
    <>
      <section className="ax-feat">
        <div className="wrap ax-feat-in">
          <div className="ax-feat-txt">
            <span className="ax-chip on-dark">Haftaning albomi</span>
            <h2>{lead.title}</h2>
            <p>
              {fullDate(lead.date)} · {lead.place}
            </p>
            <button type="button" className="btn btn-primary" data-album={lead.id}>
              Albomni oçiş · {lead.n} surat
            </button>
          </div>
          <div className="ax-mosaic">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} type="button" data-album={lead.id} data-i={i} aria-label={`${i}-surat`}>
                <img src={photo(lead.id, i)} alt="" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="sec ax">
        <div className="wrap">
          <div className="ax-stats">
            <div>
              <b>{ALBUMS.length}</b>
              <span>albom</span>
            </div>
            <div>
              <b>{TOTAL_PHOTOS}</b>
              <span>surat</span>
            </div>
            <div>
              <b>{new Set(ALBUMS.map((a) => a.place)).size}</b>
              <span>maskan</span>
            </div>
          </div>
          <div className="ax-wall">
            {rest.map((a, i) => (
              <button key={a.id} type="button" className={`ax-wall-it${i % 3 === 0 ? ' tall' : ''}`} data-album={a.id}>
                <img src={cover(a)} alt="" loading="lazy" />
                <span className="ax-wall-cap">
                  <small>
                    {dayMonth(a.date)} · {a.n} surat
                  </small>
                  <b>{a.title}</b>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
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
      <Head
        crumbs={crumbs}
        title="Fotogalereya"
        lead="Kengaş va oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar tadbirlaridan suratlar: uçraşuvlar, forumlar, yiğilişlar va sayohatlar."
      />
      <Variants name="fg" views={[<FotoA key="a" />, <FotoB key="b" />, <FotoC key="c" />]} />
      <Lightbox />
      {DEV && <DevSectionsPanel sections={PANEL_FOTO} />}
    </div>
  )
}

const PANEL_FOTO: PanelSection[] = [
  {
    name: 'fg',
    label: 'Fotogalereya',
    count: 3,
    hints: ['Albomlar töri + saralaş', 'Oylar böyiça xronologiya', 'Haftaning albomi + devor'],
  },
]

/* ====================================================================
   VIDEOGALEREYA
   ==================================================================== */

function VCard({ v }: { v: Video }) {
  return (
    <button type="button" className="ax-vc" data-video={v.id}>
      <span className="ax-vc-ph">
        <img src={thumb(v.id)} alt="" loading="lazy" />
        <span className="ax-play sm" aria-hidden="true" />
        <span className="ax-dur">{dur(v.sec)}</span>
      </span>
      <span className="ax-vc-b">
        <span className="ax-chip">{VIDEO_TYPES[v.type]}</span>
        <b>{v.title}</b>
        <small>{fullDate(v.date)}</small>
      </span>
    </button>
  )
}

function ShortsRail() {
  return (
    <div className="ax-shorts">
      <div className="ax-row-h">
        <h2>Qisqa videolar</h2>
        <span>{SHORTS.length} ta</span>
      </div>
      <ul className="ax-rail">
        {SHORTS.map((s) => (
          <li key={s.id}>
            <button type="button" className="ax-short" data-video={s.id}>
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

/** A — asosiy pleyer + videolar töri, tur böyiça saralaş */
function VideoA() {
  const [lead, ...rest] = VIDEOS
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-vlead">
          <InlinePlayer id={lead.id} title={lead.title} />
          <div className="ax-vlead-txt">
            <span className="ax-chip">Yangi video · {VIDEO_TYPES[lead.type]}</span>
            <h2>{lead.title}</h2>
            <p>
              {fullDate(lead.date)} · {dur(lead.sec)}
            </p>
          </div>
        </div>
        <div className="ax-tools">
          <Pills
            target="va-grid"
            label="Video turi"
            items={Object.entries(VIDEO_TYPES).map(([v, l]) => ({ v, l }))}
          />
        </div>
        <ul className="ax-vgrid" id="va-grid">
          {rest.map((v) => (
            <li key={v.id} data-f={v.type}>
              <VCard v={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** B — qisqa videolar tasmasi + turkumlar (playlist) böyiça qatorlar */
function VideoB() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <ShortsRail />
        {SERIES.map((s) => {
          const list = VIDEOS.filter((v) => v.series === s.key)
          return (
            <div key={s.key} className="ax-series">
              <div className="ax-row-h">
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.note}</p>
                </div>
                <span>{list.length} ta video</span>
              </div>
              <ul className="ax-rail wide">
                {list.map((v) => (
                  <li key={v.id}>
                    <VCard v={v} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** C — tomoşa sahifasi: çapda pleyer va tavsif, öngda navbatdagi videolar röyxati */
function VideoC() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <VideoWatch />
        <ShortsRail />
      </div>
    </section>
  )
}


export function VideoPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="ax-page">
      <Head
        crumbs={crumbs}
        title="Videogalereya"
        lead="Kengaş tadbirlaridan video lavhalar, reportajlar va “Istiqlol farzandlari” kabi maxsus körsatuvlar."
      />
      <Variants name="vg" views={[<VideoA key="a" />, <VideoB key="b" />, <VideoC key="c" />]} />
      <VideoModal />
      {DEV && <DevSectionsPanel sections={PANEL_VIDEO} />}
    </div>
  )
}

const PANEL_VIDEO: PanelSection[] = [
  {
    name: 'vg',
    label: 'Videogalereya',
    count: 3,
    hints: ['Asosiy pleyer + tör', 'Qisqa videolar + turkumlar', 'Tomoşa sahifasi + röyxat'],
  },
]

/* ====================================================================
   PRESS-RELIZLAR
   ==================================================================== */

const RT_PILLS = Object.entries(RELEASE_TYPES).map(([v, l]) => ({ v, l }))

function PressContact({ dark = false }: { dark?: boolean }) {
  return (
    <aside className={`ax-pc${dark ? ' dark' : ''}`}>
      <h2>Jurnalistlar uçun</h2>
      <p>
        Akkreditatsiya, intervyu va izoh söraş uçun Kengaşning {PRESS_CONTACT.unit.toLowerCase()} bilan boğlaning.
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
      <p>Kengaş logotipi va rasmiy nomi — naşrlarda foydalaniş uçun.</p>
      <a className="ax-kit-dl" href="/img/logo-toshkent.png" download>
        <img src="/img/logo-toshkent.png" alt="" />
        <span>
          <b>Logotip (PNG)</b>
          <small>Yuklab oliş ↓</small>
        </span>
      </a>
      <p className="ax-kit-name">Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi</p>
    </aside>
  )
}

/** A — rasmiy reyestr: sana | tur | sarlavha va qisqa mazmun; yon tomonda jurnalistlar uçun */
function PressA() {
  return (
    <section className="sec ax">
      <div className="wrap ax-press">
        <div>
          <div className="ax-tools">
            <Pills target="pa-list" items={RT_PILLS} label="Xabar turi" />
          </div>
          <ol className="ax-reg" id="pa-list">
            {RELEASES.map((r, i) => (
              <li key={i} data-f={r.type}>
                <time dateTime={r.date}>
                  <b>{dayMonth(r.date).split('-')[0]}</b>
                  <span>{dayMonth(r.date).split('-')[1]}</span>
                  <small>{r.date.slice(0, 4)}</small>
                </time>
                <div>
                  <span className={`ax-chip t-${r.type}`}>{RELEASE_TYPES[r.type]}</span>
                  <h3>{r.title}</h3>
                  <p>{r.lead}</p>
                </div>
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

/** B — newsroom: eng sönggi xabar katta, qolganlari oylar böyiça kartalar; pastda sariq banner */
function PressB() {
  const [lead, ...rest] = RELEASES
  return (
    <section className="sec ax">
      <div className="wrap">
        <article className="ax-plead">
          <div className="ax-plead-txt">
            <span className={`ax-chip t-${lead.type}`}>{RELEASE_TYPES[lead.type]}</span>
            <h2>{lead.title}</h2>
            <p>{lead.lead}</p>
            <time dateTime={lead.date}>{fullDate(lead.date)}</time>
          </div>
          {lead.img ? (
            <img src={lead.img} alt="" />
          ) : (
            <div className="ax-plead-art" aria-hidden="true">
              <b>{dayMonth(lead.date).split('-')[0]}</b>
              <span>{dayMonth(lead.date).split('-')[1]}</span>
            </div>
          )}
        </article>
        {byMonth(rest).map(([m, list]) => (
          <section key={m} className="ax-pmonth">
            <h2 className="ax-tl-h">{m}</h2>
            <ul className="ax-pcards">
              {list.map((r, i) => (
                <li key={i}>
                  <PCard r={r} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="ax-banner">
          <div>
            <h2>Jurnalistlar uçun</h2>
            <p>
              Akkreditatsiya, intervyu va rasmiy izoh: {PRESS_CONTACT.phone.v} · {PRESS_CONTACT.email.v}
            </p>
          </div>
          <a className="btn btn-primary" href={PRESS_CONTACT.telegram.href} target="_blank" rel="noopener noreferrer">
            Telegramda kuzatiş
          </a>
        </div>
      </div>
    </section>
  )
}

function PCard({ r }: { r: Release }) {
  return (
    <article className="ax-pcard">
      {r.img && <img src={r.img} alt="" loading="lazy" />}
      <div>
        <span className={`ax-chip t-${r.type}`}>{RELEASE_TYPES[r.type]}</span>
        <h3>{r.title}</h3>
        <p>{r.lead}</p>
        <time dateTime={r.date}>{fullDate(r.date)}</time>
      </div>
    </article>
  )
}

/** C — matbuot markazi: qidiruv va tur böyiça saralaş, oçiladigan xabarlar, media-töplam */
function PressC() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <div className="ax-hub-top">
          <Search target="pc-list" placeholder="Press-relizlardan qidiriş" />
          <Pills target="pc-list" items={RT_PILLS} label="Xabar turi" />
        </div>
        <div className="ax-press">
          <div className="ax-acc" id="pc-list">
            {RELEASES.map((r, i) => (
              <details key={i} data-f={r.type} data-q={`${r.title} ${r.lead}`} open={i === 0}>
                <summary>
                  <time dateTime={r.date}>{fullDate(r.date)}</time>
                  <span className={`ax-chip t-${r.type}`}>{RELEASE_TYPES[r.type]}</span>
                  <b>{r.title}</b>
                </summary>
                <div className="ax-acc-b">
                  {r.img && <img src={r.img} alt="" loading="lazy" />}
                  <p>{r.lead}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="ax-side">
            <PressContact dark />
            <MediaKit />
          </div>
        </div>
      </div>
    </section>
  )
}

export function PressPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="ax-page">
      <Head
        crumbs={crumbs}
        title="Press-relizlar"
        lead="Kengaşning rasmiy xabarlari, eʼlonlari va tanlovlari. Jurnalistlar uçun aloqa va media-töplam şu sahifada."
      />
      <Variants name="pr" views={[<PressA key="a" />, <PressB key="b" />, <PressC key="c" />]} />
      {DEV && <DevSectionsPanel sections={PANEL_PRESS} />}
    </div>
  )
}

const PANEL_PRESS: PanelSection[] = [
  {
    name: 'pr',
    label: 'Press-relizlar',
    count: 3,
    hints: ['Rasmiy reyestr + jurnalistlar uçun', 'Newsroom kartalari', 'Matbuot markazi: qidiruv'],
  },
]


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
      <a href={m.url} target="_blank" rel="noopener noreferrer" className="ax-clip-a">
        Naşrda öqiş <Ext />
        <span className="sr-only"> (yangi oynada oçiladi)</span>
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
      <Head
        crumbs={crumbs}
        title="OAV biz haqimizda"
        lead="Kengaş faoliyati haqida ommaviy axborot vositalari va davlat organlari saytlarida eʼlon qilingan materiallar."
      />
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
