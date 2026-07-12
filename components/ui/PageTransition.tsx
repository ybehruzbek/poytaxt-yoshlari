"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Brauzerning o'zi pushState navigatsiyasida scroll pozitsiyasini "auto"
  // rejimda tiklashga urinadi — bu Next.js'ning ichki scroll-to-top
  // mantig'i bilan to'qnashib, ba'zan sahifa eski scroll joyida qolib
  // ketishiga olib keladi. Nazoratni to'liq o'z qo'limizga olamiz.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
  }, [pathname, reduce]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
