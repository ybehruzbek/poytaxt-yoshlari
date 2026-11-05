import type { Access, CollectionConfig } from 'payload'

/** Murojaatlarni faqat admin va operator ko'radi/o'zgartiradi */
const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

/** Murojaatga biriktirilgan fayllar uchun ruxsat etilgan turlar va hajm */
export const APPEAL_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
export const APPEAL_FILE_MAX = 10 * 1024 * 1024 // 10 MB

export const APPEAL_TYPES = [
  { label: 'Savol', value: 'savol' },
  { label: 'Murojaat', value: 'murojaat' },
  { label: 'Taklif', value: 'taklif' },
] as const

/**
 * Murojaatlarga biriktirilgan fayllar — MAXFIY: ommaga ochiq emas,
 * faqat admin/operator ko'radi. Diskda alohida papkada saqlanadi (git'ga kirmaydi).
 */
export const AppealFiles: CollectionConfig = {
  slug: 'appeal-files',
  labels: { singular: 'Murojaat fayli', plural: 'Murojaat fayllari' },
  admin: { group: 'Murojaatlar', hidden: ({ user }) => user?.role !== 'admin' },
  access: {
    read: staff,
    create: () => false, // faqat server action orqali (overrideAccess)
    update: () => false,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [],
  upload: {
    staticDir: 'private-uploads/appeal-files',
    mimeTypes: APPEAL_FILE_TYPES,
  },
}

/** Saytdagi shakl orqali kelgan savol, murojaat va takliflar */
export const Appeals: CollectionConfig = {
  slug: 'appeals',
  labels: { singular: 'Murojaat', plural: 'Murojaatlar' },
  admin: {
    group: 'Murojaatlar',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    read: staff,
    create: () => false, // faqat server action orqali (overrideAccess)
    update: staff,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'type', label: 'Turi', type: 'select', required: true, options: APPEAL_TYPES.map((t) => ({ ...t })) },
        {
          name: 'status',
          label: 'Holati',
          type: 'select',
          required: true,
          defaultValue: 'yangi',
          options: [
            { label: 'Yangi', value: 'yangi' },
            { label: 'Ko‘rib chiqilmoqda', value: 'jarayonda' },
            { label: 'Yopildi', value: 'yopildi' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Ism-familiya', type: 'text', required: true },
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'email', label: 'Elektron pochta', type: 'email', required: true },
      ],
    },
    { name: 'message', label: 'Xabar', type: 'textarea', required: true },
    { name: 'file', label: 'Biriktirilgan fayl', type: 'upload', relationTo: 'appeal-files' },
    { name: 'note', label: 'Ichki izoh (faqat xodimlar uchun)', type: 'textarea' },
  ],
  timestamps: true,
}
