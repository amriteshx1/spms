import { overview } from "../content";
import { Reveal } from "./Reveal";

export function Overview() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="mx-auto max-w-[1120px] border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Company</p>
        <h2
          id="overview-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Company Overview
        </h2>
        <div className="max-w-3xl space-y-5 text-dust">
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        <Reveal delayMs={40}>
          <article className="h-full border border-gold/25 bg-raised p-6 md:p-8">
            <p className="stamp mb-4">Mission</p>
            <p className="text-bone">{overview.mission}</p>
          </article>
        </Reveal>
        <Reveal delayMs={100}>
          <article className="h-full border border-gold/25 bg-raised p-6 md:p-8">
            <p className="stamp mb-4">Vision</p>
            <p className="text-bone">{overview.vision}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
