import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { CalendarViewer } from "@/components/profil/calendar-viewer";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/kalender">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.profile.calendar.title} | SMAN Modal Bangsa`,
    description: dict.profile.calendar.subtitle,
    alternates: { canonical: `/${lang}/profil/kalender` },
  };
}

export default async function CalendarPage({
  params,
}: PageProps<"/[lang]/profil/kalender">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.calendar.title}
        subtitle={dict.profile.calendar.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
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
