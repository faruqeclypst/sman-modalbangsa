import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT, getTaxonomyTerms, getTermsByTaxonomy } from "@/lib/wp";
import { decodeHtmlEntities, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/news/pagination";
import { GTKCard } from "@/components/gtk/gtk-card";

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
      perPage: 12,
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

      <Container className="py-10 sm:py-12">
        {jabTerms.length ? (
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              {dict.cpt.gtk.filterByJabatan}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildFilterHref()}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  !jabId
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                    : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
                )}
              >
                {dict.cpt.gtk.filterAll}
              </Link>
              {jabTerms.map((term) => (
                <Link
                  key={term.id}
                  href={buildFilterHref(term.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    jabId === term.id
                      ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                      : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
                  )}
                >
                  {decodeHtmlEntities(term.name)}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-white p-10 text-center">
            <p className="text-[color:var(--muted-foreground)]">
              {dict.cpt.gtk.empty}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => {
              const jab = getTermsByTaxonomy(post, "jab")[0];
              const stts = getTermsByTaxonomy(post, "stts")[0];
              return (
                <GTKCard
                  key={post.id}
                  post={post}
                  jabatanLabel={jab ? decodeHtmlEntities(jab.name) : undefined}
                  statusLabel={stts ? decodeHtmlEntities(stts.name) : undefined}
                />
              );
            })}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={basePath}
          searchParams={{ jab: sp.jab }}
          dict={dict}
        />
      </Container>
    </>
  );
}
