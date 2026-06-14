"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Locale } from "@/i18n/config";

interface OnboardingSplashProps {
  locale: Locale;
}

export function OnboardingSplash({ locale }: OnboardingSplashProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    // Prevent scrolling while onboarding is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      if (!containerRef.current || !logoRef.current || !taglineRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("onboarding-active");
          document.body.style.overflow = "";
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }
      });

      // Initial state
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(taglineRef.current, { y: 20, opacity: 0 });

      // 1. Logo entrance: small -> large -> normal (0.0s - 0.7s)
      tl.to(logoRef.current, {
        scale: 1.1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
      .to(logoRef.current, {
        scale: 1.0,
        duration: 0.2,
        ease: "power2.out"
      });

      // 2. Tagline slide up and fade in (0.4s - 0.9s)
      tl.to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      }, 0.4);

      // 3. Logo second breathing pulse (1.2s - 1.6s)
      tl.to(logoRef.current, {
        scale: 1.06,
        duration: 0.2,
        ease: "power1.inOut"
      }, 1.2)
      .to(logoRef.current, {
        scale: 1.0,
        duration: 0.2,
        ease: "power1.inOut"
      });

      // 4. Slide overlay up out of view (2.0s - 2.5s)
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut"
      }, 2.0);

    }, containerRef);

    return () => {
      document.documentElement.classList.remove("onboarding-active");
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-zinc-900 select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
        {/* Brand Logo & Name */}
        <div
          ref={logoRef}
          className="flex items-center gap-4 mb-6"
          style={{ opacity: 0, transform: "scale(0.5)" }}
        >
          <span className="relative inline-flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl">
            <Image
              src="/logo.png"
              alt="Logo SMAN Modal Bangsa"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </span>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-2xl font-bold text-[#14532d]">
              SMAN Modal Bangsa
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
              Sekolah Unggul Berasrama
            </span>
          </div>
        </div>

        {/* Dynamic Tagline (fades in) */}
        <h1
          ref={taglineRef}
          className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-sfpro mt-2 leading-normal"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {locale === "en" ? (
            <>
              Nurturing Well-rounded{" "}
              <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                Leaders
              </span>{" "}
              Today
            </>
          ) : (
            <>
              Membentuk Pemimpin{" "}
              <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                Masa Depan
              </span>{" "}
              Hari Ini
            </>
          )}
        </h1>
      </div>
    </div>
  );
}
