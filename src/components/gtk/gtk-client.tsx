"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { decodeHtmlEntities, cn } from "@/lib/utils";
import { getFeaturedImageUrl, getTermsByTaxonomy } from "@/lib/wp";
import type { WPPost } from "@/lib/wp-types";
import type { Dictionary } from "@/i18n/dictionaries";
import { GraduationCap, Award, BookOpen } from "lucide-react";

interface GTKClientListProps {
  posts: WPPost[];
  dict: Dictionary;
  lang: string;
}

export function GTKClientList({ posts, dict, lang }: GTKClientListProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectedPost = posts[selectedIndex] || posts[0];
  if (!selectedPost) return null;

  const isId = lang === "id";
  const name = decodeHtmlEntities(selectedPost.title.rendered);
  const imageUrl = getFeaturedImageUrl(selectedPost);
  const jab = getTermsByTaxonomy(selectedPost, "jab")[0];
  const stts = getTermsByTaxonomy(selectedPost, "stts")[0];

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16 items-start">

      {/* Left Column: Character Presentation Panel (Genshin/Game Style Showcase) */}
      <div className="lg:sticky lg:top-24 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPost.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Portrait Image Container: Double-Bezel Frame */}
            <div className="rounded-[2.5rem] bg-zinc-150/60 dark:bg-zinc-800/40 p-2.5 border border-zinc-200/50 dark:border-zinc-700/30 shadow-md overflow-hidden">
              <div className="rounded-[calc(2.5rem-0.625rem)] overflow-hidden aspect-[4/5] relative bg-zinc-100 dark:bg-zinc-950">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-emerald-950/20 dark:to-emerald-900/10">
                    <div className="flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 size-24 shadow-md">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-4xl font-sfpro">
                        {initials}
                      </span>
                    </div>
                  </div>
                )}

                {/* Gradient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                {/* Overlaid details at the bottom of the photo card */}
                <div className="absolute bottom-6 inset-x-6 z-20 space-y-3 text-white">

                  {/* Row 1: Index & Badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-light text-white/70 tracking-wider">
                      {`0${selectedIndex + 1}`}
                    </span>
                    <div className="h-px w-6 bg-white/40" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/70 border border-emerald-500/20 px-2 py-0.5 rounded backdrop-blur-sm">
                      {isId ? "Profil Guru" : "Staff Profile"}
                    </span>
                  </div>

                  {/* Row 2: Name */}
                  <h3 className="font-sfpro text-xl md:text-2xl font-black tracking-tight leading-none uppercase drop-shadow-sm">
                    {name}
                  </h3>

                  {/* Row 3: Role & Status Badges */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {jab ? (
                      <span className="inline-flex items-center rounded bg-emerald-600/95 border border-emerald-500/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                        {decodeHtmlEntities(jab.name)}
                      </span>
                    ) : null}
                    {stts ? (
                      <span className="inline-flex items-center rounded bg-white/10 backdrop-blur-sm border border-white/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-gray-200">
                        {decodeHtmlEntities(stts.name)}
                      </span>
                    ) : null}
                  </div>

                  {/* Row 4: Motto */}
                  <p className="text-[9px] font-medium text-gray-300 italic flex items-center gap-1.5 leading-relaxed border-t border-white/10 pt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>
                      {isId
                        ? "Mendidik generasi pemimpin masa depan Modal Bangsa."
                        : "Nurturing the future leaders of Modal Bangsa."}
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Column: Character Grid Selection Area */}
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3 flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            {isId ? "Guru dan Tenaga Kependidikan" : "Teachers & Staff"}
          </h4>
          <span className="text-[10px] font-semibold text-zinc-550 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-850 px-2.5 py-1 rounded-md">
            {posts.length} {isId ? "Guru & Staf" : "Teachers & Staff"}
          </span>
        </div>

        {/* Thumbnail Avatar Grid */}
        <div className="grid grid-cols-3 gap-3.5 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {posts.map((post, index) => {
            const thumbnailName = decodeHtmlEntities(post.title.rendered);
            const thumbnailImg = getFeaturedImageUrl(post);
            const isActive = index === selectedIndex;

            const initialsThumb = thumbnailName
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase();

            return (
              <button
                key={post.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-xl"
                aria-label={`Select ${thumbnailName}`}
              >
                {/* Bezel wrapper with active border trigger */}
                <div className={cn(
                  "w-full rounded-xl p-1 overflow-hidden transition-all duration-300 shadow-sm",
                  isActive
                    ? "bg-emerald-500 shadow-emerald-500/20 border border-emerald-500"
                    : "bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/30 hover:border-zinc-300 dark:hover:border-zinc-650"
                )}>
                  {/* Concentric Inner Photo Shell */}
                  <div className="rounded-[calc(0.75rem-0.125rem)] overflow-hidden aspect-[3/4] relative bg-white dark:bg-zinc-950">
                    {thumbnailImg ? (
                      <Image
                        src={thumbnailImg}
                        alt={thumbnailName}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 30vw, 15vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-50/50 to-emerald-100/30">
                        <span className="font-bold text-emerald-600/70 text-base font-sfpro">
                          {initialsThumb}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Micro-thumbnail name below avatar */}
                <span className={cn(
                  "mt-1.5 block w-full text-[10px] font-bold text-center truncate px-0.5 transition-colors font-sfpro",
                  isActive
                    ? "text-[#16a34a]"
                    : "text-zinc-650 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white"
                )}>
                  {thumbnailName.split(",")[0] || thumbnailName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
