import Link from "next/link";
import { Container } from "@/components/ui/container";

// Single-language site (Indonesian) — plain 404 page.
export default function NotFound() {
  return (
    <Container size="md" className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--primary)]">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-[color:var(--foreground)] sm:text-4xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[color:var(--muted-foreground)]">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </Container>
  );
}
