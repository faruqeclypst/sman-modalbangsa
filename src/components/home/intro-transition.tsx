"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n/config";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Register ScrollTrigger on client only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


interface Word {
  text: string;
  italic: boolean;
}

const englishWords: Word[] = [
  { text: "Let's", italic: false },
  { text: "create", italic: false },
  { text: "your", italic: false },
  { text: "Journey", italic: true },
  { text: "and", italic: false },
  { text: "discover", italic: false },
  { text: "your", italic: false },
  { text: "Story,", italic: true },
  { text: "an", italic: false },
  { text: "Extraordinary", italic: true },
  { text: "path", italic: false },
  { text: "to", italic: false },
  { text: "your", italic: false },
  { text: "Brightest", italic: true },
  { text: "Future.", italic: true }
];

const indonesianWords: Word[] = [
  { text: "Mari", italic: false },
  { text: "ciptakan", italic: false },
  { text: "Perjalanan", italic: true },
  { text: "Anda", italic: false },
  { text: "dan", italic: false },
  { text: "temukan", italic: false },
  { text: "Kisah", italic: true },
  { text: "Anda,", italic: false },
  { text: "sebuah", italic: false },
  { text: "jalan", italic: false },
  { text: "Luar Biasa", italic: true },
  { text: "menuju", italic: false },
  { text: "Masa Depan", italic: true },
  { text: "yang", italic: false },
  { text: "gemilang.", italic: false }
];

interface IntroTransitionProps {
  locale: Locale;
}

export function IntroTransition({ locale }: IntroTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const words = locale === "en" ? englishWords : indonesianWords;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !sectionRef.current) return;
      const spans = textRef.current.querySelectorAll(".intro-word");

      gsap.to(spans, {
        opacity: 1,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <div
      ref={sectionRef}
      className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#166534] text-white py-32 md:py-48"
    >
      <Container className="relative z-10 max-w-6xl px-6">
        <h2
          ref={textRef}
          className="mx-auto text-center font-sfpro font-bold tracking-tight text-[2.25rem] leading-[1.3] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.5rem] select-none"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className={`intro-word opacity-20 inline-block mr-[0.25em] ${
                word.italic
                  ? "font-romulo font-normal italic text-green-300 normal-case"
                  : ""
              }`}
            >
              {word.text}
            </span>
          ))}
        </h2>
      </Container>
    </div>
  );
}
