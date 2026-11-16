/**
 * “Aʼzo böliş” sahifasi (Ustavning IV bobi): çapda aʼzolik şartlari va arizani körib çiqiş tartibi,
 * öngda onlayn ariza şakli. Ariza Kengaşga yuboriladi (admin: “Aʼzolik arizalari”), foydalanuvçiga
 * ariza raqami va keyingi bosqiçlar körsatiladi.
 */
import type { ReactNode } from 'react'

import { getOtts } from '@/lib/cms/biz'
import { getAzolik } from '@/lib/cms/sahifalar'

import { OnlineForm } from './Client'
import { Conditions, Steps } from './Parts'

type P = { L: (h: string) => string; crumbs: ReactNode }

/** Faqat nomlar (yetakçilarning aloqa maʼlumotlari mijozga yuborilmaydi), alifbo tartibida */
const ottNames = async () => [...new Set((await getOtts()).map((o) => o.otm))].sort((a, b) => a.localeCompare(b, 'uz'))

export async function AzolikPage({ L, crumbs }: P) {
  const A = await getAzolik(L('').split('/')[1] || 'uz')
  return (
    <div className="az">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Aʼzo böliş</h1>
        </div>
      </header>
      <section className="sec az-sec">
        {/* kompyuterda: çapda şartlar va tartib, öngda şakl; tor ekranda: şartlar → şakl → tartib */}
        <div className="wrap az-grid">
          <div className="az-a">
            <h2 className="h2">Kim aʼzo bölişi mumkin</h2>
            <Conditions L={L} CONDITIONS={A.CONDITIONS} />
          </div>
          <div className="az-f">
            <OnlineForm otts={await ottNames()} after={A.AFTER} ustavHref={L('/hujjatlar/normativ/ustav')} />
          </div>
          <div className="az-b">
            <h2 className="h2">Arizani körib çiqiş tartibi</h2>
            <Steps L={L} STEPS={A.STEPS} />
          </div>
        </div>
      </section>
    </div>
  )
}
