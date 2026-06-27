import styles from "./Documents.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { documents } from "@/lib/data";

export default function Documents() {
  return (
    <section className={styles.section} id="hujjatlar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Hujjatlar</div>
            <h2 className="section-title">
              Rasmiy hujjatlar
            </h2>
            <p className="section-desc" style={{ margin: '0 auto', maxWidth: '600px' }}>
              Nizomlar, buyruqlar, hisobotlar va boshqaruv hujjatlari.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.list}>
          {documents.map((doc, i) => (
            <ScrollReveal key={i} delay={Math.min(i + 1, 4)}>
              <div className={styles.item}>
                <div className={styles.itemLeft}>
                  <div
                    className={styles.iconWrap}
                    style={{ background: doc.iconBg, color: doc.iconColor }}
                  >
                    <i className={`fas ${doc.icon}`} />
                  </div>
                  <div>
                    <div className={styles.title}>{doc.title}</div>
                    <div className={styles.meta}>
                      {doc.type} • {doc.size} • {doc.date}
                    </div>
                  </div>
                </div>
                <div className={styles.downloadBtnWrap}>
                  <i className={`fas fa-download ${styles.downloadIcon}`} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
