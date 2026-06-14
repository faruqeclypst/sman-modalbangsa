"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { isNavGroup, type NavConfig } from "./nav-config";

interface HeaderNavProps {
  nav: NavConfig;
  locale: Locale;
  dict: Dictionary;
  isTransparent?: boolean;
}

export function HeaderNav({ nav, locale, dict, isTransparent }: HeaderNavProps) {
  const pathname = usePathname() ?? "";
  const [openMobile, setOpenMobile] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  // Close mobile menu on navigation
  const lastPathRef = React.useRef(pathname);
  React.useEffect(() => {
    if (lastPathRef.current !== pathname) {
      setOpenMobile(false);
      setOpenGroup(null);
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (openMobile) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [openMobile]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
        {nav.primary.map((item) => {
          if (isNavGroup(item)) {
            const groupActive = item.links.some((l) => isActive(l.href));
            return (
              <div key={item.label} className="relative group">
                <button
                  type="button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300",
                    groupActive
                      ? isTransparent ? "text-white font-bold" : "text-[color:var(--primary)]"
                      : isTransparent ? "text-white/80 hover:text-white" : "text-[color:var(--foreground)] hover:text-[color:var(--primary)]",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("size-4 transition-transform group-hover:rotate-180 duration-300", isTransparent ? "text-white/60" : "text-gray-400")} aria-hidden />
                </button>
                <div className="invisible absolute left-0 top-full z-50 mt-1 w-60 rounded-lg border border-gray-200 bg-white p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <ul className="flex flex-col">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors",
                            isActive(link.href)
                              ? "bg-[color:var(--primary)]/5 text-[color:var(--primary)] font-semibold"
                              : "text-[color:var(--foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--primary)]",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300",
                isActive(item.href)
                  ? isTransparent ? "text-white font-bold" : "text-[color:var(--primary)]"
                  : isTransparent ? "text-white/80 hover:text-white" : "text-[color:var(--foreground)] hover:text-[color:var(--primary)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile controls */}
      <div className="flex items-center gap-2 lg:hidden">
        <LanguageSwitcher currentLocale={locale} variant="compact" isTransparent={isTransparent} />
        <button
          type="button"
          aria-expanded={openMobile}
          aria-label={openMobile ? dict.common.close : dict.nav.menu}
          onClick={() => setOpenMobile((v) => !v)}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md transition-colors duration-300",
            isTransparent
              ? "border border-white/25 bg-white/10 text-white hover:bg-white/20"
              : "border border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
          )}
        >
          {openMobile ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {openMobile ? (
        <div
          className="fixed inset-0 top-16 z-30 overflow-y-auto bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.menu}
        >
          <nav className="flex flex-col gap-1 p-4">
            {nav.primary.map((item) => {
              if (isNavGroup(item)) {
                const expanded = openGroup === item.label;
                return (
                  <div key={item.label} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup(expanded ? null : item.label)
                      }
                      aria-expanded={expanded}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          expanded && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    {expanded ? (
                      <ul className="ml-2 flex flex-col gap-0.5 border-l border-[color:var(--border)] pl-2">
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setOpenMobile(false)}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm",
                                isActive(link.href)
                                  ? "bg-[color:var(--primary)]/10 font-medium text-[color:var(--primary)]"
                                  : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                              )}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-semibold transition-colors",
                    isActive(item.href)
                      ? "bg-[color:var(--primary)]/10 text-[color:var(--primary)]"
                      : "text-[color:var(--foreground)] hover:bg-[color:var(--muted)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </>
  );
}
