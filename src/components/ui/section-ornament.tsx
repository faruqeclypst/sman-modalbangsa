"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative section ornament with Acehnese batik/floral motif.
 * Animates (grows) when scrolled into view using IntersectionObserver.
 */
export function SectionOrnament({ flip = false }: { flip?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none flex items-center justify-center overflow-hidden py-4"
      aria-hidden
    >
      <svg
        ref={ref}
        viewBox="0 0 800 80"
        className={`section-ornament h-12 w-full max-w-2xl sm:h-16 ${flip ? "scale-y-[-1]" : ""}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center flower */}
        <g className="ornament-center" opacity="0.15">
          <circle cx="400" cy="40" r="8" fill="currentColor" />
          <path
            d="M400 20c2-8 6-14 0-18s-6 10 0 18Zm0 0c-2-8-6-14 0-18s6 10 0 18Z"
            fill="currentColor"
          />
          <path
            d="M400 60c2 8 6 14 0 18s-6-10 0-18Zm0 0c-2 8-6 14 0-18s6 10 0 18Z"
            fill="currentColor"
          />
          {/* Petals */}
          <ellipse cx="400" cy="28" rx="4" ry="10" fill="currentColor" />
          <ellipse cx="400" cy="52" rx="4" ry="10" fill="currentColor" />
          <ellipse cx="388" cy="40" rx="10" ry="4" fill="currentColor" />
          <ellipse cx="412" cy="40" rx="10" ry="4" fill="currentColor" />
          {/* Diagonal petals */}
          <ellipse cx="391" cy="31" rx="3.5" ry="8" transform="rotate(-45 391 31)" fill="currentColor" />
          <ellipse cx="409" cy="31" rx="3.5" ry="8" transform="rotate(45 409 31)" fill="currentColor" />
          <ellipse cx="391" cy="49" rx="3.5" ry="8" transform="rotate(45 391 49)" fill="currentColor" />
          <ellipse cx="409" cy="49" rx="3.5" ry="8" transform="rotate(-45 409 49)" fill="currentColor" />
        </g>

        {/* Left vine */}
        <g className="ornament-left" opacity="0.12">
          <path
            d="M380 40c-20 0-30-5-50-5s-40 8-60 5-30-10-50-8-40 5-60 3-50-6-70-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Leaves on left vine */}
          <path d="M340 35c-4-6-10-8-14-5s2 8 8 9 8-1 6-4Z" fill="currentColor" />
          <path d="M290 38c-3-7-8-10-12-8s0 9 6 11 8 0 6-3Z" fill="currentColor" />
          <path d="M240 36c-4-5-9-7-12-4s1 7 6 8 8 0 6-4Z" fill="currentColor" />
          <path d="M190 38c-3-6-8-9-11-6s1 8 6 9 7-1 5-3Z" fill="currentColor" />
          {/* Small buds */}
          <circle cx="350" cy="37" r="2.5" fill="currentColor" />
          <circle cx="310" cy="39" r="2" fill="currentColor" />
          <circle cx="260" cy="37" r="2.5" fill="currentColor" />
          <circle cx="210" cy="38" r="2" fill="currentColor" />
          {/* Curls */}
          <path d="M360 40c-3 6-2 12 2 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M320 40c-2 5-1 10 2 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M270 40c-3 5-2 10 1 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>

        {/* Right vine (mirrored) */}
        <g className="ornament-right" opacity="0.12">
          <path
            d="M420 40c20 0 30-5 50-5s40 8 60 5 30-10 50-8 40 5 60 3 50-6 70-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Leaves on right vine */}
          <path d="M460 35c4-6 10-8 14-5s-2 8-8 9-8-1-6-4Z" fill="currentColor" />
          <path d="M510 38c3-7 8-10 12-8s0 9-6 11-8 0-6-3Z" fill="currentColor" />
          <path d="M560 36c4-5 9-7 12-4s-1 7-6 8-8 0-6-4Z" fill="currentColor" />
          <path d="M610 38c3-6 8-9 11-6s-1 8-6 9-7-1-5-3Z" fill="currentColor" />
          {/* Small buds */}
          <circle cx="450" cy="37" r="2.5" fill="currentColor" />
          <circle cx="490" cy="39" r="2" fill="currentColor" />
          <circle cx="540" cy="37" r="2.5" fill="currentColor" />
          <circle cx="590" cy="38" r="2" fill="currentColor" />
          {/* Curls */}
          <path d="M440 40c3 6 2 12-2 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M480 40c2 5 1 10-2 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M530 40c3 5 2 10-1 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
