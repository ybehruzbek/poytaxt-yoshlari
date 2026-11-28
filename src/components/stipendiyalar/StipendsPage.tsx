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
            Sahifada O‘zbekiston Respublikasining davlat stipendiyalari hamda o‘zbekistonlik yoshlar xorijda ta’lim olishi uchun
            ishtirok eta oladigan stipendiya dasturlari keltirilgan. Stipendiya miqdorlari amaldagi bazaviy hisoblash miqdori va bazaviy stipendiya asosida avtomatik hisoblanadi. Ariza topshirishdan oldin shartlar va muddatlarni rasmiy manbada tekshirish tavsiya etiladi.
          </p>
        </div>
      </section>
    </div>
  )
}
