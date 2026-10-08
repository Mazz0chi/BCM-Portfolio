import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";
import { logoFor } from "@/lib/images";

/**
 * "Trusted by" marquee: every client from the work grid, scrolling past in a
 * loop (pauses on hover). Logo from public/clients/<slug>.svg (or .png,
 * .webp...) when there is one, else the name. Logos sit in grey and take their
 * own colour on hover; white logos are stored recoloured to ink, since they'd
 * vanish on the light canvas. Reduced motion: a static, centred row.
 */
export function TrustedBrands({ heading }: { heading: string }) {
  const items = projects.map(({ slug, title }) => ({ slug, title, logo: logoFor(slug) }));

  return (
    <section aria-labelledby="clients-heading" className="py-12 md:py-16">
      <Reveal className="px-4 md:px-8">
        <h2 id="clients-heading" className="text-center font-mono text-sm uppercase tracking-widest text-mute">
          {heading}
        </h2>
      </Reveal>
      <div className="marquee-mask mt-10 overflow-hidden md:mt-12">
        <div className="marquee-track flex w-max hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20"
            >
              {items.map(({ slug, title, logo }) => (
                <li key={slug} className="flex h-12 shrink-0 items-center justify-center">
                  {logo ? (
                    // Fixed box + object-contain: wide wordmarks fill the width,
                    // squarer marks the height, so they read at a similar weight.
                    <div className="relative h-11 w-36">
                      <Image
                        src={logo}
                        alt={copy === 0 ? title : ""}
                        fill
                        sizes="144px"
                        unoptimized={logo.endsWith(".svg")}
                        className="object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-mute md:text-xl">
                      {title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
