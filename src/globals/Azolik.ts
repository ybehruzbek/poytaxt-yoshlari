import type { GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, kod, matn, qator, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

const band = kod('band', 'Ustav bandi', { kenglik: '20%', namuna: '4.2', izoh: 'Ustav sahifasidagi şu bandga havola qöyiladi.' })

/** “Aʼzo böliş” sahifasi: aʼzolik şartlari, arizani körib çiqiş tartibi, ariza yuborilgaç keyingi bosqiçlar */
export const AzolikSahifa: GlobalConfig = {
  slug: 'azolik-sahifa',
  label: 'Aʼzo böliş sahifasi',
  admin: {
    group: G.boglanish,
    description: 'Saytdagi “Aʼzo böliş” sahifasi matnlari. Kelgan arizalar “Murojaatlar → Aʼzolik arizalari” bölimida.',
    preview: (_d, { locale }) => saytManzil('/boglanish/azo-bolish', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/boglanish/azo-bolish']),
  fields: [
    {
      name: 'conditions',
      label: 'Kim aʼzo bölişi mumkin (şartlar)',
      type: 'array',
      labels: { singular: 'Şart', plural: 'Şartlar' },
      fields: [qator(matn('k', 'Qisqa belgisi', { majburiy: true, kenglik: '30%', namuna: '14–30' }), matn('t', 'Nomi', { kenglik: '30%', namuna: 'Yoş' }), band), uzunMatn('d', 'Izoh', { majburiy: true, qator: 2 })],
    },
    {
      name: 'steps',
      label: 'Arizani körib çiqiş tartibi',
      type: 'array',
      labels: { singular: 'Bosqiç', plural: 'Bosqiçlar' },
      fields: [qator(matn('t', 'Bosqiç nomi', { majburiy: true, kenglik: '80%' }), band), uzunMatn('d', 'Izoh', { majburiy: true, qator: 2 })],
    },
    bandlar('after', 'Ariza yuborilgaç körsatiladigan keyingi bosqiçlar', { band: 'Bosqiç' }),
  ],
}
