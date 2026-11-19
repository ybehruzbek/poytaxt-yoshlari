import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { Icon } from '@/components/boshqaruv/Icon'
import { SearchBox } from '@/components/boshqaruv/inbox/SearchBox'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { listDocs } from '@/lib/boshqaruv/docs'
import { groupOf } from '@/lib/boshqaruv/menu'
import { collectionSchema } from '@/lib/boshqaruv/schema'

type SP = { q?: string; sahifa?: string }
type P = { params: Promise<{ slug: string }>; searchParams: Promise<SP> }

export async function generateMetadata({ params }: P) {
  return { title: (await collectionSchema((await params).slug))?.plural ?? 'Bölim' }
}

/** Universal röyxat: sarlavha, Payload'dagi asosiy ustunlar, qidiruv va sahifalaş */
export default async function Bolim({ params, searchParams }: P) {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const { slug } = await params
  const schema = await collectionSchema(slug)
  if (!schema) notFound()
  const sp = await searchParams
  const r = await listDocs(schema, sp)
  const base = `/boshqaruv/bolim/${slug}`
  const href = (patch: Partial<SP>) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) q.set(k, v)
    const s = q.toString()
    return `${base}${s ? `?${s}` : ''}`
  }
  const grp = groupOf(base)

  return (
    <>
      <Top title={schema.plural} sub={schema.description} crumbs={[...(grp ? [{ t: grp }] : []), { t: schema.plural }]}>
        <Link className="btn btn-primary" href={`${base}/yangi`}>
          <Icon name="plus" size={18} />
          <span>Qöşiş</span>
        </Link>
      </Top>
      <div className="content">
        <div className="toolbar">
          <div className="filters">
            <SearchBox q={sp.q ?? ''} placeholder="Qidiriş" />
            <span className="count-note">Jami: {r.totalDocs}</span>
          </div>
        </div>
        {r.rows.length === 0 ? (
          <div className="card empty-state">
            <Icon name="file" size={32} />
            <b>{sp.q ? 'Qidiruv böyiça heç narsa topilmadi' : 'Hozirça yozuv yöq'}</b>
            {!sp.q && (
              <Link className="btn btn-primary" href={`${base}/yangi`}>
                Birinçisini qöşiş
              </Link>
            )}
          </div>
        ) : (
          <div className="table dtable" role="table" aria-label={schema.plural} style={{ ['--cols' as string]: r.cols.length }}>
            <div className="drow thead" role="row">
              <span role="columnheader">Nomi</span>
              {r.cols.map((c) => (
                <span key={c.key} role="columnheader">
                  {c.t}
                </span>
              ))}
            </div>
            {r.rows.map((row) => (
              <Link key={row.id} href={`${base}/${row.id}`} className="drow" role="row">
                <b role="cell">{row.title}</b>
                {row.cells.map((c, i) => (
                  <span key={i} role="cell" className="dcell" data-t={r.cols[i].t}>
                    {c.thumb ? <img src={c.thumb} alt="" loading="lazy" /> : c.tone ? <span className={`pill t-${c.tone}`}>{c.v}</span> : c.v}
                  </span>
                ))}
              </Link>
            ))}
          </div>
        )}
        {r.totalPages > 1 && (
          <div className="pager">
            <span>
              {r.page} / {r.totalPages} sahifa
            </span>
            <nav className="pages">
              {r.page > 1 ? (
                <Link href={href({ sahifa: String(r.page - 1) })} aria-label="Oldingi sahifa">
                  <Icon name="chev" size={16} className="flip" />
                </Link>
              ) : (
                <span className="is-off">
                  <Icon name="chev" size={16} className="flip" />
                </span>
              )}
              {r.page < r.totalPages ? (
                <Link href={href({ sahifa: String(r.page + 1) })} aria-label="Keyingi sahifa">
                  <Icon name="chev" size={16} />
                </Link>
              ) : (
                <span className="is-off">
                  <Icon name="chev" size={16} />
                </span>
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  )
}
