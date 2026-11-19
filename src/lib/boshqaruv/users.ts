import 'server-only'

import { getPayloadClient } from './auth'
import type { Role } from './menu'
import { qisqaVaqt } from './vaqt'

export type UserRow = { id: number; name: string; email: string; role: Role; locked: boolean; when: string }

export async function listUsers(): Promise<UserRow[]> {
  const payload = await getPayloadClient()
  const r = await payload.find({ collection: 'users', limit: 200, sort: 'name', depth: 0, overrideAccess: true, showHiddenFields: true })
  const now = Date.now()
  return (r.docs as unknown as Record<string, unknown>[]).map((u) => ({
    id: u.id as number,
    name: String(u.name ?? ''),
    email: String(u.email ?? ''),
    role: (u.role as Role) ?? 'muharrir',
    locked: !!u.lockUntil && new Date(u.lockUntil as string).getTime() > now,
    when: qisqaVaqt(u.createdAt as string),
  }))
}
