import type { Field, GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, kod, matn, qator, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

const opp = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [matn('lead', 'Qisqa shior (kartada)', { majburiy: true }), uzunMatn('desc', 'Kengaytirilganda chiqadigan izoh', { majburiy: true, qator: 2 })],
})

/** Boş sahifa matnlari. Yangiliklar, tadbirlar, raqamlar va röyxatlar özi tegişli bölimlardan olinadi */
export const BoshSahifa: GlobalConfig = {
  slug: 'bosh-sahifa',
  label: 'Bosh sahifa matnlari',
  admin: {
    group: G.bosh,
    description:
      'Saytning bosh sahifasidagi sarlavha va matnlar. Yangiliklar, tadbirlar, OTTlar va hamkorlar soni, savollar o‘zi tegishli bo‘limlardan olinadi.',
    preview: (_d, { locale }) => saytManzil('/', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/']),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bosh ekran',
          fields: [
            {
              name: 'hero',
              label: 'Bosh ekran',
              type: 'group',
              admin: { description: 'Sarlavhada Kengashning to‘liq nomi o‘zgarmaydi.' },
              fields: [matn('kicker', 'Nom ustidagi kichik yozuv', { majburiy: true, namuna: 'Rasmiy veb-sayt' }), uzunMatn('lead', 'Sarlavha ostidagi matn', { majburiy: true, qator: 3 })],
            },
          ],
        },
        {
          label: 'Biz haqimizda',
          fields: [
            {
              name: 'about',
              label: 'Biz haqimizda va raqamlar',
              type: 'group',
              admin: { description: 'OTTdagi boshlang‘ich tashkilotlar va hamkorlar soni ro‘yxatlardan o‘zi hisoblanadi.' },
              fields: [
                uzunMatn('title', 'Katta sarlavha', { majburiy: true, qator: 2 }),
                uzunMatn('text', 'Qisqa matn', { majburiy: true, qator: 3 }),
                qator(kod('year', 'Yil', { kenglik: '25%', namuna: '2017' }), matn('yearLabel', 'Yil izohi', { kenglik: '75%' })),
                qator(matn('ottLabel', 'OTTlar soni izohi', { kenglik: '50%' }), matn('partnersLabel', 'Hamkorlar soni izohi', { kenglik: '50%' })),
              ],
            },
          ],
        },
        {
          label: 'Imkoniyatlar',
          fields: [
            {
              name: 'opps',
              label: '“Yoshlar uchun imkoniyatlar” kartalari',
              type: 'group',
              admin: { description: 'Faol dasturlar soni va eng yaqin muddat tegishli ro‘yxatlardan o‘zi hisoblanadi.' },
              fields: [
                qator(matn('title', 'Sarlavha', { kenglik: '60%', namuna: 'Yoshlar uchun' }), matn('accent', 'Ajratilgan so‘z', { kenglik: '40%', namuna: 'imkoniyatlar' })),
                opp('grant', 'Grantlar'),
                opp('stip', 'Stipendiyalar'),
                opp('vol', 'Volontyorlik'),
                opp('tanlov', 'Tanlovlar'),
              ],
            },
          ],
        },
        {
          label: 'Ittifoq nima beradi',
          fields: [
            {
              name: 'benefits',
              label: '“Ittifoq yoshlarga nima beradi”',
              type: 'group',
              fields: [
                matn('title', 'Sarlavha', { majburiy: true }),
                uzunMatn('lead', 'Kirish matni', { majburiy: true, qator: 3 }),
                {
                  name: 'roles',
                  label: 'Faoliyat turlari (tablar)',
                  type: 'array',
                  labels: { singular: 'Faoliyat turi', plural: 'Faoliyat turlari' },
                  fields: [
                    qator(
                      {
                        name: 'icon',
                        label: 'Ikonka',
                        type: 'select',
                        required: true,
                        options: [
                          { label: 'Yulduz (faol a’zo)', value: 'faol' },
                          { label: 'Inson (yetakchi)', value: 'yetakchi' },
                          { label: 'Yurak (volontyor)', value: 'volontyor' },
                          { label: 'Qalqon (himoya)', value: 'himoya' },
                        ],
                        admin: { width: '25%' },
                      },
                      matn('t', 'Tab nomi', { majburiy: true, kenglik: '30%' }),
                      matn('h', 'Sarlavha', { majburiy: true, kenglik: '45%' }),
                    ),
                    bandlar('items', 'Imkoniyatlar', { band: 'Imkoniyat' }),
                    qator(kod('href', 'Batafsil sahifa yo‘li', { majburiy: true, kenglik: '50%', namuna: '/faoliyat/volontyorlik' }), matn('more', 'Havola matni (ekran o‘quvchilari uchun)', { kenglik: '50%' })),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Murojaat va sarlavhalar',
          fields: [
            {
              name: 'cta',
              label: 'Murojaat bloki',
              type: 'group',
              fields: [
                matn('title', 'Sarlavha', { majburiy: true }),
                uzunMatn('text', 'Matn', { qator: 2 }),
                { name: 'steps', label: 'Bosqichlar', type: 'array', labels: { singular: 'Bosqich', plural: 'Bosqichlar' }, fields: [qator(matn('t', 'Nomi', { majburiy: true, kenglik: '30%' }), matn('d', 'Izoh', { majburiy: true, kenglik: '70%' }))] },
              ],
            },
            {
              name: 'heads',
              label: 'Bo‘lim sarlavhalari',
              type: 'group',
              fields: [qator(matn('news', 'Yangiliklar', { kenglik: '33%' }), matn('events', 'Tadbirlar', { kenglik: '33%' }), matn('faq', 'Savollar', { kenglik: '34%' }))],
            },
          ],
        },
      ],
    },
  ],
}
