"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { News } from "@prisma/client";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Hero.module.css";

export default function Hero({ news }: { news?: News[] }) {
  // 3 ta eng yangi yangilikni ajratib olamiz
  const slides = news?.slice(0, 3) || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const handleDotClick = (index: number) => setCurrent(index);
  const handlePrev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className={styles.hero} id="bosh-sahifa">
      <div className={styles.splitContainer}>
        
        {/* L E F T   P A N E   (Text Content) */}
        <div className={styles.leftPane}>
          <div className={styles.textContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                  },
                  exit: {
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }
                }}
                className={styles.textWrap}
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
                  }}
                  className={styles.metaInfo}
                >
                  <span className={styles.tag}>
                    {slides[current].tag || "Yangilik"}
                  </span>
                  <span className={styles.date}>
                    <i className="far fa-calendar-alt" /> {slides[current].date}
                  </span>
                </motion.div>
                
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
                  }}
                  className={styles.title}
                >
                  {slides[current].title}
                </motion.h1>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
                  }}
                  className={styles.desc}
                >
                  {slides[current].excerpt || "O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi eng yirik jamoat tashkilotidir."}
                </motion.p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
                  }}
                  className={styles.actions}
                >
                  <Link href={`/yangiliklar/${slides[current].slug}`} className={styles.btnPrimary}>
                    Batafsil o'qish
                  </Link>
                  <Link href="/loyihalar" className={styles.btnSecondary}>
                    Barcha loyihalar
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
              <div className={styles.controlsWrap}>
                <div className={styles.dots}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
                      onClick={() => handleDotClick(i)}
                      aria-label={`Slide ${i + 1}`}
                    >
                      <div className={styles.dotProgress} />
                    </button>
                  ))}
                </div>
                <div className={styles.navBtns}>
                  <button className={styles.navBtn} onClick={handlePrev} aria-label="Oldingi">
                    <i className="fas fa-arrow-left" />
                  </button>
                  <button className={styles.navBtn} onClick={handleNext} aria-label="Keyingi">
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* R I G H T   P A N E   (Images) */}
        <div className={styles.rightPane}>
          <div className={styles.imageMaskWrapper}>
            <div className={styles.imageMask}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={styles.imageSlide}
                >
                  <Image
                    src={slides[current].image || "/images/hero/youth_hero_optimistic.png"}
                    alt={slides[current].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
