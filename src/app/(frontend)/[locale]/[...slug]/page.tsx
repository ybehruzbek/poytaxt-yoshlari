import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { NAV, findNav } from '@/config/nav'
import type { Locale } from '@/i18n/config'

type Props = { params: Promise<{ locale: Locale; slug: string[] }> }

/** Menyudagi barcha yo'llar oldindan tayyorlanadi */
export function generateStaticParams() {
  const paths = NAV.flatMap((g) => (g.href ? [g.href] : (g.items ?? []).flatMap((i) => [i.href, ...(i.children ?? []).map((c) => c.href)])))
  return paths.map((p) => ({ slug: p.split('/').filter(Boolean) }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const { trail } = findNav('/' + slug.join('/'))
  const page = trail[trail.length - 1]
  return { title: page ? `${page.label} — Yoshlar Ittifoqi Toshkent shahar hududiy kengashi` : undefined }
}

/**
 * VAQTINCHA umumiy sahifa: menyudagi har bir bo'lim uchun sarlavha va yo'l zanjiri.
 * Har bir bo'limning haqiqiy sahifasi (kontent admin paneldan) keyingi bosqichlarda yaratiladi.
 */
export default async function SectionPage(props: Props) {
  const { locale, slug } = await props.params
  const path = '/' + slug.join('/')
  const { group, trail } = findNav(path)
  if (!group || trail.length === 0) notFound()

  const page = trail[trail.length - 1]
  const L = (href: string) => `/${locale}${href}`
  const siblings = group.items ?? []

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Yo‘l">
            <Link href={L('')}>Bosh sahifa</Link>
            <span>/</span>
            <span>{group.label}</span>
            {trail.map((t, i) => (
              <span key={t.href} style={{ display: 'contents' }}>
                <span>/</span>
                {i === trail.length - 1 ? <span aria-current="page">{t.label}</span> : <Link href={L(t.href)}>{t.label}</Link>}
              </span>
            ))}
          </nav>
          <h1 className="h1">{page.label}</h1>
          {page.desc && <p className="lead">{page.desc}</p>}
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ display: 'grid', gap: 32 }}>
          <div style={{ background: 'var(--soft)', borderRadius: 32, padding: '28px 32px', maxWidth: 760 }}>
            <p style={{ fontFamily: 'var(--f-head)', fontWeight: 700, fontSize: 22, color: 'var(--navy)' }}>Sahifa tayyorlanmoqda</p>
            <p style={{ marginTop: 8, color: 'var(--muted)' }}>Bu bo‘lim mazmuni admin panel orqali kiritiladi.</p>
          </div>
          {siblings.length > 1 && (
            <div>
              <p style={{ fontFamily: 'var(--f-head)', fontWeight: 800, fontSize: 20, color: 'var(--navy)', marginBottom: 14 }}>{group.label} bo‘limida</p>
              <div className="tabs" style={{ marginBottom: 0 }}>
                {siblings.map((s) => (
                  <Link key={s.href} href={L(s.href)} className={`tab${s.href === path || trail[0]?.href === s.href ? ' on' : ''}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
