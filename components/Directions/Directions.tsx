import styles from "./Directions.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { directions } from "@/lib/data";

export default function Directions() {
  return (
    <section className={styles.section} id="yonalishlar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Asosiy yo&apos;nalishlar</div>
            <h2 className="section-title">
              Faoliyat yo&apos;nalishlari
            </h2>
            <p className={`section-desc ${styles.sectionDesc}`}>
              Yoshlar rivojlanishining barcha sohalarini qamrab olgan 8 ta asosiy yo&apos;nalish bo&apos;yicha izchil ish olib boramiz.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {directions.map((dir, i) => (
            <ScrollReveal key={i} delay={Math.min(i + 1, 6)} className={styles.cardWrapper}>
              <div className={styles.card}>
                <div
                  className={styles.iconWrap}
                  style={{ background: dir.iconBg, color: dir.iconColor }}
                >
                  <i className={`fas ${dir.icon}`} />
                </div>
                <h3>{dir.title}</h3>
                <p>{dir.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
