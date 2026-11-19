import Link from 'next/link'
import type { Payload } from 'payload'

import { Icon } from '@/components/boshqaruv/Icon'
import { InboxCard, type InboxItem, type InboxTab } from '@/components/boshqaruv/InboxCard'
import { Top } from '@/components/boshqaruv/Shell'
import { NEWS_CATEGORIES } from '@/collections/News'
import type { Media } from '@/payload-types'
import { getPayloadClient, requireUser } from '@/lib/boshqaruv/auth'
import { bugunBoshi, bugunSarlavha, kunOldin, oyChegaralari, oyNomi, qisqaVaqt, sanaVaqt } from '@/lib/boshqaruv/vaqt'

export const metadata = { title: { absolute: 'Boşqaruv paneli' } }

const CAT = Object.fromEntries(NEWS_CATEGORIES.map((c) => [c.value, c.label])) as Record<string, string>
const APPEAL_TYPE: Record<string, { t: string; c: string }> = {
  ariza: { t: 'Ariza', c: 't-orange' },
  taklif: { t: 'Taklif', c: 't-blue' },
  shikoyat: { t: 'Şikoyat', c: 't-pink' },
}

const thumb = (img: unknown) => {
  const m = img as Media | null | undefined
  return m && typeof m === 'object' ? (m.sizes?.thumb?.url ?? m.url ?? null) : null
}
const safeCount = (p: Promise<{ totalDocs: number }>) => p.then((r) => r.totalDocs).catch(() => 0)

/** Kiruvçi xabarlar: har bir tur böyiça oxirgi 5 ta javob kutayotgani */
async function inbox(payload: Payload): Promise<{ tabs: InboxTab[]; today: number }> {
  const q = { where: { status: { equals: 'yangi' } }, sort: '-createdAt', limit: 5, depth: 0, overrideAccess: true } as const
  const [a, m, v, e, today] = await Promise.all([
    payload.find({ collection: 'appeals', ...q, select: { name: true, type: true, message: true, createdAt: true } }),
    payload.find({ collection: 'memberships', ...q, select: { name: true, place: true, createdAt: true } }),
    payload.find({ collection: 'volunteers', ...q, select: { name: true, dirs: true, createdAt: true } }),
    payload.find({ collection: 'text-errors', ...q, select: { text: true, page: true, createdAt: true } }),
    safeCount(payload.count({ collection: 'appeals', where: { and: [{ status: { equals: 'yangi' } }, { createdAt: { greater_than_equal: bugunBoshi() } }] }, overrideAccess: true })),
  ])
  const it = (x: InboxItem) => x
  return {
    today,
    tabs: [
      {
        key: 'appeals',
        t: 'Murojaatlar',
        total: a.totalDocs,
        href: '/boshqaruv/kiruvchi/murojaatlar',
        items: a.docs.map((d) =>
          it({ id: d.id, name: d.name, text: d.message, when: qisqaVaqt(d.createdAt), tag: APPEAL_TYPE[d.type], href: `/boshqaruv/kiruvchi/murojaatlar?id=${d.id}` }),
        ),
      },
      {
        key: 'memberships',
        t: 'Aʼzolik',
        total: m.totalDocs,
        href: '/boshqaruv/kiruvchi/azolik',
        items: m.docs.map((d) => it({ id: d.id, name: d.name, text: d.place, when: qisqaVaqt(d.createdAt), href: `/boshqaruv/kiruvchi/azolik?id=${d.id}` })),
      },
      {
        key: 'volunteers',
        t: 'Volontyorlik',
        total: v.totalDocs,
        href: '/boshqaruv/kiruvchi/volontyorlik',
        items: v.docs.map((d) => it({ id: d.id, name: d.name, text: d.dirs, when: qisqaVaqt(d.createdAt), href: `/boshqaruv/kiruvchi/volontyorlik?id=${d.id}` })),
      },
      {
        key: 'text-errors',
        t: 'Matn xatolari',
        total: e.totalDocs,
        href: '/boshqaruv/kiruvchi/matn-xatolari',
        items: e.docs.map((d) =>
          it({ id: d.id, name: `“${d.text.slice(0, 60)}”`, text: d.page, when: qisqaVaqt(d.createdAt), href: `/boshqaruv/kiruvchi/matn-xatolari?id=${d.id}`, noAva: true }),
        ),
      },
    ],
  }
}

async function content(payload: Payload) {
  const { oy, prevOy, kun, start, prev, prevSame } = oyChegaralari()
  const pub = { _status: { equals: 'published' } } as const
  const card = { title: true, category: true, publishedAt: true, updatedAt: true, image: true, _status: true } as const
  const [thisMonth, lastMonth, drafts, recent, draftList, changed] = await Promise.all([
    safeCount(payload.count({ collection: 'news', where: { and: [pub, { publishedAt: { greater_than_equal: start } }] }, overrideAccess: true })),
    safeCount(
      payload.count({
        collection: 'news',
        where: { and: [pub, { publishedAt: { greater_than_equal: prev } }, { publishedAt: { less_than: prevSame } }] },
        overrideAccess: true,
      }),
    ),
    safeCount(payload.count({ collection: 'news', where: { _status: { equals: 'draft' } }, overrideAccess: true })),
    payload.find({ collection: 'news', where: pub, sort: '-publishedAt', limit: 4, depth: 1, select: card, overrideAccess: true }),
    payload.find({ collection: 'news', where: { _status: { equals: 'draft' } }, sort: 'updatedAt', limit: 3, depth: 1, select: card, overrideAccess: true }),
    payload.find({ collection: 'news', sort: '-updatedAt', limit: 4, depth: 0, select: { title: true, updatedAt: true, createdAt: true, _status: true }, overrideAccess: true }),
  ])
  return { oy, prevOy, kun, thisMonth, lastMonth, drafts, recent: recent.docs, draftList: draftList.docs, changed: changed.docs }
}

export default async function Dashboard() {
  const user = await requireUser()
  const payload = await getPayloadClient()
  const isInbox = user.role === 'admin' || user.role === 'operator'
  const isContent = user.role === 'admin' || user.role === 'muharrir'
  const [ib, ct] = await Promise.all([isInbox ? inbox(payload) : null, isContent ? content(payload) : null])

  const first = user.name.split(/\s+/)[0]
  const pending = ib ? ib.tabs.reduce((s, t) => s + t.total, 0) : 0
  const diff = ct ? ct.thisMonth - ct.lastMonth : 0

  return (
    <>
      <Top
        title={
          <>
            Xuş kelibsiz, <span>{first}</span>
          </>
        }
        sub={`${bugunSarlavha()} · ${pending > 0 ? `javob kutayotgan ${pending} ta xabar bor` : 'barça xabarlar körib çiqilgan'}`}
      >
        <a className="btn btn-ghost" href="/uz" target="_blank" rel="noopener noreferrer">
          <Icon name="ext" size={18} />
          Saytni oçiş
        </a>
        {isContent && (
          <Link className="btn btn-primary" href="/boshqaruv/yangiliklar/yangi" prefetch={false}>
            <Icon name="plus" size={18} />
            <span>Yangilik qöşiş</span>
          </Link>
        )}
      </Top>

      <div className="content">
        <div className="stats">
          {ib && (
            <>
              <Link className="stat" href="/boshqaruv/kiruvchi/murojaatlar" prefetch={false}>
                <span className="stat__ic ic-orange">
                  <Icon name="inbox" size={24} />
                </span>
                <div>
                  <b>{ib.tabs[0].total}</b>
                  <span>Javob kutayotgan murojaatlar</span>
                  <small>{ib.today > 0 ? <em>+{ib.today} bugun</em> : 'bugun yangi murojaat yöq'}</small>
                </div>
              </Link>
              <Link className="stat" href="/boshqaruv/kiruvchi/azolik" prefetch={false}>
                <span className="stat__ic ic-blue">
                  <Icon name="user-plus" size={24} />
                </span>
                <div>
                  <b>{ib.tabs[1].total + ib.tabs[2].total}</b>
                  <span>Körib çiqilmagan arizalar</span>
                  <small>
                    {ib.tabs[1].total} aʼzolik, {ib.tabs[2].total} volontyorlik
                  </small>
                </div>
              </Link>
            </>
          )}
          {ct && (
            <>
              <Link className="stat" href="/boshqaruv/yangiliklar" prefetch={false}>
                <span className="stat__ic ic-green">
                  <Icon name="news" size={24} />
                </span>
                <div>
                  <b>{ct.thisMonth}</b>
                  <span>{`${oyNomi(ct.oy)[0].toLocaleUpperCase('uz')}${oyNomi(ct.oy).slice(1)}da eʼlon qilingan yangiliklar`}</span>
                  <small>
                    {diff === 0 ? (
                      `1–${ct.kun}-${oyNomi(ct.prevOy)} bilan teng`
                    ) : (
                      <>
                        <em className={diff < 0 ? 'down' : undefined}>
                          {diff > 0 ? '+' : '−'}
                          {Math.abs(diff)}
                        </em>{' '}
                        <span className="nb">{ct.kun === 1 ? `1-${oyNomi(ct.prevOy)}ga` : `1–${ct.kun}-${oyNomi(ct.prevOy)}ga`}</span> nisbatan
                      </>
                    )}
                  </small>
                </div>
              </Link>
              <Link className="stat" href="/boshqaruv/yangiliklar?holat=draft" prefetch={false}>
                <span className="stat__ic ic-yellow">
                  <Icon name="pen" size={24} />
                </span>
                <div>
                  <b>{ct.drafts}</b>
                  <span>Tugallanmagan qoralamalar</span>
                  <small>
                    {ct.draftList[0] ? `eng eskisi ${kunOldin(ct.draftList[0].updatedAt)} kun oldin` : 'qoralama yöq'}
                  </small>
                </div>
              </Link>
            </>
          )}
          {ib && !ct && (
            <>
              <Link className="stat" href="/boshqaruv/kiruvchi/volontyorlik" prefetch={false}>
                <span className="stat__ic ic-green">
                  <Icon name="heart" size={24} />
                </span>
                <div>
                  <b>{ib.tabs[2].total}</b>
                  <span>Volontyorlik arizalari</span>
                  <small>holati “yangi”</small>
                </div>
              </Link>
              <Link className="stat" href="/boshqaruv/kiruvchi/matn-xatolari" prefetch={false}>
                <span className="stat__ic ic-yellow">
                  <Icon name="type" size={24} />
                </span>
                <div>
                  <b>{ib.tabs[3].total}</b>
                  <span>Saytdagi matn xatolari</span>
                  <small>foydalanuvçilar xabar bergan</small>
                </div>
              </Link>
            </>
          )}
        </div>

        <div className={ib && ct ? 'grid-dash' : 'stack'}>
          <div className="stack">
            {ib && <InboxCard tabs={ib.tabs} />}
            {ct && (
              <section className="card">
                <div className="card__head">
                  <h2>Oxirgi yangiliklar</h2>
                  <Link className="more" href="/boshqaruv/yangiliklar" prefetch={false}>
                    Barçasi
                    <Icon name="chev" size={16} />
                  </Link>
                </div>
                <ul className="list">
                  {ct.recent.map((n) => (
                    <li key={n.id}>
                      <Link className="news" href={`/boshqaruv/yangiliklar/${n.id}`} prefetch={false}>
                        {thumb(n.image) ? <img src={thumb(n.image)!} alt="" loading="lazy" /> : <span className="ph" />}
                        <div>
                          <b>{n.title}</b>
                          <small>
                            {CAT[n.category] ?? n.category} · {sanaVaqt(n.publishedAt)}
                          </small>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {ct && (
            <div className="stack">
              <section className="card">
                <div className="card__head">
                  <h2>Tezkor amallar</h2>
                </div>
                <div className="quick">
                  <Link href="/boshqaruv/yangiliklar/yangi" prefetch={false}>
                    <span className="stat__ic ic-green">
                      <Icon name="news" size={18} />
                    </span>
                    Yangilik qöşiş
                  </Link>
                  <Link href="/admin/collections/events/create" prefetch={false}>
                    <span className="stat__ic ic-blue">
                      <Icon name="calendar" size={18} />
                    </span>
                    Tadbir eʼlon qiliş
                  </Link>
                  <Link href="/admin/collections/grants/create" prefetch={false}>
                    <span className="stat__ic ic-yellow">
                      <Icon name="star" size={18} />
                    </span>
                    Grant qöşiş
                  </Link>
                  <Link href="/admin/collections/kengash-docs/create" prefetch={false}>
                    <span className="stat__ic ic-orange">
                      <Icon name="upload" size={18} />
                    </span>
                    Hujjat yuklaş
                  </Link>
                </div>
              </section>

              <section className="card">
                <div className="card__head">
                  <h2>Qoralamalar</h2>
                  {ct.drafts > 0 && (
                    <Link className="more" href="/boshqaruv/yangiliklar?holat=draft" prefetch={false}>
                      Barçasi
                      <Icon name="chev" size={16} />
                    </Link>
                  )}
                </div>
                {ct.draftList.length === 0 ? (
                  <p className="empty">Tugallanmagan qoralama yöq</p>
                ) : (
                  <ul className="list">
                    {ct.draftList.map((n) => (
                      <li key={n.id}>
                        <Link className="news" href={`/boshqaruv/yangiliklar/${n.id}`} prefetch={false}>
                          {thumb(n.image) ? <img src={thumb(n.image)!} alt="" loading="lazy" /> : <span className="ph" />}
                          <div>
                            <b>{n.title || 'Sarlavhasiz qoralama'}</b>
                            <small>Oxirgi tahrir: {qisqaVaqt(n.updatedAt)}</small>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="card">
                <div className="card__head">
                  <h2>Oxirgi özgarişlar</h2>
                </div>
                <ul className="log">
                  {ct.changed.map((n) => (
                    <li key={n.id}>
                      <div>
                        <p>
                          {n._status === 'draft' ? 'Qoralama saqlandi' : n.createdAt === n.updatedAt ? 'Yangilik eʼlon qilindi' : 'Yangilik tahrirlandi'}:{' '}
                          <b>{n.title}</b>
                        </p>
                        <small>{qisqaVaqt(n.updatedAt)}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
