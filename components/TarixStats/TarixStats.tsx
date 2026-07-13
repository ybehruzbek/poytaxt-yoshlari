import React from "react";
import styles from "./TarixStats.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { UsersThree, HandHeart, Rocket, MapTrifold } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

const stats: { icon: Icon; number: string; label: string; desc: string; color: string }[] = [
  {
    icon: UsersThree,
    number: "3.5M+",
    label: "A'zolar va Qatnashchilar",
    desc: "Butun O'zbekiston bo'ylab faol ishtirokchilar",
    color: "var(--blue)",
  },
  {
    icon: HandHeart,
    number: "15,000+",
    label: "Doimiy Volontyorlar",
    desc: "Har kuni jamiyat uchun fidoyilik bilan xizmat qiladilar",
    color: "var(--green)",
  },
  {
    icon: Rocket,
    number: "4,000+",
    label: "Amalga Oshirilgan Loyihalar",
    desc: "Ta'lim, sport, IT, san'at va ko'plab sohalarda",
    color: "var(--amber)",
  },
  {
    icon: MapTrifold,
    number: "14",
    label: "Hududiy Kengashlar",
    desc: "Har bir viloyat va Toshkent shahri bo'ylab",
    color: "var(--accent-orange)",
  },
];

export default function TarixStats() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Raqamlarda</span>
            <h2 className={styles.title}>Tarixiy Natijalar</h2>
            <p className={styles.subtitle}>
              Qisqa vaqt ichida erishilgan bu natijalar ortida minglab uyqusiz tunlar,
              uzluksiz mehnat va xalqqa xizmat qilishdek oliy maqsad yotibdi.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {stats.map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <ScrollReveal key={i} delay={i + 1}>
                <div className={styles.card} style={{ "--accent": stat.color } as React.CSSProperties}>
                  <div className={styles.iconBox}>
                    <StatIcon weight="duotone" />
                  </div>
                  <div className={styles.number}>{stat.number}</div>
                  <div className={styles.label}>{stat.label}</div>
                  <p className={styles.desc}>{stat.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
