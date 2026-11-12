import Link from 'next/link'
import type { ReactNode } from 'react'

import { type Announce, ANNOUNCEMENTS } from './announcements'
import { AnnounceList } from './AnnounceList'
import { DIRECTIONS, PROJECTS } from './data'
import { DirsShow } from './DirsShow'
import { EVENTS } from './events'
import { EventsList } from './EventsList'
import { DirC, ProjC, ResultsB } from './FaViews'
import { ProjectsList } from './ProjectsList'
import { fmtDate, TG } from './types'
import { More } from '@/components/site/MoreBtn'

const TODAY = new Date().toISOString().slice(0, 10)

/** Sahifa boşi: yöl va sarlavha (qoida: H1 ostida izoh matni yöq) */
function Head({ crumbs, title }: { crumbs: ReactNode; title: string }) {
  return (
    <header className="pg-head">
      <div className="wrap">
        {crumbs}
        <h1 className="h2 pg-title">{title}</h1>
      </div>
    </header>
  )
}

/* ===================== Faoliyat yönalişlari ===================== */

export function DirectionsPage({
  crumbs,
  base,
  projBase,
}: {
  crumbs: ReactNode
  base: string
  projBase: string
}) {
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Faoliyat yönalişlari"
      />
      <DirsShow base={base} projBase={projBase} />
    </div>
  )
}

export function DirectionPage({
  slug,
  crumbs,
  projBase,
  listHref,
}: {
  slug: string
  crumbs: ReactNode
  projBase: string
  listHref: string
}) {
  const d = DIRECTIONS.find((x) => x.slug === slug)!
  return (
    <div className="fa">
      <Head crumbs={crumbs} title={d.title} />
      <DirC slug={d.slug} projBase={projBase} listHref={listHref} />
    </div>
  )
}

/* ===================== Loyihalar ===================== */

export function ProjectsPage({ crumbs, base }: { crumbs: ReactNode; base: string }) {
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Loyihalar"
      />
      <section className="sec fa-sec">
        <div className="wrap">
          <ProjectsList
            projects={PROJECTS}
            dirs={DIRECTIONS.map(({ slug, short }) => ({ slug, title: short }))}
            base={base}
          />
        </div>
      </section>
    </div>
  )
}

export function ProjectPage({
  slug,
  crumbs,
  listHref,
}: {
  slug: string
  crumbs: ReactNode
  listHref: string
}) {
  const p = PROJECTS.find((x) => x.slug === slug)!
  return (
    <div className="fa">
      <Head crumbs={crumbs} title={p.title} />
      <ProjC p={p} listHref={listHref} />
    </div>
  )
}

/* ===================== Tadbirlar va kalendar ===================== */

export function EventsPage({ crumbs, annHref }: { crumbs: ReactNode; annHref: string }) {
  const up = EVENTS.filter((e) => e.date >= TODAY).sort((a, b) => a.date.localeCompare(b.date))
  const past = EVENTS.filter((e) => e.date < TODAY)
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Tadbirlar va kalendar"
      />
      <section className="sec fa-sec">
        <div className="wrap">
          <h2 className="fa-h2">Yaqinlaşayotgan tadbirlar</h2>
          {up.length ? (
            <div className="fa-up">
              {up.map((e) => {
                const [, m, d] = e.date.split('-')
                return (
                  <div key={e.id} className="fa-up-item">
                    <span className="fa-up-date">
                      {Number(d)}
                      <small>{fmtDate(e.date, false).split('-')[1] ?? m}</small>
                    </span>
                    <span>
                      <strong>{e.title}</strong>
                      <p>
                        {e.place}
                        {e.summary ? ` · ${e.summary}` : ''}
                      </p>
                    </span>
                    <a
                      href={TG(e.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="more-btn"
                    >
                      <More />
                    </a>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="fa-empty">
              Hozirça rejalaştirilgan tadbirlar eʼlon qilinmagan.
            </p>
          )}
          <p className="fa-note">
            Tanlovlar va röyxatdan ötiş haqidagi xabarlar{' '}
            <Link href={annHref}>“Eʼlonlar”</Link> sahifasida joylaştiriladi.
          </p>
          <h2 className="fa-h2">Tadbirlar arxivi</h2>
          <EventsList events={past} dirs={DIRECTIONS.map(({ slug, short }) => ({ slug, title: short }))} />
        </div>
      </section>
    </div>
  )
}

/* ===================== Eʼlonlar ===================== */

export function AnnouncePage({ crumbs, extra = [] }: { crumbs: ReactNode; extra?: Announce[] }) {
  // kanaldan kelgan eʼlonlar + oldin yiğilganlar (bir xil post takrorlanmaydi), yangisi tepada
  const items = [...extra, ...ANNOUNCEMENTS.filter((a) => !extra.some((x) => x.id === a.id))].sort((a, b) =>
    b.date.localeCompare(a.date),
  )
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Eʼlonlar"
      />
      <section className="sec fa-sec">
        <div className="wrap">
          <AnnounceList items={items} />
        </div>
      </section>
    </div>
  )
}

/* ===================== Natijalar va hisobotlar ===================== */

export function ResultsPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Natijalar va hisobotlar"
      />
      <ResultsB />
    </div>
  )
}
