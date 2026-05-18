// Lightweight typings for the subset of WP-JSON fields we consume.

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaSize {
  source_url: string;
  width: number;
  height: number;
  mime_type?: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, WPMediaSize>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link?: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
}

export interface WPEmbedded {
  author?: WPAuthor[];
  "wp:featuredmedia"?: WPMedia[];
  "wp:term"?: WPTerm[][];
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: WPEmbedded;
  /** Custom meta fields exposed via REST API (e.g. download URL). */
  meta?: Record<string, unknown>;
  /** ACF fields if Advanced Custom Fields is active. */
  acf?: Record<string, unknown>;
  /** Some themes/plugins expose download URL directly. */
  download_url?: string;
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface FetchPostsParams {
  page?: number;
  perPage?: number;
  search?: string;
  categories?: number[];
  exclude?: number[];
  orderBy?: "date" | "title" | "id";
  order?: "asc" | "desc";
}

export interface PostsResult {
  posts: WPPost[];
  totalPages: number;
  totalPosts: number;
}

/**
 * The custom post types exposed by the SMAN Modal Bangsa WordPress backend.
 * Each one returns the same WPPost-shaped response (title/content/excerpt rendered).
 */
export type WPCustomPostType =
  | "posts"
  | "agenda"
  | "pengumuman"
  | "editorial"
  | "prestasi"
  | "gtk"
  | "siswa"
  | "alumni"
  | "fasilitas"
  | "ekskul"
  | "galeri"
  | "video"
  | "materi"
  | "download"
  | "slider"
  | "blog";

/** Extra taxonomy filters for CPT queries. */
export interface CustomTaxFilter {
  /** Map of taxonomy slug -> term IDs to include. */
  taxonomies?: Record<string, number[] | undefined>;
}

export interface FetchCustomParams extends FetchPostsParams, CustomTaxFilter {}
