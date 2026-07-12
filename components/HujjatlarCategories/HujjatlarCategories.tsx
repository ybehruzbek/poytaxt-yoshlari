import React from 'react';
import styles from './HujjatlarCategories.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Scales, FileText, Clipboard, ChartPie, ArrowRight } from '@phosphor-icons/react/ssr';

const categories = [
  {
    id: 1,
    icon: Scales,
    title: "Nizom va Qoidalar",
    count: "12 ta hujjat",
    desc: "Tashkilot faoliyatini tartibga soluvchi asosiy me'yoriy hujjatlar va yo'riqnomalar.",
    color: "var(--blue)",
    bg: "rgba(14, 165, 233, 0.05)",
    span: "col-span-2"
  },
  {
    id: 2,
    icon: FileText,
    title: "Buyruqlar",
    count: "156 ta hujjat",
    desc: "Kengash raisining qaror va farmoyishlari.",
    color: "var(--green)",
    bg: "rgba(16, 185, 129, 0.05)",
    span: "col-span-1"
  },
  {
    id: 3,
    icon: Clipboard,
    title: "Namunaviy Blankalar",
    count: "24 ta hujjat",
    desc: "Ariza va shartnomalar shakllari.",
    color: "#f59e0b", // amber
    bg: "rgba(245, 158, 11, 0.05)",
    span: "col-span-1"
  },
  {
    id: 4,
    icon: ChartPie,
    title: "Moliyaviy Hisobotlar",
    count: "8 ta hujjat",
    desc: "Ochiqlik va shaffoflikni ta'minlovchi yillik va choraklik hisobotlar arxivi.",
    color: "#8b5cf6", // violet
    bg: "rgba(139, 92, 246, 0.05)",
    span: "col-span-2"
  },
];

export default function HujjatlarCategories() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Hujjat Toifalari</h2>
            <p className={styles.sectionDesc}>
              O'zingizga kerakli bo'limni tanlang va barcha arxiv materiallaridan erkin foydalaning.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.bentoGrid}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal
                key={cat.id}
                delay={idx + 1}
                className={`${styles.bentoCard} ${styles[cat.span]}`}
              >
                <div
                  className={styles.cardInner}
                  style={{ backgroundColor: cat.bg }}
                >
                  <div className={styles.iconWrap} style={{ color: cat.color }}>
                    <Icon weight="duotone" />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{cat.title}</h3>
                    <p className={styles.cardDesc}>{cat.desc}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.countBadge} style={{ color: cat.color, backgroundColor: `${cat.color}15` }}>
                      {cat.count}
                    </span>
                    <button className={styles.arrowBtn} style={{ color: cat.color }}>
                      <ArrowRight weight="duotone" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
