import type {
  FetchCustomParams,
  FetchPostsParams,
  PostsResult,
  WPCategory,
  WPCustomPostType,
  WPMedia,
  WPPost,
  WPTerm,
} from "./wp-types";

/**
 * WordPress REST API base URL.
 * Override via NEXT_PUBLIC_WP_API_URL if you ever migrate the backend.
 */
export const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ??
  "https://www.sman-modalbangsa.sch.id/wp-json/wp/v2";

/** Default ISR revalidation in seconds (1 hour). */
export const WP_REVALIDATE = 60 * 60;

const DEFAULT_TIMEOUT_MS = 30_000;

async function wpFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number; tags?: string[] },
): Promise<{ data: T; headers: Headers }> {
  const url = path.startsWith("http") ? path : `${WP_API_URL}${path}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      next: {
        revalidate: init?.revalidate ?? WP_REVALIDATE,
        tags: init?.tags ?? ["wp"],
      },
    });

    if (!res.ok) {
      // Don't throw on 404 for getPostById — let caller decide
      if (res.status === 404) {
        return { data: null as T, headers: res.headers };
      }
      throw new Error(`WP API error ${res.status}: ${res.statusText} (${url})`);
    }

    const data = (await res.json()) as T;
    return { data, headers: res.headers };
  } finally {
    clearTimeout(timeout);
  }
}

function buildQuery(params: Record<string, unknown>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) {
      if (v.length) usp.set(k, v.join(","));
    } else {
      usp.set(k, String(v));
    }
  }
  const q = usp.toString();
  return q ? `?${q}` : "";
}

/** Fetch a paginated list of posts with embedded author/media/term data. */
export async function getPosts({
  page = 1,
  perPage = 9,
  search,
  categories,
  exclude,
  orderBy = "date",
  order = "desc",
}: FetchPostsParams = {}): Promise<PostsResult> {
  const query = buildQuery({
    _embed: 1,
    page,
    per_page: perPage,
    search,
    categories,
    exclude,
    orderby: orderBy,
    order,
  });

  try {
    const { data, headers } = await wpFetch<WPPost[]>(`/posts${query}`);
    const totalPages = Number(headers.get("x-wp-totalpages") ?? 1);
    const totalPosts = Number(headers.get("x-wp-total") ?? data?.length ?? 0);
    return {
      posts: Array.isArray(data) ? data : [],
      totalPages: Number.isNaN(totalPages) ? 1 : totalPages,
      totalPosts: Number.isNaN(totalPosts) ? 0 : totalPosts,
    };
  } catch (err) {
    console.error("[wp.getPosts]", err);
    return { posts: [], totalPages: 1, totalPosts: 0 };
  }
}

/** Fetch a single post by numeric id with embedded data. */
export async function getPostById(id: number | string): Promise<WPPost | null> {
  try {
    const { data } = await wpFetch<WPPost | null>(`/posts/${id}?_embed=1`);
    return data ?? null;
  } catch (err) {
    console.error("[wp.getPostById]", err);
    return null;
  }
}

/** Fetch all post categories. */
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const { data } = await wpFetch<WPCategory[]>(
      `/categories?per_page=100&hide_empty=1`,
    );
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("[wp.getCategories]", err);
    return [];
  }
}

/**
 * Generic fetcher for any custom post type exposed by the WP REST API.
 * Returns posts shaped like /wp/v2/posts (title/content/excerpt rendered).
 */
export async function getCPT(
  type: WPCustomPostType,
  {
    page = 1,
    perPage = 9,
    search,
    exclude,
    orderBy = "date",
    order = "desc",
    taxonomies,
  }: FetchCustomParams = {},
): Promise<PostsResult> {
  const baseQuery: Record<string, unknown> = {
    _embed: 1,
    page,
    per_page: perPage,
    search,
    exclude,
    orderby: orderBy,
    order,
  };
  if (taxonomies) {
    for (const [tax, ids] of Object.entries(taxonomies)) {
      if (ids && ids.length) baseQuery[tax] = ids;
    }
  }

  const query = buildQuery(baseQuery);
  try {
    const { data, headers } = await wpFetch<WPPost[]>(`/${type}${query}`);
    const totalPages = Number(headers.get("x-wp-totalpages") ?? 1);
    const totalPosts = Number(headers.get("x-wp-total") ?? data?.length ?? 0);
    return {
      posts: Array.isArray(data) ? data : [],
      totalPages: Number.isNaN(totalPages) ? 1 : totalPages,
      totalPosts: Number.isNaN(totalPosts) ? 0 : totalPosts,
    };
  } catch (err) {
    console.error(`[wp.getCPT:${type}]`, err);
    return { posts: [], totalPages: 1, totalPosts: 0 };
  }
}

/** Fetch a single CPT entry by id. */
export async function getCPTById(
  type: WPCustomPostType,
  id: number | string,
): Promise<WPPost | null> {
  try {
    const { data } = await wpFetch<WPPost | null>(`/${type}/${id}?_embed=1`);
    return data ?? null;
  } catch (err) {
    console.error(`[wp.getCPTById:${type}]`, err);
    return null;
  }
}

/** Fetch terms from any taxonomy (jab, stts, kelas, mapel, etc). */
export async function getTaxonomyTerms(
  taxonomy: string,
  perPage: number = 100,
): Promise<WPTerm[]> {
  try {
    const { data } = await wpFetch<WPTerm[]>(
      `/${taxonomy}?per_page=${perPage}&hide_empty=0`,
    );
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`[wp.getTaxonomyTerms:${taxonomy}]`, err);
    return [];
  }
}

// ---------- Helpers to safely read embedded data from a post ----------

export function getFeaturedImage(post: WPPost): WPMedia | null {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = getFeaturedImage(post);
  if (!media) return null;
  // Prefer "medium_large" or "large" if available, else fall back to source_url.
  const sizes = media.media_details?.sizes;
  return (
    sizes?.medium_large?.source_url ??
    sizes?.large?.source_url ??
    sizes?.medium?.source_url ??
    media.source_url ??
    null
  );
}

export function getAuthorName(post: WPPost): string | null {
  return post._embedded?.author?.[0]?.name ?? null;
}

export function getCategoryTerms(post: WPPost): WPTerm[] {
  const groups = post._embedded?.["wp:term"] ?? [];
  // The first group is usually categories, the second is tags. We filter by taxonomy to be safe.
  return groups.flat().filter((t) => t.taxonomy === "category");
}

export function getTagTerms(post: WPPost): WPTerm[] {
  const groups = post._embedded?.["wp:term"] ?? [];
  return groups.flat().filter((t) => t.taxonomy === "post_tag");
}

/** Filter embedded terms by an arbitrary taxonomy slug (e.g. "jab", "stts", "kelas"). */
export function getTermsByTaxonomy(post: WPPost, taxonomy: string): WPTerm[] {
  const groups = post._embedded?.["wp:term"] ?? [];
  return groups.flat().filter((t) => t.taxonomy === taxonomy);
}
