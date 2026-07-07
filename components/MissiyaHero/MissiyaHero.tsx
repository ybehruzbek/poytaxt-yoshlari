import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MissiyaHero.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MissiyaHero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroBox}>
        {/* Background Image using Next.js Image for optimization */}
        <div className={styles.bgImageWrap}>
          <Image 
            src="/images/tashkilot/uzbek_patriotic_youths.png" 
            alt="Missiya va Qadriyatlar bg" 
            fill 
            priority
            className={styles.bgImage}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                <ol>
                  <li>
                    <Link href="/">Bosh sahifa</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li>
                    <Link href="/tashkilot">Tashkilot haqida</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li className={styles.activeCrumb}>Missiya</li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>
                MISSIYA VA QADRIYATLAR
              </h1>
              <p className={styles.heroDesc}>
                O'zbekiston Yoshlar Ittifoqining davlat siyosatidagi o'rni, yoshlar bilan ishlashdagi asosiy maqsadi, kelajak qarashlari va o'zgarmas tamoyillari. Biz oddiy tashkilot emasmiz — biz yoshlarning ishonchli hamrohimiz.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
