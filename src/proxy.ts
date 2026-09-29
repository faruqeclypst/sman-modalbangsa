import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Bot hardening — mengurangi beban Fluid Active CPU.
 *
 * Crawler SEO/AI/scraper komersial menembak ribuan URL (termasuk URL lama
 * yang sudah dihapus) dan memaksa server merender setiap permintaan.
 * Diblokir di edge sebelum menyentuh runtime Next.js.
 */
const BLOCKED_BOT_RE =
  /(ahrefs|semrush|mj12|dotbot|petalbot|gptbot|claudebot|claude-web|ccbot|bytespider|amazonbot|dataforseo|zoominfo|serpstat|seznam|scrapy|python-requests|go-http-client|libwww|httrack|winhttp|okhttp|headlesschrome|phantomjs|puppeteer|playwright|masscan|nmap|nikto|sqlmap)/i;

/** Path backend WordPress & file sensitif yang tidak untuk publik. */
const BLOCKED_PATH_RE =
  /^\/(wp-admin|wp-login|wp-json|wp-content|wp-includes|xmlrpc\.php|readme\.html|license\.txt)/i;

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

  // Block abusive crawlers/scrapers at the edge (no page render, tiny CPU cost).
  const ua = request.headers.get("user-agent") ?? "";
  if (BLOCKED_BOT_RE.test(ua) || BLOCKED_PATH_RE.test(pathname)) {
    return new NextResponse("Blocked", { status: 403 });
  }

  // Skip Next.js internals, API routes, and any path that looks like a file (e.g. .png, .ico)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Maintenance mode check
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
  if (isMaintenanceMode) {
    if (pathname === "/maintenance") {
      return;
    }
    return NextResponse.rewrite(new URL("/maintenance", request.url));
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
