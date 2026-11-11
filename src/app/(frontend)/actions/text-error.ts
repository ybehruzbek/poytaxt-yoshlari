'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import { clientIp, rateLimited } from '@/lib/rate-limit'

const norm = (s: string) => s.replace(/\s+/g, ' ').trim()

/** Matndagi xato haqida xabar (Ctrl/Command+Enter) — admin paneldagi “Matndagi xatolar” bölimiga tuşadi */
export async function reportTextError(input: {
  text: string
  context?: string
  comment?: string
  page: string
  /** botlar uçun yaşirin maydon — to'ldirilgan bölsa xabar jimgina taşlab yuboriladi */
  website?: string
}): Promise<{ ok: boolean; message: string }> {
  const done = { ok: true, message: 'Rahmat! Xabaringiz maʼmuriyatga yuborildi.' }
  if (String(input.website ?? '')) return done

  const text = String(input.text ?? '')
    .trim()
    .slice(0, 1000)
  const context = String(input.context ?? '')
    .trim()
    .slice(0, 2000)
  const comment = String(input.comment ?? '')
    .trim()
    .slice(0, 1000)
  const page = String(input.page ?? '')
    .trim()
    .slice(0, 300)
  if (!text || !page.startsWith('/'))
    return { ok: false, message: 'Avval xato bor matnni belgilang.' }
  // boşqaruv belgilari yöq, belgilangan matn atrofidagi matnning bir qismi bölişi kerak
  if (/[\u0000-\u0008\u000b-\u001f]/.test(text + comment) || (context && !norm(context).includes(norm(text).slice(0, 30))))
    return { ok: false, message: 'Xabarni yuborib bölmadi. Iltimos, matnni qayta belgilang.' }

  const ip = clientIp(await headers())
  if (rateLimited(ip, 'text-error'))
    return { ok: false, message: 'Juda köp uriniş. Iltimos, birozdan keyin qayta yuboring.' }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'text-errors',
      data: { text, context, comment, page, status: 'yangi' },
      overrideAccess: true,
    })
    return done
  } catch {
    return { ok: false, message: 'Xabarni yuborib bölmadi. Iltimos, keyinroq qayta urinib köring.' }
  }
}
