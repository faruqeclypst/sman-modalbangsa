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
  { text: "Ready", italic: false },
  { text: "to", italic: false },
  { text: "Learn,", italic: true },
  { text: "Ready", italic: false },
  { text: "to", italic: false },
  { text: "Succeed,", italic: true },
  { text: "Prepared", italic: false },
  { text: "to", italic: false },
  { text: "Lead", italic: false },
  { text: "the", italic: false },
  { text: "Future", italic: true },
  { text: "with", italic: false },
  { text: "Confidence,", italic: true },
  { text: "Dedication,", italic: true },
  { text: "and", italic: false },
  { text: "Integrity.", italic: true }
];

const indonesianWords: Word[] = [
  { text: "Siap", italic: false },
  { text: "untuk", italic: false },
  { text: "Belajar,", italic: true },
  { text: "Siap", italic: false },
  { text: "untuk", italic: false },
  { text: "Sukses,", italic: true },
  { text: "Bersiap", italic: false },
  { text: "Memimpin", italic: false },
  { text: "Masa Depan", italic: true },
  { text: "dengan", italic: false },
  { text: "Keyakinan,", italic: true },
  { text: "Dedikasi,", italic: true },
  { text: "dan", italic: false },
  { text: "Integritas.", italic: true }
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
              className={`intro-word opacity-20 inline-block mr-[0.25em] transition-opacity duration-300 ${
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
