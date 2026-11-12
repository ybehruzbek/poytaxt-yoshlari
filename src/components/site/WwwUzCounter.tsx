'use client'

/* eslint-disable @next/next/no-img-element -- www.uz hisoblagiçi: taşqi 88×31 rasm, next/image kerak emas */
import { useEffect, useState } from 'react'

/** www.uz reytingidagi sayt raqami (www.uz → “Saytni qöşiş” orqali olinadi) */
const ID = process.env.NEXT_PUBLIC_WWWUZ_ID ?? ''
/** Hisoblagiç ranglari: fon — jigarrang, yozuv — oq, raqamlar — sariq (sayt palitrasi) */
const COLORS = { code: '&col=532822&t=ffffff&p=FFD25A' }.code
const ALT = { code: 'Топ рейтинг www.uz' }.code

/**
 * www.uz TOP-reyting (TAS-IX) hisoblagiçi — rasmiy kodning zamonaviy nusxasi
 * (eski skript örniga:brauzerda manzil yiğiladi va <img> qöyiladi).
 * Raqam berilmagan bölsa hisoblagiç körsatilmaydi.
 */
export function WwwUzCounter() {
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (!ID) return
    const q =
      `id=${ID}&r=${encodeURIComponent(document.referrer)}` +
      `&pg=${encodeURIComponent(location.href)}` +
      `&c=${document.cookie ? 'Y' : 'N'}&j=N` +
      `&wh=${screen.width}x${screen.height}&px=${screen.colorDepth}&js=1.3`
    // eslint-disable-next-line react-hooks/set-state-in-effect -- manzil faqat brauzerda maʼlum (referrer, ekran)
    setSrc(`https://cnt0.www.uz/counter/collect?${q}${COLORS}`)
  }, [])

  if (!ID) return null
  return (
    <a
      className="fb-wwwuz"
      href={`https://www.uz/ru/res/visitor/index?id=${ID}`}
      target="_blank"
      rel="noopener"
      aria-label="www.uz reytingi"
    >
      {src ? <img src={src} width={88} height={31} alt={ALT} /> : <span />}
    </a>
  )
}
