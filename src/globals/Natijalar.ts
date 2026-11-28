import type { GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { matn, qator, son, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

/** “Natijalar va hisobotlar” sahifasi: yil yakuni raqamlari va yillar böyiça asosiy natijalar */
export const Natijalar: GlobalConfig = {
  slug: 'natijalar',
  label: 'Natijalar va hisobotlar',
  admin: {
    group: G.faoliyat,
    description: 'Saytdagi “Natijalar va hisobotlar” sahifasi.',
    preview: (_doc, { locale }) => saytManzil('/faoliyat/natijalar', locale),
  },
  access: sahifa,
  versions: { drafts: false, max: 30 },
  hooks: yangilashGlobal(['/faoliyat/natijalar']),
  fields: [
    {
      name: 'report',
      label: 'Yil yakuni raqamlari',
      type: 'group',
      fields: [
        son('post', 'Hisobot posti raqami', { izoh: 'Telegram kanaldagi yillik hisobot posti.' }),
        {
          name: 'nums',
          label: 'Raqamlar',
          type: 'array',
          labels: { singular: 'Raqam', plural: 'Raqamlar' },
          fields: [qator(matn('v', 'Raqam', { majburiy: true, tilli: false, kenglik: '30%', namuna: '1 287' }), matn('t', 'Izoh', { majburiy: true, kenglik: '70%' }))],
        },
      ],
    },
    {
      name: 'years',
      label: 'Yillar bo‘yicha natijalar',
      type: 'array',
      labels: { singular: 'Yil', plural: 'Yillar' },
      fields: [
        matn('y', 'Yil', { majburiy: true, tilli: false, namuna: '2026' }),
        {
          name: 'items',
          label: 'Natijalar',
          type: 'array',
          labels: { singular: 'Natija', plural: 'Natijalar' },
          fields: [qator(uzunMatn('text', 'Natija', { majburiy: true, qator: 2, kenglik: '75%' }), son('post', 'Post', { kenglik: '25%' }))],
        },
      ],
    },
  ],
}
