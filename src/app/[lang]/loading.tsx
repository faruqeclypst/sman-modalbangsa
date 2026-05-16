import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-16">
      <div className="space-y-6">
        <div className="h-10 w-2/3 animate-pulse rounded-md bg-[color:var(--muted)]" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-[color:var(--muted)]" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-white shadow-sm"
            >
              <div className="aspect-[16/10] animate-pulse bg-[color:var(--muted)]" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-1/3 animate-pulse rounded-md bg-[color:var(--muted)]" />
                <div className="h-5 w-5/6 animate-pulse rounded-md bg-[color:var(--muted)]" />
                <div className="h-3 w-full animate-pulse rounded-md bg-[color:var(--muted)]" />
                <div className="h-3 w-2/3 animate-pulse rounded-md bg-[color:var(--muted)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
