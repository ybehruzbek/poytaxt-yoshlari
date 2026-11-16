import type { CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { imloMatn } from '@/lib/imlo-hook'

/**
 * Saytda yuklab olinadigan hujjat fayllari (PDF, Word, Excel): Kengaş hujjatlari, hujjat namunalari.
 * Ommaga oçiq — fuqarolarning murojaat fayllaridan (Appeals, maxfiy) farqli.
 */
export const Files: CollectionConfig = {
  slug: 'files',
  labels: { singular: 'Fayl', plural: 'Hujjat fayllari' },
  admin: {
    group: G.sozlamalar,
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'filesize', 'updatedAt'],
    description: 'Saytdan yuklab olinadigan PDF, Word va Excel fayllar. Hujjat qöşişda fayl şu yerdan tanlanadi yoki yangisi yuklanadi.',
    hidden: kontentYashirin,
  },
  access: kontent,
  fields: [
    {
      name: 'title',
      label: 'Fayl nomi (saytda körinadi)',
      type: 'text',
      required: true,
      localized: true,
      hooks: { beforeChange: [imloMatn] },
    },
  ],
  upload: {
    staticDir: 'media/files',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/x-cfb',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
}
