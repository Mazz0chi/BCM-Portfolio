"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dict } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const tones = ["bg-surface-1", "bg-surface-2", "bg-surface-3", "bg-accent-tint"];

// Matches the `tall` variant in globals.css. Short screens (phones in landscape)
// can't fit a sticky stack under the nav, so panels flow normally there.
const TALL = "(min-height: 36rem)";

function useTall() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(TALL);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(TALL).matches,
    () => true,
  );
}

type Item = Dict["services"]["items"][number];

function Panel({
  item,
  index,
  total,
  progress,
  tall,
  reduce,
}: {
  item: Item;
  index: number;
  total: number;
  progress: MotionValue<number>;
  tall: boolean;
  reduce: boolean;
}) {
  // Earlier panels settle back as the next one arrives, so depth shows order (hierarchy).
  const target = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, target]);

  return (
    <div className="flex items-center py-3 tall:sticky tall:top-0 tall:min-h-[100dvh] tall:py-0">
      <motion.article
        style={tall ? { top: `${index * 22}px`, ...(reduce ? {} : { scale }) } : undefined}
        className={cn(
          "relative flex w-full origin-top flex-col justify-between gap-10 rounded-3xl border border-line p-6 md:p-12 tall:min-h-[56dvh] tall:gap-16",
          tones[index],
        )}
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-6xl">{item.title}</h3>
          <p className="max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">{item.body}</p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-mute md:text-base">
          {item.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export function Capabilities({ heading, items }: { heading: string; items: Item[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const tall = useTall();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="services" className="scroll-mt-24 px-4 pt-24 md:px-8 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">
          {heading}
        </h2>
        <div ref={container} className="relative mt-8 tall:-mt-[10dvh]">
          {items.map((item, i) => (
            <Panel
              key={item.title}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
              tall={tall}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
