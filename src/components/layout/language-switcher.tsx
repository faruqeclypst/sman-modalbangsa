"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  locales,
  localeShort,
  localeNames,
  type Locale,
} from "@/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  variant?: "default" | "compact";
}

function buildLocalizedPath(pathname: string, target: Locale): string {
  // Strip the existing locale prefix and prefix the new one.
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && (locales as readonly string[]).includes(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return "/" + segments.join("/");
}

export function LanguageSwitcher({
  currentLocale,
  className,
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${currentLocale}`;

  const setCookie = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 p-0.5 text-xs",
        className,
      )}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="ml-1.5 size-3.5 text-gray-400" aria-hidden />
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={buildLocalizedPath(pathname, locale)}
            onClick={() => setCookie(locale)}
            aria-current={isActive ? "true" : undefined}
            aria-label={localeNames[locale]}
            className={cn(
              "rounded-full px-2.5 py-1 font-semibold uppercase transition-colors",
              isActive
                ? "bg-[#14532d] text-white"
                : "text-gray-500 hover:text-gray-800",
              variant === "compact" && "px-2 py-0.5",
            )}
          >
            {localeShort[locale]}
          </Link>
        );
      })}
    </div>
  );
}
