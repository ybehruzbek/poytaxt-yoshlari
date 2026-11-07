/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
/**
 * VAQTINÇA: Faoliyat sahifalarining B va C dizayn variantlari (Var.tsx bilan almaştiriladi).
 * Tanlov qilingaç, tanlanmagan variantlar şu fayldan öçiriladi.
 */
import Link from 'next/link'

import { CALLS } from './calls'
import { DIRECTIONS, dirProjects, dirTitle, REPORT_2025, YEARS } from './data'
import { EVENTS } from './events'
import { CHANNEL, fmtDate, type Project, TG } from './types'

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

/** B — suratli plitkalar: har yönaliş sönggi tadbir surati fonida */
export function DirsB({ base }: { base: string }) {
  return (
    <section className="sec fa-sec">
      <div className="wrap vb-tiles">
        {DIRECTIONS.map((d, i) => {
          const evs = dirEvents(d.slug)
          const img = evs.find((e) => e.img)?.img
          const nP = dirProjects(d.slug).length
          return (
            <Link key={d.slug} href={`${base}/${d.slug}`} className="vb-tile">
              {img && <img src={img} alt="" loading="lazy" />}
              <span className="vb-tile-n">{pad(i)}</span>
              <span className="vb-tile-txt">
                <strong>{d.title}</strong>
                <span>
                  {nP ? `${nP} ta loyiha · ` : ''}
                  {evs.length} ta tadbir
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/** C — keng qatorlar: raqam, nom va tavsif, hisob, 3 ta kiçik surat */
export function DirsC({ base }: { base: string }) {
  return (
    <section className="sec fa-sec">
      <div className="wrap vc-rows">
        {DIRECTIONS.map((d, i) => {
          const evs = dirEvents(d.slug)
          const nP = dirProjects(d.slug).length
          return (
            <Link key={d.slug} href={`${base}/${d.slug}`} className="vc-row">
              <span className="vc-row-n">{pad(i)}</span>
              <span className="vc-row-t">
                <strong>{d.title}</strong>
                <span>{d.lead}</span>
              </span>
              <span className="vc-row-c">
                <b>{evs.length}</b> tadbir
                {nP > 0 && (
                  <>
                    <br />
                    <b>{nP}</b> loyiha
                  </>
                )}
              </span>
              <span className="vc-row-ph">
                {evs
                  .filter((e) => e.img)
                  .slice(0, 3)
                  .map((e) => (
                    <img key={e.id} src={e.img} alt="" loading="lazy" />
                  ))}
              </span>
              <span className="vc-row-go">
                <Arrow />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/* ===================== Yönaliş sahifasi ===================== */

/** B — mozaika: raqamlar va suratlar, loyihalar qator, tadbirlar ixçam röyxat */
export function DirB({ slug, projBase }: { slug: string; projBase: string }) {
  const projs = dirProjects(slug as Project['dir'])
  const evs = dirEvents(slug)
  const pics = evs.filter((e) => e.img).slice(0, 4)
  const years = [...new Set(evs.map((e) => e.date.slice(0, 4)))].sort()
  return (
    <>
      <section className="sec fa-sec">
        <div className="wrap vb-split">
          <dl className="vb-stats">
            <div>
              <dd>{evs.length}</dd>
              <dt>ta tadbir ötkazildi</dt>
            </div>
            <div>
              <dd>{projs.length}</dd>
              <dt>ta loyiha</dt>
            </div>
            {years.length > 0 && (
              <div>
                <dd>
                  {years[0]}–{years[years.length - 1]}
                </dd>
                <dt>yillar davomida</dt>
              </div>
            )}
          </dl>
          <div className="vb-mosaic">
            {pics.map((e) => (
              <img key={e.id} src={e.img} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
      {projs.length > 0 && (
        <section className="sec fa-sec">
          <div className="wrap">
            <h2 className="fa-h2">Loyihalar</h2>
            <div className="vb-prows">
              {projs.map((p) => (
                <Link key={p.slug} href={`${projBase}/${p.slug}`} className="vb-prow">
                  {p.cover && <img src={p.cover} alt="" loading="lazy" />}
                  <span>
                    <small>
                      {p.period} · {STATUS(p.status)}
                    </small>
                    <strong>{p.title}</strong>
                    <span>{p.lead}</span>
                  </span>
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="sec fa-sec">
        <div className="wrap">
          <h2 className="fa-h2">Sönggi tadbirlar</h2>
          <ul className="vb-elist">
            {evs.slice(0, 10).map((e) => (
              <li key={e.id}>
                <a href={TG(e.id)} target="_blank" rel="noopener noreferrer">
                  <time dateTime={e.date}>{fmtDate(e.date)}</time>
                  <strong>{e.title}</strong>
                  <span>{e.place}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

/** C — xronologiya: tadbirlar yillar böyiça vertikal çiziqda, loyihalar yon ustunda */
export function DirC({ slug, projBase }: { slug: string; projBase: string }) {
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
    </section>
  )
}

/* ===================== Loyiha sahifasi ===================== */

function Facts({ p }: { p: Project }) {
  return (
    <dl className="fa-facts">
      <div>
        <dt>Yönaliş</dt>
        <dd>{dirTitle(p.dir)}</dd>
      </div>
      <div>
        <dt>Holati</dt>
        <dd>{STATUS(p.status)}</dd>
      </div>
      <div>
        <dt>Davri</dt>
        <dd>{p.period}</dd>
      </div>
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
      {p.national && (
        <div>
          <dt>Daraja</dt>
          <dd>Respublika loyihasi — şahar bosqiçi</dd>
        </div>
      )}
    </dl>
  )
}

const SrcNote = ({ p }: { p: Project }) => (
  <p className="fa-src-note">
    Manba: “Poytaxt yoşlari” Telegram kanali —{' '}
    <a href={TG(p.posts[0])} target="_blank" rel="noopener noreferrer">
      {p.posts.length} ta post
    </a>
  </p>
)

/** B — yonma-yon: çapda surat va maʼlumotlar (yopişqoq), öngda matn */
export function ProjB({ p, listHref }: { p: Project; listHref: string }) {
  return (
    <section className="sec fa-sec">
      <div className="wrap vb-proj">
        <aside className="vb-proj-side">
          {p.cover && <img src={p.cover} alt={p.title} />}
          <Facts p={p} />
        </aside>
        <div className="vb-proj-main">
          <h2 className="fa-h2">Loyiha haqida</h2>
          <p className="vb-proj-desc">{p.description}</p>
          {p.results.length > 0 && (
            <>
              <h2 className="fa-h2">Natijalar</h2>
              <ol className="vb-res">
                {p.results.map((r) => (
                  <li key={r.text}>
                    {r.text} <Src id={r.post} />
                  </li>
                ))}
              </ol>
            </>
          )}
          {p.milestones.length > 0 && (
            <>
              <h2 className="fa-h2">Muhim sanalar</h2>
              <ol className="fa-tl">
                {p.milestones.map((m) => (
                  <li key={`${m.date}-${m.text}`}>
                    <time dateTime={m.date}>{fmtDate(m.date)}</time>
                    <p>
                      {m.text} <Src id={m.post} />
                    </p>
                  </li>
                ))}
              </ol>
            </>
          )}
          {p.gallery.length > 0 && (
            <div className="vb-gal">
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
      </div>
    </section>
  )
}

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

/** C — vertikal xronologiya: raqamlar tasmasi, yillar çiziq böylab */
export function ResultsC() {
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <div className="vc-strip">
          {REPORT_2025.nums.map((n) => (
            <div key={n.t}>
              <b>{n.v}</b>
              <span>{n.t}</span>
            </div>
          ))}
        </div>
        <p className="fa-src-note">
          2025-yil yakunlari —{' '}
          <a href={TG(REPORT_2025.post)} target="_blank" rel="noopener noreferrer">
            rasmiy hisobot ↗
          </a>
        </p>
        <div className="vc-vtl">
          {YEARS.map((y) => (
            <section key={y.y}>
              <b>{y.y}</b>
              <div>
                {y.items.map((it) => (
                  <p key={it.text}>
                    {it.text} <Src id={it.post} />
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== Iştirok ===================== */

export type Way = { t: string; d: string; href: string; go: string }

const Calls = ({ cls }: { cls: string }) => (
  <div className={cls}>
    {CALLS.slice(0, 8).map((c) => (
      <a key={c.id} href={TG(c.id)} target="_blank" rel="noopener noreferrer">
        <time dateTime={c.date}>{fmtDate(c.date)}</time>
        <strong>{c.call}</strong>
        {c.how && <span>{c.how}</span>}
        <em>Telegramda köriş ↗</em>
      </a>
    ))}
  </div>
)

const ChannelNote = () => (
  <p className="fa-src-note">
    Barça eʼlonlar:{' '}
    <a href={CHANNEL} target="_blank" rel="noopener noreferrer">
      “Poytaxt yoşlari” Telegram kanali
    </a>
  </p>
)

/** B — bosqiçlar: yöllar keng qatorlarda tugma bilan, çaqiriqlar jadvalda */
export function JoinB({ ways }: { ways: Way[] }) {
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <div className="vb-steps">
          {ways.map((w, i) => (
            <section key={w.t}>
              <span className="vb-steps-n">{pad(i)}</span>
              <div>
                <h2>{w.t}</h2>
                <p>{w.d}</p>
              </div>
              <Link href={w.href} className="btn btn-primary">
                {w.go}
              </Link>
            </section>
          ))}
        </div>
        <h2 className="fa-h2">Kanaldagi sönggi çaqiriqlar</h2>
        <Calls cls="vb-table" />
        <ChannelNote />
      </div>
    </section>
  )
}

/** C — kontrast: yöllar tög‘ fonda 2×2, çaqiriqlar sariq çiziqli kartoçkalarda */
export function JoinC({ ways }: { ways: Way[] }) {
  return (
    <>
      <section className="sec fa-sec">
        <div className="wrap">
          <div className="vc-dark">
            {ways.map((w, i) => (
              <Link key={w.t} href={w.href} className="vc-dark-i">
                <span>{pad(i)}</span>
                <h2>{w.t}</h2>
                <p>{w.d}</p>
                <em>
                  {w.go} <Arrow />
                </em>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="sec fa-sec">
        <div className="wrap">
          <h2 className="fa-h2">Kanaldagi sönggi çaqiriqlar</h2>
          <Calls cls="vc-calls" />
          <ChannelNote />
        </div>
      </section>
    </>
  )
}
