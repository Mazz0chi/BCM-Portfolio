"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type Labels = { before: string; after: string; hint: string; label: string };

/**
 * Before/after comparison. At first it shows only the old site; moving the
 * pointer over it (or dragging on touch) reveals the new one up to the
 * pointer, and the split stays where you leave it so both versions can be
 * studied. Keyboard: a range input (arrow keys) drives the same position.
 */
export function BeforeAfter({
  before,
  after,
  labels,
  className,
}: {
  before: string | null;
  after: string | null;
  labels: Labels;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [tracking, setTracking] = useState(false);

  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTracking(true);
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };
  const release = () => setTracking(false);

  return (
    <div
      ref={ref}
      onPointerMove={follow}
      onPointerDown={follow}
      onPointerLeave={release}
      className={cn(
        "relative touch-pan-y select-none overflow-hidden rounded-3xl bg-surface-2 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent",
        className,
      )}
    >
      <Slot src={before} alt={labels.before} slot="public/projects/redesign-before.jpg" />
      <div
        className={cn("absolute inset-0 bg-accent-tint", !tracking && "transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]")}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Slot src={after} alt={labels.after} slot="public/projects/redesign-after.jpg" />
      </div>

      {/* Divider follows the reveal edge; hidden at rest. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-canvas shadow-[0_0_12px_rgb(22_32_26/0.35)] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          pos > 0 && pos < 100 ? "opacity-100" : "opacity-0",
          tracking ? "transition-opacity" : "transition-[left,opacity]",
        )}
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-canvas text-ink shadow-[0_4px_16px_rgb(22_32_26/0.25)]">
          <CaretLeft weight="bold" className="size-3.5" />
          <CaretRight weight="bold" className="size-3.5" />
        </span>
      </div>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-canvas transition-opacity duration-300",
          pos > 8 ? "opacity-100" : "opacity-0",
        )}
      >
        {labels.after}
      </span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-canvas transition-opacity duration-300",
          pos < 92 ? "opacity-100" : "opacity-0",
        )}
      >
        {labels.before}
      </span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-canvas/90 px-4 py-2 text-xs font-medium text-ink shadow-sm transition-opacity duration-300 md:text-sm",
          pos === 0 ? "opacity-100" : "opacity-0",
        )}
      >
        {labels.hint}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={labels.label}
        className="sr-only"
      />
    </div>
  );
}

function Slot({ src, alt, slot }: { src: string | null; alt: string; slot: string }) {
  return src ? (
    <Image
      src={src}
      alt={alt}
      fill
      draggable={false}
      sizes="(min-width: 1400px) 1300px, 100vw"
      className="object-cover object-left-top"
    />
  ) : (
    <p className="absolute bottom-4 left-5 font-mono text-xs text-mute">{slot}</p>
  );
}
