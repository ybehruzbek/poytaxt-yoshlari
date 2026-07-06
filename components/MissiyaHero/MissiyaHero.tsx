import React from "react";
import Image from "next/image";
import styles from "./MissiyaHero.module.css";

export default function MissiyaHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.bgWrapper}>
        <Image 
          src="/images/tashkilot/uzbek_patriotic_youths.png" 
          alt="Missiya va Qadriyatlar" 
          fill 
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.badge}>Tashkilot Haqida</div>
        <h1 className={styles.title}>Missiya va Qadriyatlar</h1>
        <p className={styles.subtitle}>
          O'zbekiston Yoshlar Ittifoqining davlat siyosatidagi o'rni, yoshlar bilan ishlashdagi asosiy maqsadi, kelajak qarashlari va o'zgarmas tamoyillari. Biz oddiy tashkilot emasmiz — biz yoshlarning tayanchi va ishonchli hamrohimiz.
        </p>
      </div>
    </section>
  );
}
