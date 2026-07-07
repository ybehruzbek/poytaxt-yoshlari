import React from "react";
import styles from "./MissiyaDirections.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const overlapCards = [
  {
    id: 1,
    num: "01",
    title: "Huquqiy va Ijtimoiy Himoya",
    desc: "Yoshlarning huquqlarini har qanday vaziyatda munosib himoya qilish va davlat tuzilmalari bilan ishlash.",
    color: "var(--blue)"
  },
  {
    id: 2,
    num: "02",
    title: "Ta'lim va Bandlik",
    desc: "Sifatli ta'lim olish va o'z mutaxassisligi bo'yicha barqaror daromad manbaiga ega bo'lishini ta'minlash.",
    color: "var(--blue-deep)"
  },
  {
    id: 3,
    num: "03",
    title: "Ijtimoiy Faollik",
    desc: "Yoshlarni jamiyat boshqaruvida va turli tashabbuslarda ishtirok etishga faol jalb qilish.",
    color: "var(--green)"
  },
];

export default function MissiyaDirections() {
  return (
    <section className={styles.grantSection}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Yo'nalishlar</span>
            <h2 className={styles.sectionTitle}>Uchta Ustuvor Yo'nalish</h2>
          </div>
        </ScrollReveal>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineGrid}>
            {overlapCards.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx + 1}>
                <div className={styles.timeCard} style={{ background: item.color }}>
                  {idx < 2 && (
                    <div className={styles.arcSvgWrap}>
                      <svg viewBox="0 0 400 40" preserveAspectRatio="none" width="100%" height="100%">
                        <path
                          className={styles.arcPath}
                          d="M 0 40 Q 200 0 400 40"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.5)"
                          strokeWidth="4"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  )}
                  <div className={styles.timeNum} style={{ color: item.color }}>{item.num}</div>
                  <h3 className={styles.timeTitle}>{item.title}</h3>
                  <p className={styles.timeDesc}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
