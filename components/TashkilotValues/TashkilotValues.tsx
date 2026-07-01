"use client";

import React from 'react';
import styles from './TashkilotValues.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function TashkilotValues() {
  return (
    <section className={styles.valuesSection}>
      <div className="container">
        <div className={styles.header}>
          <ScrollReveal>
            <h2 className={styles.title}>Bizning Qadriyatlarimiz</h2>
            <p className={styles.desc}>Har bir loyiha va tashabbusimiz negizida yotuvchi asosiy ustunlar</p>
          </ScrollReveal>
        </div>

        <div className={styles.bentoGrid}>
          {/* Card 1: Large Rectangle */}
          <ScrollReveal delay={0.1} className={`${styles.bentoCard} ${styles.cardLarge}`}>
            <div className={styles.cardBg} style={{ backgroundImage: 'url(/images/tashkilot/tashkilot_hero_1782907121959.png)' }}></div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.cardContent}>
              <i className="fas fa-flag" />
              <h3>Vatanparvarlik</h3>
              <p>O'zbekistonning porloq kelajagi uchun xizmat qilish va milliy qadriyatlarni asrab-avaylash.</p>
            </div>
          </ScrollReveal>

          {/* Card 2: Square */}
          <ScrollReveal delay={0.2} className={`${styles.bentoCard} ${styles.cardSquare}`}>
            <div className={styles.cardContent}>
              <i className="fas fa-hands-helping" style={{ color: '#0ea5e9' }} />
              <h3 style={{ color: '#0f172a' }}>O'zaro Hurmat</h3>
              <p style={{ color: '#475569' }}>Barcha yoshlarni teng ko'rish va ularning fikrini hurmat qilish.</p>
            </div>
          </ScrollReveal>

          {/* Card 3: Square */}
          <ScrollReveal delay={0.3} className={`${styles.bentoCard} ${styles.cardSquare}`}>
            <div className={styles.cardContent}>
              <i className="fas fa-lightbulb" style={{ color: '#f59e0b' }} />
              <h3 style={{ color: '#0f172a' }}>Innovatsiya</h3>
              <p style={{ color: '#475569' }}>Yangi g'oyalarni qo'llab-quvvatlash va zamonaviy texnologiyalarni tatbiq etish.</p>
            </div>
          </ScrollReveal>

          {/* Card 4: Wide Rectangle */}
          <ScrollReveal delay={0.4} className={`${styles.bentoCard} ${styles.cardWide}`}>
            <div className={styles.cardContent}>
              <i className="fas fa-balance-scale" style={{ color: '#10b981' }} />
              <div className={styles.wideText}>
                <h3 style={{ color: '#0f172a' }}>Teng Huquqlilik</h3>
                <p style={{ color: '#475569' }}>Jinsi, millati va ijtimoiy kelib chiqishidan qat'i nazar, barcha yoshlar uchun teng imkoniyatlar yaratish.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
