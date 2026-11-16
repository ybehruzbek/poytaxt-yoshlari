import type { ReactNode } from 'react'

import { GrantsList } from './GrantsList'
import { getGrants } from '@/lib/cms/imkoniyatlar'

/** “Grantlar” sahifasi: yöl, sarlavha, izoh va sohalar böyiça grantlar röyxati */
export async function GrantsPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const grants = await getGrants(locale)
  return (
    <div className="gr">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Grantlar</h1>
        </div>
      </header>
      <section className="sec gr-sec">
        <div className="wrap">
          <GrantsList grants={grants} />
          <p className="gr-disc">
            Sahifada faqat yoşlar, talabalar, öquvçilar va yoş olimlar iştirok eta oladigan grantlar
            keltirilgan. Maʼlumotlar davlat organlarining rasmiy eʼlonlari asosida 2026-yil
            14-noyabr holatiga töplangan. Ariza topşirişdan oldin şartlar va muddatlarni rasmiy
            manbada tekşiriş tavsiya etiladi.
          </p>
        </div>
      </section>
    </div>
  )
}
