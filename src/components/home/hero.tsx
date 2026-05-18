import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  /** Optional slot for streaming gallery slider (rendered via Suspense) */
  children?: React.ReactNode;
}

export function Hero({ locale, dict, children }: HeroProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden text-white"
      aria-labelledby="hero-title"
    >
      {/* Default static background — always loads instantly */}
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover blur-[2px]"
        aria-hidden
      />

      {/* Gallery slider streams in on top when ready */}
      {children}

      {/* Flat overlay */}
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      {/* Content — centered on mobile, left on desktop */}
      <Container className="relative z-10 py-24 sm:py-32">
        <div className="max-w-xl text-center sm:text-left">
          <h1
            id="hero-title"
            className="whitespace-pre-line text-[2rem] font-bold leading-[1.2] sm:text-[2.5rem] md:text-[3rem]"
          >
            {dict.hero.title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            {dict.hero.subtitle}
          </p>

          {/* Search bar — glassmorphism transparent */}
          <form
            action={`/${locale}/berita`}
            method="get"
            role="search"
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
            <p className="text-xs text-white/60 sm:text-sm">
              {dict.hero.popularTitle}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              {dict.hero.popularLinks.map(
                (link: { label: string; href: string }) => (
                  <Link
                    key={link.label}
                    href={link.href}
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
      </Container>
    </section>
  );
}
