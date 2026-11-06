/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import { IMG, INTRO } from './data'

type H = { L: (h: string) => string; crumbs: ReactNode }

/**
 * Sahifa boşi: butun ekranli surat, matn pastki gradient ustida;
 * yöl zanjiri sarlavha ustida töq şaffof kapsulada.
 */
export function Hero({ L, crumbs }: H) {
  return (
    <section className="it-hero" data-head-dark>
      <img src={IMG.team} alt="" />
      <div className="wrap">
        <div className="it-crumbs">{crumbs}</div>
        <h1 className="h1">Özbekiston yoşlar ittifoqi</h1>
        <p className="lead">{INTRO}</p>
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
      </div>
    </section>
  )
}
