import type { Locale } from '@/i18n/config'
import { getBosh } from '@/lib/cms/sahifalar'

import { AppealForm } from './AppealForm'

/**
 * "Ariza, taklif va şikoyatlar" bloki: chapda matn va 3 qadam, o'ngda murojaat shakli.
 * Shakl bazaga (admin paneldagi "Murojaatlar") yozadi; fayl biriktirish mumkin.
 */
export async function Cta({ locale }: { locale: Locale }) {
  const { cta } = await getBosh(locale)
  return (
    <section className="sec" id="murojaat">
      <div className="wrap">
        <div className="cb">
          <div className="cb-txt">
            <h2 className="h2">{cta.title}</h2>
            {cta.text && <p>{cta.text}</p>}
            <ol className="cb-steps">
              {cta.steps.map((s, i) => (
                <li key={s.t}>
                  <b>{i + 1}</b>
                  <span>
                    <strong>{s.t}</strong>
                    {s.d}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <AppealForm />
        </div>
      </div>
    </section>
  )
}
