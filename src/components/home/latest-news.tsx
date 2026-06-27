"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

export interface BeholdPost {
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

interface LatestNewsProps {
  posts: WPPost[];
  instagramPosts: BeholdPost[];
  locale: Locale;
  dict: Dictionary;
}

export function LatestNews({
  posts,
  instagramPosts = [],
  locale,
  dict,
}: LatestNewsProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = React.useState<"news" | "social">("news");

  // Take the first 3 posts for the news columns
  const displayPosts = posts.slice(0, 3);

  // Scroll-triggered entrance using GSAP
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

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
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="relative overflow-hidden bg-transparent py-24 sm:py-32"
    >
      <Container>
        {/* Header Block */}
        <div ref={headerRef} className="mx-auto max-w-4xl text-center mb-16 sm:mb-20">
          <h2 className="font-sfpro font-bold tracking-tight text-[2.5rem] leading-[1.15] sm:text-[3.5rem] md:text-[4rem] text-zinc-900 mb-6">
            {locale === "en" ? (
              <>
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Highlights</span> <br className="sm:hidden" />
                from Our Journey
              </>
            ) : (
              <>
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Sorotan</span> <br className="sm:hidden" />
                Perjalanan Kami
              </>
            )}
          </h2>
          <p className="mx-auto max-w-3xl text-gray-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {locale === "en"
              ? "Stay updated with the latest news and stories from SMAN Modal Bangsa."
              : "Tetap terupdate dengan berita dan cerita terbaru dari SMAN Modal Bangsa."}
          </p>
        </div>

        {/* 4-Column Grid Layout */}
        <div className="relative w-full">
          {/* Overlapping Next Button linking to main news page */}
          <Link
            href={`/${locale}/berita`}
            className="absolute top-1/2 right-1/4 z-20 hidden lg:flex size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-[#16a34a] shadow-lg border border-zinc-100 hover:scale-110 active:scale-95 transition-transform"
            aria-label="Lihat Semua Berita"
          >
            <ChevronRight className="size-6 stroke-[2.5]" />
          </Link>

          <div
            ref={cardsRef}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
          >
            {activeTab === "news" ? (
              displayPosts.length > 0 ? (
                displayPosts.map((post) => {
                  const title = decodeHtml(post.title.rendered);
                  const excerpt = decodeHtml(post.excerpt?.rendered || "");
                  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
                  const href = `/${locale}/berita/${post.slug}`;

                  return (
                    <div key={post.id} className="h-full">
                      <Link
                        href={href}
                        className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
                      >
                        <div>
                          {/* Image Container */}
                          <div className="relative aspect-[16/10.5] w-full overflow-hidden rounded-[1.5rem] bg-zinc-100 mb-6">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                sizes="(min-width: 1024px) 20vw, 45vw"
                                className="object-cover transition-transform duration-750 ease-out group-hover:scale-103"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-emerald-800">
                                Mosa
                              </div>
                            )}
                            {/* Spotlight Tag */}
                            <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-zinc-900 shadow-sm border border-zinc-100/50">
                              {locale === "en" ? "Mosa Spotlight" : "Info Sekolah"}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-sfpro font-bold text-zinc-900 text-base sm:text-lg leading-snug mb-3 group-hover:text-[#16a34a] transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                            {title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem] sm:min-h-[4.5rem]">
                            {excerpt}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                // News empty state placeholders
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={`news-placeholder-${idx}`} className="h-full opacity-60">
                    <div className="flex h-full flex-col justify-center items-center overflow-hidden rounded-[2rem] border border-dashed border-zinc-200 bg-zinc-50/50 p-6 text-center min-h-[350px]">
                      <div className="space-y-3">
                        <div className="mx-auto size-12 rounded-full bg-zinc-100 flex items-center justify-center text-lg">
                          📭
                        </div>
                        <p className="text-sm font-semibold text-zinc-500">
                          {locale === "en" ? "No news posts found" : "Belum ada berita terbaru"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              instagramPosts.length > 0 ? (
                instagramPosts.slice(0, 3).map((post) => {
                  const imgUrl = post.sizes?.medium?.mediaUrl ?? post.sizes?.small?.mediaUrl ?? post.mediaUrl;
                  const captionLines = (post.caption || "").split("\n").filter(Boolean);
                  const rawTitle = captionLines[0] || "Postingan Instagram";
                  const displayTitle = rawTitle.length > 65 ? rawTitle.slice(0, 65) + "..." : rawTitle;
                  const remainingText = captionLines.slice(1).join(" ") || post.prunedCaption || "";
                  const displayExcerpt = remainingText.length > 110 ? remainingText.slice(0, 110) + "..." : remainingText;

                  return (
                    <div key={post.id} className="h-full">
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
                      >
                        <div>
                          {/* Image Container */}
                          <div className="relative aspect-[16/10.5] w-full overflow-hidden rounded-[1.5rem] bg-zinc-100 mb-6">
                            <Image
                              src={imgUrl}
                              alt="Instagram post"
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-750 ease-out group-hover:scale-103"
                            />
                            <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-zinc-900 shadow-sm border border-zinc-100/50">
                              Instagram
                            </span>
                          </div>

                          {/* Date */}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                            <Calendar className="size-3.5" />
                            <span>{fmtDate(post.timestamp, locale)}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-sfpro font-bold text-zinc-900 text-base sm:text-lg leading-snug mb-3 group-hover:text-[#16a34a] transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                            {displayTitle}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem] sm:min-h-[4.5rem]">
                            {displayExcerpt}
                          </p>
                        </div>
                      </a>
                    </div>
                  );
                })
              ) : (
                // Instagram empty state placeholders
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={`ig-placeholder-${idx}`} className="h-full opacity-60">
                    <div className="flex h-full flex-col justify-center items-center overflow-hidden rounded-[2rem] border border-dashed border-zinc-200 bg-zinc-50/50 p-6 text-center min-h-[350px]">
                      <div className="space-y-3">
                        <div className="mx-auto size-12 rounded-full bg-zinc-100 flex items-center justify-center text-lg">
                          📸
                        </div>
                        <p className="text-sm font-semibold text-zinc-500">
                          {locale === "en" ? "Feed unavailable" : "Feed tidak tersedia"}
                        </p>
                        <p className="text-xs text-zinc-400 px-4 leading-relaxed">
                          {locale === "en"
                            ? "Visit our Instagram profile directly using the link on the right."
                            : "Kunjungi profil Instagram kami secara langsung melalui tautan di samping."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}

            {/* Solid Brand Green Card (Column 4) */}
            <div className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[2rem] bg-[#166534] p-8 text-white shadow-sm">
                <div>
                  {/* Switcher Tab Group */}
                  <div className="flex bg-white/10 p-1 rounded-full border border-white/5 w-full mb-8">
                    <button
                      onClick={() => setActiveTab("news")}
                      className={`flex-1 py-2.5 rounded-full text-xs font-bold text-center transition-all ${
                        activeTab === "news"
                          ? "bg-white text-[#166534] shadow-sm cursor-pointer"
                          : "text-white/95 hover:bg-white/5 cursor-pointer"
                      }`}
                    >
                      {locale === "en" ? "News" : "Berita"}
                    </button>
                    <button
                      onClick={() => setActiveTab("social")}
                      className={`flex-1 py-2.5 rounded-full text-xs font-bold text-center transition-all ${
                        activeTab === "social"
                          ? "bg-white text-[#166534] shadow-sm cursor-pointer"
                          : "text-white/95 hover:bg-white/5 cursor-pointer"
                      }`}
                    >
                      {locale === "en" ? "Social Media" : "Media Sosial"}
                    </button>
                  </div>

                  {/* Switcher Text Callout */}
                  <h3 className="font-sfpro font-bold text-2xl sm:text-3xl leading-tight mb-4 mt-2">
                    {locale === "en" ? "Follow our Social Media" : "Ikuti Media Sosial Kami"}
                  </h3>
                </div>

                {/* Social Icons Footer */}
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com/smanmodalbangsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 active:scale-95 transition-all"
                    aria-label="Facebook SMAN Modal Bangsa"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/sman_modal_bangsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 active:scale-95 transition-all"
                    aria-label="Instagram SMAN Modal Bangsa"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/c/SMANModalBangsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 active:scale-95 transition-all"
                    aria-label="YouTube SMAN Modal Bangsa"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
