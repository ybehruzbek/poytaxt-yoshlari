import type { Access, CollectionConfig } from 'payload'
import { imloMatn } from '@/lib/imlo-hook'
import { G } from '@/admin/groups'

/** Rollar: admin — hammasi; muharrir — kontent; operator — faqat murojaatlar. */
export const ROLES = ['admin', 'muharrir', 'operator'] as const
export type Role = (typeof ROLES)[number]

const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'
const isAdminOrSelf: Access = ({ req: { user } }) =>
  user?.role === 'admin' ? true : user ? { id: { equals: user.id } } : false

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Foydalanuvçi', plural: 'Foydalanuvçilar' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: G.tizim,
  },
  // 5 marta notöğri parol kiritilsa, hisob 15 daqiqaga bloklanadi (parolni terib topişning oldi olinadi)
  auth: { maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  hooks: {
    // Birinchi yaratilgan foydalanuvchi har doim admin bo'ladi
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', req })
          if (totalDocs === 0) data.role = 'admin'
        }
        return data
      },
    ],
  },
  access: {
    // eski Payload paneliga (/admin) faqat administrator kiradi — xodimlar yangi panelda (/boshqaruv) işlaydi
    admin: ({ req: { user } }) => user?.role === 'admin',
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', label: 'Ism-familiya', type: 'text', required: true, hooks: { beforeChange: [imloMatn] } },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      defaultValue: 'muharrir',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Muharrir (kontent)', value: 'muharrir' },
        { label: 'Operator (murojaatlar)', value: 'operator' },
      ],
      // Rolni faqat admin o'zgartira oladi
      access: { update: ({ req: { user } }) => user?.role === 'admin' },
    },
  ],
}
