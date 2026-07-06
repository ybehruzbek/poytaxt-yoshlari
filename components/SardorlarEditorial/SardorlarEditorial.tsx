"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import styles from "./SardorlarEditorial.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SardorlarEditorial() {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    
    // We can add some light fade-in animations for the paragraphs on the right
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray<HTMLElement>(".revealText");
      texts.forEach((text) => {
        gsap.fromTo(text, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Sticky Media & Title */}
        <div className={styles.stickyCol}>
          <div className={styles.stickyContent}>
            <span className={styles.eyebrow}>Bizning tayanchimiz</span>
            <h2 className={styles.title}>
              Sardorlar Kengashi — O'zbekiston kelajagi poydevori
            </h2>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/tashkilot/uzbek_patriotic_youths.png" 
                alt="Sardorlar Kengashi a'zolari" 
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>

        {/* Right Side: Scrolling Editorial Content */}
        <div className={styles.scrollCol}>
          
          <p className={`${styles.paragraph} ${styles.leadParagraph} revealText`}>
            Sardorlar Kengashi — bu shunchaki yoshlar guruhi emas, balki mamlakatimizdagi yuz minglab maktab o'quvchilarini o'ziga qamrab olgan <strong className={styles.highlight}>eng yirik Liderlik Maktabi</strong> hisoblanadi. Bu tuzilma yoshlarni faqatgina boshqarishni emas, balki mas'uliyatni o'z bo'yniga olishni, jamoa bilan ishlashni va vatanparvarlikni o'rgatadi.
          </p>
          
          <div className={styles.divider}></div>

          <p className={`${styles.paragraph} revealText`}>
            Har bir maktab, tuman, shahar va respublika bosqichida saylanadigan Sardorlar o'z tengdoshlarining muammolarini o'rganadi, ularning ovozi bo'ladi. Ular nafaqat o'z hududlaridagi o'zgarishlarga, balki butun mamlakat yoshlar siyosatiga bevosita ta'sir ko'rsata oladigan haqiqiy ko'ngillilar armiyasidir.
          </p>

          <blockquote className={`${styles.quoteBlock} revealText`}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.quoteText}>
              Sardorlar kengashi – bu bolalarning ijodiy va ijtimoiy qobiliyatlarini ro'yobga chiqaruvchi, tengdoshlar o'rtasida sog'lom raqobat va do'stlik muhitini yaratuvchi noyob ekotizimdir.
            </p>
          </blockquote>

          <p className={`${styles.paragraph} revealText`}>
            Aynan shuning uchun Yoshlar Ittifoqi o'zining asosiy e'tiborini Sardorlar Kengashini qo'llab-quvvatlash va rivojlantirishga qaratadi. Biz ishonamizki, bugungi maktab sardori — ertangi kunning buyuk davlat arbobi, kuchli tadbirkori yoki yetuk olimi bo'lishi muqarrar.
          </p>

          <div className={`${styles.statsGrid} revealText`}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>10,000+</span>
              <span className={styles.statLabel}>Maktablarda saylangan</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>Top 1%</span>
              <span className={styles.statLabel}>Eng faol liderlar</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
