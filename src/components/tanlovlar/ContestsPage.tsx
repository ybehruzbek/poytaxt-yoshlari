import type { ReactNode } from 'react'

import { ContestsList } from './ContestsList'
import { getContests } from '@/lib/cms/imkoniyatlar'

/** “Tanlovlar” sahifasi: yöl, sarlavha, sohalar böyiça yoşlar tanlovlari va davlat mukofotlari röyxati, izoh */
export async function ContestsPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const contests = await getContests(locale)
  return (
    <div className="gr st tn">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Tanlovlar</h1>
        </div>
      </header>
      <section className="sec gr-sec">
        <div className="wrap">
          <ContestsList contests={contests} />
          <p className="gr-disc">
            Sahifada Yoşlar işlari agentligi, vazirliklar va boşqa taşkilotlar tomonidan eʼlon qilinadigan, yoşlar iştirok eta oladigan
            sohaviy tanlovlar va davlat mukofotlari keltirilgan. Maʼlumotlar rasmiy manbalar asosida 2026-yil 14-noyabr holatiga
            töplangan. Ariza topşirişdan oldin şartlar va muddatlarni rasmiy manbada tekşiriş tavsiya etiladi.
          </p>
        </div>
      </section>
    </div>
  )
}
