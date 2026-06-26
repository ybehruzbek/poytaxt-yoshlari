"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => {
    setLightboxSrc(src);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section className={styles.section} id="galeriya">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Foto galeriya</div>
            <h2 className="section-title">
              Foto lahzalar
            </h2>
            <p className={`section-desc ${styles.sectionDesc}`}>
              Yoshlar tadbirlari, jamoat loyihalari va rasmiy uchrashuvlardan eng yorqin lahzalar.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.grid}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`${styles.item} ${img.aspect === "tall" ? styles.tall : styles.square}`}
                onClick={() => openLightbox(img.full)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={img.aspect === "tall" ? 800 : 600}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className={styles.overlay}>
                  <i className={`fas fa-search-plus ${styles.zoomIcon}`} />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <div
        className={`${styles.lightbox} ${lightboxSrc ? styles.lightboxOpen : ""}`}
        onClick={closeLightbox}
      >
        <button className={styles.lightboxClose} onClick={closeLightbox}>
          <i className="fas fa-times" />
        </button>
        {lightboxSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={lightboxSrc}
            alt="Gallery"
            className={styles.lightboxImg}
          />
        )}
      </div>
    </section>
  );
}
