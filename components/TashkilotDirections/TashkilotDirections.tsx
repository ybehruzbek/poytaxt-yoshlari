"use client";

import React from 'react';
import styles from './TashkilotDirections.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

const directions = [
  {
    title: "Ta'lim va IT",
    desc: "Yoshlarni zamonaviy kasblarga o'qitish, dasturlash va robototexnika to'garaklari orqali ularning iqtidorini ro'yobga chiqarish.",
    icon: "fas fa-laptop-code",
    color: "#0ea5e9"
  },
  {
    title: "Tadbirkorlik",
    desc: "Startap loyihalar va biznesni qo'llab-quvvatlash. Yosh tadbirkorlarga biznes reja tuzish va investitsiya jalb qilishda ko'maklashish.",
    icon: "fas fa-chart-line",
    color: "#f59e0b"
  },
  {
    title: "Volontyorlik",
    desc: "Ijtimoiy himoyaga muhtojlarga yordam berish, ekologik aksiyalar o'tkazish va ko'ngillilar harakatini rivojlantirish.",
    icon: "fas fa-hands-helping",
    color: "#10b981"
  },
  {
    title: "Sport va Madaniyat",
    desc: "Sog'lom turmush tarzini targ'ib qilish, sport musobaqalari va ijodiy festivallar orqali yoshlarni jismoniy va ma'naviy yetuk etib tarbiyalash.",
    icon: "fas fa-running",
    color: "#f43f5e"
  }
];

export default function TashkilotDirections() {
  return (
    <section className={styles.directionsSection}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.leftCol}>
          <div className={styles.stickyContent}>
            <ScrollReveal>
              <div className={styles.badge}>Yo'nalishlar</div>
              <h2 className={styles.title}>Biz nima bilan shug'ullanamiz?</h2>
              <p className={styles.desc}>
                Yoshlar Ittifoqi yoshlarning har tomonlama yetuk bo'lib yetishishi uchun turli yo'nalishlarda 
                keng ko'lamli loyihalarni amalga oshiradi.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.cardsList}>
            {directions.map((dir, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ background: `${dir.color}15`, color: dir.color }}>
                    <i className={dir.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>{dir.title}</h3>
                  <p className={styles.cardDesc}>{dir.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
