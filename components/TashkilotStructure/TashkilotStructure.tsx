"use client";

import React from "react";
import styles from "./TashkilotStructure.module.css";

const structureData = [
  { 
    id: 0, 
    title: "Markaziy Kengash", 
    desc: "Butun Respublika yoshlari harakatini birlashtiruvchi, yoshlar siyosati bo'yicha eng yuqori darajadagi qarorlarni qabul qiluvchi markaziy apparat.", 
    icon: "fas fa-sitemap", 
    color: "#0ea5e9" 
  },
  { 
    id: 1, 
    title: "Hududiy Kengashlar", 
    desc: "Qoraqalpog'iston Respublikasi, Toshkent shahri va viloyatlar miqyosida yirik yoshlar dasturlarini amalga oshiruvchi tuzilmalar.", 
    icon: "fas fa-city", 
    color: "#10b981" 
  },
  { 
    id: 2, 
    title: "Tuman (Shahar) Kengashlari", 
    desc: "Har bir tuman va shaharda yoshlar bilan yuzma-yuz ishlaydigan, mahalliy muammolarni hal qiluvchi yoshlar Kengashlari.", 
    icon: "fas fa-building", 
    color: "#f59e0b" 
  },
  { 
    id: 3, 
    title: "Boshlang'ich Tashkilotlar", 
    desc: "Maktab, akademik litsey, texnikum va OTMlardagi sardorlar, shuningdek mahallalardagi yoshlar yetakchilarini o'z ichiga olgan quyi bo'g'in.", 
    icon: "fas fa-school", 
    color: "#8b5cf6" 
  },
];

export default function TashkilotStructure() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Tuzilma</span>
          <h2 className={styles.title}>Tashkilot Arxitekturasi</h2>
          <p className={styles.subtitle}>Markazdan tortib har bir mahallagacha bo'lgan uzluksiz tarmoq.</p>
        </div>

        <div className={styles.grid}>
          {structureData.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconBox} style={{ color: item.color, backgroundColor: `${item.color}15` }}>
                <i className={item.icon}></i>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
