import React from 'react';
import styles from './HujjatlarList.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { documents } from '@/lib/data';

export default function HujjatlarList() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.listContainer}>
          <ScrollReveal>
            <div className={styles.header}>
              <h2 className={styles.title}>Hujjatlar Arxivi</h2>
              <div className={styles.filters}>
                <button className={`${styles.filterBtn} ${styles.active}`}>Barchasi</button>
                <button className={styles.filterBtn}>PDF</button>
                <button className={styles.filterBtn}>DOCX</button>
              </div>
            </div>
          </ScrollReveal>

          <div className={styles.list}>
            {documents.map((doc, idx) => (
              <ScrollReveal key={idx} delay={idx + 1}>
                <div className={styles.docRow}>
                  
                  <div className={styles.docLeft}>
                    <div 
                      className={styles.iconBox}
                      style={{ backgroundColor: doc.iconBg, color: doc.iconColor }}
                    >
                      <i className={`fas ${doc.icon}`}></i>
                    </div>
                    <div className={styles.docInfo}>
                      <h3 className={styles.docTitle}>{doc.title}</h3>
                      <div className={styles.docMeta}>
                        <span className={styles.metaItem}>
                          <i className="fas fa-calendar"></i> {doc.date}
                        </span>
                        <span className={styles.metaItem}>
                          <i className="fas fa-file"></i> {doc.type}
                        </span>
                        <span className={styles.metaItem}>
                          <i className="fas fa-hard-drive"></i> {doc.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.docRight}>
                    <button className={styles.downloadBtn}>
                      <i className="fas fa-download"></i>
                      <span>Yuklab olish</span>
                    </button>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={5}>
            <div className={styles.pagination}>
              <button className={styles.pageBtn} disabled><i className="fas fa-chevron-left"></i></button>
              <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <button className={styles.pageBtn}>...</button>
              <button className={styles.pageBtn}><i className="fas fa-chevron-right"></i></button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
