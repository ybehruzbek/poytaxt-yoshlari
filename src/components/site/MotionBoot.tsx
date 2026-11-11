/**
 * Animatsiyali sahifalar uçun: mazmundan OLDIN turadigan kiçik skript. Brauzer sahifani birinçi marta
 * çizişidan oldin <html> ga `motion-boot` qöyadi — <main> bir zumga yaşiriladi (motion.css).
 * RevealMotion / HomeMotion elementlarni boşlanğiç (yaşirin) holatga keltirgaç sinfni oladi,
 * şunda birinçi ekrandagi elementlar ham animatsiya bilan çiqadi.
 * “Harakatni kamaytiriş” yoqilgan bölsa hech narsa qilinmaydi; JS işlamasa, mazmun 3 soniyada baribir çiqadi.
 */
const BOOT = {
  // kod qiymati (imlo tekşiruvi uçun `code` kaliti) — matn emas
  code: `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-boot')}catch(e){}`,
}

export function MotionBoot() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT.code }} />
}
