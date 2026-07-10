import Image from "next/image";
import Link from "next/link";
import type { YouthLeader } from "@prisma/client";
import styles from "./YouthLeaders.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function YouthLeaders({ items: youthLeaders }: { items: YouthLeader[] }) {
  return (
    <section className={styles.section} id="yetakchilar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerTop}>
            <div className={styles.headerContent}>
              <div className="section-label">Yoshlar yetakchilari</div>
              <h2 className="section-title">
                Bizning yetakchilar
              </h2>
              <p className="section-desc">
                Mahalla va oliygohlarda yoshlar bilan bevosita ishlaydigan, tashabbuskor va faol yoshlarimiz.
              </p>
            </div>
            <Link href="/yetakchilar" className="btn-view-all">
              Barchasini ko&apos;rish <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {youthLeaders.map((leader, i) => (
            <ScrollReveal key={leader.id} delay={Math.min(i + 1, 4)} className={styles.cardWrapper}>
              <Link href={`/yetakchilar/${leader.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.card}>
                <div className={styles.glow} />
                <div className={styles.cardInner}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={400}
                      height={500}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className={styles.categoryBadge}>{leader.category}</div>
                    <div className={styles.socialOverlay}>
                      <span className={styles.socialBtn} aria-label="Telegram"><i className="fab fa-telegram-plane" /></span>
                      <span className={styles.socialBtn} aria-label="Instagram"><i className="fab fa-instagram" /></span>
                      <span className={styles.socialBtn} aria-label="Email"><i className="fas fa-envelope" /></span>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <h3>{leader.name}</h3>
                    <p className={styles.place}>{leader.place}</p>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
