import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT, getTaxonomyTerms, getTermsByTaxonomy, getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/news/pagination";

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

      <Container className="py-10 sm:py-12">
        {/* Filter tabs */}
        {jabTerms.length ? (
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              {dict.cpt.gtk.filterByJabatan}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildFilterHref()}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  !jabId
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white shadow-md shadow-emerald-200"
                    : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] hover:shadow-sm",
                )}
              >
                {dict.cpt.gtk.filterAll}
              </Link>
              {jabTerms.map((term) => (
                <Link
                  key={term.id}
                  href={buildFilterHref(term.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    jabId === term.id
                      ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white shadow-md shadow-emerald-200"
                      : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] hover:shadow-sm",
                  )}
                >
                  {decodeHtmlEntities(term.name)}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {posts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[color:var(--border)] bg-white p-10 text-center">
            <p className="text-lg font-medium text-[color:var(--muted-foreground)]">
              {dict.cpt.gtk.empty}
            </p>
          </div>
        ) : (
          <BentoGTKGrid posts={posts} />
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

// ============ Bento Grid ============

import type { WPPost } from "@/lib/wp-types";

function PersonCard({
  post,
  size,
}: {
  post: WPPost;
  size: "hero" | "tall" | "normal";
}) {
  const name = decodeHtmlEntities(post.title.rendered);
  const imageUrl = getFeaturedImageUrl(post);
  const jab = getTermsByTaxonomy(post, "jab")[0];
  const stts = getTermsByTaxonomy(post, "stts")[0];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const heightClass =
    size === "hero"
      ? "h-[380px] sm:h-[440px]"
      : size === "tall"
        ? "h-[320px] sm:h-[380px]"
        : "h-[280px] sm:h-[320px]";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl",
        heightClass,
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes={
            size === "hero"
              ? "(min-width: 1024px) 33vw, 100vw"
              : "(min-width: 1024px) 25vw, 50vw"
          }
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200">
          <div className={cn(
            "flex items-center justify-center rounded-full bg-white/80",
            size === "hero" ? "size-24" : "size-16",
          )}>
            <span className={cn(
              "font-bold text-emerald-500",
              size === "hero" ? "text-4xl" : "text-2xl",
            )}>
              {initials}
            </span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 text-white",
        size === "hero" ? "p-5 sm:p-6" : "p-4",
      )}>
        <h3 className={cn(
          "font-bold leading-tight",
          size === "hero" ? "text-lg sm:text-xl" : "text-sm sm:text-base",
        )}>
          {name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {jab ? (
            <span className={cn(
              "inline-flex items-center rounded-full bg-emerald-500/80 font-semibold text-white",
              size === "hero" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]",
            )}>
              {decodeHtmlEntities(jab.name)}
            </span>
          ) : null}
          {stts ? (
            <span className={cn(
              "inline-flex items-center rounded-full bg-white/20 font-medium text-white backdrop-blur-sm",
              size === "hero" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]",
            )}>
              {decodeHtmlEntities(stts.name)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * Bento layout for GTK page.
 * All cards same size in a uniform grid — clean and consistent.
 */
function BentoGTKGrid({ posts }: { posts: WPPost[]; page: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {posts.map((post) => (
        <PersonCard key={post.id} post={post} size="normal" />
      ))}
    </div>
  );
}
