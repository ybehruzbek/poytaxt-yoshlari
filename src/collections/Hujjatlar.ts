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
    description: '“Normativ-huquqiy hujjatlar” sahifasidagi bölimlar (masalan, “Yoşlarga oid davlat siyosati”).',
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
    uzunMatn('d', 'Qisqaça mazmuni', { majburiy: true, qator: 3 }),
    qator(matn('org', 'Qabul qilgan organ', { majburiy: true, kenglik: '60%' }), kod('no', 'Raqami', { kenglik: '40%', namuna: 'PF-6017' })),
    uzunMatn('name', 'Rasmiy nomi (“… töğrisida”)', { qator: 2 }),
    havola('href', 'Rasmiy matni (lex.uz)'),
    tanlov('for', 'Kimlarga tegişli', AUDIENCES.map((a) => ({ label: a.t, value: a.k })), { köp: true, izoh: '“Yoşlarga yaratilgan imkoniyatlar” guruhidagi saralaş uçun.' }),
    {
      type: 'collapsible',
      label: 'Qöşimça (rasmiy nom yasaş uçun)',
      admin: { initCollapsed: true },
      fields: [
        qator(matn('by', 'Organ (qaratqiç kelişigida)', { kenglik: '50%' }), matn('kw', 'Hujjat turi (nom içida)', { kenglik: '50%' })),
        qator(kod('reg', 'Adliya vazirligida röyxat raqami', { kenglik: '50%' }), kod('noT', 'Nomdagi raqam (farqli bölsa)', { kenglik: '50%' })),
      ],
    },
  ],
}

const DOC_TURI = [
  { label: 'Qaror', value: 'qaror' },
  { label: 'Farmoyiş', value: 'farmoyish' },
  { label: 'Iş rejasi', value: 'reja' },
  { label: 'Hisobot', value: 'hisobot' },
  { label: 'Nizom', value: 'nizom' },
  { label: 'Boşqa', value: 'boshqa' },
]

export const KengashDocs: CollectionConfig = {
  slug: 'kengash-docs',
  labels: { singular: 'Kengaş hujjati', plural: 'Kengaş hujjatlari' },
  admin: {
    group: G.hujjatlar,
    useAsTitle: 't',
    defaultColumns: ['t', 'kind', 'date', 'no'],
    description: 'Saytdagi “Kengaş hujjatlari” sahifasi: qarorlar, rejalar, hisobotlar. Fayl (PDF yoki Word) yuklanadi, fuqarolar uni yuklab oladi.',
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
    uzunMatn('d', 'Qisqaça mazmuni', { qator: 3 }),
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
    matn('t', 'Namuna nomi', { majburiy: true, namuna: 'Ittifoqqa aʼzo böliş uçun ariza namunasi' }),
    tanlov('cat', 'Toifa', [
      { label: 'Aʼzolik', value: 'azolik' },
      { label: 'Murojaat', value: 'murojaat' },
      { label: 'Boşlanğiç taşkilot', value: 'boshlangich' },
      { label: 'Boşqa', value: 'boshqa' },
    ], { majburiy: true }),
    uzunMatn('d', 'Qaçon kerak böladi', { qator: 2 }),
    fayl('file', 'Fayl', { majburiy: true }),
  ],
}
