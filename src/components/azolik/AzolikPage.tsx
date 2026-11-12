/**
 * “Aʼzo böliş” sahifasi (Ustavning IV bobi). VAQTINCHA uç variant — natija (foydalanuvçi oxirida nima oladi) farqli:
 *  A — Yöl-yöriqnoma: talablar, tartib, çop etişga tayyor ariza namunasi, boşlanğiç taşkilotni topiş.
 *  B — Onlayn ariza: ariza Kengaşga yuboriladi (admin: “Aʼzolik arizalari”), raqam va keyingi bosqiçlar körsatiladi.
 *  C — Bosqiçma-bosqiç: moslik tekşiruvi → öqiş / iş joyi → töldirilgan, imzolaşga tayyor ariza.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { OTMS } from '@/components/boshlangich/data'
import { FaqBlock } from '@/components/faq/FaqBlock'
import { FAQ_AZOLIK } from '@/components/faq/data'
import { More } from '@/components/site/MoreBtn'

import { AzSwitch, OnlineForm, PrintBtn, Wizard } from './Client'
import { ArizaDoc, Conditions, Steps } from './Parts'

const DEV = process.env.NODE_ENV !== 'production'

type P = { L: (h: string) => string; crumbs: ReactNode }

/** Faqat nomlar (yetakçilarning aloqa maʼlumotlari mijozga yuborilmaydi), alifbo tartibida */
const ottNames = () => [...new Set(OTMS.map((o) => o.otm))].sort((a, b) => a.localeCompare(b, 'uz'))

/** A — Yöl-yöriqnoma */
function GuideA({ L }: { L: (h: string) => string }) {
  return (
    <>
      <section className="sec az-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Kim aʼzo bölişi mumkin</h2>
          </div>
          <Conditions L={L} />
        </div>
      </section>
      <section className="sec az-sec">
        <div className="wrap az-split">
          <div>
            <h2 className="h2">Qabul qiliş tartibi</h2>
            <Steps L={L} />
          </div>
          <div className="az-doc-wrap">
            <h2 className="h2">Ariza namunasi</h2>
            <div className="az-print">
              <ArizaDoc />
            </div>
            <div className="az-doc-acts az-noprint">
              <PrintBtn />
              <Link href={L('/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim')} className="more-btn">
                <More>Boşlanğiç taşkilotingizni toping</More>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="sec az-sec az-noprint">
        <div className="wrap">
          <FaqBlock ids={FAQ_AZOLIK} base={L('')} title="Aʼzolik haqida savollar" section={false} />
        </div>
      </section>
    </>
  )
}

/** B — Onlayn ariza */
function OnlineB({ L }: { L: (h: string) => string }) {
  return (
    <section className="sec az-sec">
      <div className="wrap az-split az-split-form">
        <div className="az-side">
          <h2 className="h2">Kim aʼzo bölişi mumkin</h2>
          <Conditions L={L} />
          <h2 className="h2">Ariza qanday körib çiqiladi</h2>
          <Steps L={L} />
        </div>
        <OnlineForm otts={ottNames()} ustavHref={L('/hujjatlar/normativ/ustav')} />
      </div>
    </section>
  )
}

/** C — Bosqiçma-bosqiç */
function WizardC({ L }: { L: (h: string) => string }) {
  return (
    <section className="sec az-sec">
      <div className="wrap az-wiz-wrap">
        <Wizard otts={ottNames()} />
        <p className="az-foot-note az-noprint">
          Aʼzolik tartibi Özbekiston yoşlar ittifoqi{' '}
          <Link href={L('/hujjatlar/normativ/ustav#band-4.1')}>Ustavining IV bobi</Link> bilan belgilangan.
        </p>
      </div>
    </section>
  )
}

export function AzolikPage({ L, crumbs }: P) {
  return (
    <div className="az">
      <header className="pg-head az-noprint">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Aʼzo böliş</h1>
        </div>
      </header>
      {/* VAQTINCHA: B va C variantlari faqat ishlab chiqish rejimida */}
      <AzSwitch a={<GuideA L={L} />} b={DEV ? <OnlineB L={L} /> : undefined} c={DEV ? <WizardC L={L} /> : undefined} />
    </div>
  )
}
