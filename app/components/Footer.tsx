import { company } from "../content";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-raised">
      <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:py-10">
        <div className="text-gold">
          <p className="font-serif text-lg font-semibold tracking-wide">{company.wordmark}</p>
          <p className="mt-1 font-stamp text-[11px] tracking-[0.16em] text-dust">
            {company.tagline}
          </p>
        </div>
        <p className="stamp text-gold">{company.footerMotto}</p>
        <p className="font-stamp text-[12px] font-medium uppercase tracking-[0.16em] text-dust">
          Ranchi · Pan-India
        </p>
      </div>
    </footer>
  );
}
