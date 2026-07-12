import React from 'react';
import type { Document } from '@prisma/client';
import styles from './HujjatlarList.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  File,
  FilePdf,
  FileText,
  Scroll,
  Calendar,
  HardDrive,
  DownloadSimple,
  CaretLeft,
  CaretRight,
  ClockCounterClockwise,
} from '@phosphor-icons/react/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

// Document.icon Prisma modelidan (admin panelda erkin matn sifatida
// kiritiladi, ko'ring lib/admin/resources.ts) keladigan FontAwesome
// identifikatori — shu sababli bu yerda mahalliy xarita orqali Phosphor
// komponentiga moslashtiramiz, tanilmagan qiymatlar uchun umumiy File
// ikonkasi ishlatiladi.
const docIconMap: Record<string, PhosphorIcon> = {
  "fa-file-pdf": FilePdf,
  "fa-file-circle-check": FileText,
  "fa-scroll": Scroll,
  "fa-file-lines": FileText,
  "fa-clock-rotate-left": ClockCounterClockwise,
};

export default function HujjatlarList({ items: documents }: { items: Document[] }) {
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
            {documents.map((doc, idx) => {
              const DocIcon = docIconMap[doc.icon] ?? File;
              return (
                <ScrollReveal key={doc.id} delay={idx + 1}>
                  <div className={styles.docRow}>

                    <div className={styles.docLeft}>
                      <div
                        className={styles.iconBox}
                        style={{ backgroundColor: doc.iconBg, color: doc.iconColor }}
                      >
                        <DocIcon weight="duotone" />
                      </div>
                      <div className={styles.docInfo}>
                        <h3 className={styles.docTitle}>{doc.title}</h3>
                        <div className={styles.docMeta}>
                          <span className={styles.metaItem}>
                            <Calendar weight="duotone" /> {doc.date}
                          </span>
                          <span className={styles.metaItem}>
                            <File weight="duotone" /> {doc.type}
                          </span>
                          <span className={styles.metaItem}>
                            <HardDrive weight="duotone" /> {doc.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.docRight}>
                      <button className={styles.downloadBtn}>
                        <DownloadSimple weight="duotone" />
                        <span>Yuklab olish</span>
                      </button>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          
          <ScrollReveal delay={5}>
            <div className={styles.pagination}>
              <button className={styles.pageBtn} disabled><CaretLeft weight="duotone" /></button>
              <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <button className={styles.pageBtn}>...</button>
              <button className={styles.pageBtn}><CaretRight weight="duotone" /></button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
