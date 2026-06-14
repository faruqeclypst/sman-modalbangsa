"use client";

import * as React from "react";
import Image from "next/image";
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

  const images = [
    "/images/hist_1994_illustration.png",    // 1994: Pendirian Sekolah
    "/images/hist_1997_illustration.png",    // 1994–1997: Kampus Awal Lampeuneurut
    "/images/hist_1997_relocation.png",      // 1997: Relokasi ke Meulayo
    "/images/hist_2024_illustration.png",    // Sekarang: Blang Bintang
  ];

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const line = el.querySelector("[data-timeline-line]") as HTMLElement;
    const dots = el.querySelectorAll("[data-timeline-dot]");
    const cardImages = el.querySelectorAll(".timeline-image-col");
    const cardTexts = el.querySelectorAll(".timeline-text-col");

    // Initial hidden state
    if (line) {
      line.style.transform = "scaleY(0)";
      line.style.transformOrigin = "top";
    }
    dots.forEach((d) => {
      (d as HTMLElement).style.opacity = "0";
      (d as HTMLElement).style.transform = "scale(0)";
    });
    cardImages.forEach((img) => {
      (img as HTMLElement).style.opacity = "0";
      const isRight = img.parentElement?.classList.contains("md:flex-row-reverse");
      (img as HTMLElement).style.transform = isRight ? "translateX(-40px)" : "translateX(40px)";
    });
    cardTexts.forEach((txt) => {
      (txt as HTMLElement).style.opacity = "0";
      const isRight = txt.parentElement?.classList.contains("md:flex-row-reverse");
      (txt as HTMLElement).style.transform = isRight ? "translateX(30px)" : "translateX(-30px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Line grows down
            animate(line, {
              scaleY: [0, 1],
              duration: 1400,
              ease: "outQuint",
            });

            // 2. Dots pop in
            animate(dots, {
              opacity: [0, 1],
              scale: [0, 1],
              delay: stagger(180, { start: 200 }),
              duration: 500,
              ease: "outBack",
            });

            // 3. Images slide in
            animate(cardImages, {
              opacity: [0, 1],
              translateX: (el: Element) => {
                const isRight = el.parentElement?.classList.contains("md:flex-row-reverse");
                return isRight ? [-40, 0] : [40, 0];
              },
              delay: stagger(180, { start: 300 }),
              duration: 800,
              ease: "outQuint",
            });

            // 4. Texts slide in
            animate(cardTexts, {
              opacity: [0, 1],
              translateX: (el: Element) => {
                const isRight = el.parentElement?.classList.contains("md:flex-row-reverse");
                return isRight ? [30, 0] : [-30, 0];
              },
              delay: stagger(180, { start: 450 }),
              duration: 800,
              ease: "outQuint",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-4">
      {heading && (
        <h2 className="mb-16 text-center text-xs font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 inline-block left-1/2 -translate-x-1/2 relative">
          {heading}
        </h2>
      )}

      <div className="relative">
        {/* Central Vertical Line (visible on desktop) */}
        <div
          data-timeline-line
          className="absolute left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#16a34a] via-[#16a34a]/40 to-[#16a34a]/10 md:left-1/2 md:-translate-x-px"
        />

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-28">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const imageUrl = images[idx] || "/images/academy_campus.png";

            return (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${
                  isLeft ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Visual Dot on the center track line */}
                <div
                  data-timeline-dot
                  className="absolute left-2.5 top-[22px] z-20 flex size-[14px] items-center justify-center rounded-full border-2 border-[#16a34a] bg-white shadow-md md:left-1/2 md:-translate-x-1/2 md:top-[calc(50%-7px)]"
                >
                  <div className="size-2 rounded-full bg-[#16a34a]" />
                </div>

                {/* Left Side: Image Box */}
                <div className="timeline-image-col w-full md:w-[calc(50%-3rem)] pl-10 md:pl-0 flex justify-center">
                  <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50 shadow-md transition-all duration-500 hover:shadow-lg">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Right Side: Text & Info */}
                <div className="timeline-text-col w-full md:w-[calc(50%-3rem)] pl-10 md:pl-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-4xl sm:text-5xl font-light text-[#16a34a]/30">
                      {item.year}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/10 to-transparent" />
                  </div>

                  <h3 className="font-sfpro text-xl font-bold text-gray-900 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
