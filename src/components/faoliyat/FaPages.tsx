import Link from 'next/link'
import type { ReactNode } from 'react'

import { ANNOUNCEMENTS } from './announcements'
import { AnnounceList } from './AnnounceList'
import { DIRECTIONS, PROJECTS } from './data'
import { EVENTS } from './events'
import { EventsList } from './EventsList'
import { DirC, DirsList, ProjC, ResultsB } from './FaViews'
import { ProjectsList } from './ProjectsList'
import { fmtDate, TG } from './types'

const TODAY = new Date().toISOString().slice(0, 10)

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

/* ===================== Faoliyat yönalişlari ===================== */

export function DirectionsPage({ crumbs, base }: { crumbs: ReactNode; base: string }) {
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Faoliyat yönalişlari"
        lead="Kengaş yoşlar bilan işlaşning 11 ta asosiy yönalişi böyiça faoliyat olib boradi. Har bir yönalişda loyihalar va ötkazilgan tadbirlar bilan tanişişingiz mumkin."
      />
      <DirsList base={base} />
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
      <Head crumbs={crumbs} title={d.title} lead={d.body} />
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
        lead="Kengaş va uning boşlanğiç taşkilotlari amalga oşirgan va amalga oşirayotgan loyihalar. Har bir maʼlumot “Poytaxt yoşlari” kanalidagi asl postlar asosida tayyorlangan."
      />
      <section className="sec fa-sec">
        <div className="wrap">
          <ProjectsList
            projects={PROJECTS}
            dirs={DIRECTIONS.map(({ slug, title }) => ({ slug, title }))}
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
      <Head crumbs={crumbs} title={p.title} lead={p.lead} />
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
        lead="Yaqinlaşayotgan tadbirlar va 2023-yildan buyon ötkazilgan tadbirlar arxivi. Har bir tadbir “Poytaxt yoşlari” kanalidagi asl postga bog‘langan."
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
                    <a href={TG(e.id)} target="_blank" rel="noopener noreferrer">
                      Batafsil ↗
                    </a>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="fa-empty">
              Hozirça eʼlon qilingan tadbir yöq. Yangiliklarni kanalimizda kuzatib boring.
            </p>
          )}
          <p className="fa-note">
            Tanlov, röyxatdan ötiş va boşqa eʼlonlar alohida —{' '}
            <Link href={annHref}>Eʼlonlar sahifasida</Link>.
          </p>
          <h2 className="fa-h2">Tadbirlar arxivi</h2>
          <EventsList events={past} dirs={DIRECTIONS.map(({ slug, title }) => ({ slug, title }))} />
        </div>
      </section>
    </div>
  )
}

/* ===================== Eʼlonlar ===================== */

export function AnnouncePage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Eʼlonlar"
        lead="Tanlovlar, röyxatdan ötiş, çellenjlar, sayohatlar va tadbir eʼlonlari bir joyda. Har bir eʼlon “Poytaxt yoşlari” kanalidagi asl postga bog‘langan."
      />
      <section className="sec fa-sec">
        <div className="wrap">
          <AnnounceList items={ANNOUNCEMENTS} />
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
        lead="Kengaş faoliyatining yillar kesimidagi asosiy natijalari. Barça raqamlar Kengaşning rasmiy eʼlonlaridan olingan va asl manbaga bog‘langan."
      />
      <ResultsB />
    </div>
  )
}
