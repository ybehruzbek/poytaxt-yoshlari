import type { Access, CollectionConfig } from 'payload'

import { notifyOnCreate } from '@/lib/notify'

/** Aʼzolik arizalarini faqat admin va operator köradi / özgartiradi */
const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

/**
 * Saytdagi “Aʼzo böliş” şakli orqali kelgan aʼzolik arizalari (Ustav, 4.1-band).
 * Kengaş arizani öqiş / iş joyidagi boşlanğiç taşkilotga yuboradi; qarorni boşlanğiç taşkilot qabul qiladi (4.4–4.5).
 */
export const Memberships: CollectionConfig = {
  slug: 'memberships',
  labels: { singular: 'Aʼzolik arizasi', plural: 'Aʼzolik arizalari' },
  hooks: {
    afterChange: [
      notifyOnCreate({
        subject: (d) => `Saytga yangi aʼzolik arizasi keldi${d.status === 'takror' ? ' (takroriy)' : ''}`,
        lines: (d) => [
          ['Ariza raqami', `A-${new Date(String(d.createdAt)).getFullYear()}-${String(d.id).padStart(5, '0')}`],
          ['Arizaçi', d.name as string],
          ['Öqiş yoki iş joyi', d.place as string],
        ],
      }),
    ],
  },
  admin: {
    group: 'Murojaatlar',
    useAsTitle: 'name',
    defaultColumns: ['name', 'place', 'status', 'createdAt'],
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
      name: 'status',
      label: 'Holati',
      type: 'select',
      required: true,
      defaultValue: 'yangi',
      options: [
        { label: 'Yangi', value: 'yangi' },
        { label: 'Takroriy (30 kun ičida şu raqamdan)', value: 'takror' },
        { label: 'Boşlanğiç taşkilotga yuborildi', value: 'yuborildi' },
        { label: 'Qabul qilindi', value: 'qabul' },
        { label: 'Rad etildi', value: 'rad' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Familiya, ism, otasining ismi', type: 'text', required: true },
        { name: 'birthYear', label: 'Tuğilgan yili', type: 'number', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'email', label: 'Elektron poçta', type: 'email' },
      ],
    },
    { name: 'place', label: 'Öqiş yoki iş joyi', type: 'text', required: true },
    { name: 'note', label: 'Içki izoh (faqat xodimlar uçun)', type: 'textarea' },
  ],
  timestamps: true,
}
