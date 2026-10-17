import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { VisionMissionClient } from "@/components/profil/vision-mission-client";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/profil/visi-misi">): Promise<Metadata> {
  const lang = "id" as const;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.profile.vision.title} & ${dict.profile.mission.title}`,
    description: dict.profile.vision.body,
    alternates: { canonical: `/profil/visi-misi` },
  };
}

export default async function VisionMissionPage({
  params,
}: PageProps<"/profil/visi-misi">) {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={`${dict.profile.vision.title} & ${dict.profile.mission.title}`}
        subtitle={dict.profile.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/` },
          { label: dict.nav.profile },
          { label: dict.nav.visionMission },
        ]}
      />

      <VisionMissionClient lang={lang} dict={dict} />
    </>
  );
}
