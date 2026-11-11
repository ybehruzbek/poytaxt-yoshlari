import type { ReactNode } from 'react'

/**
 * Saytdagi BARÇA “Batafsil” tipidagi tugmalar uçun yagona köriniş (qoida: hamma joyda bir xil).
 * Asosiy sariq tugmaning ixçam nusxasi: sariq kapsula, yozuv va oq doira ičida → strelka;
 * hover'da jigarrang bilan töladi, strelka 45° buriladi (uslub: buttons.css → .more-btn).
 *
 * Işlatiş:
 *   alohida havola:      <Link href=… className="more-btn"><More /></Link>
 *   butun karta havola:  <Link … className="karta"> … <span className="more-btn"><More /></span></Link>
 *   boşqa yozuv bilan:   <More>Vazifalari</More>
 */
export function More({ children = 'Batafsil' }: { children?: ReactNode }) {
  return (
    <>
      <span className="more-btn-t">{children}</span>
      <span className="more-btn-ic" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </>
  )
}
