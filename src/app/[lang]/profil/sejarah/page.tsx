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

      {/* Intro section */}
      <section className="py-16 sm:py-20">
        <Container size="md">
          <p className="text-xl leading-relaxed text-[color:var(--foreground)] sm:text-2xl sm:leading-relaxed">
            {dict.profile.history.intro}
          </p>

          <div className="mt-8 h-px bg-[color:var(--border)]" />

          <div className="mt-8 text-base leading-[1.8] text-[color:var(--muted-foreground)] sm:text-lg sm:leading-[1.9] space-y-6">
            {dict.profile.history.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Program Khusus section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[color:var(--foreground)] sm:text-3xl">
              {dict.profile.history.specialProgramsTitle}
            </h3>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {dict.profile.history.specialPrograms.map((prog: { name: string; desc: string }, i: number) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[color:var(--primary)]/50"
                >
                  <h4 className="text-lg font-bold text-[color:var(--foreground)]">
                    {prog.name}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                    {prog.desc}
                  </p>
                </div>
              ))}
            </div>
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
