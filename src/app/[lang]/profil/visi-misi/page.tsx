import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

      {/* Visi — full-width statement */}
      <section className="bg-[#14532d] py-16 text-white sm:py-20">
        <Container size="md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            {dict.profile.vision.title}
          </p>
          <blockquote className="mt-6 text-2xl font-medium leading-snug sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-snug">
            &ldquo;{dict.profile.vision.body}&rdquo;
          </blockquote>
        </Container>
      </section>

      {/* Misi — numbered list, clean */}
      <section className="py-16 sm:py-20">
        <Container size="md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            {dict.profile.mission.title}
          </p>

          <ol className="mt-8 space-y-6">
            {dict.profile.mission.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-[color:var(--foreground)] sm:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Tujuan — numbered list, clean */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--muted)]/10 py-16 sm:py-20">
        <Container size="md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            {dict.profile.objectives.title}
          </p>

          <ol className="mt-8 space-y-6">
            {dict.profile.objectives.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)] text-sm font-bold">
                  {i + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-[color:var(--foreground)] sm:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
