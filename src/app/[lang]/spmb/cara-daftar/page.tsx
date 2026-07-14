import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { CaraDaftarClient } from "@/components/spmb/cara-daftar-client";

export const revalidate = false;

interface CaraDaftarPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: CaraDaftarPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const isId = lang === "id";
  const title = isId ? "Panduan Cara Mendaftar SPMB PJJ" : "How to Register for SPMB PJJ";
  const description = isId 
    ? "Panduan dan langkah-langkah pendaftaran SPMB Pendidikan Jarak Jauh (PJJ) SMAN Modal Bangsa Aceh"
    : "Guide and steps to register for SPMB Distance Learning (PJJ) at SMAN Modal Bangsa Aceh";
  return {
    title: `${title} | SMAN Modal Bangsa`,
    description,
    alternates: { canonical: `/${lang}/spmb/cara-daftar` },
  };
}

export default async function CaraDaftarPage({
  params,
}: CaraDaftarPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  
  const isId = lang === "id";
  const title = isId ? "Cara Mendaftar SPMB PJJ" : "How to Register for PJJ";
  const subtitle = isId 
    ? "Panduan lengkap langkah demi langkah pendaftaran program Pendidikan Jarak Jauh SMAN Modal Bangsa"
    : "Step-by-step guide for registering in the SMAN Modal Bangsa Distance Learning Program";

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        plainTitle={true}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.quickLinks.items.spmb, href: `/${lang}/spmb` },
          { label: isId ? "Cara Mendaftar" : "How to Register" },
        ]}
      />

      <section className="py-12 sm:py-16 bg-zinc-50/40">
        <Container>
          <CaraDaftarClient lang={lang} />
        </Container>
      </section>
    </>
  );
}
