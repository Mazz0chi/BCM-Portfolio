"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const MAX_TILT = 6; // degrees

/**
 * Tilts its content toward the mouse in 3D, with a soft light following the
 * pointer, and eases back flat on leave. Mouse only: touch and reduced motion
 * get a plain frame. Writes CSS variables, so moving the pointer never re-renders.
 */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * MAX_TILT}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * MAX_TILT}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--glare", "1");
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:perspective(1200px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        className,
      )}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-[var(--glare,0)] transition-opacity duration-500 [background:radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.22),transparent_55%)]"
      />
    </div>
  );
}
