import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { VisionMissionClient } from "@/components/profil/vision-mission-client";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/visi-misi">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.profile.vision.title} & ${dict.profile.mission.title}`,
    description: dict.profile.vision.body,
    alternates: { canonical: `/${lang}/profil/visi-misi` },
  };
}

export default async function VisionMissionPage({
  params,
}: PageProps<"/[lang]/profil/visi-misi">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={`${dict.profile.vision.title} & ${dict.profile.mission.title}`}
        subtitle={dict.profile.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.nav.visionMission },
        ]}
      />

      <VisionMissionClient lang={lang} dict={dict} />
    </>
  );
}
