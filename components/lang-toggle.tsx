"use client";

import { useId, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { localeHref, locales, type Locale } from "@/lib/i18n";

const short: Record<Locale, string> = { en: "EN", es: "ES" };
const full: Record<Locale, string> = { en: "English", es: "Español" };

/**
 * Segmented control. The thumb slides to the new language first (state
 * transition), then the page switches in place without jumping to the top.
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
  const thumbId = useId();
  const [active, setActive] = useState<Locale>(lang);

  function select(e: MouseEvent<HTMLAnchorElement>, next: Locale) {
    e.preventDefault();
    if (next === active) return;
    try {
      localStorage.setItem("lang", next);
    } catch {}
    setActive(next);
    const go = () => router.push(localeHref(next), { scroll: false });
    if (reduce) go();
    else window.setTimeout(go, 260);
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex h-9 items-center rounded-full bg-surface-3 p-1", className)}
    >
      {locales.map((l) => {
        const on = l === active;
        return (
          <a
            key={l}
            href={localeHref(l)}
            hrefLang={l}
            lang={l}
            aria-label={full[l]}
            aria-current={on ? "true" : undefined}
            onClick={(e) => select(e, l)}
            className={cn(
              "relative isolate grid h-7 w-10 place-items-center rounded-full text-xs font-semibold tracking-wide",
              "transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              on ? "text-canvas" : "text-mute hover:text-ink",
            )}
          >
            {on ? (
              <motion.span
                layoutId={thumbId}
                aria-hidden
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 38 }}
                className="absolute inset-0 -z-10 rounded-full bg-ink shadow-[0_1px_3px_rgb(0_0_0/0.35)]"
              />
            ) : null}
            {short[l]}
          </a>
        );
      })}
    </div>
  );
}
