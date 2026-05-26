import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { AnimatedTimeline } from "@/components/profil/animated-timeline";

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
    year: "2004",
    title: "Tsunami Aceh",
    description:
      "Bencana tsunami melanda Aceh. Lahir tekad untuk membangun kembali sumber daya manusia Aceh melalui pendidikan berkualitas.",
  },
  {
    year: "2006",
    title: "Pendirian Sekolah",
    description:
      "SMAN Modal Bangsa resmi didirikan oleh Pemerintah Provinsi Aceh sebagai sekolah unggulan berasrama di Blang Bintang, Aceh Besar.",
  },
  {
    year: "2007",
    title: "Angkatan Pertama",
    description:
      "Menerima siswa-siswi terbaik angkatan pertama dari seluruh kabupaten/kota di Aceh. Awal perjalanan panjang mencetak generasi unggul.",
  },
  {
    year: "2010",
    title: "Prestasi Nasional Pertama",
    description:
      "Meraih medali pertama di Olimpiade Sains Nasional (OSN). Membuktikan kualitas pendidikan yang setara dengan sekolah terbaik Indonesia.",
  },
  {
    year: "2015",
    title: "Akreditasi A",
    description:
      "Mendapatkan akreditasi A dari BAN-S/M. Pengakuan resmi atas standar mutu pendidikan yang tinggi dan konsisten.",
  },
  {
    year: "2018",
    title: "Ekspansi Fasilitas",
    description:
      "Pembangunan laboratorium sains modern, perpustakaan digital, dan asrama baru untuk mendukung kapasitas dan kualitas pembelajaran.",
  },
  {
    year: "2020",
    title: "Adaptasi Digital",
    description:
      "Transformasi digital pembelajaran selama pandemi. Implementasi e-learning dan CBT (Computer Based Test) secara penuh.",
  },
  {
    year: "2024",
    title: "Go International",
    description:
      "Siswa meraih prestasi di kompetisi internasional. Kerjasama dengan institusi pendidikan luar negeri semakin diperluas.",
  },
];

const MILESTONES_EN = [
  {
    year: "2004",
    title: "Aceh Tsunami",
    description:
      "The tsunami devastated Aceh. A determination was born to rebuild Aceh's human resources through quality education.",
  },
  {
    year: "2006",
    title: "School Founded",
    description:
      "SMAN Modal Bangsa was officially established by the Aceh Provincial Government as a premier boarding school in Blang Bintang, Aceh Besar.",
  },
  {
    year: "2007",
    title: "First Cohort",
    description:
      "Accepted the best students from all districts across Aceh. The beginning of a long journey to produce excellent generations.",
  },
  {
    year: "2010",
    title: "First National Achievement",
    description:
      "Won the first medal at the National Science Olympiad (OSN). Proving educational quality on par with Indonesia's best schools.",
  },
  {
    year: "2015",
    title: "A Accreditation",
    description:
      "Received A accreditation from BAN-S/M. Official recognition of consistently high educational quality standards.",
  },
  {
    year: "2018",
    title: "Facility Expansion",
    description:
      "Construction of modern science laboratories, digital library, and new dormitories to support capacity and learning quality.",
  },
  {
    year: "2020",
    title: "Digital Adaptation",
    description:
      "Digital learning transformation during the pandemic. Full implementation of e-learning and Computer Based Testing (CBT).",
  },
  {
    year: "2024",
    title: "Going Global",
    description:
      "Students achieved in international competitions. Partnerships with overseas educational institutions expanded further.",
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

      {/* Intro section */}
      <section className="py-16 sm:py-20">
        <Container size="md">
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

      {/* Animated Timeline */}
      <section className="border-y border-[color:var(--border)] bg-[color:var(--muted)]/20 py-16 sm:py-20">
        <Container size="lg">
          <AnimatedTimeline
            items={isId ? MILESTONES_ID : MILESTONES_EN}
            heading={isId ? "Tonggak Sejarah" : "Milestones"}
          />
        </Container>
      </section>
    </>
  );
}
