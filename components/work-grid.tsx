import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { projects, type Project } from "@/lib/content";
import { imageFor } from "@/lib/images";

/**
 * 9-cell bento, one cell per project, every desktop row sums to 12 columns:
 *   row 1-2: [7, tall] [5] / [5]
 *   row 3:   [4] [8]
 *   row 4:   [5] [7]
 *   row 5:   [8] [4]
 * Below lg it collapses to a single column with its own aspect ratios.
 */
const cells = [
  { span: "lg:col-span-7 lg:row-span-2", tone: "accent", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-5", tone: "two", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-5", tone: "three", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-4", tone: "one", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-8", tone: "two", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-5", tone: "three", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-7", tone: "one", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-8", tone: "two", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-4", tone: "three", aspect: "aspect-[4/3]" },
] as const;

function Cell({ project, index }: { project: Project; index: number }) {
  const cell = cells[index];
  return (
    <Reveal delay={(index % 3) * 0.06} className={cn("min-h-0", cell.span)}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full min-h-0 flex-col gap-3 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Media
          src={imageFor(project.slug)}
          alt={`${project.title} website`}
          slot={`public/projects/${project.slug}.jpg`}
          tone={cell.tone}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className={cn(
            "w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.985] lg:aspect-auto lg:flex-1",
            cell.aspect,
          )}
        />
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
          <h3 className="flex items-center gap-1.5 text-lg font-medium tracking-tight">
            {project.title}
            <ArrowUpRight
              aria-hidden
              className="size-4 text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </h3>
          <p className="shrink-0 text-sm text-mute">{project.sector}</p>
        </div>
      </a>
    </Reveal>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="mb-10 text-3xl font-semibold tracking-tighter md:mb-16 md:text-5xl">
            Selected work
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:auto-rows-[clamp(220px,26vw,400px)] lg:grid-cols-12">
          {projects.slice(0, cells.length).map((project, i) => (
            <Cell key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
