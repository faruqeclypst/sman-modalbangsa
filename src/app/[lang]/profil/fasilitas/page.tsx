import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { FacilitiesViewer } from "@/components/profil/facilities-viewer";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/fasilitas">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.profile.facilities.title,
    description: dict.profile.facilities.subtitle,
    alternates: { canonical: `/${lang}/profil/fasilitas` },
  };
}

export default async function FacilitiesPage({
  params,
}: PageProps<"/[lang]/profil/fasilitas">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.facilities.title}
        subtitle={dict.profile.facilities.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.nav.facilities },
        ]}
      />
      <Container className="py-12 sm:py-16">
        <FacilitiesViewer facilities={dict.profile.facilities.items} lang={lang} />
      </Container>
    </>
  );
}
