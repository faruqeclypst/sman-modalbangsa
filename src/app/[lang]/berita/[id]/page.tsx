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
  getPostById,
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

  const post = await getPostById(id);
  if (!post) return { title: "Not found" };

  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt.rendered), 160);
  const imageUrl = getFeaturedImageUrl(post);

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/berita/${id}` },
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
  const post = await getPostById(id);
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
  const { posts: relatedRaw } = await getPosts({
    perPage: 4,
    categories: primaryCat ? [primaryCat.id] : undefined,
    exclude: [post.id],
  });
  const related = relatedRaw.slice(0, 3);

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
        <ArticleContent
          html={post.content.rendered}
          className="prose-article max-w-none"
        />

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
