import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPosts, getCategories } from "@/lib/wp";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { NewsCard } from "@/components/news/news-card";
import { NewsSearchForm } from "@/components/news/news-search-form";
import { Pagination } from "@/components/news/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { cn, decodeHtmlEntities } from "@/lib/utils";

export const revalidate = 3600; // 1 hour ISR for the news index

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
  cat?: string;
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
  const activeCat = (sp.cat ?? "").trim();
  const catId = activeCat ? Number(activeCat) : undefined;
  const perPage = 9; // 9 posts per page fits a 3-column grid perfectly

  const [
    { posts, totalPages, totalPosts },
    categoriesList
  ] = await Promise.all([
    getPosts({
      page,
      perPage,
      search: q || undefined,
      categories: catId ? [catId] : undefined,
    }),
    getCategories()
  ]);

  // Filter out redundant and generic categories to keep the design clean and focused
  const filteredCategories = categoriesList.filter((cat) => {
    const name = cat.name.toLowerCase();
    return (
      !["uncategorized", "flash", "info", "news", "spmb", "un", "ujian", "serba serbi", "editorial"].includes(name) &&
      cat.count > 0
    );
  }).slice(0, 10); // Limit to top 10 active categories

  const basePath = `/${lang}/berita`;

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Global Unified PageHeader */}
      <PageHeader
        title={dict.news.allNews}
        subtitle={dict.news.allNewsSubtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.news.allNews },
        ]}
      />

      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <aside className="lg:col-span-3 lg:sticky lg:top-24 z-20">
            <div className="lg:border-r lg:border-gray-100 lg:pr-8">
              {/* Desktop Header */}
              <h2 className="hidden lg:block text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                {lang === "id" ? "Kategori Berita" : "Categories"}
              </h2>

              {/* Categories Navigation */}
              <div 
                className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none justify-start lg:flex-col lg:items-stretch lg:overflow-x-visible lg:gap-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <Link
                  href={{ pathname: basePath, query: q ? { q } : undefined }}
                  className={cn(
                    "rounded-full lg:rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 lg:flex lg:items-center lg:justify-between",
                    !activeCat
                      ? "bg-emerald-50 text-[#14532d] lg:border-l-2 lg:border-[#16a34a] lg:rounded-l-none lg:bg-transparent lg:px-3 font-bold"
                      : "bg-gray-50 text-gray-500 border border-gray-100 lg:bg-transparent lg:border-none lg:text-gray-600 hover:text-emerald-600 hover:bg-gray-50 lg:px-3"
                  )}
                >
                  <span>{lang === "id" ? "Semua Berita" : "All News"}</span>
                  {!activeCat && <span className="hidden lg:inline size-1.5 rounded-full bg-[#16a34a]" />}
                </Link>

                {filteredCategories.map((cat) => {
                  const isActive = String(cat.id) === activeCat;
                  return (
                    <Link
                      key={cat.id}
                      href={{
                        pathname: basePath,
                        query: {
                          cat: cat.id,
                          ...(q ? { q } : {})
                        }
                      }}
                      className={cn(
                        "rounded-full lg:rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 lg:flex lg:items-center lg:justify-between",
                        isActive
                          ? "bg-emerald-50 text-[#14532d] lg:border-l-2 lg:border-[#16a34a] lg:rounded-l-none lg:bg-transparent lg:px-3 font-bold"
                          : "bg-gray-50 text-gray-500 border border-gray-100 lg:bg-transparent lg:border-none lg:text-gray-600 hover:text-emerald-600 hover:bg-gray-50 lg:px-3"
                      )}
                    >
                      <span>{decodeHtmlEntities(cat.name)}</span>
                      {isActive && <span className="hidden lg:inline size-1.5 rounded-full bg-[#16a34a]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 flex flex-col">
            {/* Top Toolbar: Search & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
              <p className="text-xs sm:text-sm font-medium text-gray-400">
                {q ? (
                  <>
                    {dict.common.search}: <strong>“{q}”</strong> ·{" "}
                  </>
                ) : null}
                {totalPosts ? `${totalPosts} ${dict.nav.news.toLowerCase()}` : null}
              </p>
              
              <div className="w-full sm:w-72 shrink-0">
                <NewsSearchForm
                  basePath={basePath}
                  initialQuery={q}
                  placeholder={dict.news.searchPlaceholder}
                  ariaLabel={dict.news.searchPlaceholder}
                />
              </div>
            </div>

            {/* News Grid */}
            {posts.length === 0 ? (
              <EmptyState
                message={dict.news.noResults}
                className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-16"
              />
            ) : (
              <>
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
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
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    basePath={basePath}
                    searchParams={{
                      q: q || undefined,
                      cat: activeCat || undefined
                    }}
                    dict={dict}
                  />
                </div>
              </>
            )}
          </main>

        </div>
      </Container>
    </div>
  );
}
