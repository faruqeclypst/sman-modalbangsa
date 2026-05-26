import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getAuthorName,
  getCategoryTerms,
  getFeaturedImage,
  getFeaturedImageUrl,
  getPostBySlug,
  getPosts,
  getTagTerms,
} from "@/lib/wp";
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
import { NewsCard } from "@/components/news/news-card";
import { DisqusComments } from "@/components/comments/disqus-comments";

export const revalidate = 600; // 10 minutes ISR for individual posts
export const dynamicParams = true;

export async function generateStaticParams() {
  // Skip pre-rendering at build time — render on-demand with ISR
  return [];
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/berita/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};

  const post = await getPostBySlug(id);
  if (!post) return { title: "Not found" };

  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt.rendered), 160);
  const imageUrl = getFeaturedImageUrl(post);

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/berita/${post.slug}` },
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

export default async function NewsDetailPage({
  params,
}: PageProps<"/[lang]/berita/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const post = await getPostBySlug(id);
  if (!post) notFound();

  const title = decodeHtmlEntities(post.title.rendered);
  const author = getAuthorName(post);
  const date = formatDate(post.date, lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const minutes = readingTime(post.content.rendered);
  const categories = getCategoryTerms(post);
  const tags = getTagTerms(post);
  const media = getFeaturedImage(post);
  const imageUrl = getFeaturedImageUrl(post);

  // Related posts (same primary category if available)
  const primaryCat = categories[0];
  const [{ posts: relatedRaw }] = await Promise.all([
    getPosts({
      perPage: 4,
      categories: primaryCat ? [primaryCat.id] : undefined,
      exclude: [post.id],
    }),
  ]);
  const related = relatedRaw.slice(0, 3);

  // Split content in half to inject "Baca Juga" in the middle
  const contentHtml = post.content.rendered;
  const paragraphs = contentHtml.split(/<\/p>/i);
  const midPoint = Math.max(2, Math.floor(paragraphs.length / 2));
  const contentTop = paragraphs.slice(0, midPoint).join("</p>") + "</p>";
  const contentBottom = paragraphs.slice(midPoint).join("</p>");

  return (
    <article className="bg-[color:var(--background)]">
      {/* Header */}
      <header className="border-b border-[color:var(--border)] bg-[color:var(--muted)]/40">
        <Container size="lg" className="py-10 sm:py-14">
          <Link
            href={`/${lang}/berita`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {dict.news.backToList}
          </Link>

          {categories.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Badge key={c.id} variant="primary">
                  {decodeHtmlEntities(c.name)}
                </Badge>
              ))}
            </div>
          ) : null}

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
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden /> {minutes} {dict.news.minRead}
            </span>
          </div>
        </Container>
      </header>

      {/* Featured image */}
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

      {/* Body */}
      <Container size="md" className="py-10">
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
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.slice(0, 3).map((r) => {
                const rImg = getFeaturedImageUrl(r);
                return (
                  <Link
                    key={r.id}
                    href={`/${lang}/berita/${r.slug}`}
                    className="group flex gap-3 sm:flex-col sm:gap-2"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[color:var(--muted)] sm:aspect-video sm:h-auto sm:w-full">
                      {rImg ? (
                        <Image
                          src={rImg}
                          alt={decodeHtmlEntities(r.title.rendered)}
                          fill
                          sizes="(min-width: 640px) 200px, 56px"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                      {decodeHtmlEntities(r.title.rendered)}
                    </p>
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
            className="prose-article max-w-none"
          />
        ) : null}

        {tags.length ? (
          <div className="mt-10 border-t border-[color:var(--border)] pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              {dict.news.tags}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t.id} variant="muted">
                  #{decodeHtmlEntities(t.name)}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      {/* Comments - Disqus */}
      <section className="border-t border-[color:var(--border)] py-12">
        <Container size="md">
          <DisqusComments
            identifier={`berita-${post.slug}`}
            url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id"}/${lang}/berita/${post.slug}`}
            title={title}
          />
        </Container>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="border-t border-[color:var(--border)] bg-[color:var(--muted)]/40 py-12">
          <Container>
            <h2 className="text-xl font-bold text-[color:var(--foreground)] sm:text-2xl">
              {dict.news.relatedNews}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <NewsCard key={p.id} post={p} locale={lang} dict={dict} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
