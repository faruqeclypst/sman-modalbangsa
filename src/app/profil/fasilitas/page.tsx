import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { FacilitiesViewer } from "@/components/profil/facilities-viewer";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/profil/fasilitas">): Promise<Metadata> {
  const lang = "id" as const;
  const dict = await getDictionary(lang);
  return {
    title: dict.profile.facilities.title,
    description: dict.profile.facilities.subtitle,
    alternates: { canonical: `/profil/fasilitas` },
  };
}

export default async function FacilitiesPage({
  params,
}: PageProps<"/profil/fasilitas">) {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.facilities.title}
        subtitle={dict.profile.facilities.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/` },
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
