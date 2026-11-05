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
              Savol, murojaat yoki taklifingiz bormi? <span>Biz yordam beramiz.</span>
            </h2>
            <p>Yozing — masʼul xodimlarimiz murojaatingizni körib çiqib, siz bilan boğlanadi.</p>
            <ol className="cb-steps">
              <li>
                <b>1</b>
                <span>
                  <strong>Yozing</strong>Savol, murojaat yoki taklifingizni bayon qiling
                </span>
              </li>
              <li>
                <b>2</b>
                <span>
                  <strong>Körib çiqamiz</strong>Masʼul xodim murojaatni örganadi
                </span>
              </li>
              <li>
                <b>3</b>
                <span>
                  <strong>Boğlanamiz</strong>Telefon yoki poçta orqali javob beramiz
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
