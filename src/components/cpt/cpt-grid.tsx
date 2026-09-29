import type { Locale } from "@/i18n/config";
import type { WPPost } from "@/lib/wp-types";
import { CPTCard } from "./cpt-card";

interface CPTGridProps {
  posts: WPPost[];
  locale: Locale;
  basePath: string;
  badge?: string;
  emptyText: string;
  showExcerpt?: boolean;
  cols?: 2 | 3;
}

export function CPTGrid({
  posts,
  locale,
  basePath,
  badge,
  emptyText,
  showExcerpt = true,
  cols = 3,
}: CPTGridProps) {
  if (!posts.length) {
    return (
      <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-white p-10 text-center">
        <p className="text-[color:var(--muted-foreground)]">{emptyText}</p>
      </div>
    );
  }

  const gridClass = cols === 2
    ? "grid gap-6 sm:grid-cols-2"
    : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={gridClass}>
      {posts.map((post, idx) => (
        <div
          key={post.id}
          className={
            // Kartu pertama membentang 2 kolom agar grid terasa terkurasi,
            // bukan deretan thumbnail seragam. Hanya bila item cukup banyak.
            !showExcerpt && idx === 0 && posts.length >= 3
              ? "sm:col-span-2 lg:col-span-2"
              : undefined
          }
        >
          <CPTCard
            post={post}
            locale={locale}
            basePath={basePath}
            badge={badge}
            priority={idx < 3}
            showExcerpt={showExcerpt}
          />
        </div>
      ))}
    </div>
  );
}
