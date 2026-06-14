"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import type { Locale } from "@/i18n/config";

interface OnboardingSplashProps {
  locale: Locale;
}

export function OnboardingSplash({ locale }: OnboardingSplashProps) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isHome) return;

    // Prevent scrolling while onboarding is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }
      });

      // Slide overlay up out of view (2.0s - 2.5s)
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut"
      }, 2.0);

    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-zinc-900 select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
        {/* Brand Logo & Name */}
        <div
          ref={logoRef}
          className="flex items-center gap-4 mb-6 animate-logo-entrance"
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
          className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-sfpro mt-2 leading-normal animate-tagline-entrance"
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
