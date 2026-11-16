import type { CollectionConfig } from 'payload'
import { kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'

import { imloMatn } from '../lib/imlo-hook'

/** Yangilik mualliflari (Kengaş xodimlari): ism, lavozim, surat — maqola ostida körsatiladi */
export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Muallif', plural: 'Mualliflar' },
  admin: { group: G.yangiliklar, hidden: kontentYashirin, useAsTitle: 'name', defaultColumns: ['name', 'position'] },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user && user.role !== 'operator',
    update: ({ req: { user } }) => !!user && user.role !== 'operator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', label: 'Ism-familiya', type: 'text', required: true, hooks: { beforeChange: [imloMatn] } },
    { name: 'position', label: 'Lavozimi', type: 'text', localized: true, hooks: { beforeChange: [imloMatn] } },
    { name: 'photo', label: 'Surat', type: 'upload', relationTo: 'media' },
  ],
}
