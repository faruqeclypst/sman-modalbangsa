import Link from "next/link";
import { ArrowRight, CalendarDays, Megaphone, NotebookPen } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { Container } from "@/components/ui/container";
import { decodeHtmlEntities, formatDate } from "@/lib/utils";

interface InfoStripProps {
  locale: Locale;
  dict: Dictionary;
  pengumuman: WPPost[];
  agenda: WPPost[];
  editorial: WPPost[];
}

interface ColumnProps {
  title: string;
  Icon: typeof Megaphone;
  tone: string;
  posts: WPPost[];
  locale: Locale;
  basePath: string;
  viewAllLabel: string;
  emptyText: string;
}

function Column({
  title,
  Icon,
  tone,
  posts,
  locale,
  basePath,
  viewAllLabel,
  emptyText,
}: ColumnProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/30 bg-white/60 shadow-sm backdrop-blur-md">
      <header className="flex items-center justify-between gap-3 border-b border-[color:var(--border)] p-5">
        <div className="flex items-center gap-3">
          <span className={`inline-flex size-10 items-center justify-center rounded-lg ${tone}`}>
            <Icon className="size-5" aria-hidden />
          </span>
          <h3 className="text-base font-bold text-[color:var(--foreground)]">
            {title}
          </h3>
        </div>
        <Link
          href={`/${locale}/${basePath}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--primary)] hover:underline"
        >
          {viewAllLabel}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </header>
      <ul className="flex flex-1 flex-col divide-y divide-[color:var(--border)]">
        {posts.length === 0 ? (
          <li className="p-5 text-sm text-[color:var(--muted-foreground)]">
            {emptyText}
          </li>
        ) : (
          posts.slice(0, 4).map((post) => {
            const title = decodeHtmlEntities(post.title.rendered);
            const date = formatDate(post.date, locale);
            return (
              <li key={post.id}>
                <Link
                  href={`/${locale}/${basePath}/${post.slug}`}
                  className="group flex flex-col gap-1 p-4 transition-colors hover:bg-[color:var(--muted)]/60"
                >
                  <p className="text-xs uppercase tracking-wider text-[color:var(--muted-foreground)]">
                    {date}
                  </p>
                  <p className="line-clamp-2 text-sm font-medium leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                    {title}
                  </p>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </article>
  );
}

export function InfoStrip({
  locale,
  dict,
  pengumuman,
  agenda,
  editorial,
}: InfoStripProps) {
  return (
    <section
      aria-labelledby="info-strip-title"
      className="bg-[color:var(--background)] py-14 sm:py-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="info-strip-title"
            className="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
          >
            {dict.cpt.pengumuman.label} · {dict.cpt.agenda.label} ·{" "}
            {dict.cpt.editorial.label}
          </h2>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            {dict.cpt.pengumuman.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Column
            title={dict.cpt.pengumuman.latest}
            Icon={Megaphone}
            tone="bg-amber-50 text-amber-700"
            posts={pengumuman}
            locale={locale}
            basePath="pengumuman"
            viewAllLabel={dict.cpt.pengumuman.viewAll}
            emptyText={dict.cpt.pengumuman.empty}
          />
          <Column
            title={dict.cpt.agenda.upcoming}
            Icon={CalendarDays}
            tone="bg-emerald-50 text-emerald-700"
            posts={agenda}
            locale={locale}
            basePath="agenda"
            viewAllLabel={dict.cpt.agenda.viewAll}
            emptyText={dict.cpt.agenda.empty}
          />
          <Column
            title={dict.cpt.editorial.title}
            Icon={NotebookPen}
            tone="bg-sky-50 text-sky-700"
            posts={editorial}
            locale={locale}
            basePath="editorial"
            viewAllLabel={dict.cpt.editorial.title}
            emptyText={dict.cpt.editorial.empty}
          />
        </div>
      </Container>
    </section>
  );
}
