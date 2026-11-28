import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { Icon } from '@/components/boshqaruv/Icon'
import { InboxDetail } from '@/components/boshqaruv/inbox/InboxDetail'
import { SearchBox } from '@/components/boshqaruv/inbox/SearchBox'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { getInboxItem, listInbox } from '@/lib/boshqaruv/inbox'
import { kindByPath } from '@/lib/boshqaruv/inbox-config'

type SP = { holat?: string; q?: string; sahifa?: string; id?: string }
type P = { params: Promise<{ tur: string }>; searchParams: Promise<SP> }

export async function generateMetadata({ params }: P) {
  return { title: kindByPath((await params).tur)?.t ?? 'Kiruvchi xabarlar' }
}

/**
 * Kiruvçi xabarlar: çapda röyxat, öngda tanlangan xabar (poçta qutisi kabi).
 * Sukut böyiça javob kutayotganlar (holati “yangi”) körsatiladi. Telefonda röyxat va xabar alohida oçiladi.
 */
export default async function Kiruvchi({ params, searchParams }: P) {
  const user = await requireUser()
  if (user.role !== 'admin' && user.role !== 'operator') redirect('/boshqaruv')
  const kind = kindByPath((await params).tur)
  if (!kind) notFound()
  const sp = await searchParams
  const p = { ...sp, holat: sp.holat ?? 'yangi' }
  const id = Number(sp.id)
  const [list, item] = await Promise.all([listInbox(kind, p), Number.isInteger(id) && id > 0 ? getInboxItem(kind, id) : null])

  const base = `/boshqaruv/kiruvchi/${kind.path}`
  const href = (patch: Partial<SP>) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) q.set(k, v)
    const s = q.toString()
    return `${base}${s ? `?${s}` : ''}`
  }
  const tone = (v: string) => kind.statuses.find((s) => s.v === v)
  const tabs = [...kind.statuses.filter((s) => !s.done || list.counts[s.v] > 0), { v: 'all', t: 'Barchasi', tone: 'brown' as const }]

  return (
    <>
      <Top title={kind.t} crumbs={[{ t: 'Kiruvchi xabarlar' }, { t: kind.t }]} />
      <div className={item ? 'content inbox has-item' : 'content inbox'}>
        <section className="inbox__list card">
          <nav className="seg" aria-label="Holat">
            {tabs.map((t) => (
              <Link key={t.v} href={href({ holat: t.v === 'yangi' ? undefined : t.v, sahifa: undefined, id: undefined })} className={list.holat === t.v || (t.v === 'yangi' && p.holat === 'yangi') ? 'is-act' : undefined} scroll={false}>
                {t.t} <em>{t.v === 'all' ? list.counts.all : list.counts[t.v]}</em>
              </Link>
            ))}
          </nav>
          <SearchBox q={sp.q ?? ''} placeholder={kind.searchHint} />

          {list.rows.length === 0 ? (
            <div className="empty-state">
              <Icon name="inbox" size={32} />
              <b>{sp.q ? 'Qidiruv bo‘yicha hech narsa topilmadi' : p.holat === 'yangi' ? 'Javob kutayotgan xabar yo‘q' : 'Bu holatda xabar yo‘q'}</b>
              {p.holat === 'yangi' && !sp.q && list.counts.all > 0 && (
                <Link className="btn btn-ghost" href={href({ holat: 'all', id: undefined })}>
                  Barchasini ko‘rsatish
                </Link>
              )}
            </div>
          ) : (
            <ul className="list inbox__rows">
              {list.rows.map((r) => {
                const st = tone(r.status)
                return (
                  <li key={r.id}>
                    <Link href={href({ id: String(r.id) })} className={r.id === id ? 'irow is-act' : r.status === 'yangi' ? 'irow is-new' : 'irow'} scroll={false} aria-current={r.id === id ? 'true' : undefined}>
                      <div className="irow__top">
                        <b>{r.title}</b>
                        <span className="irow__when">{r.when}</span>
                      </div>
                      {r.sub && <p>{r.sub}</p>}
                      <div className="irow__tags">
                        {r.tag && <span className={`pill no-dot t-${r.tag.tone}`}>{r.tag.t}</span>}
                        {st && <span className={`pill t-${st.tone}`}>{st.t}</span>}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          {list.totalPages > 1 && (
            <div className="pager">
              <span>
                {list.page} / {list.totalPages} sahifa
              </span>
              <nav className="pages">
                {list.page > 1 ? (
                  <Link href={href({ sahifa: String(list.page - 1), id: undefined })} aria-label="Oldingi sahifa">
                    <Icon name="chev" size={16} className="flip" />
                  </Link>
                ) : (
                  <span className="is-off">
                    <Icon name="chev" size={16} className="flip" />
                  </span>
                )}
                {list.page < list.totalPages ? (
                  <Link href={href({ sahifa: String(list.page + 1), id: undefined })} aria-label="Keyingi sahifa">
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
        </section>

        <section className="inbox__view">
          {item ? (
            <InboxDetail key={`${item.slug}-${item.id}`} item={item} statuses={kind.statuses} isAdmin={user.role === 'admin'} backHref={href({ id: undefined })} />
          ) : sp.id ? (
            <div className="card empty-state">
              <Icon name="alert" size={32} />
              <b>Xabar topilmadi yoki o‘chirilgan</b>
            </div>
          ) : (
            <div className="card empty-state inbox__pick">
              <Icon name="inbox" size={32} />
              <b>Xabarni tanlang</b>
              <span>Chapdagi ro‘yxatdan xabarni bossangiz, u shu yerda ochiladi.</span>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
