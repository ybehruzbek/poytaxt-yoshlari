import type { Access, CollectionConfig } from 'payload'

import { notifyOnCreate } from '@/lib/notify'

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
  { label: 'Ariza', value: 'ariza' },
  { label: 'Taklif', value: 'taklif' },
  { label: 'Şikoyat', value: 'shikoyat' },
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

/** Saytdagi şakl orqali kelgan ariza, taklif va şikoyatlar (Qonun: murojaat turlari) */
export const Appeals: CollectionConfig = {
  slug: 'appeals',
  labels: { singular: 'Murojaat', plural: 'Murojaatlar' },
  hooks: {
    afterChange: [
      notifyOnCreate({
        subject: (d) => `Saytga yangi murojaat keldi: ${APPEAL_TYPES.find((t) => t.value === d.type)?.label ?? d.type}`,
        lines: (d) => [
          ['Turi', APPEAL_TYPES.find((t) => t.value === d.type)?.label],
          ['Murojaatçi', d.name as string],
          ['Xabar', String(d.message ?? '').slice(0, 300)],
        ],
      }),
    ],
  },
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
            { label: 'Körib çiqilmoqda', value: 'jarayonda' },
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
        { name: 'email', label: 'Elektron poçta', type: 'email', required: true },
      ],
    },
    { name: 'message', label: 'Xabar', type: 'textarea', required: true },
    { name: 'file', label: 'Biriktirilgan fayl', type: 'upload', relationTo: 'appeal-files' },
    { name: 'note', label: 'Içki izoh (faqat xodimlar uçun)', type: 'textarea' },
  ],
  timestamps: true,
}
