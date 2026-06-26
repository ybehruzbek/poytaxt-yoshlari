"use client";

import dynamic from "next/dynamic";
import styles from "./Districts.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const MapComponent = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      Xarita yuklanmoqda...
    </div>
  ),
});

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
              Har bir tuman kengashi o&apos;z hududidagi yoshlar faoliyatini muvofiqlashtiradi va qo&apos;llab-quvvatlaydi. Xarita ustiga bosing.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <MapComponent />
        </ScrollReveal>
      </div>
    </section>
  );
}
