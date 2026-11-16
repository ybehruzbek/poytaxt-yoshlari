/** Axborot xizmatini bazaga köçiradi: fotoalbomlar, videolar, press-relizlar, OAV. pnpm payload run scripts/seed/axborot.ts */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { ALBUMS, photo, SHORTS, VIDEOS } from '../../src/components/axborot/data'
import { MEDIA } from '../../src/components/axborot/oav'
import { PRESS } from '../../src/components/axborot/press'

import { kun, media, upsert } from './_lib'

const payload = await getPayload({ config })

const albumId = new Map<number, number>()
for (const a of ALBUMS) {
  const photos: number[] = []
  for (let i = 1; i <= a.n; i++) {
    const id = await media(payload, photo(a, i), `${a.title} — ${i}-surat`, 'Fotogalereya')
    if (id) photos.push(id)
  }
  const doc = await upsert(payload, 'albums', { post: { equals: a.id } }, { title: a.title, date: kun(a.date), type: a.type, place: a.place, photos, post: a.id })
  albumId.set(a.id, doc.id as number)
}
console.log('albomlar:', ALBUMS.length)

const videoId = new Map<string, number>()
for (const v of VIDEOS) {
  const doc = await upsert(payload, 'videos', { youtubeId: { equals: v.id } }, { title: v.title, youtubeId: v.id, date: kun(v.date), sec: v.sec ?? null, type: v.type ?? null, series: v.series ?? null, short: false })
  videoId.set(v.id, doc.id as number)
}
for (const s of SHORTS) await upsert(payload, 'videos', { youtubeId: { equals: s.id } }, { title: s.title, youtubeId: s.id, short: true })
console.log('videolar:', VIDEOS.length, 'shorts:', SHORTS.length)

for (const p of PRESS) {
  await upsert(payload, 'press', { slug: { equals: p.slug } }, {
    slug: p.slug, generateSlug: false, title: p.title, kind: p.kind, date: kun(p.date), lead: p.lead, body: p.body.map((t) => ({ t })),
    facts: p.facts ?? [], event: p.event ?? undefined, album: p.album ? albumId.get(p.album) ?? null : null, video: p.video ? videoId.get(p.video) ?? null : null,
    _status: 'published',
  })
}
console.log('press-relizlar:', PRESS.length)

for (const m of MEDIA) await upsert(payload, 'oav', { url: { equals: m.url } }, { ...m, date: kun(m.date) })
console.log('OAV:', MEDIA.length)
process.exit(0)
