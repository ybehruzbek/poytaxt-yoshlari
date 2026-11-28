import type { Access, CollectionConfig } from 'payload'
import { murojaatYashirin } from '@/admin/access'
import { G } from '@/admin/groups'

/** Volontyorlik arizalarini faqat admin va operator köradi / özgartiradi */
const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

/**
 * Saytdagi “Volontyorlik” sahifasi şakli orqali kelgan arizalar.
 * “Volontyorlik faoliyati töğrisida”gi Qonun (ÖRQ–585), 12-modda: 16 yoşdan, favqulodda vaziyatlar yönalişida 18 yoşdan.
 */
export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
  labels: { singular: 'Volontyorlik arizasi', plural: 'Volontyorlik arizalari' },
  admin: {
    group: G.murojaatlar,
    hidden: murojaatYashirin,
    useAsTitle: 'name',
    defaultColumns: ['name', 'dirs', 'status', 'createdAt'],
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
        { label: 'Takroriy (30 kun ichida shu raqamdan)', value: 'takror' },
        { label: 'Suhbatga taklif qilindi', value: 'suhbat' },
        { label: 'Volontyorlar ro‘yxatiga kiritildi', value: 'qabul' },
        { label: 'Rad etildi', value: 'rad' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Familiya, ism, otasining ismi', type: 'text', required: true },
        { name: 'birthYear', label: 'Tug‘ilgan yili', type: 'number', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'place', label: 'O‘qish yoki ish joyi', type: 'text', required: true },
      ],
    },
    { name: 'dirs', label: 'Yo‘nalishlar', type: 'text', required: true },
    { name: 'time', label: 'Bandlik vaqti', type: 'text' },
    { name: 'about', label: 'Tajriba va qiziqishlar', type: 'textarea' },
    { name: 'note', label: 'Ichki izoh (faqat xodimlar uchun)', type: 'textarea' },
  ],
  timestamps: true,
}
