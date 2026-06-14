import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, User } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import {
  getAuthorName,
  getCategoryTerms,
  getFeaturedImage,
  getThumbnailUrl,
} from "@/lib/wp";
import {
  decodeHtmlEntities,
  formatDate,
  stripHtml,
  truncate,
  cn,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";

interface NewsCardProps {
  post: WPPost;
  locale: Locale;
  dict: Dictionary;
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
  badge?: string;
}

export function NewsCard({
  post,
  locale,
  dict,
  variant = "default",
  priority = false,
  badge,
}: NewsCardProps) {
  const href = `/${locale}/berita/${post.slug}`;
  const title = decodeHtmlEntities(post.title.rendered);
  const excerpt = truncate(stripHtml(post.excerpt.rendered), 160);
  const author = getAuthorName(post);
  const date = formatDate(post.date, locale);
  const categories = getCategoryTerms(post).slice(0, 1);
  const media = getFeaturedImage(post);
  const imageUrl = getThumbnailUrl(post);
  const altText = media?.alt_text || title;

  const categoryName = categories[0] ? decodeHtmlEntities(categories[0].name) : "";
  const isUncategorized = categoryName.toLowerCase() === "uncategorized";
  const badgeText = badge || (categoryName && !isUncategorized ? categoryName : dict.nav.news);

  if (variant === "featured") {
    return (
      <FadeIn direction="up">
        <article className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-sm transition-all hover:shadow-lg">
          <Link href={href} className="block">
            <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--muted)] sm:aspect-[2/1]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  priority={priority}
                  unoptimized
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <FallbackImage />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                {badgeText ? (
                  <Badge variant="primary" className="mb-3">
                    {badgeText}
                  </Badge>
                ) : null}
                <h3 className="line-clamp-2 text-lg font-bold leading-tight sm:text-2xl">
                  {title}
                </h3>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/85">
                  {author ? (
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3.5" aria-hidden /> {author}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" aria-hidden /> {date}
                  </span>
                  {post.views !== undefined && post.views !== null ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="size-3.5" aria-hidden /> {post.views}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </Link>
        </article>
      </FadeIn>
    );
  }

  if (variant === "compact") {
    return (
      <FadeIn direction="none" delay={0.1}>
        <article className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[color:var(--muted)]">
          <Link href={href} className="flex w-full gap-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-[color:var(--muted)]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  unoptimized
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <FallbackImage compact />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                {title}
              </h3>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-[color:var(--muted-foreground)]">
                <Calendar className="size-3" aria-hidden /> {date}
              </p>
            </div>
          </Link>
        </article>
      </FadeIn>
    );
  }

  return (
    <FadeIn direction="up" className="h-full">
      <article className="group flex h-full flex-col bg-transparent transition-all duration-300">
        <Link href={href} className="flex h-full flex-col">
          {/* Image Container with rounded corners and scale on hover */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-50 mb-4 shadow-sm border border-gray-100/50">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={altText}
                fill
                priority={priority}
                unoptimized
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <FallbackImage />
            )}
            {categories[0] ? (
              <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm border border-white/20">
                {decodeHtmlEntities(categories[0].name)}
              </span>
            ) : null}
          </div>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 font-medium mb-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {date}
            </span>
            {author ? (
              <span className="inline-flex items-center gap-1">
                <User className="size-3.5" />
                {author}
              </span>
            ) : null}
            {post.views !== undefined && post.views !== null ? (
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3.5" />
                {post.views}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <h3 className="font-sfpro font-bold text-gray-900 text-base sm:text-lg leading-snug group-hover:text-emerald-600 transition-colors duration-300">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt ? (
            <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          ) : null}

          {/* Read More Link */}
          <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            {dict.news.readMore}
            <svg
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </article>
    </FadeIn>
  );
}

function FallbackImage({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--primary)]/15 via-[color:var(--accent)]/15 to-[color:var(--secondary)]/15"
    >
      <svg
        viewBox="0 0 32 32"
        width={compact ? 28 : 56}
        height={compact ? 28 : 56}
        fill="none"
        className="text-[color:var(--primary)]/60"
      >
        <path
          d="M16 4L3 10l13 6 13-6L16 4Z"
          fill="currentColor"
          opacity="0.55"
        />
        <path
          d="M8 14.6V20c0 1.1.6 2.1 1.6 2.7L16 26l6.4-3.3c1-.6 1.6-1.6 1.6-2.7v-5.4l-8 3.7-8-3.7Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
