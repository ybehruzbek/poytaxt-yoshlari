"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { News as NewsItem } from "@prisma/client";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./News.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }
};

function NewsCard({
  item,
  featured = false,
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  return (
    <Link href={`/yangiliklar/${item.slug}`} className={styles.card}>
      <div
        className={`${styles.imageWrap}${featured ? ` ${styles.imageWrapFeatured}` : ""}`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className={styles.image}
        />
        <span className={`${styles.tag} ${item.tagClass}`}>{item.tag}</span>
      </div>
      <div className={styles.date}>{item.date}</div>
      <h3 className={featured ? styles.titleFeatured : styles.title}>
        {item.title}
      </h3>
      {featured && item.excerpt && (
        <p className={styles.excerpt}>{item.excerpt}</p>
      )}
    </Link>
  );
}

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
            <TextReveal text="So'nggi voqealar" className="section-title" />
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
          className={styles.layout}
        >
          <div className={styles.topRow}>
            {featured && (
              <motion.div variants={itemVariants}>
                <NewsCard item={featured} featured />
              </motion.div>
            )}
            {others[0] && (
              <motion.div variants={itemVariants}>
                <NewsCard item={others[0]} />
              </motion.div>
            )}
          </div>

          <div className={styles.bottomRow}>
            {others.slice(1).map((item) => (
              <motion.div key={item.id} variants={itemVariants} className={styles.flexItem}>
                <NewsCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
