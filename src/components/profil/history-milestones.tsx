"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Calendar, Home, Milestone, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

interface HistoryMilestonesProps {
  items: MilestoneItem[];
  lang: string;
}

export function HistoryMilestones({ items, lang }: HistoryMilestonesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayRef = useRef<HTMLDivElement>(null);

  const images = [
    "/images/hist_1994_illustration.png",    // 1994: Pendirian
    "/images/hist_1997_illustration.png",    // 1997: Boarding Life
    "/images/hist_1997_relocation.png",      // 1997: Relokasi ke Meulayo
    "/images/hist_2024_illustration.png",    // Sekarang: Kampus Modern
  ];

  const icons = [Calendar, Home, Milestone, MapPin];

  // Animate transition using GSAP
  useEffect(() => {
    if (!displayRef.current) return;

    const img = displayRef.current.querySelector(".milestone-art");
    const year = displayRef.current.querySelector(".milestone-year");
    const title = displayRef.current.querySelector(".milestone-title");
    const dialog = displayRef.current.querySelector(".milestone-dialog");
    const quote = displayRef.current.querySelector(".milestone-quote");

    gsap.killTweensOf([img, year, title, dialog, quote]);

    const tl = gsap.timeline();
    tl.to([img, year, title, dialog, quote], {
      opacity: 0,
      x: (i) => (i === 0 ? 35 : -35), // Image slides right, text slides left
      y: (i) => (i === 0 ? 0 : 8),
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    }).to([img, year, title, dialog, quote], {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: "power3.out",
    });
  }, [activeIndex]);

  const currentMilestone = items[activeIndex];
  const currentImageUrl = images[activeIndex] || "/images/academy_campus.png";
  const IconComponent = icons[activeIndex] || Calendar;

  return (
    <div className="flex flex-col gap-10" ref={displayRef}>
      
      {/* Presentation Panel */}
      <div className="relative min-h-[460px] md:min-h-[500px] rounded-[2.5rem] border border-gray-100 bg-gray-50/40 overflow-hidden p-6 md:p-12 flex flex-col justify-between">
        
        {/* Right side large graphic (Genshin Character Art style) */}
        <div className="milestone-art absolute right-0 top-0 bottom-0 w-full md:w-3/5 h-1/2 md:h-full opacity-35 md:opacity-100 pointer-events-none z-0">
          <div className="relative w-full h-full">
            <Image
              src={currentImageUrl}
              alt={currentMilestone.title}
              fill
              priority
              className="object-cover"
            />
            {/* Soft fade gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/90 md:via-gray-50/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent z-10" />
          </div>
        </div>

        {/* Left Side Info Overlay */}
        <div className="w-full md:w-1/2 z-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="milestone-year font-serif text-5xl md:text-6xl font-light text-[#16a34a]/30">
                {currentMilestone.year}
              </span>
              <div className="h-px w-16 bg-[#16a34a]/30" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === "id" ? "Kronologi" : "Timeline"}
              </span>
            </div>
            <h3 className="milestone-title font-sfpro text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">
              {currentMilestone.title}
            </h3>
          </div>

          {/* Translucent Dialogue Box */}
          <div className="milestone-dialog bg-emerald-950/90 text-white rounded-2xl p-6 border border-emerald-500/25 backdrop-blur-md shadow-2xl relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rotate-45 border border-amber-300 hidden md:block" />
            
            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium">
              {currentMilestone.description}
            </p>
          </div>

          {/* Quote Subheader */}
          <div className="milestone-quote flex items-center gap-2 text-xs font-semibold text-emerald-800 italic">
            <ChevronRight className="size-4 text-amber-500 shrink-0" />
            <span>
              {lang === "id"
                ? "Bagian dari dedikasi dan perjalanan SMAN Modal Bangsa."
                : "Part of SMAN Modal Bangsa's dedication and journey."}
            </span>
          </div>
        </div>

      </div>

      {/* Selector Bar */}
      <div className="w-full select-none">
        <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">
          {lang === "id" ? "Pilih Periode Sejarah" : "Select History Period"}
        </h5>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1">
          {items.map((item, i) => {
            const ButtonIcon = icons[i] || Calendar;
            const isActive = i === activeIndex;

            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 cursor-pointer text-center border",
                  isActive
                    ? "bg-white border-[#16a34a] shadow-lg shadow-emerald-900/5 -translate-y-1"
                    : "bg-gray-50/50 border-gray-200/60 hover:bg-white hover:border-emerald-500/30 hover:-translate-y-0.5"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl border-2 border-emerald-500/20 animate-pulse pointer-events-none" />
                )}

                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full transition-colors duration-300",
                    isActive
                      ? "bg-[#16a34a] text-white"
                      : "bg-white text-gray-400 group-hover:text-emerald-700"
                  )}
                >
                  <ButtonIcon className="size-5" />
                </div>

                <span
                  className={cn(
                    "mt-3 text-xs font-bold tracking-tight block transition-colors duration-300",
                    isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
                  )}
                >
                  {item.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
