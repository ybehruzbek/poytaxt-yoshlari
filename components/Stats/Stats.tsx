"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { Stat } from "@prisma/client";
import styles from "./Stats.module.css";
import CountUp from "@/components/ui/CountUp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

export default function Stats({ items }: { items: Stat[] }) {
  return (
    <section className={styles.stats} id="statistika">
      <div className="container">
        <div className={styles.splitLayout}>
          <div className={styles.statsLeft}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={itemVariants} className={styles.sectionTitle}>Raqamlar gapirganda</motion.h2>
              <motion.p variants={itemVariants} className={styles.sectionDesc}>
                Yoshlar Ittifoqi yillar davomida minglab yoshlarning hayotida ijobiy o'zgarishlar qildi va ularning qobiliyatlarini ro'yobga chiqarishga yordam berdi.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={styles.grid}
            >
              {items.map((stat) => (
                <motion.div key={stat.id} variants={itemVariants} className={styles.item}>
                  <div className={styles.number}>
                    <CountUp target={stat.target} suffix={stat.suffix} duration={2200} />
                  </div>
                  <div className={styles.label}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className={styles.statsRight}>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
              className={styles.revealWrapper}
            >
              <div className={styles.imageCard}>
                <Image
                  src="/images/about/about_cover_1782905651024.png"
                  alt="Yoshlar ittifoqi jamoasi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className={styles.mainImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayPlay}>
                    <i className="fas fa-play" />
                  </div>
                  <h3>Biz haqimizda qisqacha</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
