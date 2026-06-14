"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative section ornament with Acehnese Pintu Aceh / floral motif.
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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none flex items-center justify-center overflow-hidden py-6"
      aria-hidden
    >
      <svg
        ref={ref}
        viewBox="0 0 800 100"
        className={`section-ornament h-12 w-full max-w-2xl sm:h-16 ${flip ? "scale-y-[-1]" : ""}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* Center Crest: Pintu Aceh Motif */}
        <g className="ornament-center">
          {/* Gold outer glow background circle */}
          <circle cx="400" cy="50" r="28" fill="url(#gold-grad)" opacity="0.08" />
          
          {/* Pintu Aceh / Gate Outline */}
          <path
            d="M 384 72 L 384 50 C 384 38, 390 30, 400 30 C 410 30, 416 38, 416 50 L 416 72 Z"
            stroke="url(#gold-grad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Internal Gate Details */}
          <path
            d="M 388 72 L 388 52 C 388 43, 393 36, 400 36 C 407 36, 412 43, 412 52 L 412 72"
            stroke="url(#green-grad)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Center star / flower inside gate */}
          <path
            d="M 400 42 L 403 48 L 409 50 L 403 52 L 400 58 L 397 52 L 391 50 L 397 48 Z"
            fill="url(#gold-grad)"
          />
          <circle cx="400" cy="50" r="2.5" fill="#ffffff" />
          
          {/* External floral wings on the side of the center */}
          <path
            d="M 378 50 C 368 40, 370 30, 380 30 C 382 30, 384 32, 384 34 C 384 38, 372 44, 384 50"
            fill="url(#gold-grad)"
            opacity="0.95"
          />
          <path
            d="M 422 50 C 432 40, 430 30, 420 30 C 418 30, 416 32, 416 34 C 416 38, 428 44, 416 50"
            fill="url(#gold-grad)"
            opacity="0.95"
          />
        </g>

        {/* Left Vine */}
        <g className="ornament-left">
          {/* Main connecting vine line */}
          <path
            d="M 368 50 C 328 50, 308 36, 268 36 C 228 36, 198 64, 158 64 C 118 64, 88 50, 48 50"
            stroke="url(#green-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sub vine curls */}
          <path
            d="M 288 43 C 283 28, 268 24, 258 30"
            stroke="url(#gold-grad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 178 57 C 173 72, 158 76, 148 70"
            stroke="url(#gold-grad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Leaf motifs along left vine */}
          <path d="M 318 44 C 313 33, 303 36, 308 47 C 313 47, 320 46, 318 44 Z" fill="url(#green-grad)" />
          <path d="M 238 44 C 233 55, 223 52, 228 41 C 233 41, 240 42, 238 44 Z" fill="url(#gold-grad)" />
          <path d="M 128 60 C 123 49, 113 52, 118 63 C 123 63, 130 62, 128 60 Z" fill="url(#green-grad)" />
          
          {/* Small dots / buds */}
          <circle cx="338" cy="48" r="3" fill="url(#gold-grad)" />
          <circle cx="278" cy="36" r="2.5" fill="url(#green-grad)" />
          <circle cx="208" cy="50" r="3.2" fill="url(#gold-grad)" />
          <circle cx="98" cy="55" r="2.5" fill="url(#green-grad)" />
          <circle cx="63" cy="50" r="2" fill="url(#gold-grad)" />
        </g>

        {/* Right Vine (Mirrored) */}
        <g className="ornament-right">
          {/* Main connecting vine line */}
          <path
            d="M 432 50 C 472 50, 492 36, 532 36 C 572 36, 602 64, 642 64 C 682 64, 712 50, 752 50"
            stroke="url(#green-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sub vine curls */}
          <path
            d="M 512 43 C 517 28, 532 24, 542 30"
            stroke="url(#gold-grad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 622 57 C 627 72, 642 76, 652 70"
            stroke="url(#gold-grad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Leaf motifs along right vine */}
          <path d="M 482 44 C 487 33, 497 36, 492 47 C 487 47, 480 46, 482 44 Z" fill="url(#green-grad)" />
          <path d="M 562 44 C 567 55, 577 52, 572 41 C 567 41, 560 42, 562 44 Z" fill="url(#gold-grad)" />
          <path d="M 672 60 C 677 49, 687 52, 682 63 C 677 63, 670 62, 672 60 Z" fill="url(#green-grad)" />
          
          {/* Small dots / buds */}
          <circle cx="462" cy="48" r="3" fill="url(#gold-grad)" />
          <circle cx="522" cy="36" r="2.5" fill="url(#green-grad)" />
          <circle cx="592" cy="50" r="3.2" fill="url(#gold-grad)" />
          <circle cx="702" cy="55" r="2.5" fill="url(#green-grad)" />
          <circle cx="737" cy="50" r="2" fill="url(#gold-grad)" />
        </g>
      </svg>
    </div>
  );
}
