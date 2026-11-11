'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import { clientIp, rateLimited } from '@/lib/rate-limit'

/** Matndagi xato haqida xabar (Ctrl/Command+Enter) — admin paneldagi “Matndagi xatolar” bölimiga tuşadi */
export async function reportTextError(input: {
  text: string
  context?: string
  comment?: string
  page: string
}): Promise<{ ok: boolean; message: string }> {
  const text = String(input.text ?? '').trim().slice(0, 1000)
  const context = String(input.context ?? '').trim().slice(0, 2000)
  const comment = String(input.comment ?? '').trim().slice(0, 1000)
  const page = String(input.page ?? '').trim().slice(0, 300)
  if (!text || !page.startsWith('/')) return { ok: false, message: 'Avval xato bor matnni belgilang.' }

  const ip = clientIp(await headers())
  if (rateLimited(ip)) return { ok: false, message: 'Juda köp uriniş. Iltimos, birozdan keyin qayta yuboring.' }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'text-errors',
      data: { text, context, comment, page, status: 'yangi' },
      overrideAccess: true,
    })
    return { ok: true, message: 'Rahmat! Xabaringiz maʼmuriyatga yuborildi.' }
  } catch {
    return { ok: false, message: 'Xabarni yuborib bölmadi. Iltimos, keyinroq qayta urinib köring.' }
  }
}
