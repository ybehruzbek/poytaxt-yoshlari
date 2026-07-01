"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className={styles.timelineSection}>
      <div className="container">
        <div className={styles.header}>
          <ScrollReveal>
            <h2 className={styles.title}>Tariximiz</h2>
            <p className={styles.desc}>Muhim voqealar xronologiyasi</p>
          </ScrollReveal>
          <div className={styles.controls}>
            <button onClick={scrollLeft} className={styles.controlBtn}><i className="fas fa-chevron-left" /></button>
            <button onClick={scrollRight} className={styles.controlBtn}><i className="fas fa-chevron-right" /></button>
          </div>
        </div>

        <div className={styles.timelineWrapper} ref={scrollRef}>
          <div className={styles.timelineTrack}>
            <div className={styles.line}></div>
            {timelineEvents.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.yearBadge}>{item.year}</div>
                <div className={styles.itemContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link href="/tashkilot/tarix" className={styles.moreBtn}>
            To'liq tarixni o'qish <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
