import type { Metadata } from "next";

import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { CaraDaftarClient } from "@/components/spmb/cara-daftar-client";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const isId = true;
  const title = isId ? "Panduan Cara Mendaftar PJJ" : "How to Register for PJJ";
  const description = isId
    ? "Panduan dan langkah-langkah pendaftaran Pendidikan Jarak Jauh (PJJ) SMAN Modal Bangsa Aceh"
    : "Guide and steps to register for Distance Learning (PJJ) at SMAN Modal Bangsa Aceh";
  return {
    title: `${title} | SMAN Modal Bangsa`,
    description,
    alternates: { canonical: `/pjj/cara-daftar` },
  };
}

export default async function CaraDaftarPJJPage() {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  const isId = lang === "id";
  const title = isId ? "Cara Mendaftar PJJ" : "How to Register for PJJ";
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
          { label: dict.nav.home, href: `/` },
          { label: isId ? "Pendidikan Jarak Jauh" : "Distance Learning", href: `/pjj` },
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
