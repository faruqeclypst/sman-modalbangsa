"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ExternalLink, Newspaper } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import type { DisdikBerita } from "@/lib/disdik-aceh";
import type { MediaNewsItem } from "@/lib/media-news";
import { Container } from "@/components/ui/container";

// Helpers inlined to avoid server-only imports in client component
function decodeHtml(str: string) {
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8230;/g, "\u2026")
    .replace(/<[^>]*>/g, "");
}

function fmtDate(dateStr: string, locale: Locale) {
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === "id" ? "id-ID" : "en-US",
      { day: "numeric", month: "long", year: "numeric" },
    );
  } catch {
    return dateStr;
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

/** Map known media source names to their actual domains for favicon */
const SOURCE_DOMAINS: Record<string, string> = {
  "serambinews.com": "serambinews.com",
  "ajnn.net": "ajnn.net",
  "meugahnews.com": "meugahnews.com",
  "nukilan.id": "nukilan.id",
  "kompas.com": "kompas.com",
  "detik.com": "detik.com",
  "tribunnews.com": "tribunnews.com",
  "antaranews.com": "antaranews.com",
  "cnnindonesia.com": "cnnindonesia.com",
  "liputan6.com": "liputan6.com",
  "republika.co.id": "republika.co.id",
  "tempo.co": "tempo.co",
  "kumparan.com": "kumparan.com",
  "okezone.com": "okezone.com",
  "suara.com": "suara.com",
  "merdeka.com": "merdeka.com",
  "dialeksis.com": "dialeksis.com",
  "lintasnasional.com": "lintasnasional.com",
  "acehtrend.com": "acehtrend.com",
};

function getSourceDomain(source: string, link: string): string {
  // Try matching source name against known domains
  const lower = source.toLowerCase();
  for (const [key, domain] of Object.entries(SOURCE_DOMAINS)) {
    if (lower.includes(key.split(".")[0])) return domain;
  }
  // Fallback: try to extract from source URL attribute in RSS (stored in link for Google News)
  // Google News links redirect, so just use source text as domain guess
  if (source.includes(".")) return source.toLowerCase();
  return extractDomain(link) || "google.com";
}

interface LatestNewsProps {
  posts: WPPost[];
  disdikBerita: DisdikBerita[];
  mediaNews: MediaNewsItem[];
  locale: Locale;
  dict: Dictionary;
}

// ============ Hero Slider (main card, auto-rotates) ============

function HeroSlider({ posts, locale }: { posts: WPPost[]; locale: Locale }) {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (posts.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % posts.length), 5000);
    return () => clearInterval(t);
  }, [posts.length]);

  const post = posts[idx];
  if (!post) return null;

  const title = decodeHtml(post.title.rendered);
  const date = fmtDate(post.date, locale);
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const category = post._embedded?.["wp:term"]?.flat().find((t) => t.taxonomy === "category");
  const href = `/${locale}/berita/${post.slug}`;

  return (
    <Link href={href} className="group relative col-span-2 overflow-hidden rounded-2xl bg-black">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-8">
        {category ? (
          <span className="mb-2 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {decodeHtml(category.name)}
          </span>
        ) : null}
        <h3 className="line-clamp-2 text-base font-bold leading-tight sm:text-lg lg:text-xl">
          {title}
        </h3>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/70">
          <Calendar className="size-3.5" aria-hidden />
          {date}
        </p>
        {/* Dots */}
        {posts.length > 1 && (
          <div className="mt-3 flex gap-1.5">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.preventDefault(); setIdx(i); }}
                aria-label={`Berita ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// ============ Rotating Small Card ============

function RotatingCard({ posts, locale }: { posts: WPPost[]; locale: Locale }) {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (posts.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % posts.length), 4000);
    return () => clearInterval(t);
  }, [posts.length]);

  const post = posts[idx];
  if (!post) return null;

  const title = decodeHtml(post.title.rendered);
  const date = fmtDate(post.date, locale);
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const href = `/${locale}/berita/${post.slug}`;

  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl bg-black">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-4 text-white">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">{title}</h3>
        <p className="mt-1.5 text-[11px] text-white/70">{date}</p>
      </div>
    </Link>
  );
}

// ============ Media News Box (vertical ticker — items slide down one by one) ============

function MediaNewsBox({ items, locale }: { items: MediaNewsItem[]; locale: Locale }) {
  const VISIBLE_COUNT = 3;
  const [topIndex, setTopIndex] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= VISIBLE_COUNT) return;
    const t = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;

  // Build visible list by wrapping around
  const visible: MediaNewsItem[] = [];
  for (let i = 0; i < Math.min(VISIBLE_COUNT, items.length); i++) {
    visible.push(items[(topIndex + i) % items.length]);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white">
      <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-gray-50 px-4 py-2.5">
        <Newspaper className="size-3.5 text-[color:var(--primary)]" />
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
          {locale === "id" ? "Liputan Media" : "Media Coverage"}
        </h4>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={topIndex}
            initial={{ y: "-33.33%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "33.33%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col divide-y divide-[color:var(--border)]"
          >
            {visible.map((item, idx) => (
              <a
                key={`${item.title}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center gap-3 px-3 py-3 transition-colors hover:bg-gray-50"
              >
                {/* Thumbnail — use favicon/logo of the source website */}
                <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${getSourceDomain(item.source, item.link)}&sz=64`}
                    alt={item.source}
                    fill
                    unoptimized
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-medium leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                    {item.title}
                  </p>
                  {item.source ? (
                    <p className="mt-0.5 text-[10px] text-[color:var(--muted-foreground)]">
                      {item.source}
                    </p>
                  ) : null}
                </div>
                <ExternalLink className="size-3 shrink-0 text-[color:var(--muted-foreground)] opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============ Disdik News Card ============

function DisdikNewsCard({ berita }: { berita: DisdikBerita }) {
  const title = decodeHtml(berita.judul);
  const imageUrl = berita.gambar
    ? berita.gambar.startsWith("http")
      ? berita.gambar
      : `https://disdik.acehprov.go.id/thumbnail/300x200${berita.gambar}`
    : "";
  const articleUrl = berita.slug
    ? berita.slug.startsWith("http")
      ? berita.slug
      : `https://disdik.acehprov.go.id${berita.slug}`
    : "";

  return (
    <a
      href={articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 transition-all hover:border-[color:var(--primary)] hover:shadow-md"
    >
      <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[color:var(--muted)]">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill unoptimized sizes="96px" className="object-cover" />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {berita.kategori?.nama ? (
          <span className="mb-1 inline-flex w-fit items-center rounded-full bg-[color:var(--primary)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--primary)]">
            {berita.kategori.nama}
          </span>
        ) : null}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
          {title}
        </h3>
        <div className="mt-auto flex items-center gap-2 text-[11px] text-muted-foreground">
          <Calendar className="size-3" aria-hidden />
          {berita.tanggal}
          <ExternalLink className="size-3 opacity-50" aria-hidden />
        </div>
      </div>
    </a>
  );
}

// ============ Main Component ============

export function LatestNews({
  posts,
  disdikBerita,
  mediaNews,
  locale,
  dict,
}: LatestNewsProps) {
  // Split posts: first 5 for hero slider, rest for rotating small card
  const heroPosts = posts.slice(0, 5);
  const rotatingPosts = posts.slice(5);

  return (
    <section
      aria-labelledby="latest-news-title"
      className="bg-[color:var(--background)] py-14 sm:py-16"
    >
      <Container>
        <div className="flex items-center justify-between">
          <h2
            id="latest-news-title"
            className="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
          >
            {dict.news.latestTitle}
          </h2>
        </div>

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                <Link
                  href={`/${locale}/berita`}
                  className="hover:text-[color:var(--primary)] transition-colors"
                >
                  {dict.news.schoolNews ?? "Berita Sekolah"}
                </Link>
              </h3>
            </div>

            {posts.length > 0 ? (
              <div className="grid flex-1 auto-rows-[1fr] grid-cols-2 gap-3">
                {/* Hero slider — spans 2 cols */}
                <HeroSlider posts={heroPosts} locale={locale} />
                {/* Bottom left: rotating card */}
                {rotatingPosts.length > 0 ? (
                  <RotatingCard posts={rotatingPosts} locale={locale} />
                ) : null}
                {/* Bottom right: media coverage */}
                <MediaNewsBox items={mediaNews} locale={locale} />
              </div>
            ) : (
              <p className="text-muted-foreground">
                {dict.news.noNews ?? "Belum ada berita"}
              </p>
            )}
          </div>

          {/* Right Column - Disdik (unchanged) */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                <a
                  href="https://disdik.acehprov.go.id/berita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--primary)] transition-colors"
                >
                  {dict.news.disdikNews ?? "Berita Disdik Aceh"}
                </a>
              </h3>
            </div>

            {disdikBerita.length > 0 ? (
              <div className="flex flex-1 flex-col justify-between gap-3">
                {disdikBerita.slice(0, 5).map((berita, idx) => (
                  <DisdikNewsCard key={berita.slug || idx} berita={berita} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                {dict.news.noNews ?? "Belum ada berita"}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
