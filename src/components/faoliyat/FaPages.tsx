import Link from 'next/link'
import type { ReactNode } from 'react'

import type { Announce } from './types'
import { AnnounceList } from './AnnounceList'
import { DirsShow } from './DirsShow'
import { EventsList } from './EventsList'
import { DirC, ProjC, ResultsB } from './FaViews'
import { ProjectsList } from './ProjectsList'
import { fmtDate, TG } from './types'
import { More } from '@/components/site/MoreBtn'
import { getFaoliyat } from '@/lib/cms/faoliyat'

/** Bugungi sana (Toşkent vaqti) — yaqin va ötgan tadbirlarni ajratiş uçun */
const today = () => new Date(Date.now() + 5 * 3600_000).toISOString().slice(0, 10)

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

export async function DirectionsPage({
  crumbs,
  base,
  projBase,
  locale = 'uz',
}: {
  crumbs: ReactNode
  base: string
  projBase: string
  locale?: string
}) {
  const f = await getFaoliyat(locale)
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Faoliyat yönalişlari"
      />
      <DirsShow f={f} base={base} projBase={projBase} />
    </div>
  )
}

export async function DirectionPage({
  slug,
  crumbs,
  projBase,
  listHref,
  locale = 'uz',
}: {
  slug: string
  crumbs: ReactNode
  projBase: string
  listHref: string
  locale?: string
}) {
  const f = await getFaoliyat(locale)
  const d = f.directions.find((x) => x.slug === slug)
  if (!d) return null
  return (
    <div className="fa">
      <Head crumbs={crumbs} title={d.title} />
      <DirC f={f} slug={d.slug} projBase={projBase} listHref={listHref} />
    </div>
  )
}

/* ===================== Loyihalar ===================== */

export async function ProjectsPage({ crumbs, base, locale = 'uz' }: { crumbs: ReactNode; base: string; locale?: string }) {
  const f = await getFaoliyat(locale)
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Loyihalar"
      />
      <section className="sec fa-sec">
        <div className="wrap">
          <ProjectsList
            projects={f.projects}
            dirs={f.directions.map(({ slug, short }) => ({ slug, title: short }))}
            base={base}
          />
        </div>
      </section>
    </div>
  )
}

export async function ProjectPage({
  slug,
  crumbs,
  listHref,
  locale = 'uz',
}: {
  slug: string
  crumbs: ReactNode
  listHref: string
  locale?: string
}) {
  const f = await getFaoliyat(locale)
  const p = f.projects.find((x) => x.slug === slug)
  if (!p) return null
  return (
    <div className="fa">
      <Head crumbs={crumbs} title={p.title} />
      <ProjC f={f} p={p} listHref={listHref} />
    </div>
  )
}

/* ===================== Tadbirlar va kalendar ===================== */

export async function EventsPage({ crumbs, annHref, locale = 'uz' }: { crumbs: ReactNode; annHref: string; locale?: string }) {
  const f = await getFaoliyat(locale)
  const t = today()
  const up = f.events.filter((e) => e.date >= t).sort((a, b) => a.date.localeCompare(b.date))
  const past = f.events.filter((e) => e.date < t)
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
          <EventsList events={past} dirs={f.directions.map(({ slug, short }) => ({ slug, title: short }))} />
        </div>
      </section>
    </div>
  )
}

/* ===================== Eʼlonlar ===================== */

export function AnnouncePage({ crumbs, extra = [] }: { crumbs: ReactNode; extra?: Announce[] }) {
  // barça eʼlonlar bazada (admin panel → Yangiliklar, turi “Eʼlon”), yangisi tepada
  const items = [...extra].sort((a, b) => b.date.localeCompare(a.date))
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

export async function ResultsPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const f = await getFaoliyat(locale)
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Natijalar va hisobotlar"
      />
      <ResultsB f={f} />
    </div>
  )
}
