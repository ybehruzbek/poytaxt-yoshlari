import type { GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { havola, kod, matn, qator, son, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

/**
 * Aloqa maʼlumotlari: manzil, xarita nuqtasi, telefonlar, poçtalar, iş vaqti, matbuot xizmati, murojaatlar qonuni.
 * Boğlaniş sahifalari, sayt pastki qismi, press-relizlar va FAQ javoblari şu yerdan oladi.
 */
export const Aloqa: GlobalConfig = {
  slug: 'aloqa',
  label: 'Aloqa maʼlumotlari',
  admin: {
    group: G.boglanish,
    description:
      'Manzil, telefonlar, poçta va iş vaqti. Özgartirilsa, “Boğlaniş” sahifalari, sayt pastki qismi va “Köp beriladigan savollar” javoblari özi yangilanadi.',
    preview: (_d, { locale }) => saytManzil('/boglanish/aloqa', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/'], true),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Manzil va xarita',
          fields: [
            {
              name: 'address',
              label: 'Manzil',
              type: 'group',
              fields: [
                matn('full', 'Rasmiy töliq manzil', { majburiy: true }),
                matn('line', 'Qisqa manzil', { majburiy: true }),
                qator(matn('city', 'Şahar va tuman', { kenglik: '50%' }), matn('street', 'Köça va uy', { kenglik: '50%' })),
                matn('landmark', 'Möljal', { namuna: 'Toşkent şahar Yoşlar markazi binosi' }),
                qator(matn('metro', 'Eng yaqin metro bekati', { kenglik: '50%' }), matn('walk', 'Piyoda masofa', { kenglik: '50%' })),
              ],
            },
            {
              name: 'coords',
              label: 'Xaritadagi nuqta',
              type: 'group',
              admin: { description: 'Yandex yoki Google xaritadan olingan koordinata (masalan, 41.35214 va 69.20496).' },
              fields: [qator({ ...son('lat', 'Kenglik (lat)', { majburiy: true, kenglik: '50%' }), admin: { width: '50%', step: 0.00001 } }, { ...son('lon', 'Uzunlik (lon)', { majburiy: true, kenglik: '50%' }), admin: { width: '50%', step: 0.00001 } })],
            },
          ],
        },
        {
          label: 'Telefon, poçta, iş vaqti',
          fields: [
            { name: 'phones', label: 'Telefonlar', type: 'array', labels: { singular: 'Telefon', plural: 'Telefonlar' }, fields: [kod('v', 'Raqam', { majburiy: true, namuna: '+998 71 246-10-70' })] },
            { name: 'emails', label: 'Elektron poçtalar', type: 'array', labels: { singular: 'Poçta', plural: 'Poçtalar' }, admin: { description: 'Birinçisi — asosiy poçta.' }, fields: [kod('v', 'Manzil', { majburiy: true })] },
            {
              name: 'hours',
              label: 'Iş vaqti',
              type: 'group',
              fields: [qator(matn('days', 'Iş kunlari', { kenglik: '35%', namuna: 'Duşanba — juma' }), kod('time', 'Vaqti', { kenglik: '25%', namuna: '09:00 — 18:00' }), matn('off', 'Dam oliş kunlari', { kenglik: '40%' }))],
            },
            {
              name: 'socials',
              label: 'Ijtimoiy tarmoqlardagi nomlar',
              type: 'array',
              labels: { singular: 'Tarmoq', plural: 'Tarmoqlar' },
              admin: { description: 'Boğlaniş sahifasida körinadigan nomlar (havolalarning özi “Ijtimoiy tarmoqlar” sozlamasida).' },
              fields: [qator({ name: 'net', label: 'Tarmoq', type: 'select', required: true, options: ['Telegram', 'Instagram', 'Facebook'].map((v) => ({ label: v, value: v })), admin: { width: '25%' } }, kod('handle', 'Nomi', { kenglik: '30%' }), { ...havola('href', 'Havola', { majburiy: true }), admin: { width: '45%', placeholder: 'https://' } })],
            },
          ],
        },
        {
          label: 'Matbuot xizmati',
          fields: [
            {
              name: 'press',
              label: 'Jurnalistlar uçun aloqa',
              type: 'group',
              fields: [matn('unit', 'Bölim', { namuna: 'Axborot xizmati bölimi' }), qator(kod('phone', 'Telefon', { kenglik: '33%' }), kod('email', 'Poçta', { kenglik: '33%' }), kod('telegram', 'Telegram', { kenglik: '34%', namuna: '@poytaxtyoshlari_yi' }))],
            },
          ],
        },
        {
          label: 'Murojaatlar qonuni',
          fields: [
            {
              name: 'law',
              label: 'Murojaatlar töğrisidagi qonun',
              type: 'group',
              fields: [
                matn('title', 'Qonun nomi', { majburiy: true }),
                havola('href', 'Rasmiy matni (lex.uz)'),
                { name: 'terms', label: 'Körib çiqiş muddatlari', type: 'array', labels: { singular: 'Muddat', plural: 'Muddatlar' }, fields: [qator(matn('v', 'Muddat', { majburiy: true, kenglik: '25%' }), uzunMatn('t', 'Izoh', { majburiy: true, qator: 2, kenglik: '75%' }))] },
                { name: 'types', label: 'Murojaat turlari', type: 'array', labels: { singular: 'Tur', plural: 'Turlar' }, fields: [qator(matn('t', 'Turi', { majburiy: true, kenglik: '25%' }), uzunMatn('d', 'Tavsif', { majburiy: true, qator: 2, kenglik: '75%' }))] },
              ],
            },
          ],
        },
      ],
    },
  ],
}
