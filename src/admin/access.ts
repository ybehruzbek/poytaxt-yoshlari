import type { Access } from 'payload'

/**
 * Ruxsatlar: Admin — hammasi; Muharrir — barça kontent; Operator — faqat murojaatlar.
 * Kontent hamma uçun öqiladi (sayt şundan çiziladi), özgartiriş — admin va muharrir, öçiriş — faqat admin.
 */
type U = { role?: string | null } | null | undefined

export const isAdmin = (user: U) => user?.role === 'admin'
export const isEditor = (user: U) => user?.role === 'admin' || user?.role === 'muharrir'

export const kontent = {
  read: (() => true) as Access,
  create: (({ req: { user } }) => isEditor(user)) as Access,
  update: (({ req: { user } }) => isEditor(user)) as Access,
  delete: (({ req: { user } }) => isAdmin(user)) as Access,
}

/** Yagona sahifa (global) uçun */
export const sahifa = {
  read: (() => true) as Access,
  update: (({ req: { user } }) => isEditor(user)) as Access,
}

/** Menyuda faqat kontent bilan işlaydiganlarga körinadi (operator körmaydi) */
export const kontentYashirin = ({ user }: { user: unknown }) => !isEditor(user as U)

/** Kiruvçi murojaatlar menyuda faqat admin va operatorga körinadi */
export const murojaatYashirin = ({ user }: { user: unknown }) => {
  const r = (user as U)?.role
  return r !== 'admin' && r !== 'operator'
}
