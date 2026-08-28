import { commitment, company } from "../content";
import { Reveal } from "./Reveal";

export function Commitment() {
  return (
    <section
      id="commitment"
      aria-labelledby="commitment-heading"
      className="mx-auto max-w-[1120px] border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Commitment</p>
        <h2
          id="commitment-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Our Commitment
        </h2>
        <blockquote className="max-w-4xl border-l border-gold pl-6 md:pl-8">
          <p className="font-sans text-[1.35rem] font-medium leading-snug tracking-tight text-bone md:text-[1.85rem] md:leading-[1.35]">
            {commitment}
          </p>
          <footer className="mt-8">
            <p className="stamp">{company.closingLine}</p>
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}
