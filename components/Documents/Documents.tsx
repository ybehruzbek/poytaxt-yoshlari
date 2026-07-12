import type { Document } from "@prisma/client";
import styles from "./Documents.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  File,
  FilePdf,
  FileText,
  Scroll,
  DownloadSimple,
  ClockCounterClockwise,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// Document.icon Prisma modelidan (admin panelda erkin matn sifatida
// kiritiladi, ko'ring lib/admin/resources.ts) keladigan FontAwesome
// identifikatori — shu sababli bu yerda mahalliy xarita orqali Phosphor
// komponentiga moslashtiramiz, tanilmagan qiymatlar uchun umumiy File
// ikonkasi ishlatiladi.
const docIconMap: Record<string, PhosphorIcon> = {
  "fa-file-pdf": FilePdf,
  "fa-file-circle-check": FileText,
  "fa-scroll": Scroll,
  "fa-file-lines": FileText,
  "fa-clock-rotate-left": ClockCounterClockwise,
};

export default function Documents({ items: documents }: { items: Document[] }) {
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
          {documents.map((doc, i) => {
            const DocIcon = docIconMap[doc.icon] ?? File;
            return (
              <ScrollReveal key={doc.id} delay={Math.min(i + 1, 4)}>
                <div className={styles.item}>
                  <div className={styles.itemLeft}>
                    <div
                      className={styles.iconWrap}
                      style={{
                        background: `linear-gradient(135deg, ${doc.iconBg}, #ffffff)`,
                        color: doc.iconColor
                      }}
                    >
                      <DocIcon weight="duotone" />
                    </div>
                    <div>
                      <h3 className={styles.docTitle}>{doc.title}</h3>
                      <div className={styles.meta}>
                        {doc.type} • {doc.size} • {doc.date}
                      </div>
                    </div>
                  </div>
                  <div className={styles.downloadBtnWrap}>
                    <DownloadSimple weight="duotone" className={styles.downloadIcon} />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
