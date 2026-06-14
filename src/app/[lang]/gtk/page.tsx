import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT, getTaxonomyTerms } from "@/lib/wp";
import { decodeHtmlEntities, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/news/pagination";
import { GTKClientList } from "@/components/gtk/gtk-client";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/gtk">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.gtk.title,
    description: dict.cpt.gtk.subtitle,
    alternates: { canonical: `/${lang}/gtk` },
  };
}

export default async function GTKListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/gtk">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as { page?: string; jab?: string };
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const jabId = sp.jab ? Number(sp.jab) : undefined;

  const [{ posts, totalPages }, jabTerms] = await Promise.all([
    getCPT("gtk", {
      page,
      perPage: 20,
      orderBy: "title",
      order: "asc",
      taxonomies: jabId ? { jab: [jabId] } : undefined,
    }),
    getTaxonomyTerms("jab"),
  ]);

  const basePath = `/${lang}/gtk`;
  const buildFilterHref = (id?: number) => {
    const params = new URLSearchParams();
    if (id) params.set("jab", String(id));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <>
      <PageHeader
        title={dict.cpt.gtk.title}
        subtitle={dict.cpt.gtk.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.cpt.gtk.label },
        ]}
      />

      <section className="py-16 sm:py-20 bg-[color:var(--background)]">
        <Container>
          {/* Filter tabs with high-end micro-aesthetics */}
          {jabTerms.length ? (
            <div className="mb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                {dict.cpt.gtk.filterByJabatan}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href={buildFilterHref()}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-sm",
                    !jabId
                      ? "border-[#16a34a]/30 bg-[#16a34a]/5 text-[#16a34a] shadow-emerald-500/5"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-[#16a34a]/30 hover:text-[#16a34a]",
                  )}
                >
                  {dict.cpt.gtk.filterAll}
                </Link>
                {jabTerms.map((term) => (
                  <Link
                    key={term.id}
                    href={buildFilterHref(term.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-sm",
                      jabId === term.id
                        ? "border-[#16a34a]/30 bg-[#16a34a]/5 text-[#16a34a] shadow-emerald-500/5"
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-[#16a34a]/30 hover:text-[#16a34a]",
                    )}
                  >
                    {decodeHtmlEntities(term.name)}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {posts.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[color:var(--border)] bg-white dark:bg-zinc-900 p-10 text-center">
              <p className="text-lg font-medium text-[color:var(--muted-foreground)]">
                {dict.cpt.gtk.empty}
              </p>
            </div>
          ) : (
            <GTKClientList posts={posts} dict={dict} lang={lang} />
          )}

          <div className="mt-16 border-t border-[color:var(--border)] pt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={basePath}
              searchParams={{ jab: sp.jab }}
              dict={dict}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
