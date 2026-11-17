import 'server-only'

import { getPayloadClient } from './auth'
import type { CountKey, Role } from './menu'

const INBOX: CountKey[] = ['appeals', 'memberships', 'volunteers', 'text-errors']

/** Javob kutayotgan (holati “yangi”) xabarlar soni — faqat ularni körişga ruxsati bor rollar uçun */
export async function getCounts(role: Role): Promise<Partial<Record<CountKey, number>>> {
  if (role !== 'admin' && role !== 'operator') return {}
  const payload = await getPayloadClient()
  const res = await Promise.all(
    INBOX.map((collection) =>
      payload
        .count({ collection, where: { status: { equals: 'yangi' } }, overrideAccess: true })
        .then((r) => r.totalDocs)
        .catch(() => 0),
    ),
  )
  return Object.fromEntries(INBOX.map((k, i) => [k, res[i]]))
}
