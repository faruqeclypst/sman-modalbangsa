"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryItem {
  name: string;
  roleId: string;
  roleEn: string;
  videoSrc: string;
}

const stories: StoryItem[] = [
  {
    name: "Arabel Eltara G. P. T.",
    roleId: "Siswa SMAN Modal Bangsa",
    roleEn: "SMAN Modal Bangsa Student",
    videoSrc: "/video/Welcome To SMA Unggulan Rushd_2.mp4"
  },
  {
    name: "Nayla Nisa Pamuji",
    roleId: "Siswa SMAN Modal Bangsa",
    roleEn: "SMAN Modal Bangsa Student",
    videoSrc: "/video/Welcome To SMA Unggulan Rushd.mp4"
  },
  {
    name: "I Putu Ananda Khrisna P.",
    roleId: "Siswa SMAN Modal Bangsa",
    roleEn: "SMAN Modal Bangsa Student",
    videoSrc: "/video/Welcome To SMA Unggulan Rushd_3.mp4"
  },
  {
    name: "Rashka Khalqilah Nugraha",
    roleId: "Siswa SMAN Modal Bangsa",
    roleEn: "SMAN Modal Bangsa Student",
    videoSrc: "/video/Welcome To SMA Unggulan Rushd_4.mp4"
  }
];

interface StudentStoriesProps {
  locale: Locale;
}

function StoryCard({ item, locale }: { item: StoryItem; locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Enable sound on hover
      videoRef.current.play().catch((err) => {
        console.log("Audio play blocked, falling back to muted playback:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch((e) => console.log("Muted fallback play failed:", e));
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true; // Restore muted state
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex aspect-[3/4.5] w-[280px] sm:w-[320px] lg:w-full shrink-0 snap-start lg:shrink lg:snap-none flex-col justify-end overflow-hidden bg-zinc-950 cursor-pointer lg:border-r lg:border-white/5 lg:last:border-r-0 rounded-[2rem] lg:rounded-none"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={item.videoSrc}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Glassmorphic Play Overlay Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
        <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 ml-0.5"
          >
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Brand-aligned Green Tint & Gradient Overlay - Fades out on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-emerald-950/10 transition-opacity duration-500 group-hover:opacity-0 z-10 pointer-events-none" />

      {/* Card Label Overlay */}
      <div className="relative z-20 p-8 text-center transition-all duration-300 group-hover:translate-y-[-4px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
        <h3 className="font-sfpro font-bold text-white text-lg sm:text-xl md:text-2xl leading-tight mb-2">
          {item.name}
        </h3>
        <p className="text-white/80 font-medium text-xs sm:text-sm tracking-wide">
          {locale === "en" ? item.roleEn : item.roleId}
        </p>
      </div>
    </div>
  );
}

export function StudentStories({ locale }: StudentStoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards entrance animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cerita-siswa"
      className="relative overflow-hidden bg-transparent py-24 sm:py-32"
    >
      <Container>
        {/* Header Block */}
        <div ref={headerRef} className="mx-auto max-w-4xl text-center mb-16 sm:mb-20">
          <h2 className="font-sfpro font-bold tracking-tight text-[2.5rem] leading-[1.15] sm:text-[3.5rem] md:text-[4rem] text-zinc-900 mb-6">
            {locale === "en" ? (
              <>
                Our <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Legacy</span>, <br className="sm:hidden" />
                Their <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Words</span>
              </>
            ) : (
              <>
                Warisan <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Kami</span>, <br className="sm:hidden" />
                Kata <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Mereka</span>
              </>
            )}
          </h2>
          <p className="mx-auto max-w-3xl text-gray-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {locale === "en" ? (
              "Hear from our students and teachers as they share transformative experiences, highlighting our supportive environment and commitment to excellence."
            ) : (
              "Dengarkan cerita dari siswa dan guru kami saat mereka berbagi pengalaman transformatif, menyoroti lingkungan yang mendukung dan komitmen terhadap keunggulan."
            )}
          </p>
        </div>
      </Container>

      {/* 4-Column Image/Video Cards Panel - Swipeable on mobile, Grid on desktop */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
        <div
          ref={cardsRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-0 lg:pb-0 lg:overflow-hidden lg:rounded-[2.5rem] lg:shadow-lg lg:border lg:border-black/5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((item, idx) => (
            <StoryCard key={idx} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
