"use client";

import * as React from "react";
import { animate, stagger } from "animejs";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  heading: string;
}

export function AnimatedTimeline({ items, heading }: AnimatedTimelineProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const line = el.querySelector("[data-timeline-line]") as HTMLElement;
    const dots = el.querySelectorAll("[data-timeline-dot]");
    const cards = el.querySelectorAll("[data-timeline-card]");

    // Initial hidden state
    if (line) {
      line.style.transform = "scaleY(0)";
      line.style.transformOrigin = "top";
    }
    dots.forEach((d) => {
      (d as HTMLElement).style.opacity = "0";
      (d as HTMLElement).style.transform = "scale(0)";
    });
    cards.forEach((c) => {
      (c as HTMLElement).style.opacity = "0";
      (c as HTMLElement).style.transform = "translateX(-30px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Line grows down
            animate(line, {
              scaleY: [0, 1],
              duration: 1200,
              ease: "outQuint",
            });

            // 2. Dots pop in with stagger
            animate(dots, {
              opacity: [0, 1],
              scale: [0, 1],
              delay: stagger(150, { start: 300 }),
              duration: 500,
              ease: "outBack",
            });

            // 3. Cards slide in with stagger
            animate(cards, {
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: stagger(150, { start: 400 }),
              duration: 600,
              ease: "outQuint",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <h2 className="mb-10 text-sm font-bold uppercase tracking-widest text-[color:var(--muted-foreground)]">
        {heading}
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div
          data-timeline-line
          className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[color:var(--primary)] via-[color:var(--primary)]/60 to-[color:var(--primary)]/20 sm:left-1/2 sm:-translate-x-px"
        />

        {/* Items */}
        <div className="space-y-8 sm:space-y-12">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={item.year}
                className="relative flex items-start gap-6 sm:gap-0"
              >
                {/* Dot */}
                <div
                  data-timeline-dot
                  className="absolute left-[14px] top-1 z-10 flex size-[18px] items-center justify-center rounded-full border-[3px] border-[color:var(--primary)] bg-white shadow-md shadow-emerald-100 sm:left-1/2 sm:-translate-x-1/2"
                >
                  <div className="size-2 rounded-full bg-[color:var(--primary)]" />
                </div>

                {/* Card — alternating sides on desktop */}
                <div
                  data-timeline-card
                  className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    isLeft ? "sm:mr-auto sm:pr-4 sm:text-right" : "sm:ml-auto sm:pl-4 sm:text-left"
                  }`}
                >
                  <div className="rounded-xl border border-[color:var(--border)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <span className="inline-flex items-center rounded-full bg-[color:var(--primary)]/10 px-3 py-1 text-xs font-bold text-[color:var(--primary)]">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
