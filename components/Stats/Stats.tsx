"use client";

import styles from "./Stats.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import { fullStats } from "@/lib/data";

export default function Stats() {
  return (
    <section className={styles.stats} id="statistika">
      <div className="container">
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
    </section>
  );
}
