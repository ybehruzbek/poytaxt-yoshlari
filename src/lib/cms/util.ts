/** Bazadan olingan maʼlumotni sayt komponentlari uçun qulay şaklga keltiriş */

export type Rel = number | { url?: string | null; sizes?: Record<string, { url?: string | null } | undefined> } | null | undefined

/** Media yozuvidan rasm manzili: kerakli ölçamdagi nusxa, bölmasa — asl fayl */
export function mediaUrl(m: Rel, size?: 'thumb' | 'card' | 'hero'): string {
  if (!m || typeof m !== 'object') return ''
  return (size && m.sizes?.[size]?.url) || m.url || ''
}

/** Sana (ISO yoki Date) → 'YYYY-MM-DD' (Toşkent vaqti böyiça) */
export function iso(d: string | Date | null | undefined): string {
  if (!d) return ''
  const t = new Date(d)
  if (Number.isNaN(t.getTime())) return String(d).slice(0, 10)
  return new Date(t.getTime() + 5 * 3600_000).toISOString().slice(0, 10)
}
