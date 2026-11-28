import type { Access, CollectionConfig } from 'payload'
import { murojaatYashirin } from '@/admin/access'
import { G } from '@/admin/groups'

/** Aʼzolik arizalarini faqat admin va operator köradi / özgartiradi */
const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

/**
 * Saytdagi “Aʼzo böliş” şakli orqali kelgan aʼzolik arizalari (Ustav, 4.1-band).
 * Kengaş arizani öqiş / iş joyidagi boşlanğiç taşkilotga yuboradi; qarorni boşlanğiç taşkilot qabul qiladi (4.4–4.5).
 */
export const Memberships: CollectionConfig = {
  slug: 'memberships',
  labels: { singular: 'A’zolik arizasi', plural: 'A’zolik arizalari' },
  admin: {
    group: G.murojaatlar,
    hidden: murojaatYashirin,
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
        { label: 'Takroriy (30 kun ičida shu raqamdan)', value: 'takror' },
        { label: 'Boshlang‘ich tashkilotga yuborildi', value: 'yuborildi' },
        { label: 'Qabul qilindi', value: 'qabul' },
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
        { name: 'email', label: 'Elektron pochta', type: 'email' },
      ],
    },
    { name: 'place', label: 'O‘qish yoki ish joyi', type: 'text', required: true },
    { name: 'note', label: 'Ichki izoh (faqat xodimlar uchun)', type: 'textarea' },
  ],
  timestamps: true,
}
