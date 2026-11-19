'use server'

import { revalidatePath } from 'next/cache'

import { getPayloadClient, getUser } from './auth'
import { isId, str } from './guard'
import { usageOf } from './library'

type R = { ok: boolean; message: string }
const kindOf = (k: string) => (k === 'files' ? 'files' : k === 'media' ? 'media' : null)

/** Rasm tavsifi (alt) yoki hujjat nomi — saytda körinadi, imlo hook'i yangi alifboga ötkazadi */
export async function renameLibItem(kind: string, id: number, textIn: string): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Notöğri söröv.' }
  const text = str(textIn, 1000)
  const user = await getUser()
  const k = kindOf(kind)
  if (!user || !k || (user.role !== 'admin' && user.role !== 'muharrir')) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const t = text.trim()
  if (!t) return { ok: false, message: k === 'files' ? 'Fayl nomini yozing.' : 'Rasm tavsifini yozing.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: k, id, data: (k === 'files' ? { title: t } : { alt: t }) as never, locale: 'uz', user, overrideAccess: false })
    revalidatePath('/boshqaruv/kutubxona')
    return { ok: true, message: 'Saqlandi' }
  } catch {
    return { ok: false, message: 'Saqlab bölmadi.' }
  }
}

/** Öçiriş — faqat administrator va faqat heç qayerda işlatilmagan fayl (aks holda sahifalardan jimgina yöqolardi) */
export async function deleteLibItem(kind: string, id: number): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Notöğri söröv.' }
  const user = await getUser()
  const k = kindOf(kind)
  if (!user || !k || user.role !== 'admin') return { ok: false, message: 'Öçiriş faqat administratorga ruxsat etilgan.' }
  const used = await usageOf(k, id)
  if (used.length) return { ok: false, message: `Öçirib bölmaydi: ${used.length} joyda işlatilgan.` }
  const payload = await getPayloadClient()
  try {
    await payload.delete({ collection: k, id, user, overrideAccess: false })
    revalidatePath('/boshqaruv/kutubxona')
    return { ok: true, message: 'Öçirildi' }
  } catch {
    return { ok: false, message: 'Öçirib bölmadi.' }
  }
}
