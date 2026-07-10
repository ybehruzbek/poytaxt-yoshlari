"use client";

import { useState, useRef, useCallback } from "react";
import type { MapRegion } from "@prisma/client";
import styles from "./MapSection.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MapSection({ regions }: { regions: MapRegion[] }) {
  const [selected, setSelected] = useState<MapRegion | null>(null);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((region: MapRegion) => {
    setTooltipText(region.name);
    setTooltipVisible(true);
    setSelected(region);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltipPos({
      left: e.clientX - rect.left,
      top: e.clientY - rect.top - 40,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipVisible(false);
  }, []);

  return (
    <section className={styles.section} id="hududlar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div>
              <div className="section-label">Hududiy tuzilma</div>
              <h2 className="section-title">
                Barcha viloyatlarda<br />filiallar faoliyatda
              </h2>
            </div>
            <p className="section-desc" style={{ textAlign: "right" }}>
              Xaritadagi viloyatga sichqonchani oling. Har bir viloyatda Yoshlar Ittifoqining faol filiali mavjud.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.layout}>
            <div className={styles.svgWrap} ref={wrapRef}>
              <svg viewBox="0 0 540 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="O'zbekiston xaritasi">
                {regions.map((region) => (
                  <polygon
                    key={region.id}
                    className={styles.region}
                    points={region.points}
                    tabIndex={0}
                    role="button"
                    aria-label={region.name}
                    onMouseEnter={() => handleMouseEnter(region)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelected(region)}
                    onFocus={() => setSelected(region)}
                  />
                ))}
              </svg>
              <div
                className={`${styles.tooltip} ${tooltipVisible ? styles.tooltipVisible : ""}`}
                style={{ left: tooltipPos.left, top: tooltipPos.top, transform: "translateX(-50%)" }}
              >
                {tooltipText}
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={`${styles.infoCard} ${selected ? styles.infoCardActive : ""}`}>
                <div className={styles.metaLabel}>Viloyat</div>
                <h3>{selected?.name || "O'zbekiston"}</h3>
                <p>
                  {selected?.desc || "Xaritadagi viloyatni tanlang. Har bir viloyatda Yoshlar Ittifoqining faol filiali faoliyat yuritadi va o'z hududida maxsus dasturlarni amalga oshiradi."}
                </p>
                <div className={styles.metaLabel} style={{ marginTop: 16 }}>Filial rahbari</div>
                <div className={styles.metaValue}>{selected?.head || "Tanlang"}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
