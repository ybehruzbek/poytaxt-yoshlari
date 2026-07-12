'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@prisma/client";
import styles from "./Galereya.module.css";
import galleryStyles from "@/components/Gallery/Gallery.module.css";
import {
  ArrowsOut,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  X,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/ssr";

export default function GalereyaClient({ images }: { images: GalleryImage[] }) {
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
      setLightboxIndex((prev) => (prev! + 1) % images.length);
      setZoom(1);
    }
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
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
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  return (
    <>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div
            key={img.id}
            className={styles.gridItem}
            onClick={() => openLightbox(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <ArrowsOut weight="duotone" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div className={`${galleryStyles.lightbox} ${lightboxIndex !== null ? galleryStyles.lightboxOpen : ""}`}>
        {lightboxIndex !== null && (
          <>
            <div className={galleryStyles.lightboxToolbar}>
              <button className={galleryStyles.toolbarBtn} onClick={handleZoomOut} title="Uzoqlashtirish">
                <MagnifyingGlassMinus weight="duotone" />
              </button>
              <button className={galleryStyles.toolbarBtn} onClick={handleZoomIn} title="Yaqinlashtirish">
                <MagnifyingGlassPlus weight="duotone" />
              </button>
              <button className={galleryStyles.toolbarBtn} onClick={toggleFullscreen} title="To'liq ekran">
                <ArrowsOut weight="duotone" />
              </button>
              <button className={`${galleryStyles.toolbarBtn} ${galleryStyles.toolbarClose}`} onClick={closeLightbox} title="Yopish">
                <X weight="duotone" />
              </button>
            </div>

            <button className={`${galleryStyles.lightboxNav} ${galleryStyles.lightboxPrev}`} onClick={prevLightboxImage}>
              <CaretLeft weight="duotone" />
            </button>
            <button className={`${galleryStyles.lightboxNav} ${galleryStyles.lightboxNext}`} onClick={nextLightboxImage}>
              <CaretRight weight="duotone" />
            </button>

            <div className={galleryStyles.imgZoomContainer}>
              <Image
                src={images[lightboxIndex].full}
                alt={images[lightboxIndex].alt}
                width={1200}
                height={800}
                className={galleryStyles.lightboxImg}
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
