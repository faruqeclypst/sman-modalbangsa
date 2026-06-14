import Image from "next/image";
import { Quote } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";

interface HeadmasterSectionProps {
  dict: Dictionary;
}

const HEADMASTER = {
  name: "Misra, S.Pd., M.Pd",
  role: "Kepala Sekolah",
  photo: "/headmaster.png",
};

export function HeadmasterSection({ dict }: HeadmasterSectionProps) {
  return (
    <section aria-label={dict.profile.principal.title} className="relative overflow-hidden bg-transparent py-14 sm:py-16">
      {/* Background Watermark Mandala */}
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 translate-x-1/4 -translate-y-1/4 opacity-[0.03] text-emerald-800 pointer-events-none">
        <svg viewBox="0 0 500 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(0 250 250)" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(15 250 250)" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(30 250 250)" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(45 250 250)" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(60 250 250)" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(75 250 250)" />
          <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="250" cy="250" r="50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="absolute left-0 bottom-0 -z-10 h-72 w-72 -translate-x-1/4 translate-y-1/4 opacity-[0.02] text-emerald-800 pointer-events-none">
        <svg viewBox="0 0 500 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(45 250 250)" />
          <rect x="100" y="100" width="300" height="300" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(0 250 250)" />
        </svg>
      </div>

      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr_240px] lg:gap-10">
          {/* Left — Portrait photo with geometric background */}
          <div className="mx-auto w-full max-w-[220px] lg:mx-0 lg:max-w-none">
            <div className="relative">
              {/* Custom SVG arched background frame matching Aceh gate shape */}
              <div className="absolute inset-0 -z-10 scale-105 opacity-80">
                <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  <defs>
                    <linearGradient id="hm-bg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="hm-bg-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Decorative arched backplate */}
                  <path
                    d="M 12 300 L 12 110 C 12 50, 60 20, 120 20 C 180 20, 228 50, 228 110 L 228 300 Z"
                    fill="url(#hm-bg-green)"
                    stroke="url(#hm-bg-gold)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="120" cy="110" r="80" stroke="url(#hm-bg-gold)" strokeWidth="1" strokeOpacity="0.3" />
                  <circle cx="120" cy="110" r="60" stroke="url(#hm-bg-green)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3" />
                </svg>
              </div>

              {/* Photo - transparent PNG, no overflow hidden so bottom isn't cut */}
                <Image
                  src={HEADMASTER.photo}
                  alt={HEADMASTER.name}
                  width={220}
                  height={300}
                  className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-[0_8px_16px_rgba(5,150,105,0.15)]"
                  style={{ height: "auto" }}
                  unoptimized
                  priority
                />
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-bold text-[color:var(--foreground)]">{HEADMASTER.name}</p>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                {dict.nav.principal}
              </span>
            </div>
          </div>

          {/* Center — Greeting text */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Quote className="size-5" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {dict.profile.principal.title}
              </h2>
            </div>

            <p className="mt-4 text-base font-semibold text-emerald-700">
              {dict.profile.principal.greeting}
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              {dict.profile.principal.body}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <p className="text-sm font-semibold text-gray-800">
                {HEADMASTER.name}
              </p>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                {dict.nav.principal}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>

          {/* Right — School logo (HD, transparent, no box) */}
          <div className="hidden flex-col items-center justify-center lg:flex">
            <Image
              src="/logo.png"
              alt="Logo SMAN Modal Bangsa"
              width={192}
              height={192}
              className="h-48 w-48 object-contain"
              unoptimized
            />
            <p className="mt-4 text-center text-base font-bold text-gray-800">
              {dict.site.name}
            </p>
            <p className="mt-1 max-w-[180px] text-center text-xs text-gray-500">
              {dict.site.tagline}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
