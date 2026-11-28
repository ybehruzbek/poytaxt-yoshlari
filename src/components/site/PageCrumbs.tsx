import Link from 'next/link'

import { findNav } from '@/config/nav'
import { breadcrumbLd } from '@/lib/seo'
import { JsonLd } from './JsonLd'

type Extra = { label: string; href?: string }

/**
 * QATʼIY QOIDA: yuqori menyudan oçiladigan har bir sahifaning boşida şu yöl kapsulasi turadi —
 * “Boş sahifa / {menyu guruhi} / {sahifa}”. Yöl config/nav.ts dagi menyudan quriladi.
 * `extra` — menyuda yöq içki daraja (masalan, yangilik sarlavhasi).
 */
export function PageCrumbs({
  locale,
  path,
  extra = [],
}: {
  locale: string
  path: string
  extra?: Extra[]
}) {
  const L = (h: string) => `/${locale}${h}`
  const { group, trail } = findNav(path)
  const items: Extra[] = [
    // guruhning özi sahifa bölsa (masalan, Yangiliklar) — guruh nomi takrorlanmaydi
    ...(group && !group.href ? [{ label: group.label }] : []),
    ...trail.map((t) => ({ label: t.label, href: t.href })),
    ...extra,
  ]
  // qidiruv tizimlari uçun: manzili bor bandlar va oxirgi (joriy) sahifa
  const ld = breadcrumbLd([
    { name: 'Bosh sahifa', url: L('') },
    ...items
      .map((it, i) => ({ name: it.label, url: it.href ? L(it.href) : undefined, last: i === items.length - 1 }))
      .filter((it) => it.url || it.last)
      .map(({ name, url }) => ({ name, url })),
  ])
  return (
    <div className="pg-crumbs">
      <JsonLd data={ld} />
      <nav className="crumbs" aria-label="Yo‘l">
        <Link href={L('')}>Bosh sahifa</Link>
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <span key={`${it.label}-${i}`} style={{ display: 'contents' }}>
              <span>/</span>
              {last ? (
                <span aria-current="page">{it.label}</span>
              ) : it.href ? (
                <Link href={L(it.href)}>{it.label}</Link>
              ) : (
                <span>{it.label}</span>
              )}
            </span>
          )
        })}
      </nav>
    </div>
  )
}
