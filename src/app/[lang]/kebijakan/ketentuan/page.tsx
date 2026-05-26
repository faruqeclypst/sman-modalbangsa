import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Server,
  Copyright,
  Ban,
  MessageSquare,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  Scale,
  Mail,
  ChevronRight,
} from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kebijakan/ketentuan">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: lang === "id" ? "Ketentuan Layanan" : "Terms of Service",
    description:
      lang === "id"
        ? "Ketentuan layanan penggunaan website SMAN Modal Bangsa"
        : "Terms of service for using the SMAN Modal Bangsa website",
    alternates: { canonical: `/${lang}/kebijakan/ketentuan` },
  };
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-500" />
      <span>{children}</span>
    </li>
  );
}

function BulletRed({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Ban className="mt-0.5 size-4 shrink-0 text-red-400" />
      <span>{children}</span>
    </li>
  );
}

export default async function TermsOfServicePage({
  params,
}: PageProps<"/[lang]/kebijakan/ketentuan">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const isId = lang === "id";

  return (
    <>
      <PageHeader
        title={isId ? "Ketentuan Layanan" : "Terms of Service"}
        subtitle={
          isId
            ? "Syarat dan ketentuan penggunaan website SMAN Modal Bangsa"
            : "Terms and conditions for using the SMAN Modal Bangsa website"
        }
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: isId ? "Ketentuan Layanan" : "Terms of Service" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <Container size="md">
          {/* Intro card */}
          <div className="mb-8 flex items-start gap-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-5 sm:p-6">
            <FileText className="mt-0.5 size-6 shrink-0 text-blue-600" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {isId ? "Terakhir diperbarui: Mei 2026" : "Last updated: May 2026"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--foreground)] sm:text-[15px]">
                {isId
                  ? "Dengan mengakses dan menggunakan website SMAN Modal Bangsa (sman-modalbangsa.sch.id), Anda menyetujui untuk terikat dengan ketentuan layanan ini. Jika Anda tidak menyetujui, mohon untuk tidak menggunakan website ini."
                  : "By accessing and using the SMAN Modal Bangsa website (sman-modalbangsa.sch.id), you agree to be bound by these terms of service. If you do not agree, please do not use this website."}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Deskripsi Layanan */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <Server className="size-4 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Deskripsi Layanan" : "Service Description"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">
                  {isId
                    ? "Website ini merupakan portal informasi resmi SMAN Modal Bangsa yang menyediakan:"
                    : "This website is the official information portal of SMAN Modal Bangsa that provides:"}
                </p>
                <ul className="space-y-2.5">
                  <Bullet>{isId ? "Informasi sekolah, berita, dan pengumuman resmi." : "School information, news, and official announcements."}</Bullet>
                  <Bullet>{isId ? "Profil sekolah, guru, dan tenaga kependidikan." : "School, teacher, and staff profiles."}</Bullet>
                  <Bullet>{isId ? "Dokumentasi kegiatan dan prestasi." : "Activity documentation and achievements."}</Bullet>
                  <Bullet>{isId ? "Layanan unduhan dokumen resmi." : "Official document download services."}</Bullet>
                  <Bullet>{isId ? "Fitur komentar melalui Disqus." : "Comment features through Disqus."}</Bullet>
                </ul>
              </div>
            </div>

            {/* Hak Kekayaan Intelektual */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <Copyright className="size-4 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Hak Kekayaan Intelektual" : "Intellectual Property"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Seluruh konten di website ini, termasuk teks, gambar, logo, dan desain, merupakan milik SMAN Modal Bangsa kecuali dinyatakan lain. Konten tidak boleh direproduksi, didistribusikan, atau digunakan untuk tujuan komersial tanpa izin tertulis."
                  : "All content on this website, including text, images, logos, and design, belongs to SMAN Modal Bangsa unless otherwise stated. Content may not be reproduced, distributed, or used for commercial purposes without written permission."}
              </p>
            </div>

            {/* Penggunaan yang Dilarang */}
            <div className="rounded-2xl border border-red-100 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-red-100 pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-red-50">
                  <Ban className="size-4 text-red-500" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Penggunaan yang Dilarang" : "Prohibited Use"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">{isId ? "Pengguna dilarang untuk:" : "Users are prohibited from:"}</p>
                <ul className="space-y-2.5">
                  <BulletRed>{isId ? "Menggunakan website untuk tujuan ilegal atau tidak sah." : "Using the website for illegal or unauthorized purposes."}</BulletRed>
                  <BulletRed>{isId ? "Mengunggah konten yang mengandung virus, malware, atau kode berbahaya." : "Uploading content containing viruses, malware, or harmful code."}</BulletRed>
                  <BulletRed>{isId ? "Melakukan scraping atau pengambilan data secara otomatis tanpa izin." : "Scraping or automated data collection without permission."}</BulletRed>
                  <BulletRed>{isId ? "Menyebarkan informasi palsu yang mengatasnamakan sekolah." : "Spreading false information on behalf of the school."}</BulletRed>
                  <BulletRed>{isId ? "Mengganggu operasional website atau server." : "Disrupting website or server operations."}</BulletRed>
                </ul>
              </div>
            </div>

            {/* Komentar */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <MessageSquare className="size-4 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Komentar dan Konten Pengguna" : "Comments and User Content"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Fitur komentar disediakan melalui Disqus. Dengan berkomentar, Anda menyetujui "
                  : "Comment features are provided through Disqus. By commenting, you agree to our "}
                <Link href={`/${lang}/kebijakan/komentar`} className="font-semibold text-[color:var(--primary)] hover:underline">
                  {isId ? "Kebijakan Komentar" : "Comment Policy"}
                </Link>
                {isId
                  ? " kami dan ketentuan layanan Disqus. Kami berhak menghapus komentar yang melanggar kebijakan tanpa pemberitahuan."
                  : " and Disqus terms of service. We reserve the right to remove comments that violate our policy without notice."}
              </p>
            </div>

            {/* Tautan Eksternal */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <ExternalLink className="size-4 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Tautan Eksternal" : "External Links"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Website ini mungkin berisi tautan ke situs pihak ketiga. Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs tersebut."
                  : "This website may contain links to third-party sites. We are not responsible for the content, privacy policies, or practices of those sites."}
              </p>
            </div>

            {/* Batasan Tanggung Jawab */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <AlertTriangle className="size-4 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Batasan Tanggung Jawab" : "Limitation of Liability"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Website ini disediakan \"sebagaimana adanya\". SMAN Modal Bangsa tidak menjamin bahwa website akan selalu tersedia, bebas error, atau bebas dari komponen berbahaya. Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan website ini."
                  : "This website is provided \"as is\". SMAN Modal Bangsa does not guarantee that the website will always be available, error-free, or free from harmful components. We are not liable for any damages arising from the use of this website."}
              </p>
            </div>

            {/* Perubahan & Hukum — 2 columns */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3 pb-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                    <RefreshCw className="size-4 text-blue-600" />
                  </div>
                  <h2 className="text-sm font-bold text-[color:var(--foreground)] sm:text-base">
                    {isId ? "Perubahan Ketentuan" : "Changes to Terms"}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {isId
                    ? "Kami berhak mengubah ketentuan ini sewaktu-waktu. Perubahan berlaku setelah dipublikasikan di halaman ini."
                    : "We reserve the right to change these terms at any time. Changes become effective upon publication on this page."}
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3 pb-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                    <Scale className="size-4 text-blue-600" />
                  </div>
                  <h2 className="text-sm font-bold text-[color:var(--foreground)] sm:text-base">
                    {isId ? "Hukum yang Berlaku" : "Governing Law"}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {isId
                    ? "Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia."
                    : "These terms are governed by and construed in accordance with the laws of the Republic of Indonesia."}
                </p>
              </div>
            </div>

            {/* Kontak */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <Mail className="size-4 text-blue-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Kontak" : "Contact"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">
                  {isId
                    ? "Untuk pertanyaan mengenai ketentuan layanan ini, hubungi kami:"
                    : "For questions regarding these terms of service, contact us:"}
                </p>
                <div className="flex flex-col gap-2 rounded-xl bg-[color:var(--muted)]/50 p-4">
                  <p className="flex items-center gap-2">
                    <span className="text-base">📧</span>
                    <span className="font-medium text-[color:var(--foreground)]">info@sman-modalbangsa.sch.id</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-base">🔗</span>
                    <Link href={`/${lang}/kontak`} className="font-medium text-[color:var(--primary)] hover:underline">
                      {isId ? "Halaman Kontak" : "Contact Page"}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer navigation */}
          <nav className="mt-10 flex flex-wrap items-center gap-3 border-t border-[color:var(--border)] pt-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              {isId ? "Lihat juga:" : "See also:"}
            </span>
            <Link href={`/${lang}/kebijakan/privasi`} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
              {isId ? "Kebijakan Privasi" : "Privacy Policy"}
            </Link>
            <Link href={`/${lang}/kebijakan/komentar`} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
              {isId ? "Kebijakan Komentar" : "Comment Policy"}
            </Link>
          </nav>
        </Container>
      </section>
    </>
  );
}
