"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StudentAchievementsProps {
  locale: Locale;
  dict: Dictionary;
}

interface AchievementItem {
  medal: string;
  competition: string;
  name: string;
  level: "internasional" | "nasional" | "provinsi" | "kabupaten";
  colorClass: string;
}

const achievementsData: AchievementItem[] = [
  {
    medal: "Gold Medal",
    competition: "World Young Inventors Exhibition (WYIE) Malaysia 2026",
    name: "NAYYARA ASH SHAFA, REZKIKA GIZA, QAFKA NAFISA, NADIATUL YUSRA, NAJLA ASHEILA, SHARLIZA TALITA, KHANSA ILLONA",
    level: "internasional",
    colorClass: "text-emerald-600 bg-emerald-50",
  },
  {
    medal: "Gold Medal",
    competition: "World Young Inventors Exhibition (WYIE) Malaysia 2026",
    name: "FAYRUZ CHALISA IRAWAN, MUHAMMAD FAWWAZ AL ZAIDAN, REKHA VISTA, SITI ENDAH DINARA, TAHTA ZILLI ARSYIKA, MUHAMMAD NAFIS YUSFA, ZALFA ZAHIYA",
    level: "internasional",
    colorClass: "text-amber-600 bg-amber-50",
  },
  {
    medal: "14th World Rank",
    competition: "World Young Mathematicians Olympiad (WYMO) 2025",
    name: "FAYRUZ CHALISA IRAWAN",
    level: "internasional",
    colorClass: "text-blue-600 bg-blue-50",
  },
  {
    medal: "Paskibraka Nasional",
    competition: "Komandan Upacara Hari Lahir Pancasila Tingkat Nasional 2026",
    name: "MUHAMMAD RIDHO",
    level: "nasional",
    colorClass: "text-rose-600 bg-rose-50",
  },
  {
    medal: "Garuda Awardee",
    competition: "Penerima Beasiswa Indonesia Maju (BIM) Angkatan IV 2025",
    name: "SAFRIL ILMI RAMADHAN",
    level: "nasional",
    colorClass: "text-teal-600 bg-teal-50",
  },
  {
    medal: "Paskibraka Nasional",
    competition: "Paskibraka Pengibar Bendera Pusaka Pertama di IKN 2024",
    name: "DZAWATA MAGHFURA Z.",
    level: "nasional",
    colorClass: "text-emerald-600 bg-emerald-50",
  },
  {
    medal: "Silver Medal",
    competition: "Olimpiade Sains Nasional (OSN) Fisika 2025",
    name: "DZAKWAN DHIYA R.",
    level: "nasional",
    colorClass: "text-blue-600 bg-blue-50",
  },
  {
    medal: "1st Winner",
    competition: "Lomba Video Reels Edukatif ANANDA BERSINAR Provinsi Aceh 2026",
    name: "JIHAN ASYIFA",
    level: "provinsi",
    colorClass: "text-teal-600 bg-teal-50",
  },
  {
    medal: "1st Winner",
    competition: "O2SN Renang Putra Kabupaten Aceh Besar 2026",
    name: "AFRAN AMAR MA'ARIF",
    level: "kabupaten",
    colorClass: "text-blue-600 bg-blue-50",
  },
  {
    medal: "1st Winner",
    competition: "O2SN Renang Putri Kabupaten Aceh Besar 2026",
    name: "INTAN SHARAH JAZILLA",
    level: "kabupaten",
    colorClass: "text-emerald-600 bg-emerald-50",
  },
  {
    medal: "Best Speaker",
    competition: "National Schools Debating Championship (NSDC) Aceh Besar 2026",
    name: "CUT FANAYA GEBRINA",
    level: "kabupaten",
    colorClass: "text-purple-600 bg-purple-50",
  },
  {
    medal: "Best Speaker",
    competition: "National Schools Debating Championship (NSDC) Aceh Besar 2026",
    name: "RATU FAIZURA ADNI",
    level: "kabupaten",
    colorClass: "text-rose-600 bg-rose-50",
  },
  {
    medal: "2nd Winner",
    competition: "O2SN Pencak Silat Putra Kabupaten Aceh Besar 2026",
    name: "ARIZKY PUTRA PRATAMA",
    level: "kabupaten",
    colorClass: "text-amber-600 bg-amber-50",
  },
  {
    medal: "2nd Winner",
    competition: "O2SN Bulutangkis Putra Kabupaten Aceh Besar 2026",
    name: "M. FANDHIRA ADYHAKA",
    level: "kabupaten",
    colorClass: "text-blue-600 bg-blue-50",
  },
  {
    medal: "2nd Winner",
    competition: "O2SN Panjat Tebing Putra Kabupaten Aceh Besar 2026",
    name: "M. MUNTAZAR",
    level: "kabupaten",
    colorClass: "text-purple-600 bg-purple-50",
  },
];

const ITEM_HEIGHT = 130; // height of each list row on desktop in pixels

export function StudentAchievements({ locale, dict }: StudentAchievementsProps) {
  const ach = dict.homeAchievements;
  const isId = locale === "id";

  const [activeFilter, setActiveFilter] = React.useState<string>("semua");
  const [isDesktop, setIsDesktop] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const filteredItems = React.useMemo(() => {
    return achievementsData.filter((item) => {
      return activeFilter === "semua" || item.level === activeFilter;
    });
  }, [activeFilter]);

  React.useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  // GSAP Vertical translation ScrollTrigger
  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current || !listRef.current) return;

    // Reset list position first in case layout changes
    gsap.set(listRef.current, { y: 0 });

    const containerHeight = isDesktop ? 4 * ITEM_HEIGHT : 360;
    const scrollableDistance = listRef.current.scrollHeight - containerHeight;
    // We only pin & scroll if the content is taller than the container
    if (scrollableDistance <= 0) return;

    const ctx = gsap.context(() => {
      gsap.to(listRef.current, {
        y: -scrollableDistance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${scrollableDistance * 1.5}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [filteredItems, isDesktop]);

  return (
    <section
      ref={wrapperRef}
      aria-labelledby="home-achievements-title"
      className="relative overflow-hidden bg-white h-screen flex items-center w-full"
    >
      <Container className="w-full">
        {/* Editorial Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 lg:items-center w-full">
          <div className="lg:w-1/3 space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h2
                id="home-achievements-title"
                className="font-sfpro font-bold tracking-tight text-[2.75rem] leading-[1.05] sm:text-[3.25rem] text-zinc-950 text-wrap-balance"
              >
                {isId ? (
                  <>
                    Prestasi{" "}
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                      Mosaist
                    </span>
                  </>
                ) : (
                  <>
                    Mosaist{" "}
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                      Achievements
                    </span>
                  </>
                )}
              </h2>

              <p className="text-zinc-550 font-medium text-sm sm:text-base leading-relaxed max-w-[32ch]">
                {ach.subtitle}
              </p>
            </div>

            {/* Elegant Muted Filters */}
            <div className="flex flex-row lg:flex-col items-start flex-wrap gap-2 lg:gap-3.5 pt-2">
              {[
                { id: "semua", label: isId ? "Semua Tingkat" : "All Levels" },
                { id: "internasional", label: "Tingkat Internasional" },
                { id: "nasional", label: "Tingkat Nasional" },
                { id: "provinsi", label: "Tingkat Provinsi" },
                { id: "kabupaten", label: isId ? "Tingkat Kabupaten" : "District Level" },
              ].map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className="group flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left transition-all duration-300 font-sfpro"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#16a34a] scale-125"
                          : "bg-zinc-200 group-hover:bg-zinc-400 group-hover:scale-110"
                      }`}
                    />
                    <span
                      className={
                        isActive
                          ? "text-zinc-900 border-b border-[#16a34a] pb-0.5"
                          : "text-zinc-400 hover:text-zinc-650"
                      }
                    >
                      {filter.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 hidden lg:block">
              <Link
                href={`/${locale}/prestasi`}
                className="group inline-flex items-center justify-between gap-6 bg-[#16a34a] hover:bg-[#118037] text-white text-xs font-bold tracking-widest pl-6 pr-2 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] font-sfpro uppercase shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <span>Hall of Fame</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:bg-white/25 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                  <ArrowRight className="size-3.5" strokeWidth={1.5} aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column - Fixed Height Pinned Container (exactly 4 items high on desktop) */}
          <div className="lg:w-2/3 space-y-4">
            {filteredItems.length > 0 ? (
              <div 
                className="relative overflow-hidden lg:h-[520px] px-6 -mx-6" 
                style={{ height: isDesktop ? `${4 * ITEM_HEIGHT}px` : "360px" }}
              >
                <div ref={listRef} className="divide-y divide-zinc-100 will-change-transform flex flex-col">
                  {filteredItems.map((item, idx) => {
                    const isTeam = item.name.includes(",");
                    return (
                      <div
                        key={idx}
                        className="group flex gap-6 sm:gap-10 py-6 px-6 transition-all duration-500 rounded-3xl hover:bg-emerald-50/[0.12] -mx-6 shrink-0"
                        style={{ height: isDesktop ? `${ITEM_HEIGHT}px` : "auto" }}
                      >
                        {/* Content Block */}
                        <div className="space-y-2.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.colorClass} leading-none`}>
                              {item.medal}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 leading-none">
                              {item.level}
                            </span>
                          </div>

                          <h3 className="font-sfpro font-bold text-base sm:text-lg text-zinc-900 leading-tight group-hover:text-[#16a34a] transition-colors duration-300 truncate">
                            {item.competition}
                          </h3>

                          {/* Typographic list of names */}
                          <div className="text-xs text-zinc-650 leading-relaxed capitalize truncate">
                            {isTeam ? (
                              <span className="font-medium text-zinc-550">
                                {item.name
                                  .split(", ")
                                  .map((n) => n.toLowerCase())
                                  .join("  •  ")}
                              </span>
                            ) : (
                              <span className="font-bold text-zinc-850">
                                {item.name.toLowerCase()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Small Indicator Arrow */}
                        <div className="hidden sm:flex items-center justify-center shrink-0 text-zinc-300 group-hover:text-[#16a34a] group-hover:translate-x-1.5 transition-all duration-500">
                          <ArrowRight className="size-4" strokeWidth={1.5} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-50/50 rounded-3xl border border-dashed border-zinc-200">
                <p className="text-sm font-medium text-zinc-400">
                  {isId ? "Tidak ada prestasi untuk kategori ini." : "No achievements available for this category."}
                </p>
              </div>
            )}

            <div className="pt-8 text-center lg:hidden">
              <Link
                href={`/${locale}/prestasi`}
                className="group inline-flex items-center justify-between gap-6 bg-[#16a34a] text-white text-xs font-bold tracking-widest pl-6 pr-2 py-2 rounded-full font-sfpro uppercase shadow-sm"
              >
                <span>Hall of Fame</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white">
                  <ArrowRight className="size-3.5" strokeWidth={1.5} aria-hidden />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}



