"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={reduce ? undefined : { opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Words light up in reading order as the sentence crosses the screen (storytelling). */
export function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <p
          ref={ref}
          className="max-w-5xl text-3xl font-semibold leading-[1.15] tracking-tighter md:pl-[12vw] md:text-5xl"
        >
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 3) / words.length)]}
              reduce={reduce}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
