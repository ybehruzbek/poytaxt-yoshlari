"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import styles from "./TashkilotHeroSlider.module.css";

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

export default function TashkilotHeroSlider() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroFrame}>
        <Image
          src="/images/tashkilot/tashkilot_hero_1782907121959.png"
          alt="O'zbekiston Yoshlar Ittifoqi a'zolari"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className={styles.label}>
            <span className={styles.labelDot} />
            Biz Kimmiz?
          </motion.div>

          <motion.h1 variants={item} className={styles.title}>
            Kelajakni <span className={styles.titleAccent}>birgalikda</span> quramiz
          </motion.h1>

          <motion.p variants={item} className={styles.subtitle}>
            O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini
            himoya qiluvchi eng yirik jamoat tashkilotidir.
          </motion.p>

          <motion.div variants={item} className={styles.actions}>
            <Link href="/faoliyat" className="btn-hero-primary">
              Faoliyatimiz bilan tanishing
            </Link>
            <Link href="/loyihalar" className="btn-hero-secondary">
              Loyihalarni ko'ring
            </Link>
          </motion.div>

          <motion.div variants={item} className={styles.ornament} aria-hidden>
            <span /><span /><span /><span /><span />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
