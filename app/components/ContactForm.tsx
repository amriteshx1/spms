"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-[4px] border border-gold/25 bg-raised px-3.5 py-3 text-[15px] text-bone outline-none transition-colors duration-200 placeholder:text-dust/70 focus-visible:border-gilt";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          mobile: data.get("mobile"),
          description: data.get("description"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(result.error ?? "We could not send your enquiry. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("We could not send your enquiry. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex min-h-[22rem] flex-col items-center justify-center border border-gold/25 bg-raised px-6 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" fill="none">
            <path
              d="M6 12.5 10.2 16.5 18 8.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-6 font-sans text-2xl font-medium tracking-tight text-bone">
          Submitted successfully
        </h3>
        <p className="mt-3 max-w-sm text-dust">
          Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <label className="block">
        <span className="stamp">Name</span>
        <input
          className={fieldClass}
          type="text"
          name="name"
          id="contact-name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          disabled={status === "submitting"}
          suppressHydrationWarning
        />
      </label>
      <label className="block">
        <span className="stamp">Email</span>
        <input
          className={fieldClass}
          type="email"
          name="email"
          id="contact-email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={120}
          disabled={status === "submitting"}
          suppressHydrationWarning
        />
      </label>
      <label className="block">
        <span className="stamp">Mobile number</span>
        <input
          className={fieldClass}
          type="tel"
          name="mobile"
          id="contact-mobile"
          autoComplete="tel"
          inputMode="tel"
          required
          maxLength={20}
          disabled={status === "submitting"}
          suppressHydrationWarning
        />
      </label>
      <label className="block">
        <span className="stamp">Short description</span>
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          name="description"
          required
          minLength={8}
          maxLength={1000}
          disabled={status === "submitting"}
        />
      </label>

      {error ? (
        <p className="text-sm text-gilt" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending" : "Submit"}
      </button>
    </form>
  );
}
