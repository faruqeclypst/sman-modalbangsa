/**
 * Fetch news about SMAN Modal Bangsa from Google News RSS.
 * Returns articles from various media sources (Serambi, AJNN, Meugah, etc.)
 */

export interface MediaNewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  imageUrl: string;
}

const GOOGLE_NEWS_RSS = "https://news.google.com/rss/search?q=%22SMAN+Modal+Bangsa%22+OR+%22SMA+Modal+Bangsa%22&hl=id&gl=ID&ceid=ID:id";

export const MEDIA_NEWS_REVALIDATE = 60 * 60; // 1 hour

/**
 * Parse Google News RSS XML into structured items.
 */
function parseRSS(xml: string): MediaNewsItem[] {
  const items: MediaNewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1") ?? "";
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? block.match(/<link\/>([\s\S]*?)(?=<)/)?.[1]?.trim() ?? "";
    const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1") ?? "";
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";

    // Try to extract image from media:content, enclosure, or description img tag
    const mediaUrl = block.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ?? "";
    const enclosureUrl = block.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ?? "";
    const descImg = block.match(/<description>[\s\S]*?<img[^>]*src="([^"]+)"/)?.[1] ?? "";
    const imageUrl = mediaUrl || enclosureUrl || descImg;

    if (title && link) {
      items.push({
        title: decodeXmlEntities(title),
        link,
        source: decodeXmlEntities(source),
        pubDate,
        imageUrl: decodeXmlEntities(imageUrl),
      });
    }
  }

  return items;
}

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

/**
 * Fetch media news about SMAN Modal Bangsa from Google News.
 */
export async function getMediaNews(limit = 5): Promise<MediaNewsItem[]> {
  try {
    const res = await fetch(GOOGLE_NEWS_RSS, {
      next: {
        revalidate: MEDIA_NEWS_REVALIDATE,
        tags: ["media-news"],
      },
      headers: {
        "User-Agent": "SMAN-ModalBangsa-NextJS/1.0",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!res.ok) {
      console.error(`[media-news] RSS fetch failed: ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const items = parseRSS(xml);
    return items.slice(0, limit);
  } catch (err) {
    console.error("[media-news]", err);
    return [];
  }
}
