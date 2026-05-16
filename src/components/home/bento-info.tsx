"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, Megaphone, NotebookPen } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { decodeHtmlEntities, formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface BentoInfoProps {
  locale: Locale;
  dict: Dictionary;
  pengumuman: WPPost[];
  agenda: WPPost[];
  editorial: WPPost[];
}

function RotatingItem({
  items,
  locale,
  basePath,
  interval = 4500,
}: {
  items: WPPost[];
  locale: Locale;
  basePath: string;
  interval?: number;
}) {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  const post = items[idx];
  if (!post) return null;

  return (
    <Link
      href={`/${locale}/${basePath}/${post.id}`}
      className="group block"
    >
      <p className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-emerald-300">
        {decodeHtmlEntities(post.title.rendered)}
      </p>
      <p className="mt-1.5 text-xs opacity-60">{formatDate(post.date, locale)}</p>
    </Link>
  );
}

export function BentoInfo({
  locale,
  dict,
  pengumuman,
  agenda,
  editorial,
}: BentoInfoProps) {
  return (
    <section aria-label="Informasi" className="bg-gray-50 py-14 sm:py-16">
      <Container>
        {/*
          Bento grid — asymmetric:
          Desktop: [Pengumuman 2col×2row] [Agenda 1col×1row] [Editorial 1col×1row]
                                          [Agenda list 2col×1row]
        */}
        <div className="grid auto-rows-[170px] grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-4">

          {/* Pengumuman — tall dark green, 2 rows */}
          <div className="row-span-2 flex flex-col overflow-hidden rounded-2xl bg-[#14532d] p-6 text-white">
            <div className="flex items-center gap-2">
              <Megaphone className="size-5 text-emerald-300" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {dict.cpt.pengumuman.label}
              </h3>
            </div>
            <ul className="mt-4 flex flex-1 flex-col gap-3 overflow-hidden">
              {pengumuman.slice(0, 4).map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/${locale}/pengumuman/${post.id}`}
                    className="group block rounded-lg p-2 transition-colors hover:bg-white/10"
                  >
                    <p className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-emerald-300">
                      {decodeHtmlEntities(post.title.rendered)}
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-200/60">
                      {formatDate(post.date, locale)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/pengumuman`}
              className="mt-3 text-xs font-semibold text-emerald-300 hover:underline"
            >
              {dict.cpt.pengumuman.viewAll} →
            </Link>
          </div>

          {/* Agenda — green accent, single rotating item */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl bg-emerald-600 p-5 text-white lg:col-span-2">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-emerald-200" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                {dict.cpt.agenda.upcoming}
              </h3>
            </div>
            <div className="mt-3">
              <RotatingItem
                items={agenda}
                locale={locale}
                basePath="agenda"
                interval={5000}
              />
            </div>
            <Link
              href={`/${locale}/agenda`}
              className="mt-3 text-xs font-semibold text-emerald-100 hover:underline"
            >
              {dict.cpt.agenda.viewAll} →
            </Link>
          </div>

          {/* Editorial — white card */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-2">
              <NotebookPen className="size-4 text-gray-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {dict.cpt.editorial.label}
              </h3>
            </div>
            <div className="mt-3">
              <RotatingItem
                items={editorial}
                locale={locale}
                basePath="editorial"
                interval={6000}
              />
            </div>
            <Link
              href={`/${locale}/editorial`}
              className="mt-3 text-xs font-semibold text-emerald-600 hover:underline"
            >
              {dict.cpt.editorial.title} →
            </Link>
          </div>

          {/* Agenda list — wide, shows 2-3 upcoming items */}
          <div className="flex flex-col overflow-hidden rounded-2xl bg-gray-900 p-5 text-white sm:col-span-1 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {dict.cpt.agenda.title}
              </h3>
              <Link
                href={`/${locale}/agenda`}
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                {dict.cpt.agenda.viewAll} →
              </Link>
            </div>
            <div className="mt-3 grid flex-1 gap-3 sm:grid-cols-3">
              {agenda.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/agenda/${post.id}`}
                  className="group rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <p className="text-xs text-emerald-400">
                    {formatDate(post.date, locale)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug group-hover:text-emerald-300">
                    {decodeHtmlEntities(post.title.rendered)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
