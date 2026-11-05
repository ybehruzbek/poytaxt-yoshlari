import { revalidatePath } from 'next/cache'
import type { GlobalConfig, TextField } from 'payload'

import { checkSocialUrl, cleanSocialUrl, DEFAULT_SOCIALS, NET_LABEL, NETS, type Net } from '../lib/socials'

const urlField = (net: Net): TextField => ({
  name: net,
  label: NET_LABEL[net],
  type: 'text',
  defaultValue: DEFAULT_SOCIALS[net],
  admin: { description: 'To‘liq havola (https://…). Bo‘sh qoldirilsa, bu tarmoq saytda ko‘rsatilmaydi.' },
  validate: (value: string | null | undefined) => checkSocialUrl(net, (value ?? '').trim()) ?? true,
  hooks: {
    beforeChange: [({ value }) => (typeof value === 'string' && value.trim() ? cleanSocialUrl(value.trim()) : '')],
  },
})

/** Sayt pastki qismidagi ijtimoiy tarmoq havolalari — admin panelda o'zgartiriladi */
export const Socials: GlobalConfig = {
  slug: 'socials',
  label: 'Ijtimoiy tarmoqlar',
  admin: { group: 'Sayt sozlamalari' },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user && user.role !== 'operator',
  },
  fields: NETS.map(urlField),
  hooks: {
    // saqlangach sayt sahifalari darhol yangilansin
    afterChange: [
      () => {
        try {
          revalidatePath('/', 'layout')
        } catch {
          /* Next.js tashqarisida (masalan, seed skriptida) — e'tiborsiz */
        }
      },
    ],
  },
}
