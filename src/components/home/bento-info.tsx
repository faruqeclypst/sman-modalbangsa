"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  NotebookPen,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { animate, stagger } from "animejs";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { decodeHtmlEntities, formatDate, stripHtml, truncate } from "@/lib/utils";
import { getFeaturedImageUrl } from "@/lib/wp";
import { Container } from "@/components/ui/container";

interface BentoInfoProps {
  locale: Locale;
  dict: Dictionary;
  pengumuman: WPPost[];
  agenda: WPPost[];
  editorial: WPPost[];
}

// ============ Mini Calendar ============

function MiniCalendar({ locale }: { locale: Locale }) {
  const [baseDate, setBaseDate] = React.useState(() => new Date());

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const month = baseDate.getMonth();
  const year = baseDate.getFullYear();

  const monthName = baseDate.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    month: "long",
    year: "numeric",
  });

  // Get 5 days centered around today
  const centerDate = month === todayMonth && year === todayYear ? todayDate : 1;
  const days: Date[] = [];
  for (let i = -2; i <= 2; i++) {
    const d = new Date(year, month, centerDate + i);
    days.push(d);
  }

  const dayNames = locale === "id"
    ? ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[color:var(--primary)]">
          {monthName}
        </span>
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={() => setBaseDate(new Date(year, month - 1, 1))}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setBaseDate(new Date(year, month + 1, 1))}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Next month"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2 text-center">
        {days.map((d) => {
          const isToday =
            d.getDate() === todayDate &&
            d.getMonth() === todayMonth &&
            d.getFullYear() === todayYear;
          return (
            <div
              key={d.toISOString()}
              className={`flex flex-col items-center rounded-xl py-2.5 transition-colors ${isToday
                ? "bg-[color:var(--primary)] text-white shadow-md shadow-emerald-200"
                : "text-gray-500 hover:bg-gray-50"
                }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wide">
                {dayNames[d.getDay()]}
              </span>
              <span className="mt-1 text-xl font-bold leading-none">
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Featured Agenda Card ============

function FeaturedAgenda({ post, locale }: { post: WPPost; locale: Locale }) {
  const title = decodeHtmlEntities(post.title.rendered);
  const imageUrl = getFeaturedImageUrl(post);
  const excerpt = truncate(stripHtml(post.excerpt?.rendered ?? ""), 120);
  const postDate = new Date(post.date);
  const time = postDate.toLocaleTimeString(locale === "id" ? "id-ID" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = formatDate(post.date, locale);

  return (
    <Link
      href={`/${locale}/agenda/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl"
    >
      {/* Background */}
      <div className="relative min-h-[320px] flex-1 sm:min-h-[360px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#14532d] to-[#052e16]">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }} />
            <Calendar className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              <Clock className="size-3" aria-hidden />
              {time}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              <Calendar className="size-3" aria-hidden />
              {dateStr}
            </span>
          </div>

          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white sm:text-2xl">
            {title}
          </h3>

          {excerpt ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
              {excerpt}
            </p>
          ) : null}

          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100">
            {locale === "id" ? "Selengkapnya" : "Read more"}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============ Agenda List Item ============

function AgendaListItem({ post, locale }: { post: WPPost; locale: Locale }) {
  const title = decodeHtmlEntities(post.title.rendered);
  const postDate = new Date(post.date);
  const day = postDate.getDate();
  const monthShort = postDate.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    month: "short",
  });
  const time = postDate.toLocaleTimeString(locale === "id" ? "id-ID" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isPast = postDate < new Date();

  return (
    <Link
      href={`/${locale}/agenda/${post.slug}`}
      className="group flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:ring-[color:var(--primary)] hover:shadow-md"
    >
      {/* Date badge */}
      <div
        className={`flex size-14 flex-shrink-0 flex-col items-center justify-center rounded-xl ${isPast
          ? "bg-gray-50 text-gray-400"
          : "bg-gradient-to-br from-emerald-50 to-emerald-100 text-[color:var(--primary)]"
          }`}
      >
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="mt-0.5 text-[10px] font-bold uppercase">{monthShort}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-semibold text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
          {title}
        </p>
        <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3" aria-hidden />
          {time} • {formatDate(post.date, locale)}
        </p>
      </div>

      {/* Status */}
      {isPast ? (
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500">
          {locale === "id" ? "Selesai" : "Done"}
        </span>
      ) : (
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
          {locale === "id" ? "Mendatang" : "Upcoming"}
        </span>
      )}
    </Link>
  );
}

// ============ Scroll Animation Hook ============

function useScrollAnimate(ref: React.RefObject<HTMLElement | null>, selector: string) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    // Set initial state
    targets.forEach((t) => {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = "translateY(32px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(targets, {
              opacity: [0, 1],
              translateY: [32, 0],
              delay: stagger(100, { start: 0 }),
              duration: 700,
              ease: "outQuint",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, selector]);
}

// ============ Main Component ============

export function BentoInfo({
  locale,
  dict,
  pengumuman: _pengumuman,
  agenda,
  editorial,
}: BentoInfoProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  useScrollAnimate(sectionRef, "[data-animate]");

  return (
    <section ref={sectionRef} id="info" aria-label="Informasi" className="bg-[color:var(--background)] py-14 sm:py-16">
      <Container>
        {/* Section Header */}
        <div className="mb-8" data-animate>
          <h2 className="text-xl font-bold text-[color:var(--foreground)] sm:text-2xl">
            <Link
              href={`/${locale}/agenda`}
              className="hover:text-[color:var(--primary)] transition-colors"
            >
              {dict.cpt.agenda.title}
            </Link>
          </h2>
          <p className="text-sm text-muted-foreground">{dict.cpt.agenda.subtitle}</p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Left - Featured Agenda + List */}
          <div className="flex flex-col gap-4">
            {agenda[0] ? (
              <div data-animate>
                <FeaturedAgenda post={agenda[0]} locale={locale} />
              </div>
            ) : (
              <div data-animate className="flex min-h-[320px] items-center justify-center rounded-2xl bg-gray-50">
                <div className="text-center">
                  <Calendar className="mx-auto size-12 text-gray-300" />
                  <p className="mt-3 text-sm text-muted-foreground">{dict.cpt.agenda.empty}</p>
                </div>
              </div>
            )}

            {/* Agenda List */}
            {agenda.length > 1 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {agenda.slice(1, 5).map((post) => (
                  <div key={post.id} data-animate>
                    <AgendaListItem post={post} locale={locale} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Mini Calendar */}
            <div data-animate>
              <MiniCalendar locale={locale} />
            </div>

            {/* Editorial */}
            <div data-animate className="rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <NotebookPen className="size-4 text-gray-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {dict.cpt.editorial.label}
                </h3>
              </div>
              <ul className="mt-3 space-y-3">
                {editorial.slice(0, 2).map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/${locale}/editorial/${post.slug}`}
                      className="group block"
                    >
                      <p className="line-clamp-2 text-sm font-medium leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                        {decodeHtmlEntities(post.title.rendered)}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {formatDate(post.date, locale)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
