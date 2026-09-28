import { CtaLink } from "@/components/cta-link";
import { HeroMedia } from "@/components/hero-media";
import { Reveal } from "@/components/reveal";
import { cta, projects } from "@/lib/content";
import { imageFor } from "@/lib/images";

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-[1400px] flex-col gap-8 px-4 pb-4 pt-24 md:px-8">
      <div className="flex flex-col gap-6">
        <Reveal>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
            <span className="block">One team designs it.</span>
            <span className="block text-mute">The same team builds it.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44ch] text-base leading-relaxed text-mute md:text-lg">
            Benitez Cruz and Mazzochi is a design and development studio for brands, websites, and
            digital products.
          </p>
          <CtaLink href="#contact" className="self-start">
            {cta}
          </CtaLink>
        </Reveal>
      </div>
      <HeroMedia src={imageFor("hero") ?? imageFor(projects[0].slug)} />
    </section>
  );
}
