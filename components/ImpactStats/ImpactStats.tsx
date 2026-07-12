"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";
import { FlowArrow, Users, HandsClapping, Medal, Star } from "@phosphor-icons/react/ssr";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./ImpactStats.module.css";

// Reusable Counter Component
function AnimatedCounter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString("en-US");
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function ImpactStats() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          
          {/* Left Side: Information & Bento Grid */}
          <div className={styles.contentCol}>
            <ScrollReveal>
              <span className={styles.badge}>Natija</span>
              <h2 className={styles.title}>Toshkent yoshlari butun mamlakatga namuna!</h2>
              <p className={styles.text}>
                Yoshlar Ittifoqining Toshkent shahar Kengashi o'tgan yil davomida yuzlab yirik loyihalarni amalga oshirdi. Bu shunchaki raqamlar emas, bu minglab yoshlarning hayotidagi ijobiy o'zgarishlar, topilgan ish joylari, amalga oshgan orzular va himoya qilingan huquqlardir.
              </p>
            </ScrollReveal>

            {/* Bento Grid Stats */}
            <div className={styles.bentoGrid}>

              <ScrollReveal delay={1} className={`${styles.bentoCard} ${styles.blueCard}`}>
                <div className={styles.bentoIcon}><FlowArrow weight="duotone" /></div>
                <div className={styles.bentoValue}>
                  <AnimatedCounter from={0} to={100} duration={2} />+
                </div>
                <div className={styles.bentoLabel}>Yirik loyihalar</div>
              </ScrollReveal>

              <ScrollReveal delay={2} className={`${styles.bentoCard} ${styles.greenCard}`}>
                <div className={styles.bentoIcon}><Users weight="duotone" /></div>
                <div className={styles.bentoValue}>
                  <AnimatedCounter from={0} to={50000} duration={2.5} />+
                </div>
                <div className={styles.bentoLabel}>Faol yoshlar qamrovi</div>
              </ScrollReveal>

              <ScrollReveal delay={3} className={`${styles.bentoCard} ${styles.orangeCard}`}>
                <div className={styles.bentoIcon}><HandsClapping weight="duotone" /></div>
                <div className={styles.bentoValue}>
                  <AnimatedCounter from={0} to={2000} duration={2.2} />+
                </div>
                <div className={styles.bentoLabel}>Volontyorlar jamoasi</div>
              </ScrollReveal>

              <ScrollReveal delay={4} className={`${styles.bentoCard} ${styles.purpleCard}`}>
                <div className={styles.bentoIcon}><Medal weight="duotone" /></div>
                <div className={styles.bentoValue}>
                  <AnimatedCounter from={0} to={500} duration={2} />+
                </div>
                <div className={styles.bentoLabel}>Tadbirkorlik grantlari</div>
              </ScrollReveal>

            </div>
          </div>

          {/* Right Side: Image and Glassmorphism Badge */}
          <ScrollReveal delay={2} className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/tashkilot/tashkilot_impact_1782907138342.png"
                alt="Yoshlar Ittifoqi Natijalari"
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Glassmorphism Badge */}
              <div className={styles.glassBadge}>
                <div className={styles.glassIconWrap}>
                  <Star weight="duotone" />
                </div>
                <div className={styles.glassText}>
                  <strong>1-O'rin</strong>
                  <span>Respublikada</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
