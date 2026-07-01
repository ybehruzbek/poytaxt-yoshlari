import styles from "./Documents.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { documents } from "@/lib/data";

export default function Documents() {
  return (
    <section className={styles.section} id="hujjatlar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Rasmiy hujjatlar
            </h2>
            <p className={styles.desc}>
              Nizomlar, buyruqlar, hisobotlar va tashkilot faoliyatiga oid boshqaruv hujjatlari bilan tanishing.
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
                    style={{ 
                      background: `linear-gradient(135deg, ${doc.iconBg}, #ffffff)`, 
                      color: doc.iconColor 
                    }}
                  >
                    <i className={`fas ${doc.icon}`} />
                  </div>
                  <div>
                    <h3 className={styles.docTitle}>{doc.title}</h3>
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
