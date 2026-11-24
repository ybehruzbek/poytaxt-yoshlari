import Link from 'next/link'

import { Icon } from '@/components/boshqaruv/Icon'
import { Top } from '@/components/boshqaruv/Shell'
import { getPayloadClient, requireUser } from '@/lib/boshqaruv/auth'
import { oyNomi } from '@/lib/boshqaruv/vaqt'
import { davrStat, hozir, sozlangan, TZ, type Davr, type Hozir, type Qator, type Stat } from '@/lib/statistika/cloudflare'
import { davlatNomi, manbalar, menyuNomi, qurilmaNomi, sahifalar, yangilikSlug } from '@/lib/statistika/nomlar'

export const metadata = { title: { absolute: 'Statistika — Boşqaruv paneli' } }

const DAVRLAR: { v: Davr; t: string }[] = [
  { v: 1, t: 'Bugun' },
  { v: 7, t: '7 kun' },
  { v: 30, t: '30 kun' },
  { v: 90, t: '90 kun' },
]
const HOST = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://yoshkent.uz').hostname
const NBSP = ' '

/** 12345 → “12 345” (raqam bölinmaydi) */
const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)
const foiz = (a: number, b: number) => (b > 0 ? `${Math.round((a / b) * 100)}%` : '0%')
const tk = (t: number) => new Date(t + TZ)
const kunYorliq = (t: number) => `${tk(t).getUTCDate()}-${oyNomi(tk(t).getUTCMonth())}`
const soatYorliq = (t: number) => `${String(tk(t).getUTCHours()).padStart(2, '0')}:00`

function Farq({ a, b }: { a: number; b: number }) {
  if (a === b) return <>keça şu vaqtgaça ham {fmt(b)}</>
  return (
    <>
      <em className={a < b ? 'down' : undefined}>
        {a > b ? '+' : '−'}
        {fmt(Math.abs(a - b))}
      </em>{' '}
      keçaning şu vaqtiga nisbatan
    </>
  )
}

function Grafik({ s }: { s: Stat }) {
  const max = Math.max(1, ...s.seriya.map((p) => p.koris))
  const n = s.seriya.length
  const every = s.qadam === 'soat' ? 3 : n > 45 ? 10 : n > 14 ? 4 : 1
  const yorliq = s.qadam === 'soat' ? soatYorliq : kunYorliq
  return (
    <div className="st-chart">
      <div className="st-y" aria-hidden="true">
        <span>{fmt(max)}</span>
        <span>{fmt(max / 2)}</span>
        <span>0</span>
      </div>
      <div className="st-plot">
        <div className="st-bars" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {s.seriya.map((p) => (
            <div key={p.t} className="st-col" tabIndex={0}>
              <i style={{ height: `${(p.koris / max) * 100}%` }} />
              <b style={{ height: `${(p.tashrif / max) * 100}%` }} />
              <span className="st-tip" role="tooltip">
                <strong>{s.qadam === 'soat' ? `${soatYorliq(p.t)}–${soatYorliq(p.t + 3600e3)}` : kunYorliq(p.t)}</strong>
                {fmt(p.tashrif)} taşrif · {fmt(p.koris)} köriş
              </span>
            </div>
          ))}
        </div>
        <div className="st-x" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }} aria-hidden="true">
          {s.seriya.map((p, i) => (
            <span key={p.t}>{i % every === 0 ? yorliq(p.t) : ''}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

type Row = Qator & { nom: React.ReactNode }
function Royxat({ title, rows, by = 'koris', limit = 8, bosh }: { title: string; rows: Row[]; by?: 'koris' | 'tashrif'; limit?: number; bosh?: string }) {
  rows = [...rows].sort((a, b) => b[by] - a[by])
  const total = rows.reduce((s, r) => s + r[by], 0)
  const max = Math.max(1, ...rows.map((r) => r[by]))
  return (
    <section className="card">
      <div className="card__head">
        <h2>{title}</h2>
        <span className="st-unit">{bosh ?? (by === 'koris' ? 'köriş' : 'taşrif')}</span>
      </div>
      {rows.length === 0 || total === 0 ? (
        <p className="empty">Bu davrda maʼlumot yöq</p>
      ) : (
        <ul className="st-list">
          {rows.slice(0, limit).map((r) => (
            <li key={r.k}>
              <span className="st-bar" style={{ width: `${(r[by] / max) * 100}%` }} />
              <span className="st-name">{r.nom}</span>
              <b>{fmt(r[by])}</b>
              <small>{foiz(r[by], total)}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** “//boşqa.sayt” yoki “javascript:” kabi manzillar havola bölmaydi */
const XAVFSIZ_YOL = /^\/(?![/\\])[A-Za-z0-9._~\-/%]*$/

/** Eng köp oçilgan sahifalar: menyu sahifasi nomi yoki yangilik sarlavhasi (faqat eʼlon qilinganlari) */
async function sahifaQatorlari(list: Qator[]): Promise<Row[]> {
  const rows = sahifalar(list).slice(0, 10)
  const slugs = rows.map((r) => yangilikSlug(r.k)).filter((s): s is string => Boolean(s))
  const titles = new Map<string, string>()
  if (slugs.length) {
    try {
      const payload = await getPayloadClient()
      const r = await payload.find({
        collection: 'news',
        where: { and: [{ slug: { in: slugs } }, { _status: { equals: 'published' } }] },
        select: { title: true, slug: true },
        limit: slugs.length,
        depth: 0,
        overrideAccess: true,
      })
      for (const d of r.docs) if (d.slug) titles.set(d.slug, d.title)
    } catch {
      // sarlavha topilmasa manzilning özi körsatiladi
    }
  }
  return rows.map((r) => {
    const slug = yangilikSlug(r.k)
    const name = (slug && titles.get(slug)) || menyuNomi(r.k) || r.k
    // manzil Cloudflare'ga brauzerdan keladi: faqat öz saytimizdagi oddiy yöl havolaga aylanadi
    if (!XAVFSIZ_YOL.test(r.k)) return { ...r, nom: name }
    return {
      ...r,
      nom: (
        <a href={r.k} target="_blank" rel="noopener noreferrer" title={r.k}>
          {name}
        </a>
      ),
    }
  })
}

function Ulanmagan() {
  return (
    <section className="card">
      <div className="empty-state">
        <span className="stat__ic ic-yellow">
          <Icon name="chart" size={24} />
        </span>
        <b>Statistika hali ulanmagan</b>
        <p className="st-steps">
          Saytga taşriflar Cloudflare Web Analytics orqali sanaladi. Ulaş uçun serverdagi ilova sozlamalariga{' '}
          <code>CF_API_TOKEN</code> (Account Analytics: Read ruxsati bilan) va <code>CF_ACCOUNT_ID</code> qöşiladi, saytga
          esa Cloudflare hisoblagiçi tokeni kiritiladi.
        </p>
      </div>
    </section>
  )
}

export default async function StatistikaPage(props: { searchParams: Promise<{ davr?: string }> }) {
  await requireUser()
  const sp = await props.searchParams
  const davr = (DAVRLAR.find((d) => String(d.v) === sp.davr)?.v ?? 7) as Davr

  const top = (
    <Top title="Statistika" sub="Saytga taşriflar, qurilmalar va manbalar · Cloudflare Web Analytics">
      <a className="btn btn-ghost" href="https://dash.cloudflare.com/?to=/:account/web-analytics" target="_blank" rel="noopener noreferrer">
        <Icon name="ext" size={18} />
        Cloudflareʼda oçiş
      </a>
    </Top>
  )
  if (!sozlangan()) {
    return (
      <>
        {top}
        <div className="content">
          <Ulanmagan />
        </div>
      </>
    )
  }

  let s: Stat | null = null
  let h: Hozir | null = null
  let xato: string | null = null
  try {
    ;[s, h] = await Promise.all([davrStat(davr), hozir()])
  } catch (e) {
    xato = e instanceof Error ? e.message : String(e)
  }

  if (!s || !h) {
    return (
      <>
        {top}
        <div className="content">
          <section className="card">
            <div className="empty-state">
              <span className="stat__ic ic-orange">
                <Icon name="alert" size={24} />
              </span>
              <b>Cloudflareʼdan maʼlumot olib bölmadi</b>
              <p className="st-steps">{xato}</p>
            </div>
          </section>
        </div>
      </>
    )
  }

  const sahifa = await sahifaQatorlari(s.sahifa)

  return (
    <>
      {top}
      <div className="content">
        <div className="stats">
          <div className="stat">
            <span className="stat__ic ic-green st-live">
              <Icon name="eye" size={24} />
            </span>
            <div>
              <b>{fmt(h.d5)}</b>
              <span>Oxirgi 5 daqiqada oçilgan sahifalar</span>
              <small>30 daqiqada: {fmt(h.d30)}</small>
            </div>
          </div>
          <div className="stat">
            <span className="stat__ic ic-yellow">
              <Icon name="users" size={24} />
            </span>
            <div>
              <b>{fmt(h.bugun.tashrif)}</b>
              <span>Bugungi taşriflar</span>
              <small>
                <Farq a={h.bugun.tashrif} b={h.keca.tashrif} />
              </small>
            </div>
          </div>
          <div className="stat">
            <span className="stat__ic ic-blue">
              <Icon name="layout" size={24} />
            </span>
            <div>
              <b>{fmt(h.bugun.koris)}</b>
              <span>Bugun körilgan sahifalar</span>
              <small>
                <Farq a={h.bugun.koris} b={h.keca.koris} />
              </small>
            </div>
          </div>
          <div className="stat">
            <span className="stat__ic ic-orange">
              <Icon name="chart" size={24} />
            </span>
            <div>
              <b>{fmt(s.jami.tashrif)}</b>
              <span>{davr === 1 ? 'Bugungi jami taşriflar' : `Oxirgi ${davr} kundagi taşriflar`}</span>
              <small>{fmt(s.jami.koris)} sahifa köriş</small>
            </div>
          </div>
        </div>

        <section className="card st-main">
          <div className="card__head st-head">
            <h2>{s.qadam === 'soat' ? 'Bugun soatlar böyiça' : 'Kunlar böyiça'}</h2>
            <div className="st-legend" aria-hidden="true">
              <span className="k">Sahifa körişlari</span>
              <span className="t">Taşriflar</span>
            </div>
            <nav className="seg" aria-label="Davr">
              {DAVRLAR.map((d) => (
                <Link key={d.v} href={`/boshqaruv/statistika?davr=${d.v}`} className={d.v === davr ? 'is-act' : undefined} prefetch={false}>
                  {d.t}
                </Link>
              ))}
            </nav>
          </div>
          <Grafik s={s} />
          {s.qisqardi && (
            <p className="st-note">Cloudflare maʼlumotni çeklangan muddat saqlaydi: grafik {kunYorliq(s.from)}dan boşlanadi.</p>
          )}
        </section>

        <div className="st-grid">
          <Royxat title="Ommabop sahifalar" rows={sahifa} limit={10} />
          <Royxat
            title="Taşrif manbalari"
            by="tashrif"
            rows={manbalar(s.manba, HOST).map((r) => ({ ...r, nom: r.k }))}
            limit={10}
          />
          <Royxat title="Qurilmalar" rows={s.qurilma.map((r) => ({ ...r, nom: qurilmaNomi(r.k) }))} />
          <Royxat title="Davlatlar" rows={s.davlat.map((r) => ({ ...r, nom: davlatNomi(r.k) }))} />
          <Royxat title="Brauzerlar" rows={s.brauzer.map((r) => ({ ...r, nom: r.k || 'Nomaʼlum' }))} />
          <Royxat title="Operatsion tizimlar" rows={s.tizim.map((r) => ({ ...r, nom: r.k || 'Nomaʼlum' }))} />
        </div>

        <p className="st-note">
          Maʼlumot Cloudflare Web Analyticsʼdan olinadi va bir neça daqiqa keçikadi. “Taşrif” — saytga taşqaridan
          kiriş, “köriş” — har bir oçilgan sahifa. Cookie işlatilmaydi, IP manzillar saqlanmaydi.
        </p>
      </div>
    </>
  )
}
