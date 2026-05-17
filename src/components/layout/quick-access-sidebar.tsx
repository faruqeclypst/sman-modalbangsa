"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Monitor,
  Vote,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface QuickAccessSidebarProps {
  locale: Locale;
  dict: Dictionary;
}

export function QuickAccessSidebar({ dict }: QuickAccessSidebarProps) {
  const [isOnHero, setIsOnHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Change at the pengumuman strip area (between hero bottom and headmaster)
      // From screenshot: this is about 1 viewport height + a small offset
      const triggerPoint = window.innerHeight + 50;
      setIsOnHero(window.scrollY < triggerPoint);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      key: "spmb",
      Icon: GraduationCap,
      label: dict.quickLinks.items.spmb,
      href: "https://spmb.sman-modalbangsa.sch.id/",
    },
    {
      key: "cbt",
      Icon: Monitor,
      label: dict.quickLinks.items.cbt,
      href: "https://modalbangsa.alfaruqasri.my.idx`/",
    },
    {
      key: "evoting",
      Icon: Vote,
      label: dict.quickLinks.items.evoting,
      href: "https://pemos-mosa.web.app/",
    },
  ];

  return (
    <aside
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 sm:block"
      aria-label={dict.quickLinks.title}
    >
      <nav
        className={`flex flex-col gap-2.5 rounded-full p-2 transition-all duration-500 ease-in-out ${
          isOnHero
            ? "bg-white/10 backdrop-blur-md shadow-lg border border-white/20"
            : "bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50"
        }`}
      >
        {items.map(({ key, Icon, label, href }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center"
            aria-label={label}
          >
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`flex size-11 items-center justify-center rounded-full transition-all duration-500 ease-in-out hover:scale-110 ${
                isOnHero
                  ? "bg-white/20 text-white"
                  : "bg-emerald-600 text-white shadow-md"
              }`}
            >
              <Icon className="size-5" />
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
