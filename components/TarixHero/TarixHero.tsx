"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import styles from "./TarixHero.module.css";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TarixHero({ years }: { years: string[] }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroFrame}>
        <Image
          src="/history_hero_bg.png"
          alt="O'zbekiston Yoshlar Ittifoqi tarixi"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroNaqsh} naqsh naqsh-rozetka`} aria-hidden="true"></div>

        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={item} className={styles.eyebrow}>
            2017-yildan buyon
          </motion.span>

          <motion.h1 variants={item} className={styles.title}>
            Yangi davr tarixi, <span className={styles.titleAccent}>buyuk qadamlar</span>
          </motion.h1>

          <motion.p variants={item} className={styles.subtitle}>
            Bu faqatgina bir tashkilotning emas, balki O&apos;zbekistondagi millionlab umidvor
            yoshlarning o&apos;zgarishlar va g&apos;alabalar sari tashlagan buyuk qadamlari solnomasidir.
          </motion.p>

          <motion.nav variants={item} className={styles.yearStrip} aria-label="Yillar bo'yicha o'tish">
            {years.map((year) => (
              <a key={year} href={`#yil-${year}`} className={styles.yearChip}>
                {year}
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
}
