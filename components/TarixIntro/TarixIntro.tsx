import React from "react";
import styles from "./TarixIntro.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Quotes } from "@phosphor-icons/react/ssr";

export default function TarixIntro() {
  return (
    <section className={styles.introSection}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.introBox}>
            <div className={styles.iconWrap}>
              <Quotes weight="duotone" className={styles.quoteIcon} />
            </div>
            <h2 className={styles.introQuote}>
              &ldquo;Hech bir jamiyat o&apos;z yoshlarining g&apos;ayrati, shijoati va ularga bo&apos;lgan kuchli ishonchisiz hech qachon katta yutuqlarga erisha olmaydi.&rdquo;
            </h2>
            <p className={styles.introText}>
              Biz yo&apos;lga chiqqanimizda yoshlarning ko&apos;plab savollari ochiq qolgan, imkoniyatlar 
              esa faqatgina tanlanganlar uchungina ochiqdek tuyulardi. O&apos;zbekiston Yoshlar Ittifoqi aynan 
              shu bo&apos;shliqni to&apos;ldirish, adolatni ta&apos;minlash va barcha yoshlarga teng start olish huquqini 
              kafolatlash maqsadida butunlay yangi ruhda maydonga chiqdi.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
