import type { GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, kod, matn, qator, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

const band = kod('band', 'Ustav bandi', { kenglik: '20%', namuna: '4.2', izoh: 'Ustav sahifasidagi shu bandga havola qo‘yiladi.' })

/** “Aʼzo böliş” sahifasi: aʼzolik şartlari, arizani körib çiqiş tartibi, ariza yuborilgaç keyingi bosqiçlar */
export const AzolikSahifa: GlobalConfig = {
  slug: 'azolik-sahifa',
  label: 'A’zo bo‘lish sahifasi',
  admin: {
    group: G.boglanish,
    description: 'Saytdagi “A’zo bo‘lish” sahifasi matnlari. Kelgan arizalar “Murojaatlar → A’zolik arizalari” bo‘limida.',
    preview: (_d, { locale }) => saytManzil('/boglanish/azo-bolish', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/boglanish/azo-bolish']),
  fields: [
    {
      name: 'conditions',
      label: 'Kim a’zo bo‘lishi mumkin (shartlar)',
      type: 'array',
      labels: { singular: 'Shart', plural: 'Shartlar' },
      fields: [qator(matn('k', 'Qisqa belgisi', { majburiy: true, kenglik: '30%', namuna: '14–30' }), matn('t', 'Nomi', { kenglik: '30%', namuna: 'Yosh' }), band), uzunMatn('d', 'Izoh', { majburiy: true, qator: 2 })],
    },
    {
      name: 'steps',
      label: 'Arizani ko‘rib chiqish tartibi',
      type: 'array',
      labels: { singular: 'Bosqich', plural: 'Bosqichlar' },
      fields: [qator(matn('t', 'Bosqich nomi', { majburiy: true, kenglik: '80%' }), band), uzunMatn('d', 'Izoh', { majburiy: true, qator: 2 })],
    },
    bandlar('after', 'Ariza yuborilgach ko‘rsatiladigan keyingi bosqichlar', { band: 'Bosqich' }),
  ],
}
