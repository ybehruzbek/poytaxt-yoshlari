import { Fragment, type CSSProperties } from 'react'

/**
 * Sarlavha matnini sözlarga böladi (JSX da, DOM keyin özgartirilmaydi): har söz
 * <span class="rv-w" style="--w: i">, örami .split-words da --wn (sözlar soni).
 * RevealMotion / HomeMotion faqat örama --t (skroll progressi) qöyadi; uslub — reveal.css.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <span className="split-words" style={{ '--wn': words.length } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="rv-w" style={{ '--w': i } as CSSProperties}>
            {w}
          </span>
        </Fragment>
      ))}
    </span>
  )
}
