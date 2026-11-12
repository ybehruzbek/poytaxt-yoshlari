/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
/** Faoliyat sahifalarining tanlangan körinişlari: yönalişlar, yönaliş, loyiha va natijalar */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DIRECTIONS, dirProjects, dirTitle, REPORT_2025, YEARS } from './data'
import { EVENTS } from './events'
import { type DirSlug, fmtDate, type Project, TG } from './types'
import { More } from '@/components/site/MoreBtn'

const pad = (i: number) => String(i + 1).padStart(2, '0')
const STATUS = (s: Project['status']) =>
  s === 'davom etmoqda' ? 'Davom etmoqda' : s === 'har yili' ? 'Har yili' : 'Yakunlangan'

const dirEvents = (slug: string) => EVENTS.filter((e) => e.dir === slug)

/* ===================== Yönalişlar ===================== */

/** Ajratiş: “A, B va C” */
function joinList(items: ReactNode[]) {
  return items.flatMap((x, i) => (i === 0 ? [x] : [i === items.length - 1 ? ' va ' : ', ', x]))
}

/**
 * Yönaliş matni: Kengaş amalga oşiradigan işlar (rasmiy matn) va şu yönaliş doirasidagi loyihalar —
 * alohida röyxat emas, matnning davomi sifatida (nomlari loyiha sahifasiga havola).
 */
export function DirText({
  slug,
  projBase,
  className,
  lead = false,
  rest = false,
}: {
  slug: DirSlug
  projBase: string
  className?: string
  /** birinçi jumla (yönalişning maqsadi) alohida, boş fikr sifatida ajratiladi */
  lead?: boolean
  /** maqsad jumlasi boşqa joyda körsatilgan — faqat qolgan qismi */
  rest?: boolean
}) {
  const d = DIRECTIONS.find((x) => x.slug === slug)
  if (!d) return null
  const projs = dirProjects(slug)
  const link = (p: Project) => (
    <Link key={p.slug} href={`${projBase}/${p.slug}`}>
      {p.title}
    </Link>
  )
  const active = projs.filter((p) => p.status !== 'yakunlangan')
  const done = projs.filter((p) => p.status === 'yakunlangan')
  return (
    <div className={className}>
      {rest && d.about.includes(' Xususan, ') ? (
        <p>{d.about.slice(d.about.indexOf(' Xususan, ') + 1)}</p>
      ) : lead && d.about.includes(' Xususan, ') ? (
        <>
          <p className="dir-lead">{d.about.slice(0, d.about.indexOf(' Xususan, '))}</p>
          <p>{d.about.slice(d.about.indexOf(' Xususan, ') + 1)}</p>
        </>
      ) : (
        <p>{d.about}</p>
      )}
      {projs.length > 0 && (
        <p className="dir-projs">
          {active.length > 0 && (
            <>
              Yönaliş doirasida {joinList(active.map(link))}
              {' amalga oşirilmoqda.'}
            </>
          )}
          {active.length > 0 && done.length > 0 && ' '}
          {done.length > 0 && (
            <>
              {active.length > 0 ? 'Şuningdek, ' : 'Yönaliş doirasida '}
              {joinList(done.map(link))} amalga oşirildi.
            </>
          )}
        </p>
      )}
    </div>
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
  const dir = DIRECTIONS.find((d) => d.slug === slug)
  const evs = dirEvents(slug).slice(0, 14)
  const byYear = [...new Set(evs.map((e) => e.date.slice(0, 4)))].map((y) => ({
    y,
    items: evs.filter((e) => e.date.startsWith(y)),
  }))
  return (
    <section className="sec fa-sec">
      {dir && (
        <div className="wrap">
          <DirText slug={dir.slug} projBase={projBase} className="fa-dir-body" />
        </div>
      )}
      <div className="wrap vc-split">
        <div>
          <h2 className="fa-h2">Tadbirlar xronologiyasi</h2>
          {byYear.length === 0 && (
            <p className="fa-empty">
              Bu yönaliş böyiça tadbirlar haqidagi maʼlumotlar hozirça joylaştirilmagan.
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
          {projs.length === 0 && <p className="fa-empty">Bu yönaliş böyiça loyihalar haqidagi maʼlumotlar hozirça joylaştirilmagan.</p>}
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
            <a
              href={TG(REPORT_2025.post)}
              target="_blank"
              rel="noopener noreferrer"
              className="more-btn"
            >
              <More>Hisobot matni</More>
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
                    {it.text}
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
