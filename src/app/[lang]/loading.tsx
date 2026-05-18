import { Container } from "@/components/ui/container";

/**
 * Generic page-level loading skeleton shown during client-side navigation.
 * Uses a neutral layout: PageHeader + content grid — works for any page type.
 */
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* PageHeader skeleton — green gradient like the real one */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-gradient-to-br from-[#14532d] via-[#166534] to-[#15803d]">
        <Container className="py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-16 rounded bg-white/20" />
            <div className="h-3 w-3 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/20" />
            <div className="h-3 w-3 rounded bg-white/10" />
            <div className="h-3 w-24 rounded bg-white/30" />
          </div>
          {/* Title */}
          <div className="h-10 w-72 rounded-lg bg-white/20" />
          {/* Subtitle */}
          <div className="mt-3 h-5 w-96 max-w-full rounded-md bg-white/10" />
        </Container>
      </section>

      {/* Content skeleton */}
      <Container className="py-10 sm:py-12">
        {/* Filter pills */}
        <div className="mb-8">
          <div className="mb-3 h-3 w-40 rounded bg-[color:var(--muted)]" />
          <div className="flex flex-wrap gap-2">
            <div className="h-9 w-20 rounded-full bg-[color:var(--muted)]" />
            <div className="h-9 w-28 rounded-full bg-[color:var(--muted)]" />
            <div className="h-9 w-24 rounded-full bg-[color:var(--muted)]" />
            <div className="h-9 w-32 rounded-full bg-[color:var(--muted)]" />
            <div className="h-9 w-20 rounded-full bg-[color:var(--muted)]" />
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[280px] overflow-hidden rounded-2xl bg-[color:var(--muted)] sm:h-[320px]">
              <div className="flex h-full flex-col justify-end p-4">
                <div className="h-4 w-3/4 rounded bg-black/10" />
                <div className="mt-2 flex gap-1.5">
                  <div className="h-5 w-16 rounded-full bg-black/10" />
                  <div className="h-5 w-12 rounded-full bg-black/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
