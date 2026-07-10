"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./About.module.css";
import { aboutCards } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } 
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  }
};

export default function About() {
  return (
    <section className={styles.about} id="tashkilot">
      <div className="container">
        <div className={styles.splitLayout}>
          
          <div className={styles.leftCol}>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className={styles.introText}
            >
              <span className={styles.highlight}>O'zbekiston Yoshlar Ittifoqi</span> — yoshlarning huquq va manfaatlarini himoya qiluvchi, o'z g'oya va tashabbuslarini ro'yobga chiqarishga yordam beruvchi eng yirik jamoat tashkilotidir.
            </motion.h2>
          </div>

          <div className={styles.rightCol}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={styles.list}
            >
              {aboutCards.map((card, i) => (
                <motion.div key={i} variants={itemVariants} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemNumber}>0{i + 1}</span>
                    <h3 className={styles.itemTitle}>{card.title}</h3>
                  </div>
                  <p className={styles.itemDesc}>{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
