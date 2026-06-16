"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Trophy, User, ArrowUpRight, Sparkles, Compass, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities, stripHtml, truncate } from "@/lib/utils";

interface ClubMeta {
  category: "academic" | "language" | "arts" | "sports" | "leadership" | "entrepreneurship";
  categoryLabel: { id: string; en: string };
  coach: string;
  memberCount: number;
  achievements: { id: string[]; en: string[] };
}

const REAL_CLUBS_META: Record<string, ClubMeta> = {
  "olimpiade-siswa": {
    category: "academic",
    categoryLabel: { id: "Akademik & Sains", en: "Academic & Science" },
    coach: "Dra. Hj. Nurlela, M.Pd",
    memberCount: 45,
    achievements: {
      id: [
        "Juara Umum Olimpiade Sains Provinsi (OSP) Aceh",
        "Medali Perak Kebumian & Astronomi tingkat Nasional",
        "Binaan khusus intensif persiapan OSN kabupaten/kota"
      ],
      en: [
        "Overall Champion of Aceh Province Science Olympiad (OSP)",
        "National Silver Medal in Earth Science & Astronomy",
        "Intensive coaching program for district/city OSN preparation"
      ]
    }
  },
  "team-sepak-bola-sekolah": {
    category: "sports",
    categoryLabel: { id: "Olahraga & Futsal", en: "Sports & Futsal" },
    coach: "Zulkifli, S.Pd",
    memberCount: 32,
    achievements: {
      id: [
        "Juara 1 Turnamen Futsal Pelajar Piala Dispora Aceh",
        "Juara 2 Kejuaraan Sepak Bola Liga Pelajar Daerah (LPD) Aceh Besar",
        "Latihan rutin mingguan di lapangan utama sekolah"
      ],
      en: [
        "1st Place in Aceh Dispora Cup Student Futsal Tournament",
        "2nd Place in Aceh Besar Regional Students Soccer League (LPD)",
        "Weekly routine practice sessions on the main school field"
      ]
    }
  },
  "kewirausahaan": {
    category: "leadership",
    categoryLabel: { id: "Kewirausahaan & Prakarya", en: "Entrepreneurship & Crafts" },
    coach: "Dra. Cut Rahma",
    memberCount: 28,
    achievements: {
      id: [
        "Penyelenggara Bazar Kewirausahaan Tahunan Siswa Mosa",
        "Produksi kerajinan tangan khas Aceh dan produk kreatif bernilai jual",
        "Pelatihan dasar kepemimpinan finansial dan manajemen bisnis"
      ],
      en: [
        "Organizer of the Annual Mosa Student Entrepreneurship Bazaar",
        "Production of traditional Acehnese crafts and creative marketable goods",
        "Basic financial leadership and business management training sessions"
      ]
    }
  }
};

interface ClubListClientProps {
  locale: Locale;
  dict: any;
  initialClubs: WPPost[];
}

export function ClubListClient({ locale, dict, initialClubs }: ClubListClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categories = [
    { value: "all", label: locale === "id" ? "Semua Club" : "All Clubs" },
    { value: "academic", label: locale === "id" ? "Akademik" : "Academic" },
    { value: "sports", label: locale === "id" ? "Olahraga" : "Sports" },
    { value: "leadership", label: locale === "id" ? "Kepemimpinan & Bisnis" : "Leadership & Business" }
  ];

  // Map WPPosts to displayable club items
  const clubs = initialClubs.map((post) => {
    const title = decodeHtmlEntities(post.title.rendered);
    const contentText = stripHtml(post.content?.rendered ?? "");
    const description = truncate(contentText, 180);
    const imageUrl = getFeaturedImageUrl(post);
    
    // Lookup meta by slug
    const meta = REAL_CLUBS_META[post.slug] || {
      category: "academic" as const,
      categoryLabel: { id: "Ekstrakurikuler", en: "Extracurricular" },
      coach: "Staf Kesiswaan",
      memberCount: 20,
      achievements: {
        id: ["Pencapaian sedang diperbarui oleh pembina club."],
        en: ["Achievements are currently being updated by the club advisor."]
      }
    };

    return {
      id: post.id.toString(),
      slug: post.slug,
      name: title,
      imageUrl,
      description,
      ...meta
    };
  });

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[color:var(--border)] pb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder={locale === "id" ? "Cari club siswa..." : "Search student clubs..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[color:var(--border)] bg-white dark:bg-zinc-900/60 pl-10.5 pr-4 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)] transition-all duration-300 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "rounded-full px-4.5 py-2 text-xs font-semibold tracking-wide border transition-all duration-300 cursor-pointer active:scale-95",
                selectedCategory === cat.value
                  ? "bg-[color:var(--primary)] text-white border-[color:var(--primary)] shadow-sm"
                  : "bg-white dark:bg-zinc-900 border-[color:var(--border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid layout */}
      {filteredClubs.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-max">
          {filteredClubs.map((club, idx) => {
            // Asymmetrical grid column calculations based on list index:
            // Index 0 and 1 span 6 columns, Index 2 spans 12 columns for a nice bento distribution
            let colSpan = "col-span-1 md:col-span-6 lg:col-span-6";
            if (idx === 2) {
              colSpan = "col-span-1 md:col-span-6 lg:col-span-12";
            }

            return (
              <div
                key={club.id}
                className={cn(
                  "group relative transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  colSpan
                )}
              >
                {/* Double-Bezel Design System */}
                {/* Outer Shell */}
                <div className="h-full rounded-[2rem] bg-zinc-100/60 dark:bg-zinc-800/40 p-2 border border-zinc-200/50 dark:border-zinc-700/30 transition-transform duration-500 group-hover:scale-[1.012] shadow-sm hover:shadow-md">
                  {/* Inner Core */}
                  <div className="h-full flex flex-col justify-between rounded-[calc(2rem-0.5rem)] bg-white dark:bg-zinc-900 border border-zinc-200/30 dark:border-zinc-800/30 p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <div>
                      {/* Badge / Category and Acronym */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-[10px] uppercase font-bold tracking-[0.15em] text-emerald-700 dark:text-emerald-300 border border-emerald-500/10">
                          {club.categoryLabel[locale]}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-5 font-sfpro text-xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-2xl group-hover:text-[color:var(--primary)] transition-colors duration-300">
                        {club.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[color:var(--muted-foreground)]">
                        {club.description}
                      </p>

                      {/* Coach info */}
                      <div className="mt-5 flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 border-t border-dashed border-zinc-100 dark:border-zinc-800/60 pt-4">
                        <User className="size-4 text-emerald-600 dark:text-emerald-500" />
                        <span>
                          <strong>{locale === "id" ? "Pembina:" : "Coach:"}</strong> {club.coach}
                        </span>
                      </div>
                    </div>

                    {/* Image (if present in WordPress CPT) */}
                    {club.imageUrl ? (
                      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 aspect-[16/9] relative bg-zinc-100 dark:bg-zinc-950">
                        <Image
                          src={club.imageUrl}
                          alt={club.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : null}

                    {/* Achievements List */}
                    <div className="mt-6 space-y-3 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-2xl p-4.5 border border-zinc-100 dark:border-zinc-800/30">
                      <div className="flex items-center gap-2">
                        <Trophy className="size-4 text-amber-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--foreground)]">
                          {locale === "id" ? "Pencapaian Utama" : "Key Achievements"}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {club.achievements[locale].map((ach, aIdx) => (
                          <li key={aIdx} className="flex gap-2.5 items-start text-xs text-[color:var(--muted-foreground)] leading-relaxed">
                            <span className="flex size-1.5 shrink-0 items-center justify-center rounded-full bg-emerald-500 mt-1.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA button inside card */}
                    <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                        {club.memberCount} {locale === "id" ? "Anggota Aktif" : "Active Members"}
                      </span>
                      <Link
                        href={`/${locale}/ekskul/${club.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-50 hover:bg-[color:var(--primary)] text-zinc-800 hover:text-white dark:bg-zinc-800/50 dark:hover:bg-[color:var(--primary)] dark:text-zinc-200 px-4.5 py-2 text-xs font-bold border border-zinc-200/60 dark:border-zinc-700/60 hover:border-transparent transition-all duration-300 cursor-pointer active:scale-95 group-hover:shadow-sm"
                      >
                        <span>{locale === "id" ? "Lihat Detail" : "View Details"}</span>
                        <div className="w-5 h-5 rounded-full bg-zinc-200/50 dark:bg-zinc-700/50 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[color:var(--border)] bg-white dark:bg-zinc-900/40 p-16 text-center max-w-2xl mx-auto">
          <Compass className="size-12 mx-auto text-zinc-300 dark:text-zinc-600 animate-pulse" />
          <h4 className="mt-4 font-sfpro text-lg font-bold text-[color:var(--foreground)]">
            {locale === "id" ? "Club tidak ditemukan" : "No clubs found"}
          </h4>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            {locale === "id"
              ? "Coba ganti kata pencarian atau pilih kategori lain."
              : "Try changing your search keywords or choosing another category."}
          </p>
        </div>
      )}

      {/* Decorative Bottom Invitation Card using Double Bezel */}
      <div className="mt-24 max-w-4xl mx-auto rounded-[2rem] bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 p-2 border border-emerald-500/10 shadow-sm">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white dark:bg-zinc-900/60 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="size-6" />
          </div>
          <h3 className="font-sfpro text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl">
            {locale === "id" ? "Punya Gagasan Club Baru?" : "Have a New Club Idea?"}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[color:var(--muted-foreground)] max-w-xl mx-auto">
            {locale === "id"
              ? "Kami selalu mendukung inisiatif, kreativitas, dan minat baru siswa. Ajukan pembentukan club baru Anda bersama guru pembimbing ke kesiswaan."
              : "We always support student initiative, creativity, and new interests. Submit your new club proposal along with an advisor teacher to the student affairs division."}
          </p>
          <div className="pt-4">
            <a
              href={`/${locale}/kontak`}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary)]/90 text-white font-semibold px-8 py-3.5 text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-900/15"
            >
              <span>{locale === "id" ? "Hubungi Kesiswaan" : "Contact Student Affairs"}</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
