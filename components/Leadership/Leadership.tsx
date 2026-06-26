import Image from "next/image";
import styles from "./Leadership.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { leaders } from "@/lib/data";

export default function Leadership() {
  return (
    <section className={styles.section} id="rahbariyat">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Rahbariyat</div>
            <h2 className="section-title">
              Mas&apos;ul rahbarlar
            </h2>
            <p className={`section-desc ${styles.sectionDesc}`}>
              Toshkent shahar Yoshlar Ittifoqi Kengashining mas&apos;ul xodimlari va koordinatorlari.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {leaders.map((leader, i) => (
            <ScrollReveal key={i} delay={Math.min(i + 1, 4)}>
              <div className={styles.card}>
                <div className={styles.imgWrap}>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={400}
                    height={500}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className={styles.gradient} />
                </div>
                <div className={styles.body}>
                  <h3>{leader.name}</h3>
                  <p>{leader.position}</p>
                  <div className={styles.socials}>
                    <a href="#" className={styles.socialBtn} aria-label="Instagram">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#" className={styles.socialBtn} aria-label="Telegram">
                      <i className="fab fa-telegram-plane" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
