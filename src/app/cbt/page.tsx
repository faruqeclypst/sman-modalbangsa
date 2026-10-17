import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { CbtContent } from "@/components/cbt/cbt-content";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/cbt">): Promise<Metadata> {
  const lang = "id" as const;
  return {
    title: "Informasi Ujian CBT",
    description:
      "Panduan lengkap download dan penggunaan aplikasi ujian CBT SMA Negeri Modal Bangsa.",
    alternates: { canonical: `/cbt` },
  };
}

export default async function CbtPage({
  params,
}: PageProps<"/cbt">) {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title="Informasi Ujian CBT"
        subtitle="Panduan download & penggunaan aplikasi ujian Computer Based Test (CBT)"
        breadcrumbs={[
          { label: dict.nav.home, href: `/` },
          { label: "CBT" },
        ]}
      />
      <CbtContent />
    </>
  );
}
