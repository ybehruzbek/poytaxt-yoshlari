import type { Access, CollectionConfig } from 'payload'
import { murojaatYashirin } from '@/admin/access'
import { G } from '@/admin/groups'

const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

/**
 * Saytdagi matn xatolari: tashrif buyuruvçi xatoni belgilab Ctrl/Command+Enter bosadi —
 * belgilangan matn, sahifa manzili va izoh şu yerga tuşadi.
 */
export const TextErrors: CollectionConfig = {
  slug: 'text-errors',
  labels: { singular: 'Matndagi xato', plural: 'Matndagi xatolar' },
  admin: {
    group: G.murojaatlar,
    hidden: murojaatYashirin,
    useAsTitle: 'text',
    defaultColumns: ['text', 'page', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    read: staff,
    create: () => false, // faqat server action orqali (overrideAccess)
    update: staff,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'text', label: 'Belgilangan matn', type: 'textarea', required: true },
    { name: 'context', label: 'Atrofidagi matn', type: 'textarea' },
    { name: 'comment', label: 'Izoh', type: 'textarea' },
    { name: 'page', label: 'Sahifa', type: 'text', required: true },
    {
      name: 'status',
      label: 'Holati',
      type: 'select',
      defaultValue: 'yangi',
      options: [
        { label: 'Yangi', value: 'yangi' },
        { label: 'Tuzatildi', value: 'tuzatildi' },
        { label: 'Xato emas', value: 'rad' },
      ],
    },
  ],
}
