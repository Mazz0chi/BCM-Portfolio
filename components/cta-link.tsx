import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export function CtaLink({
  href,
  children,
  size = "md",
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent font-medium text-canvas",
        "transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-90",
        "active:translate-y-px active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "sm" ? "h-10 px-4 text-sm" : "h-12 px-6 text-base",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        weight="bold"
        aria-hidden
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
