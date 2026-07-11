"use client";

import { motion, type Variants } from "motion/react";
import type { JSX } from "react";

const wrap: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.07, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
  },
};

/**
 * Sarlavha so'zlari niqob ostidan birma-bir ko'tarilib chiqadi.
 * Har so'z overflow:hidden qatorda — matn "kesilib" paydo bo'ladi.
 * Skrinriderlarga to'liq matn alohida beriladi.
 */
export default function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const Tag = as as "h2";
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        custom={delay}
        variants={wrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "0.08em",
              marginBottom: "-0.08em",
            }}
          >
            <motion.span variants={word} style={{ display: "inline-block" }}>
              {i < words.length - 1 ? `${w} ` : w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
