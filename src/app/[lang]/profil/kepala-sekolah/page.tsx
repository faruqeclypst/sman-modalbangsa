import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/kepala-sekolah">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.profile.principal.title,
    description: dict.profile.principal.body,
    alternates: { canonical: `/${lang}/profil/kepala-sekolah` },
  };
}

export default async function PrincipalPage({
  params,
}: PageProps<"/[lang]/profil/kepala-sekolah">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.principal.title}
        subtitle={dict.profile.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.nav.principal },
        ]}
      />
      <Container size="md" className="py-12">
        <article className="rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-sm sm:p-10">
          <Quote className="size-10 text-[color:var(--primary)]/30" aria-hidden />
          <p className="mt-3 text-base font-semibold text-[color:var(--primary)]">
            {dict.profile.principal.greeting}
          </p>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--foreground)] sm:text-lg">
            {dict.profile.principal.body}
          </p>
        </article>
      </Container>
    </>
  );
}
