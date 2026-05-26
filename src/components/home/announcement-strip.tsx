"use client";

import * as React from "react";
import Link from "next/link";
import { Megaphone, ChevronRight, ChevronLeft } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { decodeHtmlEntities, formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface AnnouncementStripProps {
  locale: Locale;
  dict: Dictionary;
  pengumuman: WPPost[];
}

export function AnnouncementStrip({ locale, dict, pengumuman }: AnnouncementStripProps) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (pengumuman.length <= 1) return;
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % pengumuman.length);
    }, 4500);
    return () => clearInterval(t);
  }, [pengumuman.length]);

  if (!pengumuman.length) return null;

  const prev = () => setActive((p) => (p - 1 + pengumuman.length) % pengumuman.length);
  const next = () => setActive((p) => (p + 1) % pengumuman.length);

  return (
    <div className="relative z-20 -mt-7">
      <Container>
        <div className="mx-auto flex h-14 max-w-3xl items-center overflow-hidden rounded-full bg-white shadow-lg shadow-black/8 ring-1 ring-black/5">
          {/* Icon */}
          <div className="flex h-full shrink-0 items-center gap-2 bg-[color:var(--primary)] px-4 text-white">
            <Megaphone className="size-4" aria-hidden />
            <span className="hidden text-[11px] font-bold uppercase tracking-wider sm:inline">
              {dict.cpt.pengumuman.label}
            </span>
          </div>

          {/* Content */}
          <Link
            href={`/${locale}/pengumuman/${pengumuman[active].slug}`}
            className="group flex min-w-0 flex-1 items-center px-4"
          >
            <span className="truncate text-sm font-medium text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
              {decodeHtmlEntities(pengumuman[active].title.rendered)}
            </span>
          </Link>

          {/* Nav arrows */}
          {pengumuman.length > 1 ? (
            <div className="flex shrink-0 items-center gap-0.5 pr-3">
              <button
                type="button"
                onClick={prev}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Previous"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <span className="min-w-[2.5rem] text-center text-[11px] font-semibold text-muted-foreground">
                {active + 1}/{pengumuman.length}
              </span>
              <button
                type="button"
                onClick={next}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Next"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
