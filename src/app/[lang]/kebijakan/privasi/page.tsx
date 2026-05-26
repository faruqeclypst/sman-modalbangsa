import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Database,
  Eye,
  Globe,
  Cookie,
  Lock,
  UserCheck,
  RefreshCw,
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
}: PageProps<"/[lang]/kebijakan/privasi">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: lang === "id" ? "Kebijakan Privasi" : "Privacy Policy",
    description:
      lang === "id"
        ? "Kebijakan privasi website SMAN Modal Bangsa"
        : "Privacy policy of SMAN Modal Bangsa website",
    alternates: { canonical: `/${lang}/kebijakan/privasi` },
  };
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <ChevronRight className="mt-0.5 size-4 shrink-0 text-[color:var(--primary)]" />
      <span>{children}</span>
    </li>
  );
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[lang]/kebijakan/privasi">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const isId = lang === "id";

  return (
    <>
      <PageHeader
        title={isId ? "Kebijakan Privasi" : "Privacy Policy"}
        subtitle={
          isId
            ? "Komitmen kami dalam melindungi privasi pengunjung website"
            : "Our commitment to protecting visitor privacy"
        }
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: isId ? "Kebijakan Privasi" : "Privacy Policy" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <Container size="md">
          {/* Intro card */}
          <div className="mb-8 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-5 sm:p-6">
            <Shield className="mt-0.5 size-6 shrink-0 text-[color:var(--primary)]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--primary)]">
                {isId ? "Terakhir diperbarui: Mei 2026" : "Last updated: May 2026"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--foreground)] sm:text-[15px]">
                {isId
                  ? "Website SMAN Modal Bangsa (sman-modalbangsa.sch.id) berkomitmen melindungi privasi pengunjung. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda."
                  : "The SMAN Modal Bangsa website (sman-modalbangsa.sch.id) is committed to protecting visitor privacy. This policy explains how we collect, use, and protect your information."}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* 1. Informasi yang Dikumpulkan */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Database className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Informasi yang Dikumpulkan" : "Information We Collect"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">{isId ? "Kami dapat mengumpulkan informasi berikut:" : "We may collect the following information:"}</p>
                <ul className="space-y-2.5">
                  <Bullet>
                    {isId
                      ? "Data teknis: alamat IP, jenis browser, sistem operasi, dan halaman yang dikunjungi (melalui log server dan analitik)."
                      : "Technical data: IP address, browser type, operating system, and pages visited (through server logs and analytics)."}
                  </Bullet>
                  <Bullet>
                    {isId
                      ? "Data komentar: nama, email, dan konten komentar yang Anda kirimkan melalui sistem Disqus."
                      : "Comment data: name, email, and comment content submitted through the Disqus system."}
                  </Bullet>
                  <Bullet>
                    {isId
                      ? "Data formulir kontak: nama, email, dan pesan yang Anda kirimkan melalui halaman kontak."
                      : "Contact form data: name, email, and message submitted through the contact page."}
                  </Bullet>
                </ul>
              </div>
            </div>

            {/* 2. Penggunaan Informasi */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Eye className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Penggunaan Informasi" : "Use of Information"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">{isId ? "Informasi yang dikumpulkan digunakan untuk:" : "Collected information is used to:"}</p>
                <ul className="space-y-2.5">
                  <Bullet>{isId ? "Meningkatkan kualitas layanan dan konten website." : "Improve the quality of website services and content."}</Bullet>
                  <Bullet>{isId ? "Merespons pertanyaan dan pesan dari pengunjung." : "Respond to visitor inquiries and messages."}</Bullet>
                  <Bullet>{isId ? "Menganalisis statistik kunjungan untuk pengembangan website." : "Analyze visit statistics for website development."}</Bullet>
                  <Bullet>{isId ? "Memastikan keamanan dan mencegah penyalahgunaan." : "Ensure security and prevent misuse."}</Bullet>
                </ul>
              </div>
            </div>

            {/* 3. Layanan Pihak Ketiga */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Globe className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Layanan Pihak Ketiga" : "Third-Party Services"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-4">
                  {isId
                    ? "Website ini menggunakan layanan pihak ketiga yang memiliki kebijakan privasi tersendiri:"
                    : "This website uses third-party services with their own privacy policies:"}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)]/40 p-4">
                    <p className="text-sm font-bold text-[color:var(--foreground)]">Disqus</p>
                    <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                      {isId ? "Sistem komentar" : "Comment system"}
                    </p>
                    <a href="https://help.disqus.com/en/articles/1717103-disqus-privacy-policy" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--primary)] hover:underline">
                      {isId ? "Lihat kebijakan" : "View policy"} →
                    </a>
                  </div>
                  <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)]/40 p-4">
                    <p className="text-sm font-bold text-[color:var(--foreground)]">Vercel</p>
                    <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                      {isId ? "Hosting website" : "Website hosting"}
                    </p>
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--primary)] hover:underline">
                      {isId ? "Lihat kebijakan" : "View policy"} →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Cookie */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Cookie className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  Cookie
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Website ini dapat menggunakan cookie untuk analitik dan fungsi komentar Disqus. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda."
                  : "This website may use cookies for analytics and Disqus comment functionality. You can manage cookie preferences through your browser settings."}
              </p>
            </div>

            {/* 5. Keamanan Data */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Lock className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Keamanan Data" : "Data Security"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi dari akses tidak sah, perubahan, atau penghapusan. Namun, tidak ada transmisi data melalui internet yang sepenuhnya aman."
                  : "We implement reasonable security measures to protect information from unauthorized access, alteration, or deletion. However, no data transmission over the internet is completely secure."}
              </p>
            </div>

            {/* 6. Hak Pengguna */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <UserCheck className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Hak Pengguna" : "User Rights"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi Anda. Silakan hubungi kami melalui halaman kontak untuk mengajukan permintaan terkait data Anda."
                  : "You have the right to request access, correction, or deletion of your personal data. Please contact us through the contact page to submit requests regarding your data."}
              </p>
            </div>

            {/* 7. Perubahan Kebijakan */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <RefreshCw className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Perubahan Kebijakan" : "Policy Changes"}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                {isId
                  ? "Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru."
                  : "We may update this policy at any time. Changes will be published on this page with the latest update date."}
              </p>
            </div>

            {/* 8. Kontak */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Mail className="size-4 text-[color:var(--primary)]" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Kontak" : "Contact"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">
                  {isId
                    ? "Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:"
                    : "If you have questions about this privacy policy, please contact us:"}
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
            <Link href={`/${lang}/kebijakan/ketentuan`} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
              {isId ? "Ketentuan Layanan" : "Terms of Service"}
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
