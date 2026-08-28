type MarkProps = {
  className?: string;
};

export function PhoneIcon({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M6.5 3.75h3.2l1.3 3.2-1.7 1.1a12.5 12.5 0 0 0 6.65 6.65l1.1-1.7 3.2 1.3v3.2c0 .7-.57 1.25-1.27 1.2C10.3 17.95 6.05 13.7 5.3 5.02c-.05-.7.5-1.27 1.2-1.27Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 7.2 12 13l8-5.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ChatIcon({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M5 18.5 6.6 16H18.2A2.3 2.3 0 0 0 20.5 13.7V7.3A2.3 2.3 0 0 0 18.2 5H5.8A2.3 2.3 0 0 0 3.5 7.3v9.4c0 1.2 1.3 1.9 2 1.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

