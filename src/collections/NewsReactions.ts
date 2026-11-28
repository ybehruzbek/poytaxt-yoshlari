import type { Access, CollectionConfig } from 'payload'
import { G } from '@/admin/groups'

const staff: Access = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'operator'

export const REACTIONS = ['like', 'fire', 'dislike', 'angry', 'laugh'] as const
export type ReactionKind = (typeof REACTIONS)[number]

/**
 * Maqolalarga reaksiyalar (👍 🔥 👎 😡 😁). Bitta tomonidan bitta maqolaga bitta reaksiya:
 * `voter` — IP va maxfiy kalitdan olingan xeş (IP özi saqlanmaydi). Faqat server action orqali yoziladi.
 */
export const NewsReactions: CollectionConfig = {
  slug: 'news-reactions',
  labels: { singular: 'Reaksiya', plural: 'Maqola reaksiyalari' },
  admin: { group: G.yangiliklar, hidden: ({ user }) => user?.role !== 'admin', defaultColumns: ['news', 'kind', 'createdAt'] },
  access: { read: staff, create: () => false, update: () => false, delete: ({ req: { user } }) => user?.role === 'admin' },
  fields: [
    { name: 'news', label: 'Yangilik', type: 'relationship', relationTo: 'news', required: true, index: true },
    {
      name: 'kind',
      label: 'Reaksiya',
      type: 'select',
      required: true,
      options: [
        { label: '👍 Ma’qul', value: 'like' },
        { label: '🔥 A’lo', value: 'fire' },
        { label: '👎 Ma’qul emas', value: 'dislike' },
        { label: '😡 Norozilik', value: 'angry' },
        { label: '😁 Quvonch', value: 'laugh' },
      ],
    },
    { name: 'voter', label: 'Foydalanuvchi (xesh)', type: 'text', required: true, index: true },
  ],
  timestamps: true,
}
