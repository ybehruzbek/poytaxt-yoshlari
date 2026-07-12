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
            <div className={styles.cardBg} style={{ backgroundImage: 'url(/images/tashkilot/uzbek_patriotic_youths.png)' }}></div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.cardContent}>
              <i className="fas fa-flag" style={{ fontSize: '36px' }} />
              <h3>Vatanparvarlik</h3>
              <p>O'zbekistonning porloq kelajagi uchun xizmat qilish va milliy qadriyatlarni asrab-avaylash.</p>
            </div>
          </ScrollReveal>

          {/* Card 2: Square */}
          <ScrollReveal delay={0.2} className={`${styles.bentoCard} ${styles.cardSquare}`}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrap} style={{ background: 'var(--blue-pale)' }}>
                <i className="fas fa-handshake" style={{ color: 'var(--blue)', fontSize: '28px' }} />
              </div>
              <h3 style={{ color: 'var(--blue-deep)' }}>O'zaro Hurmat</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Barcha yoshlarni teng ko'rish va ularning fikrini hurmat qilish.</p>
            </div>
          </ScrollReveal>

          {/* Card 3: Square */}
          <ScrollReveal delay={0.3} className={`${styles.bentoCard} ${styles.cardSquare}`}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrap} style={{ background: 'color-mix(in srgb, var(--amber) 15%, white)' }}>
                <i className="fas fa-lightbulb" style={{ color: 'var(--amber)', fontSize: '28px' }} />
              </div>
              <h3 style={{ color: 'var(--blue-deep)' }}>Innovatsiya</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Yangi g'oyalarni qo'llab-quvvatlash va zamonaviy texnologiyalarni tatbiq etish.</p>
            </div>
          </ScrollReveal>

          {/* Card 4: Wide Rectangle */}
          <ScrollReveal delay={0.4} className={`${styles.bentoCard} ${styles.cardWide}`}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrap} style={{ background: 'var(--green-pale)' }}>
                <i className="fas fa-balance-scale" style={{ color: 'var(--green-check)', fontSize: '36px' }} />
              </div>
              <div className={styles.wideText}>
                <h3 style={{ color: 'var(--blue-deep)' }}>Teng Huquqlilik</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Jinsi, millati va ijtimoiy kelib chiqishidan qat'i nazar, barcha yoshlar uchun teng imkoniyatlar yaratish.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
