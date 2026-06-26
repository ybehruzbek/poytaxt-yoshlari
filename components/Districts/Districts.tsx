import styles from "./Districts.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { districts } from "@/lib/data";

export default function Districts() {
  return (
    <section className={styles.section} id="tumanlar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Tuman kengashlari</div>
            <h2 className="section-title">
              Toshkent shahar tumanlari
            </h2>
            <p className={`section-desc ${styles.sectionDesc}`}>
              Har bir tuman kengashi o&apos;z hududidagi yoshlar faoliyatini muvofiqlashtiradi va qo&apos;llab-quvvatlaydi.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.grid}>
            {districts.map((d, i) => (
              <div className={styles.card} key={i}>
                <div>
                  <div className={styles.name}>{d.name}</div>
                  <div className={styles.count}>{d.youth} yoshlar</div>
                </div>
                <i className={`fas fa-arrow-right ${styles.arrow}`} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
