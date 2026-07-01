import styles from "@/components/About/About.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { timelineItems } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Tariximiz | O'zbekiston Yoshlar Ittifoqi",
};

export default function HistoryPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader 
        label="Tarix"
        title="Tashkilot Tarixi"
        description="O'zbekiston Yoshlar Ittifoqi tashkil etilgan kundan boshlab bosib o'tgan muhim sanalar va voqealar xronologiyasi."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Tashkilot haqida", href: "/tashkilot" },
          { label: "Tariximiz" }
        ]}
      />
      
      <div className={styles.timelineGrid} style={{ marginTop: '40px' }}>
        {timelineItems.map((item, i) => (
          <ScrollReveal key={i} delay={i + 1} className={styles.timelineItem}>
            <span className={styles.year}>{item.year}</span>
            <p className={styles.timelineText}>{item.text}</p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
