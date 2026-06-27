import Image from "next/image";
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
            <a href="#" className="btn-view-all">
              Barchasi
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </ScrollReveal>

        <div className={styles.newsContainer}>
          <div className={styles.topRow}>
            {/* Featured */}
            {featured && (
              <ScrollReveal delay={1} className={styles.featuredWrapper}>
                <div className={styles.featured}>
                  <div className={styles.featuredImg}>
                    <Image src={featured.image} alt={featured.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 55vw" />
                  </div>
                  <div className={styles.body}>
                    <span className={`${styles.tag} ${featured.tagClass}`}>{featured.tag}</span>
                    <div className={styles.date}>{featured.date}</div>
                    <h3 className={`${styles.title} ${styles.featuredTitle}`}>{featured.title}</h3>
                    {featured.excerpt && <p className={styles.excerpt}>{featured.excerpt}</p>}
                    <a href="#" className={styles.link}>
                      Batafsil <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* First Small Card (Top Right) */}
            {others[0] && (
              <ScrollReveal delay={2} className={styles.smallWrapper}>
                <div className={styles.small}>
                  <div className={styles.smallImg}>
                    <Image src={others[0].image} alt={others[0].title} width={400} height={300} sizes="120px" />
                  </div>
                  <div className={styles.smallBody}>
                    <span className={`${styles.tag} ${others[0].tagClass}`}>{others[0].tag}</span>
                    <div className={styles.date}>{others[0].date}</div>
                    <h3 className={`${styles.title} ${styles.smallTitle}`}>{others[0].title}</h3>
                    <a href="#" className={styles.link}>
                      Batafsil <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className={styles.bottomRow}>
            {/* Remaining Small Cards */}
            {others.slice(1).map((item, i) => (
              <ScrollReveal key={item.id} delay={i + 3} className={styles.flexItem}>
                <div className={styles.small}>
                  <div className={styles.smallImg}>
                    <Image src={item.image} alt={item.title} width={400} height={300} sizes="120px" />
                  </div>
                  <div className={styles.smallBody}>
                    <span className={`${styles.tag} ${item.tagClass}`}>{item.tag}</span>
                    <div className={styles.date}>{item.date}</div>
                    <h3 className={`${styles.title} ${styles.smallTitle}`}>{item.title}</h3>
                    <a href="#" className={styles.link}>
                      Batafsil <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
