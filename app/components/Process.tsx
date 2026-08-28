import { process as stages } from "../content";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="mx-auto max-w-[1120px] border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Process</p>
        <h2
          id="process-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Our Service Process
        </h2>
      </Reveal>

      <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-0">
        {stages.map((stage, index) => (
          <li
            key={stage.step}
            className="xl:border-l xl:border-gold/30 xl:px-5 xl:first:border-l-0 xl:first:pl-0"
          >
            <Reveal delayMs={Math.min(index * 60, 300)}>
              <div className="flex h-full flex-col">
                <span className="font-stamp text-[1.75rem] font-semibold tracking-[0.08em] text-gold">
                  {stage.step}
                </span>
                <h3 className="mt-4 font-sans text-base font-medium text-bone">
                  {stage.name}
                </h3>
                <p className="mt-3 text-sm text-dust">{stage.detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
