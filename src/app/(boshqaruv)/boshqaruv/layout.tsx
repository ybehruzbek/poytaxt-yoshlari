import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'

import './boshqaruv.css'

const head = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700', '800'], variable: '--f-head', display: 'swap' })
const body = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700'], variable: '--f-body', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Boşqaruv paneli', template: '%s — Boşqaruv paneli' },
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = { themeColor: '#f6f3f0' }

/** Yangi boşqaruv paneli: saytdan alohida ildiz layout (sayt uslublari va skriptlari yuklanmaydi) */
export default function BoshqaruvRoot({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
