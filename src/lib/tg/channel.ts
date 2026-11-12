/**
 * “Poytaxt yoşlari” Telegram kanalining oçiq veb-sahifasini (t.me/s/…) öqiydi — bot yoki token kerak emas.
 * Har bir post: raqami, sanasi, matni, suratlari (albom), video muqovalari, qayta joylanğan bölsa — manbasi.
 */
export const CHANNEL = 'poytaxtyoshlari_yi'
export const postUrl = (id: number) => `https://t.me/${CHANNEL}/${id}`

export type TgPost = {
  id: number
  date: string
  text: string
  photos: string[]
  videoThumbs: string[]
  forwardedFrom: string
}

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; ittifoq-sayt/1.0)' }

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')

/** Bitta sahifa (≈20 post). `before` — şu raqamdan oldingi postlar */
export async function fetchPage(before?: number): Promise<TgPost[]> {
  const url = `https://t.me/s/${CHANNEL}${before ? `?before=${before}` : ''}`
  const res = await fetch(url, { headers: UA, cache: 'no-store', signal: AbortSignal.timeout(30_000) })
  if (!res.ok) throw new Error(`Telegram ${res.status}`)
  const html = await res.text()
  const out: TgPost[] = []
  for (const p of html.split('<div class="tgme_widget_message_wrap').slice(1)) {
    const id = Number(p.match(/data-post="[^/]+\/(\d+)"/)?.[1])
    if (!id) continue
    const date = p.match(/datetime="([^"]+)"/)?.[1] ?? ''
    const photos = [...p.matchAll(/tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/g)].map((m) => m[1])
    const videoThumbs = [...p.matchAll(/tgme_widget_message_video_thumb[^>]*background-image:url\('([^']+)'\)/g)].map((m) => m[1])
    const fwd = p.match(/tgme_widget_message_forwarded_from_name[^>]*>([\s\S]*?)<\/(?:a|span)>/)?.[1] ?? ''
    const raw = p.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? ''
    const text = decode(
      raw
        .replace(/<br\s*\/?>/g, '\n')
        // havolalar: matn (manzil) — manzil matndan farq qilsa
        .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href: string, t: string) => {
          const label = t.replace(/<[^>]+>/g, '')
          return href.startsWith('http') && !label.includes(href.replace(/^https?:\/\//, '')) && !label.startsWith('#')
            ? `${label} (${href})`
            : label
        })
        .replace(/<[^>]+>/g, ''),
    ).trim()
    out.push({ id, date, text, photos, videoThumbs, forwardedFrom: decode(fwd.replace(/<[^>]+>/g, '')).trim() })
  }
  return out
}

/** Kanalni orqaga qarab öqiydi: `since` sanasidan yangi postlar (yoki `maxPages` gaça) */
export async function fetchSince(since: string, maxPages = 200): Promise<TgPost[]> {
  const all = new Map<number, TgPost>()
  let before: number | undefined
  for (let i = 0; i < maxPages; i++) {
    const page = await fetchPage(before)
    if (!page.length) break
    let old = false
    for (const p of page) {
      if (p.date && p.date < since) old = true
      else all.set(p.id, p)
    }
    before = Math.min(...page.map((p) => p.id))
    if (old) break
    await new Promise((r) => setTimeout(r, 400))
  }
  return [...all.values()].sort((a, b) => a.id - b.id)
}
