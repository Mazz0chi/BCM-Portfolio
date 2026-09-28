"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dict } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const tones = ["bg-surface-1", "bg-surface-2", "bg-surface-3", "bg-accent-tint"];

type Item = Dict["services"]["items"][number];

function Panel({
  item,
  index,
  total,
  progress,
  reduce,
}: {
  item: Item;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Earlier panels settle back as the next one arrives, so depth shows order (hierarchy).
  const target = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, target]);

  return (
    <div className="sticky top-0 flex min-h-[100dvh] items-center">
      <motion.article
        style={{ top: `${index * 22}px`, ...(reduce ? {} : { scale }) }}
        className={cn(
          "relative flex min-h-[56dvh] w-full origin-top flex-col justify-between gap-16 rounded-3xl border border-line p-6 md:p-12",
          tones[index],
        )}
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-4xl font-semibold tracking-tighter md:text-6xl">{item.title}</h3>
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
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="services" className="scroll-mt-24 px-4 pt-24 md:px-8 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">
          {heading}
        </h2>
        <div ref={container} className="relative -mt-[10dvh]">
          {items.map((item, i) => (
            <Panel
              key={item.title}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
