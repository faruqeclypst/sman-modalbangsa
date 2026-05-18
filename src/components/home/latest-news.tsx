import Image from "next/image";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import type { DisdikBerita } from "@/lib/disdik-aceh";
import { Container } from "@/components/ui/container";
import {
  getCategoryTerms,
  getFeaturedImageUrl,
} from "@/lib/wp";
import {
  getDisdikImageUrl,
  getDisdikArticleUrl,
} from "@/lib/disdik-aceh";
import {
  decodeHtmlEntities,
  formatDate,
  stripHtml,
  truncate,
} from "@/lib/utils";

interface LatestNewsProps {
  posts: WPPost[];
  disdikBerita: DisdikBerita[];
  locale: Locale;
  dict: Dictionary;
}

// ============ School News Card ============

function SchoolNewsCard({
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
        className="group relative col-span-2 overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm"
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
          <h3 className="line-clamp-3 text-lg font-bold leading-tight sm:text-xl lg:text-2xl">
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

// ============ Disdik News Card ============

function DisdikNewsCard({ berita }: { berita: DisdikBerita }) {
  const title = decodeHtmlEntities(berita.judul);
  const imageUrl = getDisdikImageUrl(berita.gambar);
  const articleUrl = getDisdikArticleUrl(berita.slug);
  const excerpt = truncate(stripHtml(berita.deskripsi ?? ""), 80);

  return (
    <a
      href={articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 transition-all hover:border-[color:var(--primary)] hover:shadow-md"
    >
      {/* Image */}
      <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Category */}
        {berita.kategori?.nama ? (
          <span className="mb-1 inline-flex w-fit items-center rounded-full bg-[color:var(--primary)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--primary)]">
            {berita.kategori.nama}
          </span>
        ) : null}

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
          {title}
        </h3>

        {/* Meta */}
        <div className="mt-auto flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3" aria-hidden />
            {berita.tanggal}
          </span>
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
  locale,
  dict,
}: LatestNewsProps) {
  const [hero, ...rest] = posts;
  const others = rest.slice(0, 2);

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
        </div>

        {/* Two Column Layout - equal height */}
        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left Column - School News */}
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
                {/* Hero - spans 2 cols, full height top */}
                {hero && (
                  <SchoolNewsCard post={hero} locale={locale} size="large" />
                )}
                {/* Side cards */}
                {others.map((post) => (
                  <SchoolNewsCard
                    key={post.id}
                    post={post}
                    locale={locale}
                    size="small"
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                {dict.news.noNews ?? "Belum ada berita"}
              </p>
            )}
          </div>

          {/* Right Column - Disdik Aceh News */}
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
