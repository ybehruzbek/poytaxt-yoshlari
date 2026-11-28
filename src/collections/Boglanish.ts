import type { CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { FAQ_CATS } from '@/components/faq/data'
import { bandlar, kod, manzilNomi, matn, qator, tanlov } from '@/fields'
import { saytManzil, yangilash } from '@/lib/revalidate'

/** “Köp beriladigan savollar” */
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'Savol', plural: 'Ko‘p beriladigan savollar' },
  orderable: true,
  admin: {
    group: G.boglanish,
    useAsTitle: 'q',
    defaultColumns: ['q', 'cat', 'home', 'azolik'],
    listSearchableFields: ['q'],
    description:
      'Saytdagi “Ko‘p beriladigan savollar” sahifasi. Javobda {TELEFONLAR}, {POCHTA}, {MANZIL}, {MO‘LJAL}, {ISH_VAQTI} yozilsa, “Aloqa ma’lumotlari”dagi joriy qiymat qo‘yiladi.',
    preview: (_d, { locale }) => saytManzil('/boglanish/savollar', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/'], true),
  fields: [
    matn('q', 'Savol', { majburiy: true }),
    tanlov('cat', 'Mavzu', FAQ_CATS.map((c) => ({ label: c.t, value: c.k })), { majburiy: true }),
    bandlar('a', 'Javob (xatboshilar)', { band: 'Xatboshi' }),
    bandlar('li', 'Javob ichidagi ro‘yxat (ixtiyoriy)', { band: 'Band' }),
    {
      name: 'more',
      label: 'Batafsil sahifa (ixtiyoriy)',
      type: 'group',
      fields: [qator(kod('href', 'Sahifa yo‘li', { kenglik: '50%', namuna: '/boglanish/azo-bolish' }), matn('label', 'Havola matni', { kenglik: '50%' }))],
    },
    { name: 'home', label: 'Bosh sahifada ko‘rsatish', type: 'checkbox', admin: { position: 'sidebar' } },
    { name: 'azolik', label: 'Ittifoq sahifasidagi a’zolik bo‘limida ko‘rsatish', type: 'checkbox', admin: { position: 'sidebar' } },
    manzilNomi('q'),
  ],
}
