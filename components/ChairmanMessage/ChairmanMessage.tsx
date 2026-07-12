"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { Quotes } from "@phosphor-icons/react/ssr";
import styles from "./ChairmanMessage.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ChairmanMessage() {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Gentle parallax on the image
      gsap.to(".portraitImg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade up the text content
      gsap.fromTo(".messageContentBlock",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Quote badge leads the eye in first, before the rest of the text
      gsap.fromTo(`.${styles.quoteIconWrap}`,
        { opacity: 0, scale: 0.6, rotate: -8 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.7,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>

        <div className={styles.grid}>
          {/* Executive Portrait (Left Side) */}
          <div className={styles.imageCol}>
            <div className={`${styles.naqshAccent} naqsh naqsh-rozetka`} aria-hidden="true"></div>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/tashkilot/tashkilot_chairman_1782907129930.png"
                alt="Timur Ishmetov - Kengash Raisi"
                fill
                className={`portraitImg ${styles.image}`}
                sizes="(max-width: 900px) 100vw, 500px"
              />
              {/* Elegant vignette overlay */}
              <div className={styles.vignette}></div>
            </div>
          </div>

          {/* Editorial Content (Right Side) */}
          <div className={`messageContentBlock ${styles.contentCol}`}>
            <div className={styles.quoteIconWrap}>
              <Quotes weight="duotone" className={styles.quoteIcon} />
            </div>

            <h2 className={styles.mainQuote}>
              Yoshlar — yangi <span className={styles.highlight}>O'zbekistonning eng katta boyligi</span>.
            </h2>

            <blockquote className={styles.quoteBlock}>
              <p className={styles.paragraph}>
                “Toshkent yoshlari — poytaxtimizning yuzi, kuchi va kelajagidir. Biz har bir yoshning o'z o'rnini topishi, o'z iqtidorini ro'yobga chiqarishi uchun barcha sharoitlarni yaratishga tayyormiz.”
              </p>
              <p className={styles.paragraph}>
                “Bizning maqsadimiz — nafaqat tadbirlar o'tkazish, balki yoshlarning chinakam suyanchig'iga aylanish.”
              </p>
            </blockquote>

            <div className={styles.authorBlock}>
              <div className={styles.authorLine}></div>
              <strong className={styles.authorName}>Karimov Jasur</strong>
              <span className={styles.authorRole}>O'zbekiston Yoshlar ittifoqi<br/>Toshkent shahar Kengashi raisi</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
