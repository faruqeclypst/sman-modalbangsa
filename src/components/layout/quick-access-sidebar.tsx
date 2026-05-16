"use client";

import Link from "next/link";
import {
  Calendar,
  GraduationCap,
  Megaphone,
  Monitor,
  Trophy,
  Vote,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface QuickAccessSidebarProps {
  locale: Locale;
  dict: Dictionary;
}

export function QuickAccessSidebar({ locale, dict }: QuickAccessSidebarProps) {
  const items = [
    {
      key: "spmb",
      Icon: GraduationCap,
      label: dict.quickLinks.items.spmb,
      href: `/${locale}/spmb`,
      external: false,
    },
    {
      key: "cbt",
      Icon: Monitor,
      label: dict.quickLinks.items.cbt,
      href: "https://cbt.sman-modalbangsa.sch.id",
      external: true,
    },
    {
      key: "schedule",
      Icon: Calendar,
      label: dict.quickLinks.items.schedule,
      href: `/${locale}/agenda`,
      external: false,
    },
    {
      key: "announcements",
      Icon: Megaphone,
      label: dict.quickLinks.items.announcements,
      href: `/${locale}/pengumuman`,
      external: false,
    },
    {
      key: "achievements",
      Icon: Trophy,
      label: dict.quickLinks.items.achievements,
      href: `/${locale}/prestasi`,
      external: false,
    },
    {
      key: "evoting",
      Icon: Vote,
      label: dict.quickLinks.items.evoting,
      href: "https://evoting.sman-modalbangsa.sch.id",
      external: true,
    },
  ];

  return (
    <aside
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 sm:block"
      aria-label={dict.quickLinks.title}
    >
      <nav className="flex flex-col gap-2.5">
        {items.map(({ key, Icon, label, href, external }) => {
          const content = (
            <>
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {label}
              </span>
              <span className="flex size-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md transition-transform hover:scale-110">
                <Icon className="size-5" />
              </span>
            </>
          );

          return external ? (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center"
              aria-label={label}
            >
              {content}
            </a>
          ) : (
            <Link
              key={key}
              href={href}
              className="group relative flex items-center"
              aria-label={label}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
