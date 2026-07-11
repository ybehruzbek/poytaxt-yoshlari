"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { EventWithCount } from "@/components/EventCard/EventCard";
import { UZ_MONTHS_SHORT, uzTime } from "@/lib/format";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./Events.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1] }
  }
};

export default function Events({ items }: { items: EventWithCount[] }) {
  // Bo'lajak tadbir bo'lmasa bo'limni umuman ko'rsatmaymiz.
  if (items.length === 0) return null;

  return (
    <section className={styles.events} id="tadbirlar">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <motion.div variants={itemVariants}>
            <div className="section-label">Yaqin tadbirlar</div>
            <TextReveal
              text="Yoshlar hayotidagi muhim voqealar"
              className="section-title"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/tadbirlar" className="btn-view-all">
              Barcha tadbirlar
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
          {items.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Link href={`/tadbirlar/${event.slug}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {event.image && (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className={styles.dateBadge}>
                    <span className={styles.dateDay}>{event.startsAt.getDate()}</span>
                    <span className={styles.dateMonth}>
                      {UZ_MONTHS_SHORT[event.startsAt.getMonth()]}
                    </span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <i className="far fa-clock" /> {uzTime(event.startsAt)}
                    </span>
                    <span className={styles.metaItem}>
                      <i className="fas fa-map-marker-alt" /> {event.location}
                    </span>
                  </div>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.desc}>{event.desc}</p>
                  <div className={styles.action}>
                    {event.regOpen ? "Ro'yxatdan o'tish" : "Batafsil"}{" "}
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
