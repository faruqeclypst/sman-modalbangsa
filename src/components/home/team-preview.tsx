import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { Container } from "@/components/ui/container";
import { GTKCard } from "@/components/gtk/gtk-card";
import { getTermsByTaxonomy } from "@/lib/wp";
import { decodeHtmlEntities } from "@/lib/utils";

interface TeamPreviewProps {
  locale: Locale;
  dict: Dictionary;
  members: WPPost[];
}

export function TeamPreview({ locale, dict, members }: TeamPreviewProps) {
  if (!members.length) return null;

  return (
    <section
      aria-labelledby="team-preview-title"
      className="bg-[color:var(--background)] py-14 sm:py-16"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/20 bg-[color:var(--primary)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--primary)]">
              <Users className="size-3.5" aria-hidden />
              {dict.cpt.gtk.label}
            </p>
            <h2
              id="team-preview-title"
              className="mt-3 text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
            >
              {dict.cpt.gtk.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[color:var(--muted-foreground)]">
              {dict.cpt.gtk.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/gtk`}
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white sm:self-auto"
          >
            {dict.cpt.gtk.title}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.slice(0, 4).map((post) => {
            const jab = getTermsByTaxonomy(post, "jab")[0];
            const stts = getTermsByTaxonomy(post, "stts")[0];
            return (
              <GTKCard
                key={post.id}
                post={post}
                jabatanLabel={jab ? decodeHtmlEntities(jab.name) : undefined}
                statusLabel={stts ? decodeHtmlEntities(stts.name) : undefined}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
