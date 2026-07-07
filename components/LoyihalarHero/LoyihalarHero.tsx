import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LoyihalarHero.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function LoyihalarHero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroBox}>
        <div className={styles.bgImageWrap}>
          <Image 
            src="/images/projects/project_technopark_1782905388110.png" 
            alt="Yoshlar Loyihalari" 
            fill 
            className={styles.bgImage}
            priority
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                <ol>
                  <li>
                    <Link href="/">Bosh sahifa</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li className={styles.activeCrumb}>
                    <span>Loyihalar</span>
                  </li>
                </ol>
              </nav>

              <h1 className={styles.title}>Yoshlar qamrovi kengaytirilmoqda</h1>
              <p className={styles.desc}>
                Bizning maqsadimiz yoshlar o'z ustida ishlashi, bilimlari va amaliy ko'nikmalarini oshirishi uchun eng zamonaviy loyiha va tanlovlarni taqdim etishdir. O'z yo'nalishingizni tanlang va qatnashing!
              </p>

              <div className={styles.ctaGroup}>
                <button className={styles.primaryBtn}>Loyihalarni ko'rish</button>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>1.2K+</span>
                    <span className={styles.statLabel}>Amalga oshirilgan</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>150+</span>
                    <span className={styles.statLabel}>Faol loyihalar</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
