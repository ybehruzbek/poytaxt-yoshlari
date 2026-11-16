import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Album, Short, Video } from '@/components/axborot/data'
import type { MediaItem } from '@/components/axborot/oav'
import type { PressItem } from '@/components/axborot/press'

import { iso, mediaUrl, type Rel } from './util'

/** Axborot xizmati bazadan: fotoalbomlar, video arxivi, press-relizlar, OAV materiallari */
type Doc = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')

async function list(collection: string, locale: string, sort: string, depth = 1, where?: Record<string, unknown>) {
  const payload = await getPayload({ config })
  const r = await payload.find({
    collection: collection as 'albums',
    locale: locale as 'uz',
    fallbackLocale: 'uz',
    sort,
    depth,
    pagination: false,
    overrideAccess: false,
    ...(where ? { where: where as never } : {}),
  })
  return r.docs as unknown as Doc[]
}

const albumOf = (a: Doc): Album => {
  const photos = ((a.photos as Rel[]) ?? []).map((p) => mediaUrl(p)).filter(Boolean)
  return {
    id: Number(a.post ?? a.id),
    title: str(a.title),
    date: iso(a.date as string),
    type: a.type as Album['type'],
    place: str(a.place),
    n: photos.length,
    photos,
  }
}

export const getAlbums = cache(async (locale = 'uz'): Promise<Album[]> => (await list('albums', locale, '-date')).map(albumOf))

export const getVideoArchive = cache(async (locale = 'uz'): Promise<{ videos: Video[]; shorts: Short[] }> => {
  const docs = await list('videos', locale, '-date', 0)
  return {
    videos: docs
      .filter((v) => !v.short)
      .map((v) => ({
        id: str(v.youtubeId),
        title: str(v.title),
        date: iso(v.date as string),
        ...(v.sec ? { sec: Number(v.sec) } : {}),
        ...(v.type ? { type: v.type as Video['type'] } : {}),
        ...(v.series ? { series: str(v.series) } : {}),
      })),
    shorts: docs.filter((v) => v.short).map((v) => ({ id: str(v.youtubeId), title: str(v.title) })),
  }
})

export const getPress = cache(async (locale = 'uz'): Promise<PressItem[]> =>
  (await list('press', locale, '-date', 1, { _status: { equals: 'published' } })).map((p) => {
    const ev = p.event as { when?: string; time?: string; place?: string } | null
    const album = p.album as Doc | null
    const video = p.video as Doc | null
    return {
      slug: str(p.slug),
      kind: p.kind as PressItem['kind'],
      date: iso(p.date as string),
      title: str(p.title),
      lead: str(p.lead),
      body: ((p.body as { t?: string }[]) ?? []).map((x) => x.t ?? '').filter(Boolean),
      ...(((p.facts as unknown[]) ?? []).length ? { facts: (p.facts as { v?: string; k?: string }[]).map((f) => ({ v: f.v ?? '', k: f.k ?? '' })) } : {}),
      ...(ev?.when && ev?.place ? { event: { when: ev.when, ...(ev.time ? { time: ev.time } : {}), place: ev.place } } : {}),
      ...(album ? { album: Number(album.post ?? album.id) } : {}),
      ...(video ? { video: str(video.youtubeId) } : {}),
    }
  }),
)

export const getOav = cache(async (locale = 'uz'): Promise<MediaItem[]> =>
  (await list('oav', locale, '-date', 0)).map((m) => ({
    outlet: str(m.outlet),
    domain: str(m.domain),
    kind: m.kind as MediaItem['kind'],
    lang: (m.lang === 'ru' ? 'ru' : 'uz') as MediaItem['lang'],
    title: str(m.title),
    date: iso(m.date as string),
    url: str(m.url),
    sum: str(m.sum),
  })),
)
