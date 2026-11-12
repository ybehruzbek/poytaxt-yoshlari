'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { clientIp, rateLimited } from '@/lib/rate-limit'
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
    return { ok: false, message: 'Yuboriş urinişlari soni oşib ketdi. Iltimos, birozdan keyin qayta yuboring.' }

  const name = str(fd.get('name'))
  const phone = str(fd.get('phone'))
  const email = str(fd.get('email'))
  const place = str(fd.get('place')) === 'boshqa' ? str(fd.get('placeOther')) : str(fd.get('place'))
  const birthYear = Number(str(fd.get('birthYear')))
  const age = new Date().getFullYear() - birthYear

  const errors: MemberState['errors'] = {}
  if (name.length < 5 || name.length > 120) errors.name = 'Familiya, ism va otasining ismini töliq kiriting.'
  if (!birthYear || age < 14 || age > 30)
    errors.birthYear = 'Ittifoqqa 14 yoşga tölgan va 30 yoşdan oşmagan şaxslar aʼzo bölişi mumkin (Ustavning 4.2-bandi).'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15) errors.phone = 'Telefon raqamini töğri kiriting, masalan: +998 90 123 45 67.'
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160))
    errors.email = 'Elektron poçta manzilini töğri kiriting.'
  if (place.length < 3 || place.length > 200) errors.place = 'Öqiş yoki iş joyingizni körsating.'
  if (fd.get('agree') !== 'on') errors.agree = 'Ustav bilan tanişganingizni tasdiqlang.'

  if (Object.keys(errors).length) return { ok: false, errors, message: 'Iltimos, belgilangan maydonlarni tekşiring.' }

  try {
    const payload = await getPayload({ config })
    // bitta raqamdan 30 kun ičida takroriy ariza qabul qilinmaydi
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const dup = await payload.count({
      collection: 'memberships',
      where: { and: [{ phone: { equals: phone } }, { createdAt: { greater_than: since } }] },
      overrideAccess: true,
    })
    if (dup.totalDocs > 0)
      return {
        ok: false,
        message: 'Bu telefon raqamidan ariza yaqinda yuborilgan. U körib çiqilmoqda; qöşimça savollar bölsa, Kengaşga murojaat qiling.',
      }
    const doc = await payload.create({
      collection: 'memberships',
      data: { status: 'yangi', name, birthYear, phone, email: email || undefined, place },
      overrideAccess: true,
    })
    const no = `A-${new Date().getFullYear()}-${String(doc.id).padStart(5, '0')}`
    return { ok: true, no, message: 'Arizangiz qabul qilindi.' }
  } catch (err) {
    console.error('[aʼzolik] saqlaşda xato:', err)
    return { ok: false, message: 'Arizani saqlab bölmadi. Iltimos, keyinroq qayta urinib köring.' }
  }
}
