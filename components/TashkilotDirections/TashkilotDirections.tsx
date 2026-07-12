"use client";

import React, { useState } from 'react';
import { Laptop, ChartLineUp, HandsClapping, PersonSimpleRun, CaretDown } from "@phosphor-icons/react/ssr";
import styles from './TashkilotDirections.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

const directions = [
  {
    num: "01",
    title: "Ta'lim va IT",
    desc: "Yoshlarni zamonaviy kasblarga o'qitish, dasturlash va robototexnika to'garaklari orqali ularning iqtidorini ro'yobga chiqarish. Zamonaviy kasblar va kelajak poydevori aynan shu yerda quriladi.",
    icon: Laptop,
    bg: "var(--blue)",
    color: "#ffffff"
  },
  {
    num: "02",
    title: "Tadbirkorlik",
    desc: "Startap loyihalar va biznesni qo'llab-quvvatlash. Yosh tadbirkorlarga biznes reja tuzish va investitsiya jalb qilishda ko'maklashish.",
    icon: ChartLineUp,
    bg: "var(--amber)",
    color: "#ffffff"
  },
  {
    num: "03",
    title: "Volontyorlik",
    desc: "Ijtimoiy himoyaga muhtojlarga yordam berish, ekologik aksiyalar o'tkazish va ko'ngillilar harakatini rivojlantirish orqali jamiyatga foyda keltirish.",
    icon: HandsClapping,
    bg: "var(--green-check)",
    color: "#ffffff"
  },
  {
    num: "04",
    title: "Sport va Madaniyat",
    desc: "Sog'lom turmush tarzini targ'ib qilish, sport musobaqalari va ijodiy festivallar orqali yoshlarni jismoniy va ma'naviy yetuk etib tarbiyalash.",
    icon: PersonSimpleRun,
    bg: "var(--accent-orange)",
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
            <h2 className={styles.title}>Biz nima bilan shug'ullanamiz?</h2>
          </ScrollReveal>
        </div>

        <div className={styles.accordionContainer}>
          {directions.map((dir, idx) => {
            const isActive = idx === activeIndex;
            return (
              <ScrollReveal
                key={idx}
                delay={idx + 1}
                className={`${styles.accordionPanel} ${isActive ? styles.activePanel : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                style={{ backgroundColor: isActive ? dir.bg : "var(--bg-light)" }}
              >
                
                {/* Closed State Info (Vertical on desktop, tappable row on mobile) */}
                <div className={`${styles.closedContent} ${isActive ? styles.hidden : ""}`}>
                  <span className={styles.closedNum}>{dir.num}</span>
                  <div className={styles.closedTitleWrap}>
                    <h3 className={styles.closedTitle}>{dir.title}</h3>
                  </div>
                  <CaretDown weight="duotone" className={styles.closedChevron} aria-hidden="true" />
                </div>

                {/* Open State Info (Horizontal) */}
                <div className={`${styles.openContent} ${!isActive ? styles.hidden : ""}`}>
                  <div className={styles.openIconWrap}>
                     <dir.icon weight="duotone" className={styles.openIcon} style={{ color: dir.color }} />
                  </div>
                  <div className={styles.openTextWrap}>
                    <span className={styles.openNum} style={{ color: "rgba(255,255,255,0.4)" }}>{dir.num}</span>
                    <h3 className={styles.openTitle} style={{ color: dir.color }}>{dir.title}</h3>
                    <p className={styles.openDesc} style={{ color: "rgba(255,255,255,0.9)" }}>{dir.desc}</p>
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
