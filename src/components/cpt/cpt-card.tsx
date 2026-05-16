import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImage, getFeaturedImageUrl } from "@/lib/wp";
import {
  decodeHtmlEntities,
  formatDate,
  stripHtml,
  truncate,
} from "@/lib/utils";

interface CPTCardProps {
  post: WPPost;
  locale: Locale;
  /** Path prefix relative to locale, e.g. "agenda" -> /[locale]/agenda/[id]. */
  basePath: string;
  /** Translated badge to render on the image (e.g. "Agenda", "Pengumuman"). */
  badge?: string;
  /** When true, optimizes for above-the-fold rendering. */
  priority?: boolean;
  /** Show the excerpt below the title. Defaults to true. */
  showExcerpt?: boolean;
}

export function CPTCard({
  post,
  locale,
  basePath,
  badge,
  priority = false,
  showExcerpt = true,
}: CPTCardProps) {
  const href = `/${locale}/${basePath}/${post.id}`;
  const title = decodeHtmlEntities(post.title.rendered);
  const excerpt = truncate(stripHtml(post.excerpt?.rendered ?? ""), 140);
  const date = formatDate(post.date, locale);
  const media = getFeaturedImage(post);
  const imageUrl = getFeaturedImageUrl(post);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/30 bg-white/60 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/50 hover:bg-white/80 hover:shadow-lg">
      <Link href={href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--muted)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={media?.alt_text || title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--primary)]/15 via-[color:var(--accent)]/15 to-[color:var(--secondary)]/15"
            >
              <svg
                viewBox="0 0 32 32"
                width="56"
                height="56"
                fill="none"
                className="text-[color:var(--primary)]/60"
              >
                <path d="M16 4L3 10l13 6 13-6L16 4Z" fill="currentColor" opacity="0.55" />
                <path
                  d="M8 14.6V20c0 1.1.6 2.1 1.6 2.7L16 26l6.4-3.3c1-.6 1.6-1.6 1.6-2.7v-5.4l-8 3.7-8-3.7Z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            </div>
          )}
          {badge ? (
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[color:var(--primary)] px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="inline-flex items-center gap-1.5 text-xs text-[color:var(--muted-foreground)]">
            <Calendar className="size-3.5" aria-hidden /> {date}
          </p>
          <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--primary)] sm:text-lg">
            {title}
          </h3>
          {showExcerpt && excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm text-[color:var(--muted-foreground)]">
              {excerpt}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
