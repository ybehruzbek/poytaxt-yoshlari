/**
 * Seed (köçiriş) skriptlari uçun umumiy yordamçilar: kod içidagi maʼlumot va public/img rasmlarini bazaga yozadi.
 * Qayta işga tuşirilsa takrorlamaydi: rasm — fayl nomi, yozuv — kalit maydoni böyiça topiladi va yangilanadi.
 */
import fs from 'fs'
import path from 'path'
import type { CollectionSlug, Payload, Where } from 'payload'

import { toWebp } from '../../src/lib/tg/sync'

const PUBLIC = path.resolve(process.cwd(), 'public')
const folders = new Map<string, number>()

/** Media papkasi (masalan, “Tadbirlar”): bölmasa yaratiladi */
export async function folder(payload: Payload, name: string): Promise<number> {
  if (folders.has(name)) return folders.get(name)!
  const found = await payload.find({ collection: 'payload-folders', where: { name: { equals: name } }, limit: 1, depth: 0, overrideAccess: true })
  const id = (found.docs[0]?.id ??
    (await payload.create({ collection: 'payload-folders', data: { name } as never, overrideAccess: true })).id) as number
  folders.set(name, id)
  return id
}

/** /img/... yölidagi faylni Media'ga yuklaydi (avval yuklangan bölsa — öşani qaytaradi) */
export async function media(payload: Payload, publicPath: string, alt: string, folderName: string): Promise<number | null> {
  if (!publicPath || !publicPath.startsWith('/')) return null
  const file = path.join(PUBLIC, publicPath)
  if (!fs.existsSync(file)) {
    console.warn('  ! rasm topilmadi:', publicPath)
    return null
  }
  const name = publicPath.replace(/^\/img\//, '').replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.webp'
  const found = await payload.find({ collection: 'media', where: { filename: { equals: name } }, limit: 1, depth: 0, overrideAccess: true })
  if (found.docs[0]) return found.docs[0].id as number
  const data = await toWebp(fs.readFileSync(file))
  const doc = await payload.create({
    collection: 'media',
    data: { alt: alt.slice(0, 200), folder: await folder(payload, folderName) } as never,
    file: { data, mimetype: 'image/webp', name, size: data.length },
    overrideAccess: true,
  })
  return doc.id as number
}

/** Kalit böyiça mavjud yozuvni yangilaydi yoki yangisini yaratadi */
export async function upsert(payload: Payload, collection: CollectionSlug, where: Where, data: Record<string, unknown>) {
  const found = await payload.find({ collection, where, limit: 1, depth: 0, overrideAccess: true, draft: true })
  if (found.docs[0]) {
    return payload.update({ collection, id: found.docs[0].id, data: data as never, overrideAccess: true, locale: 'uz' })
  }
  return payload.create({ collection, data: data as never, overrideAccess: true, locale: 'uz' })
}

/** '2026-11-05' → sana (UTC yarim tun emas, mahalliy kun ortasi — vaqt mintaqasida kun siljimasin) */
export const kun = (iso: string) => (iso ? `${iso}T12:00:00.000Z` : undefined)
