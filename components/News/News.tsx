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
            <a href="#" className="btn-secondary" style={{ padding: "9px 20px", fontSize: 13 }}>
              Barchasi
              <i className="fas fa-arrow-right" style={{ fontSize: 11 }} />
            </a>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {/* Featured */}
          {featured && (
            <ScrollReveal delay={1}>
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

          {/* Small cards */}
          {others.map((item, i) => (
            <ScrollReveal key={item.id} delay={i + 2}>
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
    </section>
  );
}
