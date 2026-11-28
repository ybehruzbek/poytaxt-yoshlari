'use server'

import type { File as FileDoc, Media } from '@/payload-types'

import { getPayloadClient, getUser } from './auth'

/** Kutubxona yozuvi: rasm (media) yoki yuklab olinadigan hujjat (files) */
export type MediaItem = { id: number; url: string; thumb: string; alt: string; w?: number | null; h?: number | null; name?: string; size?: string }
export type LibCol = 'media' | 'files'

const MAX = 10 * 1024 * 1024 // hujjatlar: 10 MB — server action çegarasi 11 MB (next.config.ts)
/** rasmlar brauzerda siqib yuboriladi (lib/boshqaruv/siqish.ts) — serverga 2 MB dan katta rasm kelmasligi kerak */
const RASM_MAX = 2 * 1024 * 1024
const TYPES: Record<LibCol, string[]> = {
  media: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic', 'image/heif'],
  files: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
}
const kb = (b?: number | null) => (!b ? '' : b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`)

const toItem = (m: Media): MediaItem => ({
  id: m.id,
  url: m.url ?? '',
  thumb: m.sizes?.thumb?.url ?? m.url ?? '',
  alt: m.alt ?? '',
  w: m.width,
  h: m.height,
})
const fileItem = (f: FileDoc): MediaItem => ({ id: f.id, url: f.url ?? '', thumb: '', alt: f.title ?? '', name: f.filename ?? '', size: kb(f.filesize) })

const canEdit = (role?: string) => role === 'admin' || role === 'muharrir'

/** Kutubxona: oxirgi yuklanganlar; rasm — tavsif (alt), hujjat — nomi böyiça qidiruv */
export async function searchMedia(qIn: unknown, pageIn: unknown = 1, colIn: unknown = 'media'): Promise<{ items: MediaItem[]; hasMore: boolean }> {
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { items: [], hasMore: false }
  // server action argumentlari brauzerdan keladi — TS turiga işonilmaydi: faqat ruxsat etilgan ikki töplam
  const col: LibCol = colIn === 'files' ? 'files' : 'media'
  const q = typeof qIn === 'string' ? qIn.trim().slice(0, 200) : ''
  const page = Math.min(1000, Math.max(1, Math.floor(Number(pageIn)) || 1))
  const payload = await getPayloadClient()
  const key = col === 'files' ? 'title' : 'alt'
  const r = await payload.find({
    collection: col,
    where: q ? { [key]: { like: q } } : {},
    sort: '-createdAt',
    limit: 30,
    page,
    depth: 0,
    locale: 'uz',
    user,
    overrideAccess: false, // Payload'ning öz ruxsatlari ham tekşiradi
  })
  return { items: col === 'files' ? (r.docs as FileDoc[]).map(fileItem) : (r.docs as Media[]).map(toItem), hasMore: r.hasNextPage }
}

/**
 * Fayl yuklaş. `col` — media (rasm) yoki files (hujjat). Tavsif/nom majburiy — berilmasa, fayl nomidan olinadi;
 * imlo hook'i uni yangi alifboga ötkazadi.
 */
export async function uploadMedia(fd: FormData): Promise<{ ok: true; item: MediaItem } | { ok: false; message: string }> {
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  const col: LibCol = fd.get('col') === 'files' ? 'files' : 'media'
  const file = fd.get('file')
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: 'Fayl tanlanmadi.' }
  if (file.size > MAX) return { ok: false, message: 'Fayl juda katta (10 MB dan oshmasin).' }
  if (col === 'media' && file.size > RASM_MAX)
    return { ok: false, message: 'Rasm juda katta (2 MB dan oshmasin). Boshqa formatda (JPG yoki PNG) saqlab qayta yuklang.' }
  if (!TYPES[col].includes(file.type))
    return { ok: false, message: col === 'files' ? 'Faqat PDF, Word yoki Excel fayl yuklash mumkin.' : 'Faqat rasm yuklash mumkin (JPG, PNG, WebP).' }
  const name = String(fd.get('alt') ?? '').trim() || file.name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ')
  const payload = await getPayloadClient()
  const upload = { data: Buffer.from(await file.arrayBuffer()), mimetype: file.type, name: file.name, size: file.size }
  try {
    if (col === 'files') {
      const doc = await payload.create({ collection: 'files', data: { title: name }, file: upload, locale: 'uz', user, overrideAccess: false })
      return { ok: true, item: fileItem(doc) }
    }
    const doc = await payload.create({ collection: 'media', data: { alt: name }, file: upload, locale: 'uz', user, overrideAccess: false })
    return { ok: true, item: toItem(doc) }
  } catch {
    return { ok: false, message: 'Faylni yuklab bo‘lmadi. Boshqa fayl bilan urinib ko‘ring.' }
  }
}
