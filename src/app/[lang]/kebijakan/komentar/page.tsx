import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MessageCircle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  MessagesSquare,
  Users,
  Flag,
} from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kebijakan/komentar">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: lang === "id" ? "Kebijakan Komentar" : "Comment Policy",
    description:
      lang === "id"
        ? "Panduan berkomentar di website SMAN Modal Bangsa"
        : "Guidelines for commenting on the SMAN Modal Bangsa website",
    alternates: { canonical: `/${lang}/kebijakan/komentar` },
  };
}

export default async function CommentPolicyPage({
  params,
}: PageProps<"/[lang]/kebijakan/komentar">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const isId = lang === "id";

  const allowed = isId
    ? [
        "Komentar yang relevan dengan topik artikel.",
        "Pertanyaan yang sopan dan konstruktif.",
        "Berbagi pengalaman atau informasi tambahan yang bermanfaat.",
        "Kritik dan saran yang disampaikan dengan bahasa yang baik.",
        "Diskusi yang menghargai perbedaan pendapat.",
      ]
    : [
        "Comments relevant to the article topic.",
        "Polite and constructive questions.",
        "Sharing useful experiences or additional information.",
        "Criticism and suggestions delivered in appropriate language.",
        "Discussions that respect differences of opinion.",
      ];

  const prohibited = isId
    ? [
        "Ujaran kebencian, SARA, dan diskriminasi dalam bentuk apapun.",
        "Kata-kata kasar, vulgar, atau tidak pantas.",
        "Spam, promosi, atau iklan tanpa izin.",
        "Penyebaran informasi palsu atau hoaks.",
        "Ancaman, intimidasi, atau bullying terhadap siapapun.",
        "Konten pornografi atau kekerasan.",
        "Penyebaran data pribadi orang lain tanpa izin (doxxing).",
        "Tautan ke situs berbahaya atau tidak relevan.",
      ]
    : [
        "Hate speech, discrimination based on race/religion/ethnicity.",
        "Profanity, vulgarity, or inappropriate language.",
        "Spam, promotions, or unauthorized advertising.",
        "Spreading false information or hoaxes.",
        "Threats, intimidation, or bullying of anyone.",
        "Pornographic or violent content.",
        "Sharing others' personal data without consent (doxxing).",
        "Links to harmful or irrelevant websites.",
      ];

  return (
    <>
      <PageHeader
        title={isId ? "Kebijakan Komentar" : "Comment Policy"}
        subtitle={
          isId
            ? "Panduan berkomentar di website SMAN Modal Bangsa"
            : "Guidelines for commenting on the SMAN Modal Bangsa website"
        }
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: isId ? "Kebijakan Komentar" : "Comment Policy" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <Container size="md">
          {/* Intro card */}
          <div className="mb-8 flex items-start gap-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white p-5 sm:p-6">
            <MessageCircle className="mt-0.5 size-6 shrink-0 text-amber-600" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                {isId ? "Selamat Datang di Kolom Komentar" : "Welcome to the Comment Section"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--foreground)] sm:text-[15px]">
                {isId
                  ? "Kami menyambut komentar yang relevan dan penuh hormat. Kolom komentar adalah ruang untuk berdiskusi, bertanya, dan berbagi pendapat secara konstruktif. Komentar yang tidak sesuai topik atau melanggar kebijakan dapat dihapus."
                  : "We welcome relevant and respectful comments. The comment section is a space for discussion, questions, and sharing constructive opinions. Off-topic comments or those violating this policy may be removed."}
              </p>
            </div>
          </div>

          {/* Allowed & Prohibited — side by side */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Allowed */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </div>
                <h2 className="text-base font-bold text-emerald-800 sm:text-lg">
                  {isId ? "Yang Diperbolehkan" : "Allowed"}
                </h2>
              </div>
              <ul className="mt-4 space-y-3">
                {allowed.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                    </div>
                    <span className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prohibited */}
            <div className="rounded-2xl border-2 border-red-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-red-100 pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-red-100">
                  <XCircle className="size-5 text-red-600" />
                </div>
                <h2 className="text-base font-bold text-red-800 sm:text-lg">
                  {isId ? "Yang Dilarang" : "Prohibited"}
                </h2>
              </div>
              <ul className="mt-4 space-y-3">
                {prohibited.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <XCircle className="size-3 text-red-600" />
                    </div>
                    <span className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional sections */}
          <div className="mt-8 space-y-6">
            {/* Moderasi */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-purple-50">
                  <ShieldAlert className="size-4 text-purple-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Moderasi" : "Moderation"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p className="mb-3">{isId ? "Tim moderator berhak untuk:" : "The moderation team reserves the right to:"}</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 size-4 shrink-0 text-purple-400" />
                    <span>{isId ? "Menghapus komentar yang melanggar kebijakan tanpa pemberitahuan." : "Remove comments that violate this policy without notice."}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 size-4 shrink-0 text-purple-400" />
                    <span>{isId ? "Memblokir pengguna yang berulang kali melanggar aturan." : "Block users who repeatedly violate the rules."}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 size-4 shrink-0 text-purple-400" />
                    <span>{isId ? "Mengedit atau menyembunyikan komentar yang mengandung informasi sensitif." : "Edit or hide comments containing sensitive information."}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sistem Komentar */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-sky-50">
                  <MessagesSquare className="size-4 text-sky-600" />
                </div>
                <h2 className="text-base font-bold text-[color:var(--foreground)] sm:text-lg">
                  {isId ? "Sistem Komentar" : "Comment System"}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-[15px]">
                <p>
                  {isId
                    ? "Website ini menggunakan Disqus sebagai platform komentar. Dengan berkomentar, Anda juga tunduk pada:"
                    : "This website uses Disqus as the comment platform. By commenting, you are also subject to:"}
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <a href="https://help.disqus.com/en/articles/1717102-terms-of-service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] px-4 py-2.5 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
                    📋 {isId ? "Ketentuan Layanan Disqus" : "Disqus Terms of Service"}
                  </a>
                  <a href="https://help.disqus.com/en/articles/1717103-disqus-privacy-policy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] px-4 py-2.5 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
                    🔒 {isId ? "Kebijakan Privasi Disqus" : "Disqus Privacy Policy"}
                  </a>
                </div>
              </div>
            </div>

            {/* Tanggung Jawab & Pelaporan — 2 columns */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3 pb-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50">
                    <Users className="size-4 text-orange-600" />
                  </div>
                  <h2 className="text-sm font-bold text-[color:var(--foreground)] sm:text-base">
                    {isId ? "Tanggung Jawab" : "Responsibility"}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {isId
                    ? "Setiap komentar merupakan tanggung jawab pribadi penulisnya. SMAN Modal Bangsa tidak bertanggung jawab atas isi komentar pengunjung."
                    : "Each comment is the personal responsibility of its author. SMAN Modal Bangsa is not responsible for visitor comments."}
                </p>
              </div>

              <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3 pb-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-rose-50">
                    <Flag className="size-4 text-rose-600" />
                  </div>
                  <h2 className="text-sm font-bold text-[color:var(--foreground)] sm:text-base">
                    {isId ? "Pelaporan" : "Reporting"}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {isId
                    ? "Temukan komentar melanggar? Gunakan fitur \"Report\" di Disqus atau hubungi kami via "
                    : "Found a violating comment? Use the \"Report\" feature in Disqus or contact us via "}
                  <Link href={`/${lang}/kontak`} className="font-medium text-[color:var(--primary)] hover:underline">
                    {isId ? "halaman kontak" : "contact page"}
                  </Link>.
                </p>
              </div>
            </div>
          </div>

          {/* Summary box */}
          <div className="mt-8 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/30 p-6 text-center sm:p-8">
            <p className="text-base font-bold text-emerald-800 sm:text-lg">
              💬{" "}
              {isId
                ? "Berkomentar dengan sopan, relevan, dan konstruktif."
                : "Comment politely, relevantly, and constructively."}
            </p>
            <p className="mt-1 text-sm text-emerald-700/80">
              {isId
                ? "Hormati sesama pengguna. Komentar yang melanggar akan dihapus."
                : "Respect fellow users. Violating comments will be removed."}
            </p>
          </div>

          {/* Footer navigation */}
          <nav className="mt-10 flex flex-wrap items-center gap-3 border-t border-[color:var(--border)] pt-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              {isId ? "Lihat juga:" : "See also:"}
            </span>
            <Link href={`/${lang}/kebijakan/privasi`} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
              {isId ? "Kebijakan Privasi" : "Privacy Policy"}
            </Link>
            <Link href={`/${lang}/kebijakan/ketentuan`} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]">
              {isId ? "Ketentuan Layanan" : "Terms of Service"}
            </Link>
          </nav>
        </Container>
      </section>
    </>
  );
}
