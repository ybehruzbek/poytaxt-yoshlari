import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

/**
 * VAQTINÇA: Faoliyat sahifalarining dizayn variantlari (A — hozirgi, B, C).
 * Işlab çiqiş rejimida pastki ö‘ng burçakdagi panel orqali almaştiriladi; production'da faqat A körinadi.
 * Variant tanlangaç, qolganlari va şu fayl olib taşlanadi.
 */
const DEV = process.env.NODE_ENV !== 'production'

export function V({
  name,
  k,
  children,
}: {
  name: string
  k: 'a' | 'b' | 'c'
  children: ReactNode
}) {
  if (!DEV) return k === 'a' ? <>{children}</> : null
  return (
    <div className="vx" data-v={`${name}-${k}`}>
      {children}
    </div>
  )
}

export function VPanel({ name, label }: { name: string; label: string }) {
  if (!DEV) return null
  return <DevSectionsPanel sections={[{ name, label, count: 3 }]} />
}
