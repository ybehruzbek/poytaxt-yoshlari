"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import { newsItems } from "@/lib/data";

export default function Hero() {
  // Faqat oxirgi 4 ta eng muhim yangilikni olamiz
  const heroNews = newsItems.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroNews.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [heroNews.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroNews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroNews.length);
  };

  return (
    <section className={styles.hero} id="bosh-sahifa">
      
      {/* Slider Backgrounds */}
      {heroNews.map((news, idx) => (
        <div 
          key={news.id} 
          className={`${styles.slideBg} ${idx === currentIndex ? styles.activeBg : ""}`}
        >
          <Image
            src={news.image}
            alt={news.title}
            fill
            priority={idx === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <div className={styles.overlay} />
        </div>
      ))}

      <div className={styles.containerWrap}>
        <div className={styles.content}>
          
          {/* Slider Content */}
          {heroNews.map((news, idx) => (
            <div 
              key={`content-${news.id}`} 
              className={`${styles.slideContent} ${idx === currentIndex ? styles.activeContent : ""}`}
            >
              <div className={styles.metaInfo}>
                <span className={`${styles.tag} ${styles[news.tagClass] || ""}`}>
                  {news.tag}
                </span>
                <span className={styles.date}>
                  <i className="far fa-calendar-alt" /> {news.date}
                </span>
              </div>
              
              <h1 className={styles.title}>
                {news.title}
              </h1>
              
              <p className={styles.desc}>
                {news.excerpt || "O'zbekiston yoshlar ittifoqi Toshkent shahar kengashining so'nggi va eng muhim xabarlari."}
              </p>
              
              <div className={styles.actions}>
                <Link href={`#yangiliklar`} className={styles.btnPrimary}>
                  Batafsil o'qish
                  <i className="fas fa-arrow-right" />
                </Link>
                <Link href="#loyihalar" className={styles.btnSecondary}>
                  Barcha loyihalar
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* Controls */}
        <div className={styles.controlsWrap}>
          <div className={styles.dots}>
            {heroNews.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className={styles.dotProgress}></span>
              </button>
            ))}
          </div>

          <div className={styles.navBtns}>
            <button className={styles.navBtn} onClick={handlePrev} aria-label="Oldingi yangilik">
              <i className="fas fa-chevron-left" />
            </button>
            <button className={styles.navBtn} onClick={handleNext} aria-label="Keyingi yangilik">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
