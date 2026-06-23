import styles from "./CTA.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ctaBenefits } from "@/lib/data";

export default function CTA() {
  return (
    <section className={styles.cta} id="azo-bo-lish">
      <div className="container">
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.content}>
              <div className={`section-label ${styles.labelLight}`}>A&apos;zolik</div>
              <h2>
                Yoshlar Ittifoqiga<br />qo&apos;shiling
              </h2>
              <p>
                A&apos;zolik sizga professional rivojlanish, ijtimoiy faollik va yirik loyihalarda ishtirok etish imkoniyatini beradi.
              </p>
              <ul className={styles.benefits}>
                {ctaBenefits.map((benefit, i) => (
                  <li key={i}>
                    <span className={styles.check}>
                      <i className="fas fa-check" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.action}>
              <a href="#" className={styles.btnCta}>
                Ariza topshirish
                <i className="fas fa-arrow-right" style={{ fontSize: 13 }} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
