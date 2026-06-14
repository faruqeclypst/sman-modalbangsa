import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { HistoryNarrative } from "@/components/profil/history-narrative";
import { AnimatedTimeline } from "@/components/profil/animated-timeline";
import { SpecialPrograms } from "@/components/profil/special-programs";

export const revalidate = false;

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

const MILESTONES_ID = [
  {
    year: "1994",
    title: "Pendirian Sekolah",
    description:
      "SMAN Modal Bangsa resmi didirikan di bawah naungan Pemerintah Daerah melalui Kanwil Depdikbud Provinsi Daerah Istimewa Aceh.",
  },
  {
    year: "1994–1997",
    title: "Kampus Awal",
    description:
      "Pada masa awal berdirinya, kegiatan belajar mengajar dilaksanakan di Lampeuneurut hingga Juli 1997.",
  },
  {
    year: "1997",
    title: "Relokasi ke Meulayo",
    description:
      "Memasuki tahun ajaran 1997–1998 (angkatan keempat), seluruh aktivitas dipindahkan ke kampus baru di Meulayo, Kecamatan Kuta Baro, Kabupaten Aceh Besar dengan luas lahan tujuh hektare.",
  },
  {
    year: "Sekarang",
    title: "Blang Bintang",
    description:
      "Kini berlokasi di Jalan Bandara Sultan Iskandar Muda, Cot Geundreut, Kecamatan Blang Bintang, Kabupaten Aceh Besar, dikelola Pemerintah Aceh dengan sistem pendidikan unggul berasrama.",
  },
];

const MILESTONES_EN = [
  {
    year: "1994",
    title: "School Founded",
    description:
      "SMAN Modal Bangsa was officially established under the Regional Government through the Kanwil Depdikbud of the Special Region of Aceh.",
  },
  {
    year: "1994–1997",
    title: "Initial Campus",
    description:
      "In the early years of its establishment, teaching and learning activities were conducted in Lampeuneurut until July 1997.",
  },
  {
    year: "1997",
    title: "Relocation to Meulayo",
    description:
      "Entering the 1997–1998 academic year (fourth batch), all activities moved to the new campus in Meulayo, Kuta Baro, Aceh Besar, on seven hectares of land.",
  },
  {
    year: "Present",
    title: "Blang Bintang",
    description:
      "Now located on Jalan Bandara Sultan Iskandar Muda, Cot Geundreut, Blang Bintang, Aceh Besar, managed by the Aceh Government with a premier boarding school system.",
  },
];

export default async function HistoryPage({
  params,
}: PageProps<"/[lang]/profil/sejarah">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const isId = lang === "id";

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

      {/* Unified Immersive Content Canvas */}
      <div className="bg-white py-16 sm:py-24 space-y-28 md:space-y-40 relative">
        {/* Subtle decorative grid overlay spanning the entire content layout */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Section 1: Narrative History (Split Grid) */}
        <Container size="xl" className="relative z-10">
          <HistoryNarrative
            intro={dict.profile.history.intro}
            paragraphs={dict.profile.history.paragraphs}
            lang={lang}
          />
        </Container>

        {/* Section 2: History Timeline */}
        <Container size="xl" className="relative z-10">
          <AnimatedTimeline
            items={isId ? MILESTONES_ID : MILESTONES_EN}
            heading={lang === "id" ? "Tonggak Sejarah" : "Milestones"}
          />
        </Container>

        {/* Section 2: Program Khusus */}
        <Container size="xl" className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 inline-block mb-3">
              {lang === "id" ? "Kurikulum Unggulan" : "Flagship Curriculum"}
            </span>
            <h3 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-tight leading-tight uppercase">
              {dict.profile.history.specialProgramsTitle}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
              {lang === "id" 
                ? "Enam pilar program unggulan yang dirancang komprehensif untuk melahirkan alumni yang berkarakter kuat, berprestasi, dan berwawasan global." 
                : "Six pillar flagship programs comprehensively designed to produce graduates with strong character, high achievements, and global outlook."}
            </p>
          </div>

          <SpecialPrograms
            programs={dict.profile.history.specialPrograms}
            lang={lang}
          />
        </Container>

      </div>
    </>
  );
}
