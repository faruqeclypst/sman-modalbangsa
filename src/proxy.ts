import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
}

export const config = {
  matcher: [
    // Match everything except: _next, api, files with an extension
    "/((?!_next|api|.*\\..*).*)",
  ],
};
