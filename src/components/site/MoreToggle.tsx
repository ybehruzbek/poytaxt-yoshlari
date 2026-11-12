'use client'

import { Children, type ReactNode, useRef, useState } from 'react'

import { More } from './MoreBtn'

/**
 * Saytdagi BARÇA uzun röyxatlar uçun yagona “Köproq körsatiş” tugmasi (qoida: hamma joyda bir xil).
 * Köriniş — yagona sariq tugma (.more-btn), yozuv: “Köproq körsatiş · yana N ta {noun}”;
 * hammasi oçilgaç — “Yiğiş”. Joylaşuvi: röyxat ostida, örtada (.more-toggle, buttons.css).
 *
 * Işlatiş:
 *   tayyor röyxat:   <MoreList className="grid" noun="hujjat">{kartalar}</MoreList>
 *   öz holati bilan: <MoreToggle rest={qolgani} noun="eʼlon" onMore={…} onLess={…} />
 */
export function MoreToggle({
  rest,
  noun,
  onMore,
  onLess,
  controls,
}: {
  /** hali yaşirin elementlar soni; 0 bölsa — “Yiğiş” */
  rest: number
  /** element nomi birlikda: “hujjat”, “hamkor”, “albom” */
  noun: string
  onMore: () => void
  /** berilmasa, hammasi oçilgaç tugma yöqoladi */
  onLess?: () => void
  /** röyxat elementining id si (aria-controls) */
  controls?: string
}) {
  if (rest <= 0 && !onLess) return null
  return (
    <div className="more-toggle">
      {rest > 0 ? (
        <button type="button" className="more-btn" aria-controls={controls} aria-expanded={false} onClick={onMore}>
          <More>
            Köproq körsatiş · yana {rest} ta {noun}
          </More>
        </button>
      ) : (
        <button type="button" className="more-btn" aria-controls={controls} aria-expanded onClick={onLess}>
          <More>Yiğiş</More>
        </button>
      )}
    </div>
  )
}

/**
 * Uzun röyxat: dastlab `first` ta element, “Köproq körsatiş” har bosilganda yana `step` ta;
 * hammasi oçilgaç “Yiğiş” röyxatni dastlabki holatga qaytarib, uning boşiga olib boradi.
 * Saralaş özgarganda boşidan körsatiş uçun komponentga `key` beriladi.
 */
export function MoreList({
  children,
  className,
  noun,
  first = 6,
  step = first,
  as: Tag = 'div',
  id,
}: {
  children: ReactNode
  className?: string
  noun: string
  first?: number
  step?: number
  as?: 'div' | 'ul' | 'ol'
  id?: string
}) {
  const all = Children.toArray(children)
  // bitta element uçun tugma maʼnosiz — faqat 2 va undan köp yaşirilsa yiğiladi
  const collapsible = all.length > first + 1
  const [shown, setShown] = useState(collapsible ? first : all.length)
  const box = useRef<HTMLElement>(null)

  return (
    <>
      {/* @ts-expect-error -- ref turi teg turiga bağliq (div / ul / ol) */}
      <Tag ref={box} className={className} id={id} style={{ scrollMarginTop: 120 }}>
        {all.slice(0, shown)}
      </Tag>
      {collapsible && (
        <MoreToggle
          rest={all.length - shown}
          noun={noun}
          controls={id}
          onMore={() => setShown((s) => (all.length - s - step === 1 ? all.length : s + step))}
          onLess={() => {
            setShown(first)
            box.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        />
      )}
    </>
  )
}
