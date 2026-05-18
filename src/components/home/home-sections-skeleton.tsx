import { Container } from "@/components/ui/container";

/**
 * Skeleton placeholder shown while HomeSections streams in.
 * Mimics the layout of news + info sections with pulse animation.
 */
export function HomeSectionsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Announcement strip skeleton */}
      <div className="relative z-20 -mt-7">
        <Container>
          <div className="mx-auto h-14 max-w-3xl rounded-full bg-[color:var(--muted)]" />
        </Container>
      </div>

      {/* Latest News skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="h-8 w-48 rounded-md bg-[color:var(--muted)]" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* School news grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 h-64 rounded-2xl bg-[color:var(--muted)]" />
              <div className="h-40 rounded-2xl bg-[color:var(--muted)]" />
              <div className="h-40 rounded-2xl bg-[color:var(--muted)]" />
            </div>
            {/* Disdik news list */}
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[color:var(--border)] p-3">
                  <div className="h-20 w-24 flex-shrink-0 rounded-lg bg-[color:var(--muted)]" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-16 rounded bg-[color:var(--muted)]" />
                    <div className="h-4 w-full rounded bg-[color:var(--muted)]" />
                    <div className="h-3 w-24 rounded bg-[color:var(--muted)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bento info skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="h-7 w-32 rounded-md bg-[color:var(--muted)]" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="h-80 rounded-2xl bg-[color:var(--muted)]" />
            <div className="space-y-4">
              <div className="h-40 rounded-2xl bg-[color:var(--muted)]" />
              <div className="h-36 rounded-2xl bg-[color:var(--muted)]" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
