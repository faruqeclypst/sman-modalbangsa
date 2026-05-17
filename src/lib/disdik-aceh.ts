/**
 * API client for Dinas Pendidikan Aceh (disdik.acehprov.go.id)
 * 
 * This CMS (AcehCMS) provides a JSON endpoint at /json/berita.json
 * 
 * Example endpoints:
 * - Berita: /json/berita.json?mode=dataonly&limit=10
 * - By category: /json/berita.json?kategori=disdik&limit=10
 */

export const DISDIK_API_URL = "https://disdik.acehprov.go.id";
export const DISDIK_REVALIDATE = 60 * 60; // 1 hour

// ============ Types ============

export interface DisdikTag {
  nama: string;
  slug: string;
  deskripsi: string;
}

export interface DisdikKategori {
  nama: string;
  slug: string;
  deskripsi: string;
}

export interface DisdikBerita {
  judul: string;
  deskripsi: string;
  custom_deskripsi: string;
  slug: string;
  gambar: string;
  gambar_caption: string;
  gambar_alt: string;
  gambar_title: string;
  tanggal: string;
  author: string;
  pubDate: string;
  tags: DisdikTag[];
  kategori: DisdikKategori;
}

export interface DisdikSitemap {
  num_images: number;
  images: string[];
  last_modified: string;
}

export interface DisdikMeta {
  title: string;
  description: string;
  keyword: string;
  author: string;
  image: string;
}

export interface DisdikResponse {
  sitemap: DisdikSitemap;
  tipe: string;
  sub_tipe: string | null;
  meta: DisdikMeta;
  data: DisdikBerita[];
}

export interface DisdikFetchParams {
  limit?: number;
  kategori?: string;
  page?: number;
}

export interface DisdikResult {
  berita: DisdikBerita[];
  meta: DisdikMeta;
  totalPosts: number;
}

// ============ API Functions ============

/**
 * Fetch berita from Dinas Pendidikan Aceh
 */
export async function getDisdikBerita({
  limit = 10,
  kategori,
  page = 1,
}: DisdikFetchParams = {}): Promise<DisdikResult> {
  const params = new URLSearchParams();
  params.set("mode", "dataonly");
  params.set("limit", String(limit));
  
  if (kategori) {
    params.set("kategori", kategori);
  }
  
  if (page > 1) {
    params.set("page", String(page));
  }

  const url = `${DISDIK_API_URL}/json/berita.json?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: {
        revalidate: DISDIK_REVALIDATE,
        tags: ["disdik-berita"],
      },
      headers: {
        Accept: "application/json",
        "User-Agent": "SMAN-ModalBangsa-NextJS/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(`Disdik API error ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    // mode=dataonly returns a flat array, otherwise it's wrapped in { data: [...] }
    const berita: DisdikBerita[] = Array.isArray(json)
      ? json
      : Array.isArray(json.data)
        ? json.data
        : [];

    return {
      berita,
      meta: Array.isArray(json)
        ? { title: "", description: "", keyword: "", author: "", image: "" }
        : json.meta ?? { title: "", description: "", keyword: "", author: "", image: "" },
      totalPosts: berita.length,
    };
  } catch (err) {
    console.error("[disdik.getDisdikBerita]", err);
    return {
      berita: [],
      meta: {
        title: "",
        description: "",
        keyword: "",
        author: "",
        image: "",
      },
      totalPosts: 0,
    };
  }
}

/**
 * Get full URL for a gambar path.
 * Uses the /thumbnail/ endpoint for optimized sizes.
 */
export function getDisdikImageUrl(path: string, width = 300, height = 200): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${DISDIK_API_URL}/thumbnail/${width}x${height}${path}`;
}

/**
 * Get full-size image URL (no thumbnail)
 */
export function getDisdikImageUrlFull(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${DISDIK_API_URL}${path}`;
}

/**
 * Get full URL for a slug path
 */
export function getDisdikArticleUrl(slug: string): string {
  if (!slug) return "";
  if (slug.startsWith("http")) return slug;
  return `${DISDIK_API_URL}${slug}`;
}

/**
 * Available categories on Disdik Aceh
 */
export const DISDIK_KATEGORI = [
  "berita-terkini",
  "disdik",
  "info-cabdin",
  "kliping-media",
  "info-tekkomdik",
  "info-grafis",
  "info-bidang",
  "sekrektariat",
  "bunda-paud",
  "info-bidang-smk",
  "info-kementerian",
  "info-acehprov",
  "info-sekolah",
  "info-guru",
  "info-siswa",
  "info-kemitraan",
] as const;

export type DisdikKategoriSlug = typeof DISDIK_KATEGORI[number];
