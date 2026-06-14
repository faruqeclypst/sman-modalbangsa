"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Landmark, MapPin, Building2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HistoryNarrativeProps {
  intro: string;
  paragraphs: string[];
  lang: string;
}

export function HistoryNarrative({ intro, paragraphs, lang }: HistoryNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/images/hist_1994_illustration.png",      // 1994: Pondasi Awal
    "/images/hist_1997_illustration.png",      // 1997: Boarding School Life
    "/images/hist_2024_illustration.png",      // Kini: Kampus Modern
    "/images/hist_achievement_illustration.png", // Visi: Keunggulan Prestasi
  ];

  const years = ["1994", "1997", "KINI", "VISI"];

  const eras = {
    id: ["Pondasi Awal", "Relokasi Kampus", "Pusat Unggulan", "Masa Depan"],
    en: ["The Foundation", "Campus Move", "Excellence Hub", "Future Outlook"],
  };

  const eraIcons = [Landmark, MapPin, Building2, Award];
  const allParagraphs = [intro, ...paragraphs];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".history-story-item");

      // Highlight active row on scroll
      items.forEach((item: any, idx) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            setActiveIndex(idx);
            items.forEach((it: any, i) => {
              gsap.to(it, {
                opacity: i === idx ? 1 : 0.3,
                y: i === idx ? 0 : 8,
                duration: 0.5,
                ease: "power2.out",
              });
            });
          },
          onEnterBack: () => {
            setActiveIndex(idx);
            items.forEach((it: any, i) => {
              gsap.to(it, {
                opacity: i === idx ? 1 : 0.3,
                y: i === idx ? 0 : 8,
                duration: 0.5,
                ease: "power2.out",
              });
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">


      {/* Main Content Layout */}
      <div className="relative space-y-12 lg:space-y-6">
        {allParagraphs.map((p, i) => {
          const isFirst = i === 0;
          const year = years[i];
          const era = eras[lang === "id" ? "id" : "en"][i];
          const Icon = eraIcons[i];
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              id={`story-section-${i}`}
              className="history-story-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 transition-all py-6 lg:py-12"
            >
              {/* Column 1: Timeline Dot & Connecting Line Segment (Desktop only) */}
              <div className="hidden lg:flex col-span-1 justify-center items-start relative h-full pt-8 pb-4">
                {/* Connecting lines above and below the dot, centered at top-14 (56px) */}
                {!isFirst && (
                  <div className="absolute top-0 h-[56px] left-1/2 w-[2px] bg-gray-200/80 -translate-x-1/2 z-0" />
                )}
                {i !== allParagraphs.length - 1 && (
                  <div className="absolute top-[56px] bottom-0 left-1/2 w-[2px] bg-gray-200/80 -translate-x-1/2 z-0" />
                )}

                {/* Timeline Icon circle */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] relative z-10 bg-white",
                    isActive
                      ? "border-emerald-500 bg-[#16a34a] text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] scale-110"
                      : "border-gray-200 text-gray-400"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                </div>
              </div>

              {/* Column 2: Text Narrative */}
              <div className="col-span-12 lg:col-span-6 space-y-4">
                {/* Chapter Eyebrow Tag */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50">
                    <Icon className="size-3.5 text-[#16a34a] lg:hidden" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#16a34a]">
                      {era}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-100/50 to-transparent" />
                  <span className="font-serif text-3xl font-light text-[#16a34a]/30 pr-2">
                    {year}
                  </span>
                </div>

                {/* Title & Paragraph */}
                <h3 className="font-sfpro font-bold text-gray-900 text-xl sm:text-2xl tracking-tight leading-snug uppercase">
                  {isFirst
                    ? (lang === "id" ? "Pondasi Utama Sejarah Kami" : "The Genesis of Excellence")
                    : i === 1
                    ? (lang === "id" ? "Relokasi & Membangun Rumah Baru" : "Relocation & New Horizons")
                    : i === 2
                    ? (lang === "id" ? "Pusat Unggulan Pendidikan Berasrama" : "Sustaining Boarding School Leadership")
                    : (lang === "id" ? "Visi Masa Depan Pemimpin Bangsa" : "Pioneering the Path Forward")
                  }
                </h3>
                <p className="leading-relaxed font-sans text-justify text-gray-600 sm:text-left text-sm sm:text-base sm:leading-relaxed">
                  {p}
                </p>
              </div>

              {/* Column 3: Image Card */}
              <div className="col-span-12 lg:col-span-5">
                <div className="relative w-full aspect-[16/10.5] p-2 rounded-[2.5rem] bg-emerald-50/50 border border-emerald-100/40 shadow-[0_8px_30px_rgba(22,163,74,0.02)] overflow-hidden group">
                  <div className="relative w-full h-full rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-white border border-gray-150 shadow-inner">
                    <Image
                      src={images[i]}
                      alt={era}
                      fill
                      className="object-cover transition-transform duration-750 group-hover:scale-103"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                      <span className="rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 text-[9px] text-white uppercase tracking-wider font-bold">
                        {era}
                      </span>
                      <span className="text-xs font-mono font-bold text-white bg-[#16a34a] px-2.5 py-0.5 rounded-md">
                        {year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
