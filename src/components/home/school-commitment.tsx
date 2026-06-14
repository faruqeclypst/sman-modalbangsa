"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ValueCard {
  titleId: string;
  titleEn: string;
  image: string;
}

const valueCards: ValueCard[] = [
  {
    titleId: "Pembinaan Imtaq & Karakter",
    titleEn: "Spiritual & Character Development",
    image: "/images/value_imtaq.png"
  },
  {
    titleId: "Iptek & Budaya Prestasi",
    titleEn: "Academic & Achievement Excellence",
    image: "/images/value_science.png"
  },
  {
    titleId: "Kepemimpinan & Wawasan Global",
    titleEn: "Leadership & Global Vision",
    image: "/images/value_upacara.png"
  }
];

interface SchoolCommitmentProps {
  dict: Dictionary;
  locale: Locale;
}

export function SchoolCommitment({ locale }: SchoolCommitmentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // Only initialize GSAP on mobile viewports (< 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

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

      if (cardsRef.current) {
        const cards = cardsRef.current;
        const totalWidth = cards.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDist = totalWidth - viewportWidth + 32;

        gsap.to(cards, {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.5,
            start: "top 15%",
            end: () => `+=${scrollDist * 1.5}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="komitmen-sekolah"
      className="relative overflow-hidden bg-transparent py-24 sm:py-32"
    >
      <Container>
        {/* Header Block */}
        <div ref={headerRef} className="mx-auto max-w-4xl text-center mb-16 sm:mb-20">
          <h2 className="font-sfpro font-bold tracking-tight text-[2.5rem] leading-[1.15] sm:text-[3.5rem] md:text-[4rem] text-zinc-900 mb-6">
            {locale === "en" ? (
              <>
                Our Commitment <br />
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem]">
                  to Excellence
                </span>
              </>
            ) : (
              <>
                Komitmen Kami <br />
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem]">
                  Untuk Keunggulan
                </span>
              </>
            )}
          </h2>
          <p className="mx-auto max-w-3xl text-gray-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {locale === "en" ? (
              "At SMAN Modal Bangsa, our core values guide every aspect of our mission, creating a foundation for a transformative educational experience."
            ) : (
              "Di SMAN Modal Bangsa, nilai-nilai utama kami memandu setiap aspek misi kami, menciptakan landasan bagi pengalaman pendidikan yang transformatif."
            )}
          </p>
        </div>
        {/* 3-Column Image Cards Grid - Sliding on mobile with GSAP, Grid on desktop */}
        <div 
          ref={cardsRef} 
          className="flex md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 md:gap-6 will-change-transform select-none"
        >
          {valueCards.map((card, idx) => (
            <div
              key={idx}
              className="aspect-[4/5] w-[280px] sm:w-[320px] md:w-full shrink-0 snap-start md:shrink md:snap-none"
            >
              <div
                className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2rem] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Card Background Image */}
                <Image
                  src={card.image}
                  alt={locale === "en" ? card.titleEn : card.titleId}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 90vw"
                  priority
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Card Label Overlay */}
                <div className="relative z-10 p-8 text-center">
                  <h3 className="font-sfpro font-bold text-white text-lg sm:text-xl md:text-2xl leading-tight">
                    {locale === "en" ? card.titleEn : card.titleId}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
