'use server'

import type { Media } from '@/payload-types'

import { getPayloadClient, getUser } from './auth'

export type MediaItem = { id: number; url: string; thumb: string; alt: string; w?: number | null; h?: number | null }

const MAX = 10 * 1024 * 1024 // 10 MB — server action çegarasi 11 MB (next.config.ts); server rasmni 2000 px gaça kiçraytiradi
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic', 'image/heif']

const toItem = (m: Media): MediaItem => ({
  id: m.id,
  url: m.url ?? '',
  thumb: m.sizes?.thumb?.url ?? m.url ?? '',
  alt: m.alt ?? '',
  w: m.width,
  h: m.height,
})

const canEdit = (role?: string) => role === 'admin' || role === 'muharrir'

/** Rasm kutubxonasi: oxirgi yuklanganlar, tavsif (alt) böyiça qidiruv */
export async function searchMedia(q: string, page = 1): Promise<{ items: MediaItem[]; hasMore: boolean }> {
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { items: [], hasMore: false }
  const payload = await getPayloadClient()
  const r = await payload.find({
    collection: 'media',
    where: q.trim() ? { alt: { like: q.trim() } } : {},
    sort: '-createdAt',
    limit: 30,
    page,
    depth: 0,
    locale: 'uz',
    overrideAccess: true,
  })
  return { items: r.docs.map(toItem), hasMore: r.hasNextPage }
}

/** Rasm yuklaş. Tavsif (alt) majburiy — berilmasa, fayl nomidan olinadi; imlo hook'i uni yangi alifboga ötkazadi */
export async function uploadMedia(fd: FormData): Promise<{ ok: true; item: MediaItem } | { ok: false; message: string }> {
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const file = fd.get('file')
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: 'Fayl tanlanmadi.' }
  if (file.size > MAX) return { ok: false, message: 'Fayl juda katta (10 MB dan oşmasin).' }
  if (!TYPES.includes(file.type)) return { ok: false, message: 'Faqat rasm yuklaş mumkin (JPG, PNG, WebP).' }
  const alt = String(fd.get('alt') ?? '').trim() || file.name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ')
  const payload = await getPayloadClient()
  try {
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: Buffer.from(await file.arrayBuffer()), mimetype: file.type, name: file.name, size: file.size },
      locale: 'uz',
      user,
      overrideAccess: false,
    })
    return { ok: true, item: toItem(doc) }
  } catch {
    return { ok: false, message: 'Rasmni yuklab bölmadi. Boşqa fayl bilan urinib köring.' }
  }
}
