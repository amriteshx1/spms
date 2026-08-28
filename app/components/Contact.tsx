import { company, contact } from "../content";
import { ChatIcon, MailIcon, PhoneIcon } from "./Marks";
import { ContactForm } from "./ContactForm";
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

        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
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
              <a className="btn btn-secondary" href={contact.emails[0].href}>
                Email
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
