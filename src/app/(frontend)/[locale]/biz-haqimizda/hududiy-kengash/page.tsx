import type { Metadata } from 'next'

import { HududiyPage as Content } from '@/components/hududiy/HududiyPage'

import '../../../ittifoq.css'
import '../../../kengash.css'
import '../../../hududiy.css'
import '../../../hududiy-alt3.css'

export const metadata: Metadata = {
  title: 'Toşkent şahar hududiy Kengaşi — Özbekiston yoşlar ittifoqi',
  description:
    'Toşkent şahar hududiy Kengaşi jamoasi: rais, bölim boşliqlari va mutaxassislar, ularning vazifalari va aloqa maʼlumotlari.',
}

/** «Toşkent şahar hududiy Kengaşi» sahifasi (mazmun: components/hududiy/data.ts) */
export default function HududiyRoute() {
  return <Content />
}
