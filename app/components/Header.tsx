import Image from "next/image";
import { company, contact, nav } from "../content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-ink pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-5 py-3 sm:px-8 md:flex-row md:items-center md:gap-8 md:py-3.5">
        <div className="flex items-center justify-between gap-4 md:min-w-0 md:flex-1">
          <a
            href="#main"
            aria-label="Sailanee Packers And Movers"
            className="flex min-w-0 items-center gap-3 text-gold"
          >
            <Image
              src="/logo.png"
              alt=""
              width={1536}
              height={1024}
              className="h-8 w-auto sm:h-9"
              priority
            />
            <span className="font-serif text-[1.2rem] font-semibold leading-none tracking-wide text-gold sm:text-[1.35rem]">
              {company.wordmark}
            </span>
            <span className="hidden font-stamp text-[11px] font-medium tracking-[0.18em] text-dust lg:inline">
              {company.descriptor}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <a className="btn btn-primary min-w-0 px-3.5" href={contact.phone.href}>
              Call
            </a>
            <a
              className="btn btn-secondary min-w-0 px-3.5"
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-4 md:justify-end md:gap-8"
        >
          <ul className="flex items-center gap-5 font-stamp text-[12px] font-medium uppercase tracking-[0.18em] text-dust sm:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a className="transition-colors duration-200 hover:text-gilt" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a className="btn btn-primary min-w-[7.5rem]" href={contact.phone.href}>
              Call
            </a>
            <a
              className="btn btn-secondary min-w-[7.5rem]"
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
