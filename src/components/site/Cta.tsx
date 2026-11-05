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
            <p>Yozing — mas’ul xodimlarimiz murojaatingizni ko‘rib chiqib, siz bilan bog‘lanadi.</p>
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
                  <strong>Ko‘rib chiqamiz</strong>Mas’ul xodim murojaatni o‘rganadi
                </span>
              </li>
              <li>
                <b>3</b>
                <span>
                  <strong>Bog‘lanamiz</strong>Telefon yoki pochta orqali javob beramiz
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
