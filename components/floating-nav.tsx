"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { CtaLink } from "@/components/cta-link";
import { LangToggle } from "@/components/lang-toggle";
import { studio } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";

/**
 * Floating pill header (Butter-style): detached from the top edge, centered,
 * frosted, one line. Its surface gets denser as the page scrolls, so it stays
 * readable over content (state transition, no re-renders: motion values only).
 * The language toggle sits in the pill from md up, and in the menu on phones.
 */
export function FloatingNav({
  lang,
  d,
}: {
  lang: Locale;
  d: Pick<Dict, "nav" | "cta" | "a11y">;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const alpha = useTransform(scrollY, [0, 160], [0.45, 0.82]);
  const background = useMotionTemplate`rgb(20 20 22 / ${alpha})`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-(--z-nav) flex justify-center px-4">
      <div className="relative w-full max-w-3xl">
        <motion.nav
          aria-label={d.a11y.primaryNav}
          style={{ backgroundColor: background }}
          className="glass pointer-events-auto flex h-14 items-center justify-between gap-2 rounded-full pl-5 pr-2"
        >
          <a
            href="#top"
            aria-label={`${studio.name}, ${d.a11y.backToTop}`}
            className="rounded-full font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {studio.short}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {d.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-mute transition-colors duration-300 hover:bg-surface-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle lang={lang} label={d.a11y.language} className="hidden md:flex" />
            <CtaLink href="#contact" size="sm">
              {d.cta}
            </CtaLink>
            <button
              type="button"
              aria-label={open ? d.a11y.closeMenu : d.a11y.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface-3 focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] md:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="glass pointer-events-auto absolute inset-x-0 top-[4.25rem] rounded-3xl bg-surface-2 p-3 md:hidden"
            >
              <ul>
                {d.nav.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-full px-4 py-3 text-2xl tracking-tight transition-colors hover:bg-surface-3"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between border-t border-line px-4 pb-1 pt-4">
                <span className="text-sm text-mute">{d.a11y.language}</span>
                <LangToggle lang={lang} label={d.a11y.language} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
