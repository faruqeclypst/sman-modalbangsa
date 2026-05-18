import { Container } from "@/components/ui/container";

/**
 * Skeleton placeholder shown while HomeSections streams in via Suspense.
 * Mimics the full below-hero layout with pulse animation.
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

      {/* Headmaster section skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr_240px]">
            <div className="mx-auto h-72 w-52 rounded-2xl bg-[color:var(--muted)]" />
            <div className="space-y-4">
              <div className="h-8 w-48 rounded-md bg-[color:var(--muted)]" />
              <div className="h-5 w-full rounded-md bg-[color:var(--muted)]" />
              <div className="h-5 w-5/6 rounded-md bg-[color:var(--muted)]" />
              <div className="h-5 w-4/6 rounded-md bg-[color:var(--muted)]" />
              <div className="h-5 w-full rounded-md bg-[color:var(--muted)]" />
            </div>
            <div className="hidden lg:flex lg:flex-col lg:items-center">
              <div className="size-48 rounded-full bg-[color:var(--muted)]" />
              <div className="mt-4 h-5 w-32 rounded-md bg-[color:var(--muted)]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Latest News skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="h-8 w-48 rounded-md bg-[color:var(--muted)]" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* School news grid */}
            <div>
              <div className="mb-4 h-5 w-32 rounded bg-[color:var(--muted)]" />
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 h-64 rounded-2xl bg-[color:var(--muted)]" />
                <div className="h-40 rounded-2xl bg-[color:var(--muted)]" />
                <div className="h-40 rounded-2xl bg-[color:var(--muted)]" />
              </div>
            </div>
            {/* Disdik news list */}
            <div>
              <div className="mb-4 h-5 w-40 rounded bg-[color:var(--muted)]" />
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

      {/* Prestasi bento skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="h-7 w-40 rounded-md bg-[color:var(--muted)]" />
          <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-4">
            <div className="col-span-2 row-span-2 rounded-2xl bg-[color:var(--muted)]" />
            <div className="rounded-2xl bg-[color:var(--muted)]" />
            <div className="rounded-2xl bg-[color:var(--muted)]" />
            <div className="rounded-2xl bg-[color:var(--muted)]" />
            <div className="rounded-2xl bg-[color:var(--muted)]" />
          </div>
        </Container>
      </section>

      {/* GTK skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="h-7 w-56 rounded-md bg-[color:var(--muted)]" />
          <div className="mt-8 hidden sm:grid sm:grid-cols-4 sm:gap-3">
            <div className="row-span-2 h-[420px] rounded-2xl bg-[color:var(--muted)]" />
            <div className="h-[200px] rounded-xl bg-[color:var(--muted)]" />
            <div className="h-[200px] rounded-xl bg-[color:var(--muted)]" />
            <div className="h-[200px] rounded-xl bg-[color:var(--muted)]" />
            <div className="h-[200px] rounded-xl bg-[color:var(--muted)]" />
            <div className="h-[200px] rounded-xl bg-[color:var(--muted)]" />
            <div className="h-[200px] rounded-xl bg-[color:var(--muted)]" />
          </div>
          {/* Mobile */}
          <div className="mt-6 flex gap-3 overflow-hidden sm:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[200px] w-[150px] flex-shrink-0 rounded-xl bg-[color:var(--muted)]" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
