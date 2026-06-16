"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroContentProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroContent({ locale, dict }: HeroContentProps) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <p
        data-hero-kicker
        className="text-sm font-sfpro font-medium tracking-wide text-white/85 sm:text-base md:text-lg lg:text-xl mb-6"
      >
        {dict.hero.welcome}
      </p>
      <h1
        id="hero-title"
        data-hero-title
        className="text-[2rem] font-sfpro font-bold tracking-tight text-white sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] leading-[1.15] whitespace-pre-line"
      >
        {dict.hero.titleLine1}
        <br className="hidden sm:inline" />
        <span className="text-green-400 font-romulo font-normal normal-case text-[2.25rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.75rem] inline-block px-2 italic">
          {dict.hero.titleAccent}
        </span>{" "}
        {dict.hero.titleLine2}
      </h1>

      {/* ===== SEMENTARA: INFO PENDIDIKAN JARAK JAUH — hapus blok ini jika tidak diperlukan ===== */}
      <a
        href={`/${locale}/spmb`}
        className="mt-8 group inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:bg-emerald-400/20 hover:border-emerald-400/60 hover:scale-105 active:scale-95"
      >
        <span className="relative flex size-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-sm font-medium text-emerald-200">
          INFO SPMB-PJJ
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
      {/* ===== AKHIR: INFO PENDIDIKAN JARAK JAUH ===== */}

    </div>
  );
}
