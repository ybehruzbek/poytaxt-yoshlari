'use server'

import config from '@payload-config'
import { logout } from '@payloadcms/next/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

/**
 * Çiqiş: Payload sessiyasi serverda yopiladi, sessiya cookie'si esa har qanday holatda öçiriladi —
 * sessiyani yopiş muvaffaqiyatsiz bölsa ham brauzerda kiriş belgisi qolmaydi.
 */
export async function chiqish() {
  const payload = await getPayload({ config })
  let yopildi = false
  try {
    // faqat şu qurilmadagi sessiya yopiladi — xodimning boşqa qurilmalari çiqarib yuborilmaydi
    const r = await logout({ config })
    yopildi = r.success !== false
    if (!yopildi) payload.logger.error({ r }, 'boshqaruv: sessiyani yopiş amalga oşmadi')
  } catch (e) {
    payload.logger.error({ err: e }, 'boshqaruv: sessiyani yopiş amalga oşmadi')
  } finally {
    ;(await cookies()).delete(`${payload.config.cookiePrefix}-token`)
  }
  // sessiya serverda yopilmagan bölsa, xodim buni kiriş sahifasida köradi
  redirect(yopildi ? '/boshqaruv/kirish' : '/boshqaruv/kirish?xato=sessiya')
}
