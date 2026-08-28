import { services } from "../content";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-[1120px] border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Services</p>
        <h2
          id="services-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Our Services
        </h2>
      </Reveal>

      <ul className="border-t border-gold/30">
        {services.map((service, index) => (
          <li key={service.code}>
            <Reveal delayMs={Math.min(index * 60, 300)}>
              <div className="manifest-row">
                <span className="manifest-code">{service.code}</span>
                <h3 className="font-sans text-lg font-medium text-bone md:pt-0">
                  {service.name}
                </h3>
                <p className="col-span-2 text-[15px] text-dust md:col-span-1">
                  {service.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delayMs={80}>
        <p className="mt-10">
          <a
            href="#contact"
            className="font-stamp text-[13px] font-medium uppercase tracking-[0.16em] text-gold transition-colors duration-200 hover:text-gilt"
          >
            Request a move
          </a>
        </p>
      </Reveal>
    </section>
  );
}
