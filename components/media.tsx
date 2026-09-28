import Image from "next/image";
import { cn } from "@/lib/cn";

type Tone = "one" | "two" | "three" | "accent";

const tones: Record<Tone, string> = {
  one: "bg-gradient-to-br from-surface-2 to-surface-1",
  two: "bg-gradient-to-br from-surface-3 to-surface-2",
  three: "bg-surface-2",
  accent: "bg-accent-tint",
};

/**
 * Project media frame. With `src` it renders the real image.
 * Without it, it renders an empty slot that says what to add.
 */
export function Media({
  src,
  alt,
  slot,
  tone = "one",
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: {
  src?: string | null;
  alt: string;
  slot: string;
  tone?: Tone;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", tones[tone], className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-left-top" />
      ) : (
        <p className="absolute bottom-4 left-5 font-mono text-xs text-mute">{slot}</p>
      )}
    </div>
  );
}
