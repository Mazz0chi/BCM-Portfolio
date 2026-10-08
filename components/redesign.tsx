import { BeforeAfter } from "@/components/before-after";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import type { Dict } from "@/lib/i18n";
import { imageFor } from "@/lib/images";

/**
 * Rebranding and redesign: most of the studio's projects. Pitch on the left,
 * how a redesign runs on the right, and a before/after slider underneath
 * (screenshots: public/projects/redesign-before.* and redesign-after.*).
 */
export function Redesign({ d }: { d: Dict }) {
  const r = d.redesign;
  return (
    <section id="redesign" className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 rounded-3xl bg-accent-tint p-6 md:grid-cols-[5fr_6fr] md:gap-24 md:p-12 lg:p-16">
        <Reveal className="flex flex-col items-start gap-6">
          <p className="font-mono text-sm uppercase tracking-widest text-accent">{r.eyebrow}</p>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter md:text-5xl">{r.heading}</h2>
          <p className="max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">{r.body}</p>
          <CtaLink className="mt-4">{r.cta}</CtaLink>
        </Reveal>
        <ol className="divide-y divide-line self-center">
          {r.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={0.1 + i * 0.05} className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 py-6 md:py-8">
                <span className="font-mono text-sm text-mute md:pt-2">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold tracking-tighter md:text-3xl">{step.title}</h3>
                  <p className="max-w-[45ch] text-base leading-relaxed text-mute">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="md:col-span-2">
          <BeforeAfter
            before={imageFor("redesign-before")}
            after={imageFor("redesign-after")}
            labels={r.compare}
            className="aspect-[4/3] w-full md:aspect-[16/9]"
          />
        </Reveal>
      </div>
    </section>
  );
}
