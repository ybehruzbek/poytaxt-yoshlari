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
  try {
    await logout({ config })
  } catch (e) {
    payload.logger.error({ err: e }, 'boshqaruv: sessiyani yopiş amalga oşmadi')
  } finally {
    ;(await cookies()).delete(`${payload.config.cookiePrefix}-token`)
  }
  redirect('/boshqaruv/kirish')
}
