import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Eye, User } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getAuthorName,
  getFeaturedImage,
  getFeaturedImageUrl,
  getCPTBySlug,
  getCPT,
} from "@/lib/wp";
import type { WPPost } from "@/lib/wp-types";
import {
  decodeHtmlEntities,
  formatDate,
  readingTime,
  stripHtml,
  truncate,
} from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArticleContent } from "@/components/news/article-content";
import { CPTCard } from "@/components/cpt/cpt-card";
import { ViewCounter } from "@/components/news/view-counter";
import { DisqusComments } from "@/components/comments/disqus-comments";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ShareButtons } from "@/components/ui/share-buttons";

export const revalidate = 600; // 10 minutes ISR for individual achievements
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

interface PrestasiPageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PrestasiPageProps): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};

  const post = await getCPTBySlug("prestasi", id);
  if (!post) return { title: "Not found" };

  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt?.rendered ?? ""), 160);
  const imageUrl = getFeaturedImageUrl(post);

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/prestasi/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function PrestasiDetailPage({
  params,
}: PrestasiPageProps) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const post = await getCPTBySlug("prestasi", id);
  if (!post) notFound();

  const title = decodeHtmlEntities(post.title.rendered);
  const authorRaw = getAuthorName(post);
  const author = !authorRaw || authorRaw.toLowerCase() === "admin" || authorRaw.toLowerCase() === "administrator"
    ? "Media Mosa"
    : authorRaw;
  const date = formatDate(post.date, lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const minutes = readingTime(post.content?.rendered ?? "");
  const media = getFeaturedImage(post);
  const imageUrl = getFeaturedImageUrl(post);
  const imgWidth = media?.media_details?.width;
  const imgHeight = media?.media_details?.height;
  const aspectRatio = imgWidth && imgHeight ? imgWidth / imgHeight : 1.5;
  const isBoxyOrPortrait = aspectRatio < 1.35;

  // Get related achievements
  const { posts: relatedRaw } = await getCPT("prestasi", {
    perPage: 7,
    exclude: [post.id],
  });
  const related = relatedRaw.slice(0, 6);

  // Split content in half to inject "Baca Juga" (related achievements) in the middle if there are enough paragraphs
  const contentHtml = post.content?.rendered ?? "";
  const paragraphs = contentHtml.split(/<\/p>/i).filter((p) => p.trim() !== "");

  let contentTop = contentHtml;
  let contentBottom = "";

  if (paragraphs.length >= 4) {
    const midPoint = Math.floor(paragraphs.length / 2);
    contentTop = paragraphs.slice(0, midPoint).join("</p>") + "</p>";
    contentBottom = paragraphs.slice(midPoint).join("</p>") + "</p>";
  }

  return (
    <article className="bg-[color:var(--background)] min-h-screen">
      <ReadingProgress />

      <Container size="xl" className="py-6 sm:py-8">
        <Link
          href={`/${lang}/prestasi`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {dict.cpt.prestasi.viewAll || "Back to Achievements"}
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="primary" className="text-[10px] py-0.5 px-2 font-bold bg-[#16a34a] hover:bg-[#118037] text-white border-none">
            {dict.cpt.prestasi.label}
          </Badge>
        </div>

        <h1 className="font-sfpro text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl lg:text-4xl leading-tight">
          {title}
        </h1>

        {/* Meta row under the title */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[color:var(--muted-foreground)] border-y border-[color:var(--border)] py-3">
          {author ? (
            <span className="inline-flex items-center gap-1">
              <User className="size-3.5" aria-hidden /> {author}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" aria-hidden /> {date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden /> {minutes} {dict.news.minRead}
          </span>
          <ViewCounter id={post.id} initialViews={post.views} locale={lang} />
        </div>

        {/* Featured image embedded inside centered layout, wide banner style */}
        {imageUrl ? (
          <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)] max-h-[450px] flex items-center justify-center">
            {/* Ambient background blur */}
            <Image
              src={imageUrl}
              alt=""
              fill
              priority
              unoptimized
              sizes="10vw"
              className="object-cover blur-2xl opacity-35 scale-105 select-none pointer-events-none"
            />
            {/* Crisp foreground image */}
            {isBoxyOrPortrait ? (
              <div
                className="relative h-full max-w-full z-10"
                style={{ aspectRatio: imgWidth && imgHeight ? `${imgWidth}/${imgHeight}` : "3/4" }}
              >
                <Image
                  src={imageUrl}
                  alt={media?.alt_text || title}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain"
                />
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt={media?.alt_text || title}
                fill
                priority
                unoptimized
                sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 960px, 100vw"
                className="object-cover z-10"
              />
            )}
          </div>
        ) : null}

        {/* Content body */}
        <div className="mt-6">
          {/* First half of content */}
          <ArticleContent
            html={contentTop}
            className="prose-article max-w-none"
          />

          {/* Baca Juga - injected in the middle of content */}
          {related.length ? (
            <div className="my-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/30 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--primary)]">
                {lang === "id" ? "Baca Juga" : "Read Also"}
              </h3>
              <div className="grid gap-6 md:grid-cols-3 mt-3">
                {related.slice(0, 3).map((r) => {
                  const rImg = getFeaturedImageUrl(r);
                  const rExcerpt = truncate(stripHtml(r.excerpt?.rendered || r.content?.rendered || ""), 140);
                  return (
                    <Link
                      key={r.id}
                      href={`/${lang}/prestasi/${r.slug}`}
                      className="group flex gap-3 no-underline items-start"
                    >
                      <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-lg bg-[color:var(--muted)] border border-[color:var(--border)]">
                        {rImg ? (
                          <Image
                            src={rImg}
                            alt={decodeHtmlEntities(r.title.rendered)}
                            fill
                            unoptimized
                            sizes="64px"
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                          {decodeHtmlEntities(r.title.rendered)}
                        </p>
                        {rExcerpt ? (
                          <p className="mt-1 line-clamp-3 text-xs text-[color:var(--muted-foreground)] leading-relaxed">
                            {rExcerpt}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Second half of content */}
          {contentBottom.trim() ? (
            <ArticleContent
              html={contentBottom}
              className="prose-article max-w-none mt-4"
            />
          ) : null}
        </div>

        {/* Share buttons */}
        <div className="mt-6 border-t border-[color:var(--border)] pt-4">
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id"}/${lang}/prestasi/${post.slug}`}
            title={title}
          />
        </div>

        {/* Comments */}
        <DisqusComments
          identifier={`prestasi-${post.slug}`}
          url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id"}/${lang}/prestasi/${post.slug}`}
          title={title}
        />
      </Container>

      {/* Related achievements under the article */}
      {related.slice(3, 6).length ? (
        <section className="border-t border-[color:var(--border)] bg-[color:var(--muted)]/40 py-12">
          <Container size="xl">
            <h2 className="text-xl font-bold text-[color:var(--foreground)] sm:text-2xl mb-6">
              {lang === "id" ? "Prestasi Terkait" : "Related Achievements"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(3, 6).map((p) => (
                <CPTCard key={p.id} post={p} locale={lang} basePath="prestasi" badge={dict.cpt.prestasi.label} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": title,
            "image": imageUrl ? [imageUrl] : [],
            "datePublished": post.date,
            "dateModified": post.modified,
            "author": [{
              "@type": "Person",
              "name": author || "Media Mosa"
            }]
          }),
        }}
      />
    </article>
  );
}
