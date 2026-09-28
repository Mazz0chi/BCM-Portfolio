import { Reveal } from "@/components/reveal";
import { process } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 px-4 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">How a project runs</h2>
        </Reveal>
        <ol className="mt-10 divide-y divide-line md:mt-16">
          {process.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.05}>
                <div className="group grid gap-3 py-8 md:grid-cols-[5fr_6fr] md:items-baseline md:gap-12 md:py-12">
                  <h3 className="text-4xl font-semibold tracking-tighter transition-colors duration-500 group-hover:text-accent md:text-6xl">
                    {step.title}
                  </h3>
                  <p className="max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
