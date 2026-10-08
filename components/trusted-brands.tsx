import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";
import { logoFor } from "@/lib/images";

/**
 * "Trusted by" row: every client from the work grid. Shows the logo from
 * public/clients/<slug>.svg (or .png, .webp...) when there is one, else the name.
 * Logos sit in grey and take their own colour on hover. White logos are
 * stored recoloured to ink, since they'd vanish on the light canvas.
 */
export function TrustedBrands({ heading }: { heading: string }) {
  return (
    <section aria-labelledby="clients-heading" className="px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 id="clients-heading" className="text-center font-mono text-sm uppercase tracking-widest text-mute">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-14 lg:grid-cols-5">
            {projects.map(({ slug, title }) => {
              const logo = logoFor(slug);
              return (
                <li key={slug} className="flex h-12 items-center justify-center">
                  {logo ? (
                    // Fixed box + object-contain: wide wordmarks fill the width,
                    // squarer marks the height, so they read at a similar weight.
                    <div className="relative h-11 w-36">
                      <Image
                        src={logo}
                        alt={title}
                        fill
                        sizes="144px"
                        unoptimized={logo.endsWith(".svg")}
                        className="object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <span className="text-center text-lg font-semibold tracking-tight text-mute md:text-xl">{title}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
