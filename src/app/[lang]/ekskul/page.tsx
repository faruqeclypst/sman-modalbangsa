import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT } from "@/lib/wp";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { CPTGrid } from "@/components/cpt/cpt-grid";
import { Pagination } from "@/components/news/pagination";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/ekskul">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.ekskul.title,
    description: dict.cpt.ekskul.subtitle,
    alternates: { canonical: `/${lang}/ekskul` },
  };
}

export default async function EkskulListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/ekskul">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as { page?: string };
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const { posts, totalPages } = await getCPT("ekskul", {
    page,
    perPage: 12,
    orderBy: "title",
    order: "asc",
  });
  const basePath = `/${lang}/ekskul`;

  return (
    <>
      <PageHeader
        title={dict.cpt.ekskul.title}
        subtitle={dict.cpt.ekskul.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.ekskul.label },
        ]}
      />
      <Container className="py-10 sm:py-12">
        <CPTGrid
          posts={posts}
          locale={lang}
          basePath="ekskul"
          emptyText={dict.cpt.ekskul.empty}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={basePath}
          dict={dict}
        />
      </Container>
    </>
  );
}
