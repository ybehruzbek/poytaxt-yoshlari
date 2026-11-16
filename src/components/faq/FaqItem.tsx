import Link from 'next/link'

import { More } from '@/components/site/MoreBtn'

import type { Faq } from './data'

/**
 * Bitta savol-javob: <details> (JS'siz ham oçiladi, klaviatura bilan işlaydi).
 * `base` — til prefiksi (/uz).
 */
export function FaqItem({ f, base }: { f: Faq; base: string }) {
  return (
    <details className="faq-it" id={f.id}>
      <summary>
        <span className="faq-q">{f.q}</span>
        <span className="faq-ic" aria-hidden="true" />
      </summary>
      <div className="faq-a">
        {f.a.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {f.li && (
          <ul>
            {f.li.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        )}
        {f.more && (
          <Link href={`${base}${f.more.href}`} className="more-btn">
            <More>
              Batafsil<span className="sr-only">{`: ${f.more.label}`}</span>
            </More>
          </Link>
        )}
      </div>
    </details>
  )
}
