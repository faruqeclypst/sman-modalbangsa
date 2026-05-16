import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Building2,
  FlaskConical,
  Home as HomeIcon,
  type LucideIcon,
  Trees,
  Trophy,
} from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/fasilitas">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.profile.facilities.title,
    description: dict.profile.facilities.subtitle,
    alternates: { canonical: `/${lang}/profil/fasilitas` },
  };
}

const icons: LucideIcon[] = [
  HomeIcon,
  FlaskConical,
  BookOpen,
  Building2,
  Trophy,
  Trees,
];

export default async function FacilitiesPage({
  params,
}: PageProps<"/[lang]/profil/fasilitas">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={dict.profile.facilities.title}
        subtitle={dict.profile.facilities.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.nav.facilities },
        ]}
      />
      <Container className="py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.profile.facilities.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={item.name}
                className="rounded-xl border border-[color:var(--border)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[color:var(--foreground)]">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm text-[color:var(--muted-foreground)]">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}
