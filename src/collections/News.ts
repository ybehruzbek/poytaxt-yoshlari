import { type CollectionConfig, slugField } from 'payload'

import { imloMatn, imloRichText } from '../lib/imlo-hook'
import { slugifyUz } from '../lib/slugify'

export const NEWS_CATEGORIES = [
  { label: 'Kengaş faoliyati', value: 'kengash' },
  { label: 'Boşlanğiç taşkilotlar', value: 'boshlangich' },
  { label: 'Imkoniyatlar', value: 'imkoniyat' },
  { label: 'Tadbir', value: 'tadbir' },
] as const

/** Yangiliklar. Saytda faqat "e'lon qilingan" (published) yangiliklar ko'rinadi. */
export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Yangilik', plural: 'Yangiliklar' },
  admin: {
    group: 'Kontent',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true },
  access: {
    // mehmonlar faqat e'lon qilinganlarni ko'radi, xodimlar — hammasini
    read: ({ req: { user } }) => (user ? true : { _status: { equals: 'published' } }),
    create: ({ req: { user } }) => !!user && user.role !== 'operator',
    update: ({ req: { user } }) => !!user && user.role !== 'operator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      label: 'Sarlavha',
      type: 'text',
      required: true,
      localized: true,
      hooks: { beforeChange: [imloMatn] },
    },
    slugField({
      useAsSlug: 'title',
      slugify: ({ valueToSlugify }) => (typeof valueToSlugify === 'string' ? slugifyUz(valueToSlugify) : undefined),
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Turkum',
          type: 'select',
          required: true,
          defaultValue: 'kengash',
          options: NEWS_CATEGORIES.map((c) => ({ ...c })),
        },
        {
          name: 'publishedAt',
          label: 'Sana',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: { date: { pickerAppearance: 'dayAndTime' } },
          index: true,
        },
      ],
    },
    { name: 'image', label: 'Asosiy rasm', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imageCaption',
      label: 'Rasm izohi (ixtiyoriy)',
      type: 'text',
      localized: true,
      hooks: { beforeChange: [imloMatn] },
    },
    {
      name: 'excerpt',
      label: 'Qisqa matn (boş sahifa uçun)',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 320,
      hooks: { beforeChange: [imloMatn] },
    },
    { name: 'content', label: 'Töliq matn', type: 'richText', localized: true, hooks: { beforeChange: [imloRichText] } },
    {
      name: 'gallery',
      label: 'Fotogalereya (ixtiyoriy)',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      maxRows: 24,
    },
    {
      type: 'row',
      fields: [
        { name: 'author', label: 'Muallif', type: 'relationship', relationTo: 'authors' },
        {
          name: 'tags',
          label: 'Teglar',
          type: 'text',
          hasMany: true,
          maxRows: 12,
          admin: { description: 'Har bir tegni alohida kiriting, masalan: Kitobxonlik, Talabalar' },
        },
      ],
    },
    {
      name: 'source',
      label: 'Manba havolasi (masalan, Telegram post)',
      type: 'text',
      validate: (v: unknown) =>
        !v || (typeof v === 'string' && /^https:\/\/[^\s]+$/.test(v)) || 'Havola https:// bilan boşlansin',
    },
  ],
}
