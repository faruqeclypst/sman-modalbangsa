import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { Container } from "@/components/ui/container";
import {
  getCategoryTerms,
  getFeaturedImageUrl,
} from "@/lib/wp";
import {
  decodeHtmlEntities,
  formatDate,
  stripHtml,
  truncate,
} from "@/lib/utils";

interface LatestNewsProps {
  posts: WPPost[];
  locale: Locale;
  dict: Dictionary;
}

function BentoCard({
  post,
  locale,
  size,
}: {
  post: WPPost;
  locale: Locale;
  size: "large" | "medium" | "small";
}) {
  const title = decodeHtmlEntities(post.title.rendered);
  const date = formatDate(post.date, locale);
  const category = getCategoryTerms(post)[0];
  const imageUrl = getFeaturedImageUrl(post);
  const excerpt = truncate(stripHtml(post.excerpt?.rendered ?? ""), 100);

  const href = `/${locale}/berita/${post.id}`;

  if (size === "large") {
    return (
      <Link
        href={href}
        className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-8">
          {category ? (
            <span className="mb-2 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {decodeHtmlEntities(category.name)}
            </span>
          ) : null}
          <h3 className="line-clamp-3 text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">
            {title}
          </h3>
          {excerpt ? (
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {excerpt}
            </p>
          ) : null}
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/70">
            <Calendar className="size-3.5" aria-hidden />
            {date}
          </p>
        </div>
      </Link>
    );
  }

  if (size === "medium") {
    return (
      <Link
        href={href}
        className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex h-full flex-col justify-end p-5 text-white">
          {category ? (
            <span className="mb-2 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
              {decodeHtmlEntities(category.name)}
            </span>
          ) : null}
          <h3 className="line-clamp-2 text-base font-bold leading-snug sm:text-lg">
            {title}
          </h3>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/70">
            <Calendar className="size-3" aria-hidden />
            {date}
          </p>
        </div>
      </Link>
    );
  }

  // small
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative flex h-full flex-col justify-end p-4 text-white">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">
          {title}
        </h3>
        <p className="mt-1.5 text-[11px] text-white/70">{date}</p>
      </div>
    </Link>
  );
}

export function LatestNews({ posts, locale, dict }: LatestNewsProps) {
  if (!posts.length) return null;

  // Bento layout: 1 large (2×2), 2 medium (1×1 tall), 2 small (1×1)
  const [hero, ...rest] = posts;
  const mediums = rest.slice(0, 2);
  const smalls = rest.slice(2, 4);

  return (
    <section
      aria-labelledby="latest-news-title"
      className="bg-[color:var(--background)] py-14 sm:py-16"
    >
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            id="latest-news-title"
            className="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
          >
            {dict.news.latestTitle}
          </h2>
          <Link
            href={`/${locale}/berita`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--primary)] px-4 py-2 text-sm font-medium text-[color:var(--primary)] transition-colors hover:bg-[color:var(--primary)] hover:text-white"
          >
            {dict.news.viewAll}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:auto-rows-[220px] lg:grid-cols-4 lg:gap-4">
          {/* Large card — spans 2 cols × 2 rows */}
          <BentoCard post={hero} locale={locale} size="large" />

          {/* Medium cards — each spans 1 col × 1 row but taller feel */}
          {mediums.map((post) => (
            <BentoCard key={post.id} post={post} locale={locale} size="medium" />
          ))}

          {/* Small cards */}
          {smalls.map((post) => (
            <BentoCard key={post.id} post={post} locale={locale} size="small" />
          ))}
        </div>
      </Container>
    </section>
  );
}
