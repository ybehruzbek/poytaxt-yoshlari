import type { ReactNode } from 'react'

import { StipendCalc } from './StipendCalc'
import { StipendsList } from './StipendsList'
import { getStipends } from '@/lib/cms/imkoniyatlar'

/** “Stipendiyalar” sahifasi: yöl, sarlavha, davlat va xorijiy stipendiyalar röyxati, izoh */
export async function StipendsPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const stipends = await getStipends(locale)
  return (
    <div className="gr st">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Stipendiyalar</h1>
        </div>
      </header>
      <section className="sec gr-sec">
        <div className="wrap">
          <StipendCalc />
          <StipendsList stipends={stipends} />
          <p className="gr-disc">
            Sahifada Özbekiston Respublikasining davlat stipendiyalari hamda özbekistonlik yoşlar xorijda taʼlim olişi uçun
            iştirok eta oladigan stipendiya dasturlari keltirilgan. Stipendiya miqdorlari amaldagi bazaviy hisoblaş miqdori va bazaviy stipendiya asosida avtomatik hisoblanadi. Ariza topşirişdan oldin şartlar va muddatlarni rasmiy manbada tekşiriş tavsiya etiladi.
          </p>
        </div>
      </section>
    </div>
  )
}
