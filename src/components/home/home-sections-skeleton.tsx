import { Container } from "@/components/ui/container";

/**
 * Skeleton placeholder shown while HomeSections streams in via Suspense.
 * Mimics the full below-hero layout with pulse animation.
 */
export function HomeSectionsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Headmaster section skeleton */}
      <section className="bg-[color:var(--background)] py-14 sm:py-16">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr_240px]">
            {/* Left — Portrait */}
            <div className="flex flex-col items-center">
              <div className="h-72 w-52 rounded-2xl bg-[color:var(--muted)]" />
              <div className="mt-4 h-5 w-32 rounded-md bg-[color:var(--muted)]" />
            </div>
            {/* Center — Quote text */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[color:var(--muted)]" />
                <div className="h-8 w-48 rounded-md bg-[color:var(--muted)]" />
              </div>
              <div className="h-5 w-60 rounded bg-[color:var(--muted)]" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-[color:var(--muted)]" />
                <div className="h-4 w-5/6 rounded bg-[color:var(--muted)]" />
                <div className="h-4 w-4/6 rounded bg-[color:var(--muted)]" />
              </div>
              <div className="h-5 w-32 rounded bg-[color:var(--muted)]" />
            </div>
            {/* Right — Logo watermark */}
            <div className="hidden lg:flex lg:flex-col lg:items-center">
              <div className="size-44 rounded-full bg-[color:var(--muted)] animate-pulse" />
              <div className="mt-4 h-5 w-32 rounded-md bg-[color:var(--muted)]" />
            </div>
          </div>
        </Container>
      </section>

      {/* School Commitment values skeleton */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          {/* Header Skeleton */}
          <div className="mx-auto max-w-4xl text-center mb-16 sm:mb-20 space-y-4">
            <div className="mx-auto h-12 w-80 rounded-md bg-[color:var(--muted)]" />
            <div className="mx-auto h-12 w-64 rounded-md bg-[color:var(--muted)]" />
            <div className="mx-auto h-4 w-[28rem] rounded bg-[color:var(--muted)]" />
          </div>

          {/* 3-Column Cards Skeleton Grid */}
          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            <div className="aspect-[4/5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
            <div className="aspect-[4/5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
            <div className="aspect-[4/5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
          </div>
        </Container>
      </section>

      {/* Student Stories skeleton */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          {/* Header Skeleton */}
          <div className="mx-auto max-w-4xl text-center mb-16 sm:mb-20 space-y-4">
            <div className="mx-auto h-12 w-80 rounded-md bg-[color:var(--muted)]" />
            <div className="mx-auto h-12 w-64 rounded-md bg-[color:var(--muted)]" />
            <div className="mx-auto h-4 w-[28rem] rounded bg-[color:var(--muted)]" />
          </div>
        </Container>

        {/* 4-Column Cards Skeleton Grid - Full Width */}
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
            <div className="aspect-[3/4.5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
            <div className="aspect-[3/4.5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
            <div className="aspect-[3/4.5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
            <div className="aspect-[3/4.5] rounded-[2rem] bg-[color:var(--muted)] w-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          {/* Header Skeleton */}
          <div className="mx-auto max-w-4xl text-center mb-16 sm:mb-20 space-y-4">
            <div className="mx-auto h-12 w-80 rounded-md bg-[color:var(--muted)]" />
            <div className="mx-auto h-12 w-64 rounded-md bg-[color:var(--muted)]" />
            <div className="mx-auto h-4 w-[28rem] rounded bg-[color:var(--muted)]" />
          </div>

          {/* 4-Column Cards Skeleton Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full items-stretch">
            {/* 3 News Card Skeletons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-[2rem] border border-zinc-100 p-4 space-y-4">
                <div className="aspect-[16/10.5] w-full rounded-[1.5rem] bg-[color:var(--muted)]" />
                <div className="h-6 w-3/4 rounded bg-[color:var(--muted)]" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-[color:var(--muted)]" />
                  <div className="h-4 w-5/6 rounded bg-[color:var(--muted)]" />
                </div>
              </div>
            ))}

            {/* Social Card Skeleton */}
            <div className="rounded-[2rem] bg-[color:var(--muted)] p-8 flex flex-col justify-between aspect-[3/4.5] lg:aspect-auto">
              <div className="space-y-4">
                <div className="h-10 w-full rounded-full bg-white/10" />
                <div className="h-8 w-3/4 rounded bg-white/10" />
              </div>
              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-white/10" />
                <div className="size-12 rounded-full bg-white/10" />
                <div className="size-12 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </Container>
      </section>


    </div>
  );
}
