import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getPosts } from "@/lib/wp";
import { JourneyHighlightsClient } from "./journey-highlights-client";

const BEHOLD_FEED_URL =
  process.env.NEXT_PUBLIC_BEHOLD_FEED_URL ??
  "https://feeds.behold.so/yqI9zrjyjYhovCj2nfNN";

interface BeholdPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: string;
  mediaUrl: string;
  sizes: {
    small?: { mediaUrl: string };
    medium?: { mediaUrl: string };
    large?: { mediaUrl: string };
  };
  caption: string;
  prunedCaption: string;
  hashtags: string[];
}

interface BeholdFeed {
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  followsCount: number;
  posts: BeholdPost[];
}

async function getBeholdFeed(): Promise<BeholdFeed | null> {
  try {
    const res = await fetch(BEHOLD_FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function JourneyHighlights({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [newsRes, feed] = await Promise.all([
    getPosts({ perPage: 6 }).catch(() => ({ posts: [] })),
    getBeholdFeed(),
  ]);

  const initialNews = newsRes?.posts || [];
  const initialInstagram = feed?.posts?.slice(0, 6) || [];

  return (
    <JourneyHighlightsClient
      locale={locale}
      dict={dict}
      initialNews={initialNews}
      initialInstagram={initialInstagram}
    />
  );
}
