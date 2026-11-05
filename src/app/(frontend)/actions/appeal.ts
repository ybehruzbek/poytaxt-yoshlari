'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import { APPEAL_FILE_MAX, APPEAL_FILE_TYPES, APPEAL_TYPES } from '@/collections/Appeals'

export type AppealField = 'type' | 'name' | 'phone' | 'email' | 'message' | 'file'
export type AppealState = {
  ok: boolean
  message?: string
  errors?: Partial<Record<AppealField, string>>
}

const ALLOWED_EXT = /\.(pdf|jpe?g|png|webp|docx?)$/i

/* Oddiy spam himoyasi: bitta IP'dan 10 daqiqada 5 tadan ortiq murojaat qabul qilinmaydi.
   (Bitta server nusxasi uchun yetarli; bir nechta nusxada umumiy xotira kerak bo'ladi.) */
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim()

/** Saytdagi "Savol, murojaat yoki taklif" shaklini qabul qiladi */
export async function submitAppeal(fd: FormData): Promise<AppealState> {
  // bot uchun yashirin maydon to'ldirilgan bo'lsa — jimgina "qabul qilindi" deymiz
  if (str(fd, 'website')) return { ok: true, message: 'Rahmat! Murojaatingiz qabul qilindi.' }

  const h = await headers()
  const ip = (h.get('x-forwarded-for') ?? h.get('x-real-ip') ?? 'local').split(',')[0].trim()
  if (rateLimited(ip)) return { ok: false, message: 'Juda ko‘p urinish. Iltimos, birozdan keyin qayta yuboring.' }

  const type = str(fd, 'type')
  const name = str(fd, 'name')
  const phone = str(fd, 'phone')
  const email = str(fd, 'email')
  const message = str(fd, 'message')
  const file = fd.get('file')

  const errors: AppealState['errors'] = {}
  if (!APPEAL_TYPES.some((t) => t.value === type)) errors.type = 'Murojaat turini tanlang.'
  if (name.length < 3 || name.length > 120) errors.name = 'Ism-familiyangizni to‘liq kiriting.'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15) errors.phone = 'Telefon raqamini to‘g‘ri kiriting, masalan: +998 90 123 45 67.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) errors.email = 'Elektron pochta manzilini to‘g‘ri kiriting.'
  if (message.length < 10 || message.length > 4000) errors.message = 'Xabar kamida 10 ta belgidan iborat bo‘lsin.'

  let upload: File | null = null
  if (file instanceof File && file.size > 0) {
    if (file.size > APPEAL_FILE_MAX) errors.file = 'Fayl hajmi 10 MB dan oshmasin.'
    else if (!APPEAL_FILE_TYPES.includes(file.type) || !ALLOWED_EXT.test(file.name))
      errors.file = 'Faqat PDF, JPG, PNG, WEBP yoki Word (DOC, DOCX) fayl biriktiring.'
    else upload = file
  }

  if (Object.keys(errors).length) return { ok: false, errors, message: 'Iltimos, belgilangan maydonlarni tekshiring.' }

  try {
    const payload = await getPayload({ config })
    let fileId: number | undefined
    if (upload) {
      const data = Buffer.from(await upload.arrayBuffer())
      const doc = await payload.create({
        collection: 'appeal-files',
        data: {},
        file: { data, mimetype: upload.type, name: upload.name.slice(-120), size: upload.size },
        overrideAccess: true,
      })
      fileId = doc.id as number
    }
    await payload.create({
      collection: 'appeals',
      data: {
        type: type as 'savol' | 'murojaat' | 'taklif',
        status: 'yangi',
        name,
        phone,
        email,
        message,
        ...(fileId ? { file: fileId } : {}),
      },
      overrideAccess: true,
    })
    return { ok: true, message: 'Rahmat! Murojaatingiz qabul qilindi — tez orada siz bilan bog‘lanamiz.' }
  } catch (err) {
    console.error('[murojaat] saqlashda xato:', err)
    return { ok: false, message: 'Murojaatni saqlab bo‘lmadi. Iltimos, keyinroq qayta urinib ko‘ring.' }
  }
}
