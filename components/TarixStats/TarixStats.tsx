import React from "react";
import styles from "./TarixStats.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  {
    icon: "fa-users",
    number: "3.5M+",
    label: "A'zolar va Qatnashchilar",
    desc: "Butun O'zbekiston bo'ylab faol ishtirokchilar",
    color: "#0ea5e9",
  },
  {
    icon: "fa-hand-holding-heart",
    number: "15,000+",
    label: "Doimiy Volontyorlar",
    desc: "Har kuni jamiyat uchun fidoyilik bilan xizmat qiladilar",
    color: "#10b981",
  },
  {
    icon: "fa-diagram-project",
    number: "4,000+",
    label: "Amalga Oshirilgan Loyihalar",
    desc: "Ta'lim, sport, IT, san'at va ko'plab sohalarda",
    color: "#f59e0b",
  },
  {
    icon: "fa-earth-asia",
    number: "14",
    label: "Hududiy Kengashlar",
    desc: "Har bir viloyat va Toshkent shahri bo'ylab",
    color: "#8b5cf6",
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
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={styles.card} style={{ "--accent": stat.color } as React.CSSProperties}>
                <div className={styles.iconRow}>
                  <div className={styles.iconBox}>
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <div className={styles.line} />
                </div>
                <div className={styles.number}>{stat.number}</div>
                <div className={styles.label}>{stat.label}</div>
                <p className={styles.desc}>{stat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
