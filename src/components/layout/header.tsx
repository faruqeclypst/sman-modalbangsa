import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { SchoolMark } from "./school-mark";
import { HeaderNav } from "./header-nav";
import { buildNav } from "./nav-config";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const nav = buildNav(locale, dict);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background)] shadow-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 outline-none"
          aria-label={dict.site.name}
        >
          <SchoolMark />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-[#14532d]">
              {dict.site.name}
            </span>
            <span className="hidden text-[11px] font-medium text-gray-500 sm:block">
              {dict.site.tagline}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <HeaderNav nav={nav} locale={locale} dict={dict} />
          <LanguageSwitcher currentLocale={locale} className="hidden md:inline-flex" />
        </div>
      </Container>
    </header>
  );
}
