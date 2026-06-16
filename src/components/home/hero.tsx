"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { HeroContent } from "@/components/home/hero-content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;


// Register ScrollTrigger on client only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollContainerRef.current || !videoContainerRef.current || !contentContainerRef.current) return;

      // Parallax zoom-in and scroll shift for the video background
      gsap.to(videoContainerRef.current, {
        scale: 1.15,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out and float up for the content
      gsap.to(contentContainerRef.current, {
        opacity: 0,
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative w-full h-screen bg-zinc-950 z-0">
      <div ref={heroRef} className="w-full overflow-hidden sticky top-0 h-screen">
        <section
          className="relative flex h-screen w-full items-center justify-center overflow-hidden text-white"
          aria-labelledby="hero-title"
          id="hero"
        >
          {/* Background Video playing in loop, muted, playsInline */}
          <div
            ref={videoContainerRef}
            className="absolute inset-0 h-full w-full overflow-hidden origin-center z-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/bg-video.mp4" type="video/mp4" />
              {/* Fallback image */}
              <img
                src="/bg.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              />
            </video>

            {/* Cinematic overlay */}
            <div aria-hidden className="absolute inset-0 bg-black/55" />
          </div>

          {/* Content — Centered */}
          <div ref={contentContainerRef} className="relative z-10 w-full">
            <Container className="py-24 sm:py-32">
              <HeroContent locale={locale} dict={dict} />
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
}

