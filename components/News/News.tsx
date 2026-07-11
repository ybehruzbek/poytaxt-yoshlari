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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }
};

/**
 * "Digest" maketi — gazeta lentasi uslubi: chapda bitta katta bosh yangilik,
 * o'ngda ixcham gorizontal qatorlar. Loyiha/tadbir gridlaridan atayin farq
 * qiladi — har bo'lim o'z xarakteriga ega.
 */
export default function News({ items }: { items: NewsItem[] }) {
  const featured = items.find((n) => n.featured) ?? items[0];
  const rest = items.filter((n) => n.id !== featured?.id).slice(0, 4);

  if (!featured) return null;

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
          {/* Bosh yangilik */}
          <motion.div variants={itemVariants}>
            <Link href={`/yangiliklar/${featured.slug}`} className={styles.featured}>
              <div className={styles.featuredImageWrap}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={styles.image}
                />
                <span className={`${styles.tag} ${featured.tagClass}`}>
                  {featured.tag}
                </span>
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.date}>{featured.date}</div>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                {featured.excerpt && (
                  <p className={styles.excerpt}>{featured.excerpt}</p>
                )}
                <span className={styles.readMore}>
                  O&apos;qish <span className={styles.arrow}>→</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Lenta — ixcham qatorlar */}
          <div className={styles.list}>
            {rest.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/yangiliklar/${item.slug}`} className={styles.row}>
                  <div className={styles.thumb}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.rowBody}>
                    <div className={styles.rowMeta}>
                      <span className={styles.rowTag}>{item.tag}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
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
