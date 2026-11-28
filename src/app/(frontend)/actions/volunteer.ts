'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { getVolDirs } from '@/lib/cms/imkoniyatlar'
import { getVolSahifa } from '@/lib/cms/sahifalar'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { logError } from '@/lib/log-error'
import config from '@/payload.config'

export type VolField = 'name' | 'birthYear' | 'phone' | 'place' | 'dirs' | 'agree'
export type VolState = {
  ok: boolean
  message: string
  errors?: Partial<Record<VolField, string>>
  /** ariza röyxat raqami */
  no?: string
}

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '')

/** “Volontyorlik” sahifasidagi arizani qabul qiladi (Qonun ÖRQ–585, 12-modda: 16 yoşdan) */
export async function submitVolunteer(fd: FormData): Promise<VolState> {
  // botlar uçun yaşirin maydon
  if (str(fd.get('website'))) return { ok: true, message: 'Arizangiz qabul qilindi.' }
  const ip = clientIp(await headers())
  if (rateLimited(ip, 'volunteer'))
    return {
      ok: false,
      message:
        'Yuborish urinishlari soni belgilangan chegaradan oshdi. Iltimos, birozdan keyin qayta yuboring.',
    }

  const name = str(fd.get('name'))
  const phone = str(fd.get('phone'))
  const place = str(fd.get('place'))
  const about = str(fd.get('about')).slice(0, 1000)
  const { TIMES } = await getVolSahifa()
  const time = TIMES.includes(str(fd.get('time'))) ? str(fd.get('time')) : ''
  const ids = fd.getAll('dirs').map(String)
  // yönalişlar admin paneldagi röyxatdan tekşiriladi
  const dirs = (await getVolDirs()).filter((d) => ids.includes(d.id))
  const yearRaw = str(fd.get('birthYear'))
  const birthYear = /^\d{4}$/.test(yearRaw) ? Number(yearRaw) : 0
  const age = new Date().getFullYear() - birthYear

  const errors: VolState['errors'] = {}
  if (name.length < 5 || name.length > 120)
    errors.name = 'Familiya, ism va otasining ismini to‘liq kiriting.'
  if (!birthYear || age < 16 || age > 35)
    errors.birthYear =
      'Volontyorlik faoliyatini 16 yoshga to‘lgan shaxslar amalga oshirishi mumkin (Qonunning 12-moddasi).'
  const digits = phone.replace(/\D/g, '')
  const phoneNorm = `+${digits}`
  if (digits.length < 9 || digits.length > 15)
    errors.phone = 'Telefon raqamini to‘g‘ri kiriting, masalan: +998 90 123 45 67.'
  if (place.length < 3 || place.length > 200) errors.place = 'O‘qish yoki ish joyingizni ko‘rsating.'
  if (!dirs.length) errors.dirs = 'Kamida bitta yo‘nalishni tanlang.'
  else if (age < 18 && dirs.some((d) => d.age === 18))
    errors.dirs =
      'Favqulodda vaziyatlar yo‘nalishida faqat 18 yoshdan katta volontyorlar ishtirok etadi (Qonunning 12-moddasi).'
  if (fd.get('agree') !== 'on')
    errors.agree = 'Shaxsiy ma’lumotlarni qayta ishlashga roziligingizni tasdiqlang.'

  if (Object.keys(errors).length)
    return { ok: false, errors, message: 'Iltimos, belgilangan maydonlarni tekshiring.' }

  try {
    const payload = await getPayload({ config })
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const dup = await payload.count({
      collection: 'volunteers',
      where: { and: [{ phone: { equals: phoneNorm } }, { createdAt: { greater_than: since } }] },
      overrideAccess: true,
    })
    const doc = await payload.create({
      collection: 'volunteers',
      data: {
        status: dup.totalDocs > 0 ? 'takror' : 'yangi',
        name,
        birthYear,
        phone: phoneNorm,
        place,
        dirs: dirs.map((d) => d.t).join('; '),
        time: time || undefined,
        about: about || undefined,
      },
      overrideAccess: true,
    })
    const no = `V-${new Date().getFullYear()}-${String(doc.id).padStart(5, '0')}`
    return { ok: true, no, message: 'Arizangiz qabul qilindi.' }
  } catch (err) {
    logError('volontyorlik', err)
    return { ok: false, message: 'Arizani saqlab bo‘lmadi. Iltimos, keyinroq qayta urinib ko‘ring.' }
  }
}
