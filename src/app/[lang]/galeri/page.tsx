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
}: PageProps<"/[lang]/galeri">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.galeri.title,
    description: dict.cpt.galeri.subtitle,
    alternates: { canonical: `/${lang}/galeri` },
  };
}

export default async function GaleriListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/galeri">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as { page?: string };
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const { posts, totalPages } = await getCPT("galeri", { page, perPage: 12 });
  const basePath = `/${lang}/galeri`;

  return (
    <>
      <PageHeader
        title={dict.cpt.galeri.title}
        subtitle={dict.cpt.galeri.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.galeri.label },
        ]}
      />
      <Container className="py-10 sm:py-12">
        <CPTGrid
          posts={posts}
          locale={lang}
          basePath="galeri"
          emptyText={dict.cpt.galeri.empty}
          showExcerpt={false}
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
