"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type SpmsLottieProps = {
  src: string;
  aspectWidth: number;
  aspectHeight: number;
  className?: string;
  eager?: boolean;
};

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeClient() {
  return () => {};
}

export function SpmsLottie({
  src,
  aspectWidth,
  aspectHeight,
  className,
  eager = false,
}: SpmsLottieProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(eager);
  const isClient = useSyncExternalStore(subscribeClient, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  useEffect(() => {
    if (eager || load) return;
    const el = hostRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, load]);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
      style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }}
    >
      {isClient && load ? (
        <DotLottieReact
          src={src}
          loop={!reducedMotion}
          autoplay={!reducedMotion}
          className="pointer-events-none block h-full w-full"
          layout={{ fit: "contain", align: [0.5, 0.5] }}
        />
      ) : null}
    </div>
  );
}
