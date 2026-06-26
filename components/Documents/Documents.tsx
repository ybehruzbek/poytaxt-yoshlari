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
            <p className={`section-desc ${styles.sectionDesc}`}>
              Nizomlar, buyruqlar, hisobotlar va boshqaruv hujjatlari.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.list}>
            {documents.map((doc, i) => (
              <div className={styles.item} key={i}>
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
                <i className={`fas fa-download ${styles.downloadIcon}`} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
