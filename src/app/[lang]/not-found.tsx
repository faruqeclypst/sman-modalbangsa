import Link from "next/link";
import { Container } from "@/components/ui/container";

// not-found in [lang] cannot await params (it's rendered out-of-band).
// Provide bilingual content side by side with the default locale taking the lead.
export default function NotFound() {
  return (
    <Container size="md" className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--primary)]">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-[color:var(--foreground)] sm:text-4xl">
        Halaman tidak ditemukan / Page not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[color:var(--muted-foreground)]">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan. The page
        you are looking for is unavailable or has been moved.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/id"
          className="inline-flex items-center rounded-lg bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/en"
          className="inline-flex items-center rounded-lg border border-[color:var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
        >
          Back to home
        </Link>
      </div>
    </Container>
  );
}
