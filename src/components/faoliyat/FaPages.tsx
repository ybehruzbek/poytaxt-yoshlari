/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { ANNOUNCEMENTS } from './announcements'
import { AnnounceList } from './AnnounceList'
import { CALLS } from './calls'
import { DIRECTIONS, dirProjects, dirTitle, PROJECTS, REPORT_2025, YEARS } from './data'
import { EVENTS } from './events'
import { EventsList } from './EventsList'
import {
  DirB,
  DirC,
  DirsB,
  DirsC,
  JoinB,
  JoinC,
  ProjB,
  ProjC,
  ResultsB,
  ResultsC,
} from './FaVariants'
import { ProjectsList } from './ProjectsList'
import { V, VPanel } from './Var'
import { CHANNEL, fmtDate, type Project, TG } from './types'

const pad = (i: number) => String(i + 1).padStart(2, '0')
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

const Src = ({ id }: { id: number }) => (
  <a className="fa-src" href={TG(id)} target="_blank" rel="noopener noreferrer">
    manba ↗
  </a>
)

/* ===================== Faoliyat yönalişlari ===================== */

export function DirectionsPage({ crumbs, base }: { crumbs: ReactNode; base: string }) {
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Faoliyat yönalişlari"
        lead="Kengaş yoşlar bilan işlaşning 11 ta asosiy yönalişi böyiça faoliyat olib boradi. Har bir yönalişda loyihalar va ötkazilgan tadbirlar bilan tanişişingiz mumkin."
      />
      <V name="fyo" k="a">
        <section className="sec fa-sec">
          <div className="wrap fa-dirs">
            {DIRECTIONS.map((d, i) => {
              const nP = dirProjects(d.slug).length
              const nE = EVENTS.filter((e) => e.dir === d.slug).length
              return (
                <Link key={d.slug} href={`${base}/${d.slug}`} className="fa-dir">
                  <span className="fa-dir-n">{pad(i)}</span>
                  <h2>{d.title}</h2>
                  <p>{d.lead}</p>
                  <span className="fa-dir-foot">
                    <span>
                      {nP ? `${nP} ta loyiha · ` : ''}
                      {nE} ta tadbir
                    </span>
                    <span className="fa-go">
                      Batafsil <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </V>
      <V name="fyo" k="b">
        <DirsB base={base} />
      </V>
      <V name="fyo" k="c">
        <DirsC base={base} />
      </V>
      <VPanel name="fyo" label="Yönalişlar" />
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
  const projs = dirProjects(d.slug)
  const evs = EVENTS.filter((e) => e.dir === d.slug).slice(0, 6)
  return (
    <div className="fa">
      <Head crumbs={crumbs} title={d.title} lead={d.body} />
      <V name="fyd" k="a">
        {projs.length > 0 && (
          <section className="sec fa-sec">
            <div className="wrap">
              <h2 className="fa-h2">Loyihalar</h2>
              <div className="fa-projs">
                {projs.map((p) => (
                  <ProjCard key={p.slug} p={p} href={`${projBase}/${p.slug}`} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="sec fa-sec">
          <div className="wrap">
            <h2 className="fa-h2">Sönggi tadbirlar</h2>
            <div className="fa-evs">
              {evs.map((e) => (
                <a
                  key={e.id}
                  href={TG(e.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fa-ev"
                >
                  <span className="fa-ev-ph">
                    {e.img ? (
                      <img src={e.img} alt="" loading="lazy" />
                    ) : (
                      <span className="fa-ev-noph" />
                    )}
                  </span>
                  <span className="fa-ev-txt">
                    <time dateTime={e.date}>{fmtDate(e.date)}</time>
                    <strong>{e.title}</strong>
                    {e.summary && <span className="fa-ev-sum">{e.summary}</span>}
                    <span className="fa-ev-src">
                      Telegramda köriş <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <div className="fa-back">
              <Link href={listHref} className="btn btn-outline">
                Barça yönalişlar
              </Link>
            </div>
          </div>
        </section>
      </V>
      <V name="fyd" k="b">
        <DirB slug={d.slug} projBase={projBase} />
      </V>
      <V name="fyd" k="c">
        <DirC slug={d.slug} projBase={projBase} />
      </V>
      <VPanel name="fyd" label="Yönaliş sahifasi" />
    </div>
  )
}

/* ===================== Loyihalar ===================== */

export function ProjCard({ p, href }: { p: Project; href: string }) {
  return (
    <Link href={href} className="fa-proj">
      <span className="fa-proj-ph">
        {p.cover ? <img src={p.cover} alt="" loading="lazy" /> : <span className="fa-ev-noph" />}
        <span className="fa-status" data-s={p.status}>
          {p.status === 'davom etmoqda'
            ? 'Davom etmoqda'
            : p.status === 'har yili'
              ? 'Har yili'
              : 'Yakunlangan'}
        </span>
      </span>
      <span className="fa-proj-txt">
        <span className="fa-proj-dir">{dirTitle(p.dir)}</span>
        <strong>{p.title}</strong>
        <p>{p.lead}</p>
        <span className="fa-proj-foot">
          <span>{p.period}</span>
          <span className="fa-go">
            Batafsil <span aria-hidden="true">→</span>
          </span>
        </span>
      </span>
    </Link>
  )
}

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
          {(['a', 'b', 'c'] as const).map((k) => (
            <V key={k} name="flo" k={k}>
              <ProjectsList
                view={k}
                projects={PROJECTS}
                dirs={DIRECTIONS.map(({ slug, title }) => ({ slug, title }))}
                base={base}
              />
            </V>
          ))}
        </div>
      </section>
      <VPanel name="flo" label="Loyihalar" />
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
      <V name="flp" k="a">
        <section className="sec fa-sec">
          <div className="wrap">
            {p.cover && (
              <div className="fa-ph-hero">
                <img src={p.cover} alt={p.title} />
              </div>
            )}
            <div className="fa-meta">
              <span>{dirTitle(p.dir)}</span>
              <span>{p.period}</span>
              <span>
                {p.status === 'davom etmoqda'
                  ? 'Davom etmoqda'
                  : p.status === 'har yili'
                    ? 'Har yili ötkaziladi'
                    : 'Yakunlangan'}
              </span>
              {p.national && <span>Respublika loyihasi — şahar bosqiçi</span>}
            </div>
            <div className="fa-cols">
              <div>
                <section className="fa-box">
                  <h2>Loyiha haqida</h2>
                  <p>{p.description}</p>
                </section>
                {p.results.length > 0 && (
                  <section className="fa-box">
                    <h2>Natijalar</h2>
                    <ul className="fa-results">
                      {p.results.map((r) => (
                        <li key={r.text}>
                          <span>
                            {r.text}
                            <Src id={r.post} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
              <div>
                <section className="fa-box">
                  <dl className="fa-facts">
                    {p.audience && (
                      <div>
                        <dt>Kimlar uçun</dt>
                        <dd>{p.audience}</dd>
                      </div>
                    )}
                    {p.partners.length > 0 && (
                      <div>
                        <dt>Hamkorlar</dt>
                        <dd>{p.partners.join(', ')}</dd>
                      </div>
                    )}
                    <div>
                      <dt>Davri</dt>
                      <dd>{p.period}</dd>
                    </div>
                  </dl>
                </section>
                {p.milestones.length > 0 && (
                  <section className="fa-box">
                    <h2>Muhim sanalar</h2>
                    <ol className="fa-tl">
                      {p.milestones.map((m) => (
                        <li key={`${m.date}-${m.text}`}>
                          <time dateTime={m.date}>{fmtDate(m.date)}</time>
                          <p>
                            {m.text}
                            <Src id={m.post} />
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </div>
            </div>
            {p.gallery.length > 0 && (
              <div className="fa-gal">
                {p.gallery.map((g) => (
                  <a key={g} href={g} target="_blank" rel="noopener noreferrer">
                    <img src={g} alt="" loading="lazy" />
                  </a>
                ))}
              </div>
            )}
            <p className="fa-src-note">
              Manba: “Poytaxt yoşlari” Telegram kanali —{' '}
              <a href={TG(p.posts[0])} target="_blank" rel="noopener noreferrer">
                {p.posts.length} ta post
              </a>
            </p>
            <div className="fa-back">
              <Link href={listHref} className="btn btn-outline">
                Barça loyihalar
              </Link>
            </div>
          </div>
        </section>
      </V>
      <V name="flp" k="b">
        <ProjB p={p} listHref={listHref} />
      </V>
      <V name="flp" k="c">
        <ProjC p={p} listHref={listHref} />
      </V>
      <VPanel name="flp" label="Loyiha sahifasi" />
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
          {(['a', 'b', 'c'] as const).map((k) => (
            <V key={k} name="ftd" k={k}>
              <EventsList
                view={k}
                events={past}
                dirs={DIRECTIONS.map(({ slug, title }) => ({ slug, title }))}
              />
            </V>
          ))}
        </div>
      </section>
      <VPanel name="ftd" label="Tadbirlar arxivi" />
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
          {(['a', 'b', 'c'] as const).map((k) => (
            <V key={k} name="fel" k={k}>
              <AnnounceList view={k} items={ANNOUNCEMENTS} />
            </V>
          ))}
        </div>
      </section>
      <VPanel name="fel" label="Eʼlonlar" />
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
      <V name="fna" k="a">
        <section className="sec fa-sec">
          <div className="wrap">
            <div className="fa-big">
              <div className="fa-big-h">
                <h2>2025-yil yakunlari</h2>
                <a href={TG(REPORT_2025.post)} target="_blank" rel="noopener noreferrer">
                  Rasmiy hisobot ↗
                </a>
              </div>
              <dl className="fa-nums">
                {REPORT_2025.nums.map((n) => (
                  <div key={n.t}>
                    <dt>{n.t}</dt>
                    <dd>{n.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="fa-years">
              {YEARS.map((y) => (
                <section key={y.y} className="fa-year">
                  <b>{y.y}</b>
                  <ul>
                    {y.items.map((it) => (
                      <li key={it.text}>
                        <span>
                          {it.text}
                          <Src id={it.post} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="fa-report">
              <svg viewBox="0 0 54 64" aria-hidden="true">
                <path d="M4 2h32l14 14v46H4z" />
                <path d="M36 2v14h14M14 30h26M14 40h26M14 50h16" />
              </svg>
              <div>
                <h3>Yillik hisobotlar</h3>
                <p>
                  Kengaşning yillik hisobotlari PDF şaklida şu yerda eʼlon qilinadi. Hozirça
                  hisobotlar “Poytaxt yoşlari” kanalida eʼlon qilinadi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </V>
      <V name="fna" k="b">
        <ResultsB />
      </V>
      <V name="fna" k="c">
        <ResultsC />
      </V>
      <VPanel name="fna" label="Natijalar" />
    </div>
  )
}

/* ===================== Köngillilik va iştirok ===================== */

export function JoinPage({ crumbs, L }: { crumbs: ReactNode; L: (h: string) => string }) {
  const WAYS: Array<{ t: string; d: string; href: string; go: string; ext?: boolean }> = [
    {
      t: 'Ittifoqqa aʼzo böliş',
      d: '14 yoşdan 30 yoşgaça bölgan yoşlar Özbekiston yoşlar ittifoqiga aʼzo bölib, uning loyihalari va imkoniyatlaridan foydalanişi mumkin.',
      href: L('/boglanish/murojaat?mavzu=azo'),
      go: 'Ariza qoldiriş',
    },
    {
      t: 'Köngilli böliş',
      d: 'Köngillilar tadbirlar, xayriya aksiyalari va yirik loyihalarni taşkil etişda iştirok etadi. Köngillilar maktabiga qabul eʼlonlari kanalda beriladi.',
      href: L('/boglanish/murojaat'),
      go: 'Murojaat qoldiriş',
    },
    {
      t: 'Boşlanğiç taşkilotga qöşiliş',
      d: 'Har bir oliy taʼlim taşkilotida Ittifoqning boşlanğiç taşkiloti va yoşlar yetakçisi bor. Yetakçingiz bilan tanişing va uning faoliyatiga qöşiling.',
      href: L('/biz-haqimizda/boshlangich-tashkilotlar'),
      go: 'Yetakçingizni toping',
    },
    {
      t: 'Loyiha yoki ğoya taklif qiliş',
      d: 'Yoşlar uçun foydali loyiha yoki taşabbusingiz bölsa, Kengaşga yuboring — birgalikda amalga oşirişni körib çiqamiz.',
      href: L('/boglanish/murojaat'),
      go: 'Ğoyani yuboriş',
    },
  ]
  const calls = CALLS.slice(0, 8)
  return (
    <div className="fa">
      <Head
        crumbs={crumbs}
        title="Köngillilik va iştirok"
        lead="Kengaş faoliyatiga qöşilişning yöllari: aʼzolik, köngillilik, boşlanğiç taşkilotlar va yoşlar taşabbuslari."
      />
      <V name="fis" k="a">
        <section className="sec fa-sec">
          <div className="wrap">
            <div className="fa-ways">
              {WAYS.map((w, i) => (
                <section key={w.t} className="fa-way">
                  <span className="fa-way-n">{pad(i)}</span>
                  <h2>{w.t}</h2>
                  <p>{w.d}</p>
                  <Link href={w.href} className="fa-go">
                    {w.go} <span aria-hidden="true">→</span>
                  </Link>
                </section>
              ))}
            </div>
          </div>
        </section>
        <section className="sec fa-sec">
          <div className="wrap">
            <h2 className="fa-h2">Kanaldagi sönggi çaqiriqlar</h2>
            <div className="fa-calls">
              {calls.map((c) => (
                <a
                  key={c.id}
                  href={TG(c.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fa-call"
                >
                  <time dateTime={c.date}>{fmtDate(c.date)}</time>
                  <strong>{c.call}</strong>
                  {c.how && <span>{c.how}</span>}
                  <span className="fa-src">Telegramda köriş ↗</span>
                </a>
              ))}
            </div>
            <p className="fa-src-note">
              Barça eʼlonlar:{' '}
              <a href={CHANNEL} target="_blank" rel="noopener noreferrer">
                “Poytaxt yoşlari” Telegram kanali
              </a>
            </p>
          </div>
        </section>
      </V>
      <V name="fis" k="b">
        <JoinB ways={WAYS} />
      </V>
      <V name="fis" k="c">
        <JoinC ways={WAYS} />
      </V>
      <VPanel name="fis" label="Iştirok" />
    </div>
  )
}
