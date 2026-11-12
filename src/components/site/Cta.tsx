import type { Locale } from '@/i18n/config'
import { AppealForm } from './AppealForm'

/**
 * "Savol, murojaat yoki taklifingiz bormi?" bloki: chapda matn va 3 qadam, o'ngda murojaat shakli.
 * Shakl bazaga (admin paneldagi "Murojaatlar") yozadi; fayl biriktirish mumkin.
 */
export function Cta(_props: { locale: Locale }) {
  return (
    <section className="sec" id="murojaat">
      <div className="wrap">
        <div className="cb">
          <div className="cb-txt">
            <h2 className="h2">
              Savol, murojaat yoki taklifingiz bormi?
            </h2>
            <p>Murojaatlar “Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonunda belgilangan muddatlarda körib çiqiladi.</p>
            <ol className="cb-steps">
              <li>
                <b>1</b>
                <span>
                  <strong>Yuboriş</strong>Şaklni töldiring va murojaatingizni bayon qiling
                </span>
              </li>
              <li>
                <b>2</b>
                <span>
                  <strong>Körib çiqiş</strong>Murojaatni masʼul xodim örganadi
                </span>
              </li>
              <li>
                <b>3</b>
                <span>
                  <strong>Javob</strong>Javob telefon yoki elektron poçta orqali beriladi
                </span>
              </li>
            </ol>
          </div>
          <AppealForm />
        </div>
      </div>
    </section>
  )
}
