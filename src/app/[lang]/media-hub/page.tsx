import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { MediaHubClient } from "@/components/media-hub/media-hub-client";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.nav.mediaHub || "Media Hub",
    description: dict.cpt.mediaHub?.subtitle || "Mosa Video & Media Hub SMAN Modal Bangsa",
    alternates: { canonical: `/${lang}/media-hub` },
  };
}

export default async function MediaHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.cpt.mediaHub.title}
        subtitle={dict.site.name}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.mediaHub.label },
        ]}
      />

      <section className="relative overflow-hidden py-16 sm:py-24 bg-[color:var(--background)]">
        {/* Glow decoration */}
        <div aria-hidden className="absolute -left-64 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/3 pointer-events-none" />
        <div aria-hidden className="absolute -right-64 bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[120px] dark:bg-teal-500/3 pointer-events-none" />

        <Container size="xl">
          <MediaHubClient locale={lang} dict={dict} />
        </Container>
      </section>
    </>
  );
}
