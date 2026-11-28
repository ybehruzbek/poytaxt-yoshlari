/* eslint-disable @next/next/no-img-element -- admin röyxatidagi kiçik rasm */
import type { DefaultServerCellComponentProps } from 'payload'

type M = { url?: string | null; alt?: string | null; sizes?: { thumb?: { url?: string | null } } }

/** Röyxatdagi rasm ustuni: rasm nomi örniga kiçik surat (galereyada — birinçi surat). Röyxatga faqat ID keladi */
export async function ThumbCell({ cellData, payload }: DefaultServerCellComponentProps) {
  let m = (Array.isArray(cellData) ? cellData[0] : cellData) as M | number | string | null | undefined
  if (m && typeof m !== 'object') {
    m = (await payload.findByID({ collection: 'media', id: m, depth: 0, disableErrors: true })) as M | null
  }
  const src = m && typeof m === 'object' ? (m.sizes?.thumb?.url ?? m.url) : null
  if (!src) return <span className="adm-thumb adm-thumb--none" aria-label="Rasm yo‘q" />
  return <img className="adm-thumb" src={src} alt={(typeof m === 'object' && m?.alt) || ''} loading="lazy" />
}
