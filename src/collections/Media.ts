import type { CollectionConfig } from 'payload'
import { kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'

import { imloMatn } from '../lib/imlo-hook'
import { relativeUrls } from '../lib/relative-url'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Rasm', plural: 'Rasmlar kutubxonasi' },
  admin: {
    group: G.sozlamalar,
    hidden: kontentYashirin,
    description: 'Saytdagi barça rasmlar. Papkalar böyiça tartiblangan (Tadbirlar, Loyihalar, Hamkorlar…). Rasm qöşilganda kiçik nusxalari özi yaratiladi.',
  },
  folders: true,
  hooks: { afterRead: [relativeUrls] },
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
      hooks: { beforeChange: [imloMatn] },
    },
  ],
  upload: {
    // Fayllar VPS diskida saqlanadi (O'zbekistonda)
    staticDir: 'media',
    mimeTypes: ['image/*'],
    // telefondan olingan katta surat (4000+ px) saytga şu hajmda çiqmasin: asl nusxa 2000 px gaça kiçraytiriladi
    resizeOptions: { width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      { name: 'thumb', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 500, position: 'centre' },
      { name: 'hero', width: 1600 },
    ],
    formatOptions: { format: 'webp', options: { quality: 90 } },
    // brauzer rasmni bir hafta keşda saqlaydi, keyingi oçilişlarda qayta yuklamaydi;
    // muddat tugagaç ham eski nusxa darhol körsatiladi va fonda yangilanadi
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400')
      return headers
    },
  },
}
