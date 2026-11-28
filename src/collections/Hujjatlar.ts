import type { CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { boglanma, fayl, havola, kod, manzilNomi, matn, qator, sana, tanlov, uzunMatn } from '@/fields'
import { AUDIENCES } from '@/components/hujjatlar/data'
import { saytManzil, yangilash } from '@/lib/revalidate'

/** “Hujjatlar”: normativ-huquqiy hujjatlar (guruhlar böyiça), Kengaş hujjatlari, hujjat namunalari */

export const ActGroups: CollectionConfig = {
  slug: 'act-groups',
  labels: { singular: 'Hujjatlar guruhi', plural: 'Normativ hujjatlar guruhlari' },
  orderable: true,
  admin: {
    group: G.hujjatlar,
    useAsTitle: 't',
    defaultColumns: ['t'],
    description: '“Normativ-huquqiy hujjatlar” sahifasidagi bo‘limlar (masalan, “Yoshlarga oid davlat siyosati”).',
    preview: (_d, { locale }) => saytManzil('/hujjatlar/normativ', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/hujjatlar/normativ']),
  fields: [matn('t', 'Guruh nomi', { majburiy: true }), uzunMatn('lead', 'Qisqa izoh', { qator: 2 }), manzilNomi('t')],
}

export const Acts: CollectionConfig = {
  slug: 'acts',
  labels: { singular: 'Normativ hujjat', plural: 'Normativ hujjatlar' },
  orderable: true,
  admin: {
    group: G.hujjatlar,
    useAsTitle: 't',
    defaultColumns: ['t', 'kind', 'y', 'grp'],
    listSearchableFields: ['t', 'name', 'no'],
    description: 'Saytdagi “Normativ-huquqiy hujjatlar” sahifasi. Har bir hujjat lex.uz dagi rasmiy matniga havola bilan.',
    preview: (_d, { locale }) => saytManzil('/hujjatlar/normativ', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/hujjatlar/normativ']),
  fields: [
    qator(
      { ...boglanma('grp', 'Guruh', 'act-groups', { majburiy: true }), admin: { width: '50%' } },
      tanlov('kind', 'Turi', [
        { label: 'Qonun', value: 'Qonun' },
        { label: 'Farmon', value: 'Farmon' },
        { label: 'Qaror', value: 'Qaror' },
        { label: 'Ustav', value: 'Ustav' },
      ], { majburiy: true, kenglik: '25%' }),
      kod('y', 'Qabul sanasi', { kenglik: '25%', namuna: '14.09.2016' }),
    ),
    matn('t', 'Qisqa nomi (kartada)', { majburiy: true, namuna: 'Prezidentning PF-6017-son Farmoni' }),
    uzunMatn('d', 'Qisqacha mazmuni', { majburiy: true, qator: 3 }),
    qator(matn('org', 'Qabul qilgan organ', { majburiy: true, kenglik: '60%' }), kod('no', 'Raqami', { kenglik: '40%', namuna: 'PF-6017' })),
    uzunMatn('name', 'Rasmiy nomi (“… to‘g‘risida”)', { qator: 2 }),
    havola('href', 'Rasmiy matni (lex.uz)'),
    tanlov('for', 'Kimlarga tegishli', AUDIENCES.map((a) => ({ label: a.t, value: a.k })), { köp: true, izoh: '“Yoshlarga yaratilgan imkoniyatlar” guruhidagi saralash uchun.' }),
    {
      type: 'collapsible',
      label: 'Qo‘shimcha (rasmiy nom yasash uchun)',
      admin: { initCollapsed: true },
      fields: [
        qator(matn('by', 'Organ (qaratqich kelishigida)', { kenglik: '50%' }), matn('kw', 'Hujjat turi (nom ichida)', { kenglik: '50%' })),
        qator(kod('reg', 'Adliya vazirligida ro‘yxat raqami', { kenglik: '50%' }), kod('noT', 'Nomdagi raqam (farqli bo‘lsa)', { kenglik: '50%' })),
      ],
    },
  ],
}

const DOC_TURI = [
  { label: 'Qaror', value: 'qaror' },
  { label: 'Farmoyish', value: 'farmoyish' },
  { label: 'Ish rejasi', value: 'reja' },
  { label: 'Hisobot', value: 'hisobot' },
  { label: 'Nizom', value: 'nizom' },
  { label: 'Boshqa', value: 'boshqa' },
]

export const KengashDocs: CollectionConfig = {
  slug: 'kengash-docs',
  labels: { singular: 'Kengash hujjati', plural: 'Kengash hujjatlari' },
  admin: {
    group: G.hujjatlar,
    useAsTitle: 't',
    defaultColumns: ['t', 'kind', 'date', 'no'],
    description: 'Saytdagi “Kengash hujjatlari” sahifasi: qarorlar, rejalar, hisobotlar. Fayl (PDF yoki Word) yuklanadi, fuqarolar uni yuklab oladi.',
    preview: (_d, { locale }) => saytManzil('/hujjatlar/kengash', locale),
    hidden: kontentYashirin,
  },
  defaultSort: '-date',
  access: kontent,
  hooks: yangilash(['/hujjatlar/kengash']),
  fields: [
    matn('t', 'Hujjat nomi', { majburiy: true }),
    qator(
      tanlov('kind', 'Turi', DOC_TURI, { majburiy: true, kenglik: '34%' }),
      { ...sana('date', 'Sanasi', { majburiy: true }), admin: { width: '33%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } },
      kod('no', 'Raqami', { kenglik: '33%', namuna: '01-04/947' }),
    ),
    uzunMatn('d', 'Qisqacha mazmuni', { qator: 3 }),
    fayl('file', 'Fayl', { majburiy: true }),
  ],
}

export const Templates: CollectionConfig = {
  slug: 'templates',
  labels: { singular: 'Hujjat namunasi', plural: 'Hujjat namunalari' },
  orderable: true,
  admin: {
    group: G.hujjatlar,
    useAsTitle: 't',
    defaultColumns: ['t', 'cat'],
    description: 'Saytdagi “Hujjat namunalari” sahifasi: ariza va blanka namunalari (yuklab olinadi).',
    preview: (_d, { locale }) => saytManzil('/hujjatlar/namunalar', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/hujjatlar/namunalar']),
  fields: [
    matn('t', 'Namuna nomi', { majburiy: true, namuna: 'Ittifoqqa a’zo bo‘lish uchun ariza namunasi' }),
    tanlov('cat', 'Toifa', [
      { label: 'A’zolik', value: 'azolik' },
      { label: 'Murojaat', value: 'murojaat' },
      { label: 'Boshlang‘ich tashkilot', value: 'boshlangich' },
      { label: 'Boshqa', value: 'boshqa' },
    ], { majburiy: true }),
    uzunMatn('d', 'Qachon kerak bo‘ladi', { qator: 2 }),
    fayl('file', 'Fayl', { majburiy: true }),
  ],
}
