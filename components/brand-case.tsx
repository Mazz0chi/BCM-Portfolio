import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Rail } from "@/components/rail";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import type { Dict } from "@/lib/i18n";

// Intrinsic sizes of public/projects/brand/<file>.webp (pages from the brand guide).
const SIZES: Record<string, [number, number]> = {
  "jj-banner": [2400, 400],
  "jj-explore": [1600, 1000],
  "jj-logo": [1600, 900],
  "jj-versions": [1600, 900],
  "jj-color": [1600, 900],
  "jj-type": [1600, 900],
  "jj-dashboard": [1600, 900],
  "jj-app": [1600, 900],
  "jj-social": [1600, 900],
  "jj-linkedin": [1600, 1000],
  "jj-merch": [1536, 1024],
  "jj-essentials": [1536, 1024],
  "jj-guide": [1600, 900],
};

function Shot({
  file,
  alt,
  sizes,
  className,
  draggable,
}: {
  file: string;
  alt: string;
  sizes: string;
  className?: string;
  draggable?: boolean;
}) {
  const [w, h] = SIZES[file];
  return (
    <Image
      src={`/projects/brand/${file}.webp`}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      draggable={draggable}
      className={cn("h-auto w-full rounded-3xl border border-line bg-surface-1", className)}
    />
  );
}

/**
 * Branding case study (JJ Capinvest), told the way we work: the outcome up top,
 * then the process as numbered chapters (explore, decide, system, apply) with
 * the real brand-guide pages, the applications in a draggable rail, and the
 * 29-page guide as the close.
 */
export function BrandCase({ d }: { d: Dict }) {
  const c = d.brandCase;
  const apply = c.chapters.length - 1;

  return (
    <section id="branding" className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="grid gap-6 md:grid-cols-[5fr_6fr] md:items-end md:gap-24">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-sm uppercase tracking-widest text-accent">{c.eyebrow}</p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter md:text-5xl">{c.heading}</h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-[50ch] text-base leading-relaxed text-mute md:text-lg">{c.body}</p>
            <ul className="flex flex-wrap gap-2">
              {c.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-mute">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 md:mt-16">
          <Shot file="jj-banner" alt={c.bannerAlt} sizes="(min-width: 1400px) 1400px, 100vw" />
        </Reveal>

        <ol className="mt-6 divide-y divide-line md:mt-10">
          {c.chapters.map((chapter, i) => (
            <li key={chapter.title}>
              <div className="grid gap-6 py-10 md:grid-cols-[4fr_7fr] md:gap-16 md:py-16">
                {/* Text stays pinned beside its images; the rail chapter scrolls normally. */}
                <Reveal
                  className={cn(
                    "flex flex-col gap-3",
                    chapter.images.length > 0 && "md:sticky md:top-28 md:self-start",
                  )}
                >
                  <span className="font-mono text-sm text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-3xl font-semibold tracking-tighter md:text-4xl">{chapter.title}</h3>
                  <p className="max-w-[42ch] text-base leading-relaxed text-mute md:text-lg">{chapter.body}</p>
                </Reveal>

                {chapter.images.length > 0 && (
                  <div className={cn("grid gap-4", chapter.images.length > 1 && "sm:grid-cols-2")}>
                    {chapter.images.map((img, j) => (
                      <Reveal key={img.file} delay={0.08 * (j + 1)}>
                        <Shot
                          file={img.file}
                          alt={img.alt}
                          sizes={chapter.images.length > 1 ? "(min-width: 768px) 30vw, 100vw" : "(min-width: 768px) 60vw, 100vw"}
                        />
                      </Reveal>
                    ))}
                  </div>
                )}

                {i === apply && (
                  <Reveal delay={0.08} className="min-w-0 md:col-span-2">
                    <Rail labels={{ prev: c.prev, next: c.next, hint: c.railHint }}>
                      {c.applications.map((img) => (
                        <div key={img.file} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[44%]">
                          <Shot file={img.file} alt={img.alt} sizes="(min-width: 1024px) 44vw, 85vw" draggable={false} />
                        </div>
                      ))}
                    </Rail>
                  </Reveal>
                )}
              </div>
            </li>
          ))}
        </ol>

        <Reveal className="mt-6 grid items-center gap-8 rounded-3xl bg-accent-tint p-6 md:mt-10 md:grid-cols-[6fr_5fr] md:gap-16 md:p-12">
          <Shot file="jj-guide" alt={c.guide.alt} sizes="(min-width: 768px) 50vw, 100vw" className="border-0" />
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-2xl font-semibold leading-tight tracking-tighter md:text-4xl">{c.guide.title}</h3>
            <p className="max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">{c.guide.body}</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
              {[
                { label: c.guide.proposals, href: "/proposals/jj-capinvest-logos.html" },
                { label: c.guide.site, href: "https://jjcapinvest.com/" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden
                    weight="bold"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">{d.a11y.newTab}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
