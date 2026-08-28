import { company, contact } from "../content";
import { ChatIcon, HouseFrame, MailIcon, PhoneIcon, PinIcon } from "./Marks";
import { Reveal } from "./Reveal";

const lines = [
  {
    icon: ChatIcon,
    label: contact.whatsapp.label,
    value: contact.whatsapp.display,
    href: contact.whatsapp.href,
    external: true,
  },
  {
    icon: PhoneIcon,
    label: contact.phone.label,
    value: contact.phone.display,
    href: contact.phone.href,
    external: false,
  },
  {
    icon: PhoneIcon,
    label: contact.direct.label,
    value: contact.direct.display,
    href: contact.direct.href,
    external: false,
  },
  {
    icon: MailIcon,
    label: contact.email.label,
    value: contact.email.display,
    href: contact.email.href,
    external: false,
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-[1120px] border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Contact</p>
        <h2
          id="contact-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Contact Us
        </h2>

        <div className="relative">
          <HouseFrame className="text-gold" />
          <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-14 md:py-14">
            <div>
              <p className="stamp mb-3">Company</p>
              <p className="font-serif text-3xl font-semibold tracking-wide text-gold md:text-4xl">
                {company.wordmark}
              </p>
              <p className="mt-2 font-stamp text-[13px] tracking-[0.18em] text-bone">
                {company.descriptor}
              </p>
              <p className="mt-6 max-w-sm text-dust">{company.tagline}</p>
              <p className="mt-8 stamp">Service area</p>
              <p className="mt-2 text-bone">{contact.serviceArea}</p>
            </div>

            <div>
              <address className="not-italic">
                <p className="stamp mb-3">Location</p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-bone transition-colors duration-200 hover:text-gilt"
                >
                  <PinIcon className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="sr-only">Address: </span>
                  <span>{contact.address}</span>
                </a>

                <ul className="mt-8 space-y-4">
                  {lines.map((line) => (
                    <li key={line.href}>
                      <a
                        href={line.href}
                        target={line.external ? "_blank" : undefined}
                        rel={line.external ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 text-bone transition-colors duration-200 hover:text-gilt"
                      >
                        <line.icon className="h-4 w-4 shrink-0 text-gold" />
                        <span className="stamp w-20 shrink-0">{line.label}</span>
                        <span className="font-medium">{line.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </address>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a className="btn btn-primary" href={contact.phone.href}>
                  Call
                </a>
                <a
                  className="btn btn-secondary"
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a className="btn btn-secondary" href={contact.email.href}>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
