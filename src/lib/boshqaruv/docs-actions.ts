'use server'

import { revalidatePath } from 'next/cache'
import { ValidationError } from 'payload'

import { getPayloadClient, getUser } from './auth'
import { collectionSchema, globalSchema, toSaveData } from './schema'

export type DocSaveResult =
  | { ok: true; id: number | null; status: 'draft' | 'published' | null; updatedAt: string }
  | { ok: false; message: string; fields?: Record<string, string> }

const canEdit = (role?: string) => role === 'admin' || role === 'muharrir'

function fromError(e: unknown): DocSaveResult {
  if (e instanceof ValidationError) {
    const fields: Record<string, string> = {}
    for (const er of e.data.errors) fields[er.path] = er.message
    return { ok: false, message: `${Object.keys(fields).length} ta maydonni tekşiring`, fields }
  }
  const msg = e instanceof Error ? e.message : ''
  if (/unique|duplicate|already/i.test(msg)) return { ok: false, message: 'Bunday qiymat allaqaçon bor (masalan, sahifa manzili). Boşqasini yozing.' }
  return { ok: false, message: 'Saqlab bölmadi. Birozdan keyin qayta urinib köring.' }
}

/**
 * Universal saqlaş: faqat sxemadagi maydonlar yuboriladi, Payload ruxsatlari, tekşiruvlari va imlo hook'lari işlaydi.
 * Qoralamali bölimlarda `draft` — saytga çiqmaydi, `publish` — çiqadi.
 */
export async function saveDoc(slug: string, id: number | null, values: Record<string, unknown>, mode: 'draft' | 'publish'): Promise<DocSaveResult> {
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const schema = await collectionSchema(slug)
  if (!schema) return { ok: false, message: 'Bunday bölim yöq.' }
  const payload = await getPayloadClient()
  const data = { ...toSaveData(schema.fields, values), ...(schema.drafts ? { _status: mode === 'publish' ? 'published' : 'draft' } : {}) }
  const draft = schema.drafts && mode === 'draft'
  try {
    const doc = (id
      ? await payload.update({ collection: slug as never, id, data: data as never, draft, locale: 'uz', user, overrideAccess: false })
      : await payload.create({ collection: slug as never, data: data as never, draft, locale: 'uz', user, overrideAccess: false })) as unknown as { id: number; updatedAt: string; _status?: 'draft' | 'published' }
    revalidatePath(`/boshqaruv/bolim/${slug}`, 'layout')
    return { ok: true, id: doc.id, status: schema.drafts ? (doc._status ?? 'draft') : null, updatedAt: doc.updatedAt }
  } catch (e) {
    return fromError(e)
  }
}

export async function saveGlobalDoc(slug: string, values: Record<string, unknown>, mode: 'draft' | 'publish'): Promise<DocSaveResult> {
  const user = await getUser()
  if (!user || !canEdit(user.role)) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const schema = await globalSchema(slug)
  if (!schema) return { ok: false, message: 'Bunday sahifa yöq.' }
  const payload = await getPayloadClient()
  const data = { ...toSaveData(schema.fields, values), ...(schema.drafts ? { _status: mode === 'publish' ? 'published' : 'draft' } : {}) }
  try {
    const doc = (await payload.updateGlobal({ slug: slug as never, data: data as never, draft: schema.drafts && mode === 'draft', locale: 'uz', user, overrideAccess: false })) as unknown as { updatedAt: string; _status?: 'draft' | 'published' }
    revalidatePath(`/boshqaruv/sahifa/${slug}`)
    return { ok: true, id: null, status: schema.drafts ? (doc._status ?? 'draft') : null, updatedAt: doc.updatedAt }
  } catch (e) {
    return fromError(e)
  }
}

/** Öçiriş — faqat administrator */
export async function deleteDoc(slug: string, id: number): Promise<{ ok: boolean; message: string }> {
  const user = await getUser()
  if (!user || user.role !== 'admin') return { ok: false, message: 'Öçiriş faqat administratorga ruxsat etilgan.' }
  if (!(await collectionSchema(slug))) return { ok: false, message: 'Bunday bölim yöq.' }
  const payload = await getPayloadClient()
  try {
    await payload.delete({ collection: slug as never, id, user, overrideAccess: false })
    revalidatePath(`/boshqaruv/bolim/${slug}`, 'layout')
    return { ok: true, message: 'Öçirildi' }
  } catch (e) {
    const m = e instanceof Error ? e.message : ''
    return { ok: false, message: /foreign|reference|constraint/i.test(m) ? 'Bu yozuvga boşqa bölimlar boğlangan — avval ulardan olib taşlang.' : 'Öçirib bölmadi.' }
  }
}
