import styles from "./About.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutCards } from "@/lib/data";

export default function About() {
  return (
    <section className={styles.about} id="tashkilot">
      <div className="container">
        <ScrollReveal>
          <div className={styles.introBlock}>
            <h2 className={styles.introText}>
              <span className={styles.highlight}>O'zbekiston Yoshlar Ittifoqi</span> — yoshlarning huquq va manfaatlarini himoya qiluvchi, o'z g'oya va tashabbuslarini ro'yobga chiqarishga yordam beruvchi eng yirik jamoat tashkilotidir.
            </h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {aboutCards.map((card, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className={`${styles.card} ${card.iconClass === "blue" ? styles.bgBlue : styles.bgGreen}`}>
                <div className={`${styles.cardIcon} ${card.iconClass === "blue" ? styles.iconBlue : styles.iconGreen}`}>
                  <i className={`fas ${card.icon}`} />
                </div>
                <div className={styles.cardContent}>
                  <p>{card.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
