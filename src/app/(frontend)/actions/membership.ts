'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { clientIp, rateLimited } from '@/lib/rate-limit'
import { logError } from '@/lib/log-error'
import config from '@/payload.config'

export type MemberField = 'name' | 'birthYear' | 'phone' | 'email' | 'place' | 'agree'
export type MemberState = {
  ok: boolean
  message: string
  errors?: Partial<Record<MemberField, string>>
  /** ariza röyxat raqami */
  no?: string
}

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '')

/** “Aʼzo böliş” şaklini qabul qiladi (Ustav, 4.1–4.2-bandlar) */
export async function submitMembership(fd: FormData): Promise<MemberState> {
  // botlar uçun yaşirin maydon
  if (str(fd.get('website'))) return { ok: true, message: 'Arizangiz qabul qilindi.' }
  const ip = clientIp(await headers())
  if (rateLimited(ip, 'membership'))
    return { ok: false, message: 'Yuborish urinishlari soni belgilangan chegaradan oshdi. Iltimos, birozdan keyin qayta yuboring.' }

  const name = str(fd.get('name'))
  const phone = str(fd.get('phone'))
  const email = str(fd.get('email'))
  const place = str(fd.get('place')) === 'boshqa' ? str(fd.get('placeOther')) : str(fd.get('place'))
  const yearRaw = str(fd.get('birthYear'))
  const birthYear = /^\d{4}$/.test(yearRaw) ? Number(yearRaw) : 0
  const age = new Date().getFullYear() - birthYear

  const errors: MemberState['errors'] = {}
  if (name.length < 5 || name.length > 120) errors.name = 'Familiya, ism va otasining ismini to‘liq kiriting.'
  if (!birthYear || age < 14 || age > 30)
    errors.birthYear = 'Ittifoqqa 14 yoshga to‘lgan va 30 yoshdan oshmagan shaxslar a’zo bo‘lishi mumkin (Ustavning 4.2-bandi).'
  const digits = phone.replace(/\D/g, '')
  // yagona şakl: +998901234567 (takror tekşiruvi va saqlaş uçun)
  const phoneNorm = `+${digits}`
  if (digits.length < 9 || digits.length > 15) errors.phone = 'Telefon raqamini to‘g‘ri kiriting, masalan: +998 90 123 45 67.'
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160))
    errors.email = 'Elektron pochta manzilini to‘g‘ri kiriting.'
  if (place.length < 3 || place.length > 200) errors.place = 'O‘qish yoki ish joyingizni ko‘rsating.'
  if (fd.get('agree') !== 'on') errors.agree = 'Ustav bilan tanishganingizni tasdiqlang.'

  if (Object.keys(errors).length) return { ok: false, errors, message: 'Iltimos, belgilangan maydonlarni tekshiring.' }

  try {
    const payload = await getPayload({ config })
    // takroriy ariza bloklanmaydi (boşqa odam raqamini band qila olmasin) — xodimlar uçun “Takroriy” belgisi qöyiladi;
    // foydalanuvçiga javob bir xil (raqam bazada bor-yöqligi oşkor qilinmaydi)
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const dup = await payload.count({
      collection: 'memberships',
      where: { and: [{ phone: { equals: phoneNorm } }, { createdAt: { greater_than: since } }] },
      overrideAccess: true,
    })
    const doc = await payload.create({
      collection: 'memberships',
      data: { status: dup.totalDocs > 0 ? 'takror' : 'yangi', name, birthYear, phone: phoneNorm, email: email || undefined, place },
      overrideAccess: true,
    })
    const no = `A-${new Date().getFullYear()}-${String(doc.id).padStart(5, '0')}`
    return { ok: true, no, message: 'Arizangiz qabul qilindi.' }
  } catch (err) {
    logError('a’zolik', err)
    return { ok: false, message: 'Arizani saqlab bo‘lmadi. Iltimos, keyinroq qayta urinib ko‘ring.' }
  }
}
