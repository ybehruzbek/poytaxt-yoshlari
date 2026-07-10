import type { Stat } from "@prisma/client";
import styles from "./MiniStats.module.css";
import CountUp from "@/components/ui/CountUp";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MiniStats({ items }: { items: Stat[] }) {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.inner}>
            {items.map((stat) => (
              <div className={styles.stat} key={stat.id}>
                <div className={styles.number}>
                  <CountUp target={stat.target} suffix={stat.suffix} />
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
