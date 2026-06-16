"use client";

import * as React from "react";
import { Play, PlayCircle, Eye, Calendar, Clock, Share2, Maximize2, Minimize2, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

interface Video {
  id: string;
  youtubeId: string;
  title: { id: string; en: string };
  category: "profile" | "student-work" | "documentation";
  categoryLabel: { id: string; en: string };
  duration: string;
  views: string;
  date: string;
  description: { id: string; en: string };
}

const VIDEOS_DATA: Video[] = [
  {
    id: "profile-2023",
    youtubeId: "T1wY3yQ2mC0",
    title: {
      id: "Profil SMA Negeri Modal Bangsa - Aceh (Official)",
      en: "SMA Negeri Modal Bangsa - Aceh Official School Profile"
    },
    category: "profile",
    categoryLabel: { id: "Profil & Fasilitas", en: "Profile & Facilities" },
    duration: "7:24",
    views: "12K",
    date: "2023-10-15",
    description: {
      id: "Video profil resmi SMA Negeri Modal Bangsa Aceh yang menampilkan fasilitas unggulan, kurikulum asrama, prestasi siswa, dan lingkungan belajar di kampus Meulayo, Blang Bintang.",
      en: "Official school profile of SMA Negeri Modal Bangsa Aceh showcasing premier boarding facilities, academic curriculum, student awards, and the green campus at Blang Bintang."
    }
  },
  {
    id: "film-senja",
    youtubeId: "o7uDk2gG5qE",
    title: {
      id: "Cerita di Ujung Senja — Film Pendek Karya Siswa",
      en: "Stories at Dusk — Student Short Film Showcase"
    },
    category: "student-work",
    categoryLabel: { id: "Film Pendek Siswa", en: "Student Short Films" },
    duration: "12:15",
    views: "3.4K",
    date: "2026-02-18",
    description: {
      id: "Sebuah karya sinematografi persembahan siswa-siswi SMAN Modal Bangsa yang mengisahkan persahabatan, dinamika kehidupan asrama, serta kerja keras dalam mengejar impian.",
      en: "A short cinematic drama created by the students of SMAN Modal Bangsa, telling stories of friendship, boarding school life, and the struggle to achieve dreams."
    }
  },
  {
    id: "film-gapudu",
    youtubeId: "9uR127V6M4w",
    title: {
      id: "GAPUDU — Film Pendek Inspiratif Mosa",
      en: "GAPUDU — Mosa Student Short Film"
    },
    category: "student-work",
    categoryLabel: { id: "Film Pendek Siswa", en: "Student Short Films" },
    duration: "15:40",
    views: "5.1K",
    date: "2026-03-05",
    description: {
      id: "Kisah drama naratif penuh makna yang diproduksi dan disutradarai langsung oleh siswa SMAN Modal Bangsa untuk ajang festival film pendek pelajar tingkat provinsi.",
      en: "An inspiring narrative drama produced and directed entirely by SMAN Modal Bangsa students for the provincial student short film festival."
    }
  },
  {
    id: "film-bungsu",
    youtubeId: "F054W-q4w14",
    title: {
      id: "SI BUNGSU — Drama Pendek Eksplorasi Karakter",
      en: "SI BUNGSU — Character Exploration Student Drama"
    },
    category: "student-work",
    categoryLabel: { id: "Film Pendek Siswa", en: "Student Short Films" },
    duration: "9:12",
    views: "2.8K",
    date: "2026-04-12",
    description: {
      id: "Karya film pendek mandiri garapan tim kreatif siswa Modal Bangsa, mengupas tentang ikatan keluarga, tanggung jawab, dan keteguhan pendirian.",
      en: "An independent short film project by Modal Bangsa student creative team, exploring family ties, youth responsibility, and inner strength."
    }
  },
  {
    id: "film-langkah",
    youtubeId: "0n8tQpQc63Q",
    title: {
      id: "LANGKAH BARU — Kisah Motivasi dan Disiplin",
      en: "LANGKAH BARU — Motivation and Discipline Story"
    },
    category: "student-work",
    categoryLabel: { id: "Film Pendek Siswa", en: "Student Short Films" },
    duration: "10:05",
    views: "1.9K",
    date: "2026-01-20",
    description: {
      id: "Drama motivasi tentang perjuangan murid asrama dalam mengubah kebiasaan buruk menjadi pribadi disiplin yang dipenuhi prestasi demi masa depan.",
      en: "A motivational drama on the struggle of a boarding student to transition from bad habits to self-discipline and high achievement for the future."
    }
  },
  {
    id: "osn-k-docs",
    youtubeId: "kU_tEwQc9zI",
    title: {
      id: "Dokumentasi Ujicoba OSN-K Sesi 2 SMAN Modal Bangsa",
      en: "OSN-K Simulation Session 2 SMAN Modal Bangsa Documentation"
    },
    category: "documentation",
    categoryLabel: { id: "Kegiatan & Dokumentasi", en: "Activities & Documentation" },
    duration: "5:30",
    views: "980",
    date: "2026-03-24",
    description: {
      id: "Dokumentasi pelaksanaan ujian simulasi dan uji coba Olimpiade Sains Nasional tingkat Kabupaten (OSN-K) yang bertempat di laboratorium komputer sekolah.",
      en: "Live coverage of the OSN-K simulation and mock trials hosted at the school's computer laboratories for selected student candidates."
    }
  }
];

interface MediaHubClientProps {
  locale: Locale;
  dict: any;
}

export function MediaHubClient({ locale, dict }: MediaHubClientProps) {
  const [currentVideo, setCurrentVideo] = React.useState<Video>(VIDEOS_DATA[0]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [isCinemaMode, setIsCinemaMode] = React.useState(false);

  const categories = [
    { value: "all", label: locale === "id" ? "Semua Video" : "All Videos" },
    { value: "profile", label: locale === "id" ? "Profil & Fasilitas" : "Profiles" },
    { value: "student-work", label: locale === "id" ? "Karya Siswa" : "Student Works" },
    { value: "documentation", label: locale === "id" ? "Dokumentasi" : "Documentation" }
  ];

  const filteredVideos = VIDEOS_DATA.filter((vid) => {
    return selectedCategory === "all" || vid.category === selectedCategory;
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    // Smooth scroll back to player if not in viewport
    const playerEl = document.getElementById("mosa-player");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer active:scale-95",
              selectedCategory === cat.value
                ? "bg-[color:var(--primary)] text-white border-[color:var(--primary)] shadow-sm"
                : "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] hover:border-zinc-350 dark:hover:border-zinc-700"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className={cn(
        "grid gap-8 items-start transition-all duration-500",
        isCinemaMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"
      )}>
        {/* Left Column: Video Player Area */}
        <div className={cn(
          "space-y-6 transition-all duration-500",
          isCinemaMode ? "w-full max-w-5xl mx-auto" : "lg:col-span-8"
        )}>
          {/* Main Cinema Player Container using Double Bezel */}
          <div 
            id="mosa-player" 
            className="rounded-[2.5rem] bg-zinc-150/60 dark:bg-zinc-800/40 p-2.5 border border-zinc-200/50 dark:border-zinc-700/30 shadow-lg"
          >
            <div className="overflow-hidden rounded-[calc(2.5rem-0.625rem)] bg-black aspect-[16/9] relative shadow-inner group">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                title={currentVideo.title[locale]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>

          {/* Video Metadata Information Card (Cinema Styled Glass) */}
          <div className="rounded-[2rem] bg-white dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 p-6 sm:p-8 backdrop-blur-md shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 text-[10px] uppercase font-bold tracking-[0.15em] text-emerald-700 dark:text-emerald-300 border border-emerald-500/10">
                {currentVideo.categoryLabel[locale]}
              </span>
              
              <div className="flex items-center gap-3.5">
                {/* Cinema Mode Switch Button */}
                <button
                  onClick={() => setIsCinemaMode(!isCinemaMode)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider bg-zinc-50 hover:bg-zinc-150 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/30 transition-all cursor-pointer active:scale-95"
                >
                  <Tv className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isCinemaMode ? (locale === "id" ? "Normal" : "Normal Mode") : (locale === "id" ? "Teater" : "Cinema Mode")}</span>
                </button>
              </div>
            </div>

            <h1 className="mt-4 font-sfpro text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl leading-snug">
              {currentVideo.title[locale]}
            </h1>

            {/* Video Stats Info */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 border-b border-dashed border-zinc-100 dark:border-zinc-800/60 pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-emerald-600 dark:text-emerald-500" />
                <span>{formatDate(currentVideo.date)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5 text-emerald-600 dark:text-emerald-500" />
                <span>{currentVideo.views} {locale === "id" ? "ditonton" : "views"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-emerald-600 dark:text-emerald-500" />
                <span>{currentVideo.duration}</span>
              </span>
            </div>

            {/* Video Description */}
            <div className="mt-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--foreground)]">
                {locale === "id" ? "Deskripsi Video" : "Video Description"}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[color:var(--muted-foreground)]">
                {currentVideo.description[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist Sidebar */}
        <div className={cn(
          "space-y-6",
          isCinemaMode ? "w-full max-w-5xl mx-auto mt-6" : "lg:col-span-4 lg:sticky lg:top-24"
        )}>
          <div className="flex items-center justify-between">
            <h2 className="font-sfpro text-lg font-bold tracking-tight text-[color:var(--foreground)] uppercase text-sm tracking-[0.1em]">
              {locale === "id" ? "Daftar Putar Video" : "Video Playlist"}
            </h2>
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              {filteredVideos.length} {locale === "id" ? "Video" : "Videos"}
            </span>
          </div>

          {/* Playlist Cards Stack */}
          <div className={cn(
            "space-y-4 overflow-y-auto custom-scrollbar pr-1 max-h-[680px]",
            isCinemaMode && "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-none overflow-y-visible"
          )}>
            {filteredVideos.map((video) => {
              const isActive = video.id === currentVideo.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={cn(
                    "group relative cursor-pointer transition-all duration-300 active:scale-[0.99]",
                    isActive ? "scale-[1.01]" : "hover:scale-[1.01]"
                  )}
                >
                  {/* Double Bezel for playlist item */}
                  <div className={cn(
                    "rounded-[1.75rem] p-1.5 border transition-all duration-300 shadow-sm",
                    isActive 
                      ? "bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/30" 
                      : "bg-zinc-100/50 dark:bg-zinc-800/30 border-zinc-200/40 dark:border-zinc-700/30 hover:border-zinc-300 dark:hover:border-zinc-650"
                  )}>
                    <div className="rounded-[calc(1.75rem-0.375rem)] bg-white dark:bg-zinc-900 overflow-hidden p-3.5 flex items-start gap-4">
                      {/* Thumbnail wrapper */}
                      <div className="relative shrink-0 w-24 sm:w-28 aspect-[16/9] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/20 shadow-sm">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title[locale]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Play overlay button */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Play className={cn(
                            "size-5 transition-transform duration-300",
                            isActive 
                              ? "text-emerald-500 fill-emerald-500 scale-110" 
                              : "text-white fill-white/10 group-hover:scale-110"
                          )} />
                        </div>
                        {/* Duration label */}
                        <span className="absolute bottom-1 right-1 bg-black/75 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
                          {video.duration}
                        </span>
                      </div>

                      {/* Info details */}
                      <div className="space-y-1.5 min-w-0">
                        <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {video.categoryLabel[locale]}
                        </span>
                        <h4 className={cn(
                          "font-sfpro text-xs sm:text-sm font-semibold tracking-tight leading-snug line-clamp-2 transition-colors duration-300",
                          isActive ? "text-emerald-600 dark:text-emerald-400" : "text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]"
                        )}>
                          {video.title[locale]}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
