import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Icon } from '@/components/boshqaruv/Icon'
import { ListFilters } from '@/components/boshqaruv/news/ListFilters'
import { NewsTable, type Row } from '@/components/boshqaruv/news/NewsTable'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { CATEGORIES, KINDS, type ListParams, listNews, PER_PAGE, thumbOf } from '@/lib/boshqaruv/news'
import { sanaVaqt } from '@/lib/boshqaruv/vaqt'

export const metadata = { title: 'Yangiliklar' }

type P = { searchParams: Promise<ListParams> }

const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.t]))
const KIND = Object.fromEntries(KINDS.map((k) => [k.value, k.t]))

/** Joriy filtrlarni saqlagan holda bitta parametrni almaştiradi */
const href = (p: ListParams, patch: Partial<ListParams>) => {
  const q = new URLSearchParams()
  const all = { ...p, ...patch }
  for (const [k, v] of Object.entries(all)) if (v) q.set(k, v)
  const s = q.toString()
  return `/boshqaruv/yangiliklar${s ? `?${s}` : ''}`
}

export default async function Yangiliklar({ searchParams }: P) {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const p = await searchParams
  const r = await listNews(p)

  const rows: Row[] = r.docs.map((n) => ({
    id: n.id,
    title: n.title || 'Sarlavhasiz qoralama',
    thumb: thumbOf(n.image),
    cat: CAT[n.category] ?? n.category,
    catKey: n.category,
    kind: n.kind && n.kind !== 'yangilik' ? KIND[n.kind] : null,
    date: n.publishedAt ? sanaVaqt(n.publishedAt) : '—',
    status: n._status === 'published' ? 'published' : 'draft',
  }))

  const tabs = [
    { k: '', t: 'Barchasi', n: r.counts.all },
    { k: 'published', t: 'E’lon qilingan', n: r.counts.published },
    { k: 'draft', t: 'Qoralama', n: r.counts.draft },
  ]
  const from = r.totalDocs ? (r.page! - 1) * PER_PAGE + 1 : 0
  const to = Math.min(r.page! * PER_PAGE, r.totalDocs)
  const filtered = !!(p.q || p.turkum || p.tur || p.holat)

  // sahifa raqamlari: 1 … joriy±1 … oxirgi
  const pages: (number | null)[] = []
  for (let i = 1; i <= r.totalPages; i++) {
    if (i === 1 || i === r.totalPages || Math.abs(i - r.page!) <= 1) pages.push(i)
    else if (pages[pages.length - 1] !== null) pages.push(null)
  }

  return (
    <>
      <Top title="Yangiliklar" sub="Saytdagi barcha yangilik, e’lon, tadbir va tabriklar" crumbs={[{ t: 'Sayt kontenti' }, { t: 'Yangiliklar' }]}>
        <Link className="btn btn-primary" href="/boshqaruv/yangiliklar/yangi">
          <Icon name="plus" size={18} />
          <span>Yangilik qo‘shish</span>
        </Link>
      </Top>

      <div className="content">
        <div className="toolbar">
          <nav className="seg" aria-label="Holat">
            {tabs.map((t) => (
              <Link key={t.k} href={href(p, { holat: t.k || undefined, sahifa: undefined })} className={(p.holat ?? '') === t.k ? 'is-act' : undefined} scroll={false}>
                {t.t} <em>{t.n}</em>
              </Link>
            ))}
          </nav>
          <div className="filters">
            <ListFilters q={p.q ?? ''} turkum={p.turkum ?? ''} tur={p.tur ?? ''} tartib={p.tartib ?? ''} categories={CATEGORIES} kinds={[...KINDS]} />
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="card empty-state">
            <Icon name="news" size={32} />
            <b>{filtered ? 'Bu filtr bo‘yicha yangilik topilmadi' : 'Hozircha yangilik yo‘q'}</b>
            {filtered ? (
              <Link className="btn btn-ghost" href="/boshqaruv/yangiliklar">
                Filtrni tozalash
              </Link>
            ) : (
              <Link className="btn btn-primary" href="/boshqaruv/yangiliklar/yangi">
                Birinchi yangilikni qo‘shish
              </Link>
            )}
          </div>
        ) : (
          <NewsTable rows={rows} isAdmin={user.role === 'admin'} />
        )}

        {r.totalDocs > 0 && (
          <div className="pager">
            <span>
              {from}–{to} / {r.totalDocs}
            </span>
            {r.totalPages > 1 && (
              <nav className="pages" aria-label="Sahifalar">
                {r.hasPrevPage ? (
                  <Link href={href(p, { sahifa: String(r.page! - 1) })} aria-label="Oldingi sahifa">
                    <Icon name="chev" size={16} className="flip" />
                  </Link>
                ) : (
                  <span className="is-off">
                    <Icon name="chev" size={16} className="flip" />
                  </span>
                )}
                {pages.map((n, i) =>
                  n === null ? (
                    <span key={`g${i}`} className="gap">
                      …
                    </span>
                  ) : (
                    <Link key={n} href={href(p, { sahifa: n === 1 ? undefined : String(n) })} className={n === r.page ? 'is-act' : undefined} aria-current={n === r.page ? 'page' : undefined}>
                      {n}
                    </Link>
                  ),
                )}
                {r.hasNextPage ? (
                  <Link href={href(p, { sahifa: String(r.page! + 1) })} aria-label="Keyingi sahifa">
                    <Icon name="chev" size={16} />
                  </Link>
                ) : (
                  <span className="is-off">
                    <Icon name="chev" size={16} />
                  </span>
                )}
              </nav>
            )}
          </div>
        )}
      </div>
    </>
  )
}
