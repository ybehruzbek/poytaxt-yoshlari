"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { News as NewsItem } from "@prisma/client";
import styles from "./News.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

export default function News({ items }: { items: NewsItem[] }) {
  const featured = items.find((n) => n.featured);
  const others = items.filter((n) => !n.featured);

  return (
    <section className={styles.news} id="yangiliklar">
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <motion.div variants={itemVariants}>
            <div className="section-label">Yangiliklar</div>
            <h2 className="section-title">So&apos;nggi voqealar</h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/yangiliklar" className="btn-view-all">
              Barchasi
              <i className="fas fa-arrow-right" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.newsContainer}
        >
          <div className={styles.topRow}>
            {/* Featured */}
            {featured && (
              <motion.div variants={itemVariants} className={styles.featuredWrapper}>
                <Link href={`/yangiliklar/${featured.slug}`} className={styles.featured}>
                  <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 66vw" className={styles.bgImage} />
                  <div className={styles.featuredOverlay}>
                    <span className={`${styles.tag} ${featured.tagClass}`}>{featured.tag}</span>
                    <h3 className={styles.featuredTitle}>{featured.title}</h3>
                    <div className={styles.featuredDate}>{featured.date}</div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* First Small Card (Top Right) */}
            {others[0] && (
              <motion.div variants={itemVariants} className={styles.smallWrapper}>
                <Link href={`/yangiliklar/${others[0].slug}`} className={styles.small}>
                  <div className={styles.smallImg}>
                    <Image src={others[0].image} alt={others[0].title} fill sizes="33vw" className={styles.smallImageInner} />
                  </div>
                  <div className={styles.smallBody}>
                    <span className={`${styles.tag} ${others[0].tagClass}`}>{others[0].tag}</span>
                    <h3 className={styles.smallTitle}>{others[0].title}</h3>
                    <div className={styles.date}>{others[0].date}</div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          <div className={styles.bottomRow}>
            {/* Remaining Small Cards */}
            {others.slice(1).map((item) => (
              <motion.div key={item.id} variants={itemVariants} className={styles.flexItem}>
                <Link href={`/yangiliklar/${item.slug}`} className={styles.small}>
                  <div className={styles.smallImg}>
                    <Image src={item.image} alt={item.title} fill sizes="33vw" className={styles.smallImageInner} />
                  </div>
                  <div className={styles.smallBody}>
                    <span className={`${styles.tag} ${item.tagClass}`}>{item.tag}</span>
                    <h3 className={styles.smallTitle}>{item.title}</h3>
                    <div className={styles.date}>{item.date}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
