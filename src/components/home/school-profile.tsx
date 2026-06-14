"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SchoolProfileProps {
  dict: Dictionary;
  locale: Locale;
}

export function SchoolProfile({ locale }: SchoolProfileProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Header entrance animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Bento cards entrance animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profile-sekolah"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <Container>
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto max-w-4xl text-center mb-16 sm:mb-20">
          <h2 className="font-sfpro font-bold tracking-tight text-[2.5rem] leading-[1.15] sm:text-[3.5rem] md:text-[4rem] text-zinc-900 mb-6">
            {locale === "en" ? (
              <>
                Academy for Rising <br />
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem]">
                  Pioneer Leaders
                </span>
              </>
            ) : (
              <>
                Wadah Pembinaan <br />
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem]">
                  Pemimpin Masa Depan
                </span>
              </>
            )}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
            {locale === "en" ? (
              <>
                Join us in crafting a legacy of achievement and character.{"\n"}
                This is where your journey to greatness begins.
              </>
            ) : (
              <>
                Bergabunglah bersama kami dalam mengukir prestasi dan karakter.{"\n"}
                Di sinilah perjalanan Anda menuju kegemilangan dimulai.
              </>
            )}
          </p>
        </div>

        {/* Bento/Alternate Cards Grid */}
        <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 items-stretch max-w-6xl mx-auto">
          
          {/* Card 1 (Left): Text Top, Image Bottom */}
          <div className="h-full">
            <div className="flex flex-col h-full justify-between rounded-[2rem] bg-[#f4fbf7] border border-[#e1f2e9]/65 p-8 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
              <div>
                <span className="inline-block text-xs sm:text-sm font-bold tracking-wider text-[#16a34a] uppercase mb-3">
                  {locale === "en" ? "Welcome to SMAN Modal Bangsa" : "Selamat Datang di SMAN Modal Bangsa"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sfpro tracking-tight text-zinc-950 mb-3 leading-snug">
                  {locale === "en" ? "Inspiring Minds, Shaping Futures" : "Menginspirasi Pikiran, Membentuk Masa Depan"}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-500 font-normal">
                  {locale === "en" ? (
                    "A place where young minds grow into confident, well-rounded leaders. We provide a nurturing environment that combines academic excellence with character development, ensuring success in and beyond the classroom."
                  ) : (
                    "Wadah di mana generasi muda tumbuh menjadi pemimpin berkarakter dan berintegritas tinggi. Kami menyediakan lingkungan binaan terpadu yang memadukan keunggulan akademis dengan pembinaan akhlak mulia."
                  )}
                </p>
              </div>
              <div className="relative mt-8 overflow-hidden rounded-2xl aspect-[4/3] w-full shrink-0">
                <Image
                  src="/images/academy_academic.png"
                  alt="Akademik SMAN Modal Bangsa"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 90vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Card 2 (Right): Image Top, Text Bottom */}
          <div className="h-full">
            <div className="flex flex-col h-full justify-between rounded-[2rem] bg-[#f4fbf7] border border-[#e1f2e9]/65 p-8 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative mb-8 overflow-hidden rounded-2xl aspect-[4/3] w-full shrink-0">
                <Image
                  src="/images/academy_campus.png"
                  alt="Kampus SMAN Modal Bangsa"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 90vw"
                  priority
                />
              </div>
              <div>
                <span className="inline-block text-xs sm:text-sm font-bold tracking-wider text-[#16a34a] uppercase mb-3">
                  {locale === "en" ? "Outstanding Campus & Dorm Life" : "Kampus Asri & Kehidupan Asrama"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sfpro tracking-tight text-zinc-950 mb-3 leading-snug">
                  {locale === "en" ? "A Home for Learning and Growth" : "Rumah untuk Belajar dan Berkembang"}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-500 font-normal">
                  {locale === "en" ? (
                    "Our 7-hectare green campus provides a highly conducive, peaceful environment for students to live, study, and develop their true leadership potential under 24-hour guidance."
                  ) : (
                    "Kampus hijau seluas 7 hektare kami menyediakan lingkungan yang asri, tenang, dan kondusif bagi siswa untuk menetap, belajar, dan merealisasikan potensi kepemimpinan terbaik mereka di bawah bimbingan 24 jam."
                  )}
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
