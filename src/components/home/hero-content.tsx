"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import { animate, stagger } from "animejs";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroContentProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroContent({ locale, dict }: HeroContentProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const title = el.querySelector("[data-hero-title]") as HTMLElement;
    const subtitle = el.querySelector("[data-hero-subtitle]") as HTMLElement;
    const searchBar = el.querySelector("[data-hero-search]") as HTMLElement;
    const popularLabel = el.querySelector("[data-hero-popular]") as HTMLElement;
    const links = el.querySelectorAll("[data-hero-link]");

    // Set initial hidden state
    [title, subtitle, searchBar, popularLabel].forEach((t) => {
      if (t) {
        t.style.opacity = "0";
        t.style.transform = "translateY(40px)";
      }
    });
    links.forEach((t) => {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = "translateY(20px) scale(0.8)";
    });

    // Title — dramatic entrance with slight blur clear
    animate(title, {
      opacity: [0, 1],
      translateY: [60, 0],
      duration: 1000,
      ease: "outExpo",
      delay: 200,
    });

    // Subtitle — slide up
    animate(subtitle, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      ease: "outQuint",
      delay: 500,
    });

    // Search bar — slide up with slight scale
    animate(searchBar, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      ease: "outQuint",
      delay: 750,
    });

    // Popular label
    animate(popularLabel, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: "outQuint",
      delay: 950,
    });

    // Popular links — stagger pop-in
    animate(links, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.8, 1],
      delay: stagger(80, { start: 1100 }),
      duration: 500,
      ease: "outBack",
    });
  }, []);

  return (
    <div ref={containerRef} className="max-w-xl text-center sm:text-left">
      <h1
        id="hero-title"
        data-hero-title
        className="whitespace-pre-line text-[2rem] font-bold leading-[1.2] sm:text-[2.5rem] md:text-[3rem]"
      >
        {dict.hero.title}
      </h1>
      <p
        data-hero-subtitle
        className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
      >
        {dict.hero.subtitle}
      </p>

      {/* Search bar — glassmorphism transparent */}
      <form
        action={`/${locale}/berita`}
        method="get"
        role="search"
        data-hero-search
        className="mx-auto mt-8 flex w-full max-w-md items-center rounded-lg border border-white/25 bg-white/15 shadow-lg backdrop-blur-md focus-within:border-white/40 focus-within:bg-white/20 sm:mx-0"
      >
        <label htmlFor="hero-search" className="sr-only">
          {dict.common.search}
        </label>
        <Search
          className="ml-4 size-4 shrink-0 text-white/70"
          aria-hidden
        />
        <input
          id="hero-search"
          type="search"
          name="q"
          placeholder={dict.hero.searchPlaceholder}
          className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          className="m-1 inline-flex shrink-0 items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          {dict.hero.searchButton}
        </button>
      </form>

      {/* Popular links */}
      <div className="mt-5">
        <p
          data-hero-popular
          className="text-xs text-white/60 sm:text-sm"
        >
          {dict.hero.popularTitle}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
          {dict.hero.popularLinks.map(
            (link: { label: string; href: string }) => (
              <Link
                key={link.label}
                href={link.href}
                data-hero-link
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:text-sm"
              >
                {link.label}
                <ExternalLink className="size-3" aria-hidden />
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
