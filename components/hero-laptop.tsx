"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, motionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

const Laptop3D = dynamic(() => import("@/components/laptop-3d"), { ssr: false });

const opened = motionValue(1);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function useWebGL() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    },
    () => true,
  );
}

/**
 * Apple-style scroll scene. The hero is taller than the screen; its content
 * stays pinned while you scroll through it, and scroll progress drives the
 * laptop: closed and angled at the top, lid opening and turning to face you,
 * screen powering on, while the headline fades up and out so the laptop takes
 * the whole stage. Then the page carries on.
 * Reduced motion: no pinning, laptop shown open. No WebGL: a flat screenshot.
 */
export function HeroLaptop({
  children,
  src,
  alt,
}: {
  children: ReactNode;
  src: string | null;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const webgl = useWebGL();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Function transforms on purpose: they stay in sync with the 3D scene, which
  // reads the same progress per frame (the accelerated path drifted here).
  const textOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01((p - 0.08) / 0.27));
  const textY = useTransform(scrollYProgress, (p) => -80 * clamp01(p / 0.35));

  return (
    <div ref={ref} className={cn("relative", reduce ? "" : "h-[400dvh]")}>
      <div
        className={cn(
          "relative flex w-full flex-col",
          reduce ? "pb-8" : "sticky top-0 h-[100dvh] min-h-[34rem] overflow-hidden",
        )}
      >
        {/* The stage spans the full viewport; the headline sits on top of it.
            Under reduced motion it's a plain block below the headline instead. */}
        <div className={cn("pointer-events-none", reduce ? "relative order-last h-[60dvh]" : "absolute inset-0")}>
          {src && webgl ? (
            <Laptop3D progress={reduce ? opened : scrollYProgress} src={src} alt={alt} />
          ) : src ? (
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain px-4 pb-8 pt-[45%] md:px-8" />
          ) : null}
        </div>
        <motion.div
          style={reduce ? undefined : { opacity: textOpacity, y: textY }}
          className="relative mx-auto w-full max-w-[1400px] px-4 pt-24 md:px-8 md:pt-28"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
