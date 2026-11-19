'use server'

import { revalidatePath } from 'next/cache'
import { ValidationError } from 'payload'

import type { News } from '@/payload-types'

import { getPayloadClient, getUser } from './auth'
import { ids as toIds, isId } from './guard'

/** Shakldan keladigan maʼlumot (faqat uz tili; ruşça/inglizça tarjima keyinroq) */
export type NewsInput = {
  title: string
  slug: string
  generateSlug: boolean
  category: News['category']
  kind: News['kind']
  publishedAt: string
  eventDate: string | null
  eventPlace: string
  image: number | null
  imageCaption: string
  excerpt: string
  content: News['content']
  gallery: number[]
  author: number | null
  tags: string[]
  source: string
}

export type SaveResult =
  | { ok: true; id: number; status: 'draft' | 'published'; updatedAt: string }
  | { ok: false; message: string; fields?: Record<string, string> }

const LABELS: Record<string, string> = {
  title: 'Sarlavha',
  slug: 'Sahifa manzili',
  excerpt: 'Qisqa matn',
  image: 'Asosiy rasm',
  publishedAt: 'Sana',
  source: 'Manba havolasi',
  category: 'Turkum',
  kind: 'Turi',
}

const canEdit = (role?: string) => role === 'admin' || role === 'muharrir'

function fromError(e: unknown): SaveResult {
  if (e instanceof ValidationError) {
    const fields: Record<string, string> = {}
    for (const er of e.data.errors) fields[er.path] = er.message
    const names = Object.keys(fields).map((k) => LABELS[k] ?? k)
    return { ok: false, message: `Tekşiring: ${names.join(', ')}`, fields }
  }
  const msg = e instanceof Error ? e.message : ''
  if (/unique|duplicate|already/i.test(msg)) return { ok: false, message: 'Bunday sahifa manzili band. Boşqa manzil yozing.', fields: { slug: 'Band' } }
  return { ok: false, message: 'Saqlab bölmadi. Birozdan keyin qayta urinib köring.' }
}

/**
 * Saqlaş: `draft` — qoralama (saytda körinmaydi, eʼlon qilingan nusxa özgarmaydi), `publish` — saytga çiqadi.
 * Payload'ning ruxsatlari, imlo hook'lari va versiyalar tarixi işlaydi (user bilan, overrideAccess: false).
 */
export async function saveNews(id: number | null, input: NewsInput, mode: 'draft' | 'publish'): Promise<SaveResult> {
  if ((id !== null && !isId(id)) || !input || typeof input !== 'object') return { ok: false, message: 'Notöğri söröv.' }
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const payload = await getPayloadClient()

  const data = {
    title: input.title.trim(),
    generateSlug: input.generateSlug,
    ...(input.generateSlug ? {} : { slug: input.slug.trim() }),
    category: input.category,
    kind: input.kind,
    publishedAt: input.publishedAt,
    eventDate: input.kind === 'tadbir' ? input.eventDate : null,
    eventPlace: input.kind === 'tadbir' ? input.eventPlace.trim() : null,
    image: input.image ?? undefined,
    imageCaption: input.imageCaption.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content,
    gallery: input.gallery,
    author: input.author,
    tags: input.tags.map((t) => t.trim()).filter(Boolean),
    source: input.source.trim() || null,
    _status: mode === 'publish' ? ('published' as const) : ('draft' as const),
  }

  try {
    const doc = id
      ? await payload.update({ collection: 'news', id, data, draft: mode === 'draft', locale: 'uz', user, overrideAccess: false })
      : await payload.create({ collection: 'news', data: data as never, draft: mode === 'draft', locale: 'uz', user, overrideAccess: false })
    revalidatePath('/boshqaruv/yangiliklar')
    revalidatePath('/boshqaruv')
    return { ok: true, id: doc.id, status: doc._status ?? 'draft', updatedAt: doc.updatedAt }
  } catch (e) {
    return fromError(e)
  }
}

/** Saytdan oliş: eʼlon qilingan yangilik qoralamaga qaytadi */
export async function unpublishNews(idsIn: number[]): Promise<{ ok: boolean; message: string }> {
  const ids = toIds(idsIn)
  if (!ids.length) return { ok: false, message: 'Heç narsa tanlanmagan.' }
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const payload = await getPayloadClient()
  let n = 0
  for (const id of ids) {
    try {
      await payload.update({ collection: 'news', id, data: { _status: 'draft' }, locale: 'uz', user, overrideAccess: false })
      n++
    } catch {}
  }
  revalidatePath('/boshqaruv/yangiliklar')
  revalidatePath('/boshqaruv')
  return { ok: n === ids.length, message: `${n} ta yangilik saytdan olindi` }
}

/** Eʼlon qiliş (röyxatdan bir neçtasini birdan) */
export async function publishNews(idsIn: number[]): Promise<{ ok: boolean; message: string }> {
  const ids = toIds(idsIn)
  if (!ids.length) return { ok: false, message: 'Heç narsa tanlanmagan.' }
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const payload = await getPayloadClient()
  let n = 0
  for (const id of ids) {
    try {
      await payload.update({ collection: 'news', id, data: { _status: 'published' }, locale: 'uz', user, overrideAccess: false })
      n++
    } catch {}
  }
  revalidatePath('/boshqaruv/yangiliklar')
  revalidatePath('/boshqaruv')
  return { ok: n === ids.length, message: n === ids.length ? `${n} ta yangilik eʼlon qilindi` : `${n} / ${ids.length} ta eʼlon qilindi — qolganlarida majburiy maydon töldirilmagan` }
}

/** Öçiriş — faqat administrator (Payload ruxsati ham şuni talab qiladi) */
export async function deleteNews(idsIn: number[]): Promise<{ ok: boolean; message: string }> {
  const ids = toIds(idsIn)
  if (!ids.length) return { ok: false, message: 'Heç narsa tanlanmagan.' }
  const user = await getUser()
  if (!user || user.role !== 'admin') return { ok: false, message: 'Öçiriş faqat administratorga ruxsat etilgan.' }
  const payload = await getPayloadClient()
  let n = 0
  for (const id of ids) {
    try {
      await payload.delete({ collection: 'news', id, user, overrideAccess: false })
      n++
    } catch {}
  }
  revalidatePath('/boshqaruv/yangiliklar')
  revalidatePath('/boshqaruv')
  return { ok: n === ids.length, message: `${n} ta yangilik öçirildi` }
}
