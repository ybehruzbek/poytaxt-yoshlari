import type { Field, GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, kod, matn, qator, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

const opp = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [matn('lead', 'Qisqa şior (kartada)', { majburiy: true }), uzunMatn('desc', 'Kengaytirilganda çiqadigan izoh', { majburiy: true, qator: 2 })],
})

/** Boş sahifa matnlari. Yangiliklar, tadbirlar, raqamlar va röyxatlar özi tegişli bölimlardan olinadi */
export const BoshSahifa: GlobalConfig = {
  slug: 'bosh-sahifa',
  label: 'Boş sahifa matnlari',
  admin: {
    group: G.bosh,
    description:
      'Saytning boş sahifasidagi sarlavha va matnlar. Yangiliklar, tadbirlar, OTTlar va hamkorlar soni, savollar özi tegişli bölimlardan olinadi.',
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
          label: 'Boş ekran',
          fields: [
            {
              name: 'hero',
              label: 'Boş ekran',
              type: 'group',
              admin: { description: 'Sarlavhada Kengaşning töliq nomi özgarmaydi.' },
              fields: [matn('kicker', 'Nom ustidagi kiçik yozuv', { majburiy: true, namuna: 'Rasmiy veb-sayt' }), uzunMatn('lead', 'Sarlavha ostidagi matn', { majburiy: true, qator: 3 })],
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
              admin: { description: 'OTTdagi boşlanğiç taşkilotlar va hamkorlar soni röyxatlardan özi hisoblanadi.' },
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
              label: '“Yoşlar uçun imkoniyatlar” kartalari',
              type: 'group',
              admin: { description: 'Faol dasturlar soni va eng yaqin muddat tegişli röyxatlardan özi hisoblanadi.' },
              fields: [
                qator(matn('title', 'Sarlavha', { kenglik: '60%', namuna: 'Yoşlar uçun' }), matn('accent', 'Ajratilgan söz', { kenglik: '40%', namuna: 'imkoniyatlar' })),
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
              label: '“Ittifoq yoşlarga nima beradi”',
              type: 'group',
              fields: [
                matn('title', 'Sarlavha', { majburiy: true }),
                uzunMatn('lead', 'Kiriş matni', { majburiy: true, qator: 3 }),
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
                          { label: 'Yulduz (faol aʼzo)', value: 'faol' },
                          { label: 'Inson (yetakçi)', value: 'yetakchi' },
                          { label: 'Yurak (volontyor)', value: 'volontyor' },
                          { label: 'Qalqon (himoya)', value: 'himoya' },
                        ],
                        admin: { width: '25%' },
                      },
                      matn('t', 'Tab nomi', { majburiy: true, kenglik: '30%' }),
                      matn('h', 'Sarlavha', { majburiy: true, kenglik: '45%' }),
                    ),
                    bandlar('items', 'Imkoniyatlar', { band: 'Imkoniyat' }),
                    qator(kod('href', 'Batafsil sahifa yöli', { majburiy: true, kenglik: '50%', namuna: '/faoliyat/volontyorlik' }), matn('more', 'Havola matni (ekran öquvçilari uçun)', { kenglik: '50%' })),
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
                { name: 'steps', label: 'Bosqiçlar', type: 'array', labels: { singular: 'Bosqiç', plural: 'Bosqiçlar' }, fields: [qator(matn('t', 'Nomi', { majburiy: true, kenglik: '30%' }), matn('d', 'Izoh', { majburiy: true, kenglik: '70%' }))] },
              ],
            },
            {
              name: 'heads',
              label: 'Bölim sarlavhalari',
              type: 'group',
              fields: [qator(matn('news', 'Yangiliklar', { kenglik: '33%' }), matn('events', 'Tadbirlar', { kenglik: '33%' }), matn('faq', 'Savollar', { kenglik: '34%' }))],
            },
          ],
        },
      ],
    },
  ],
}
