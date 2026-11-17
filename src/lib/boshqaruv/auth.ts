import 'server-only'

import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { User } from '@/payload-types'

import type { Role } from './menu'

/**
 * Boşqaruv paneli foydalanuvçisi. Kiriş Payload'ning öz sessiyasi orqali (payload-token cookie):
 * eski /admin bilan bir xil hisob, bir xil ruxsatlar. Bitta söröv içida bir marta tekşiriladi.
 */
export const getUser = cache(async (): Promise<(User & { role: Role }) | null> => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user || user.collection !== 'users') return null
  return user as User & { role: Role }
})

/** Kirmagan foydalanuvçini kiriş sahifasiga qaytaradi */
export async function requireUser() {
  const user = await getUser()
  if (!user) redirect('/boshqaruv/kirish')
  return user
}

export const getPayloadClient = () => getPayload({ config })
