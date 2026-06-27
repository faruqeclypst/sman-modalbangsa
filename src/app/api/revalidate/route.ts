import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const VALID_TAGS = ["wp", "disdik-berita"] as const;

// Expire immediately so next request fetches fresh data
const EXPIRE_NOW = { expire: 0 };

const typeToPathMap: Record<string, string> = {
  post: "berita",
  berita: "berita",
  agenda: "agenda",
  prestasi: "prestasi",
  pengumuman: "pengumuman",
  editorial: "editorial",
  galeri: "galeri",
  ekskul: "ekskul",
};

interface RevalidateParams {
  tag?: string | null;
  slug?: string | null;
  type?: string | null;
}

function performRevalidation({ tag, slug, type }: RevalidateParams) {
  // 1. If slug and type are provided, perform surgical path revalidation
  if (slug && type) {
    const basePath = typeToPathMap[type.toLowerCase()];
    if (basePath) {
      const paths = [
        "/id",
        "/en",
        `/id/${basePath}`,
        `/en/${basePath}`,
        `/id/${basePath}/${slug}`,
        `/en/${basePath}/${slug}`,
      ];
      for (const p of paths) {
        revalidatePath(p);
      }
      return {
        ok: true,
        revalidatedPaths: paths,
        now: Date.now(),
      };
    }
  }

  // 2. Fallback to tag-based revalidation if no path/slug specified
  const targetTag = tag ?? "wp";

  if (targetTag === "all") {
    for (const t of VALID_TAGS) {
      revalidateTag(t, EXPIRE_NOW);
    }
    const paths = ["/id", "/en", "/id/berita", "/en/berita"];
    for (const p of paths) {
      revalidatePath(p);
    }
    return {
      ok: true,
      revalidatedTags: [...VALID_TAGS],
      revalidatedPaths: paths,
      now: Date.now(),
    };
  }

  if (VALID_TAGS.includes(targetTag as (typeof VALID_TAGS)[number])) {
    revalidateTag(targetTag, EXPIRE_NOW);
    const paths = ["/id", "/en", "/id/berita", "/en/berita"];
    for (const p of paths) {
      revalidatePath(p);
    }
    return {
      ok: true,
      revalidatedTags: [targetTag],
      revalidatedPaths: paths,
      now: Date.now(),
    };
  }

  return {
    ok: false,
    error: `Unknown tag: "${targetTag}". Valid: ${VALID_TAGS.join(", ")}, all`,
  };
}

export async function POST(request: NextRequest) {
  // Authenticate (check header first, fallback to query param)
  const secret =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, message: "Invalid or missing secret" },
      { status: 401 },
    );
  }

  // Parse body or fallback to query param
  let tag = request.nextUrl.searchParams.get("tag");
  let slug = request.nextUrl.searchParams.get("slug");
  let type = request.nextUrl.searchParams.get("type");

  try {
    const body = await request.json();
    if (body?.tag && typeof body.tag === "string") tag = body.tag;
    if (body?.slug && typeof body.slug === "string") slug = body.slug;
    if (body?.type && typeof body.type === "string") type = body.type;
    if (body?.post_type && typeof body.post_type === "string") type = body.post_type;
  } catch {
    // No body or invalid JSON — fallback to query params
  }

  try {
    const result = performRevalidation({ tag, slug, type });
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, message: "Invalid or missing secret" },
      { status: 401 },
    );
  }

  const tag = request.nextUrl.searchParams.get("tag");
  const slug = request.nextUrl.searchParams.get("slug");
  const type = request.nextUrl.searchParams.get("type");

  try {
    const result = performRevalidation({ tag, slug, type });
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
