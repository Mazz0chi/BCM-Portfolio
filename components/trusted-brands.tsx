import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";
import { logoFor } from "@/lib/images";

/**
 * "Trusted by" row: every client from the work grid. Shows the logo from
 * public/clients/<slug>.svg (or .png, .webp...) when there is one, else the name.
 */
export function TrustedBrands({ heading }: { heading: string }) {
  return (
    <section aria-labelledby="clients-heading" className="px-4 py-16 md:px-8 md:py-24">
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
                    <Image
                      src={logo}
                      alt={title}
                      width={160}
                      height={48}
                      className="h-8 w-auto max-w-[9rem] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
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
