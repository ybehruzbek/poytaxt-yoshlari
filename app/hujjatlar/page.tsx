import styles from "@/components/Documents/Documents.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { documents } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Hujjatlar | O'zbekiston Yoshlar Ittifoqi",
};

export default function DocumentsPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg)' }}>
      <PageHeader 
        label="Hujjatlar"
        title="Rasmiy hujjatlar"
        description="Nizomlar, buyruqlar, hisobotlar va tashkilot faoliyatiga oid boshqaruv hujjatlari bilan tanishing."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Tashkilot haqida", href: "/tashkilot" },
          { label: "Hujjatlar" }
        ]}
      />
      
      <div className={styles.list} style={{ marginTop: '40px' }}>
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
  );
}
