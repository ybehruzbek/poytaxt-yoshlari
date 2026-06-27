"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setZoom(1);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoom(1);
    document.body.style.overflow = "";
  }, []);

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % galleryImages.length);
      setZoom(1);
    }
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
      setZoom(1);
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  const createExtended = (offset: number) => {
    const base = [
      ...galleryImages.slice(offset).map((img, i) => ({ ...img, realIndex: i + offset })),
      ...galleryImages.slice(0, offset).map((img, i) => ({ ...img, realIndex: i }))
    ];
    return [...base, ...base, ...base, ...base];
  };

  const track1 = createExtended(0);
  const track2 = createExtended(4);
  const track3 = createExtended(2);

  const renderSet = (images: typeof track1) => (
    <div className={styles.carouselSet}>
      {images.map((img, i) => (
        <div
          key={`item-${i}`}
          className={styles.carouselItem}
          onClick={() => openLightbox(img.realIndex)}
        >
          <div className={styles.imgWrap}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 250px"
            />
            <div className={styles.overlay}>
              <i className={`fas fa-expand ${styles.zoomIcon}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className={styles.section} id="galeriya">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerTop}>
            <div className={styles.headerContent}>
              <div className="section-label">Foto galeriya</div>
              <h2 className="section-title">
                Foto lahzalar
              </h2>
              <p className="section-desc">
                Yoshlar tadbirlari, jamoat loyihalari va rasmiy uchrashuvlardan eng yorqin lahzalar.
              </p>
            </div>
            <a href="#" className="btn-view-all">
              Barcha rasmlar <i className="fas fa-arrow-right" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={2}>
        <div className={styles.tiltWrapper}>
          <div className={styles.carouselContainer}>
            {/* Row 1: Left */}
            <div className={`${styles.carouselTrack} ${styles.trackLeft}`}>
              {renderSet(track1)}
              {renderSet(track1)}
            </div>

            {/* Row 2: Right */}
            <div className={`${styles.carouselTrack} ${styles.trackRight}`}>
              {renderSet(track2)}
              {renderSet(track2)}
            </div>

            {/* Row 3: Left */}
            <div className={`${styles.carouselTrack} ${styles.trackLeftSlow}`}>
              {renderSet(track3)}
              {renderSet(track3)}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Lightbox */}
      <div className={`${styles.lightbox} ${lightboxIndex !== null ? styles.lightboxOpen : ""}`}>
        {lightboxIndex !== null && (
          <>
            <div className={styles.lightboxToolbar}>
              <button className={styles.toolbarBtn} onClick={handleZoomOut} title="Uzoqlashtirish">
                <i className="fas fa-search-minus" />
              </button>
              <button className={styles.toolbarBtn} onClick={handleZoomIn} title="Yaqinlashtirish">
                <i className="fas fa-search-plus" />
              </button>
              <button className={styles.toolbarBtn} onClick={toggleFullscreen} title="To'liq ekran">
                <i className="fas fa-expand" />
              </button>
              <button className={`${styles.toolbarBtn} ${styles.toolbarClose}`} onClick={closeLightbox} title="Yopish">
                <i className="fas fa-times" />
              </button>
            </div>
            
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={prevLightboxImage}>
              <i className="fas fa-chevron-left" />
            </button>
            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={nextLightboxImage}>
              <i className="fas fa-chevron-right" />
            </button>
            
            <div className={styles.imgZoomContainer}>
              <Image
                src={galleryImages[lightboxIndex].full}
                alt="Fullscreen view"
                width={1200}
                height={800}
                className={styles.lightboxImg}
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
