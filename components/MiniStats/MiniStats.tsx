"use client";

import styles from "./MiniStats.module.css";
import CountUp from "@/components/ui/CountUp";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { miniStats } from "@/lib/data";

export default function MiniStats() {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.inner}>
            {miniStats.map((stat, i) => (
              <div className={styles.stat} key={i}>
                <div className={styles.number}>
                  <CountUp target={stat.target} suffix={stat.showPlus ? "+" : ""} />
                </div>
                <div className={styles.label}>{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
