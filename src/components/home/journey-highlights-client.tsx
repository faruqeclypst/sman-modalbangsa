"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { Container } from "@/components/ui/container";

interface BeholdPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: string;
  mediaUrl: string;
  sizes: {
    small?: { mediaUrl: string };
    medium?: { mediaUrl: string };
    large?: { mediaUrl: string };
  };
  caption: string;
  prunedCaption: string;
  hashtags: string[];
}

interface JourneyHighlightsProps {
  locale: Locale;
  dict: Dictionary;
  initialNews: WPPost[];
  initialInstagram: BeholdPost[];
}

function decodeHtml(str: string) {
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8230;/g, "\u2026")
    .replace(/<[^>]*>/g, "");
}

function fmtDate(dateStr: string, locale: Locale) {
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === "id" ? "id-ID" : "en-US",
      { day: "numeric", month: "long", year: "numeric" },
    );
  } catch {
    return dateStr;
  }
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function JourneyHighlightsClient({
  locale,
  dict,
  initialNews,
  initialInstagram,
}: JourneyHighlightsProps) {
  const [activeTab, setActiveTab] = useState<"news" | "social">("social");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const socials = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9H13.4v7A10 10 0 0 0 22 12Z" />
        </svg>
      ),
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <InstagramIcon className="size-5" />,
      href: "https://instagram.com/smanmodalbangsa",
      label: "Instagram",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      ),
      href: "https://youtube.com",
      label: "YouTube",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[color:var(--background)] py-16 sm:py-24">
      {/* Background Ornaments */}
      <div className="absolute right-0 bottom-0 -z-10 h-72 w-72 translate-x-1/4 translate-y-1/4 opacity-[0.03] text-emerald-700 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="20" strokeDasharray="4 4" />
        </svg>
      </div>

      <Container>
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--foreground)]">
            <span className="font-romulo italic text-emerald-600 mr-2">
              {dict.highlights.title}
            </span>
            {dict.highlights.titleAccent}
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            {dict.highlights.subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left/Center: Carousel Section */}
          <div className="lg:col-span-9 relative flex flex-col justify-center">
            {/* Scroll Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory items-stretch"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {activeTab === "news" ? (
                // News Cards
                initialNews.length > 0 ? (
                  initialNews.map((post) => (
                    <div
                      key={post.id}
                      className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        {/* Featured Image */}
                        <div 
                          className="relative w-full overflow-hidden rounded-xl bg-gray-50 mb-4"
                          style={{ aspectRatio: "3/4" }}
                        >
                          <Image
                            src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/logo.png"}
                            alt={decodeHtml(post.title.rendered)}
                            fill
                            className="object-cover object-top transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                          <Calendar className="size-3.5" />
                          <span>{fmtDate(post.date, locale)}</span>
                        </div>
                        {/* Title */}
                        <h3 className="font-bold text-gray-900 line-clamp-2 text-sm sm:text-base hover:text-emerald-600 transition-colors">
                          <Link href={`/${locale}/berita/${post.id}`}>
                            {decodeHtml(post.title.rendered)}
                          </Link>
                        </h3>
                        {/* Excerpt */}
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3">
                          {decodeHtml(post.excerpt?.rendered || "")}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                        <Link
                          href={`/${locale}/berita/${post.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                        >
                          <span>Selengkapnya</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full py-12 text-center text-muted-foreground text-sm">
                    Belum ada berita.
                  </div>
                )
              ) : (
                // Social Media Cards (Instagram)
                initialInstagram.length > 0 ? (
                  initialInstagram.map((post) => {
                    const imgUrl =
                      post.sizes?.medium?.mediaUrl ??
                      post.sizes?.small?.mediaUrl ??
                      post.mediaUrl;

                    const captionLines = (post.caption || "").split("\n").filter(Boolean);
                    const rawTitle = captionLines[0] || "Postingan Instagram";
                    const displayTitle = rawTitle.length > 65 ? rawTitle.slice(0, 65) + "..." : rawTitle;
                    
                    const remainingText = captionLines.slice(1).join(" ") || post.prunedCaption || "";
                    const displayExcerpt = remainingText.length > 110 ? remainingText.slice(0, 110) + "..." : remainingText;

                    return (
                      <div
                        key={post.id}
                        className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
                      >
                        <div>
                          {/* Image (aspect-[4/3]) */}
                          <div 
                            className="relative w-full overflow-hidden rounded-xl bg-gray-50 mb-4"
                            style={{ aspectRatio: "3/4" }}
                          >
                            <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="relative block w-full h-full">
                              <Image
                                src={imgUrl}
                                alt="Instagram post"
                                fill
                                unoptimized
                                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                              />
                            </a>
                          </div>
                          {/* Date and Social Icon */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="size-3.5" />
                              <span>{fmtDate(post.timestamp, locale)}</span>
                            </div>
                            <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white">
                              <InstagramIcon className="size-3" />
                            </span>
                          </div>
                          {/* Title */}
                          <h3 className="font-bold text-gray-900 line-clamp-2 text-sm sm:text-base hover:text-emerald-600 transition-colors">
                            <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                              {displayTitle}
                            </a>
                          </h3>
                          {/* Excerpt */}
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3">
                            {displayExcerpt || post.caption || ""}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                          <a
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                          >
                            <span>{locale === "id" ? "Buka di Instagram" : "Open on Instagram"}</span>
                            <ArrowRight className="size-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full py-12 text-center text-muted-foreground text-sm">
                    Belum ada postingan media sosial.
                  </div>
                )
              )}
            </div>

            {/* Scroll Arrow Button */}
            <button
              onClick={scrollNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 flex size-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg border border-gray-100 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll next"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Right: Sidebar Control Card */}
          <div className="lg:col-span-3 flex">
            <div className="w-full rounded-2xl bg-[color:var(--primary)] p-6 text-white flex flex-col justify-between shadow-xl min-h-[320px]">
              {/* Switcher pills */}
              <div className="space-y-4">
                <div className="flex flex-col gap-2.5 rounded-xl bg-white/10 p-1.5 backdrop-blur-sm">
                  <button
                    onClick={() => setActiveTab("news")}
                    className={`w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all ${
                      activeTab === "news"
                        ? "bg-white text-[color:var(--primary)] shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {dict.highlights.news}
                  </button>
                  <button
                    onClick={() => setActiveTab("social")}
                    className={`w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all ${
                      activeTab === "social"
                        ? "bg-white text-[color:var(--primary)] shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {dict.highlights.socialMedia}
                  </button>
                </div>
              </div>

              {/* Bottom: Follow Us */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
                  {dict.highlights.followUs}
                </p>
                <div className="flex items-center gap-3">
                  {socials.map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all hover:bg-white hover:text-[color:var(--primary)] hover:scale-110"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
