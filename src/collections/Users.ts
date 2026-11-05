import type { Access, CollectionConfig } from 'payload'

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
    group: 'Tizim',
  },
  auth: true,
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
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', label: 'Ism-familiya', type: 'text', required: true },
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
