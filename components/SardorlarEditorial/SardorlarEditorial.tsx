"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import CountUp from "@/components/ui/CountUp";
import styles from "./SardorlarEditorial.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SardorlarEditorial() {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Chap ustun — eyebrow, sarlavha va rasm bir marta, sahifa ochilganda kirib keladi
      gsap.fromTo(
        ".stickyReveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );

      // Rasm — yumshoq wipe-reveal (clip-path) + skala
      gsap.fromTo(
        ".imageReveal",
        { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );

      // Oddiy paragraflar — pastdan xiralashib kirish
      gsap.utils.toArray<HTMLElement>(".revealText").forEach((text) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: text, start: "top 85%" },
          }
        );
      });

      // Ajratkich chiziq — chapdan o'ngga chizilib boradi
      gsap.fromTo(
        ".dividerReveal",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".dividerReveal", start: "top 90%" },
        }
      );

      // Iqtibos bloki — biroz kattalashib, alohida urg'u bilan paydo bo'ladi
      gsap.fromTo(
        ".quoteReveal",
        { opacity: 0, scale: 0.94, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".quoteReveal", start: "top 85%" },
        }
      );

      // Statistika kartalari — ketma-ket "pop" bilan chiqadi
      gsap.fromTo(
        ".statReveal",
        { opacity: 0, y: 24, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: { trigger: ".statReveal", start: "top 90%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>

        {/* Left Side: Sticky Media & Title */}
        <div className={styles.stickyCol}>
          <div className={styles.stickyContent}>
            <span className={`${styles.eyebrow} stickyReveal`}>Bizning tayanchimiz</span>
            <h2 className={`${styles.title} stickyReveal`}>
              Sardorlar Kengashi — O'zbekiston kelajagi poydevori
            </h2>
            <div className={`${styles.imageWrapper} stickyReveal`}>
              <Image
                src="/images/tashkilot/uzbek_patriotic_youths.png"
                alt="Sardorlar Kengashi a'zolari"
                fill
                className={`${styles.image} imageReveal`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>

        {/* Right Side: Scrolling Editorial Content */}
        <div className={styles.scrollCol}>

          <p className={`${styles.paragraph} ${styles.leadParagraph} revealText`}>
            Sardorlar Kengashi — bu shunchaki yoshlar guruhi emas, balki mamlakatimizdagi yuz minglab maktab o'quvchisini birlashtirgan <strong className={styles.highlight}>eng yirik Liderlik Maktabi</strong>. Bu yerda yoshlarga mas'uliyatni o'z zimmasiga olish, jamoada ishlash va vatanni sevishni real amaliyot orqali o'rgatishadi.
          </p>

          <div className={`${styles.divider} dividerReveal`}></div>

          <p className={`${styles.paragraph} revealText`}>
            Har bir maktab, tuman, shahar va respublika bosqichida saylanadigan Sardorlar — o'z tengdoshlarining ovoziga aylanadi, ularning muammolarini birinchi bo'lib eshitadi. Ular nafaqat o'z hududidagi, balki butun mamlakat yoshlar siyosatiga bevosita ta'sir ko'rsata oladigan yosh yetakchilar safidir.
          </p>

          <blockquote className={`${styles.quoteBlock} quoteReveal`}>
            <svg className={styles.quoteMark} viewBox="0 0 50 36" fill="none" aria-hidden="true">
              <path d="M20.4 0C9.6 3.6 3.6 11.4 3.6 21.6C3.6 29.4 8.4 34.8 15 34.8C20.4 34.8 24.6 30.6 24.6 25.2C24.6 19.8 21 16.2 15.6 16.2C14.4 16.2 13.2 16.4 12.4 16.8C13.2 10.2 17.2 5 24 2.4L20.4 0Z" fill="currentColor"/>
              <path d="M44.4 0C33.6 3.6 27.6 11.4 27.6 21.6C27.6 29.4 32.4 34.8 39 34.8C44.4 34.8 48.6 30.6 48.6 25.2C48.6 19.8 45 16.2 39.6 16.2C38.4 16.2 37.2 16.4 36.4 16.8C37.2 10.2 41.2 5 48 2.4L44.4 0Z" fill="currentColor"/>
            </svg>
            <p className={styles.quoteText}>
              Sardorlar Kengashi — sog'lom raqobat va samimiy do'stlik orqali
              har bir yoshning ijodiy salohiyatini kashf etuvchi noyob ekotizim.
            </p>
          </blockquote>

          <p className={`${styles.paragraph} revealText`}>
            Aynan shuning uchun Yoshlar Ittifoqi asosiy e'tiborini Sardorlar Kengashini qo'llab-quvvatlash va rivojlantirishga qaratadi — chunki bugungi maktab sardori ertangi kunning yetakchi davlat arbobi, tadbirkori yoki olimi bo'lib yetishadi.
          </p>

          <div className={styles.statsGrid}>
            <div className={`${styles.statBox} statReveal`}>
              <span className={styles.statNumber}>
                <CountUp target={10000} suffix="+" />
              </span>
              <span className={styles.statLabel}>Maktablarda saylangan</span>
            </div>
            <div className={`${styles.statBox} statReveal`}>
              <span className={styles.statNumber}>Top 1%</span>
              <span className={styles.statLabel}>Eng faol liderlar</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
