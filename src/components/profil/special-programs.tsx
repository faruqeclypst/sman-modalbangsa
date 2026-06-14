"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { BookOpen, Shield, Award, Users, MessageSquare, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Program {
  name: string;
  desc: string;
}

interface SpecialProgramsProps {
  programs: Program[];
  lang: string;
}

export function SpecialPrograms({ programs, lang }: SpecialProgramsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    "/images/sp_islamic_values.png",
    "/images/sp_civic_values.png",
    "/images/sp_academic_achievement.png",
    "/images/sp_leadership_talent.png",
    "/images/sp_communication_skills.png",
    "/images/sp_science_technology.png",
  ];
  
  const icons = [BookOpen, Shield, Award, Users, MessageSquare, Cpu];

  // Helper functions for manual navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
  };

  // Auto-play effect
  useEffect(() => {
    // Clear existing timer
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    // Set new timer if not hovered
    if (!isHovered) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Auto-slide every 5 seconds
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [activeIndex, isHovered]);

  // Animate state transition (Genshin Character Fade/Slide In)
  useEffect(() => {
    if (!detailRef.current) return;

    const img = detailRef.current.querySelector(".genshin-art");
    const num = detailRef.current.querySelector(".genshin-num");
    const title = detailRef.current.querySelector(".genshin-title");
    const dialogBox = detailRef.current.querySelector(".genshin-dialog");
    const quote = detailRef.current.querySelector(".genshin-quote");

    gsap.killTweensOf([img, num, title, dialogBox, quote]);

    const tl = gsap.timeline();
    tl.to([img, num, title, dialogBox, quote], {
      opacity: 0,
      x: (i) => (i === 0 ? 30 : -30),
      y: (i) => (i === 0 ? 0 : 10),
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    }).to([img, num, title, dialogBox, quote], {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, [activeIndex]);

  const currentProgram = programs[activeIndex];
  const currentImageUrl = images[activeIndex];
  const IconComponent = icons[activeIndex] || BookOpen;
  
  const cleanName = currentProgram.name.replace(/^\d+\.\s*/, "");
  const shortTitle = cleanName.split(" (")[0];

  return (
    <div className="mt-16 md:mt-24 flex flex-col gap-6" ref={detailRef}>
      
      {/* Upper Section: Genshin Character Presentation Layout */}
      <div 
        className="relative min-h-[460px] md:min-h-[520px] rounded-[2.5rem] border border-gray-100 bg-gray-50/40 overflow-hidden p-6 md:p-12 flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Right side large graphic (Xiao Art) */}
        <div className="genshin-art absolute right-0 top-0 bottom-0 w-full md:w-3/5 h-1/2 md:h-full opacity-35 md:opacity-100 pointer-events-none z-0">
          <div className="relative w-full h-full">
            <Image
              src={currentImageUrl}
              alt={currentProgram.name}
              fill
              priority
              className="object-cover"
            />
            {/* Left fade gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/90 md:via-gray-50/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent z-10" />
          </div>
        </div>

        {/* Left Side Overlay Text Column */}
        <div className="w-full md:w-1/2 z-10 flex flex-col justify-center space-y-6">
          {/* Index & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="genshin-num font-serif text-5xl md:text-6xl font-light text-[#16a34a]/30">
                {`0${activeIndex + 1}`}
              </span>
              <div className="h-px w-16 bg-[#16a34a]/30" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Program P{activeIndex + 1}
              </span>
            </div>
            <h3 className="genshin-title font-sfpro text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-none uppercase">
              {shortTitle}
            </h3>
          </div>

          {/* Genshin Style Translucent Dialog Box */}
          <div className="genshin-dialog bg-emerald-950/90 text-white rounded-2xl p-6 border border-emerald-500/25 backdrop-blur-md shadow-2xl relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rotate-45 border border-amber-300 hidden md:block" />
            
            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium">
              {currentProgram.desc}
            </p>
          </div>

          {/* Dialogue Quote */}
          <div className="genshin-quote flex items-center gap-2 text-xs font-semibold text-emerald-800 italic">
            <IconComponent className="size-4 text-amber-500 shrink-0" />
            <span>
              {lang === "id" 
                ? "Pilar pembentukan karakter unggul SMAN Modal Bangsa." 
                : "The cornerstone of excellent character building at SMAN Modal Bangsa."}
            </span>
          </div>
        </div>



        {/* Small Dot indicators at the bottom center of the card container */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {programs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to program ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex ? "w-6 bg-[#16a34a]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
