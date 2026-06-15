import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
            {/* Photo — simple, no gimmicks */}
            <div className="mx-auto lg:mx-0">
              <div className="relative w-[240px] overflow-hidden rounded-2xl bg-emerald-50 sm:w-[280px]">
                <Image
                  src="/headmaster.png"
                  alt="Misra, S.Pd., M.Pd"
                  width={280}
                  height={380}
                  className="h-auto w-full object-contain"
                  style={{ width: "100%", height: "auto" }}
                  priority
                  unoptimized
                />
              </div>
              <div className="mt-4 text-center lg:text-left">
                <p className="text-lg font-bold text-[color:var(--foreground)]">Misra, S.Pd., M.Pd</p>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  {lang === "id" ? "Kepala Sekolah" : "Principal"}
                </p>
              </div>
            </div>

            {/* Message */}
            <div>
              <p className="text-sm font-medium text-[color:var(--primary)]">
                {dict.profile.principal.greeting}
              </p>

              <p className="mt-6 text-lg leading-relaxed text-[color:var(--foreground)] sm:text-xl sm:leading-relaxed">
                {dict.profile.principal.body}
              </p>

              <div className="mt-10 border-t border-[color:var(--border)] pt-6">
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  {lang === "id"
                    ? "Dengan semangat pendidikan yang berkualitas, kami mengajak seluruh stakeholder untuk bersama-sama mewujudkan generasi yang beriman, berilmu, dan berakhlak mulia. Mari kita jadikan SMAN Modal Bangsa sebagai rumah kedua yang nyaman untuk belajar dan bertumbuh."
                    : "With the spirit of quality education, we invite all stakeholders to work together in creating a generation that is faithful, knowledgeable, and noble in character. Let us make SMAN Modal Bangsa a comfortable second home for learning and growing."}
                </p>
                <p className="mt-4 font-semibold text-[color:var(--foreground)]">
                  — Misra, S.Pd., M.Pd
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
