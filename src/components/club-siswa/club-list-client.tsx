"use client";

import * as React from "react";
import { Search, Trophy, User, ArrowUpRight, Sparkles, Compass, Target, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

interface Club {
  id: string;
  name: string;
  acronym: string;
  category: "academic" | "language" | "arts" | "sports" | "leadership";
  categoryLabel: { id: string; en: string };
  coach: string;
  description: { id: string; en: string };
  achievements: { id: string[]; en: string[] };
  memberCount: number;
}

const CLUBS_DATA: Club[] = [
  {
    id: "msc",
    name: "Mosa Science Club",
    acronym: "MSC",
    category: "academic",
    categoryLabel: { id: "Akademik & Sains", en: "Academic & Science" },
    coach: "Dra. Hj. Nurlela, M.Pd",
    description: {
      id: "Komunitas ilmiah tempat berkumpulnya siswa berbakat sains untuk mempersiapkan diri menghadapi Olimpiade Sains Nasional (OSN) dan ajang kompetisi ilmiah lainnya.",
      en: "A scientific community gathering students with high talent in sciences to prepare for the National Science Olympiad (OSN) and other scientific events."
    },
    achievements: {
      id: [
        "Medali Emas OSN Tingkat Nasional Bidang Astronomi (2024)",
        "Medali Perak OSN Tingkat Nasional Bidang Fisika (2023)",
        "Juara Umum Olimpiade Sains Provinsi Aceh selama 5 tahun berturut-turut"
      ],
      en: [
        "National Gold Medal in Astronomy OSN (2024)",
        "National Silver Medal in Physics OSN (2023)",
        "Overall Champion of Aceh Province Science Olympiad for 5 consecutive years"
      ]
    },
    memberCount: 45
  },
  {
    id: "mds",
    name: "Mosa Debating Society",
    acronym: "MDS",
    category: "language",
    categoryLabel: { id: "Bahasa & Komunikasi", en: "Language & Communication" },
    coach: "Ridwan, S.Pd",
    description: {
      id: "Wadah pengembangan kemampuan berpikir kritis, berbicara di depan umum, dan berargumen melalui seni debat kompetitif dalam Bahasa Inggris dan Bahasa Indonesia.",
      en: "A forum for developing critical thinking, public speaking, and argumentation through the art of competitive debate in English and Indonesian."
    },
    achievements: {
      id: [
        "Juara 1 National Schools Debating Championship (NSDC) Tingkat Provinsi Aceh (2024)",
        "Top 10 Pembicara Terbaik (Best Speaker) di Lomba Debat Bahasa Indonesia (LDBI) Nasional",
        "Juara 1 Debat Bahasa Inggris se-Sumatera"
      ],
      en: [
        "1st Place in National Schools Debating Championship (NSDC) Aceh Province (2024)",
        "Top 10 Best Speakers in National Indonesian Debating Championship (LDBI)",
        "1st Place in Sumatra English Debating Championship"
      ]
    },
    memberCount: 30
  },
  {
    id: "jeumpa-puteh",
    name: "Sanggar Seni Jeumpa Puteh",
    acronym: "SJP",
    category: "arts",
    categoryLabel: { id: "Seni & Budaya", en: "Arts & Culture" },
    coach: "Cut Rahma, S.Sn",
    description: {
      id: "Pusat kreativitas seni pertunjukan tradisi dan kreasi baru, melestarikan tarian khas Aceh seperti Saman dan Ranup Lampuan serta seni teater musik.",
      en: "Center of traditional and creative performance arts, preserving traditional Acehnese dances like Saman and Ranup Lampuan, as well as musical theater."
    },
    achievements: {
      id: [
        "Penyaji Tari Tradisional Terbaik di FLS2N Tingkat Nasional (2023)",
        "Juara 1 Musik Tradisional FLS2N Tingkat Provinsi Aceh",
        "Penampilan Kebudayaan Internasional di Festival Seni Pemuda Malaysia"
      ],
      en: [
        "Best Traditional Dance Performance at National FLS2N (2023)",
        "1st Place in Traditional Music at Aceh Province FLS2N",
        "International Cultural Showcase at Malaysia Youth Art Festival"
      ]
    },
    memberCount: 50
  },
  {
    id: "mfc",
    name: "Mosa Football & Futsal Club",
    acronym: "MFC",
    category: "sports",
    categoryLabel: { id: "Olahraga", en: "Sports" },
    coach: "Zulkifli, S.Pd",
    description: {
      id: "Klub olahraga bergengsi yang fokus mengasah bakat sepak bola dan futsal siswa dengan latihan fisik terprogram dan strategi kerja sama tim yang solid.",
      en: "A prestigious sports club focused on nurturing students' soccer and futsal talents with programmed physical training and solid teamwork strategies."
    },
    achievements: {
      id: [
        "Juara 1 Turnamen Futsal Pelajar Piala Dispora Aceh (2024)",
        "Juara 2 Kejuaraan Sepak Bola Liga Pelajar Daerah (LPD) se-Aceh",
        "Pemain Terbaik & Top Scorer Pelajar Piala Rektor USK"
      ],
      en: [
        "1st Place in Aceh Dispora Cup Futsal Tournament (2024)",
        "2nd Place in Regional Students Soccer League (LPD) across Aceh",
        "Best Player & Top Scorer at USK Rector's Student Cup"
      ]
    },
    memberCount: 40
  },
  {
    id: "scout",
    name: "Ambalan Pramuka SMAN Mosa",
    acronym: "APM",
    category: "leadership",
    categoryLabel: { id: "Kepemimpinan & Karakter", en: "Leadership & Character" },
    coach: "Drs. H. Ismail, M.Si",
    description: {
      id: "Organisasi kepanduan resmi yang melatih kemandirian, ketangguhan fisik, kepemimpinan taktis, dan kepedulian sosial berlandaskan Dasa Darma Pramuka.",
      en: "Official scouting organization that trains independence, physical resilience, tactical leadership, and social care based on the Scout's Promise."
    },
    achievements: {
      id: [
        "Juara Umum Kemah Bakti Pramuka Penegak se-Provinsi Aceh (2024)",
        "Penghargaan Lencana Melati Pramuka Garuda Berprestasi",
        "Juara 1 Lomba Pionering Kreatif & Sandi Morse Tingkat Daerah"
      ],
      en: [
        "Overall Champion of Rover Scouts Camp across Aceh Province (2024)",
        "Garuda Scout Outstanding Achievement Award",
        "1st Place in Regional Creative Pioneering & Morse Code Competition"
      ]
    },
    memberCount: 65
  },
  {
    id: "mec",
    name: "Mosa English Club",
    acronym: "MEC",
    category: "language",
    categoryLabel: { id: "Bahasa & Komunikasi", en: "Language & Communication" },
    coach: "Sarah, M.A.",
    description: {
      id: "Klub seru untuk meningkatkan kefasihan berbahasa Inggris secara santai dan mendalam melalui speech contest, storytelling, dan creative writing.",
      en: "A fun club to improve English fluency casually and deeply through speech contests, storytelling, and creative writing sessions."
    },
    achievements: {
      id: [
        "Juara 1 Lomba Pidato Bahasa Inggris (Speech Contest) Universitas Syiah Kuala (2024)",
        "Juara 1 Storytelling Pelajar Tingkat Regional Sumatera Utara - Aceh",
        "Finalis Lomba Menulis Esai Bahasa Inggris Nasional"
      ],
      en: [
        "1st Place in English Speech Contest at Syiah Kuala University (2024)",
        "1st Place in Student Storytelling Regional North Sumatra - Aceh",
        "Finalist in National English Essay Writing Competition"
      ]
    },
    memberCount: 35
  }
];

interface ClubListClientProps {
  locale: Locale;
  dict: any;
}

export function ClubListClient({ locale, dict }: ClubListClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categories = [
    { value: "all", label: locale === "id" ? "Semua Club" : "All Clubs" },
    { value: "academic", label: locale === "id" ? "Akademik" : "Academic" },
    { value: "language", label: locale === "id" ? "Bahasa" : "Languages" },
    { value: "arts", label: locale === "id" ? "Seni & Budaya" : "Arts & Culture" },
    { value: "sports", label: locale === "id" ? "Olahraga" : "Sports" },
    { value: "leadership", label: locale === "id" ? "Kepemimpinan" : "Leadership" }
  ];

  const filteredClubs = CLUBS_DATA.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description[locale].toLowerCase().includes(searchQuery.toLowerCase());
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
            // Asymmetrical grid column calculations:
            // First 2 clubs (MSC and MDS) span 6 columns on lg, 3 on md
            // SJP spans 12 columns (full width row for visual relief), MFC and APM span 6 columns, etc.
            let colSpan = "col-span-1 md:col-span-6 lg:col-span-6";
            if (club.id === "jeumpa-puteh") {
              colSpan = "col-span-1 md:col-span-6 lg:col-span-12";
            } else if (club.id === "scout") {
              colSpan = "col-span-1 md:col-span-6 lg:col-span-7";
            } else if (club.id === "mec") {
              colSpan = "col-span-1 md:col-span-6 lg:col-span-5";
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
                <div className="h-full rounded-[2rem] bg-zinc-100/60 dark:bg-zinc-800/40 p-2 border border-zinc-200/50 dark:border-zinc-700/30 transition-transform duration-500 group-hover:scale-[1.015] shadow-sm hover:shadow-md">
                  {/* Inner Core */}
                  <div className="h-full flex flex-col justify-between rounded-[calc(2rem-0.5rem)] bg-white dark:bg-zinc-900 border border-zinc-200/30 dark:border-zinc-800/30 p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <div>
                      {/* Badge / Category and Acronym */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-[10px] uppercase font-bold tracking-[0.15em] text-emerald-700 dark:text-emerald-300 border border-emerald-500/10">
                          {club.categoryLabel[locale]}
                        </span>
                        <span className="font-sfpro text-sm font-bold text-zinc-400 dark:text-zinc-500">
                          {club.acronym}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-5 font-sfpro text-xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-2xl group-hover:text-[color:var(--primary)] transition-colors duration-300">
                        {club.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[color:var(--muted-foreground)]">
                        {club.description[locale]}
                      </p>

                      {/* Coach info */}
                      <div className="mt-5 flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 border-t border-dashed border-zinc-100 dark:border-zinc-800/60 pt-4">
                        <User className="size-4 text-emerald-600 dark:text-emerald-500" />
                        <span>
                          <strong>{locale === "id" ? "Pembina:" : "Coach:"}</strong> {club.coach}
                        </span>
                      </div>
                    </div>

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
                      <button className="inline-flex items-center gap-2 rounded-full bg-zinc-50 hover:bg-[color:var(--primary)] text-zinc-800 hover:text-white dark:bg-zinc-800/50 dark:hover:bg-[color:var(--primary)] dark:text-zinc-200 px-4.5 py-2 text-xs font-bold border border-zinc-200/60 dark:border-zinc-700/60 hover:border-transparent transition-all duration-300 cursor-pointer active:scale-95 group-hover:shadow-sm">
                        <span>{locale === "id" ? "Gabung Club" : "Join Club"}</span>
                        <div className="w-5 h-5 rounded-full bg-zinc-200/50 dark:bg-zinc-700/50 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </button>
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
