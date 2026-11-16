import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageCrumbs } from '@/components/site/PageCrumbs'
import { SiblingNav } from '@/components/site/SiblingNav'
import { NAV, findNav } from '@/config/nav'
import type { Locale } from '@/i18n/config'

type Props = { params: Promise<{ locale: Locale; slug: string[] }> }

/** Özining alohida sahifasi bor yöllar (bu umumiy sahifa ularni yasamaydi) */
const OWN_PAGES = new Set(['/biz-haqimizda/ittifoq', '/biz-haqimizda/markaziy-kengash', '/biz-haqimizda/hududiy-kengash', '/hujjatlar/normativ', '/hujjatlar/kengash', '/hujjatlar/namunalar', '/biz-haqimizda/boshlangich-tashkilotlar',
  '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim',
  '/biz-haqimizda/hamkorlar',
  '/biz-haqimizda/boshlangich-tashkilotlar/harbiy',
  '/faoliyat/yonalishlar',
  '/faoliyat/loyihalar',
  '/faoliyat/tadbirlar',
  '/faoliyat/elonlar',
  '/faoliyat/natijalar',
  '/boglanish/aloqa',
  '/boglanish/murojaat',
  '/boglanish/savollar',
  '/boglanish/azo-bolish',
  '/axborot-xizmati/fotogalereya',
  '/axborot-xizmati/videogalereya',
  '/axborot-xizmati/press-relizlar',
  '/axborot-xizmati/oav',
  '/yangiliklar',
])

/** Menyudagi barcha yo'llar oldindan tayyorlanadi */
export function generateStaticParams() {
  const paths = NAV.flatMap((g) => (g.href ? [g.href] : (g.items ?? []).flatMap((i) => [i.href, ...(i.children ?? []).map((c) => c.href)])))
  return paths.filter((p) => !OWN_PAGES.has(p)).map((p) => ({ slug: p.split('/').filter(Boolean) }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const { trail } = findNav('/' + slug.join('/'))
  const page = trail[trail.length - 1]
  return { title: page ? `${page.label} — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi` : undefined }
}

/**
 * VAQTINCHA umumiy sahifa: menyudagi özining sahifasi hali yöq bölimlar uçun yöl, sarlavha va
 * “Bölim tayyorlanmoqda” xabari (H1 ostida izoh matni berilmaydi — qoida).
 * Sahifa boşi boşqa sahifalardagi kabi: .pg-head + PageCrumbs + h1.pg-title.
 */
export default async function SectionPage(props: Props) {
  const { locale, slug } = await props.params
  const path = '/' + slug.join('/')
  const { group, trail } = findNav(path)
  if (!group || trail.length === 0) notFound()

  const page = trail[trail.length - 1]

  return (
    <>
      <header className="pg-head">
        <div className="wrap">
          <PageCrumbs locale={locale} path={path} />
          <h1 className="h2 pg-title">{page.label}</h1>
        </div>
      </header>

      <section className="sec">
        <div className="wrap ph-body">
          <div className="ph-empty" role="status">
            <p className="ph-empty-h">Bölim tayyorlanmoqda</p>
            <p>Bölim maʼlumotlari keyinroq joylaştiriladi.</p>
          </div>
          <SiblingNav locale={locale} path={path} />
        </div>
      </section>
    </>
  )
}
