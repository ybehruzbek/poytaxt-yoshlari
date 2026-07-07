import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TarixHero.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TarixHero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroBox}>
        <div className={styles.bgImageWrap}>
          <Image 
            src="/history_hero_bg.png" 
            alt="Tariximiz" 
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
                  <li className={styles.activeCrumb}>Tariximiz</li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>
                YANGI DAVR TARIXI,<br />BUYUK QADAMLAR
              </h1>
              <p className={styles.heroDesc}>
                Bu faqatgina bir tashkilotning emas, balki O&apos;zbekistondagi millionlab umidvor yoshlarning 
                o&apos;zgarishlar va g&apos;alabalar sari tashlagan buyuk qadamlari solnomasidir.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
