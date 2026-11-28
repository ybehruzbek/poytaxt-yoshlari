'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { ErrorView } from '@/components/site/ErrorView'
import { More } from '@/components/site/MoreBtn'

/** Sahifada kutilmagan xato: menyu va pastki qism saqlanadi, sahifani qayta yuklaş taklif etiladi */
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale = 'uz' } = useParams<{ locale: string }>()
  useEffect(() => {
    console.error('[sahifa]', error.digest ?? error.message)
  }, [error])
  return (
    <ErrorView
      locale={locale}
      crumb="Xatolik"
      title="Sahifani yuklab bo‘lmadi"
      text="Texnik nosozlik yuz berdi. Iltimos, birozdan so‘ng qayta urinib ko‘ring."
    >
      <button type="button" className="more-btn" onClick={() => reset()}>
        <More>Qayta urinib ko‘rish</More>
      </button>
    </ErrorView>
  )
}
