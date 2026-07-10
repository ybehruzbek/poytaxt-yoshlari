"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { News } from "@prisma/client";
import styles from "./Hero.module.css";

export default function Hero({ news }: { news: News[] }) {
  const heroNews = news.slice(0, 4);
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
      {/* Dekorativ SVG overlay — Baraka-ilhomli yumshoq petal */}
      <svg className={styles.heroOverlay} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C75 0 100 25 100 50 C100 75 75 100 50 100 C25 100 0 75 0 50 C0 25 25 0 50 0Z" fill="url(#hero-gradient)" opacity="0.03" transform="scale(0.8) translate(10, 10)" />
        <defs>
          <linearGradient id="hero-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--blue-deep)" />
            <stop offset="1" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.splitContainer}>
        
        {/* L E F T   P A N E   (Text Content) */}
        <div className={styles.leftPane}>
          <div className={styles.textWrap}>
            {heroNews.map((news, idx) => (
              <div 
                key={`content-${news.id}`} 
                className={`${styles.textContent} ${idx === currentIndex ? styles.activeContent : ""}`}
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
                
                {news.excerpt && (
                  <p className={styles.desc}>
                    {news.excerpt}
                  </p>
                )}
                
                <div className={styles.actions}>
                  <Link href={`/yangiliklar/${news.slug}`} className={styles.btnPrimary}>
                    Batafsil o'qish
                  </Link>
                  <Link href="/yangiliklar" className={styles.btnSecondary}>
                    Barcha yangiliklar <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Controls - Positioned at bottom of left pane */}
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

        {/* R I G H T   P A N E   (Images) */}
        <div className={styles.rightPane}>
          <div className={styles.imageMask}>
            {heroNews.map((news, idx) => (
              <div 
                key={`image-${news.id}`} 
                className={`${styles.imageSlide} ${idx === currentIndex ? styles.activeImage : ""}`}
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{ objectFit: "cover", objectPosition: "center center" }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
