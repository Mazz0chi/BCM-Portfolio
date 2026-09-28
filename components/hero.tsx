import { CtaLink } from "@/components/cta-link";
import { HeroMedia } from "@/components/hero-media";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import { imageFor } from "@/lib/images";

export function Hero({ d }: { d: Dict }) {
  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-[1400px] flex-col gap-8 px-4 pb-4 pt-24 md:px-8">
      <div className="flex flex-col gap-6">
        <Reveal>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
            <span className="block">{d.hero.line1}</span>
            <span className="block text-mute">{d.hero.line2}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44ch] text-base leading-relaxed text-mute md:text-lg">{d.hero.sub}</p>
          <CtaLink href="#contact" className="self-start">
            {d.cta}
          </CtaLink>
        </Reveal>
      </div>
      <HeroMedia src={imageFor("hero") ?? imageFor(projects[0].slug)} alt={d.hero.alt} />
    </section>
  );
}
