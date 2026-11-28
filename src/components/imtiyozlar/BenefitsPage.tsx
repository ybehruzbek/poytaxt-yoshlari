import type { ReactNode } from 'react'

import { BenefitCalc } from './BenefitCalc'
import { BenefitsList } from './BenefitsList'
import { getBenefits } from '@/lib/cms/imkoniyatlar'

/** “Imtiyozlar” sahifasi: yöl, sarlavha, imtiyozlar kalkulyatori, talabalar, öquvçilar va yoşlar uçun imtiyozlar röyxati */
export async function BenefitsPage({ crumbs, locale = 'uz' }: { crumbs: ReactNode; locale?: string }) {
  const benefits = await getBenefits(locale)
  return (
    <div className="gr st im">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Yoshlar va talabalar uchun imtiyozlar</h1>
        </div>
      </header>
      <section className="sec gr-sec">
        <div className="wrap">
          <BenefitCalc />
          <BenefitsList benefits={benefits} />
          <p className="gr-disc">
            Sahifada talabalar, o‘quvchilar va yoshlar uchun amaldagi normativ hujjatlarda belgilangan
            kompensatsiya, chegirma va moddiy yordam turlari keltirilgan. Miqdorlar amaldagi bazaviy
            hisoblash miqdori asosida avtomatik hisoblanadi. Ariza berishdan oldin shartlarni rasmiy
            manbada tekshirish tavsiya etiladi.
          </p>
        </div>
      </section>
    </div>
  )
}
