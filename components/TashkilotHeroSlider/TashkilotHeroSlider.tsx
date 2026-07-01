"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import styles from "./TashkilotHeroSlider.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const slides = [
  {
    image: "/images/tashkilot/tashkilot_hero_1782907121959.png",
    title: "Kelajakni birgalikda quramiz",
    desc: "O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi eng yirik jamoat tashkilotidir.",
  },
  {
    image: "/images/projects/project_sports_1782905415673.png",
    title: "Tengdosh tengdoshga",
    desc: "Biz yoshlarni birlashtiramiz va ular bilan birgalikda yurtimiz kelajagini quramiz. Yoshlar — bizning asosiy kuchimiz.",
  },
  {
    image: "/images/projects/project_eco_1782905423561.png",
    title: "Cheksiz imkoniyatlar",
    desc: "Ta'lim, sport, IT va ekologiya yo'nalishlarida o'z iqtidoringizni namoyon qiling va loyihalarda faol ishtirok eting.",
  },
];

export default function TashkilotHeroSlider() {
  return (
    <section className={styles.heroSection}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bulletActive,
        }}
        loop={true}
        className={styles.swiperContainer}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slide}>
              <div className={styles.slideBg}>
                <Image src={slide.image} alt={slide.title} fill priority={index === 0} />
                <div className={styles.slideOverlay} />
              </div>
              
              <div className={styles.slideContent}>
                <ScrollReveal>
                  <div className={styles.heroBadge}>Biz Kimmiz?</div>
                  <h1 className={styles.heroTitle}>{slide.title}</h1>
                  <p className={styles.heroDesc}>{slide.desc}</p>
                </ScrollReveal>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
