"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Horizontal rail of cards: native scroll with snap (trackpad, touch, shift +
 * wheel), click-and-drag with the mouse, and prev/next buttons that disable at
 * either end.
 */
export function Rail({
  children,
  labels,
  className,
}: {
  children: ReactNode;
  labels: { prev: string; next: string; hint: string };
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  // Mouse drag: scroll follows the pointer; snap is paused while dragging.
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!drag.current || !el) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4 && !drag.current.moved) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
    }
    if (drag.current.moved) el.scrollLeft = drag.current.left - dx;
  };
  const up = () => {
    const el = ref.current;
    if (el) el.style.scrollSnapType = "";
    drag.current = null;
  };

  const button =
    "grid size-11 place-items-center rounded-full border border-line bg-canvas text-ink transition duration-300 hover:bg-surface-2 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <div className={className}>
      <div
        ref={ref}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-mute">{labels.hint}</p>
        <div className="flex gap-2">
          <button type="button" aria-label={labels.prev} disabled={edges.start} onClick={() => step(-1)} className={button}>
            <ArrowLeft weight="bold" className="size-4" />
          </button>
          <button type="button" aria-label={labels.next} disabled={edges.end} onClick={() => step(1)} className={cn(button)}>
            <ArrowRight weight="bold" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
