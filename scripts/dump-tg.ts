import { writeFileSync } from 'fs'
import { fetchSince } from '../src/lib/tg/channel'

const out = process.env.OUT ?? 'posts.json'
const since = process.env.SINCE ?? '2026-01-01'
const posts = await fetchSince(since, 400)
writeFileSync(out, JSON.stringify(posts.map((p) => ({ tgId: p.id, date: p.date.slice(0, 10), photos: p.photos.length, video: p.videoThumbs.length > 0, forwardedFrom: p.forwardedFrom, text: p.text })), null, 1))
console.log('postlar:', posts.length)
