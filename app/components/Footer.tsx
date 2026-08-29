import { company } from "../content";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-raised">
      <div className="mx-auto max-w-280 px-5 py-10 sm:px-8 md:py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="text-gold">
            <p className="font-serif text-xl font-semibold tracking-normal">{company.wordmark}</p>
            <p className="mt-1.5 font-stamp text-[11px] tracking-normal text-dust">
              {company.descriptor}
            </p>
            <p className="mt-3 max-w-xs text-sm text-dust">{company.tagline}</p>
          </div>
          <p className="stamp text-gold tracking-normal">{company.footerMotto}</p>
          <p className="font-stamp text-[12px] font-medium uppercase tracking-normal text-dust md:text-right">
            Ranchi · Pan-India
          </p>
        </div>
      </div>
    </footer>
  );
}
