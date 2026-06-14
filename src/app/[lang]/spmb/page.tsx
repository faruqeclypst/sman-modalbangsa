import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SPMBClient } from "@/components/spmb/spmb-client";
import { getCPT } from "@/lib/wp";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/spmb">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const isId = lang === "id";
  const title = isId ? "Informasi Penerimaan Siswa Baru dan Pendidikan Jarak Jauh" : "Student Admissions & Distance Learning Information";
  const description = isId 
    ? "Penerimaan Siswa Baru SMAN Modal Bangsa dan Program Layanan Pendidikan Jarak Jauh"
    : "New Student Admissions and Distance Learning Services at SMAN Modal Bangsa";
  return {
    title: `${title} | SMAN Modal Bangsa`,
    description,
    alternates: { canonical: `/${lang}/spmb` },
  };
}

export default async function SPMBPage({
  params,
}: PageProps<"/[lang]/spmb">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  
  const isId = lang === "id";
  const title = isId ? "Informasi Penerimaan Siswa Baru dan Pendidikan Jarak Jauh" : "Student Admissions & Distance Learning Information";
  const subtitle = isId 
    ? "Penerimaan Siswa Baru SMAN Modal Bangsa dan Program Layanan Pendidikan Jarak Jauh"
    : "New Student Admissions and Distance Learning Services at SMAN Modal Bangsa";

  // Fetch gallery items to display appropriate images dynamically
  const { posts: galleryItems } = await getCPT("galeri", { perPage: 24 }).catch(() => ({ posts: [] }));

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        plainTitle={true}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.quickLinks.items.spmb },
        ]}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <SPMBClient lang={lang} galleryItems={galleryItems} />
        </Container>
      </section>
    </>
  );
}
