"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Media } from "@/components/media";

/**
 * Hero visual. As the page scrolls it settles back slightly, which separates
 * the hero from the content that follows (hierarchy). Static under reduced motion.
 */
export function HeroMedia({ src, alt }: { src?: string | null; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <div ref={ref} className="flex min-h-[40dvh] flex-1 flex-col">
      <motion.div style={reduce ? undefined : { scale }} className="flex flex-1 origin-top flex-col">
        <Media
          src={src}
          alt={alt}
          slot="public/projects/hero.jpg"
          tone="accent"
          priority
          sizes="100vw"
          className="min-h-[40dvh] w-full flex-1"
        />
      </motion.div>
    </div>
  );
}
