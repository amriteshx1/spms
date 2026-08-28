import { reasons } from "../content";
import { Reveal } from "./Reveal";

export function WhySailanee() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="mx-auto max-w-[1120px] border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Why Sailanee</p>
        <h2
          id="why-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Why Choose Sailanee Packers And Movers
        </h2>
      </Reveal>

      <ul className="divide-y divide-gold/25 border-y border-gold/25">
        {reasons.map((reason, index) => (
          <li key={reason.title}>
            <Reveal delayMs={Math.min(index * 50, 250)}>
              <div className="grid gap-2 py-5 md:grid-cols-[0.75rem_minmax(14rem,0.42fr)_1fr] md:items-start md:gap-8 md:py-6">
                <span
                  className="mt-2.5 hidden h-1.5 w-1.5 bg-gold md:block"
                  aria-hidden="true"
                />
                <h3 className="font-sans text-lg font-medium text-bone">
                  {reason.title}
                </h3>
                <p className="text-[15px] text-dust">{reason.detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
