type MarkProps = {
  className?: string;
};

export function RoofMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 18"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M1.5 16.5 L16 2 L30.5 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function HouseFrame({
  draw = false,
  className,
}: MarkProps & { draw?: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-3 ${className ?? ""}`}>
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 720"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={draw ? "house-frame-path house-frame-draw" : "house-frame-path"}
          pathLength={1}
          d="M 38 688 L 38 236 L 500 42 L 962 236 L 962 688 Z"
        />
      </svg>
    </div>
  );
}

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

export function PinIcon({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10.5" r="2.1" stroke="currentColor" strokeWidth="1.4" />
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
