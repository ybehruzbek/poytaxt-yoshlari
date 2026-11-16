import type { CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { FAQ_CATS } from '@/components/faq/data'
import { bandlar, kod, manzilNomi, matn, qator, tanlov } from '@/fields'
import { saytManzil, yangilash } from '@/lib/revalidate'

/** “Köp beriladigan savollar” */
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'Savol', plural: 'Köp beriladigan savollar' },
  orderable: true,
  admin: {
    group: G.boglanish,
    useAsTitle: 'q',
    defaultColumns: ['q', 'cat', 'home', 'azolik'],
    listSearchableFields: ['q'],
    description:
      'Saytdagi “Köp beriladigan savollar” sahifasi. Javobda {TELEFONLAR}, {POÇTA}, {MANZIL}, {MÖLJAL}, {IŞ_VAQTI} yozilsa, “Aloqa maʼlumotlari”dagi joriy qiymat qöyiladi.',
    preview: (_d, { locale }) => saytManzil('/boglanish/savollar', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/'], true),
  fields: [
    matn('q', 'Savol', { majburiy: true }),
    tanlov('cat', 'Mavzu', FAQ_CATS.map((c) => ({ label: c.t, value: c.k })), { majburiy: true }),
    bandlar('a', 'Javob (xatboşilar)', { band: 'Xatboşi' }),
    bandlar('li', 'Javob içidagi röyxat (ixtiyoriy)', { band: 'Band' }),
    {
      name: 'more',
      label: 'Batafsil sahifa (ixtiyoriy)',
      type: 'group',
      fields: [qator(kod('href', 'Sahifa yöli', { kenglik: '50%', namuna: '/boglanish/azo-bolish' }), matn('label', 'Havola matni', { kenglik: '50%' }))],
    },
    { name: 'home', label: 'Boş sahifada körsatiş', type: 'checkbox', admin: { position: 'sidebar' } },
    { name: 'azolik', label: 'Ittifoq sahifasidagi aʼzolik bölimida körsatiş', type: 'checkbox', admin: { position: 'sidebar' } },
    manzilNomi('q'),
  ],
}
