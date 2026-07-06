"use client";

import { useState } from "react";
import styles from "./TashkilotOrbit.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const structureData = [
  { id: 0, title: "Markaziy Kengash", desc: "Butun Respublika yoshlari harakatini birlashtiruvchi, yoshlar siyosati bo'yicha eng yuqori darajadagi qarorlarni qabul qiluvchi markaziy apparat.", icon: "fas fa-sitemap" },
  { id: 1, title: "Hududiy Kengashlar", desc: "Qoraqalpog'iston Respublikasi, Toshkent shahri va viloyatlar miqyosida yirik yoshlar dasturlarini amalga oshiruvchi tuzilmalar.", icon: "fas fa-city" },
  { id: 2, title: "Tuman (Shahar) Kengashlari", desc: "Har bir tuman va shaharda yoshlar bilan yuzma-yuz ishlaydigan, mahalliy muammolarni hal qiluvchi yoshlar Kengashlari.", icon: "fas fa-building" },
  { id: 3, title: "Boshlang'ich Tashkilotlar", desc: "Maktab, akademik litsey, texnikum va OTMlardagi sardorlar, shuningdek mahallalardagi yoshlar yetakchilarini o'z ichiga olgan quyi bo'g'in.", icon: "fas fa-school" },
];

export default function TashkilotOrbit() {
  const [activeId, setActiveId] = useState(0);

  return (
    <section className={styles.orbitSection}>
      <ScrollReveal className={styles.header}>
        <span className={styles.subtitle}>Tuzilma</span>
        <h2 className={styles.title}>Galaktika Arxitekturasi</h2>
      </ScrollReveal>

      <div className={styles.orbitContainer}>
        {/* The Solar System Rings */}
        <div className={`${styles.ring} ${styles.ring1}`} />
        <div className={`${styles.ring} ${styles.ring2}`} />
        <div className={`${styles.ring} ${styles.ring3}`} />

        {/* Orbiting Planets */}
        <div className={`${styles.orbit} ${styles.orbit1}`}>
          <div className={`${styles.node} ${activeId === 1 ? styles.nodeActive : ''}`} onMouseEnter={() => setActiveId(1)} onMouseLeave={() => setActiveId(0)}>
            <div className={styles.nodeInner}><i className={structureData[1].icon}></i></div>
          </div>
        </div>

        <div className={`${styles.orbit} ${styles.orbit2}`}>
          <div className={`${styles.node} ${activeId === 2 ? styles.nodeActive : ''}`} onMouseEnter={() => setActiveId(2)} onMouseLeave={() => setActiveId(0)}>
            <div className={styles.nodeInner}><i className={structureData[2].icon}></i></div>
          </div>
        </div>

        <div className={`${styles.orbit} ${styles.orbit3}`}>
          <div className={`${styles.node} ${activeId === 3 ? styles.nodeActive : ''}`} onMouseEnter={() => setActiveId(3)} onMouseLeave={() => setActiveId(0)}>
            <div className={styles.nodeInner}><i className={structureData[3].icon}></i></div>
          </div>
        </div>

        {/* Central Sun */}
        <div className={`${styles.centerNode} ${activeId === 0 ? styles.nodeActive : ''}`} onMouseEnter={() => setActiveId(0)}>
          <i className={structureData[0].icon}></i>
        </div>
      </div>

      {/* Info Panel displayed centrally at the bottom */}
      <div className={styles.infoPanel}>
        <div className={styles.infoIcon}><i className={structureData[activeId].icon}></i></div>
        <h3 className={styles.infoTitle}>{structureData[activeId].title}</h3>
        <p className={styles.infoDesc}>{structureData[activeId].desc}</p>
      </div>
    </section>
  );
}
