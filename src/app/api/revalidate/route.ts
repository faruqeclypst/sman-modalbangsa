import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint.
 *
 * WordPress calls this via webhook (e.g. WP Webhooks plugin) whenever
 * a post is published/updated/deleted. This purges the ISR cache so
 * the next visitor gets fresh content without waiting for the timed revalidation.
 *
 * Usage:
 *   POST /api/revalidate
 *   Headers: { "x-revalidate-secret": "<REVALIDATE_SECRET>" }
 *   Body (optional): { "tag": "wp" }
 *
 * Supported tags:
 *   - "wp"           → all WordPress content
 *   - "disdik-berita" → Disdik Aceh news
 *   - "all"          → purge everything
 *
 * Environment variable required:
 *   REVALIDATE_SECRET — shared secret between WP and this endpoint
 */

export const dynamic = "force-dynamic";

const VALID_TAGS = ["wp", "disdik-berita"] as const;

// Expire immediately so next request fetches fresh data
const EXPIRE_NOW = { expire: 0 };

export async function POST(request: NextRequest) {
  // Authenticate
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, message: "Invalid or missing secret" },
      { status: 401 },
    );
  }

  // Parse body
  let tag = "wp";
  try {
    const body = await request.json();
    if (body?.tag && typeof body.tag === "string") {
      tag = body.tag;
    }
  } catch {
    // No body or invalid JSON — default to "wp"
  }

  // Revalidate
  try {
    if (tag === "all") {
      for (const t of VALID_TAGS) {
        revalidateTag(t, EXPIRE_NOW);
      }
      return NextResponse.json({
        ok: true,
        revalidated: [...VALID_TAGS],
        now: Date.now(),
      });
    }

    if (VALID_TAGS.includes(tag as (typeof VALID_TAGS)[number])) {
      revalidateTag(tag, EXPIRE_NOW);
      return NextResponse.json({
        ok: true,
        revalidated: [tag],
        now: Date.now(),
      });
    }

    return NextResponse.json(
      { ok: false, message: `Unknown tag: "${tag}". Valid: ${VALID_TAGS.join(", ")}, all` },
      { status: 400 },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

// Also support GET for easy testing (still requires secret via query param)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, message: "Invalid or missing secret" },
      { status: 401 },
    );
  }

  const tag = request.nextUrl.searchParams.get("tag") ?? "wp";

  try {
    if (tag === "all") {
      for (const t of VALID_TAGS) {
        revalidateTag(t, EXPIRE_NOW);
      }
      return NextResponse.json({ ok: true, revalidated: [...VALID_TAGS], now: Date.now() });
    }

    if (VALID_TAGS.includes(tag as (typeof VALID_TAGS)[number])) {
      revalidateTag(tag, EXPIRE_NOW);
      return NextResponse.json({ ok: true, revalidated: [tag], now: Date.now() });
    }

    return NextResponse.json(
      { ok: false, message: `Unknown tag: "${tag}". Valid: ${VALID_TAGS.join(", ")}, all` },
      { status: 400 },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
