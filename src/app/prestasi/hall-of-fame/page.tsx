import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { HallOfFameShowcase } from "@/components/prestasi/hall-of-fame-showcase";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/prestasi/hall-of-fame">): Promise<Metadata> {
  const lang = "id" as const;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.cpt.prestasi.hallOfFameTitle} | SMAN Modal Bangsa`,
    description: dict.cpt.prestasi.hallOfFameSubtitle,
    alternates: { canonical: `/prestasi/hall-of-fame` },
  };
}


export default async function HallOfFamePage({
  params,
}: PageProps<"/prestasi/hall-of-fame">) {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.cpt.prestasi.hallOfFameTitle}
        subtitle={dict.cpt.prestasi.hallOfFameSubtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/` },
          { label: dict.cpt.prestasi.label, href: `/prestasi` },
          { label: dict.cpt.prestasi.hallOfFameTitle },
        ]}
      />
      <HallOfFameShowcase
        lang={lang}
        dict={dict}
      />
    </>
  );
}
