"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dict } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const tones = ["bg-surface-1", "bg-surface-2", "bg-surface-3", "bg-accent-tint"];

// Matches the `tall` variant in globals.css. Short screens (phones in landscape)
// can't fit a sticky stack under the nav, so panels flow normally there.
const TALL = "(min-height: 40rem)";
// Sticky heading sits just under the floating nav (top-4 + h-14 + breathing room).
const HEADING_TOP = 96;
const HEADING_GAP = 24;
const STEP = 20;

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
  // Earlier cards settle back as the next one lands on top, so depth shows order (hierarchy).
  const target = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, target]);

  return (
    <motion.article
      style={
        tall
          ? { top: `calc(var(--stack-top) + ${index * STEP}px)`, ...(reduce ? {} : { scale }) }
          : undefined
      }
      className={cn(
        "flex w-full origin-top flex-col justify-between gap-10 rounded-3xl border border-line p-6 shadow-[0_-8px_30px_rgb(22_32_26/0.06)] md:p-12",
        "tall:sticky tall:min-h-[20rem] md:tall:min-h-[24rem]",
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
  );
}

/**
 * Stacking cards. The heading stays pinned under the nav while the cards slide
 * up one by one and land on top of each other, then the whole stack leaves
 * together. One card of scroll per service, no empty screens in between.
 */
export function Capabilities({ heading, items }: { heading: string; items: Item[] }) {
  const container = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const tall = useTall();
  const { scrollYProgress } = useScroll({ target: cards, offset: ["start start", "end end"] });

  // Cards stick right under the heading, whose height depends on how it wraps.
  useLayoutEffect(() => {
    const el = head.current;
    const root = container.current;
    if (!el || !root) return;
    const update = () =>
      root.style.setProperty("--stack-top", `${HEADING_TOP + el.offsetHeight + HEADING_GAP}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="services" className="scroll-mt-24 px-4 pb-8 pt-24 md:px-8 md:pt-40">
      <div
        ref={container}
        className="mx-auto max-w-[1400px] [--stack-top:11rem]"
      >
        <div ref={head} className="tall:sticky" style={tall ? { top: HEADING_TOP } : undefined}>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter md:text-5xl">{heading}</h2>
        </div>
        <div ref={cards} className="mt-8 flex flex-col gap-6 md:mt-12 tall:pb-16">
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
