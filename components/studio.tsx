import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import { imageFor } from "@/lib/images";

export function Studio() {
  return (
    <section className="px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-24">
        <Reveal>
          <Media
            src={imageFor("studio")}
            alt="The studio at work"
            slot="public/projects/studio.jpg"
            tone="one"
            sizes="(min-width: 768px) 45vw, 100vw"
            className="aspect-[4/5] w-full"
          />
        </Reveal>
        <Reveal delay={0.1} className="flex max-w-xl flex-col gap-6">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">
            A small studio, on purpose.
          </h2>
          <p className="max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">
            You talk directly to the people doing the work, and you keep every source file when the
            project ends.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
