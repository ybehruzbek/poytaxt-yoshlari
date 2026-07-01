"use client";

import styles from "./Stats.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import { fullStats } from "@/lib/data";

export default function Stats() {
  return (
    <section className={styles.stats} id="statistika">
      <div className="container">
        <div className={styles.splitLayout}>
          <div className={styles.statsLeft}>
            <ScrollReveal>
              <h2 className={styles.sectionTitle}>Raqamlar gapirganda</h2>
              <p className={styles.sectionDesc}>
                Yoshlar Ittifoqi yillar davomida minglab yoshlarning hayotida ijobiy o'zgarishlar qildi va ularning qobiliyatlarini ro'yobga chiqarishga yordam berdi.
              </p>
            </ScrollReveal>
            
            <div className={styles.grid}>
              {fullStats.map((stat, i) => (
                <ScrollReveal key={i} delay={i + 1}>
                  <div className={styles.item}>
                    <div className={styles.number}>
                      <CountUp target={stat.target} suffix={stat.suffix} duration={2200} />
                    </div>
                    <div className={styles.label}>{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className={styles.statsRight}>
            <ScrollReveal delay={2} className={styles.revealWrapper}>
              <div className={styles.imageCard}>
                <img src="/images/about/about_cover_1782905651024.png" alt="Yoshlar ittifoqi jamoasi" className={styles.mainImage} />
                <div className={styles.overlay}>
                  <div className={styles.overlayPlay}>
                    <i className="fas fa-play" />
                  </div>
                  <h3>Biz haqimizda qisqacha</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
