import type { Access, CollectionConfig } from 'payload'
import { G } from '@/admin/groups'

const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

/**
 * Maqolalarga berilgan baholar (1–5). Bitta tomonidan bitta maqolaga bitta baho: `voter` —
 * IP va maxfiy kalitdan olingan xeş (IP özi saqlanmaydi). Faqat server action orqali yoziladi.
 */
export const NewsRatings: CollectionConfig = {
  slug: 'news-ratings',
  labels: { singular: 'Baho', plural: 'Maqola baholari' },
  admin: { group: G.yangiliklar, hidden: ({ user }) => user?.role !== 'admin', defaultColumns: ['news', 'value', 'createdAt'] },
  access: { read: staff, create: () => false, update: () => false, delete: ({ req: { user } }) => user?.role === 'admin' },
  fields: [
    { name: 'news', label: 'Yangilik', type: 'relationship', relationTo: 'news', required: true, index: true },
    { name: 'value', label: 'Baho', type: 'number', required: true, min: 1, max: 5 },
    { name: 'voter', label: 'Baholovchi (xesh)', type: 'text', required: true, index: true },
  ],
  timestamps: true,
}
