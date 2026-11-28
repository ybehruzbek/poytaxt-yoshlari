import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Icon } from '@/components/boshqaruv/Icon'
import { SearchBox } from '@/components/boshqaruv/inbox/SearchBox'
import { LibDetail } from '@/components/boshqaruv/library/LibDetail'
import { LibUpload } from '@/components/boshqaruv/library/LibUpload'
import { Top } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { getLibItem, type LibKind, listLibrary, usageOf } from '@/lib/boshqaruv/library'

type SP = { tur?: string; q?: string; sahifa?: string; id?: string }

export const metadata = { title: 'Kutubxona' }

/** Rasmlar va yuklab olinadigan hujjatlar kutubxonasi: yuklaş, tavsifni tahrirlaş, qayerda işlatilganini köriş */
export default async function Kutubxona({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireUser()
  if (user.role === 'operator') redirect('/boshqaruv')
  const sp = await searchParams
  const kind: LibKind = sp.tur === 'fayl' ? 'files' : 'media'
  const id = Number(sp.id)
  const sel = Number.isInteger(id) && id > 0
  const [list, item, usage] = await Promise.all([listLibrary(kind, sp), sel ? getLibItem(kind, id) : null, sel ? usageOf(kind, id) : []])
  const href = (patch: Partial<SP>) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) q.set(k, v)
    const s = q.toString()
    return `/boshqaruv/kutubxona${s ? `?${s}` : ''}`
  }
  const isFile = kind === 'files'

  return (
    <>
      <Top title="Kutubxona" sub="Saytdagi barcha rasmlar va yuklab olinadigan hujjatlar" crumbs={[{ t: 'Tizim' }, { t: 'Kutubxona' }]} />
      <div className={item ? 'content lib has-item' : 'content lib'}>
        <section className="lib__main">
          <div className="toolbar">
            <nav className="seg" aria-label="Tur">
              <Link href="/boshqaruv/kutubxona" className={!isFile ? 'is-act' : undefined}>
                Rasmlar
              </Link>
              <Link href="/boshqaruv/kutubxona?tur=fayl" className={isFile ? 'is-act' : undefined}>
                Hujjat fayllari
              </Link>
            </nav>
            <div className="filters">
              <SearchBox q={sp.q ?? ''} placeholder={isFile ? 'Fayl nomi bo‘yicha qidirish' : 'Rasm tavsifi yoki fayl nomi bo‘yicha qidirish'} />
              <span className="count-note">Jami: {list.totalDocs}</span>
            </div>
          </div>
          <LibUpload kind={kind} />
          {list.items.length === 0 ? (
            <div className="card empty-state">
              <Icon name={isFile ? 'file' : 'image'} size={32} />
              <b>{sp.q ? 'Qidiruv bo‘yicha hech narsa topilmadi' : 'Hozircha fayl yo‘q'}</b>
            </div>
          ) : isFile ? (
            <ul className="lib__files">
              {list.items.map((f) => (
                <li key={f.id}>
                  <Link href={href({ id: String(f.id) })} className={f.id === id ? 'lib__file is-act' : 'lib__file'} scroll={false}>
                    <Icon name="file" size={22} />
                    <span>
                      <b>{f.alt || f.name}</b>
                      <small>
                        {f.name} · {f.size} · {f.when}
                      </small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="lib__grid">
              {list.items.map((m) => (
                <li key={m.id}>
                  <Link href={href({ id: String(m.id) })} className={m.id === id ? 'lib__cell is-act' : 'lib__cell'} scroll={false} title={m.alt}>
                    <img src={m.thumb} alt={m.alt} loading="lazy" />
                  </Link>
                </li>
              ))}
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
        {item && (
          <aside className="lib__side">
            <LibDetail key={`${kind}-${item.id}`} kind={kind} item={item} usage={usage} isAdmin={user.role === 'admin'} backHref={href({ id: undefined })} />
          </aside>
        )}
      </div>
    </>
  )
}
