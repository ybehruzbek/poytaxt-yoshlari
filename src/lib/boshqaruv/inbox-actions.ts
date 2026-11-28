'use server'

import { revalidatePath } from 'next/cache'

import { getPayloadClient, getUser } from './auth'
import { isId, str } from './guard'
import { kindBySlug } from './inbox-config'

type R = { ok: boolean; message: string }

/** Kiruvçi xabarlar bilan faqat admin va operator işlaydi (Payload ruxsatlari ham şuni talab qiladi) */
async function staff() {
  const user = await getUser()
  return user && (user.role === 'admin' || user.role === 'operator') ? user : null
}

const refresh = () => {
  revalidatePath('/boshqaruv/kiruvchi', 'layout')
  revalidatePath('/boshqaruv')
}

export async function setInboxStatus(slug: string, id: number, status: string): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const user = await staff()
  const kind = kindBySlug(slug)
  if (!user || !kind) return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  const st = kind.statuses.find((s) => s.v === status)
  if (!st) return { ok: false, message: 'Noto‘g‘ri holat.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: kind.slug, id, data: { status } as never, user, overrideAccess: false })
    refresh()
    return { ok: true, message: `Holat: ${st.t}` }
  } catch {
    return { ok: false, message: 'Holatni o‘zgartirib bo‘lmadi.' }
  }
}

export async function saveInboxNote(slug: string, id: number, noteIn: string): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const note = str(noteIn, 5000)
  const user = await staff()
  const kind = kindBySlug(slug)
  if (!user || !kind || kind.slug === 'text-errors') return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: kind.slug, id, data: { note: note.slice(0, 5000) } as never, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Izoh saqlandi' }
  } catch {
    return { ok: false, message: 'Izohni saqlab bo‘lmadi.' }
  }
}

/** Öçiriş — faqat administrator; murojaat bilan birga unga biriktirilgan maxfiy fayl ham öçiriladi */
export async function deleteInboxItem(slug: string, id: number): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const user = await getUser()
  const kind = kindBySlug(slug)
  if (!user || user.role !== 'admin' || !kind) return { ok: false, message: 'O‘chirish faqat administratorga ruxsat etilgan.' }
  const payload = await getPayloadClient()
  try {
    const doc = await payload.delete({ collection: kind.slug, id, depth: 0, user, overrideAccess: false })
    const file = (doc as { file?: number | null }).file
    if (kind.slug === 'appeals' && typeof file === 'number') {
      await payload.delete({ collection: 'appeal-files', id: file, user, overrideAccess: false }).catch(() => null)
    }
    refresh()
    return { ok: true, message: 'O‘chirildi' }
  } catch {
    return { ok: false, message: 'O‘chirib bo‘lmadi.' }
  }
}
