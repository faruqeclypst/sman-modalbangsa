import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Cpu,
  FlaskConical,
  Languages,
  type LucideIcon,
  Music,
  Trophy,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

interface StudentAchievementsProps {
  locale: Locale;
  dict: Dictionary;
}

// Map an item's category to a representative icon.
const categoryIcons: Record<string, LucideIcon> = {
  Akademik: BookOpen,
  Academic: BookOpen,
  Teknologi: Cpu,
  Technology: Cpu,
  Riset: FlaskConical,
  Research: FlaskConical,
  Seni: Music,
  Arts: Music,
  Bahasa: Languages,
  Language: Languages,
  Olahraga: Trophy,
  Sports: Trophy,
};

// Map level (Internasional / National / Provinsi / etc.) to a tone class.
function levelTone(level: string): string {
  const lower = level.toLowerCase();
  if (lower.startsWith("inter"))
    return "bg-amber-50 text-amber-700 border-amber-200";
  if (lower.startsWith("nasi") || lower.startsWith("nat"))
    return "bg-rose-50 text-rose-700 border-rose-200";
  if (lower.startsWith("prov") || lower.startsWith("regi"))
    return "bg-sky-50 text-sky-700 border-sky-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export function StudentAchievements({ locale, dict }: StudentAchievementsProps) {
  const ach = dict.homeAchievements;

  return (
    <section
      aria-labelledby="home-achievements-title"
      className="relative overflow-hidden bg-[color:var(--background)] py-14 sm:py-16"
    >
      {/* Soft background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 100% 0%, rgba(245,158,11,0.08) 0, transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(30,58,138,0.07) 0, transparent 60%)",
        }}
      />

      <Container className="relative">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--secondary)]/30 bg-[color:var(--secondary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--secondary)]">
              <Award className="size-3.5" aria-hidden />
              {ach.kicker}
            </p>
            <h2
              id="home-achievements-title"
              className="mt-3 text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
            >
              {ach.title}
            </h2>
            <p className="mt-2 text-[color:var(--muted-foreground)]">
              {ach.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/prestasi`}
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white sm:self-auto"
          >
            {ach.viewAll}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {/* Stats */}
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ach.stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-white/30 bg-white/60 p-4 shadow-sm backdrop-blur-md sm:p-5"
            >
              <p className="text-2xl font-extrabold tracking-tight text-[color:var(--primary)] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-[color:var(--muted-foreground)] sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>

        {/* Achievement grid */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ach.items.map((item) => {
            const Icon = categoryIcons[item.category] ?? Trophy;
            return (
              <li
                key={`${item.title}-${item.year}`}
                className="group relative overflow-hidden rounded-xl border border-white/30 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/50 hover:bg-white/80 hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute -right-6 -top-6 size-24 rounded-full bg-[color:var(--secondary)]/10 transition-transform group-hover:scale-110"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelTone(item.level)}`}
                  >
                    {item.level}
                  </span>
                </div>
                <h3 className="relative mt-4 text-base font-semibold leading-snug text-[color:var(--foreground)]">
                  {item.title}
                </h3>
                <div className="relative mt-2 flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                  <Badge variant="muted">{item.category}</Badge>
                  <span>•</span>
                  <span>{item.year}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
