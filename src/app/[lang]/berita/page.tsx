import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPosts } from "@/lib/wp";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { NewsCard } from "@/components/news/news-card";
import { NewsSearchForm } from "@/components/news/news-search-form";
import { Pagination } from "@/components/news/pagination";

import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 300; // 5 minutes for the news index

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/berita">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.news.allNews,
    description: dict.news.allNewsSubtitle,
    alternates: { canonical: `/${lang}/berita` },
  };
}

interface SP {
  page?: string;
  q?: string;
}

export default async function NewsListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/berita">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as SP;
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const q = (sp.q ?? "").trim();
  const perPage = 9;

  const { posts, totalPages, totalPosts } = await getPosts({
    page,
    perPage,
    search: q || undefined,
  });

  const basePath = `/${lang}/berita`;

  return (
    <>
      <PageHeader
        title={dict.news.allNews}
        subtitle={dict.news.allNewsSubtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.news.allNews },
        ]}
      />

      <Container className="py-10 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-[color:var(--muted-foreground)]">
            {q ? (
              <>
                {dict.common.search}: <strong>“{q}”</strong> · {totalPosts}{" "}
              </>
            ) : null}
            {totalPosts ? `${totalPosts} ${dict.nav.news.toLowerCase()}` : null}
          </p>
          <NewsSearchForm
            basePath={basePath}
            initialQuery={q}
            placeholder={dict.news.searchPlaceholder}
            ariaLabel={dict.news.searchPlaceholder}
          />
        </div>

        {posts.length === 0 ? (
          <EmptyState 
            message={dict.news.noResults} 
            className="mt-12 rounded-xl border border-dashed border-[color:var(--border)] bg-white" 
          />
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <NewsCard
                  key={post.id}
                  post={post}
                  locale={lang}
                  dict={dict}
                  priority={idx < 3}
                />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={basePath}
              searchParams={{ q: q || undefined }}
              dict={dict}
            />
          </>
        )}
      </Container>
    </>
  );
}
