"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { localeHref, type Locale } from "@/lib/i18n";

/**
 * iOS-style switch: EN on the left, ES on the right. The knob carries the
 * active language and slides across first (state transition), then the page
 * switches in place without jumping to the top.
 */
export function LangToggle({
  lang,
  label,
  className,
}: {
  lang: Locale;
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Locale>(lang);
  const es = active === "es";

  function toggle() {
    const next: Locale = es ? "en" : "es";
    try {
      localStorage.setItem("lang", next);
    } catch {}
    setActive(next);
    const go = () => router.push(localeHref(next), { scroll: false });
    if (reduce) go();
    else window.setTimeout(go, 260);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={es}
      aria-label={`${label}: Español`}
      onClick={toggle}
      className={cn(
        // The ::after extends the hit area to 44px tall without changing the visual size.
        "relative flex h-8 w-[4.25rem] shrink-0 items-center rounded-full bg-surface-3 p-0.5",
        "shadow-[inset_0_1px_2px_rgb(22_32_26/0.15)] after:absolute after:-inset-x-1 after:-inset-y-1.5 after:content-['']",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        es ? "justify-end" : "justify-start",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5 text-[11px] font-semibold tracking-wide text-mute"
      >
        <span>EN</span>
        <span>ES</span>
      </span>
      <motion.span
        layout
        aria-hidden
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 34 }}
        className="relative grid size-7 place-items-center rounded-full bg-white text-[11px] font-semibold tracking-wide text-ink shadow-[0_2px_6px_rgb(22_32_26/0.25)]"
      >
        {es ? "ES" : "EN"}
      </motion.span>
    </button>
  );
}
