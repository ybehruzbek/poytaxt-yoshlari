/* eslint-disable @next/next/no-img-element -- galereya suratlari statik webp; CMS ulanganda next/image ga ötadi */
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { Lightbox, Pills, Search, ShowMore, VideoModal } from './AxClient'
import {
  ALBUM_TYPES,
  ALBUMS,
  type AlbumType,
  cover,
  dayMonth,
  fullDate,
  monthKey,
  photo,
  PRESS_CONTACT,
  RELEASE_TYPES,
  RELEASES,
  type Release,
  type Short,
  shortThumb,
} from './data'
import { MEDIA, MEDIA_KINDS, type MediaItem } from './oav'
import { VideoWatch } from './VideoWatch'
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

/** A — albomlar töri (takomillaşgan): birinçi albom katta, kartada albomdan 3 ta kiçik surat */
function FotoA() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <FotoTools target="fa-grid" />
        <ul className="ax-albums ax-a2" id="fa-grid">
          {ALBUMS.map((a, i) => (
            <li key={a.id} {...liAttrs(a, i)} data-lead={i === 0 ? '' : undefined}>
              <article className="ax-album">
                <button type="button" className="ax-album-ph" data-album={a.id} aria-label={`Albomni oçiş: ${a.title}`}>
                  <img src={cover(a)} alt="" loading={i < 4 ? 'eager' : 'lazy'} />
                  <span className="ax-album-n">
                    <Cam /> {a.n} surat
                  </span>
                  <span className="ax-date">{dayMonth(a.date)}</span>
                </button>
                <div className="ax-mini">
                  {[2, 3, 4].map((k) => (
                    <button key={k} type="button" data-album={a.id} data-i={k} aria-label={`${k}-surat`}>
                      <img src={photo(a.id, k)} alt="" loading="lazy" />
                      {k === 4 && a.n > 4 && <span className="ax-more-n">+{a.n - 4}</span>}
                    </button>
                  ))}
                </div>
                <div className="ax-album-b">
                  <span className="ax-chip">{ALBUM_TYPES[a.type]}</span>
                  <h2>
                    <button type="button" data-album={a.id}>
                      {a.title}
                    </button>
                  </h2>
                  <small>
                    <Pin /> {a.place}
                  </small>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="ax-empty">Bu söz böyiça albom topilmadi.</p>
        <ShowMore target="fa-grid" rest={ALBUMS.length - FIRST} />
      </div>
    </section>
  )
}

/** B — albom stopkasi: muqova ortida yana 2 surat; sičqonça olib borilganda yelpiğiçdek oçiladi */
function FotoB() {
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

/** C — jonli muqova: sičqonça olib borilganda albom suratlari almaşadi (tepada hikoya çiziqlari) */
function FotoC() {
  return (
    <section className="sec ax">
      <div className="wrap">
        <FotoTools target="fc-grid" />
        <ul className="ax-albums ax-live-grid" id="fc-grid">
          {ALBUMS.map((a, i) => (
            <li key={a.id} {...liAttrs(a, i)}>
              <button type="button" className="ax-live" data-album={a.id}>
                <span className="ax-live-ph">
                  {[1, 2, 3, 4].map((k) => (
                    <img key={k} src={photo(a.id, k)} alt="" loading={i < 3 && k === 1 ? 'eager' : 'lazy'} style={{ ['--k' as string]: k - 1 }} />
                  ))}
                  <span className="ax-live-bars" aria-hidden="true">
                    {[0, 1, 2, 3].map((k) => (
                      <i key={k} style={{ ['--k' as string]: k }} />
                    ))}
                  </span>
                  <span className="ax-live-cap">
                    <span className="ax-chip on-dark">{ALBUM_TYPES[a.type]}</span>
                    <b>{a.title}</b>
                  </span>
                </span>
                <span className="ax-live-b">
                  <time dateTime={a.date}>{fullDate(a.date)}</time>
                  <span>
                    <Cam /> {a.n} surat
                  </span>
                  <small>
                    <Pin /> {a.place}
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="ax-empty">Bu söz böyiça albom topilmadi.</p>
        <ShowMore target="fc-grid" rest={ALBUMS.length - FIRST} />
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
    hints: ['A: katta birinçi albom + kiçik suratlar', 'A: albom stopkasi (yelpiğiç)', 'A: jonli muqova (suratlar almaşadi)'],
  },
]

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
