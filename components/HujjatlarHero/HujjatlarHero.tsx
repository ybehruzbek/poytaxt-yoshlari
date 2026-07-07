import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HujjatlarHero.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HujjatlarHero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroBox}>
        <div className={styles.bgImageWrap}>
          <Image 
            src="/images/tashkilot/tashkilot_impact_1782907138342.png" 
            alt="Hujjatlar Arvixi" 
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
                    <span>Hujjatlar va Arxiv</span>
                  </li>
                </ol>
              </nav>

              <h1 className={styles.title}>Ochiq, Shaffof va Qonuniy</h1>
              <p className={styles.desc}>
                Tashkilot faoliyatiga oid barcha nizomlar, hisobotlar, va boshqaruv hujjatlarining yagona elektron bazasi (Arxivi).
              </p>

              <div className={styles.searchBox}>
                <div className={styles.searchInner}>
                  <i className={`fas fa-search ${styles.searchIcon}`}></i>
                  <input 
                    type="text" 
                    placeholder="Hujjat nomini yoki kalit so'zni kiriting..." 
                    className={styles.searchInput}
                  />
                  <button className={styles.searchBtn}>Qidirish</button>
                </div>
                <div className={styles.searchTags}>
                  <button className={styles.tagBtn}>Nizomlar</button>
                  <button className={styles.tagBtn}>Grant arizasi</button>
                  <button className={styles.tagBtn}>Hisobot - 2024</button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
