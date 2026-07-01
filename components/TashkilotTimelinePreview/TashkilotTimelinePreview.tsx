"use client";

import React from 'react';
import styles from './TashkilotTimelinePreview.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

const timelineEvents = [
  { year: "2017", title: "O'zbekiston Yoshlar Ittifoqi tashkil topdi", desc: "O'zbekiston yoshlari hayotida yangi davr boshlandi." },
  { year: "2018", title: "Besh Tashabbus loyihasi", desc: "Yoshlarning ma'naviyatini yuksaltirish va bo'sh vaqtini mazmunli tashkil etish uchun yirik davlat dasturi." },
  { year: "2020", title: "Yoshlar agentligi", desc: "O'zbekiston Respublikasi Yoshlar ishlari agentligi tashkil topdi." },
  { year: "2022", title: "Besh million a'zo", desc: "Respublika bo'ylab 5 milliondan ortiq yoshlar tashkilot atrofida birlashdi." },
  { year: "2024", title: "Yangi Qadamlar", desc: "Raqamlashtirish va xalqaro yoshlar loyihalariga katta e'tibor qaratildi." },
];

export default function TashkilotTimelinePreview() {
  return (
    <section className={styles.timelineSection}>
      <div className="container">
        <div className={styles.header}>
          <ScrollReveal>
            <h2 className={styles.title}>Tariximiz</h2>
            <p className={styles.desc}>Tashkilotimiz bosib o'tgan shonli yo'l</p>
          </ScrollReveal>
        </div>

        <div className={styles.cardContainer}>
          {timelineEvents.map((item, i) => (
            <div 
              key={i} 
              className={styles.stackedCard}
              style={{ top: `calc(15vh + ${i * 40}px)` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.watermarkYear}>{item.year}</div>
                <div className={styles.cardContent}>
                  <div className={styles.yearBadge}>{item.year}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
