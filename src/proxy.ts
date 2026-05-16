import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  // Pick the first language tag that begins with one of our supported locales.
  const parts = header.split(",").map((p) => p.trim().toLowerCase());
  for (const part of parts) {
    const tag = part.split(";")[0];
    for (const locale of locales) {
      if (tag === locale || tag.startsWith(`${locale}-`)) {
        return locale;
      }
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, API routes, and any path that looks like a file (e.g. .png, .ico)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return;

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : getLocaleFromAcceptLanguage(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match everything except: _next, api, files with an extension
    "/((?!_next|api|.*\\..*).*)",
  ],
};
