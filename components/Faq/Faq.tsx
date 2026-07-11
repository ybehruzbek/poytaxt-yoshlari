import styles from "./Faq.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { faqItems } from "@/lib/data";

export default function Faq() {
  return (
    <section className={styles.section} id="savol-javob">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div className="section-label">Savol-javob</div>
            <h2 className="section-title">Ko&apos;p beriladigan savollar</h2>
            <p className="section-desc">
              Murojaat yuborishdan oldin eng ko&apos;p so&apos;raladigan savollarga javoblar bilan tanishing.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.list}>
          {faqItems.map((item, i) => (
            <ScrollReveal key={item.q} delay={i % 3}>
              <details className={styles.item}>
                <summary className={styles.question}>
                  <span>{item.q}</span>
                  <span className={styles.chevron} aria-hidden>
                    <i className="fas fa-chevron-down" />
                  </span>
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
