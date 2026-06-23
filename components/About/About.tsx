import styles from "./About.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutCards, timelineItems } from "@/lib/data";

export default function About() {
  return (
    <section className={styles.about} id="tashkilot">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div>
              <div className="section-label">Tashkilot haqida</div>
              <h2 className="section-title">
                Yoshlar manfaati —<br />bizning ustuvor yo&apos;nalishimiz
              </h2>
            </div>
            <p className="section-desc" style={{ textAlign: "right" }}>
              O&apos;zbekiston Respublikasi Konstitutsiyasi va «Yoshlar siyosati to&apos;g&apos;risida»gi qonun asosida faoliyat yurituvchi yirik jamoat tashkiloti.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {aboutCards.map((card, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className={styles.card}>
                <div className={`${styles.cardIcon} ${card.iconClass === "blue" ? styles.iconBlue : styles.iconGreen}`}>
                  <i className={`fas ${card.icon}`} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={5}>
            <div className={styles.timelineCard}>
              <div>
                <div className="section-label" style={{ marginBottom: 20 }}>Tarixiy yo&apos;l</div>
              </div>
              <div className={styles.timelineVisual}>
                {timelineItems.map((item, i) => (
                  <div className={styles.timelineItem} key={i}>
                    <div className={`${styles.dot} ${i === 0 ? styles.dotFirst : ""}`} />
                    <div className={styles.year}>{item.year}</div>
                    <div className={styles.timelineText}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
