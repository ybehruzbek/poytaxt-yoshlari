import Link from 'next/link'
import type { ReactNode } from 'react'

import { More } from './MoreBtn'

/**
 * Xato va “sahifa topilmadi” holatlari uçun yagona köriniş: yöl kapsulasi, sarlavha, qisqa izoh va tugmalar.
 * Sayt menyusi va pastki qismi saqlanadi — foydalanuvçi boşqa bölimga öta oladi.
 */
export function ErrorView({
  locale,
  crumb,
  title,
  text,
  children,
}: {
  locale: string
  crumb: string
  title: string
  text: string
  children?: ReactNode
}) {
  return (
    <>
      <header className="pg-head">
        <div className="wrap">
          <div className="pg-crumbs">
            <nav className="crumbs" aria-label="Yöl">
              <Link href={`/${locale}`}>Boş sahifa</Link>
              <span>/</span>
              <span aria-current="page">{crumb}</span>
            </nav>
          </div>
          <h1 className="h2 pg-title">{title}</h1>
        </div>
      </header>
      <section className="sec">
        <div className="wrap err-box">
          <p>{text}</p>
          <div className="err-acts">
            {children}
            <Link href={`/${locale}`} className="more-btn">
              <More>Boş sahifaga qaytiş</More>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
