import { CtaLink } from "@/components/cta-link";
import { HeroLaptop } from "@/components/hero-laptop";
import { Reveal } from "@/components/reveal";
import type { Dict } from "@/lib/i18n";
import { imageFor } from "@/lib/images";

export function Hero({ d }: { d: Dict }) {
  return (
    <section>
      <HeroLaptop src={imageFor("marketing-mob")} alt={d.hero.alt}>
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
      </HeroLaptop>
    </section>
  );
}
