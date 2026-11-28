import Link from 'next/link'
import type { Payload } from 'payload'

type Props = { payload: Payload; user?: { name?: string | null; role?: string | null } | null }

/** Kutib turgan arizalar soni (holati “yangi”) — xato bölsa 0 */
async function pending(payload: Payload, collection: 'appeals' | 'memberships' | 'volunteers') {
  try {
    const r = await payload.count({ collection, where: { status: { equals: 'yangi' } }, overrideAccess: true })
    return r.totalDocs
  } catch {
    return 0
  }
}

/**
 * Boşqaruv paneli tepasidagi blok (sayt uslubida): Kengaş nomi, körib çiqilmagan murojaat va arizalar soni,
 * tezkor havolalar. Payload `beforeDashboard` orqali ulanadi.
 */
export async function AdminWelcome({ payload, user }: Props) {
  const [appeals, members, volunteers, news] = await Promise.all([
    pending(payload, 'appeals'),
    pending(payload, 'memberships'),
    pending(payload, 'volunteers'),
    payload.count({ collection: 'news', overrideAccess: true }).then((r) => r.totalDocs).catch(() => 0),
  ])
  // murojaat va arizalar sonini faqat ular bilan işlaydigan xodimlar köradi (muharrir — faqat yangiliklar)
  const staff = user?.role === 'admin' || user?.role === 'operator'
  const all = [
    { n: appeals, t: 'Yangi murojaat', href: '/admin/collections/appeals' },
    { n: members, t: 'Yangi a’zolik arizasi', href: '/admin/collections/memberships' },
    { n: volunteers, t: 'Yangi volontyorlik arizasi', href: '/admin/collections/volunteers' },
    { n: news, t: 'Yangilik saytda', href: '/admin/collections/news' },
  ]
  const stats = staff ? all : all.slice(3)
  return (
    <section className="adm-welcome">
      <div className="adm-welcome__head">
        <div>
          <p className="adm-welcome__kicker">Boshqaruv paneli</p>
          <h1 className="adm-welcome__title">
            {user?.name ? `Xush kelibsiz, ${user.name}` : 'Xush kelibsiz'}
          </h1>
          <p className="adm-welcome__org">O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi rasmiy veb-sayti</p>
        </div>
        <div className="adm-welcome__actions">
          <Link className="adm-welcome__btn adm-welcome__btn--main" href="/admin/collections/news/create">
            Yangilik qo‘shish
          </Link>
          <Link className="adm-welcome__btn" href="/boshqaruv">
            Yangi panelga o‘tish
          </Link>
          <a className="adm-welcome__btn" href="/uz" target="_blank" rel="noopener noreferrer">
            Saytni ochish
          </a>
        </div>
      </div>
      <ul className="adm-welcome__stats">
        {stats.map((s) => (
          <li key={s.t}>
            <Link href={s.href} className={s.n > 0 && s.t.startsWith('Yangi') ? 'is-hot' : undefined}>
              <b>{s.n}</b>
              <span>{s.t}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
