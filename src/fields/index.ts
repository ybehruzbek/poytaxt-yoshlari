import {
  type ArrayField,
  type DateField,
  type Field,
  type GroupField,
  type NumberField,
  type RelationshipField,
  type RichTextField,
  type SelectField,
  type TextareaField,
  type TextField,
  type UploadField,
  slugField,
} from 'payload'

import { imloMatn, imloRichText } from '@/lib/imlo-hook'
import { slugifyUz } from '@/lib/slugify'

/**
 * Admin panel maydon andozalari — barça bölimlarda maydonlar bir xil körinadi va işlaydi:
 * özbekça nom va izoh, yangi alifboga avtomatik ögiriş (imlo hook), sayt tillari (uz/ru/en) uçun `localized`.
 * Xodim uçun izohlar qisqa va aniq: “nima yoziladi” va “saytda qayerda çiqadi”.
 */
type Base = {
  /** maydon izohi — xodimga yöl-yöriq */
  izoh?: string
  majburiy?: boolean
  /** tillar böyiça alohida qiymat (sukut: ha) */
  tilli?: boolean
  /** forma yonidagi ustunda körsatiş (texnik yoki qöşimça maydonlar) */
  yonda?: boolean
  /** maydon kengligi qator içida, masalan '50%' */
  kenglik?: string
  namuna?: string
}

const admin = (o: Base) => ({
  ...(o.izoh ? { description: o.izoh } : {}),
  ...(o.yonda ? { position: 'sidebar' as const } : {}),
  ...(o.kenglik ? { width: o.kenglik } : {}),
  ...(o.namuna ? { placeholder: o.namuna } : {}),
})

/** Bir qatorli matn */
export const matn = (name: string, label: string, o: Base & { maks?: number } = {}): TextField => ({
  name,
  label,
  type: 'text',
  required: o.majburiy,
  localized: o.tilli ?? true,
  maxLength: o.maks,
  admin: admin(o),
  hooks: { beforeChange: [imloMatn] },
})

/** Texnik qiymat (manzil qismi, kod): yangi alifboga ögirilmaydi, tillar böyiça bir xil */
export const kod = (name: string, label: string, o: Base = {}): TextField => ({
  name,
  label,
  type: 'text',
  required: o.majburiy,
  admin: admin(o),
})

/** Bir necha qatorli matn (xatboşisiz) */
export const uzunMatn = (name: string, label: string, o: Base & { qator?: number; maks?: number } = {}): TextareaField => ({
  name,
  label,
  type: 'textarea',
  required: o.majburiy,
  localized: o.tilli ?? true,
  maxLength: o.maks,
  admin: { ...admin(o), rows: o.qator ?? 3 },
  hooks: { beforeChange: [imloMatn] },
})

/** Formatlanadigan matn (xatboşilar, röyxatlar, havolalar) */
export const boyMatn = (name: string, label: string, o: Base = {}): RichTextField => ({
  name,
  label,
  type: 'richText',
  required: o.majburiy,
  localized: o.tilli ?? true,
  admin: admin(o),
  hooks: { beforeChange: [imloRichText] },
})

/** Rasm (Media kutubxonasidan tanlanadi yoki yangi yuklanadi) */
export const rasm = (name: string, label: string, o: Base = {}): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required: o.majburiy,
  // röyxat ustuni sifatida tanlansa — kiçik surat
  admin: { ...admin(o), components: { Cell: '@/components/admin/ThumbCell#ThumbCell' } },
})

/** Bir nechta rasm (galereya) */
export const rasmlar = (name: string, label: string, o: Base = {}): UploadField => ({
  ...rasm(name, label, o),
  hasMany: true,
})

/** Fayl (PDF, Word) — hujjatlar uçun */
export const fayl = (name: string, label: string, o: Base = {}): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'files',
  required: o.majburiy,
  admin: admin(o),
})

/** Taşqi havola: faqat https:// bilan boşlanadigan töliq manzil */
export const havola = (name: string, label: string, o: Base = {}): TextField => ({
  name,
  label,
  type: 'text',
  required: o.majburiy,
  admin: { ...admin({ namuna: 'https://', ...o }) },
  validate: (v: string | null | undefined) => {
    if (!v) return o.majburiy ? 'Havolani kiriting.' : true
    // taşqi havola (https://…) yoki sayt içidagi sahifa (/hujjatlar/…)
    return /^(https?:\/\/[^\s]+\.[^\s]+|\/[^\s]*)$/.test(v.trim()) || 'Töliq havola kiriting, masalan: https://lex.uz/docs/123'
  },
})

/** Sana (kun aniqligida) */
export const sana = (name: string, label: string, o: Base = {}): DateField => ({
  name,
  label,
  type: 'date',
  required: o.majburiy,
  admin: { ...admin(o), date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
})

/** Son */
export const son = (name: string, label: string, o: Base & { min?: number } = {}): NumberField => ({
  name,
  label,
  type: 'number',
  required: o.majburiy,
  min: o.min,
  admin: admin(o),
})

/** Tanlov: variantlar özbekça nom bilan */
export const tanlov = (
  name: string,
  label: string,
  options: readonly { label: string; value: string }[],
  o: Base & { köp?: boolean; sukut?: string } = {},
): SelectField => ({
  name,
  label,
  type: 'select',
  options: options.map((x) => ({ label: x.label, value: x.value })),
  required: o.majburiy,
  hasMany: o.köp,
  defaultValue: o.sukut,
  admin: admin(o),
})

/** Matnlar röyxati (bandlar): har bir band — bitta qator */
export const bandlar = (name: string, label: string, o: Base & { band?: string } = {}): ArrayField => ({
  name,
  label,
  type: 'array',
  labels: { singular: o.band ?? 'Band', plural: label },
  admin: { ...admin(o), initCollapsed: false },
  fields: [uzunMatn('t', o.band ?? 'Band', { qator: 2, majburiy: true })],
})

/** Boşqa töplamdagi yozuv(lar)ga bağlanma */
export const boglanma = (
  name: string,
  label: string,
  relationTo: string,
  o: Base & { köp?: boolean } = {},
): RelationshipField =>
  ({
    name,
    label,
    type: 'relationship',
    relationTo,
    hasMany: o.köp,
    required: o.majburiy,
    admin: admin(o),
  }) as RelationshipField

/**
 * Pul miqdori: asos (BHM, bazaviy stipendiya yoki aniq summa) × koeffitsient. Summa saytda “Miqdorlar”
 * sozlamasidagi joriy BHM / bazaviy stipendiya qiymatidan avtomatik hisoblanadi.
 */
export const stavka = (name: string, label: string, o: Base = {}): GroupField => ({
  name,
  label,
  type: 'group',
  admin: { ...admin(o), hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        tanlov(
          'base',
          'Hisoblaş asosi',
          [
            { label: 'BHM (bazaviy hisoblaş miqdori)', value: 'bhm' },
            { label: 'Bazaviy stipendiya', value: 'stip' },
            { label: 'Aniq summa (söm)', value: 'som' },
          ],
          { majburiy: o.majburiy, kenglik: '50%' },
        ),
        {
          ...son('k', 'Neça barobar (yoki summa)', { majburiy: o.majburiy, kenglik: '50%' }),
          admin: {
            width: '50%',
            description: 'Masalan: 3 — BHMning 3 barobari; aniq summa tanlansa — sömdagi summa.',
            step: 0.01,
          },
        } as NumberField,
      ],
    },
  ],
})

/** Saytdagi manzil uçun qisqa nom (slug) — sarlavhadan avtomatik */
export const manzilNomi = (from = 'title') =>
  slugField({
    useAsSlug: from,
    slugify: ({ valueToSlugify }) => (typeof valueToSlugify === 'string' ? slugifyUz(valueToSlugify) : undefined),
    // xodimga tuşunarli nom va izoh: “slug” — sahifa manzilining oxirgi qismi
    overrides: (row) => ({
      ...row,
      fields: row.fields.map((f) =>
        'name' in f && f.name === 'slug'
          ? {
              ...f,
              label: 'Sahifa manzili',
              admin: {
                ...f.admin,
                description: 'Sarlavhadan avtomatik yasaladi. Özgartiriş uçun “Blokdan çiqariş” tugmasini bosing.',
              },
            }
          : f,
      ) as Field[],
    }),
  }) as Field

/** Ikki-uç maydonni bir qatorga joylaş */
export const qator = (...fields: Field[]): Field => ({ type: 'row', fields })
