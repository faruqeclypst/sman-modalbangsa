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
}

export function NewsCard({
  post,
  locale,
  dict,
  variant = "default",
  priority = false,
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
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <FallbackImage />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                {categories[0] ? (
                  <Badge variant="primary" className="mb-3">
                    {decodeHtmlEntities(categories[0].name)}
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
      <MagicCard className="group flex h-full flex-col backdrop-blur-md">
        <Link href={href} className="flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--muted)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={altText}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <FallbackImage />
            )}
            {categories[0] ? (
              <Badge
                variant="primary"
                className="absolute left-3 top-3 shadow-sm"
              >
                {decodeHtmlEntities(categories[0].name)}
              </Badge>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--muted-foreground)]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" aria-hidden /> {date}
              </span>
              {author ? (
                <span className="inline-flex items-center gap-1.5">
                  <User className="size-3.5" aria-hidden /> {author}
                </span>
              ) : null}
              {post.views !== undefined && post.views !== null ? (
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="size-3.5" aria-hidden /> {post.views}
                </span>
              ) : null}
            </div>
            <h3 className="mt-2.5 line-clamp-2 text-base font-semibold leading-snug text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--primary)] sm:text-lg">
              {title}
            </h3>
            {excerpt ? (
              <p className="mt-2 line-clamp-3 text-sm text-[color:var(--muted-foreground)]">
                {excerpt}
              </p>
            ) : null}
            <span className="mt-auto pt-4 text-sm font-semibold text-[color:var(--primary)]">
              {dict.news.readMore}
            </span>
          </div>
        </Link>
      </MagicCard>
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
