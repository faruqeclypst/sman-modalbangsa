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
}: PageProps<"/[lang]/agenda">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.agenda.title,
    description: dict.cpt.agenda.subtitle,
    alternates: { canonical: `/${lang}/agenda` },
  };
}

export default async function AgendaListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/agenda">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as { page?: string };
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const { posts, totalPages } = await getCPT("agenda", { page, perPage: 9 });
  const basePath = `/${lang}/agenda`;

  return (
    <>
      <PageHeader
        title={dict.cpt.agenda.title}
        subtitle={dict.cpt.agenda.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.agenda.label },
        ]}
      />
      <Container className="py-10 sm:py-12">
        <CPTGrid
          posts={posts}
          locale={lang}
          basePath="agenda"
          badge={dict.cpt.agenda.label}
          emptyText={dict.cpt.agenda.empty}
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
