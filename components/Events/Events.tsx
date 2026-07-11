"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import styles from "./Events.module.css";

const mockEvents = [
  {
    id: "1",
    title: "Respublika Yoshlar Forumi 2026",
    desc: "Yilning eng yirik yoshlar tadbirida ishtirok eting. IT, tadbirkorlik va san'at yo'nalishlarida master-klasslar.",
    date: { day: "15", month: "Okt" },
    time: "10:00",
    location: "Toshkent, Xalqaro Kongress Markazi",
    image: "https://picsum.photos/seed/youth-forum/800/600",
  },
  {
    id: "2",
    title: "IT-Startaplar tanlovi final bosqichi",
    desc: "Eng yaxshi 10 ta yoshlar loyihasi investorlar oldida taqdimot qiladi. O'z loyihangiz bilan keling va ilhom oling.",
    date: { day: "22", month: "Okt" },
    time: "14:00",
    location: "IT Park O'zbekiston",
    image: "https://picsum.photos/seed/startup-uz/800/600",
  },
  {
    id: "3",
    title: "Ekologik Aksiya: Yashil Kelajak",
    desc: "Poytaxt yoshlari birlashib, shahar atrofini ko'kalamzorlashtirish aksiyasida ishtirok etamiz.",
    date: { day: "05", month: "Noy" },
    time: "09:00",
    location: "Botanika bog'i",
    image: "https://picsum.photos/seed/eco-uz/800/600",
  },
];

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
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } 
  }
};

export default function Events() {
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
            <h2 className="section-title">Yoshlar hayotidagi muhim voqealar</h2>
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
          {mockEvents.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Link href={`/tadbirlar/${event.id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={styles.dateBadge}>
                    <span className={styles.dateDay}>{event.date.day}</span>
                    <span className={styles.dateMonth}>{event.date.month}</span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <i className="far fa-clock" /> {event.time}
                    </span>
                    <span className={styles.metaItem}>
                      <i className="fas fa-map-marker-alt" /> {event.location}
                    </span>
                  </div>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.desc}>{event.desc}</p>
                  <div className={styles.action}>
                    Ro'yxatdan o'tish <i className="fas fa-arrow-right" />
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
