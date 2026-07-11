"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";
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
 * "Digest" maketi: chapda aylanadigan bosh yangilik (eski hero slayderi
 * ruhida — 6 soniyada almashadi), o'ngda ixcham lenta.
 */
export default function News({ items }: { items: NewsItem[] }) {
  // Bosh kartada eng so'nggi 3 ta aylanadi (featured belgilangani birinchi)
  const flagged = items.find((n) => n.featured);
  const pool = [
    ...(flagged ? [flagged] : []),
    ...items.filter((n) => n.id !== flagged?.id),
  ].slice(0, 3);
  const rest = items
    .filter((n) => !pool.some((p) => p.id === n.id))
    .slice(0, 4);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (pool.length <= 1) return;
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % pool.length),
      6000
    );
    return () => clearInterval(timer);
  }, [pool.length]);

  if (pool.length === 0) return null;
  const active = pool[current];

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
          {/* Aylanadigan bosh yangilik */}
          <motion.div variants={itemVariants}>
            <Link href={`/yangiliklar/${active.slug}`} className={styles.featured}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={styles.featuredInner}
                >
                  <div className={styles.featuredImageWrap}>
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className={styles.image}
                    />
                    <span className={`${styles.tag} ${active.tagClass}`}>
                      {active.tag}
                    </span>
                  </div>
                  <div className={styles.featuredBody}>
                    <div className={styles.date}>{active.date}</div>
                    <h3 className={styles.featuredTitle}>{active.title}</h3>
                    {active.excerpt && (
                      <p className={styles.excerpt}>{active.excerpt}</p>
                    )}
                    <span className={styles.readMore}>
                      O&apos;qish <span className={styles.arrow}>→</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {pool.length > 1 && (
                <div className={styles.dots}>
                  {pool.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`${i + 1}-yangilik`}
                      className={`${styles.dot}${i === current ? ` ${styles.dotActive}` : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrent(i);
                      }}
                    />
                  ))}
                </div>
              )}
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
