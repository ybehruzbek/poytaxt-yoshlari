import type { GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { havola, matn, qator, son } from '@/fields'
import { yangilashGlobal } from '@/lib/revalidate'

/**
 * Pul miqdorlari: BHM, bazaviy stipendiya, rasmiy stipendiya summalari, Markaziy bank stavkasi. Farmon yoki qaror bilan
 * özgarsa, şu yerda yangilanadi — grantlar, stipendiyalar, imtiyozlar, mukofotlar sahifalaridagi summalar va
 * kalkulyatorlar özi qayta hisoblanadi.
 */
export const Miqdorlar: GlobalConfig = {
  slug: 'miqdorlar',
  label: 'Miqdorlar (BHM, stipendiya)',
  admin: {
    group: G.sozlamalar,
    description:
      'Saytdagi barça summalar şu qiymatlardan hisoblanadi. Yangi farmon yoki qaror çiqqanda faqat şu yerni yangilang.',
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/'], true),
  fields: [
    {
      name: 'bhm',
      label: 'Bazaviy hisoblaş miqdori (BHM)',
      type: 'group',
      fields: [
        qator(
          son('v', 'Summa (söm)', { majburiy: true, kenglik: '30%', min: 1 }),
          matn('from', 'Qaçondan', { kenglik: '30%', namuna: '2026-yil 1-sentabr' }),
          matn('act', 'Asos (hujjat)', { kenglik: '40%', namuna: 'Prezidentning … farmoni' }),
        ),
      ],
    },
    {
      name: 'stip',
      label: 'Talabalarning bazaviy stipendiyasi (oyiga)',
      type: 'group',
      fields: [
        qator(
          son('v', 'Summa (söm)', { majburiy: true, kenglik: '30%', min: 1 }),
          matn('from', 'Qaçondan', { kenglik: '30%' }),
          matn('source', 'Manba nomi', { kenglik: '40%' }),
        ),
        havola('url', 'Manba havolasi'),
      ],
    },
    {
      name: 'stipSum',
      label: 'Rasmiy stipendiya summalari (oyiga, söm)',
      type: 'group',
      admin: { description: 'Taʼlim va ilm-fan vazirligi jadvalidagi summalar. Koeffitsientlar şulardan avtomatik hisoblanadi.' },
      fields: [
        qator(
          son('prezident', 'Prezident stipendiyasi', { majburiy: true, kenglik: '33%' }),
          son('nomli', 'Nomli davlat stipendiyalari', { majburiy: true, kenglik: '33%' }),
          son('alo', '“Aʼlo” baholarga öqiydiganlar', { majburiy: true, kenglik: '34%' }),
        ),
      ],
    },
    {
      name: 'mb',
      label: 'Markaziy bankning asosiy stavkasi',
      type: 'group',
      fields: [qator(son('v', 'Stavka (yillik, %)', { majburiy: true, kenglik: '30%' }), matn('from', 'Qaçondan', { kenglik: '30%' })), havola('url', 'Manba havolasi')],
    },
  ],
}
