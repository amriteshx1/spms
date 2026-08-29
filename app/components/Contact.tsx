import { company, contact } from "../content";
import { ChatIcon, MailIcon, PhoneIcon } from "./Marks";
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
  ...contact.emails.map((item) => ({
    icon: MailIcon,
    label: item.label,
    value: item.display,
    href: item.href,
    external: false,
  })),
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-280 border-t border-gold/20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="stamp mb-3">Contact</p>
        <h2
          id="contact-heading"
          className="mb-10 font-sans text-[2rem] font-medium tracking-tight text-bone md:mb-12 md:text-[2.5rem]"
        >
          Contact Us
        </h2>

        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-stretch md:gap-16">
          <div className="flex flex-col md:h-full">
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

            <address className="mt-8 not-italic">
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      target={line.external ? "_blank" : undefined}
                      rel={line.external ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 text-bone transition-colors duration-200 hover:text-gilt"
                    >
                      <line.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span className="stamp w-20 shrink-0 pt-0.5">{line.label}</span>
                      <span className="min-w-0 break-all font-medium">{line.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>

          <div className="md:flex md:h-full md:min-h-0 md:flex-col">
            <div className="flex min-h-88 flex-col border border-gold/25 bg-raised px-6 py-10 md:h-full md:justify-center md:px-8 md:py-12">
              <p className="font-sans text-2xl font-medium tracking-tight text-bone">
                {contact.form.label}
              </p>
              <p className="mt-3 max-w-sm text-dust">{company.tagline}</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                  className="btn btn-primary col-span-2 w-full"
                  href={contact.form.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.form.label}
                </a>
                <a className="btn btn-secondary w-full" href={contact.call.href}>
                  Call
                </a>
                <a
                  className="btn btn-secondary w-full"
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a className="btn btn-secondary col-span-2 w-full" href={contact.emails[0].href}>
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
