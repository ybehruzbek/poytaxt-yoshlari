'use server'

import { getPayload } from 'payload'

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
