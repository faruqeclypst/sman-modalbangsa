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
        "User-Agent": "SMAN-ModalBangsa-NextJS/1.0",
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
  after,
  embed = true,
  fields,
}: FetchPostsParams & { embed?: boolean; fields?: string[] } = {}): Promise<PostsResult> {
  const query = buildQuery({
    ...(embed ? { _embed: 1 } : {}),
    ...(fields?.length ? { _fields: fields.join(",") } : {}),
    page,
    per_page: perPage,
    search,
    categories,
    exclude,
    orderby: orderBy,
    order,
    after,
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

/** Fetch a single post by slug with embedded data. */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const { data } = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=1`);
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("[wp.getPostBySlug]", err);
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
 *
 * @param fields - Optional array of WP fields to request (reduces payload).
 *                 When provided, only those fields are returned.
 *                 Pass `embed: false` to skip _embed (no media/terms join).
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
    embed = true,
    fields,
  }: FetchCustomParams & { embed?: boolean; fields?: string[] } = {},
): Promise<PostsResult> {
  const baseQuery: Record<string, unknown> = {
    page,
    per_page: perPage,
    search,
    exclude,
    orderby: orderBy,
    order,
  };

  if (embed) baseQuery._embed = 1;
  if (fields?.length) baseQuery._fields = fields.join(",");

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

/** Fetch a single CPT entry by slug. */
export async function getCPTBySlug(
  type: WPCustomPostType,
  slug: string,
): Promise<WPPost | null> {
  try {
    const { data } = await wpFetch<WPPost[]>(`/${type}?slug=${encodeURIComponent(slug)}&_embed=1`);
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error(`[wp.getCPTBySlug:${type}]`, err);
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

export function toProxyUrl(url: string | null): string | null {
  if (!url) return null;
  const wpContentIdx = url.indexOf("/wp-content/");
  if (wpContentIdx !== -1) {
    return url.substring(wpContentIdx);
  }
  const wpIncludesIdx = url.indexOf("/wp-includes/");
  if (wpIncludesIdx !== -1) {
    return url.substring(wpIncludesIdx);
  }
  return url;
}

export function getFeaturedImage(post: WPPost): WPMedia | null {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = getFeaturedImage(post);
  if (!media) return null;
  // Use source_url (original/full) for best quality. WordPress source_url is the full-size image.
  return toProxyUrl(media.source_url ?? null);
}

/** Get a smaller thumbnail URL for cards/lists (medium ~300px). */
export function getThumbnailUrl(post: WPPost): string | null {
  const media = getFeaturedImage(post);
  if (!media) return null;
  const sizes = media.media_details?.sizes;
  return toProxyUrl(
    sizes?.medium_large?.source_url ??
    sizes?.medium?.source_url ??
    sizes?.large?.source_url ??
    media.source_url ??
    null
  );
}

export function getAuthorName(post: WPPost): string | null {
  const name = post._embedded?.author?.[0]?.name ?? null;
  if (!name) return null;
  if (name.toLowerCase() === "admin" || name.toLowerCase() === "administrator") {
    return "Media Mosa";
  }
  return name;
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

// ---------- Comments ----------

export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  date: string;
  content: { rendered: string };
  status: string;
}

/** Fetch approved comments for a post. */
export async function getComments(postId: number | string): Promise<WPComment[]> {
  try {
    const { data } = await wpFetch<WPComment[]>(
      `/comments?post=${postId}&per_page=50&order=desc&status=approve`,
    );
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("[wp.getComments]", err);
    return [];
  }
}

/** Submit a new comment to WordPress. */
export async function postComment(
  postId: number | string,
  body: { author_name: string; author_email: string; content: string },
): Promise<WPComment | null> {
  try {
    const { data } = await wpFetch<WPComment>(`/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post: Number(postId),
        author_name: body.author_name,
        author_email: body.author_email,
        content: body.content,
      }),
      revalidate: 0,
    });
    return data;
  } catch (err) {
    console.error("[wp.postComment]", err);
    return null;
  }
}

// ---------- Downloads ----------

export interface DownloadItem {
  id: number;
  title: string;
  date: string;
  fileUrl: string | null;
  fileType: string | null;
  category: string | null;
}

/**
 * Fetch download posts with their attached file URLs.
 * The WP "download" CPT stores files as media attachments (parent = post id).
 */
export async function getDownloads(perPage = 6, page = 1): Promise<{ items: DownloadItem[]; totalPages: number }> {
  try {
    const { posts, totalPages } = await getCPT("download", { page, perPage, embed: true });

    // Fetch attachments for all download posts in parallel
    const items = await Promise.all(
      posts.map(async (post) => {
        let fileUrl: string | null = null;
        let fileType: string | null = null;

        // Try to get attachment media for this post
        try {
          const { data: attachments } = await wpFetch<Array<{ source_url: string; mime_type: string }>>(
            `/media?parent=${post.id}&per_page=1`,
          );
          if (Array.isArray(attachments) && attachments.length > 0) {
            fileUrl = attachments[0].source_url ?? null;
            fileType = attachments[0].mime_type ?? null;
          }
        } catch {
          // Fallback: no attachment found
        }

        // Get category from embedded terms
        const terms = post._embedded?.["wp:term"]?.flat() ?? [];
        const cat = terms.find((t) => t.taxonomy === "cat-download");

        return {
          id: post.id,
          title: post.title.rendered.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#8217;/g, "'"),
          date: post.date,
          fileUrl,
          fileType,
          category: cat?.name ?? null,
        };
      }),
    );

    return { items, totalPages };
  } catch (err) {
    console.error("[wp.getDownloads]", err);
    return { items: [], totalPages: 1 };
  }
}
