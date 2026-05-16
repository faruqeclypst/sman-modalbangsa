import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
  dict: Dictionary;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v && k !== "page") params.set(k, v);
    }
  }
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `${basePath}?${q}` : basePath;
}

function getPageRange(current: number, total: number): (number | "ellipsis")[] {
  const range: (number | "ellipsis")[] = [];
  const window = 1;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) range.push(i);
    return range;
  }

  range.push(1);
  if (current - window > 2) range.push("ellipsis");

  const start = Math.max(2, current - window);
  const end = Math.min(total - 1, current + window);
  for (let i = start; i <= end; i++) range.push(i);

  if (current + window < total - 1) range.push("ellipsis");
  range.push(total);

  return range;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
  dict,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
    >
      {currentPage > 1 ? (
        <Link
          href={buildHref(basePath, currentPage - 1, searchParams)}
          className="inline-flex items-center gap-1 rounded-md border border-[color:var(--border)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          aria-label={dict.news.previous}
          rel="prev"
        >
          <ChevronLeft className="size-4" aria-hidden />
          <span className="hidden sm:inline">{dict.news.previous}</span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-md border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-2 text-sm font-medium text-[color:var(--muted-foreground)]">
          <ChevronLeft className="size-4" aria-hidden />
          <span className="hidden sm:inline">{dict.news.previous}</span>
        </span>
      )}

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-sm text-[color:var(--muted-foreground)]"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(basePath, p, searchParams)}
            aria-current={p === currentPage ? "page" : undefined}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-md border text-sm font-medium",
              p === currentPage
                ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
            )}
          >
            {p}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(basePath, currentPage + 1, searchParams)}
          className="inline-flex items-center gap-1 rounded-md border border-[color:var(--border)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          aria-label={dict.news.next}
          rel="next"
        >
          <span className="hidden sm:inline">{dict.news.next}</span>
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-md border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-2 text-sm font-medium text-[color:var(--muted-foreground)]">
          <span className="hidden sm:inline">{dict.news.next}</span>
          <ChevronRight className="size-4" aria-hidden />
        </span>
      )}
    </nav>
  );
}
