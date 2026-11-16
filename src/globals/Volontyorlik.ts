import type { GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, havola, matn, qator, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

/** “Volontyorlik” sahifasi: raqamlar, volontyor böliş tartibi, huquq va majburiyatlar, yönaliş tanlaş testi */
export const VolontyorlikSahifa: GlobalConfig = {
  slug: 'volontyorlik-sahifa',
  label: 'Volontyorlik sahifasi',
  admin: {
    group: G.faoliyat,
    description:
      'Saytdagi “Volontyorlik” sahifasi matnlari. Yönalişlar — “Volontyorlik yönalişlari” bölimida, kelgan arizalar — “Murojaatlar → Volontyorlar”.',
    preview: (_d, { locale }) => saytManzil('/faoliyat/volontyorlik', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/faoliyat/volontyorlik']),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Raqamlar va tartib',
          fields: [
            {
              name: 'stats',
              label: 'Sarlavha ostidagi raqamlar',
              type: 'array',
              labels: { singular: 'Raqam', plural: 'Raqamlar' },
              admin: { description: 'Raqam örnida {TADBIRLAR} yozilsa, saytdagi volontyorlik tadbirlari soni özi qöyiladi.' },
              fields: [qator(matn('v', 'Raqam', { majburiy: true, tilli: false, kenglik: '25%', namuna: '1 287' }), matn('t', 'Izoh', { majburiy: true, kenglik: '75%' }))],
            },
            {
              name: 'steps',
              label: 'Volontyor böliş tartibi',
              type: 'array',
              labels: { singular: 'Bosqiç', plural: 'Bosqiçlar' },
              fields: [matn('t', 'Bosqiç nomi', { majburiy: true }), uzunMatn('d', 'Izoh', { majburiy: true, qator: 2 })],
            },
            bandlar('times', 'Ariza şaklidagi bandlik vaqtlari', { band: 'Variant' }),
          ],
        },
        {
          label: 'Qonun, huquq va majburiyatlar',
          fields: [
            {
              name: 'law',
              label: 'Qonun',
              type: 'group',
              fields: [matn('t', 'Qonun nomi', { majburiy: true }), qator(matn('no', 'Raqami va sanasi', { kenglik: '40%', namuna: 'ÖRQ–585, 2019-yil 2-dekabr' }), { ...havola('url', 'Rasmiy matni (lex.uz)'), admin: { width: '60%' } })],
            },
            bandlar('rights', 'Volontyor huquqlari', { band: 'Huquq' }),
            bandlar('duties', 'Volontyor majburiyatlari', { band: 'Majburiyat' }),
          ],
        },
        {
          label: 'Yönaliş tanlaş testi',
          fields: [
            {
              name: 'quiz',
              label: 'Test savollari',
              type: 'array',
              labels: { singular: 'Savol', plural: 'Savollar' },
              admin: { description: 'Har bir javob tanlangan yönalişlarga bir ball beradi; eng köp ball olgan yönalişlar natijada körsatiladi.' },
              fields: [
                matn('q', 'Savol', { majburiy: true }),
                {
                  name: 'a',
                  label: 'Javoblar',
                  type: 'array',
                  labels: { singular: 'Javob', plural: 'Javoblar' },
                  fields: [qator(matn('t', 'Javob', { majburiy: true, kenglik: '50%' }), { name: 'dirs', label: 'Qaysi yönalişlarga mos', type: 'relationship', relationTo: 'vol-directions', hasMany: true, required: true, admin: { width: '50%' } })],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
