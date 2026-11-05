import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Rasm / fayl', plural: 'Media' },
  admin: { group: 'Kontent' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user && user.role !== 'operator',
    update: ({ req: { user } }) => !!user && user.role !== 'operator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'alt',
      label: 'Tavsif (alt matn)',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: {
    // Fayllar VPS diskida saqlanadi (O'zbekistonda)
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumb', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 500, position: 'centre' },
      { name: 'hero', width: 1600 },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
}
