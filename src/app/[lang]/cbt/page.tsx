import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { CbtContent } from "@/components/cbt/cbt-content";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/cbt">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: "Informasi Ujian CBT",
    description:
      "Panduan lengkap download dan penggunaan aplikasi ujian CBT SMA Negeri Modal Bangsa.",
    alternates: { canonical: `/${lang}/cbt` },
  };
}

export default async function CbtPage({
  params,
}: PageProps<"/[lang]/cbt">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title="Informasi Ujian CBT"
        subtitle="Panduan download & penggunaan aplikasi ujian Computer Based Test (CBT)"
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: "CBT" },
        ]}
      />
      <CbtContent />
    </>
  );
}
