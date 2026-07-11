"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { Project } from "@prisma/client";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./Projects.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }
};

export default function Projects({ items }: { items: Project[] }) {
  return (
    <section className={styles.projects} id="loyihalar">
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <motion.div variants={itemVariants}>
            <div className="section-label">Faol loyihalar</div>
            <TextReveal
              text="Hozirda amalga oshirilayotgan dasturlar"
              className="section-title"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/loyihalar" className="btn-view-all">
              Barcha loyihalar
              <i className="fas fa-arrow-right" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.grid}
        >
          {items.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className={styles.cardWrapper}>
              <Link href={`/loyihalar/${project.slug}`} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                  />
                  <span className={styles.status}>{project.status}</span>
                </div>

                <div className={styles.meta}>
                  <span className={styles.category}>{project.category}</span>
                </div>

                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.desc}</p>

                <span className={styles.action}>
                  Batafsil <span className={styles.arrow}>→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
