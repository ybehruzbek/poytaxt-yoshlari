import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@payload-config'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { toYnItems } from '@/components/yangiliklar/data'
import { YangiliklarPage } from '@/components/yangiliklar/YangiliklarPage'
import type { Locale } from '@/i18n/config'
import { toJoriyAlifbo } from '@/lib/alifbo'
import type { News } from '@/payload-types'
import { NEWS_CARD_SELECT, NEWS_ONLY, toNewsCard } from '@/lib/news'
import { ichkiMeta } from '@/lib/seo'

import '../../../../yangiliklar.css'

export const revalidate = 60

/** Teg sahifalari birinçi oçilişda tayyorlanib keşga olinadi (har 60 soniyada fonda yangilanadi) */
export function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ locale: Locale; teg: string }> }

/** Next.js parametrni özi dekodlaydi; eski havolalar uçun xavfsiz qayta dekodlaş */
const tagOf = (raw: string) => {
  let s = raw
  try {
    s = decodeURIComponent(raw)
  } catch {
    /* notöğri kodlaş — qanday bölsa şunday */
  }
  return s.trim().slice(0, 80)
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { teg } = await props.params
  return ichkiMeta({ title: `#${tagOf(teg)} — Yangiliklar`, path: `/uz/yangiliklar/teg/${teg}` })
}

/** Teg böyiça yangiliklar: /yangiliklar/teg/Kitobxonlik */
export default async function TagRoute(props: Props) {
  const { locale, teg } = await props.params
  const tag = tagOf(teg)
  if (!tag) notFound()
  // teglar joriy alifboda (2026-11-28): eski yangi alifbodagi havola (teg/Yoşlar) → teg/Yoshlar
  const joriy = toJoriyAlifbo(tag)
  if (joriy !== tag) permanentRedirect(`/${locale}/yangiliklar/teg/${encodeURIComponent(joriy)}`)
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    limit: 600,
    select: NEWS_CARD_SELECT,
    sort: '-publishedAt',
    depth: 1,
    where: { and: [{ _status: { equals: 'published' } }, { tags: { contains: tag } }, NEWS_ONLY] },
  })
  // yangiligi yo'q teg — bo'sh sahifa emas, 404 (qidiruv tizimlari bo'sh sahifani past baholaydi)
  if (!res.docs.length) notFound()
  return (
    <YangiliklarPage
      items={toYnItems(res.docs.map((d) => toNewsCard(d as News)))}
      locale={locale}
      title={`#${tag}`}
      crumbs={<PageCrumbs locale={locale} path="/yangiliklar" extra={[{ label: `#${tag}` }]} />}
    />
  )
}
