import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import {
  getAuthorName,
  getFeaturedImage,
  getFeaturedImageUrl,
} from "@/lib/wp";
import {
  decodeHtmlEntities,
  formatDate,
  readingTime,
} from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArticleContent } from "@/components/news/article-content";

interface CPTDetailProps {
  post: WPPost;
  locale: Locale;
  dict: Dictionary;
  /** Type label, e.g. "Agenda", "Pengumuman". */
  typeLabel: string;
  /** Path back to the listing, e.g. "/id/agenda". */
  backHref: string;
  /** Translated label for the back link. */
  backLabel: string;
}

export function CPTDetail({
  post,
  locale,
  dict,
  typeLabel,
  backHref,
  backLabel,
}: CPTDetailProps) {
  const title = decodeHtmlEntities(post.title.rendered);
  const author = getAuthorName(post);
  const date = formatDate(post.date, locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const minutes = readingTime(post.content?.rendered ?? "");
  const media = getFeaturedImage(post);
  const imageUrl = getFeaturedImageUrl(post);

  return (
    <article className="bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--border)] bg-[color:var(--muted)]/40">
        <Container size="lg" className="py-10 sm:py-14">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {backLabel}
          </Link>

          <Badge variant="primary" className="mt-5">
            {typeLabel}
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[color:var(--muted-foreground)]">
            {author ? (
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4" aria-hidden /> {author}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden /> {date}
            </span>
            {minutes > 0 ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden /> {minutes}{" "}
                {dict.news.minRead}
              </span>
            ) : null}
          </div>
        </Container>
      </header>

      {imageUrl ? (
        <Container size="lg" className="-mt-2 pt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)]">
            <Image
              src={imageUrl}
              alt={media?.alt_text || title}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      <Container size="md" className="py-10">
        <ArticleContent
          html={post.content?.rendered ?? ""}
          className="prose-article max-w-none"
        />
      </Container>
    </article>
  );
}
