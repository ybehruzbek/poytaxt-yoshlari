"use client";

import React from "react";
import { TreeStructure, Buildings, Building, GraduationCap } from "@phosphor-icons/react/ssr";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./TashkilotStructure.module.css";

const structureData = [
  {
    id: 0,
    title: "Markaziy Kengash",
    desc: "Butun Respublika yoshlari harakatini birlashtiruvchi, yoshlar siyosati bo'yicha eng yuqori darajadagi qarorlarni qabul qiluvchi markaziy apparat.",
    icon: TreeStructure,
    color: "var(--blue)"
  },
  {
    id: 1,
    title: "Hududiy Kengashlar",
    desc: "Qoraqalpog'iston Respublikasi, Toshkent shahri va viloyatlar miqyosida yirik yoshlar dasturlarini amalga oshiruvchi tuzilmalar.",
    icon: Buildings,
    color: "var(--green-check)"
  },
  {
    id: 2,
    title: "Tuman (Shahar) Kengashlari",
    desc: "Har bir tuman va shaharda yoshlar bilan yuzma-yuz ishlaydigan, mahalliy muammolarni hal qiluvchi yoshlar Kengashlari.",
    icon: Building,
    color: "var(--amber)"
  },
  {
    id: 3,
    title: "Boshlang'ich Tashkilotlar",
    desc: "Maktab, akademik litsey, texnikum va OTMlardagi sardorlar, shuningdek mahallalardagi yoshlar yetakchilarini o'z ichiga olgan quyi bo'g'in.",
    icon: GraduationCap,
    color: "var(--accent-orange)"
  },
];

export default function TashkilotStructure() {
  return (
    <section className={styles.section}>
      <div className={`${styles.naqshBg} naqsh naqsh-yulduz`} aria-hidden="true"></div>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <h2 className={styles.title}>Tashkilot Arxitekturasi</h2>
          <p className={styles.subtitle}>Markazdan tortib har bir mahallagacha bo'lgan uzluksiz tarmoq.</p>
        </ScrollReveal>

        <div className={styles.hierarchy}>
          {structureData.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx + 1} className={styles.level}>
              <div
                className={styles.node}
                style={{ color: item.color, backgroundColor: `color-mix(in srgb, ${item.color} 15%, white)`, borderColor: `color-mix(in srgb, ${item.color} 30%, white)` }}
              >
                <item.icon weight="duotone" size={22} />
              </div>
              <div
                className={styles.levelContent}
                style={{ "--indent": `${idx * 28}px` } as React.CSSProperties}
              >
                <span className={styles.levelNum} style={{ color: item.color }}>
                  0{idx + 1}
                </span>
                <h3 className={styles.levelTitle}>{item.title}</h3>
                <p className={styles.levelDesc}>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
