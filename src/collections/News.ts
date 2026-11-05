import { type CollectionConfig, slugField } from 'payload'

import { slugifyUz } from '../lib/slugify'

export const NEWS_CATEGORIES = [
  { label: 'Kengash faoliyati', value: 'kengash' },
  { label: 'Boshlang‘ich tashkilotlar', value: 'boshlangich' },
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
    { name: 'title', label: 'Sarlavha', type: 'text', required: true, localized: true },
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
      name: 'excerpt',
      label: 'Qisqa matn (bosh sahifa uchun)',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 320,
    },
    { name: 'content', label: 'To‘liq matn', type: 'richText', localized: true },
  ],
}
