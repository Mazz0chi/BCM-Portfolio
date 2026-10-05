import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import type { Dict } from "@/lib/i18n";

export function Contact({ d }: { d: Dict }) {
  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="rounded-3xl border border-line bg-surface-1 px-6 py-16 md:px-16 md:py-28">
          <h2 className="max-w-4xl text-5xl font-semibold leading-none tracking-tighter md:text-7xl">
            {d.contact.heading}
          </h2>
          <p className="mt-6 max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">{d.contact.body}</p>
          <CtaLink className="mt-10">
            {d.cta}
          </CtaLink>
        </div>
      </Reveal>
    </section>
  );
}
