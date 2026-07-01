import Image from "next/image";
import Link from "next/link";
import styles from "./News.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { newsItems } from "@/lib/data";

export default function News() {
  const featured = newsItems.find((n) => n.featured);
  const others = newsItems.filter((n) => !n.featured);

  return (
    <section className={styles.news} id="yangiliklar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div>
              <div className="section-label">Yangiliklar</div>
              <h2 className="section-title">So&apos;nggi voqealar</h2>
            </div>
            <Link href="/yangiliklar" className="btn-view-all">
              Barchasi
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.newsContainer}>
          <div className={styles.topRow}>
            {/* Featured */}
            {featured && (
              <ScrollReveal delay={1} className={styles.featuredWrapper}>
                <Link href={`/yangiliklar/${featured.id}`} className={styles.featured}>
                  <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 66vw" className={styles.bgImage} />
                  <div className={styles.featuredOverlay}>
                    <span className={`${styles.tag} ${featured.tagClass}`}>{featured.tag}</span>
                    <h3 className={styles.featuredTitle}>{featured.title}</h3>
                    <div className={styles.featuredDate}>{featured.date}</div>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* First Small Card (Top Right) */}
            {others[0] && (
              <ScrollReveal delay={2} className={styles.smallWrapper}>
                <Link href={`/yangiliklar/${others[0].id}`} className={styles.small}>
                  <div className={styles.smallImg}>
                    <Image src={others[0].image} alt={others[0].title} width={400} height={300} sizes="33vw" />
                  </div>
                  <div className={styles.smallBody}>
                    <span className={`${styles.tag} ${others[0].tagClass}`}>{others[0].tag}</span>
                    <h3 className={styles.smallTitle}>{others[0].title}</h3>
                    <div className={styles.date}>{others[0].date}</div>
                  </div>
                </Link>
              </ScrollReveal>
            )}
          </div>

          <div className={styles.bottomRow}>
            {/* Remaining Small Cards */}
            {others.slice(1).map((item, i) => (
              <ScrollReveal key={item.id} delay={i + 3} className={styles.flexItem}>
                <Link href={`/yangiliklar/${item.id}`} className={styles.small}>
                  <div className={styles.smallImg}>
                    <Image src={item.image} alt={item.title} width={400} height={300} sizes="33vw" />
                  </div>
                  <div className={styles.smallBody}>
                    <span className={`${styles.tag} ${item.tagClass}`}>{item.tag}</span>
                    <h3 className={styles.smallTitle}>{item.title}</h3>
                    <div className={styles.date}>{item.date}</div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
