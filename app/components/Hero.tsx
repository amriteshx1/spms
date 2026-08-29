import type { CSSProperties } from "react";
import { company, contact, stats } from "../content";
import { SpmsLottie } from "./SpmsLottie";

const waybill = [
  { stamp: "Origin", value: "Ranchi, Jharkhand" },
  { stamp: "Destination", value: "Pan-India" },
  { stamp: "Record", value: `${stats[0].value} ${stats[0].label}` },
  { stamp: "Served", value: `${stats[2].value} ${stats[2].label}` },
] as const;

export function Hero() {
  return (
    <section
      className="mx-auto flex w-full max-w-280 flex-col px-5 pb-10 pt-6 sm:px-8 md:min-h-[calc(100svh-5.5rem)] md:justify-center md:pt-8"
      aria-labelledby="hero-title"
    >
      <div className="relative">
        <div className="relative z-10 flex flex-col items-center px-6 py-10 text-center sm:px-12 sm:py-12 md:px-16 md:py-14">
          <div
            className="hero-rise"
            style={{ "--hero-delay": "280ms" } as CSSProperties}
          >
            <p className="stamp mb-3">{company.lineOfWork}</p>
            <h1
              id="hero-title"
              className="font-serif text-[clamp(2.75rem,8vw,5.75rem)] font-semibold leading-[0.92] tracking-[0.04em] text-gold"
            >
              {company.wordmark}
            </h1>
            <p className="mt-3 font-stamp text-[13px] font-medium tracking-[0.22em] text-bone sm:text-[15px]">
              {company.descriptor}
            </p>
          </div>

          <p
            className="hero-rise mt-6 max-w-xl text-lg text-bone md:text-xl"
            style={{ "--hero-delay": "400ms" } as CSSProperties}
          >
            {company.tagline}
          </p>

          <div
            className="hero-rise mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center"
            style={{ "--hero-delay": "520ms" } as CSSProperties}
          >
            <a
              className="btn btn-primary"
              href={contact.form.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.form.label}
            </a>
            <a className="btn btn-secondary" href={contact.call.href}>
              Call now
            </a>
          </div>

          <div
            className="hero-fade mx-auto mt-8 w-[min(20rem,82vw)] md:mt-10 md:w-[min(28rem,48vw)]"
            style={{ "--hero-delay": "640ms" } as CSSProperties}
          >
            <SpmsLottie
              src="/firstOne-spms.lottie"
              aspectWidth={1000}
              aspectHeight={600}
              eager
            />
          </div>
        </div>
      </div>

      <dl
        className="hero-rise mt-6 grid grid-cols-2 border border-gold/30 md:grid-cols-4"
        style={{ "--hero-delay": "760ms" } as CSSProperties}
      >
        {waybill.map((item) => (
          <div
            key={item.stamp}
            className="border-gold/30 px-4 py-4 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r md:border-b-0 md:px-5 md:py-5 md:[&:nth-child(odd)]:border-r-0 md:[&:not(:last-child)]:border-r"
          >
            <dt className="stamp mb-1.5">{item.stamp}</dt>
            <dd className="font-sans text-sm font-medium text-bone md:text-[15px]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <p
        className="hero-rise mt-5 text-center text-sm text-dust"
        style={{ "--hero-delay": "820ms" } as CSSProperties}
      >
        {company.locationLine}
      </p>
    </section>
  );
}
