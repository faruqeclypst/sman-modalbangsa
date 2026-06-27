import { NextResponse } from "next/server";
import { WP_API_URL } from "@/lib/wp";

export const runtime = "edge";

export async function GET() {
  const start = Date.now();
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=1&_fields=id,title`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 }, // Cache health check for 5 minutes to save CPU
    });
    const elapsed = Date.now() - start;
    const data = await res.json();
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      elapsed: `${elapsed}ms`,
      apiUrl: WP_API_URL,
      sample: data?.[0]?.title?.rendered ?? null,
      headers: {
        "x-wp-total": res.headers.get("x-wp-total"),
        "content-type": res.headers.get("content-type"),
      },
    });
  } catch (err: unknown) {
    const elapsed = Date.now() - start;
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        elapsed: `${elapsed}ms`,
        apiUrl: WP_API_URL,
      },
      { status: 502 },
    );
  }
}
