/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import { IMG, INTRO } from './data'

type H = { L: (h: string) => string; crumbs: ReactNode }

/** VAQTINCHA: yöl zanjiri joylaşuvi variantlari (B, C) faqat ishlab chiqish rejimida */
const DEV = process.env.NODE_ENV !== 'production'

/**
 * Sahifa boşi: butun ekranli surat, matn pastki gradient ustida.
 * Yöl zanjiri: A — sarlavha ustida toʼq kapsulada; B — heroʼdan keyin oq lentada;
 * C — pastki gradientda, tugmalar qatorining öng tomonida.
 */
export function Hero({ L, crumbs }: H) {
  return (
    <>
      <section className="it-hero" data-head-dark>
        <img src={IMG.team} alt="" />
        <div className="wrap">
          <div className="it-crumbs itcr itcr-a">{crumbs}</div>
          <h1 className="h1">Özbekiston yoşlar ittifoqi</h1>
          <p className="lead">{INTRO}</p>
          <div className="it-hero-bot">
            <div className="it-btns">
              <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
                Aʼzo böliş{' '}
                <span className="ic">
                  <Arrow />
                </span>
              </Link>
              <Link href={L('/faoliyat/loyihalar')} className="btn btn-ghost">
                Loyihalarni köriş
              </Link>
            </div>
            {DEV && <div className="it-crumbs-c itcr itcr-c">{crumbs}</div>}
          </div>
        </div>
      </section>
      {DEV && (
        <div className="it-crumbs-b itcr itcr-b">
          <div className="wrap">{crumbs}</div>
        </div>
      )}
    </>
  )
}
