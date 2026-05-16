import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false; // fully static

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/sejarah">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.profile.history.title,
    description: dict.profile.history.intro,
    alternates: { canonical: `/${lang}/profil/sejarah` },
  };
}

export default async function HistoryPage({
  params,
}: PageProps<"/[lang]/profil/sejarah">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.history.title}
        subtitle={dict.profile.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.profile.history.title },
        ]}
      />
      <Container size="md" className="py-12">
        <div className="prose-article max-w-none">
          <p className="lead text-lg leading-relaxed text-[color:var(--muted-foreground)]">
            {dict.profile.history.intro}
          </p>
          <p>{dict.profile.history.body}</p>
        </div>
      </Container>
    </>
  );
}
