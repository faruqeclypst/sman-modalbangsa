import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

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

const MILESTONES = [
  { year: "2006", id: "Pendirian", en: "Founded" },
  { year: "2007", id: "Angkatan Pertama", en: "First Cohort" },
  { year: "2010", id: "Prestasi Nasional", en: "National Awards" },
  { year: "2015", id: "Akreditasi A", en: "A Accreditation" },
  { year: "2020", id: "Fasilitas Baru", en: "New Facilities" },
  { year: "2024", id: "Go International", en: "Going Global" },
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

      <section className="py-16 sm:py-20">
        <Container size="md">
          {/* Lead paragraph — editorial style */}
          <p className="text-xl leading-relaxed text-[color:var(--foreground)] sm:text-2xl sm:leading-relaxed">
            {dict.profile.history.intro}
          </p>

          <div className="mt-8 h-px bg-[color:var(--border)]" />

          <div className="mt-8 text-base leading-[1.8] text-[color:var(--muted-foreground)] sm:text-lg sm:leading-[1.9]">
            <p>
              {isId
                ? "SMAN Modal Bangsa didirikan pada tahun 2006 oleh Pemerintah Provinsi Aceh sebagai wujud komitmen membangun kembali sumber daya manusia Aceh pasca-bencana tsunami 2004. Berlokasi di Jl. Bandara Sultan Iskandar Muda, Blang Bintang, Kabupaten Aceh Besar, sekolah ini dirancang sebagai sekolah unggulan berasrama (boarding school) yang menampung siswa-siswi terbaik dari seluruh kabupaten/kota di Aceh."
                : "SMAN Modal Bangsa was established in 2006 by the Aceh Provincial Government as a commitment to rebuilding Aceh's human resources after the 2004 tsunami disaster. Located on Jl. Bandara Sultan Iskandar Muda, Blang Bintang, Aceh Besar District, the school was designed as a premier boarding school that accommodates the best students from all districts across Aceh."}
            </p>
            <p className="mt-6">
              {isId
                ? "Dengan sistem pendidikan yang memadukan kurikulum nasional, penguatan karakter Islami, dan pengembangan bakat melalui berbagai ekstrakurikuler, SMAN Modal Bangsa telah melahirkan ratusan alumni yang tersebar di perguruan tinggi terbaik dalam dan luar negeri. Sekolah ini konsisten meraih prestasi di Olimpiade Sains Nasional, kompetisi robotika, debat, dan berbagai ajang akademik lainnya."
                : "With an educational system that combines the national curriculum, Islamic character building, and talent development through various extracurricular activities, SMAN Modal Bangsa has produced hundreds of alumni spread across the best universities domestically and internationally. The school consistently achieves in the National Science Olympiad, robotics competitions, debates, and various other academic events."}
            </p>
            <p className="mt-6">
              {isId
                ? "Saat ini SMAN Modal Bangsa terus berkembang dengan fasilitas modern, tenaga pendidik berkualitas, dan jaringan kerjasama dengan berbagai institusi pendidikan. Semangat \"Modal Bangsa\" — menjadi modal bagi kemajuan bangsa — tetap menjadi ruh yang menggerakkan seluruh civitas akademika."
                : "Today, SMAN Modal Bangsa continues to grow with modern facilities, qualified educators, and a network of partnerships with various educational institutions. The spirit of \"Modal Bangsa\" — becoming the capital for national progress — remains the driving force for the entire academic community."}
            </p>
          </div>
        </Container>
      </section>

      {/* Milestones — horizontal scroll on mobile, grid on desktop */}
      <section className="border-y border-[color:var(--border)] bg-[color:var(--muted)]/30 py-12 sm:py-16">
        <Container>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[color:var(--muted-foreground)]">
            {isId ? "Tonggak Sejarah" : "Milestones"}
          </h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-6">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="flex min-w-[140px] flex-shrink-0 flex-col rounded-xl border border-[color:var(--border)] bg-white p-5 shadow-sm sm:min-w-0"
              >
                <span className="text-2xl font-bold text-[color:var(--primary)]">{m.year}</span>
                <span className="mt-2 text-sm text-[color:var(--foreground)]">
                  {isId ? m.id : m.en}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
