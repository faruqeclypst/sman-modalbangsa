"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Compass, Target, Award } from "lucide-react";
import type { Locale } from "@/i18n/config";

interface VisionMissionClientProps {
  lang: Locale;
  dict: any;
}

export function VisionMissionClient({ lang, dict }: VisionMissionClientProps) {
  // Extract content
  const visionTitle = dict.profile.vision.title;
  const visionBody = dict.profile.vision.body;
  const missionTitle = dict.profile.mission.title;
  const missionItems = dict.profile.mission.items || [];
  const objectivesTitle = dict.profile.objectives.title;
  const objectivesItems = dict.profile.objectives.items || [];

  // Entry animations
  const fUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1] as const },
    },
  };

  const containerVar = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-[color:var(--background)] py-16 sm:py-24">
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      <Container size="xl" className="space-y-24 sm:space-y-32">

        {/* 1. VISI SECTION (Elegant Centerpiece) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={fUp}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-1.5 border border-emerald-500/10">
            <Compass className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              {visionTitle} SMAN Modal Bangsa
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sfpro font-bold tracking-tight text-zinc-950 dark:text-white leading-relaxed pt-2">
            &ldquo;<span className="font-romulo font-normal italic text-emerald-600 dark:text-emerald-400">{visionBody.split(" ")[0]}</span> {visionBody.split(" ").slice(1).join(" ")}&rdquo;
          </h2>
          <div className="flex justify-center pt-2">
            <span className="h-0.5 w-16 bg-emerald-600/30 rounded-full" />
          </div>
        </motion.div>

        {/* 2. MISI SECTION (Clean Editorial List) */}
        <div className="space-y-12 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={fUp}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-1.5 border border-emerald-500/10 mb-3">
              <Target className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                {missionTitle} SMAN Modal Bangsa
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5% 0px" }}
            className="grid gap-x-12 gap-y-10 grid-cols-1 md:grid-cols-2"
          >
            {missionItems.map((item: string, i: number) => (
              <motion.div
                key={i}
                variants={fUp}
                className="flex gap-6 items-start border-b border-zinc-100 dark:border-zinc-800/60 pb-8"
              >
                {/* Large Serif Number */}
                <span className="font-romulo font-light italic text-4xl sm:text-5xl text-emerald-600/30 dark:text-emerald-400/20 select-none shrink-0 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-medium text-sm sm:text-base text-zinc-800 dark:text-zinc-300 leading-relaxed pt-1">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3. TUJUAN SECTION (Institutional Objectives - Structured Grid) */}
        <div className="space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={fUp}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-1.5 border border-emerald-500/10 mb-3">
              <Award className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                {objectivesTitle}
              </span>
            </div>
            <h3 className="font-sfpro font-bold text-3xl sm:text-4xl text-zinc-950 dark:text-white">
              {lang === "id" ? "Tujuan & Target Sekolah" : "School Objectives"}
            </h3>
          </motion.div>

          <motion.div
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5% 0px" }}
            className="grid gap-x-16 gap-y-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
          >
            {objectivesItems.map((item: string, i: number) => (
              <motion.div
                key={i}
                variants={fUp}
                className="flex gap-4 items-start pb-6 border-b border-zinc-100 dark:border-zinc-800/40"
              >
                {/* Small indicator circle */}
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 dark:bg-emerald-950/40 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {i + 1}
                </div>
                <p className="font-medium text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </Container>
    </div>
  );
}
