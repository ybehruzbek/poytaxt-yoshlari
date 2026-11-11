/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
/** Faoliyat sahifalarining tanlangan körinişlari: yönalişlar, yönaliş, loyiha va natijalar */
import Link from 'next/link'

import { DIRECTIONS, dirProjects, dirTitle, REPORT_2025, YEARS } from './data'
import { EVENTS } from './events'
import { fmtDate, type Project, TG } from './types'

const pad = (i: number) => String(i + 1).padStart(2, '0')
const STATUS = (s: Project['status']) =>
  s === 'davom etmoqda' ? 'Davom etmoqda' : s === 'har yili' ? 'Har yili' : 'Yakunlangan'

const Src = ({ id }: { id: number }) => (
  <a className="fa-src" href={TG(id)} target="_blank" rel="noopener noreferrer">
    manba ↗
  </a>
)

const dirEvents = (slug: string) => EVENTS.filter((e) => e.dir === slug)
const Arrow = () => <span aria-hidden="true">→</span>

/* ===================== Yönalişlar ===================== */

/** Yönaliş röyxati: navbatma-navbat çap/öng, surat kollaji, sönggi 3 tadbir (tadbir yöq bölsa — loyihalar) */
export function DirsList({ base }: { base: string }) {
  const all = DIRECTIONS.map((d, i) => {
    const evs = dirEvents(d.slug)
    const projs = dirProjects(d.slug)
    const pics = [
      ...evs.filter((e) => e.img).map((e) => e.img),
      ...projs.flatMap((p) => [p.cover, ...p.gallery]).filter(Boolean),
    ].slice(0, 3)
    const items = evs.length
      ? evs.slice(0, 3).map((e) => ({ k: String(e.id), top: fmtDate(e.date), t: e.title }))
      : projs.slice(0, 3).map((p) => ({ k: p.slug, top: `Loyiha · ${p.period}`, t: p.title }))
    return { d, n: pad(i), evs, nP: projs.length, pics, items }
  })
  const nE = all.reduce((a, x) => a + x.evs.length, 0)
  const nP = all.reduce((a, x) => a + x.nP, 0)
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <div className="vy-sum">
          <span>
            <b>{all.length}</b> yönaliş
          </span>
          <span>
            <b>{nE}</b> tadbir
          </span>
          <span>
            <b>{nP}</b> loyiha
          </span>
        </div>
        <div className="vy3">
          {all.map(({ d, n, evs, nP, pics, items }) => (
            <article key={d.slug} className="vy3-row">
              <Link href={`${base}/${d.slug}`} className="vy3-ph" tabIndex={-1} aria-hidden="true">
                {pics.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
              </Link>
              <div className="vy3-txt">
                <span className="vy3-n">{n}</span>
                <h2>
                  <Link href={`${base}/${d.slug}`}>{d.title}</Link>
                </h2>
                <p>{d.lead}</p>
                <ul>
                  {items.map((it) => (
                    <li key={it.k}>
                      <time>{it.top}</time>
                      <span>{it.t}</span>
                    </li>
                  ))}
                </ul>
                <div className="vy3-foot">
                  {/* nol sonlar yozilmaydi (“0 tadbir” emas) */}
                  <span>
                    {evs.length > 0 && (
                      <>
                        <b>{evs.length}</b> tadbir
                      </>
                    )}
                    {evs.length > 0 && nP > 0 && ' · '}
                    {nP > 0 && (
                      <>
                        <b>{nP}</b> loyiha
                      </>
                    )}
                  </span>
                  <Link href={`${base}/${d.slug}`} className="vy3-more">
                    Batafsil <Arrow />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== Yönaliş sahifasi ===================== */

/** C — xronologiya: tadbirlar yillar böyiça vertikal çiziqda, loyihalar yon ustunda */
export function DirC({
  slug,
  projBase,
  listHref,
}: {
  slug: string
  projBase: string
  listHref: string
}) {
  const projs = dirProjects(slug as Project['dir'])
  const evs = dirEvents(slug).slice(0, 14)
  const byYear = [...new Set(evs.map((e) => e.date.slice(0, 4)))].map((y) => ({
    y,
    items: evs.filter((e) => e.date.startsWith(y)),
  }))
  return (
    <section className="sec fa-sec">
      <div className="wrap vc-split">
        <div>
          <h2 className="fa-h2">Tadbirlar xronologiyasi</h2>
          {byYear.length === 0 && (
            <p className="fa-empty">
              Bu yönaliş böyiça alohida tadbirlar hozirça yöq — yonidagi loyihalar bilan tanişing.
            </p>
          )}
          <div className="vc-tl">
            {byYear.map((g) => (
              <section key={g.y}>
                <b className="vc-tl-y">{g.y}</b>
                {g.items.map((e) => (
                  <a
                    key={e.id}
                    href={TG(e.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vc-tl-i"
                  >
                    {e.img && <img src={e.img} alt="" loading="lazy" />}
                    <span>
                      <time dateTime={e.date}>{fmtDate(e.date, false)}</time>
                      <strong>{e.title}</strong>
                      <span>{e.place}</span>
                    </span>
                  </a>
                ))}
              </section>
            ))}
          </div>
        </div>
        <aside className="vc-aside">
          <h2 className="fa-h2">Loyihalar</h2>
          {projs.length === 0 && <p className="fa-empty">Bu yönalişda alohida loyiha yöq.</p>}
          {projs.map((p) => (
            <Link key={p.slug} href={`${projBase}/${p.slug}`} className="vc-mini">
              {p.cover && <img src={p.cover} alt="" loading="lazy" />}
              <strong>{p.title}</strong>
              <small>{STATUS(p.status)}</small>
            </Link>
          ))}
        </aside>
      </div>
      <div className="wrap fa-back">
        <Link href={listHref} className="btn btn-outline">
          Barça yönalişlar
        </Link>
      </div>
    </section>
  )
}

/* ===================== Loyiha sahifasi ===================== */

const SrcNote = ({ p }: { p: Project }) => (
  <p className="fa-src-note">
    Manba: “Poytaxt yoşlari” Telegram kanali —{' '}
    <a href={TG(p.posts[0])} target="_blank" rel="noopener noreferrer">
      {p.posts.length} ta post
    </a>
  </p>
)

/** C — hikoya: keng banner, tor matn ustuni, natijalar kartoçkalarda, gorizontal sanalar */
export function ProjC({ p, listHref }: { p: Project; listHref: string }) {
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        {p.cover && (
          <div className="vc-banner">
            <img src={p.cover} alt={p.title} />
            <span className="vc-banner-chips">
              <span>{dirTitle(p.dir)}</span>
              <span>{p.period}</span>
              <span>{STATUS(p.status)}</span>
              {p.national && <span>Respublika loyihasi</span>}
            </span>
          </div>
        )}
        <div className="vc-read">
          <p className="vc-lead">{p.description}</p>
          {(p.audience || p.partners.length > 0) && (
            <p className="vc-who">
              {p.audience && (
                <>
                  <b>Kimlar uçun:</b> {p.audience}.{' '}
                </>
              )}
              {p.partners.length > 0 && (
                <>
                  <b>Hamkorlar:</b> {p.partners.join(', ')}.
                </>
              )}
            </p>
          )}
        </div>
        {p.results.length > 0 && (
          <div className="vc-cards">
            {p.results.map((r, i) => (
              <div key={r.text} className="vc-card">
                <span>{pad(i)}</span>
                <p>{r.text}</p>
                <Src id={r.post} />
              </div>
            ))}
          </div>
        )}
        {p.milestones.length > 0 && (
          <ol className="vc-htl">
            {p.milestones.map((m) => (
              <li key={`${m.date}-${m.text}`}>
                <time dateTime={m.date}>{fmtDate(m.date)}</time>
                <p>{m.text}</p>
                <Src id={m.post} />
              </li>
            ))}
          </ol>
        )}
        {p.gallery.length > 0 && (
          <div className="vc-mas">
            {p.gallery.map((g) => (
              <a key={g} href={g} target="_blank" rel="noopener noreferrer">
                <img src={g} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        )}
        <SrcNote p={p} />
        <div className="fa-back">
          <Link href={listHref} className="btn btn-outline">
            Barça loyihalar
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ===================== Natijalar ===================== */

/** B — panel: asosiy raqam katta, qolganlari plitkalarda, yillar ustunlarda */
export function ResultsB() {
  const [hero, ...rest] = [REPORT_2025.nums[1], ...REPORT_2025.nums.filter((_, i) => i !== 1)]
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <div className="vb-dash">
          <div className="vb-dash-hero">
            <small>2025-yil yakunlari</small>
            <b>{hero.v}</b>
            <span>{hero.t}</span>
            <a href={TG(REPORT_2025.post)} target="_blank" rel="noopener noreferrer">
              Rasmiy hisobot ↗
            </a>
          </div>
          <dl className="vb-dash-tiles">
            {rest.map((n) => (
              <div key={n.t}>
                <dd>{n.v}</dd>
                <dt>{n.t}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="vb-ycols">
          {YEARS.map((y) => (
            <section key={y.y}>
              <h3>{y.y}</h3>
              <ul>
                {y.items.map((it) => (
                  <li key={it.text}>
                    {it.text} <Src id={it.post} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
