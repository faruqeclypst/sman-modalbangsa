"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PjjPromoBannerProps {
  locale: Locale;
}

export function PjjPromoBanner({ locale }: PjjPromoBannerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isId = locale === "id";

  return (
    <section className="relative overflow-hidden bg-transparent py-12 sm:py-16">
      <Container>
        <div
          ref={containerRef}
          className="rounded-[2.5rem] bg-zinc-100/60 dark:bg-zinc-800/40 p-2.5 border border-zinc-200/50 dark:border-zinc-700/30 shadow-lg"
        >
          <div className="rounded-[calc(2.5rem-0.625rem)] bg-white dark:bg-zinc-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">

            {/* Left side: Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-sfpro font-bold tracking-[0.2em] text-[#16a34a] uppercase bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/10">
                  {isId ? "Program Nasional" : "National Program"}
                </span>
              </div>

              <h2 className="font-sfpro text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight uppercase">

                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 block sm:inline">
                  {isId ? "Program Pendidikan Jarak Jauh" : "Distance Learning Program"}{" "}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
                {isId
                  ? "Pendaftaran dibuka khusus untuk Anak Tidak Sekolah (ATS) dan Lulus Tidak Melanjutkan (LTMS) lulusan SMP/MTs sederajat tahun ajaran 2024/2025 dengan usia maksimal 18 tahun. Periode pendaftaran mulai 2 Juli hingga 31 Juli 2026."
                  : "Registration is open specifically for Out-of-School Children (ATS) and Graduates Not Continuing School (LTMS) who graduated from SMP/MTs in 2024/2025, aged maximum 18. Registration period from July 2 to July 31, 2026."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href={`/${locale}/spmb?tab=pjj`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#16a34a] hover:bg-[#118037] text-white font-sfpro font-bold tracking-wider py-3.5 px-8 text-xs transition-all duration-300 shadow-md hover:scale-105 active:scale-95 uppercase"
                >
                  <span>{isId ? "Info PJJ" : "Explore PJJ"}</span>
                  <div className="w-5.5 h-5.5 rounded-full bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="size-3" />
                  </div>
                </Link>
                <a
                  href="https://spmb.sman-modalbangsa.sch.id/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-550 text-zinc-800 dark:text-zinc-200 font-sfpro font-bold tracking-wider py-3.5 px-8 text-xs transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 uppercase"
                >
                  {isId ? "Daftar Sekarang" : "Register Now"}
                </a>
              </div>
            </div>

            {/* Right side: Framed Image */}
            <div className="lg:col-span-5 relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-md bg-zinc-100 group border border-zinc-200/50 dark:border-zinc-800">
              <Image
                src="/images/banner/pjj.png"
                alt="Program Pendidikan Jarak Jauh"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
