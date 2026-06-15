"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import {
  Trophy,
  Star,
  Sparkles,
  Medal,
  Calendar,
  ChevronRight,
  Music,
  Globe,
  Flag,
  BookOpen,
  ArrowUpRight,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

interface AchievementItem {
  id: string;
  name: string;
  category: "Internasional" | "Nasional" | "Provinsi";
  honorTier: { id: string; en: string };
  field: { id: string; en: string };
  subjectTag: string; // "Matematika", "Sains", "Teknologi", "Olimpiade", "Literasi", "Seni"
  title: { id: string; en: string };
  achievement: { id: string; en: string };
  quote: { id: string; en: string };
  image: string;
  imageBadge: { id: string; en: string };
  year: string;
  country: { id: string; en: string };
  themeColor: string; // hex accent for gold/emerald/purple highlights
  icon: any;
}

interface HallOfFameShowcaseProps {
  lang: string;
  dict: Dictionary;
}

export function HallOfFameShowcase({ lang, dict }: HallOfFameShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>(lang === "id" ? "Semua" : "All");
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const translateCategory = (cat: string) => {
    if (lang !== "id") {
      if (cat === "Internasional") return "International";
      if (cat === "Nasional") return "National";
      if (cat === "Provinsi") return "Provincial";
    }
    return cat;
  };

  const translateSubject = (sub: string) => {
    if (lang !== "id") {
      if (sub === "Matematika") return "Mathematics";
      if (sub === "Sains") return "Science";
      if (sub === "Teknologi") return "Technology";
      if (sub === "Olimpiade") return "Olympiad";
      if (sub === "Literasi") return "Literacy";
      if (sub === "Seni") return "Art";
    }
    return sub;
  };

  const data: AchievementItem[] = [
    {
      id: "fayruz",
      name: "Fayruz Chalisa I.",
      category: "Internasional",
      honorTier: { id: "Supreme Laureate (Tingkat Dunia)", en: "Supreme Laureate (World Level)" },
      field: { id: "MATEMATIKA / MATHEMATICS", en: "MATHEMATICS" },
      subjectTag: "Matematika",
      title: { 
        id: "Peringkat 14 Dunia World Young Mathematicians Olympiad (WYMO) 2025", 
        en: "14th World Rank World Young Mathematicians Olympiad (WYMO) 2025" 
      },
      achievement: { 
        id: "Mengharumkan nama Indonesia di kancah global dengan menembus babak final dan menduduki peringkat ke-14 tingkat dunia dalam olimpiade matematika internasional WYMO.", 
        en: "Brought pride to Indonesia on the global stage by reaching the final round and ranking 14th in the world in the WYMO international mathematics olympiad." 
      },
      quote: { 
        id: "Matematika adalah bahasa alam semesta. Di balik setiap angka dan rumus, ada keindahan logika yang menanti untuk dipecahkan.", 
        en: "Mathematics is the language of the universe. Behind every number and formula, there is a beauty of logic waiting to be solved." 
      },
      image: "/images/hof/fayruz-4.png",
      imageBadge: { id: "14th World Rank WYMO", en: "14th World Rank WYMO" },
      year: "2025",
      country: { id: "Thailand", en: "Thailand" },
      themeColor: "from-amber-500/10 to-amber-600/5",
      icon: Globe,
    },

    {
      id: "dzakwan",
      name: "Dzakwan Dhiya R.",
      category: "Nasional",
      honorTier: { id: "Scientific Silver Medalist", en: "Scientific Silver Medalist" },
      field: { id: "OLIMPIADE SAINS / PHYSICS", en: "SCIENCE OLYMPIAD / PHYSICS" },
      subjectTag: "Olimpiade",
      title: { 
        id: "Medali Perak Olimpiade Sains Nasional (OSN) Fisika 2025", 
        en: "Silver Medal of National Science Olympiad (OSN) in Physics 2025" 
      },
      achievement: { 
        id: "Menyabet Medali Perak (Juara II) tingkat nasional bidang Fisika SMA/MA dalam ajang kompetisi sains tahunan paling bergengsi OSN.", 
        en: "Won the Silver Medal (2nd Place) at the national level in Physics for high school in the most prestigious annual science competition, OSN." 
      },
      quote: { 
        id: "Alam semesta bergerak dalam harmoni keteraturan. Mempelajari fisika melatih logika kita melihat keagungan penciptaan.", 
        en: "The universe moves in a harmony of order. Studying physics trains our logic to see the majesty of creation." 
      },
      image: "/images/hof/dzakwan.png",
      imageBadge: { id: "Perak OSN Fisika 2025", en: "Physics OSN Silver 2025" },
      year: "2025",
      country: { id: "Malang", en: "Malang" },
      themeColor: "from-amber-500/10 to-amber-600/5",
      icon: Trophy,
    },
    {
      id: "ridho",
      name: "Muhammad Ridho",
      category: "Nasional",
      honorTier: { id: "National Commander Honor", en: "National Commander Honor" },
      field: { id: "KEPEMIMPINAN / LEADERSHIP", en: "LEADERSHIP" },
      subjectTag: "Olimpiade",
      title: { 
        id: "Komandan Upacara Hari Lahir Pancasila Tingkat Nasional 2026", 
        en: "Ceremony Commander of National Pancasila Day 2026" 
      },
      achievement: { 
        id: "Terpilih dan bertugas sebagai Komandan Upacara Hari Lahir Pancasila Tingkat Nasional 2026 di hadapan Presiden Republik Indonesia.", 
        en: "Selected and served as the Ceremony Commander of National Pancasila Day 2026 in front of the President of the Republic of Indonesia." 
      },
      quote: { 
        id: "Disiplin, dedikasi, dan kehormatan adalah pilar utama dalam mengabdi pada bangsa dan negara.", 
        en: "Discipline, dedication, and honor are the main pillars in serving the nation and state." 
      },
      image: "/images/hof/ridho.png",
      imageBadge: { id: "Komandan Nasional 2026", en: "National Commander 2026" },
      year: "2026",
      country: { id: "Jakarta", en: "Jakarta" },
      themeColor: "from-rose-500/10 to-rose-600/5",
      icon: Medal,
    },
    {
      id: "fatih",
      name: "T. Fatih Ahmad Hasan",
      category: "Nasional",
      honorTier: { id: "Distinguished National Musician", en: "Distinguished National Musician" },
      field: { id: "SENI / MUSIC & COMPOSITION", en: "ART / MUSIC & COMPOSITION" },
      subjectTag: "Seni",
      title: { 
        id: "Juara 3 Cipta Lagu FLS2N Tingkat Nasional (2025)", 
        en: "3rd Place in Songwriting at the National FLS2N (2025)" 
      },
      achievement: { 
        id: "Meraih Juara 1 Cipta Lagu FLS2N tingkat Provinsi Aceh dan melaju hingga menyabet Juara 3 (Medali Perunggu) di tingkat nasional.", 
        en: "Won 1st Place in Songwriting at the Aceh Provincial FLS2N and advanced to win 3rd Place (Bronze Medal) at the national level." 
      },
      quote: { 
        id: "Melodi adalah getaran jiwa, dan menciptakan lagu adalah cara paling jujur untuk mengekspresikan cerita kehidupan yang tidak terucap.", 
        en: "Melody is the vibration of the soul, and songwriting is the most honest way to express unspoken life stories." 
      },
      image: "/images/hof/teuku fatih.png",
      imageBadge: { id: "Perunggu FLS2N Nasional", en: "FLS2N National Bronze" },
      year: "2025",
      country: { id: "Aceh / Nasional", en: "Aceh / National" },
      themeColor: "from-amber-500/10 to-amber-600/5",
      icon: Music,
    },
    {
      id: "balqis",
      name: "Balqis Daratunnasywa",
      category: "Nasional",
      honorTier: { id: "National Journalism Laureate", en: "National Journalism Laureate" },
      field: { id: "LITERASI / JOURNALISM", en: "LITERACY / JOURNALISM" },
      subjectTag: "Literasi",
      title: { 
        id: "Juara 2 Nasional Jurnalistik FLS2N (2025)", 
        en: "2nd Place in National Journalism at FLS2N (2025)" 
      },
      achievement: { 
        id: "Meraih Juara 2 (Medali Perak) tingkat Nasional kategori Jurnalistik dalam Festival dan Lomba Seni Siswa Nasional setelah bersaing ketat dengan perwakilan seluruh provinsi.", 
        en: "Won 2nd Place (Silver Medal) at the national level for the Journalism category in the National Student Art Festival and Competition (FLS2N) after a tight competition with representatives from all provinces." 
      },
      quote: { 
        id: "Menulis berita bukan sekadar merangkai kata, melainkan menyingkap fakta secara jernih untuk menyuarakan kebenaran kepada publik.", 
        en: "Writing news is not just about stringing words together, but about revealing facts clearly to voice the truth to the public." 
      },
      image: "/images/hof/balqis.png",
      imageBadge: { id: "Juara 2 Nasional FLS2N", en: "2nd Place National FLS2N" },
      year: "2025",
      country: { id: "Aceh / Nasional", en: "Aceh / National" },
      themeColor: "from-emerald-500/10 to-emerald-600/5",
      icon: BookOpen,
    },
  ];

  const filteredData = data.filter((item) => {
    if (activeTab === "Semua" || activeTab === "All") return true;
    if (activeTab === "Internasional" || activeTab === "International") return item.category === "Internasional";
    if (activeTab === "Nasional" || activeTab === "National") return item.category === "Nasional";
    if (activeTab === "Provinsi" || activeTab === "Provincial") return item.category === "Provinsi";
    if (activeTab === "Akademik" || activeTab === "Academic") return item.subjectTag === "Matematika" || item.subjectTag === "Olimpiade";
    if (activeTab === "Sains & Teknologi" || activeTab === "Science & Technology") return item.subjectTag === "Sains" || item.subjectTag === "Teknologi";
    if (activeTab === "Seni & Budaya" || activeTab === "Arts & Culture") return item.subjectTag === "Seni" || item.subjectTag === "Literasi";
    return true;
  });

  const currentItem = filteredData[activeIndex] || filteredData[0] || data[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!detailPanelRef.current) return;
    const el = detailPanelRef.current;

    const name = el.querySelector(".detail-name");
    const title = el.querySelector(".detail-title");
    const quote = el.querySelector(".detail-quote");
    const desc = el.querySelector(".detail-desc");
    const meta = el.querySelectorAll(".detail-meta");
    const imgFrame = el.querySelector(".detail-img-frame");

    gsap.killTweensOf([name, title, quote, desc, meta, imgFrame]);
    gsap.set([name, title, quote, desc, meta], { opacity: 0, y: 15 });
    gsap.set(imgFrame, { opacity: 0, scale: 0.96, filter: "blur(4px)" });

    const tl = gsap.timeline();
    tl.to(imgFrame, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out"
    })
    .to([name, title], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out"
    }, "-=0.4")
    .to(quote, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.25")
    .to([desc, ...meta], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out"
    }, "-=0.25");
  }, [currentItem.id]);

  return (
    <div
      ref={showcaseRef}
      className="relative bg-gradient-to-br from-[#fafbfa] via-[#f7fbf8] to-[#f2faf4] text-zinc-850 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-100"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#16a34a_1px,transparent_1px),linear-gradient(to_bottom,#16a34a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        
        {/* ============ MAIN EXHIBIT GRID ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Plaques List (col-span-4) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
            
            {/* Sidebar Shell */}
            <div className="bg-white/95 border border-emerald-100/60 rounded-[2rem] p-6 flex flex-col flex-1 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
              
              <div className="relative z-10 flex-1">
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <h3 className="font-sfpro text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                      {lang === "id" ? "Daftar Tokoh Aktif" : "Active Figure List"}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {filteredData.length} {lang === "id" ? "DITEMUKAN" : "FOUND"}
                  </span>
                </div>

                {/* Plaques Stack */}
                <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => {
                      const isSelected = item.id === currentItem.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveIndex(idx)}
                          className={cn(
                            "w-full rounded-2xl p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between group cursor-pointer border relative overflow-hidden",
                            isSelected
                              ? "bg-[#166534] border-[#166534] text-white shadow-md"
                              : "bg-gray-50/50 border-gray-100 hover:border-emerald-200 hover:bg-white text-zinc-600 hover:text-emerald-950"
                          )}
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            <span className={cn(
                              "font-mono text-[10px] leading-none px-2 py-1.5 rounded-md transition-colors",
                              isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-zinc-500"
                            )}>
                              {`0${idx + 1}`}
                            </span>
                            <div>
                              <p className={cn(
                                "font-sfpro font-bold text-sm tracking-wide transition-all",
                                isSelected ? "text-white" : "text-zinc-800 group-hover:text-emerald-800"
                              )}>
                                {item.name}
                              </p>
                              <p className={cn(
                                "text-[10px] mt-0.5 tracking-wider font-semibold",
                                isSelected ? "text-emerald-100" : "text-zinc-400"
                              )}>
                                {translateSubject(item.subjectTag)} • {translateCategory(item.category)}
                              </p>
                            </div>
                          </div>

                          <div className="relative z-10 shrink-0">
                            <div className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300",
                              isSelected 
                                ? "bg-white/10 border-white/20 text-white rotate-45" 
                                : "bg-white border-gray-150 text-zinc-400 group-hover:text-emerald-600 group-hover:border-emerald-200"
                            )}>
                              <ArrowUpRight className="size-3.5" />
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 border border-dashed border-gray-250 rounded-2xl">
                      <p className="text-xs text-zinc-400">
                        {lang === "id" ? "Tidak ada data untuk filter ini" : "No data found for this filter"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* View all CTA with Island Button Architecture */}
              <Link
                href={`/${lang}/prestasi`}
                className="mt-6 group w-full bg-gray-50 border border-gray-100 hover:border-emerald-200 hover:bg-white text-zinc-600 hover:text-emerald-800 transition-all p-1.5 rounded-2xl flex items-center justify-between text-xs font-bold cursor-pointer"
              >
                <span className="pl-3 tracking-wide">{lang === "id" ? "Arsip Prestasi Lengkap" : "Complete Achievements"}</span>
                <div className="w-8 h-8 rounded-xl bg-[#166534] flex items-center justify-center text-white group-hover:translate-x-0.5 transition-all duration-300">
                  <ChevronRight className="size-4" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Spatial Exhibition Plate (col-span-8) */}
          <div
            ref={detailPanelRef}
            className="col-span-12 lg:col-span-8 bg-white border border-emerald-100/40 rounded-3xl lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            {/* Mesh background specific to current card */}
            <div className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-1000">
              <div className={cn("absolute -right-20 -bottom-20 w-[400px] h-[400px] rounded-full blur-[100px] bg-gradient-to-br", currentItem.themeColor)} />
            </div>

            {/* Split row content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10 flex-1">
              
              {/* Profile Details (col-span-7) */}
              <div className="col-span-12 md:col-span-7 space-y-5">
                
                {/* Champion Title */}
                <div className="space-y-1">
                  <h2 className="detail-name font-romulo text-3xl font-bold tracking-tight text-emerald-950 leading-tight uppercase">
                    {currentItem.name}
                  </h2>
                  <p className="detail-title font-sfpro text-sm text-emerald-700 font-medium tracking-wide leading-relaxed">
                    {lang === "id" ? currentItem.title.id : currentItem.title.en}
                  </p>
                </div>

                {/* Editorial Quote Box */}
                <div className="detail-quote bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-5 relative overflow-hidden">
                  <span className="absolute -left-1 -top-8 text-[7rem] font-romulo italic text-emerald-600/5 pointer-events-none select-none">“</span>
                  <p className="text-emerald-950 font-sans text-sm leading-relaxed italic relative z-10 font-medium">
                    "{lang === "id" ? currentItem.quote.id : currentItem.quote.en}"
                  </p>
                </div>

                {/* Full description */}
                <p className="detail-desc text-zinc-500 text-xs sm:text-sm leading-relaxed text-justify">
                  {lang === "id" ? currentItem.achievement.id : currentItem.achievement.en}
                </p>

                {/* Detailed Archive Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="detail-meta bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Calendar className="size-4.5" strokeWidth={1.2} />
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                        {lang === "id" ? "Tahun Arsip" : "Archive Year"}
                      </p>
                      <p className="text-xs font-bold text-zinc-700 mt-0.5">{currentItem.year}</p>
                    </div>
                  </div>

                  <div className="detail-meta bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 shrink-0">
                      <MapPin className="size-4.5" strokeWidth={1.2} />
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                        {lang === "id" ? "Negara / Lokasi" : "Country / Location"}
                      </p>
                      <p className="text-xs font-bold text-zinc-700 mt-0.5">
                        {lang === "id" ? currentItem.country.id : currentItem.country.en}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Photo Frame (col-span-5) */}
              <div className="col-span-12 md:col-span-5 flex justify-center items-center h-auto md:h-full">
                {/* Double-bezel outer shell */}
                <div className="detail-img-frame relative w-full max-w-[240px] sm:max-w-[280px] aspect-[3/4.2] p-2 rounded-3xl sm:rounded-[2.5rem] bg-emerald-50 border border-emerald-100 shadow-sm group/img">
                  {/* Inner bezel core */}
                  <div className="relative w-full h-full rounded-[calc(1.5rem-0.25rem)] sm:rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-gray-50 border border-gray-100">
                    <Image
                      src={currentItem.image}
                      alt={currentItem.name}
                      fill
                      priority
                      className="object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                    {/* Soft gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ============ BOTTOM CATEGORY DOCK ============ */}
        <div className="space-y-6 relative">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <div className="flex items-center gap-1.5 bg-white border border-gray-150 shadow-sm px-4 py-1.5 rounded-full text-[10px] font-bold text-emerald-600 tracking-widest uppercase">
              <Sparkles className="size-3 text-amber-500 animate-pulse" />
              <span>{lang === "id" ? "Saring Galeri Tokoh" : "Filter Figure Gallery"}</span>
            </div>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {(lang === "id"
              ? ["Semua", "Internasional", "Nasional", "Provinsi", "Akademik", "Sains & Teknologi", "Seni & Budaya"]
              : ["All", "International", "National", "Provincial", "Academic", "Science & Technology", "Arts & Culture"]
            ).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-5 py-2.5 text-xs font-bold rounded-full border transition-all duration-500 cursor-pointer tracking-wider",
                    isActive
                      ? "bg-[#166534] border-[#166534] text-white shadow-md"
                      : "bg-white border-gray-200 text-zinc-500 hover:border-emerald-350 hover:text-emerald-950"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
