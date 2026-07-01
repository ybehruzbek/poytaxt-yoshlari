"use client";

import React, { useState } from 'react';
import styles from './TashkilotDirections.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

const directions = [
  {
    num: "01",
    title: "Ta'lim va IT",
    desc: "Yoshlarni zamonaviy kasblarga o'qitish, dasturlash va robototexnika to'garaklari orqali ularning iqtidorini ro'yobga chiqarish. Zamonaviy kasblar va kelajak poydevori aynan shu yerda quriladi.",
    icon: "fas fa-laptop-code",
    bg: "var(--blue)",
    color: "#ffffff"
  },
  {
    num: "02",
    title: "Tadbirkorlik",
    desc: "Startap loyihalar va biznesni qo'llab-quvvatlash. Yosh tadbirkorlarga biznes reja tuzish va investitsiya jalb qilishda ko'maklashish.",
    icon: "fas fa-chart-line",
    bg: "#f59e0b",
    color: "#ffffff"
  },
  {
    num: "03",
    title: "Volontyorlik",
    desc: "Ijtimoiy himoyaga muhtojlarga yordam berish, ekologik aksiyalar o'tkazish va ko'ngillilar harakatini rivojlantirish orqali jamiyatga foyda keltirish.",
    icon: "fas fa-hands-helping",
    bg: "#10b981",
    color: "#ffffff"
  },
  {
    num: "04",
    title: "Sport va Madaniyat",
    desc: "Sog'lom turmush tarzini targ'ib qilish, sport musobaqalari va ijodiy festivallar orqali yoshlarni jismoniy va ma'naviy yetuk etib tarbiyalash.",
    icon: "fas fa-running",
    bg: "#f43f5e",
    color: "#ffffff"
  }
];

export default function TashkilotDirections() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.directionsSection}>
      <div className="container">
        
        <div className={styles.headerArea}>
          <ScrollReveal>
            <span className={styles.badge}>Yo'nalishlar</span>
            <h2 className={styles.title}>Biz nima bilan shug'ullanamiz?</h2>
          </ScrollReveal>
        </div>

        <div className={styles.accordionContainer}>
          {directions.map((dir, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div 
                key={idx}
                className={`${styles.accordionPanel} ${isActive ? styles.activePanel : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{ backgroundColor: isActive ? dir.bg : "var(--bg-light)" }}
              >
                
                {/* Closed State Info (Vertical) */}
                <div className={`${styles.closedContent} ${isActive ? styles.hidden : ""}`}>
                  <span className={styles.closedNum}>{dir.num}</span>
                  <div className={styles.closedTitleWrap}>
                    <h3 className={styles.closedTitle}>{dir.title}</h3>
                  </div>
                </div>

                {/* Open State Info (Horizontal) */}
                <div className={`${styles.openContent} ${!isActive ? styles.hidden : ""}`}>
                  <div className={styles.openIconWrap}>
                     <i className={`${dir.icon} ${styles.openIcon}`} style={{ color: dir.color }} />
                  </div>
                  <div className={styles.openTextWrap}>
                    <span className={styles.openNum} style={{ color: "rgba(255,255,255,0.4)" }}>{dir.num}</span>
                    <h3 className={styles.openTitle} style={{ color: dir.color }}>{dir.title}</h3>
                    <p className={styles.openDesc} style={{ color: "rgba(255,255,255,0.9)" }}>{dir.desc}</p>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
