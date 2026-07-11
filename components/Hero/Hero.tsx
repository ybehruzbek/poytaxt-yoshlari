"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import styles from "./Hero.module.css";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1] },
  },
};

const imageIn: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.3 },
  },
};

/**
 * Brend-hero — TZ §5.2: asosiy shior (FR-HOME-01), qo'shimcha shior
 * (FR-HOME-02) va 3 ta CTA (FR-HOME-03).
 */
export default function Hero() {
  return (
    <section className={styles.hero} id="bosh-sahifa">
      <div className={styles.glowGreen} aria-hidden />
      <div className={styles.glowAmber} aria-hidden />

      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className={styles.label}>
            <span className={styles.labelDot} />
            O&apos;zbekiston Yoshlar Ittifoqi · Toshkent
          </motion.div>

          <motion.h1 variants={item} className={styles.title}>
            Yoshlar —<br />
            kelajak <span className={styles.titleAccent}>bunyodkori!</span>
          </motion.h1>

          <motion.p variants={item} className={styles.subtitle}>
            Toshkent yoshlari uchun imkoniyatlar, loyihalar va tashabbuslar
            markazi.
          </motion.p>

          <motion.div variants={item} className={styles.actions}>
            <Link href="/tadbirlar" className="btn-primary">
              Tadbirga yozilish
            </Link>
            <Link href="/murojaat" className="btn-secondary">
              Murojaat yuborish
            </Link>
          </motion.div>

          <motion.div variants={item} className={styles.tertiary}>
            <Link href="/loyihalar" className={styles.tertiaryLink}>
              Loyihalar bilan tanishing <span className={styles.tertiaryArrow}>→</span>
            </Link>
          </motion.div>

          <motion.div variants={item} className={styles.ornament} aria-hidden>
            <span /><span /><span /><span /><span />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          variants={imageIn}
          initial="hidden"
          animate="visible"
        >
          <div className={`arch-mask ${styles.archFrame}`}>
            <Image
              src="/images/hero/youth_hero_optimistic.png"
              alt="Toshkent yoshlari"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 44vw"
              className={`img-lively ${styles.archImage}`}
            />
          </div>
          <div className={styles.archShadow} aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
