"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Leadership.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { leaders } from "@/lib/data";

export default function Leadership() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let isPaused = false;
    
    // Initialize scrollPos to the middle set so cards bleed off the left edge naturally
    let scrollPos = carousel.scrollWidth / 3;
    carousel.scrollLeft = scrollPos;
    
    // Slow continuous scrolling
    const scroll = () => {
      if (!isPaused && carousel) {
        scrollPos += 0.5; // Scroll speed
        
        // Seamless infinite loop: snap back when we've scrolled exactly one set
        const singleSetWidth = carousel.scrollWidth / 3;
        if (scrollPos >= singleSetWidth * 2) {
          scrollPos -= singleSetWidth; 
        }
        carousel.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Start scrolling after a short delay
    const startTimeout = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 1000);

    // Pause on hover or touch
    const pause = () => { isPaused = true; };
    const play = () => { 
      isPaused = false; 
      // Update scrollPos to match current manual scroll position to prevent jumping
      scrollPos = carousel.scrollLeft; 
    };

    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", play);
    carousel.addEventListener("touchstart", pause);
    carousel.addEventListener("touchend", play);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      carousel.removeEventListener("mouseenter", pause);
      carousel.removeEventListener("mouseleave", play);
      carousel.removeEventListener("touchstart", pause);
      carousel.removeEventListener("touchend", play);
    };
  }, []);

  return (
    <section className={styles.section} id="rahbariyat">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerTop}>
            <div className={styles.headerContent}>
              <div className="section-label">Rahbariyat</div>
              <h2 className="section-title">
                Mas&apos;ul rahbarlar
              </h2>
              <p className="section-desc">
                Toshkent shahar Yoshlar Ittifoqi Kengashining mas&apos;ul xodimlari va koordinatorlari.
              </p>
            </div>
            
            <div className={styles.headerAction}>
              <button className={styles.topExpandBtn}>
                Barchasini ko&apos;rish <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={2}>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselContainer}>
            <div className={styles.carousel} ref={carouselRef}>
            {/* Triplicate array for seamless infinite scrolling */}
            {[...leaders, ...leaders, ...leaders].map((leader, i) => (
              <div key={i} className={styles.carouselItem}>
                <div className={styles.card}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={400}
                      height={500}
                      sizes="(max-width: 768px) 80vw, 360px"
                    />
                    <div className={styles.gradient} />
                  </div>
                  <div className={styles.body}>
                    <h3>{leader.name}</h3>
                    <p>{leader.position}</p>
                    <div className={styles.socials}>
                      <a href="#" className={styles.socialBtn} aria-label="Instagram">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="#" className={styles.socialBtn} aria-label="Telegram">
                        <i className="fab fa-telegram-plane" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
