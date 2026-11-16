import type { Short, Video } from '@/components/axborot/data'
import { getVideoArchive } from '@/lib/cms/axborot'
import { toYangiAlifbo } from '@/lib/alifbo'

/**
 * Videogalereya — Kengaşning rasmiy YouTube kanali bilan sinxron.
 * Kanalning ommaviy RSS lentasi (kalit talab qilinmaydi) har 15 daqiqada tekşiriladi:
 * kanalga joylangan yangi video saytda özi paydo böladi, Shorts alohida ajratiladi.
 * Lenta faqat sönggi 15 ta videoni beradi — undan eskilari data.ts dagi arxivdan olinadi.
 */
export const YT_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCvXmtyBiwz4qCv-Z5hVcmLg'
const FEED = { code: 'https://www.youtube.com/feeds/videos.xml?channel_id=' }.code
export const REVALIDATE = 900

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

/** Sarlavha: yangi alifbo, qöştirnoq “…”, ortiqça bo‘şliqlarsiz */
const title = (s: string) => {
  let open = true
  // ruscha qöştirnoqlar kod nuqtasi orqali (imlo tekşiruvi matndagi «» ni taqiqlaydi)
  const q = decode(s).replace(/["\u00ab\u00bb\u201e]/g, (c) => {
    if (c === '\u00ab' || c === '\u201e') return '“'
    if (c === '\u00bb') return '”'
    const r = open ? '“' : '”'
    open = !open
    return r
  })
  return toYangiAlifbo(q.replace(/\s+/g, ' ').trim())
}

type Entry = { id: string; title: string; date: string; short: boolean }

async function readFeed(): Promise<Entry[]> {
  const res = await fetch(FEED + YT_CHANNEL_ID, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`YouTube RSS: ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '',
    title: title(e.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''),
    date: (e.match(/<published>([^<]+)<\/published>/)?.[1] ?? '').slice(0, 10),
    short: /youtube\.com\/shorts\//.test(e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? ''),
  }))
}

/** Kanal videolari va Shorts: avval lentadagilar (eng yangisi birinçi), keyin arxiv */
export async function getYoutubeFeed(): Promise<{ videos: Video[]; shorts: Short[] }> {
  let entries: Entry[] = []
  try {
    entries = (await readFeed()).filter((e) => e.id)
  } catch (err) {
    // YouTube vaqtinça javob bermasa — sahifa arxiv bilan oçiladi
    console.error(err)
  }
  // arxiv admin paneldan (Axborot xizmati → Videolar)
  const { videos: VIDEOS, shorts: SHORTS } = await getVideoArchive()
  const knownV = new Map(VIDEOS.map((v) => [v.id, v]))
  const knownS = new Map(SHORTS.map((s) => [s.id, s]))

  const videos: Video[] = entries
    .filter((e) => !e.short)
    // arxivda bor videoning tahrir qilingan nomi, turi va davomiyligi saqlanadi
    .map((e) => knownV.get(e.id) ?? { id: e.id, title: e.title, date: e.date })
  const shorts: Short[] = entries.filter((e) => e.short).map((e) => knownS.get(e.id) ?? { id: e.id, title: e.title })

  const seen = new Set([...videos, ...shorts].map((x) => x.id))
  return {
    videos: [...videos, ...VIDEOS.filter((v) => !seen.has(v.id))].sort((a, b) => b.date.localeCompare(a.date)),
    shorts: [...shorts, ...SHORTS.filter((s) => !seen.has(s.id))],
  }
}
