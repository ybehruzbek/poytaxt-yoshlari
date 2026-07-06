import Link from "next/link";
import styles from "./Hujjatlar.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { documents } from "@/lib/data";

export const metadata = {
  title: "Hujjatlar Arvixi | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqining barcha huquqiy va normativ hujjatlari bazasi.",
};

const categories = [
  { icon: "fa-scale-balanced", title: "Nizom va Qoidalar", count: "12 ta hujjat" },
  { icon: "fa-chart-pie", title: "Moliyaviy Hisobotlar", count: "8 ta hujjat" },
  { icon: "fa-file-signature", title: "Buyruqlar", count: "156 ta hujjat" },
  { icon: "fa-paste", title: "Blankalar", count: "24 ta hujjat" },
];

const guarantees = [
  {
    icon: "fa-clock-rotate-left",
    iconBg: "var(--blue-pale)",
    iconColor: "var(--blue)",
    title: "Doimiy Yangilanish",
    desc: "Barcha qarorlar va buyruqlar qabul qilingan zahoti portfega joylanadi va yoshlar e'tiboriga havola etiladi."
  },
  {
    icon: "fa-shield-halved",
    iconBg: "var(--green-pale)",
    iconColor: "var(--green)",
    title: "To'liq Qonuniylik",
    desc: "Tashkilotimizning har bir xarajat va harakati huquqiy baza asosida amalga oshiriladi va xavfsizdir."
  },
  {
    icon: "fa-eye",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    title: "Jamoatchilik Nazorati",
    desc: "Bizning arxiv barcha yoshlar va OAV uchun mutlaqo ochiq bo'lib, ular xohlagan vaqtda foydalanishi mumkin."
  }
];

export default function DocumentsPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. HERO SECTION ===== */}
      <section className={styles.heroContainer}>
        <div className="container">
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.heroBreadcrumbs}>
                <ol>
                  <li>
                    <Link href="/">Bosh sahifa</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li>
                    <Link href="/tashkilot">Tashkilot haqida</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li className={styles.activeCrumb}>
                    <span>Hujjatlar va Arxiv</span>
                  </li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>Ochiq, Shaffof va Qonuniy</h1>
              <p className={styles.heroDesc}>
                Tashkilot faoliyatiga oid barcha nizomlar, hisobotlar, va boshqaruv 
                hujjatlarining yagona elektron bazasi (Arxivi).
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== 2. CATEGORIES ===== */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.catGrid}>
            {categories.map((cat, idx) => (
              <ScrollReveal key={idx} delay={idx + 1}>
                <div className={styles.catCard}>
                  <div className={styles.catIcon}>
                    <i className={`fas ${cat.icon}`}></i>
                  </div>
                  <h3 className={styles.catTitle}>{cat.title}</h3>
                  <div className={styles.catCount}>{cat.count}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. MAIN DOCUMENTS LIST ===== */}
      <section className={styles.docsSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.searchWrapper}>
              <i className={`fas fa-search ${styles.searchIcon}`}></i>
              <input 
                type="text" 
                placeholder="Kerakli hujjatni izlash (masalan: Nizom, Grant arizasi...)" 
                className={styles.searchInput}
              />
            </div>
          </ScrollReveal>

          <div className={styles.docList}>
            {documents.map((doc, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <div className={styles.docItem}>
                  <div className={styles.docLeft}>
                    <div
                      className={styles.docIconWrap}
                      style={{ 
                        background: doc.iconBg, 
                        color: doc.iconColor 
                      }}
                    >
                      <i className={`fas ${doc.icon}`} />
                    </div>
                    <div>
                      <h3 className={styles.docTitle}>{doc.title}</h3>
                      <div className={styles.docMeta}>
                        {doc.type} • {doc.size} • {doc.date}
                      </div>
                    </div>
                  </div>
                  <button className={styles.downloadBtn} title="Yuklab olish">
                    <i className="fas fa-download" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. GUARANTEE SECTION ===== */}
      <section className={styles.guaranteeSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Shaffoflik kafolati</span>
              <h2 className={styles.sectionTitle}>Biz nega doim ochiqmiz?</h2>
            </div>
          </ScrollReveal>

          <div className={styles.guaranteeGrid}>
            {guarantees.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx + 1}>
                <div className={styles.guaranteeCard}>
                  <div 
                    className={styles.gIcon}
                    style={{ background: item.iconBg, color: item.iconColor }}
                  >
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h3 className={styles.gTitle}>{item.title}</h3>
                  <p className={styles.gDesc}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>Kerakli blankani topmadingizmi?</h2>
              <p className={styles.ctaDesc}>
                Agar sizga xos bo'lgan qandaydir maxsus ariza yoki qaror nusxasi kerak bo'lsa,
                bizning yuridik bo'limga murojaat qiling. Biz uni albatta taqdim etamiz.
              </p>
              <Link href="/murojaat" className={styles.ctaBtn}>
                <span>Yuridik bo'limga bog'lanish</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
