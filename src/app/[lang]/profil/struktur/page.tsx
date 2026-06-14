import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import { StructureViewer } from "@/components/profil/structure-viewer";
import { ArrowDownToLine, Users } from "lucide-react";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/profil/struktur">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.nav.structure,
    description: dict.nav.structure,
    alternates: { canonical: `/${lang}/profil/struktur` },
  };
}

export default async function StructurePage({
  params,
}: PageProps<"/[lang]/profil/struktur">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const isId = lang === "id";

  return (
    <>
      <PageHeader
        title={dict.nav.structure}
        subtitle={dict.profile.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.profile },
          { label: dict.nav.structure },
        ]}
      />

      {/* Main content using Apple-esque / Editorial structural guidelines */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-[color:var(--background)]">
        
        {/* Subtle glow orb in the background */}
        <div aria-hidden className="absolute -left-64 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/3" />
        
        <Container size="xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-20 items-center">
            
            {/* Left Column - Editorial Typography & Nested CTA */}
            <div className="space-y-8">
              <FadeIn delay={0.1} direction="up" className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[color:var(--primary)]">
                  <Users className="h-3.5 w-3.5" />
                  <span>{isId ? "Struktur Organisasi" : "Hierarchy Map"}</span>
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] font-sfpro sm:text-4xl leading-tight">
                  {isId ? "Tata Kelola & Alur Koordinasi" : "Governance & Coordination"}
                </h2>
                
                <p className="text-base leading-relaxed text-[color:var(--muted-foreground)]">
                  {isId 
                    ? "SMA Negeri Modal Bangsa dikelola secara terpadu melalui alur instruksi dan koordinasi yang jelas, guna memastikan sinergi program pengajaran akademis, pembinaan keagamaan berasrama, dan pengembangan karakter kepemimpinan berjalan optimal."
                    : "SMA Negeri Modal Bangsa is managed through clear channels of instruction and coordination to ensure optimal synergy across academic programs, boarding operations, and character development."}
                </p>
              </FadeIn>

              {/* Informative List */}
              <FadeIn delay={0.25} direction="up" className="space-y-4 border-t border-[color:var(--border)] pt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--foreground)]">
                  {isId ? "Kanal Kepemimpinan Utama" : "Core Leadership Channels"}
                </h3>
                <ul className="space-y-3.5 text-sm text-[color:var(--muted-foreground)]">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{isId ? "Komite Sekolah & Kepala Sekolah" : "School Committee & Principal"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{isId ? "Kepala Urusan Tata Usaha & Urusan Administrasi" : "Head of Administration Services"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{isId ? "Wakil Kepala Sekolah Bidang Kurikulum, Kesiswaan, Humas, & Sarpras" : "Vice Principals of Curriculum, Student Affairs, PR, & Facilities"}</span>
                  </li>
                </ul>
              </FadeIn>

              {/* Nested CTA / Island Button */}
              <FadeIn delay={0.4} direction="up" className="pt-2">
                <a
                  href="/images/struktur/struktur.jpeg"
                  download="Struktur_Organisasi_SMAN_Modal_Bangsa.jpeg"
                  className="group inline-flex items-center gap-4 bg-[color:var(--primary)] text-white pl-6 pr-2.5 py-2.5 rounded-full hover:opacity-95 active:scale-[0.98] transition-all duration-300 shadow-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {isId ? "Unduh Struktur" : "Download Chart"}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
                    <ArrowDownToLine className="h-4 w-4" />
                  </span>
                </a>
              </FadeIn>
            </div>

            {/* Right Column - Double Bezel Card Wrapper */}
            <FadeIn delay={0.2} direction="up" className="w-full">
              <div className="rounded-[2rem] bg-zinc-100/60 dark:bg-zinc-800/40 p-2 border border-zinc-200/50 dark:border-zinc-700/30">
                <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/30 shadow-md">
                  <StructureViewer
                    src="/images/struktur/struktur.jpeg"
                    alt={isId ? "Struktur Organisasi SMAN Modal Bangsa" : "SMAN Modal Bangsa Organizational Structure"}
                  />
                </div>
              </div>
            </FadeIn>

          </div>
        </Container>
      </section>
    </>
  );
}
