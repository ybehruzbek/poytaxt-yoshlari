"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Leadership.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { leaders } from "@/lib/data";

export default function Leadership() {
  // To ensure the marquee is wide enough even on large screens,
  // we repeat the leaders array multiple times to form one "set"
  const extendedLeaders = [...leaders, ...leaders, ...leaders, ...leaders];

  return (
    <section className={styles.section} id="rahbariyat">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerTop}>
            <div className={styles.headerContent}>
              <div className="section-label">Rahbariyat</div>
              <h2 className="section-title">
                Mas&apos;ul rahbarlar
              </h2>
              <p className="section-desc">
                Toshkent shahar Yoshlar Ittifoqi Kengashining mas&apos;ul xodimlari va koordinatorlari.
              </p>
            </div>
            
              <Link href="/rahbariyat" className="btn-view-all">
                Barchasini ko&apos;rish <i className="fas fa-arrow-right"></i>
              </Link>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={2}>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {/* First Set */}
              <div className={styles.carouselSet}>
                {extendedLeaders.map((leader, i) => (
                  <div key={`set1-${i}`} className={styles.carouselItem}>
                    <Link href={`/rahbariyat/${leader.id}`} className={styles.card} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                      <div className={styles.imgWrap}>
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          width={400}
                          height={500}
                          sizes="(max-width: 768px) 80vw, 360px"
                        />
                        <div className={styles.gradient} />
                      </div>
                      <div className={styles.body}>
                        <h3>{leader.name}</h3>
                        <p>{leader.position}</p>
                        <div className={styles.socials}>
                          <span className={styles.socialBtn} aria-label="Instagram">
                            <i className="fab fa-instagram" />
                          </span>
                          <span className={styles.socialBtn} aria-label="Telegram">
                            <i className="fab fa-telegram-plane" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {/* Second Set for seamless looping */}
              <div className={styles.carouselSet}>
                {extendedLeaders.map((leader, i) => (
                  <div key={`set2-${i}`} className={styles.carouselItem}>
                    <Link href={`/rahbariyat/${leader.id}`} className={styles.card} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                      <div className={styles.imgWrap}>
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          width={400}
                          height={500}
                          sizes="(max-width: 768px) 80vw, 360px"
                        />
                        <div className={styles.gradient} />
                      </div>
                      <div className={styles.body}>
                        <h3>{leader.name}</h3>
                        <p>{leader.position}</p>
                        <div className={styles.socials}>
                          <span className={styles.socialBtn} aria-label="Instagram">
                            <i className="fab fa-instagram" />
                          </span>
                          <span className={styles.socialBtn} aria-label="Telegram">
                            <i className="fab fa-telegram-plane" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
