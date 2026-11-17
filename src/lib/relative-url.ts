import type { CollectionAfterReadHook } from 'payload'

/** “http://domen/api/media/file/x.webp” → “/api/media/file/x.webp” */
const rel = (u: unknown) => (typeof u === 'string' ? u.replace(/^https?:\/\/[^/]+(?=\/)/, '') : u)

/**
 * Yuklangan fayl manzillari nisbiy beriladi: oldindan yiğilgan sahifalarga yiğiş paytidagi domen
 * (masalan, localhost) yozilib qolmaydi — sayt qaysi domenda oçilsa, rasmlar öşa domendan yuklanadi.
 */
export const relativeUrls: CollectionAfterReadHook = ({ doc }) => {
  if (!doc || typeof doc !== 'object') return doc
  if ('url' in doc) doc.url = rel(doc.url)
  if ('thumbnailURL' in doc) doc.thumbnailURL = rel(doc.thumbnailURL)
  const sizes = (doc as { sizes?: Record<string, { url?: unknown } | null> }).sizes
  if (sizes) for (const s of Object.values(sizes)) if (s && 'url' in s) s.url = rel(s.url)
  return doc
}
