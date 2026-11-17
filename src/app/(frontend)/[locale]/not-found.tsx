'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { ErrorView } from '@/components/site/ErrorView'
import { More } from '@/components/site/MoreBtn'

/** Mavjud bölmagan manzil: özbekça 404 sahifasi, sayt menyusi bilan */
export default function NotFound() {
  const { locale = 'uz' } = useParams<{ locale: string }>()
  return (
    <ErrorView
      locale={locale}
      crumb="Sahifa topilmadi"
      title="Sahifa topilmadi"
      text="Siz izlagan sahifa mavjud emas yoki boşqa manzilga köçirilgan."
    >
      <Link href={`/${locale}/yangiliklar`} className="more-btn">
        <More>Yangiliklar</More>
      </Link>
    </ErrorView>
  )
}
