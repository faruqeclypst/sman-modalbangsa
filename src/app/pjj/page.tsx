import type { Metadata } from "next";

import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { PJJClient } from "@/components/spmb/pjj-client";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const isId = true;
  const title = isId ? "Pendidikan Jarak Jauh" : "Distance Learning";
  const description = isId
    ? "Program Layanan Pendidikan Jarak Jauh (PJJ) SMAN Modal Bangsa untuk Anak Tidak Sekolah (ATS) dan Lulus Tidak Melanjutkan (LTMS)"
    : "SMAN Modal Bangsa Distance Learning (PJJ) Program for Out-of-School Children (ATS) and Graduates Not Continuing School (LTMS)";
  return {
    title: `${title} | SMAN Modal Bangsa`,
    description,
    alternates: { canonical: `/pjj` },
  };
}

export default async function PJJPage() {
  const lang = "id" as const;
  const dict = await getDictionary(lang);

  const isId = lang === "id";
  const title = isId ? "Pendidikan Jarak Jauh" : "Distance Learning";
  const subtitle = isId
    ? "Program Layanan Pendidikan Jarak Jauh SMAN Modal Bangsa"
    : "SMAN Modal Bangsa Distance Learning Program";

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        plainTitle={true}
        breadcrumbs={[
          { label: dict.nav.home, href: `/` },
          { label: isId ? "Pendidikan Jarak Jauh" : "Distance Learning" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <PJJClient lang={lang} />
        </Container>
      </section>
    </>
  );
}
