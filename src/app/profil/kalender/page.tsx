import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { CalendarViewer } from "@/components/profil/calendar-viewer";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/profil/kalender">): Promise<Metadata> {
  const lang = "id" as const;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.profile.calendar.title} | SMAN Modal Bangsa`,
    description: dict.profile.calendar.subtitle,
    alternates: { canonical: `/profil/kalender` },
  };
}

export default async function CalendarPage({
  params,
}: PageProps<"/profil/kalender">) {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.calendar.title}
        subtitle={dict.profile.calendar.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/` },
          { label: dict.nav.profile },
          { label: dict.profile.calendar.title },
        ]}
      />

      <Container className="py-12 sm:py-16">
        <CalendarViewer dict={dict} lang={lang} />
      </Container>
    </>
  );
}
