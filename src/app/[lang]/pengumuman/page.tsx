import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT } from "@/lib/wp";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { CPTGrid } from "@/components/cpt/cpt-grid";
import { Pagination } from "@/components/news/pagination";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/pengumuman">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.pengumuman.title,
    description: dict.cpt.pengumuman.subtitle,
    alternates: { canonical: `/${lang}/pengumuman` },
  };
}

export default async function PengumumanListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/pengumuman">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as { page?: string };
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const { posts, totalPages } = await getCPT("pengumuman", { page, perPage: 9 });
  const basePath = `/${lang}/pengumuman`;

  return (
    <>
      <PageHeader
        title={dict.cpt.pengumuman.title}
        subtitle={dict.cpt.pengumuman.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.pengumuman.label },
        ]}
      />
      <Container className="py-10 sm:py-12">
        <CPTGrid
          posts={posts}
          locale={lang}
          basePath="pengumuman"
          badge={dict.cpt.pengumuman.label}
          emptyText={dict.cpt.pengumuman.empty}
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
