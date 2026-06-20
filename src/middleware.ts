import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { proxy } from "./proxy";

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (isMaintenanceMode) {
    const { pathname } = request.nextUrl;

    // Skip static assets, API routes, and the maintenance page itself
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".") ||
      pathname === "/maintenance"
    ) {
      return NextResponse.next();
    }

    // Rewrite internally to /maintenance
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  // Fall back to original localization proxy middleware logic
  return proxy(request);
}

export const config = {
  matcher: [
    // Match all paths except internal, api, and files with extensions
    "/((?!_next|api|.*\\..*).*)",
  ],
};
