import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Target, Eye } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/visi-misi">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.profile.vision.title} & ${dict.profile.mission.title}`,
    description: dict.profile.vision.body,
    alternates: { canonical: `/${lang}/profil/visi-misi` },
  };
}

export default async function VisionMissionPage({
  params,
}: PageProps<"/[lang]/profil/visi-misi">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        title={`${dict.profile.vision.title} & ${dict.profile.mission.title}`}
        subtitle={dict.profile.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.nav.visionMission },
        ]}
      />
      <Container size="md" className="py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[color:var(--border)] bg-white p-6 shadow-sm">
            <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
              <Eye className="size-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-bold text-[color:var(--foreground)]">
              {dict.profile.vision.title}
            </h2>
            <p className="mt-2 text-[color:var(--muted-foreground)]">
              {dict.profile.vision.body}
            </p>
          </article>
          <article className="rounded-xl border border-[color:var(--border)] bg-white p-6 shadow-sm">
            <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[color:var(--secondary)]/10 text-[color:var(--secondary)]">
              <Target className="size-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-bold text-[color:var(--foreground)]">
              {dict.profile.mission.title}
            </h2>
            <ul className="mt-3 space-y-2.5">
              {dict.profile.mission.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[color:var(--foreground)]">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[color:var(--accent)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </>
  );
}
