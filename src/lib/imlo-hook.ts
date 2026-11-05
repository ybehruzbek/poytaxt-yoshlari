import type { FieldHook } from 'payload'

import { toYangiAlifbo } from './alifbo'

/**
 * Admin paneldan saqlanadigan o'zbekcha matn avtomatik yangi alifboga o'tkaziladi
 * (muharrir eski yozuvda yoki ' / ’ bilan yozsa ham bazaga to'g'ri imlo tushadi).
 * Faqat "uz" tilidagi qiymat o'zgaradi; ruscha va inglizcha matnga tegilmaydi.
 * Fuqarolar murojaatlari (Appeals) ataylab o'zgartirilmaydi — ular asl holida saqlanadi.
 */
const isUz = (locale: string | undefined | null) => !locale || locale === 'uz'

/** Lexical JSON: faqat "text" tugunlaridagi matn o'giriladi (havolalar va boshqa maydonlarga tegilmaydi) */
function walk(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(walk)
  if (!node || typeof node !== 'object') return node
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(node)) out[k] = v
  if (out.type === 'text' && typeof out.text === 'string') out.text = toYangiAlifbo(out.text)
  if ('children' in out) out.children = walk(out.children)
  if ('root' in out) out.root = walk(out.root)
  return out
}

const each = (value: unknown, locale: string | undefined, fn: (v: unknown) => unknown) => {
  // locale=all bo'lsa qiymat { uz, ru, en } ko'rinishida keladi
  if (locale === 'all' && value && typeof value === 'object' && !Array.isArray(value) && 'uz' in value) {
    return { ...(value as Record<string, unknown>), uz: fn((value as Record<string, unknown>).uz) }
  }
  return isUz(locale) ? fn(value) : value
}

/** text / textarea maydonlari uchun */
export const imloMatn: FieldHook = ({ value, req }) =>
  each(value, req.locale, (v) => (typeof v === 'string' ? toYangiAlifbo(v) : v))

/** richText (Lexical) maydonlari uchun */
export const imloRichText: FieldHook = ({ value, req }) => each(value, req.locale, (v) => (v ? walk(v) : v))
