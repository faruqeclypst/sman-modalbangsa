"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { SchoolMark } from "./school-mark";
import { HeaderNav } from "./header-nav";
import { buildNav } from "./nav-config";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = buildNav(locale, dict);

  // Check if current path is home: / or /id or /en
  const isHome = pathname === `/${locale}` || pathname === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "z-40 transition-all duration-300",
        isHome ? "fixed left-0 right-0 top-0" : "sticky top-0",
        isTransparent
          ? "border-b border-transparent bg-transparent shadow-none"
          : "border-b border-[var(--border)] bg-[var(--background)] shadow-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 outline-none"
          aria-label={dict.site.name}
        >
          <SchoolMark />
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "text-base font-bold transition-colors duration-300",
                isTransparent ? "text-white" : "text-[#14532d]",
              )}
            >
              {dict.site.name}
            </span>
            <span
              className={cn(
                "hidden text-[11px] font-medium transition-colors duration-300 sm:block",
                isTransparent ? "text-white/70" : "text-gray-500",
              )}
            >
              {dict.site.tagline}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <HeaderNav nav={nav} locale={locale} dict={dict} isTransparent={isTransparent} />
          <LanguageSwitcher
            currentLocale={locale}
            isTransparent={isTransparent}
            className="hidden md:inline-flex"
          />
        </div>
      </Container>
    </header>
  );
}
