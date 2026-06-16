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
        <CPTCard
          key={post.id}
          post={post}
          locale={locale}
          basePath={basePath}
          badge={badge}
          priority={idx < 3}
          showExcerpt={showExcerpt}
        />
      ))}
    </div>
  );
}
